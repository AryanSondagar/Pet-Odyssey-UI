# 🚀 Angular Frontend

## 📌 Prerequisites

- Node.js (v16 or above)
- Angular CLI
- Git

---

## 📥 Clone the Repository

git clone <frontend-repo-url>
cd <frontend-folder>

---

## 📦 Install Dependencies

npm install

---

## ▶️ Run the Application

ng serve

App will run at:
👉 http://localhost:4200/

---

## 🔗 Backend API

This frontend connects to a Node.js backend.

Make sure backend is running at:
👉 http://localhost:3000/

Update API URL in:
src/environments/environment.ts

Example:

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};

---

## 📁 Project Structure

/src -> Angular application code

---

## 🚀 Usage

1. Start backend server
2. Run Angular app → ng serve
3. Open browser → http://localhost:4200/

---

## ⚠️ Notes

- Backend must be running before using frontend
- Configure API URL properly
