---


# YouTube Clone Frontend
Built with React & Vite by Sravan Kumar
## 🧾 Frontend README (`YouTube-Clone/README.md`)

git clone [https://github.com/sravanKumar1211/YouTube-Clone.git](https://github.com/sravanKumar1211/YouTube-Clone.git)



## 📺 Features

# YouTube Clone (Frontend)

React + Vite frontend for a YouTube-like video platform.  
Provides UI for authentication, video listing, video player, channels, search, upload and user interactions (likes, comments).



## ✨ Features

- **Authentication UI**
  - Login / Register forms
  - Token-based auth integration with backend API
  - Protected routes (only logged-in users can upload, comment, etc.)

- **Home Feed**
  - Fetches videos from backend
  - Responsive grid layout using Tailwind CSS
  - Shows title, thumbnail, channel name, views and upload time

- **Video Watch Page**
  - HTML5 video player using Cloudinary/video URL from backend
  - Video details (title, description, tags)
  - Like / dislike / subscribe actions
  - Comments list + add comment form
  - Recommended / related videos sidebar

- **Channel Page**
  - Channel banner + avatar + basic channel info
  - Channel subscription button
  - Channel’s uploaded videos list

- **Upload Video**
  - Upload form (title, description, category, thumbnail, video file)
  - Sends files to backend, which uploads to Cloudinary
  - Displays toast notifications for success / error

- **Global Search**
  - Search bar in navbar
  - Search results page based on title/description/category


## 🧱 Tech Stack

- **Frontend Framework:** React + Vite
- **Tech:** useState ,useEffect ,lazyloading, useMemo, React.memo
- **Routing:** React Router
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Notifications:** (e.g. react-toastify) – shows success/error toasts
- **Media:** Cloudinary URLs from backend


## 📁 Project Structure

```bash
YouTube-Clone/
├── public/
├── src/
│   ├── components/        # Reusable UI components (Navbar, Sidebar, VideoCard, etc.)
│   ├── pages/             # Page components (Home, Watch, Channel, Upload, Login, Register, etc.)
│   ├── features/         
│   ├── App.jsx            # Main app component, routing
│   └── main.jsx          # React entrypoint
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md


## 🛠️ Technologies Used

- **Framework**: [React.js](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: Tailwind CSS / CSS Modules (Inferred)
- **Routing**: React Router DOM
- **State Management**: React Hooks (useState, useEffect,lazyLoading, useMemo, React.memo) 
- **HTTP Client**: Axios (for API communication)
- **Icons**: React Icons / FontAwesome


This structure ensures that the UI is modular, maintainable, and easy to scale.

## 🚀 How to Run Locally

1. **Clone the repository**
   ```bash
   git clone [https://github.com/sravanKumar1211/YouTube-Clone.git](https://github.com/sravanKumar1211/YouTube-Clone.git)
   cd YouTube-Clone
Install Dependencies

Bash

npm install
connect to endpoint to backend:

Code snippet

VITE_BACKEND_URL=http://localhost:3000/api/v1
Start Development Server

Bash

npm run dev
Access the app at http://localhost:5173 (or the port shown in your terminal).

Build for Production

Bash

npm run dev

Built with React & Vite by Sravan Kumar







<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
=======
# YouTube-Clone
>>>>>>> 0c66ceecb7a5c378cb2939e11725dc5422def6a8
