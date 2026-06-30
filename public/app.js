const app = document.getElementById('app');

if (!app) {
  throw new Error('Root element #app was not found');
}

const TOPICS = [
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

const QUESTION_TEMPLATES = {
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

const STORAGE_KEY = 'qa-challenge-browser-store-v1';
const SESSION_KEY = 'qa-challenge-browser-session-v1';

const state = {
  user: null,
  topics: [],
  view: 'auth',
  questions: [],
  currentIndex: 0,
  selectedAnswers: {},
  activeAttempt: null,
  countdown: null,
  intervalId: null,
  results: [],
  adminResults: null,
  codingOutput: '',
  runtimeMode: 'browser'
};

let backend;

function render() {
  try {
    if (!state.user) {
      app.innerHTML = `
        <div class="container">
          <div class="nav">
            <h2>QA Challenge</h2>
          </div>
          ${renderDeploymentNotice()}
          <section class="hero">
            <h1>Login or register to start your assessment journey</h1>
            <p>Take 3-hour exams for Selenium, REST API testing, and Playwright. Admins get a consolidated overview, while candidates can review their own scores.</p>
            <div class="grid">
              <div class="card">
                <h3>100 questions per topic</h3>
                <p class="muted">Each assessment is crafted as multiple-choice questions with a 3-hour limit.</p>
              </div>
              <div class="card">
                <h3>${state.runtimeMode === 'server' ? 'Live Java compiler' : 'Browser-safe deployment'}</h3>
                <p class="muted">${state.runtimeMode === 'server'
                  ? 'Students can compile and run Java code directly from the dashboard.'
                  : 'Hosted builds keep accounts, tests, and results available in this browser without a server database.'}</p>
              </div>
            </div>
          </section>
          <div class="grid">
            <section class="panel">
              <h3>Login</h3>
              <form id="login-form" class="form-stack">
                <input name="username" placeholder="Username" required />
                <input name="password" placeholder="Password" type="password" required />
                <button type="submit">Login</button>
              </form>
            </section>
            <section class="panel">
              <h3>Register</h3>
              <form id="register-form" class="form-stack">
                <input name="username" placeholder="Username" required />
                <input name="password" placeholder="Password" type="password" required />
                <button type="submit">Create account</button>
              </form>
            </section>
          </div>
        </div>
      `;
      bindAuthForms();
      return;
    }

    app.innerHTML = `
      <div class="container">
        <div class="nav">
          <div>
            <h2>QA Challenge Dashboard</h2>
            <div class="badge">${state.user.role === 'admin' ? 'Admin' : 'Candidate'}</div>
          </div>
          <div class="actions">
            <button class="secondary" data-action="dashboard">Dashboard</button>
            <button class="secondary" data-action="results">My Results</button>
            <button class="secondary" data-action="coding">Coding Lab</button>
            ${state.user.role === 'admin' ? '<button class="secondary" data-action="admin">Admin</button>' : ''}
            <button data-action="logout">Logout</button>
          </div>
        </div>

        ${state.view === 'dashboard' ? renderDashboard() : ''}
        ${state.view === 'results' ? renderResults() : ''}
        ${state.view === 'admin' ? renderAdmin() : ''}
        ${state.view === 'coding' ? renderCoding() : ''}
        ${state.view === 'test' ? renderTest() : ''}
      </div>
    `;

    bindDashboardActions();
    bindResultActions();
    bindCodingActions();
    bindTestActions();
  } catch (error) {
    console.error('Render failed', error);
    app.innerHTML = `
      <div class="container">
        <section class="panel">
          <h3>Something went wrong</h3>
          <p class="muted">The app could not render correctly. Please refresh the page.</p>
          <pre>${error.message}</pre>
        </section>
      </div>
    `;
  }
}

function renderDeploymentNotice() {
  if (state.runtimeMode !== 'browser') {
    return '';
  }

  return `
    <section class="panel">
      <h3>Static deployment mode</h3>
      <p class="muted">This hosted build stores users, attempts, and results in this browser so the assessments stay available on Netlify. Use <strong>admin</strong> / <strong>admin123</strong> for the admin view.</p>
    </section>
  `;
}

function renderDashboard() {
  const username = state.user?.username || 'student';
  return `
    ${renderDeploymentNotice()}
    <section class="hero">
      <h1>Welcome back, ${username}</h1>
      <p>Choose a topic to begin your timed assessment. Each exam is 3 hours and includes 100 multiple-choice questions.</p>
    </section>
    ${state.topics.length ? `
      <div class="grid">
        ${state.topics.map((topic) => `
          <div class="card topic-card">
            <h3>${topic.title}</h3>
            <div class="meta">${topic.description}</div>
            <div class="badge">${topic.timeLimitMinutes / 60} hours</div>
            <button data-topic="${topic.slug}" data-action="start-test">Start Test</button>
          </div>
        `).join('')}
      </div>
    ` : `
      <section class="panel">
        <h3>Loading topics...</h3>
        <p class="muted">The assessment topics are being loaded. Please wait a moment and refresh if needed.</p>
      </section>
    `}
  `;
}

function renderTest() {
  const currentQuestion = state.questions[state.currentIndex];
  if (!currentQuestion) {
    return '<section class="panel"><h3>No questions loaded</h3></section>';
  }

  const currentSelection = state.selectedAnswers[currentQuestion.id];
  return `
    <section class="panel">
      <div class="nav">
        <div><h3>${currentQuestion.topic}</h3><div class="muted">Question ${state.currentIndex + 1} of ${state.questions.length}</div></div>
        <div class="badge">Time left: ${formatTime(state.countdown)}</div>
      </div>
      <div class="question-card">
        <h3>${currentQuestion.prompt}</h3>
        <div class="option-list">
          ${currentQuestion.options.map((option, index) => `
            <label>
              <input type="radio" name="answer" value="${index}" ${currentSelection === index ? 'checked' : ''} />
              ${option}
            </label>
          `).join('')}
        </div>
      </div>
      <div class="form-row" style="margin-top: 1rem;">
        <button class="secondary" data-action="prev-question">Previous</button>
        <button class="secondary" data-action="next-question">Next</button>
        <button data-action="submit-test">Submit Test</button>
      </div>
    </section>
  `;
}

function renderResults() {
  if (!state.results.length) {
    return `
      <section class="panel">
        <h3>Your Results</h3>
        <p class="muted">No tests have been completed yet.</p>
      </section>
    `;
  }

  return `
    <section class="panel">
      <h3>Your Results</h3>
      <table class="table">
        <thead>
          <tr><th>Topic</th><th>Score</th><th>Status</th><th>Submitted</th></tr>
        </thead>
        <tbody>
          ${state.results.map((attempt) => `
            <tr>
              <td>${attempt.title}</td>
              <td>${attempt.score}%</td>
              <td>${attempt.timeUp ? 'Time up' : 'Completed'}</td>
              <td>${new Date(attempt.submittedAt).toLocaleString()}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </section>
  `;
}

function renderAdmin() {
  if (!state.adminResults) {
    return '<section class="panel"><h3>Loading admin overview...</h3></section>';
  }

  return `
    <section class="panel">
      <h3>Consolidated Results</h3>
      <table class="table">
        <thead>
          <tr><th>Topic</th><th>Attempts</th><th>Average Score</th><th>Top Score</th></tr>
        </thead>
        <tbody>
          ${state.adminResults.summary.map((entry) => `
            <tr>
              <td>${entry.topic}</td>
              <td>${entry.attempts}</td>
              <td>${entry.averageScore}%</td>
              <td>${entry.topScore}%</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </section>
  `;
}

function renderCoding() {
  return `
    <section class="panel">
      <h3>Live Java Coding Lab</h3>
      <p class="muted">${state.runtimeMode === 'server'
        ? 'Paste a Java class and compile it instantly. The server will compile and run it for you.'
        : 'Static deployments keep assessments available, but Java compilation is disabled here. Run the local Node app to compile and execute Java code.'}</p>
      <textarea id="java-code" rows="18" spellcheck="false">public class Solution {\n  public static void main(String[] args) {\n    System.out.println("Hello from QA Challenge");\n  }\n}</textarea>
      <div class="form-row" style="margin-top: 1rem;">
        <button id="compile-button">Compile & Run</button>
      </div>
      <h4>Output</h4>
      <pre>${state.codingOutput || 'No output yet.'}</pre>
    </section>
  `;
}

function bindAuthForms() {
  document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    const response = await backend.login(data);
    if (response.error) {
      alert(response.error);
      return;
    }

    state.user = response;
    await loadDashboardData();
    state.view = 'dashboard';
    render();
  });

  document.getElementById('register-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    const response = await backend.register(data);
    if (response.error) {
      alert(response.error);
      return;
    }

    state.user = response;
    await loadDashboardData();
    state.view = 'dashboard';
    render();
  });
}

function bindDashboardActions() {
  app.querySelectorAll('[data-action="start-test"]').forEach((button) => {
    button.addEventListener('click', async () => {
      const topicSlug = button.getAttribute('data-topic');
      const response = await backend.startTest(topicSlug);
      if (response.error) {
        alert(response.error);
        return;
      }

      state.questions = response.questions;
      state.activeAttempt = response.attempt;
      state.selectedAnswers = {};
      state.currentIndex = 0;
      state.countdown = response.attempt.timeLimitMs;
      state.view = 'test';
      startCountdown();
      render();
    });
  });

  app.querySelectorAll('[data-action]').forEach((button) => {
    const action = button.getAttribute('data-action');
    if (!action || action === 'start-test') {
      return;
    }

    button.addEventListener('click', async () => {
      if (action === 'dashboard') {
        state.view = 'dashboard';
        render();
      } else if (action === 'results') {
        await loadResults();
        state.view = 'results';
        render();
      } else if (action === 'admin') {
        await loadAdminResults();
        state.view = 'admin';
        render();
      } else if (action === 'coding') {
        state.view = 'coding';
        render();
      } else if (action === 'logout') {
        await backend.logout();
        clearInterval(state.intervalId);
        state.user = null;
        state.view = 'auth';
        state.activeAttempt = null;
        state.questions = [];
        state.selectedAnswers = {};
        render();
      }
    });
  });
}

function bindTestActions() {
  const form = app.querySelector('.question-card');
  if (!form) {
    return;
  }

  app.querySelectorAll('input[name="answer"]').forEach((input) => {
    input.addEventListener('change', (event) => {
      const selectedIndex = Number(event.target.value);
      const currentQuestion = state.questions[state.currentIndex];
      state.selectedAnswers[currentQuestion.id] = selectedIndex;
    });
  });

  app.querySelector('[data-action="prev-question"]')?.addEventListener('click', () => {
    state.currentIndex = Math.max(0, state.currentIndex - 1);
    render();
  });

  app.querySelector('[data-action="next-question"]')?.addEventListener('click', () => {
    state.currentIndex = Math.min(state.questions.length - 1, state.currentIndex + 1);
    render();
  });

  app.querySelector('[data-action="submit-test"]')?.addEventListener('click', async () => {
    const response = await backend.submitTest(state.activeAttempt.topic, state.selectedAnswers);
    if (response.error) {
      alert(response.error);
      return;
    }

    clearInterval(state.intervalId);
    state.activeAttempt = null;
    await loadResults();
    state.view = 'results';
    render();

    if (response.timeUp) {
      alert('Time is up. Your test has been submitted.');
    }
  });
}

function bindResultActions() {
  // Reserved for future extensions.
}

function bindCodingActions() {
  const button = document.getElementById('compile-button');
  button?.addEventListener('click', async () => {
    const code = document.getElementById('java-code').value;
    const response = await backend.compile(code);
    state.codingOutput = response.output || response.error || 'No output.';
    render();
  });
}

async function loadDashboardData() {
  state.topics = await backend.getTopics();
}

async function loadResults() {
  state.results = await backend.getResults();
}

async function loadAdminResults() {
  state.adminResults = await backend.getAdminResults();
}

function startCountdown() {
  clearInterval(state.intervalId);
  state.intervalId = setInterval(() => {
    state.countdown = Math.max(0, state.countdown - 1000);
    if (state.countdown === 0) {
      clearInterval(state.intervalId);
      submitTestWhenTimeUp();
    }
    render();
  }, 1000);
}

async function submitTestWhenTimeUp() {
  const response = await backend.submitTest(state.activeAttempt.topic, state.selectedAnswers);
  state.activeAttempt = null;
  await loadResults();
  state.view = 'results';
  render();
  if (!response.error) {
    alert('Time is up. Your test has been submitted.');
  }
}

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function isLocalHost() {
  return ['localhost', '127.0.0.1'].includes(window.location.hostname);
}

async function selectBackend() {
  if (isLocalHost()) {
    try {
      const health = await serverApi('/api/health');
      if (health && !health.error && health.status === 'ok') {
        state.runtimeMode = 'server';
        return createServerBackend();
      }
    } catch (error) {
      console.warn('Falling back to browser mode because the local API is unavailable.', error);
    }
  }

  state.runtimeMode = 'browser';
  return createBrowserBackend();
}

function createServerBackend() {
  return {
    async getTopics() {
      const response = await serverApi('/api/topics');
      return Array.isArray(response) ? response : [];
    },
    login(data) {
      return serverApi('/api/auth/login', { method: 'POST', body: data });
    },
    register(data) {
      return serverApi('/api/auth/register', { method: 'POST', body: data });
    },
    me() {
      return serverApi('/api/me');
    },
    logout() {
      return serverApi('/api/auth/logout', { method: 'POST' });
    },
    startTest(topicSlug) {
      return serverApi(`/api/tests/${topicSlug}/start`, { method: 'POST' });
    },
    submitTest(topicSlug, answers) {
      return serverApi(`/api/tests/${topicSlug}/submit`, {
        method: 'POST',
        body: { answers }
      });
    },
    async getResults() {
      const response = await serverApi('/api/results');
      return Array.isArray(response) ? response : [];
    },
    getAdminResults() {
      return serverApi('/api/admin/results');
    },
    compile(code) {
      return serverApi('/api/compile', {
        method: 'POST',
        body: { code }
      });
    }
  };
}

function createBrowserBackend() {
  return {
    async getTopics() {
      return TOPICS;
    },
    async login({ username, password }) {
      if (!username || !password) {
        return { error: 'Username and password are required' };
      }

      const store = readBrowserStore();
      const user = store.users.find((entry) => entry.username.toLowerCase() === username.toLowerCase());
      if (!user || user.password !== password) {
        return { error: 'Invalid credentials' };
      }

      writeBrowserSession(user.id);
      return sanitizeBrowserUser(user);
    },
    async register({ username, password }) {
      if (!username || !password) {
        return { error: 'Username and password are required' };
      }

      const store = readBrowserStore();
      if (store.users.some((entry) => entry.username.toLowerCase() === username.toLowerCase())) {
        return { error: 'That username is already taken' };
      }

      const user = {
        id: createId('user'),
        username,
        password,
        role: 'student',
        createdAt: new Date().toISOString()
      };

      store.users.push(user);
      writeBrowserStore(store);
      writeBrowserSession(user.id);
      return sanitizeBrowserUser(user);
    },
    async me() {
      const user = getBrowserCurrentUser();
      return user ? sanitizeBrowserUser(user) : { error: 'Not logged in' };
    },
    async logout() {
      clearBrowserSession();
      return { ok: true };
    },
    async startTest(topicSlug) {
      const user = getBrowserCurrentUser();
      if (!user) {
        return { error: 'Authentication required' };
      }

      const topic = TOPICS.find((entry) => entry.slug === topicSlug);
      if (!topic) {
        return { error: 'Topic not found' };
      }

      const store = readBrowserStore();
      const attempt = {
        id: createId('attempt'),
        userId: user.id,
        topic: topic.slug,
        title: topic.title,
        startedAt: new Date().toISOString(),
        submittedAt: null,
        status: 'in-progress',
        questions: shuffle(buildQuestionBank(topic.title, topic.slug)).slice(0, 100),
        answers: {},
        score: 0,
        total: 100,
        timeLimitMs: topic.timeLimitMinutes * 60 * 1000
      };

      store.attempts.push(attempt);
      writeBrowserStore(store);

      return {
        attempt,
        questions: attempt.questions.map((question) => ({
          id: question.id,
          prompt: question.prompt,
          options: question.options,
          topic: question.topic
        }))
      };
    },
    async submitTest(topicSlug, answers) {
      const user = getBrowserCurrentUser();
      if (!user) {
        return { error: 'Authentication required' };
      }

      const store = readBrowserStore();
      const attempt = [...store.attempts].reverse().find((entry) => (
        entry.userId === user.id
        && entry.topic === topicSlug
        && entry.status === 'in-progress'
      ));

      if (!attempt) {
        return { error: 'No active test found' };
      }

      const questions = Array.isArray(attempt.questions) ? attempt.questions : [];
      const correctCount = questions.reduce((total, question) => {
        return total + (answers[question.id] === question.correctAnswer ? 1 : 0);
      }, 0);

      const elapsedMs = Date.now() - new Date(attempt.startedAt).getTime();
      attempt.answers = answers;
      attempt.score = questions.length ? Math.round((correctCount / questions.length) * 100) : 0;
      attempt.total = questions.length;
      attempt.submittedAt = new Date().toISOString();
      attempt.status = 'submitted';
      attempt.timeSpentMs = elapsedMs;
      attempt.timeUp = elapsedMs > attempt.timeLimitMs;

      writeBrowserStore(store);
      return { ok: true, result: attempt, timeUp: attempt.timeUp };
    },
    async getResults() {
      const user = getBrowserCurrentUser();
      if (!user) {
        return [];
      }

      const store = readBrowserStore();
      return store.attempts
        .filter((entry) => entry.userId === user.id)
        .sort((left, right) => new Date(right.startedAt) - new Date(left.startedAt));
    },
    async getAdminResults() {
      const user = getBrowserCurrentUser();
      if (!user || user.role !== 'admin') {
        return { summary: [] };
      }

      const store = readBrowserStore();
      const submittedAttempts = store.attempts.filter((entry) => entry.status === 'submitted');
      const summary = TOPICS.map((topic) => {
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

      return { summary, attempts: submittedAttempts };
    },
    async compile() {
      return {
        ok: false,
        output: 'Java compilation is disabled in static deployment mode. Run the app locally with Node.js and Java installed to use Compile & Run.'
      };
    }
  };
}

async function serverApi(path, options = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const config = {
    headers,
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined
  };

  const response = await fetch(path, config);
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return response.json();
  }

  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (error) {
    return { ok: response.ok, status: response.status, raw: text };
  }
}

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const targetIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[targetIndex]] = [copy[targetIndex], copy[index]];
  }
  return copy;
}

function buildQuestionBank(topicTitle, slug) {
  const templates = QUESTION_TEMPLATES[slug] || [];
  const questions = [];

  for (let index = 0; index < 100; index += 1) {
    const template = templates[index % templates.length];
    questions.push({
      id: `${slug}-${index + 1}`,
      topic: topicTitle,
      prompt: `${template.stem} (${index + 1})`,
      options: template.options.map((option, optionIndex) => `${String.fromCharCode(65 + optionIndex)}. ${option}`),
      correctAnswer: template.answer,
      explanation: template.explanation
    });
  }

  return questions;
}

function createDefaultBrowserStore() {
  return {
    users: [
      {
        id: 'admin-user',
        username: 'admin',
        password: 'admin123',
        role: 'admin',
        createdAt: new Date('2026-01-01T00:00:00.000Z').toISOString()
      }
    ],
    attempts: []
  };
}

function readBrowserStore() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initialStore = createDefaultBrowserStore();
      writeBrowserStore(initialStore);
      return initialStore;
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.users) || !Array.isArray(parsed.attempts)) {
      throw new Error('Invalid browser store');
    }

    if (!parsed.users.some((user) => user.username === 'admin')) {
      parsed.users.unshift(createDefaultBrowserStore().users[0]);
      writeBrowserStore(parsed);
    }

    return parsed;
  } catch (error) {
    const fallbackStore = createDefaultBrowserStore();
    writeBrowserStore(fallbackStore);
    return fallbackStore;
  }
}

function writeBrowserStore(store) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function writeBrowserSession(userId) {
  window.localStorage.setItem(SESSION_KEY, userId);
}

function clearBrowserSession() {
  window.localStorage.removeItem(SESSION_KEY);
}

function getBrowserCurrentUser() {
  const userId = window.localStorage.getItem(SESSION_KEY);
  if (!userId) {
    return null;
  }

  return readBrowserStore().users.find((user) => user.id === userId) || null;
}

function sanitizeBrowserUser(user) {
  const { password, ...safeUser } = user;
  return safeUser;
}

(async function init() {
  backend = await selectBackend();

  try {
    const userResponse = await backend.me();
    if (userResponse && !userResponse.error) {
      state.user = userResponse;
      await loadDashboardData();
      await loadResults();
      state.view = 'dashboard';
    }
  } catch (error) {
    console.error('Initial bootstrap failed', error);
    state.user = null;
  }

  if (!state.topics.length) {
    await loadDashboardData();
  }

  render();
})();
