# 🧑‍💻 User Management Application (Full Stack)

A complete **User Management System** built with **React + Redux Toolkit** on the frontend and **Express + MongoDB Atlas** on the backend.  
This project supports full **CRUD operations**, **authentication**, **form validation**, and a clean modern UI.

---

## 🚀 Features

### ✅ Authentication System
- User Registration
- User Login
- JWT Token based authentication
- Protected Routes
- Logout functionality

---

### ✅ User Management (CRUD)
- Create User
- List Users
- Search Users (by name/email)
- View User Details
- Update User
- Delete User

---

### ✅ Validation & Security
- Frontend validation using **React Hook Form + Yup**
- Backend validation using **Mongoose Schema**
- Password hashing using **bcryptjs**
- JWT Authentication using **jsonwebtoken**
- Duplicate user checking using MongoDB queries

---

### ✅ UI/UX
- Responsive UI using Tailwind CSS
- Toast notifications using react-hot-toast
- Modal-based forms (Create / Edit)
- Clean and user-friendly layout

---

## 🛠️ Tech Stack

### 🔹 Frontend Stack
- React.js
- Redux Toolkit
- React Router DOM
- React Hook Form
- Yup Validation
- Tailwind CSS
- TanStack React Query
- JWT Decode
- React Hot Toast
- React Icons

---

### 🔹 Backend Stack
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs for password hashing
- dotenv for environment variables
- cors for cross-origin requests

---

## 📦 Dependencies

### Backend Dependencies
```json
"dependencies": {
  "bcryptjs": "^3.0.3",
  "cors": "^2.8.6",
  "dotenv": "^17.2.3",
  "express": "^5.2.1",
  "jsonwebtoken": "^9.0.3",
  "mongoose": "^9.1.5"
}

🔑 API Endpoints

| Method | Endpoint                | Description         |
| ------ | ---------------------   | ------------------- |
| POST   | `/api/v1/auth/register` | Register a new user |
| POST   | `/api/v1/auth/login`    | Login user          |
| GET    | `/api/v1/users`         | get users           |
| GET    | `/api/v1/users/:userId` | get user            |
| PATCH  | `/api/v1/users/:userId` | update user         |
| DELETE | `/api/v1/users/:userId` | delete user         |
