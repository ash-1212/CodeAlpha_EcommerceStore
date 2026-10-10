# ShopNow — E-Commerce Store
### CodeAlpha Full Stack Development Internship — Task 1

A full-stack e-commerce web application built with the MERN stack.

## 🌟 Features
- Browse products with beautiful UI
- User registration and login with JWT authentication
- Shopping cart with quantity controls
- Checkout and order placement
- Stock management — inventory decreases after purchase
- About and Contact pages
- Responsive design

## 🛠️ Tech Stack
**Frontend:**
- React.js (Vite)
- React Router DOM
- Axios
- Context API for state management

**Backend:**
- Node.js
- Express.js
- MongoDB Atlas
- JWT Authentication
- bcrypt password hashing

## 📁 Project Structure
ecommerce-store/
├── backend/          # Node.js + Express API
│   ├── src/
│   │   ├── config/   # Database connection
│   │   ├── models/   # MongoDB schemas
│   │   ├── controllers/ # Business logic
│   │   ├── routes/   # API endpoints
│   │   └── middleware/  # Auth guards
│   └── server.js
└── frontend/         # React.js app
└── src/
├── components/
├── pages/
├── context/
└── services/

## 🚀 Run Locally

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## 🔑 Environment Variables
Create a `.env` file in the backend folder:
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret

## 👩‍💻 Developer
Built by Ayesha Nazish as part of CodeAlpha Full Stack Development Internship
