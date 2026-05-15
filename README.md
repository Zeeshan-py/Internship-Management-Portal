# 🚀 TEYZIX CORE Internship Portal

[![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue.svg)](https://mongodb.com)
[![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB.svg)](https://reactjs.org)
[![Backend](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933.svg)](https://nodejs.org)
[![Deployment](https://img.shields.io/badge/Deployment-Netlify%20%2B%20Railway-000000.svg)](https://netlify.com)

A premium, enterprise-grade **Full-Stack Internship Management Portal** designed for modern ed-tech ecosystems. This platform bridges the gap between students and industry opportunities through high-fidelity UI/UX, robust backend architecture, and seamless administrative workflows.

---

## 🌟 Key Features

### **Student Experience**
- **💎 Premium Landing Page**: Modern hero section with glassmorphism, dynamic animations, and interactive dashboard mockups.
- **🔍 Advanced Internship Search**: Real-time filtering by domain, job type (Remote/On-site), and keyword search.
- **📑 Multi-Step Application**: Streamlined application flow with automatic domain matching and instant validation.
- **🧩 Interactive FAQs**: Smoothly animated dropdowns for clear student guidance.
- **🤝 Success Stories**: High-fidelity testimonials from real interns at top companies.

### **Administrative Console**
- **🛡️ Secure Access**: Protected admin entry with environment-level authentication.
- **📊 Real-time Dashboard**: Comprehensive overview of applicant growth, approval rates, and system health.
- **✅ Status Persistence**: Permanent database tracking for "Approved", "Rejected", and "Pending" states.
- **📋 Internship Management**: Full module to post, edit, and track internal internship listings.
- **🔔 Notification Engine**: System-wide alerts for new submissions and infrastructure updates.
- **⚙️ Advanced Settings**: Profile management, security scanning, and system configuration tools.

---

## 🛠️ Technical Architecture

### **Frontend (The Visual Core)**
- **Framework**: React.js 18 with Vite for optimized bundling.
- **Styling**: Tailwind CSS v4 with a custom design system.
- **Animations**: Framer Motion for high-performance transitions.
- **Icons**: Lucide React for a consistent, modern icon set.
- **State & API**: React Hooks and Axios with centralized service layer.

### **Backend (The Logic Engine)**
- **Runtime**: Node.js & Express.js.
- **Database**: MongoDB Atlas with Mongoose modeling for high availability.
- **Email System**: Resend API integration for automated administrative alerts.
- **Security**: CORS protection, environment isolation, and centralized error middleware.

---

## 📸 System Preview

| High-Fidelity UI | Admin Dashboard |
|:---:|:---:|
| ![Home](https://raw.githubusercontent.com/Zeeshan-py/Internship-Management-Portal/main/client/public/favicon.svg) | ![Dashboard](https://raw.githubusercontent.com/Zeeshan-py/Internship-Management-Portal/main/client/public/favicon.svg) |
| *Enterprise Landing Page* | *Management Console* |

---

## ⚙️ Installation & Deployment

### **1. Clone & Install**
```bash
git clone https://github.com/Zeeshan-py/Internship-Management-Portal.git
cd Internship-Management-Portal

# Install Server Dependencies
cd server && npm install

# Install Client Dependencies
cd ../client && npm install
```

### **2. Environment Configuration**
Create a `.env` file in the `/server` directory:
```env
PORT=5050
MONGO_URI=your_mongodb_atlas_uri
RESEND_API_KEY=your_resend_api_key
ADMIN_PASSWORD=your_secure_password
```

### **3. Launch Development Environment**
```bash
# Run Backend (from /server)
npm start

# Run Frontend (from /client)
npm run dev
```

---

## 📂 Repository Structure

```text
├── client/                 # React Frontend (Vite)
│   ├── src/
│   │   ├── components/     # Atomic UI Components
│   │   ├── pages/          # Layout-level Page Views
│   │   ├── services/       # Axios API Integrations
│   │   └── assets/         # High-res Media Assets
├── server/                 # Express.js Backend
│   ├── models/             # Mongoose Data Schemas
│   ├── routes/             # RESTful API Endpoints
│   ├── controllers/        # Core Business Logic
│   └── config/             # DB & API Configurations
└── README.md
```

---

## 👨‍💻 Developed By

**Zeeshan Ahmad**  
*Full Stack Software Engineer*

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Zeeshan-py)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/zeeshann)

---

*This project was developed as a flagship assignment for the **TEYZIX CORE** Internship Program. It demonstrates proficiency in the MERN stack, UI/UX design, and production-level deployment.*
