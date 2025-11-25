# 1. Jobify – Job Tracking Dashboard

Jobify is a full-stack job tracking app where users can register, log in, and manage job applications through a modern dashboard. It includes authentication, job CRUD, filters, stats, and an admin overview.

---

## 2. Overview

### Main Features

- User registration and login with JWT + HTTP-only cookies
- Create, edit, delete job entries
- Filter jobs by status, type, and search text
- Sort jobs by date and other criteria
- Paginated job listing (All Jobs page)
- Stats page with charts of monthly applications
- User profile with avatar upload (Cloudinary)
- Dark / light theme toggle
- Admin dashboard with basic app stats
- Protected routes and test/demo user with read-only restrictions

### Tech Stack

- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Frontend:** React, Vite, React Router, Styled Components
- **State / Data:** React Query
- **Auth:** JWT, HTTP-only cookies
- **Uploads:** Multer + Cloudinary
- **Security:** Helmet, express-mongo-sanitize, express-rate-limit
- **Validation:** express-validator

---

## 3. Requirements

- Node.js v18+
- npm
- MongoDB (Atlas or local instance)
- Cloudinary account (for avatar uploads)

---

## 4. Installation

From the **Jobify** root folder:

```bash
npm install
cd client
npm install
```

Or use the convenience script (from root):

```bash
npm run setup-project
```

This will install dependencies in both root and `/client`.

---

## 5. Environment Variables

Create a `.env` file in the project root with the following variables:

```env
NODE_ENV=development
PORT=5100

MONGO_URL=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

### Notes

- `PORT` – Express server port (default used in code: `5100`).
- `MONGO_URL` – MongoDB connection string (Atlas or local).
- `JWT_SECRET` – Secret used to sign JWTs.
- `JWT_EXPIRES_IN` – Token lifetime (e.g. `1d`, `7d`).
- `CLOUD_*` – Cloudinary credentials used in `server.js` via `cloudinary.config(...)`.

---

## 6. Backend (Root) Dependencies

From `package.json` at the root, the backend uses:

```text
bcryptjs
cloudinary
concurrently
cookie-parser
datauri
dayjs
dotenv
express
express-async-error
express-async-errors
express-mongo-sanitize
express-rate-limit
express-validator
helmet
http-status-codes
jsonwebtoken
mongoose
morgan
multer
nanoid
nodemon
```

These are installed automatically with:

```bash
npm install
```

---

## 7. Frontend (/client) Dependencies

From `client/package.json`:

```text
@tanstack/react-query
@tanstack/react-query-devtools
axios
dayjs
react
react-dom
react-icons
react-router-dom
react-toastify
recharts
styled-components
```

Dev dependencies include:

```text
@vitejs/plugin-react
eslint and related plugins
vite
```

All of these are installed by:

```bash
cd client
npm install
```

---

## 8. NPM Scripts

### Root (Backend + Dev Orchestration)

Defined in `package.json` at the root:

```json
"scripts": {
  "setup-project": "npm i && cd client && npm i",
  "setup-production-app": "npm i && cd client && npm i && npm run build",
  "server": "nodemon server",
  "client": "cd client && npm run dev",
  "dev": "concurrently --kill-others-on-fail \" npm run server\" \" npm run client\""
}
```

- `npm run server` – starts the Express API with nodemon on `PORT` (default 5100)
- `npm run client` – starts the Vite dev server (frontend)
- `npm run dev` – runs **both** server and client concurrently
- `npm run setup-project` – installs dependencies in root and client
- `npm run setup-production-app` – installs everything and builds the client

### Client

Inside `/client`:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "lint": "eslint .",
  "preview": "vite preview"
}
```

---

## 9. Running the App (Development)

### Option 1 – One command (recommended)

From the root:

```bash
npm run dev
```

- Backend: `http://localhost:5100`
- Frontend (Vite): `http://localhost:5173`

The Vite dev server proxies API requests to the backend.

### Option 2 – Manual

In one terminal:

```bash
npm run server
```

In another terminal:

```bash
npm run client
```

---

## 10. Vite Proxy / API Base URL

The frontend talks to the backend via a relative `/api/v1` base URL.

- Axios instance: `client/src/utils/customFetch.js`

```js
const customFetch = axios.create({
  baseURL: "/api/v1",
});
```

- Vite proxy: `client/vite.config.js`

```js
server: {
  proxy: {
    "/api": {
      target: "http://localhost:5100/api",
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ""),
    },
  },
},
```

So in development:

- Frontend runs at `http://localhost:5173`
- Requests to `/api/v1/...` are proxied to `http://localhost:5100/api/v1/...`

---

## 11. API Routes

All API routes are mounted under `/api/v1`.

### Auth Routes – `/api/v1/auth`

From `routes/authRouter.js`:

- `POST /api/v1/auth/register` – register a new user
- `POST /api/v1/auth/login` – login existing user
- `GET  /api/v1/auth/logout` – logout user (clears cookie)

Rate limiting is applied to register and login endpoints via `express-rate-limit`.

### Job Routes – `/api/v1/jobs`

From `routes/jobRouter.js` (protected: `authenticateUser`):

- `GET    /api/v1/jobs` – get all jobs (with filters & pagination)
- `POST   /api/v1/jobs` – create a job
- `GET    /api/v1/jobs/:id` – get a single job
- `PATCH  /api/v1/jobs/:id` – update a job
- `DELETE /api/v1/jobs/:id` – delete a job
- `GET    /api/v1/jobs/stats` – aggregated stats for jobs

Some routes use `checkForTestUser` middleware to block write operations for the demo/test user.

### User Routes – `/api/v1/users`

From `routes/userRouter.js` (protected):

- `GET  /api/v1/users/current-user` – get the current logged-in user
- `GET  /api/v1/users/admin/app-stats` – admin-only app statistics
- `PATCH /api/v1/users/update-user` – update user profile
  - Uses `multer` to handle `avatar` upload
  - Uses `validateUpdateUserInput` for server-side validation

---

## 12. Database Seeding (Mock Jobs)

A script is included to populate mock job data for a specific user.

File: `populate.js`

Behavior:

- Connects to `MONGO_URL`
- Finds user with email `john@gmail.com` (or `test@test.com` if you switch)
- Loads `utils/mockData.json`
- Deletes existing jobs for that user
- Inserts the mock jobs

Run:

```bash
node populate.js
```

Make sure:

- `.env` is configured with a valid `MONGO_URL`
- The target user (`john@gmail.com` or other) actually exists in the database

---

## 13. Security Layer

In `server.js`:

- `helmet()` – sets secure HTTP headers
- `express-mongo-sanitize` – sanitizes inputs to prevent NoSQL injection
- `rateLimiter` – limits repeated requests to auth endpoints
- `cookie-parser` – parses cookies (for JWT store)

Proper error handling and 404 handling are implemented via:

- `notFoundMiddleware`
- `errorHandlerMiddleware`

---

## 14. Frontend Features

Pages under `client/src/pages/`:

- `Landing` – marketing/intro page
- `Register` – user registration
- `Login` – login with email/password + demo login
- `DashboardLayout` – parent layout for protected dashboard routes
- `AddJob` – create a new job
- `AllJobs` – list, filter, search, paginate jobs
- `Stats` – graphs and stats for job applications (Recharts + dayjs)
- `Profile` – update user profile + avatar upload (Cloudinary)
- `Admin` – admin-only stats view

Key libraries:

- **React Query (@tanstack/react-query)** – data fetching & caching
- **React Router** – nested routes, loaders/actions
- **React Toastify** – notifications
- **Styled Components** – styling + layout wrappers
- **Recharts** – charts on Stats page
- **React Icons** – icons for navigation and UI

Dark theme state and user/drawer state are provided via context/hooks in the dashboard layout.

---

## 15. Production Build & Deployment

### Build frontend

From `/client`:

```bash
npm run build
```

This generates a production build in `client/dist`.

### Setup for Production

- Use `npm run setup-production-app` (root) to install everything and build client:

```bash
npm run setup-production-app
```

- Ensure all environment variables are set on the production host:
  - `NODE_ENV=production`
  - `MONGO_URL`
  - `JWT_SECRET`
  - `JWT_EXPIRES_IN`
  - `CLOUD_NAME`, `CLOUD_API_KEY`, `CLOUD_API_SECRET`
  - `PORT` (if needed)

Deploy options:

- Node hosting + reverse proxy (Render, Railway, etc.)
- Single server running Express that serves API and static client build (you’d need to add static serving of `client/dist` in `server.js` if not already configured)

---

## 16. Quick Start Summary

```bash
# 1. Install dependencies
npm install
cd client
npm install

# 2. Configure environment
#   Create .env in root with MONGO_URL, JWT_*, CLOUD_* etc.

# 3. Back to root
cd ..

# 4. (Optional) Seed jobs for a user
node populate.js

# 5. Run dev (backend + frontend)
npm run dev

# Frontend: http://localhost:5173
# Backend:  http://localhost:5100
```
