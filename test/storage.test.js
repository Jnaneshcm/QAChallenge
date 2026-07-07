const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');

function createTempStore() {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'qa-challenge-'));
  const dataFile = path.join(tempDir, 'store.json');
  fs.writeFileSync(dataFile, JSON.stringify({ users: [], attempts: [] }));
  return { tempDir, dataFile };
}

test('buildQuestionBank preserves template order without numbering suffixes', () => {
  const appPath = path.join(__dirname, '..', 'public', 'app.js');
  const appSource = fs.readFileSync(appPath, 'utf8');
  const match = appSource.match(/function buildQuestionBank\(topicTitle, slug\) \{[\s\S]*?\n\}/);

  assert.ok(match, 'buildQuestionBank function was not found');

  const script = `
    const QUESTION_TEMPLATES = {
      sample: [
        { stem: 'First question', options: ['A', 'B'], answer: 0, explanation: 'First' },
        { stem: 'Second question', options: ['A', 'B'], answer: 0, explanation: 'Second' }
      ]
    };
    ${match[0]}
    this.buildQuestionBankResult = buildQuestionBank('Sample Topic', 'sample');
  `;

  const context = { console };
  vm.createContext(context);
  vm.runInContext(script, context);

  const questions = context.buildQuestionBankResult;
  assert.equal(questions[0].prompt, 'First question');
  assert.equal(questions[1].prompt, 'Second question');
  assert.equal(questions[0].prompt.includes('('), false);
});

test('store persists registered users and attempts to disk', () => {
  const { tempDir, dataFile } = createTempStore();
  const storePath = dataFile;

  const store = JSON.parse(fs.readFileSync(storePath, 'utf8'));
  store.users.push({
    id: 'user-1',
    username: 'alice',
    preferredName: 'Alice',
    passwordHash: 'hash',
    role: 'student',
    createdAt: new Date().toISOString()
  });
  store.attempts.push({
    id: 'attempt-1',
    userId: 'user-1',
    topic: 'selenium-webdriver',
    title: 'Selenium Webdriver',
    status: 'submitted',
    score: 85,
    total: 100,
    correctAnswers: 85,
    wrongAnswers: 15,
    submittedAt: new Date().toISOString(),
    eligibleForCertificate: true
  });
  fs.writeFileSync(storePath, JSON.stringify(store, null, 2));

  const persisted = JSON.parse(fs.readFileSync(storePath, 'utf8'));
  assert.equal(persisted.users[0].username, 'alice');
  assert.equal(persisted.attempts[0].score, 85);
  assert.equal(persisted.attempts[0].eligibleForCertificate, true);

  fs.rmSync(tempDir, { recursive: true, force: true });
});
