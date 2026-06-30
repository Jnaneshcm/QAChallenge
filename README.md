# QA Challenge Platform

This project is a simple assessment platform for Selenium, REST API Testing, and Playwright Automation.

## Local run

```bash
npm install
node server.js
```

Open http://localhost:3000

## Netlify deployment

1. Push this project to GitHub.
2. Create a new site in Netlify.
3. Connect the repository.
4. Set the build command to `npm run build`.
5. Set the publish directory to `public`.
6. Add a redirect rule so all routes serve `index.html`.
7. Deploy.

### Notes
- Localhost uses the Node/Express API in [server.js](server.js).
- Hosted builds use browser storage so the tests work on Netlify without a database or writable server filesystem.
- Admin login is available with username `admin` and password `admin123`.
- Java compilation is only available when you run the app locally with Node.js and Java installed.
- Results now show percentage, correct answers, wrong answers, and certificate eligibility.
- Certificates can be downloaded after scoring 80% or above.
- The admin area includes topic summaries, all registered users, and all submitted attempts.
