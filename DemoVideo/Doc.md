📘 YouTube Video Platform – Full Project Documentation

A Full-Stack YouTube Clone Built Using MERN Stack

video Drive Link (https://drive.google.com/file/d/1bjGVHIOrodtiPdZ5BHNUfgdQVDUhnbO4/view?usp=sharing)

🧩 1. Introduction

This project is a full-stack YouTube-like video platform built using the MERN stack.
Users can:

Watch videos

Browse the homepage feed

Upload their own videos

View channel pages

Authenticate using JWT

View video details stored in MongoDB

The UI is modern, responsive, and similar to YouTube's layout.

🎯 2. Project Purpose

The aim of this project is to simulate how modern video-based platforms like YouTube work by:

Building a responsive and scalable frontend

Creating secure backend API services

Handling media uploads using Cloudinary

Implementing user authentication

Learning clean code structure in MERN stack applications

The project also serves as a portfolio-ready real-world application.

✨ 3. Key Features
🔐 Authentication

User login

JWT-based authorization

Protected APIs

🎥 Video Functionality

Upload videos with thumbnails

Videos stored in Cloudinary

Fetch all videos

Fetch video by ID

Metadata stored in MongoDB

🖥️ Frontend Features

Beautiful YouTube-like UI

Video listing page

Single Video page

Channel page

Search bar

Responsive layout (Mobile friendly)

⚙️ Developer Features

Modular folder structure

Clean API separation

Reusable components

Error handling

🏗️ 4. System Architecture
Frontend (React)
       ↓
Backend API (Node + Express)
       ↓
MongoDB (Video + User DB)
       ↓
Cloudinary (Video + Thumbnail Storage)


The frontend communicates with backend using protected REST APIs.
Backend stores metadata in MongoDB and uploads actual media files to Cloudinary.

🛠️ 5. Tech Stack
Frontend

React.js

React Router DOM

Axios

Tailwind / CSS

Context API

React.lazy + Suspense

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

Multer (file upload)

Cloudinary SDK

dotenv

🎨 6. Frontend Overview

The frontend is built using React with reusable components and lazy-loading routes.

🔧 Frontend Features

Home Page showing all videos

Single Video view

Upload form UI

Sidebar navigation

Navbar with search

Responsive grid layout

📦 7. Backend Overview

The backend is built using Node.js + Express and provides all APIs needed for the video platform.

🔧 Backend Responsibilities

User login

Token generation

Protected routes

Uploading video and thumbnail to Cloudinary

Storing metadata in MongoDB

Providing APIs for frontend consumption

🔌 8. API Endpoints
Auth Routes
Method	Endpoint	Description
POST	/api/login	Login user
POST	/api/register	Register new user
Video Routes
Method	Endpoint	Protected	Description
POST	/api/video	Yes	Upload video
GET	/api/allvideo	Yes	Fetch all videos
GET	/api/getvideobyid/:id	No	Fetch video by ID
📁 9. Folder Structure
Frontend Folder Structure
src/
│── Components/
│     ├── NavBar.jsx
│     ├── VideoCard.jsx
│     ├── Sidebar.jsx
│
│── Pages/
│     ├── Home.jsx
│     ├── Video.jsx
│     ├── ChannelPage.jsx
│     ├── VideoUpload.jsx
│     ├── SignIn.jsx
│
│── utils/
│     ├── axiosInstance.js
│
│── App.jsx
│── main.jsx

Backend Folder Structure
src/
│── controllers/
│     ├── user.controller.js
│     ├── video.controller.js
│
│── models/
│     ├── user.model.js
│     ├── video.model.js
│
│── middleware/
│     ├── Authentication.js
│     ├── upload.js
│
│── routes/
│     ├── user.routes.js
│     ├── video.routes.js
│
│── utils/
│     ├── cloudinary.js
│
│── app.js
│── server.js

🔄 10. Flow of Execution
1️⃣ User logs in

Backend validates credentials

JWT token is created

Token stored in frontend localStorage

Axios automatically attaches token headers

2️⃣ Home Page Loads

Frontend hits: /api/allvideo

Videos are displayed in grid layout

3️⃣ User Uploads Video

Frontend sends:

Video file

Thumbnail

Title

Category

Backend uploads file to Cloudinary

Metadata stored in MongoDB

4️⃣ User Watches Video

Frontend fetches video details by ID

Displays YouTube iframe

Shows recommended videos

▶️ 11. How to Run the Project
Frontend
git clone https://github.com/sravanKumar1211/YouTube-Clone
cd YouTube-Clone
npm install
npm run dev

Backend
git clone https://github.com/sravanKumar1211/YouTube-Backend
cd YouTube-Backend
npm install

Add environment variables in .env:
PORT=5000
MONGO_URI=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

Start server
npm start

🚀 12. Future Enhancements

These can be added to improve the project:

Comments system

Like/Dislike system

Subscriptions & channels

Watch history

Video recommendations

Live streaming

Notifications

User profile page

Admin dashboard

🏁 13. Conclusion

This YouTube Clone project demonstrates real-world full-stack development skills using the MERN stack.
It includes authentication, video uploads, Cloudinary integration, secure APIs, responsive UI, and proper project structure.

This project is an excellent portfolio piece, proving your ability to build scalable, production-like web applications.

