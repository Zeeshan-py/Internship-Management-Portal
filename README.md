# TEYZIX CORE Internship Management Portal

A full-stack internship management platform built with React, Vite, Express, MongoDB, and Tailwind CSS. The project provides a polished student-facing internship discovery and application experience, plus an admin console for reviewing applications and managing candidate status.

Repository: [Zeeshan-py/Internship-Management-Portal](https://github.com/Zeeshan-py/Internship-Management-Portal)

---

## Table of Contents

- [Project Overview](#project-overview)
- [Core Features](#core-features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Documentation](#api-documentation)
- [Frontend Pages](#frontend-pages)
- [Admin Console](#admin-console)
- [Validation and Data Flow](#validation-and-data-flow)
- [Deployment Guide](#deployment-guide)
- [Testing and Quality Checks](#testing-and-quality-checks)
- [Troubleshooting](#troubleshooting)
- [Future Improvements](#future-improvements)
- [Author](#author)

---

## Project Overview

The TEYZIX CORE Internship Management Portal is designed for organizations that want to collect internship applications, present available opportunities, and review candidates through a simple administrative dashboard.

The application includes:

- A modern landing page for the internship program.
- Internship listings with search, category filters, job-type filters, sorting, bookmarking, and share actions.
- A multi-step application form with required-field validation.
- A contact page for support and mentorship inquiries.
- An admin login screen and dashboard for viewing submitted applications.
- Backend REST APIs for application submission, admin login, application listing, and status updates.
- MongoDB persistence using Mongoose models.

---

## Core Features

### Student Experience

- Responsive landing page with program overview, statistics, workflow, testimonials, newsletter form, and FAQs.
- Internship browsing page with keyword search, category filtering, job-type filtering, pagination, and sorting.
- Query-parameter support for category links, for example `/internships?category=Cybersecurity`.
- Bookmark interaction for internship cards with visual feedback.
- Share button that uses the native Web Share API when available and falls back to copying the application link.
- Multi-step application form with validation before moving to the next step.
- Domain preselection from internship cards, for example `/apply?domain=Web%20Development`.
- Contact form with success state after submission.
- Light and dark theme toggle with saved preference.

### Admin Experience

- Password-protected admin login.
- Dashboard overview with applicant statistics and status counts.
- Applications table with search and domain filtering.
- Candidate detail modal with contact information and cover letter.
- Application status update actions: `Approved`, `Rejected`, and `Pending Review`.
- CSV export for filtered application data.
- Admin sections for overview, applications, internships, notifications, and settings.
- User feedback through toast notifications.

### Backend Capabilities

- Express REST API.
- MongoDB connection through Mongoose.
- Application schema with applicant details, professional details, resume URL, message, and review status.
- Admin password verification through environment variables.
- Centralized error handling middleware.
- Optional Resend email notification when a new application is submitted.
- Health check endpoint for quick backend verification.

---

## Tech Stack

### Frontend

| Technology | Purpose |
| --- | --- |
| React | Component-based frontend UI |
| Vite | Fast local development and production build tooling |
| React Router | Client-side routing |
| Tailwind CSS | Utility-first styling and responsive design |
| Framer Motion | Page and component animations |
| Lucide React | Icon system |
| Axios | HTTP client for backend API requests |
| React Hot Toast | Admin feedback notifications |

### Backend

| Technology | Purpose |
| --- | --- |
| Node.js | JavaScript runtime |
| Express.js | REST API server |
| MongoDB | Database |
| Mongoose | MongoDB object modeling |
| CORS | Cross-origin request support |
| Morgan | Request logging |
| Dotenv | Environment variable loading |
| Resend | Optional email notification service |

---

## System Architecture

```text
Browser
  |
  | React + Vite frontend
  v
Axios API service
  |
  | HTTP requests
  v
Express server
  |
  | Mongoose models
  v
MongoDB database

Optional:
Express server -> Resend API -> Admin email notification
```

The frontend and backend are separated into `client` and `server` folders. The client communicates with the server through a centralized Axios instance in `client/src/services/api.js`.

---

## Folder Structure

```text
Internship-Management-Portal/
├── client/
│   ├── public/
│   │   ├── favicon.png
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Footer.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── InternshipCard.jsx
│   │   │   ├── InternshipList.jsx
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Admin.jsx
│   │   │   ├── Apply.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Home.jsx
│   │   │   └── Internships.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── applicationController.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── models/
│   │   └── Application.js
│   ├── routes/
│   │   └── applicationRoutes.js
│   ├── package.json
│   └── server.js
├── netlify.toml
├── README.md
└── .gitignore
```

---

## Getting Started

### Prerequisites

Install the following tools before running the project:

- Node.js 18 or later
- npm
- MongoDB Atlas account or local MongoDB instance
- Resend account, only if email notifications are required

### 1. Clone the Repository

```bash
git clone https://github.com/Zeeshan-py/Internship-Management-Portal.git
cd Internship-Management-Portal
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../client
npm install
```

### 4. Configure Backend Environment

Create a `.env` file inside the `server` folder:

```env
PORT=5050
MONGO_URI=your_mongodb_connection_string
ADMIN_PASSWORD=your_admin_password
RESEND_API_KEY=your_resend_api_key
```

`RESEND_API_KEY` is optional for local testing. The application data is still saved even if email delivery fails.

### 5. Run the Backend

From the `server` folder:

```bash
npm start
```

The backend runs on:

```text
http://localhost:5050
```

### 6. Run the Frontend

From the `client` folder:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

---

## Environment Variables

### Server Environment

| Variable | Required | Description |
| --- | --- | --- |
| `PORT` | No | Backend server port. Defaults to `5050`. |
| `MONGO_URI` | Yes | MongoDB connection string. |
| `ADMIN_PASSWORD` | No | Password for admin login. Defaults to `admin123` if not set. |
| `RESEND_API_KEY` | No | API key used to send new application notification emails. |
| `NODE_ENV` | No | Set to `production` in production environments. |

### Client Environment

Create a `.env` file inside `client` only if you need to override the API URL:

```env
VITE_API_URL=http://localhost:5050/api
```

If `VITE_API_URL` is not provided, the frontend defaults to:

```text
http://localhost:5050/api
```

---

## Available Scripts

### Frontend Scripts

Run these commands from the `client` folder.

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server. |
| `npm run build` | Creates a production build. |
| `npm run lint` | Runs ESLint checks. |
| `npm run preview` | Serves the production build locally. |

### Backend Scripts

Run these commands from the `server` folder.

| Command | Description |
| --- | --- |
| `npm start` | Starts the Express server with Node. |
| `npm run dev` | Starts the server with Nodemon. |

---

## API Documentation

Base URL for local development:

```text
http://localhost:5050/api
```

### Health Check

```http
GET /ping
```

Response:

```text
pong
```

### Submit Application

```http
POST /api/applications
```

Request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 234 567 890",
  "domain": "Web Development",
  "experience": "Fresher",
  "education": "BS Computer Science",
  "skills": "React, Node.js, MongoDB",
  "resumeUrl": "https://drive.google.com/example",
  "message": "I am interested in this internship."
}
```

Success response:

```json
{
  "success": true,
  "message": "Application submitted successfully!",
  "data": {
    "_id": "application_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1 234 567 890",
    "domain": "Web Development",
    "status": "Pending Review"
  }
}
```

### Admin Login

```http
POST /api/applications/login
```

Request body:

```json
{
  "password": "your_admin_password"
}
```

Success response:

```json
{
  "success": true,
  "message": "Logged in successfully"
}
```

### Get All Applications

```http
GET /api/applications/all
```

Success response:

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "application_id",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1 234 567 890",
      "domain": "Web Development",
      "status": "Pending Review",
      "createdAt": "2026-05-17T00:00:00.000Z"
    }
  ]
}
```

### Update Application Status

```http
PUT /api/applications/:id/status
```

Request body:

```json
{
  "status": "Approved"
}
```

Allowed status values:

- `Pending Review`
- `Approved`
- `Rejected`

Success response:

```json
{
  "success": true,
  "data": {
    "_id": "application_id",
    "status": "Approved"
  }
}
```

---

## Frontend Pages

### Home Page

Route:

```text
/
```

Includes:

- Program hero section
- Call-to-action links
- Statistics
- Trending domains
- Application workflow
- Testimonials
- Newsletter subscription feedback
- FAQ accordion

### Internships Page

Route:

```text
/internships
```

Includes:

- Search by internship title or company
- Category filters
- Job-type filters
- Sorting by newest or deadline
- Pagination
- Save internship button
- Share internship button
- Apply action with selected domain

### Apply Page

Route:

```text
/apply
```

Includes:

- Step 1: personal information
- Step 2: professional information and resume URL
- Step 3: cover letter and final submission
- Required-field validation before step navigation
- API submission to the backend

### Contact Page

Route:

```text
/contact
```

Includes:

- Contact details
- Inquiry form
- Success state after submission

### Admin Page

Route:

```text
/admin
```

Includes:

- Admin password login
- Dashboard statistics
- Applications table
- Candidate details modal
- Approve and reject actions
- Domain filtering
- CSV export
- Notifications, internships, and settings sections

---

## Admin Console

The admin console is protected by a password check handled by the backend.

Set the password in `server/.env`:

```env
ADMIN_PASSWORD=your_secure_password
```

If `ADMIN_PASSWORD` is not configured, the backend uses:

```text
admin123
```

For production, always configure a strong password and avoid using the default.

---

## Validation and Data Flow

### Application Form Validation

The frontend validates required fields before allowing users to continue through the application steps.

Required fields include:

- Full name
- Email address
- Phone number
- Education
- Internship domain
- Experience level
- Skills
- Resume URL
- Cover letter message

### Backend Validation

The backend validates:

- Required applicant fields
- Email format
- Phone number format
- Application status values

### Data Flow

```text
User fills application form
  -> React validates required step fields
  -> Axios sends POST request
  -> Express controller validates request
  -> Mongoose saves application
  -> Optional email notification is sent
  -> Admin can review application in dashboard
```

---

## Deployment Guide

### Frontend Deployment on Netlify

The repository includes `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"
  base = "client"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

This configuration:

- Builds the frontend from the `client` folder.
- Publishes the `client/dist` folder.
- Redirects all frontend routes to `index.html` so React Router works after deployment.

For production, configure this Netlify environment variable:

```env
VITE_API_URL=https://your-backend-domain.com/api
```

### Backend Deployment

The backend can be deployed to services such as Render, Railway, or any Node.js hosting provider.

Production backend requirements:

- Node.js runtime
- MongoDB connection string
- Environment variables configured on the hosting platform
- Public backend URL added to the frontend `VITE_API_URL`

Required backend environment variables:

```env
PORT=5050
MONGO_URI=your_production_mongodb_uri
ADMIN_PASSWORD=your_secure_admin_password
RESEND_API_KEY=your_resend_api_key
NODE_ENV=production
```

---

## Testing and Quality Checks

### Frontend Lint

```bash
cd client
npm run lint
```

### Frontend Production Build

```bash
cd client
npm run build
```

### Backend Syntax Check

```bash
cd server
node --check server.js
node --check controllers/applicationController.js
```

### Manual Smoke Test Checklist

After starting both servers:

- Visit `/` and confirm the home page loads.
- Visit `/internships` and test search, filters, sorting, save, share, and pagination.
- Visit `/internships?category=Cybersecurity` and confirm category filtering works.
- Visit `/apply` and confirm required-field validation blocks empty steps.
- Submit a valid application and confirm it appears in MongoDB.
- Visit `/contact` and submit the contact form.
- Visit `/admin`, log in, view applications, export CSV, and update statuses.
- Visit an unknown route and confirm the app still renders safely.

---

## Troubleshooting

### Frontend cannot connect to backend

Check that:

- The backend is running on port `5050`.
- `VITE_API_URL` is correct.
- The backend allows CORS.
- The API path includes `/api`.

### Backend fails to start

Check that:

- `server/.env` exists.
- `MONGO_URI` is valid.
- MongoDB Atlas network access allows your IP address.
- Dependencies are installed with `npm install`.

### Applications are not saving

Check that:

- MongoDB is connected.
- All required fields are being submitted.
- The browser console and server logs do not show validation errors.

### Admin login fails

Check that:

- The password matches `ADMIN_PASSWORD`.
- The backend server is running.
- The frontend API URL points to the correct backend.

### Email notification fails

Application submission can still succeed even if email notification fails. Check that:

- `RESEND_API_KEY` is configured.
- The sender email is valid for your Resend account.
- The Resend account is allowed to send to the target email address.

---

## Future Improvements

- Add JWT-based admin authentication.
- Add role-based access control.
- Add real internship CRUD APIs instead of static frontend internship data.
- Add file upload support for resumes.
- Add application status email notifications.
- Add dashboard charts for application trends.
- Add unit and integration tests.
- Add automated end-to-end tests.
- Add pagination and search directly on the backend for large datasets.
- Add rate limiting and stronger production security headers.

---

## Author

**Zeeshan Ahmad**

- GitHub: [Zeeshan-py](https://github.com/Zeeshan-py)

---

## License

This project is currently provided for educational and internship assignment purposes. Add a formal license file if this project will be distributed or used in production.
