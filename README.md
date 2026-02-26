# 📄 Resume Builder — AI-Powered Resume Creation Platform

A full-stack web application that lets users create, customize, and share professional resumes with the help of **Google Gemini AI**. Built with **React**, **Node.js**, **Express**, and **MongoDB**.

![Dashboard](./screenshots/dashboard.png)

---

## 📑 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Resume Templates](#resume-templates)
- [AI Features](#ai-features)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Resume Builder is an end-to-end platform that simplifies resume creation. Users can sign up, build resumes from scratch or upload existing PDFs for AI-powered data extraction, enhance their content with Gemini AI, choose from multiple templates, customize accent colors, and share public links — all from a clean, responsive interface.

---

## Features

### 🔐 Authentication & User Management
- **User Registration & Login** — Secure JWT-based authentication with bcrypt password hashing.
- **Persistent Sessions** — Token stored in localStorage; user state managed via Redux Toolkit.
- **Protected Routes** — Dashboard and builder pages are accessible only to authenticated users.

### 📊 Dashboard
- **View All Resumes** — See all your saved resumes in a color-coded card grid with last-updated timestamps.
- **Create New Resume** — Start a fresh resume with a custom title.
- **Upload Existing Resume (PDF)** — Upload a PDF file; AI extracts all structured data (personal info, experience, education, projects, skills) and creates a ready-to-edit resume.
- **Edit Resume Title** — Rename any resume directly from the dashboard.
- **Delete Resume** — Remove resumes with a confirmation prompt.

### ✏️ Resume Builder
- **Step-by-Step Editor** — Six guided sections with a progress bar:
  1. **Personal Info** — Name, email, phone, location, profession, LinkedIn, website, and **profile image upload** with optional AI background removal.
  2. **Professional Summary** — Free-text summary with **AI Enhancement** (rewrites and improves your summary).
  3. **Work Experience** — Add multiple entries with company, position, dates, and description. Each description supports **AI Enhancement** for better wording.
  4. **Education** — Add multiple entries with institution, degree, field of study, graduation date, and GPA.
  5. **Projects** — Add multiple entries with project name, type, and description.
  6. **Skills** — Tag-style skill input with Enter-to-add and deduplication.

- **Live Preview** — See your resume update in real-time as you type on the right panel.
- **Template Selector** — Switch between 4 professionally designed templates instantly.
- **Color Picker** — Choose from 10 accent colors (Blue, Indigo, Purple, Green, Red, Orange, Teal, Pink, Gray, Black) to personalize your resume.
- **Save Changes** — Persist all edits to the database.

### 🤖 AI-Powered Features (Google Gemini)
- **Enhance Professional Summary** — AI rewrites your summary to be more compelling and professional.
- **Enhance Job Descriptions** — AI improves individual work experience descriptions for impact and clarity.
- **Smart Resume Upload** — Upload a PDF resume; AI parses and extracts structured data into the correct schema fields automatically.

### 🔗 Sharing & Export
- **Public/Private Toggle** — Mark a resume as public to enable sharing.
- **Share Link** — Generate a shareable link via the Web Share API (with clipboard fallback).
- **Public Preview Page** — Anyone with the link can view a public resume (no login required).
- **Download as PDF** — Print/download the resume using the browser's native print dialog with optimized print styles.

### 🎨 Resume Templates
- **Classic** — Traditional, clean layout suitable for all industries.
- **Modern** — Contemporary design with color accents and modern typography.
- **Minimal** — Simple, distraction-free layout focused on content.
- **Minimal Image** — Minimal design with a profile photo section.

### 📱 Responsive Design
- Fully responsive UI built with **Tailwind CSS**.
- Mobile-friendly navigation with hamburger menu.
- Optimized print layout with `@media print` styles.

---

## Screenshots

### Dashboard
View, create, upload, edit, and delete your resumes.

![Dashboard](./screenshots/dashboard1.png)

### Resume Builder
Step-by-step editor with live preview, template selection, and color customization.

![Resume Builder](./screenshots/resume-builder.png)

### AI Enhancement
Enhance your professional summary and job descriptions with Google Gemini AI.

![AI Enhance](./screenshots/ai-enhance.png)

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI library |
| **Vite 7** | Build tool & dev server |
| **Tailwind CSS 4** | Utility-first styling |
| **Redux Toolkit** | Global state management |
| **React Router DOM 7** | Client-side routing |
| **Axios** | HTTP client for API calls |
| **Lucide React** | Icon library |
| **React Hot Toast** | Toast notifications |
| **react-pdftotext** | PDF text extraction (client-side) |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime |
| **Express 5** | Web framework |
| **MongoDB + Mongoose 9** | Database & ODM |
| **JWT (jsonwebtoken)** | Authentication tokens |
| **bcrypt** | Password hashing |
| **@google/genai** | Google Gemini AI SDK |
| **@imagekit/nodejs** | Image upload & processing |
| **Multer** | File upload middleware |
| **dotenv** | Environment variable management |
| **Nodemon** | Dev server auto-restart |

---

## Project Structure

```
Resume-Builder/
├── README.md
├── screenshots/                  # App screenshots
│   ├── dashboard.png
│   ├── resume-builder.png
│   └── ai-enhance.png
│
├── Backend/
│   ├── server.js                 # Express app entry point
│   ├── package.json
│   ├── .env.example              # Environment variables template
│   ├── config/
│   │   ├── ai.js                 # Google Gemini AI client setup
│   │   ├── db.js                 # MongoDB connection
│   │   ├── imageKit.js           # ImageKit client setup
│   │   └── multer.js             # File upload configuration
│   ├── controllers/
│   │   ├── userController.js     # Auth (register, login, user data)
│   │   ├── resumeController.js   # CRUD operations for resumes
│   │   └── aiController.js       # AI enhancement & resume parsing
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT authentication guard
│   ├── models/
│   │   ├── user.js               # User schema
│   │   └── resume.js             # Resume schema
│   ├── routes/
│   │   ├── userRoutes.js         # /api/users/*
│   │   ├── resumeRoutes.js       # /api/resumes/*
│   │   └── aiRoutes.js           # /api/ai/*
│   └── template/
│       ├── enhanceSummaryTemplate.js   # AI prompt for summary
│       ├── enhanceJobTemplate.js       # AI prompt for job descriptions
│       └── userResumeTemplate.js       # Schema template for resume parsing
│
└── Frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── .env.example              # Environment variables template
    └── src/
        ├── main.jsx              # React entry point
        ├── App.jsx               # Routes & auth initialization
        ├── index.css             # Global styles
        ├── app/
        │   ├── store.js          # Redux store configuration
        │   └── features/
        │       └── authSlice.js  # Auth state (token, user, loading)
        ├── assets/
        │   └── assets.js         # Static asset references
        ├── configs/
        │   └── api.js            # Axios instance with base URL
        ├── components/
        │   ├── PersonalInfoForm.jsx      # Personal details form
        │   ├── ProfessionalSummary.jsx   # Summary with AI enhance
        │   ├── ExperienceForm.jsx        # Work experience with AI enhance
        │   ├── EducationForm.jsx         # Education entries
        │   ├── ProjectForm.jsx           # Project entries
        │   ├── SkillsForm.jsx            # Skills tag input
        │   ├── ResumePreview.jsx         # Live resume preview
        │   ├── TemplateSelector.jsx      # Template picker dropdown
        │   ├── ColorPicker.jsx           # Accent color picker
        │   ├── Navbar.jsx                # Navigation bar
        │   ├── Loader.jsx                # Loading spinner
        │   ├── home/                     # Landing page sections
        │   │   ├── Banner.jsx
        │   │   ├── Hero.jsx
        │   │   ├── Features.jsx
        │   │   ├── Testimonials.jsx
        │   │   ├── CallToAction.jsx
        │   │   ├── Footer.jsx
        │   │   └── Title.jsx
        │   └── templates/                # Resume templates
        │       ├── ClassicTemplate.jsx
        │       ├── ModernTemplate.jsx
        │       ├── MinimalTemplate.jsx
        │       └── MinimalImageTemplate.jsx
        └── pages/
            ├── Home.jsx            # Landing page
            ├── Login.jsx           # Login / Signup page
            ├── Layout.jsx          # Authenticated layout wrapper
            ├── Dashboard.jsx       # Resume management dashboard
            ├── ResumeBuilder.jsx   # Resume editor + preview
            └── Preview.jsx         # Public resume view
```

---

## Getting Started

### Prerequisites

- **Node.js** v18+ and **npm**
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **Google Gemini API Key** — [Get one here](https://aistudio.google.com/apikey)
- **ImageKit Account** — [Sign up here](https://imagekit.io/) (for profile image uploads)

### Backend Setup

```bash
# 1. Navigate to the backend directory
cd Backend

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env

# 4. Fill in your actual values in .env (see Environment Variables section)

# 5. Start the development server
npm run server
```

The backend will run on `http://localhost:3000` by default.

### Frontend Setup

```bash
# 1. Navigate to the frontend directory
cd Frontend

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env

# 4. Update VITE_BASE_URL if your backend runs on a different port

# 5. Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173` by default.

---

## Environment Variables

### Backend (`Backend/.env`)

| Variable | Description | Example |
|---|---|---|
| `PORT` | Server port | `3000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/resume-builder` |
| `JWT_SECRET` | Secret key for signing JWTs | `my_super_secret_key_123` |
| `GEMINI_API_KEY` | Google Gemini API key | `AIza...` |
| `MODEL` | Gemini model name | `gemini-2.0-flash` |
| `IMAGEKIT_PRIVATE_KEY` | ImageKit private key | `private_key_...` |

### Frontend (`Frontend/.env`)

| Variable | Description | Example |
|---|---|---|
| `VITE_BASE_URL` | Backend API base URL | `http://localhost:3000` |

---

## API Endpoints

### Authentication — `/api/users`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/register` | No | Register a new user |
| `POST` | `/login` | No | Login and receive JWT token |
| `GET` | `/data` | Yes | Get authenticated user's profile |
| `GET` | `/resumes` | Yes | Get all resumes for the user |

### Resumes — `/api/resumes`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/create` | Yes | Create a new blank resume |
| `PUT` | `/update` | Yes | Update resume (supports image upload) |
| `DELETE` | `/delete/:resumeId` | Yes | Delete a resume |
| `GET` | `/get/:resumeId` | Yes | Get a specific resume |
| `GET` | `/public/:resumeId` | No | Get a public resume (for sharing) |

### AI — `/api/ai`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/enhance-pro-sum` | Yes | AI-enhance professional summary |
| `POST` | `/enhance-job-desc` | Yes | AI-enhance job description |
| `POST` | `/upload-resume` | Yes | Upload PDF text & AI-extract structured data |

---

## Resume Templates

| Template | Description |
|---|---|
| **Classic** | Traditional layout with clear sections, suitable for corporate and formal applications. |
| **Modern** | Contemporary design with accent color highlights and modern typography. |
| **Minimal** | Clean, whitespace-focused layout that puts content front and center. |
| **Minimal Image** | Minimal design with a dedicated profile photo section for a personal touch. |

All templates support:
- Custom accent colors (10 options)
- Profile image display (where applicable)
- Responsive print layout
- Real-time preview updates

---

## AI Features

This application integrates **Google Gemini AI** to supercharge the resume-building experience:

### 1. Professional Summary Enhancement
- Click the **✨ AI Enhance** button next to your professional summary.
- Gemini rewrites your summary to be more polished, impactful, and ATS-friendly.
- The enhanced text replaces your current summary (you can edit further).

### 2. Job Description Enhancement
- Each work experience entry has an **✨ AI Enhance** button.
- Gemini improves the description with action verbs, quantified achievements, and professional phrasing.
- Individual loading states ensure a smooth UX when enhancing multiple entries.

### 3. Smart Resume Upload (PDF Import)
- Upload any existing resume as a PDF from the dashboard.
- The app extracts text from the PDF client-side using `react-pdftotext`.
- The extracted text is sent to Gemini with a structured JSON schema.
- Gemini parses and returns structured data (personal info, experience, education, projects, skills).
- A new resume is created in the database with all fields pre-filled — ready to edit.

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is open source and available under the [ISC License](LICENSE).
