# TableTogether – Community Food Sharing Platform

### Live Site URL
["https://plateshare-6602a.web.app/"]

## Overview
TableTogether is a full‑stack MERN web application designed to reduce food waste by connecting people who have surplus food with those who need it.  
Users can donate meals, browse available foods, and request food directly from community members through an intuitive interface built with modern web technologies.

## Key Features
- 1.Real‑Time Food Listings: Users can add, update, or delete donated food items with live updates from the database.
- 2.Secure Authentication: Firebase authentication ensures a safe and personalized user experience for registration and login.
- 3.Food Request System: Logged‑in users can request food items and view request status as accepted, rejected, or pending.
- 4.Responsive Modern Design: Built using Tailwind CSS and DaisyUI for consistent responsive layouts across all devices.
- 5.Dynamic Animations and Swipers: Implemented AOS, Framer‑Motion, and Swiper for smooth animations, sliding banners, and interactive visual effects for a polished UI.

## Technologies Used
- **Frontend:** React JS, Vite, styled‑components, Tailwind CSS, DaisyUI  
- **Animations & UI:** AOS (Animate on Scroll), Framer Motion, Swiper, SpotlightCard (shadcn UI integration)  
- **Networking & Notifications:** Axios, React Toastify  
- **Backend:** Node JS, Express JS, MongoDB, Vercel Server  
- **Authentication:** Firebase Auth  

## 💻 How to Run the Project on Local Machine

Follow these steps to set up and run **TableTogether** locally on your computer.

> 🧪 Requirements: Node.js, npm (or yarn), and a working MongoDB (local or Atlas) connection.

---

### 1️⃣ Clone the Project
```bash
git clone https://github.com/yourusername/TableTogether.git
cd TableTogether

cd client
npm install

same cloner server and install
npm install
Create a .env file in the server folder:
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/TabletogetherDB
JWT_SECRET=yourSecretKey

**For Frontend**
Inside the client folder, create another .env file and add your Firebase config (replace placeholder values):
VITE_apiKey=yourFirebaseApiKey
VITE_authDomain=yourFirebaseAuthDomain
VITE_projectId=yourFirebaseProjectId
VITE_storageBucket=yourFirebaseStorageBucket
VITE_messagingSenderId=yourFirebaseSenderId
VITE_appId=yourFirebaseAppId

If using MongoDB Atlas, ensure your MONGO_URI is correct.

then
npm run dev
Server running on http://localhost:5000
Database connected ✓

Run the Frontend (React):
cd client
npm run dev

You’ll see something like:
VITE v5.x.x  ready in 500ms
➜  Local: http://localhost:5173/
for any quaries mail me Thank you
