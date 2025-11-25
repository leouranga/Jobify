# Jobify

---

## Overview

Jobify is a full-stack job tracking application built with:

- **Frontend:** React + Vite + Styled Components
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **Auth:** JWT + Cookies

Includes:

- Authentication system
- Job CRUD
- Dashboard with stats
- Filters & search
- Pagination
- Dark / Light mode
- Protected routes

---

## Requirements

- Node.js v18+
- npm
- MongoDB Atlas or Local Mongo

---

## 1. Installation

From root:

```bash
npm install
cd client
npm install
```

Or shortcut:

```bash
npm run setup-project
```

---

## 2. Environment Variables

Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=5100
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
JWT_LIFETIME=1d
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_key
CLOUD_API_SECRET=your_cloudinary_secret
```

---

## 3. Backend Dependencies (Root)

Installed according to your original file:

```bash
npm install bcryptjs concurrently cookie-parser dayjs dotenv express express-async-errors express-validator http-status-codes jsonwebtoken mongoose morgan multer nanoid nodemon cloudinary datauri helmet express-rate-limit express-mongo-sanitize
```

---

## 4. Frontend Dependencies (/client)

```bash
npm install @tanstack/react-query @tanstack/react-query-devtools axios dayjs react-icons react-router-dom react-toastify recharts styled-components
```

---

## 5. Available Scripts

### Backend (root)

```bash
npm run dev      # Start server with Nodemon
npm start        # Production start
```

### Frontend

```bash
npm run dev      # Vite dev server
npm run build    # Production build
```

---

## 6. Run the Application

### Backend

From root:

```bash
npm run dev
```

Server runs at:

```
http://localhost:5100
```

### Frontend

From client folder:

```bash
npm run dev
```

Client runs at:

```
http://localhost:5173
```

---

## 7. Demo User

Project includes Demo mode. Login screen has:

```
Login / Demo User
```

Which allows exploring without creating an account.

---

## 8. Populate Database (Optional)

To insert mock job data:

```bash
node populate.js
```

Uses data from:

```
utils/mockData.json
```

---

## 9. API Routes

```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
GET    /api/v1/jobs
POST   /api/v1/jobs
PATCH  /api/v1/jobs/:id
DELETE /api/v1/jobs/:id
GET    /api/v1/jobs/stats
```

---

## 10. Production Build

```bash
cd client
npm run build
```

Then serve build files or deploy with Render

---
