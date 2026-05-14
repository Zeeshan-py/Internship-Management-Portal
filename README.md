# 🚀 TEYZIX CORE Internship Portal

A professional Full-Stack Internship Management Portal built with the **MERN Stack**. This platform allows students to apply for various internship domains and enables administrators to manage applications through a sleek, modern dashboard.

---

## ✨ Features

- **🎯 Modern Hero Section**: Stunning visuals with glassmorphism and animations.
- **📝 Multi-Domain Applications**: Apply for Web Dev, AI/ML, Design, and more.
- **📬 Real-time Email Notifications**: Integrated with **Resend API** to notify admins of new applications.
- **🛡️ Admin Dashboard**: Secure area to view, search, and filter all student applications.
- **📱 Fully Responsive**: Optimized for mobile, tablet, and desktop views.
- **⚡ High Performance**: Built with Vite for lightning-fast frontend delivery.
- **🔒 Secure Backend**: Robust API with centralized error handling and Mongoose validation.

---

## 🛠️ Technologies Used

### **Frontend**
- **React.js + Vite**
- **Tailwind CSS v4**
- **Framer Motion** (Animations)
- **Lucide React** (Icons)
- **Axios** (API Requests)

### **Backend**
- **Node.js + Express.js**
- **MongoDB Atlas** (Database)
- **Mongoose** (ORM)
- **Resend API** (Email Service)
- **CORS & Dotenv**

---

## 📸 Screenshots

| Home Page | Internship Listings |
|-----------|---------------------|
| ![Home](https://raw.githubusercontent.com/Zeeshan-py/Internship-Management-Portal/main/client/public/favicon.svg) | ![Internships](https://raw.githubusercontent.com/Zeeshan-py/Internship-Management-Portal/main/client/public/favicon.svg) |

---

## ⚙️ Installation & Setup

### **1. Clone the Repository**
```bash
git clone https://github.com/Zeeshan-py/Internship-Management-Portal.git
cd Internship-Management-Portal
```

### **2. Backend Setup**
```bash
cd server
npm install
```
Create a `.env` file in the `server` folder:
```env
PORT=5050
MONGO_URI=your_mongodb_atlas_uri
RESEND_API_KEY=your_resend_api_key
```
Start the server:
```bash
npm start
```

### **3. Frontend Setup**
```bash
cd ../client
npm install
npm run dev
```

---

## 📂 Project Structure

```
Internship-Management-Portal/
├── client/              # React Frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Home, Apply, Admin, etc.
│   │   └── services/    # Axios API configuration
├── server/              # Express Backend
│   ├── models/          # MongoDB Schemas
│   ├── routes/          # API Endpoints
│   ├── controllers/     # Business Logic
│   └── config/          # Database connection
└── README.md
```

---

## 🔗 GitHub Repository
[https://github.com/Zeeshan-py/Internship-Management-Portal](https://github.com/Zeeshan-py/Internship-Management-Portal)

---

## 👨‍💻 Author
**Zeeshan Ahmad**  
- GitHub: [@Zeeshan-py](https://github.com/Zeeshan-py)

---

*Built with ❤️ for TEYZIX CORE Internship Assignment.*
