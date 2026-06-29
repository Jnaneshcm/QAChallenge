const app = document.getElementById('app');

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
  codingOutput: ''
};

function render() {
  if (!state.user) {
    app.innerHTML = `
      <div class="container">
        <div class="nav">
          <h2>QA Challenge</h2>
        </div>
        <section class="hero">
          <h1>Login or register to start your assessment journey</h1>
          <p>Take 3-hour exams for Selenium, REST API testing, and Playwright. Admins get a consolidated overview, while candidates can review their own scores.</p>
          <div class="grid">
            <div class="card">
              <h3>100 questions per topic</h3>
              <p class="muted">Each assessment is crafted as multiple-choice questions with a 3-hour limit.</p>
            </div>
            <div class="card">
              <h3>Live Java compiler</h3>
              <p class="muted">Students can compile and run Java code directly from the dashboard.</p>
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
}

function renderDashboard() {
  return `
    <section class="hero">
      <h1>Welcome back, ${state.user.username}</h1>
      <p>Choose a topic to begin your timed assessment. Each exam is 3 hours and includes 100 multiple-choice questions.</p>
    </section>
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
    return '<section class="panel"><h3>Loading admin overview…</h3></section>';
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
      <p class="muted">Paste a Java class and compile it instantly. The server will compile and run it for you.</p>
      <textarea id="java-code" rows="18" spellcheck="false">public class Solution {\n  public static void main(String[] args) {\n    System.out.println(\"Hello from QA Challenge\");\n  }\n}</textarea>
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
    const response = await api('/api/auth/login', { method: 'POST', body: data });
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
    const response = await api('/api/auth/register', { method: 'POST', body: data });
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
      const response = await api(`/api/tests/${topicSlug}/start`, { method: 'POST' });
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
    if (!button.getAttribute('data-action')) return;
    if (button.getAttribute('data-action') === 'start-test') return;
    button.addEventListener('click', async () => {
      const action = button.getAttribute('data-action');
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
        await api('/api/auth/logout', { method: 'POST' });
        clearInterval(state.intervalId);
        state.user = null;
        state.view = 'auth';
        render();
      }
    });
  });
}

function bindTestActions() {
  const form = app.querySelector('.question-card');
  if (!form) return;

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
    const response = await api(`/api/tests/${state.activeAttempt.topic}/submit`, {
      method: 'POST',
      body: { answers: state.selectedAnswers }
    });
    clearInterval(state.intervalId);
    await loadResults();
    state.view = 'results';
    render();
    if (response.timeUp) {
      alert('Time is up. Your test has been submitted.');
    }
  });
}

function bindResultActions() {
  // No-op placeholder for future extension.
}

function bindCodingActions() {
  const button = document.getElementById('compile-button');
  button?.addEventListener('click', async () => {
    const code = document.getElementById('java-code').value;
    const response = await api('/api/compile', { method: 'POST', body: { code } });
    state.codingOutput = response.output || response.error || 'No output.';
    render();
  });
}

async function loadDashboardData() {
  const [topicsResponse] = await Promise.all([api('/api/topics')]);
  state.topics = topicsResponse;
}

async function loadResults() {
  state.results = await api('/api/results');
}

async function loadAdminResults() {
  state.adminResults = await api('/api/admin/results');
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
  const response = await api(`/api/tests/${state.activeAttempt.topic}/submit`, {
    method: 'POST',
    body: { answers: state.selectedAnswers }
  });
  await loadResults();
  state.view = 'results';
  render();
  alert('Time is up. Your test has been submitted.');
}

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

async function api(path, options = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const config = {
    headers,
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined
  };
  const response = await fetch(path, config);
  return response.json();
}

(async function init() {
  try {
    const userResponse = await api('/api/me');
    if (userResponse && !userResponse.error) {
      state.user = userResponse;
      await loadDashboardData();
      await loadResults();
      state.view = 'dashboard';
    }
  } catch (error) {
    state.user = null;
  }
  render();
})();
