const express = require('express');
const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const { execFile } = require('child_process');

let netlifyBlobs;
try {
  netlifyBlobs = require('@netlify/blobs');
} catch (error) {
  netlifyBlobs = null;
}

const app = express();
const apiRouter = express.Router();
const PORT = process.env.PORT || 3000;
const IS_NETLIFY = Boolean(process.env.NETLIFY);
const DATA_FILE = process.env.DATA_FILE || (IS_NETLIFY
  ? path.join(os.tmpdir(), 'qa-challenge', 'store.json')
  : path.join(__dirname, 'data', 'store.json'));
const COOKIE_NAME = 'qa_session';
const COOKIE_SECRET = process.env.COOKIE_SECRET || 'qa-challenge-secret';
const TEMP_DIR = IS_NETLIFY ? path.join(os.tmpdir(), 'qa-challenge') : path.join(__dirname, 'tmp');

if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

function parseCookies(req) {
  const header = req.headers.cookie || '';
  return header.split(';').filter(Boolean).reduce((memo, item) => {
    const [key, ...rest] = item.trim().split('=');
    memo[key] = decodeURIComponent(rest.join('='));
    return memo;
  }, {});
}

function signSession(payload) {
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', COOKIE_SECRET).update(encoded).digest('hex');
  return `${signature}.${encoded}`;
}

function verifySession(value) {
  const [signature, payload] = value.split('.');
  if (!signature || !payload) {
    throw new Error('Invalid session');
  }
  const expected = crypto.createHmac('sha256', COOKIE_SECRET).update(payload).digest('hex');
  if (expected !== signature) {
    throw new Error('Invalid session');
  }
  return JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
}

function readSession(req) {
  const cookieValue = parseCookies(req)[COOKIE_NAME];
  if (!cookieValue) {
    return { userId: null };
  }
  try {
    return verifySession(cookieValue);
  } catch (error) {
    return { userId: null };
  }
}

function writeSession(res, userId) {
  res.cookie(COOKIE_NAME, signSession({ userId }), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 7
  });
}

function clearSession(res) {
  res.clearCookie(COOKIE_NAME);
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ strict: false }));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.session = readSession(req);
  req.session.destroy = (callback) => {
    clearSession(res);
    if (callback) callback();
  };
  next();
});

const topics = [
  {
    slug: 'selenium-webdriver',
    title: 'Selenium Webdriver',
    description: 'Browser automation fundamentals, locators, waits, and frameworks.',
    timeLimitMinutes: 180
  },
  {
    slug: 'rest-api-testing',
    title: 'Rest Api testing',
    description: 'HTTP methods, API validation, assertions, and test design.',
    timeLimitMinutes: 180
  },
  {
    slug: 'playwright-automation',
    title: 'Playwright Automation',
    description: 'Modern end-to-end automation with robust selectors and fixtures.',
    timeLimitMinutes: 180
  }
];

function ensureDataFile() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify({ users: [], attempts: [] }, null, 2));
  }
}

function createEmptyStore() {
  return { users: [], attempts: [] };
}

function getBlobStore() {
  if (!netlifyBlobs) {
    return null;
  }

  try {
    return netlifyBlobs.getStore({
      name: process.env.NETLIFY_BLOB_STORE || 'qa-challenge-data',
      siteID: process.env.NETLIFY_SITE_ID,
      token: process.env.NETLIFY_AUTH_TOKEN || process.env.NETLIFY_API_TOKEN
    });
  } catch (error) {
    return null;
  }
}

async function readStore() {
  if (IS_NETLIFY && getBlobStore()) {
    const raw = await getBlobStore().get('store.json');
    if (!raw) {
      return createEmptyStore();
    }
    return JSON.parse(raw);
  }

  ensureDataFile();
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

async function writeStore(store) {
  if (IS_NETLIFY && getBlobStore()) {
    await getBlobStore().setJSON('store.json', store);
    return;
  }

  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2));
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derived = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return `${salt}:${derived}`;
}

function verifyPassword(password, storedHash) {
  const [salt, hashed] = storedHash.split(':');
  const derived = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return derived === hashed;
}

async function seedAdminUser() {
  const store = await readStore();
  if (!store.users.some((user) => user.username === 'admin')) {
    store.users.push({
      id: createId('user'),
      username: 'admin',
      preferredName: 'TekArch Admin',
      passwordHash: hashPassword('admin123'),
      role: 'admin',
      createdAt: new Date().toISOString()
    });
    await writeStore(store);
  }
}

function createId(prefix) {
  return `${prefix}-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
}

function sanitizeUser(user) {
  const { passwordHash, ...rest } = user;
  return rest;
}

function withAttemptMetrics(attempt) {
  const total = Number.isFinite(attempt.total) ? attempt.total : (Array.isArray(attempt.questions) ? attempt.questions.length : 0);
  const score = Number.isFinite(attempt.score) ? attempt.score : 0;
  const correctAnswers = Number.isFinite(attempt.correctAnswers)
    ? attempt.correctAnswers
    : Math.round((score / 100) * total);
  const wrongAnswers = Number.isFinite(attempt.wrongAnswers)
    ? attempt.wrongAnswers
    : Math.max(total - correctAnswers, 0);

  return {
    ...attempt,
    total,
    score,
    correctAnswers,
    wrongAnswers,
    eligibleForCertificate: score >= 80
  };
}

function buildQuestionBank(topicTitle, slug) {
  const templates = {
    'selenium-webdriver': [
      { stem: 'Which locator strategy is most resilient for dynamic UI elements?', options: ['ID', 'XPath', 'CSS Selector', 'Class Name'], answer: 1, explanation: 'CSS selectors and robust locators are usually preferred for dynamic layouts.' },
      { stem: 'What is the main purpose of WebDriverWait?', options: ['To wait for element visibility', 'To close the browser', 'To switch tabs', 'To download files'], answer: 0, explanation: 'WebDriverWait helps wait for conditions before interacting with elements.' },
      { stem: 'Which Selenium method launches a browser session?', options: ['get()', 'quit()', 'findElement()', 'switchTo()'], answer: 0, explanation: 'The WebDriver instance uses the browser driver to start and manage sessions.' },
      { stem: 'What does the Page Object Model help with?', options: ['Reducing test duplication', 'Removing browser drivers', 'Avoiding waits', 'Skipping assertions'], answer: 0, explanation: 'POM keeps locators and workflows in reusable page classes.' },
      { stem: 'Which command is used to pause execution until a condition is met?', options: ['sleep()', 'waitUntil()', 'explicit wait', 'navigate()'], answer: 2, explanation: 'Explicit waits are the standard way to wait for a specific condition.' }
    ],
    'rest-api-testing': [
      { stem: 'Which HTTP method is commonly used to create a new resource?', options: ['GET', 'POST', 'DELETE', 'PATCH'], answer: 1, explanation: 'POST is used to create resources on the server.' },
      { stem: 'What does status code 200 usually indicate?', options: ['Created', 'Bad request', 'Success', 'Moved permanently'], answer: 2, explanation: '200 OK indicates the request completed successfully.' },
      { stem: 'Which header is commonly used to send JSON data?', options: ['Accept', 'Authorization', 'Content-Type', 'Cookie'], answer: 2, explanation: 'Content-Type application/json identifies JSON request bodies.' },
      { stem: 'Why are assertions important in API tests?', options: ['They speed up the server', 'They validate expected responses', 'They skip retries', 'They log credentials'], answer: 1, explanation: 'Assertions verify that responses match the expected contract.' },
      { stem: 'Which tool is often used to inspect API requests and responses?', options: ['Figma', 'Postman', 'Photoshop', 'Excel'], answer: 1, explanation: 'Postman is popular for manual and automated API testing.' }
    ],
    'playwright-automation': [
      { stem: 'What is Playwright mainly used for?', options: ['Static site hosting', 'Cross-browser automation', 'Database migrations', 'Markdown rendering'], answer: 1, explanation: 'Playwright automates browser behavior across engines.' },
      { stem: 'Which locator is typically recommended for stable UI testing?', options: ['Text content', 'Data-testid', 'Inline styles', 'Random IDs'], answer: 1, explanation: 'data-testid selectors are stable and easy to maintain.' },
      { stem: 'What does a test fixture provide?', options: ['Network settings only', 'Reusable test context', 'Password hashing', 'Image compression'], answer: 1, explanation: 'Fixtures provide reusable setup for tests.' },
      { stem: 'Which action waits for navigation to complete?', options: ['page.click()', 'page.goto()', 'page.waitForURL()', 'page.fill()'], answer: 2, explanation: 'waitForURL waits for the page to navigate to the expected route.' },
      { stem: 'Which file format is commonly used for Playwright test configuration?', options: ['.jpg', '.json', 'playwright.config.ts', '.csv'], answer: 2, explanation: 'Playwright uses a configuration file to define projects and settings.' }
    ]
  };

  const topicTemplates = templates[slug] || [];
  const questions = [];

  for (let i = 0; i < 100; i += 1) {
    const template = topicTemplates[i % topicTemplates.length];
    questions.push({
      id: `${slug}-${i + 1}`,
      topic: topicTitle,
      prompt: `${template.stem} (${i + 1})`,
      options: template.options.map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`),
      correctAnswer: template.answer,
      explanation: template.explanation
    });
  }

  return questions;
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getTopicBySlug(slug) {
  return topics.find((topic) => topic.slug === slug);
}

async function getCurrentUser(req) {
  if (!req.session.userId) {
    return null;
  }
  const store = await readStore();
  return store.users.find((user) => user.id === req.session.userId) || null;
}

function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
}

function createQuestionBankMap() {
  return topics.reduce((acc, topic) => {
    acc[topic.slug] = buildQuestionBank(topic.title, topic.slug);
    return acc;
  }, {});
}

const questionBanks = createQuestionBankMap();

apiRouter.get('/health', (_req, res) => {
  res.json({ status: 'ok', topics: topics.length });
});

apiRouter.get('/topics', (_req, res) => {
  res.json(topics);
});

apiRouter.get('/me', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  const store = await readStore();
  const user = store.users.find((entry) => entry.id === req.session.userId);
  if (!user) {
    return res.status(401).json({ error: 'Session invalid' });
  }
  res.json(sanitizeUser(user));
});

apiRouter.post('/auth/register', async (req, res) => {
  const { username, password, preferredName } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  const store = await readStore();
  if (store.users.some((user) => user.username.toLowerCase() === username.toLowerCase())) {
    return res.status(409).json({ error: 'That username is already taken' });
  }
  const newUser = {
    id: createId('user'),
    username,
    preferredName: preferredName?.trim() || username,
    passwordHash: hashPassword(password),
    role: 'student',
    createdAt: new Date().toISOString()
  };
  store.users.push(newUser);
  await writeStore(store);
  req.session.userId = newUser.id;
  writeSession(res, newUser.id);
  res.json(sanitizeUser(newUser));
});

apiRouter.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  const store = await readStore();
  const user = store.users.find((entry) => entry.username.toLowerCase() === username.toLowerCase());
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  req.session.userId = user.id;
  writeSession(res, user.id);
  res.json(sanitizeUser(user));
});

apiRouter.post('/auth/logout', (req, res) => {
  req.session.userId = null;
  clearSession(res);
  res.json({ ok: true });
});

apiRouter.post('/tests/:topic/start', requireAuth, async (req, res) => {
  const topic = getTopicBySlug(req.params.topic);
  if (!topic) {
    return res.status(404).json({ error: 'Topic not found' });
  }
  const store = await readStore();
  const attempt = {
    id: createId('attempt'),
    userId: req.session.userId,
    topic: topic.slug,
    title: topic.title,
    startedAt: new Date().toISOString(),
    submittedAt: null,
    status: 'in-progress',
    questions: shuffle(questionBanks[topic.slug]).slice(0, 100),
    answers: {},
    score: 0,
    total: 100,
    timeLimitMs: topic.timeLimitMinutes * 60 * 1000
  };
  store.attempts.push(attempt);
  await writeStore(store);

  const safeQuestions = attempt.questions.map((question) => ({
    id: question.id,
    prompt: question.prompt,
    options: question.options,
    topic: question.topic
  }));

  res.json({ attempt, questions: safeQuestions });
});

apiRouter.post('/tests/:topic/submit', requireAuth, async (req, res) => {
  const topic = getTopicBySlug(req.params.topic);
  if (!topic) {
    return res.status(404).json({ error: 'Topic not found' });
  }
  const store = await readStore();
  const attempt = [...store.attempts].reverse().find((entry) => entry.userId === req.session.userId && entry.topic === topic.slug && entry.status === 'in-progress');
  if (!attempt) {
    return res.status(404).json({ error: 'No active test found' });
  }

  const answers = req.body.answers || {};
  const questions = attempt.questions || [];
  const correctCount = questions.reduce((total, question) => {
    const selectedAnswer = answers[question.id];
    return total + (selectedAnswer === question.correctAnswer ? 1 : 0);
  }, 0);

  const elapsedMs = Date.now() - new Date(attempt.startedAt).getTime();
  const timeUp = elapsedMs > attempt.timeLimitMs;
  attempt.answers = answers;
  attempt.score = Math.round((correctCount / questions.length) * 100);
  attempt.total = questions.length;
  attempt.correctAnswers = correctCount;
  attempt.wrongAnswers = questions.length - correctCount;
  attempt.submittedAt = new Date().toISOString();
  attempt.status = 'submitted';
  attempt.timeSpentMs = elapsedMs;
  attempt.timeUp = timeUp;

  await writeStore(store);
  res.json({ ok: true, result: withAttemptMetrics(attempt), timeUp });
});

apiRouter.get('/results', requireAuth, async (req, res) => {
  const store = await readStore();
  const attempts = store.attempts
    .filter((entry) => entry.userId === req.session.userId)
    .sort((a, b) => new Date(b.startedAt) - new Date(a.startedAt))
    .map(withAttemptMetrics);
  res.json(attempts);
});

apiRouter.get('/admin/results', requireAuth, async (req, res) => {
  const store = await readStore();
  const user = store.users.find((entry) => entry.id === req.session.userId);
  if (!user || user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access only' });
  }

  const submittedAttempts = store.attempts
    .filter((entry) => entry.status === 'submitted')
    .map((entry) => {
      const owner = store.users.find((candidate) => candidate.id === entry.userId);
      return {
        ...withAttemptMetrics(entry),
        username: owner ? owner.username : 'Unknown user',
        preferredName: owner ? (owner.preferredName || owner.username) : 'Unknown user',
        role: owner ? owner.role : 'student'
      };
    });
  const summary = topics.map((topic) => {
    const topicAttempts = submittedAttempts.filter((entry) => entry.topic === topic.slug);
    const averageScore = topicAttempts.length
      ? Math.round(topicAttempts.reduce((sum, entry) => sum + entry.score, 0) / topicAttempts.length)
      : 0;
    return {
      topic: topic.title,
      slug: topic.slug,
      attempts: topicAttempts.length,
      averageScore,
      topScore: topicAttempts.length ? Math.max(...topicAttempts.map((entry) => entry.score)) : 0
    };
  });

  res.json({
    summary,
    attempts: submittedAttempts,
    users: store.users.map(sanitizeUser)
  });
});

apiRouter.post('/compile', requireAuth, (req, res) => {
  if (IS_NETLIFY) {
    return res.status(501).json({
      error: 'Java compilation is unavailable in Netlify deployments. Run the app locally to use Compile & Run.'
    });
  }

  const code = req.body.code || '';
  if (!code.trim()) {
    return res.status(400).json({ error: 'Please enter Java code first.' });
  }

  const match = code.match(/class\s+(\w+)/);
  const className = match ? match[1] : 'Solution';
  const fileName = `${className}.java`;
  const filePath = path.join(TEMP_DIR, fileName);
  fs.writeFileSync(filePath, code, 'utf8');

  execFile('javac', [filePath], { timeout: 10000 }, (compileError, compileStdout, compileStderr) => {
    if (compileError) {
      return res.json({ ok: false, output: compileStderr || compileStdout || compileError.message });
    }

    execFile('java', ['-cp', TEMP_DIR, className], { timeout: 10000 }, (runError, runStdout, runStderr) => {
      if (runError) {
        return res.json({ ok: false, output: runStderr || runStdout || runError.message });
      }
      res.json({ ok: true, output: runStdout || 'Program executed successfully with no output.' });
    });
  });
});

app.use('/api', apiRouter);

if (process.env.NETLIFY) {
  app.use('/', apiRouter);
}

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({ error: 'Invalid JSON payload' });
  }
  next(error);
});

seedAdminUser().catch((error) => {
  console.error('Failed to initialize admin user', error);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`QA Challenge app running on http://localhost:${PORT}`);
  });
}

module.exports = { app };
