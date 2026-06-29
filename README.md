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
4. Set the build command to `npm install`.
5. Set the publish directory to `public`.
6. Add a redirect rule so all routes serve `index.html`.
7. Deploy.

### Notes
- The app uses a Netlify Functions endpoint at `/api/*` via [netlify/functions/api.js](netlify/functions/api.js).
- Admin login is available with username `admin` and password `admin123`.
