---
# YouTube Clone Frontend
Built with React & Vite by Sravan Kumar

git clone [https://github.com/sravanKumar1211/YouTube-Clone.git](https://github.com/sravanKumar1211/YouTube-Clone.git)
---

# 🎬 YouTube Clone – Frontend  
A fully responsive, feature-rich YouTube-like UI built using **React**, designed to integrate seamlessly with the custom backend API.  
This project recreates core YouTube functionalities such as browsing videos, watching content, exploring channels, searching, and uploading videos (with authentication).

---

## 🚀 **Project Purpose**
The goal of this project is to:
- Practice real-world full-stack development.
- Build a visually appealing, responsive YouTube-like interface.
- Implement API integration, authentication handling, and media rendering.
- Learn clean folder structures, reusable components, and scalable UI design.

---

# ✨ **Features**
### 🎥 **Core Features**
- Display all videos from backend API  
- Watch embedded videos  
- Channel pages & channel filtering  
- Video upload interface stored in cloudinary 
- User authentication (sign in, protected routes)  
- Search functionality (frontend logic)  
- Fully responsive (mobile → desktop)

### 🧩 **UI/UX Features**
- Clean layout similar to YouTube  
- Sidebar navigation  
- Hover effects  
- Lazy loading of pages  
- Card-based video listing  
- Shimmer loading UI (if implemented)

---

# 🛠️ **Technologies Used**
| Category | Tech |
|---------|------|
| **Frontend Framework** | React.js |
| **Routing** | react-router-dom |
| **HTTP Requests** | Axios |
| **State Management** | useState, useEffect, useCallback, Context |
| **Styling** | Tailwind CSS / CSS (based on repo) |
| **Lazy Loading** | React.lazy + Suspense |
| **Authentication** | JWT stored in browser, sent in headers |
| **Video Embeds** | YouTube iframe embedding |

---

# 📁 **Folder Structure Explained**

---
```bash
src/
│── Components/
│ ├── NavBar.jsx → Top navigation bar
│ ├── VideoCard.jsx → UI for each video thumbnail
│ ├── Sidebar.jsx → Category / menu sidebar
│ ├── HomePage.jsx → Renders filter/ video cards
| ├── Login.jsx → login using JWT token
| ├── SignIn.jsx → signin sent data to backend
│── Pages/
│ ├── Home.jsx → Fetches + displays all videos
│ ├── Video.jsx → Single video view page
│ ├── ChannelPage.jsx → Channel-specific content
│ ├── VideoUpload.jsx → UI for uploading videos
│ ├── VideoCommentCard.jsx → for comments
| ├── VideoSuggestedCard.jsx → suggested videos
│
│── App.jsx → Main APP + Routes
│── index.jsx → App entry point
│
│ ├── axiosInstance.js → Pre-configured Axios (baseURL + token)
│
tailwind.config.js
package.json

---


### **Folder Structure Purpose**
- **Components** → Reusable UI blocks  
- **Pages** → Full screens linked to routes  
- **utils** → Axios instance & helper functions  
- **App.jsx** → Routing and layout handling  

---

# 🔄 **Frontend Flow (How Code Executes)**

### **1️⃣ App loads**  
- React Router initializes  
- NavBar + Sidebar render  
- Protected routes block unauthenticated pages

### **2️⃣ Home Page**  
- Makes request to:  
  `GET /api/allvideo`  
- Displays Video Cards in grid

### **3️⃣ Video Page**  
- Fetch video by ID  
- Render YouTube iframe  
- Additional metadata + recommended videos

### **4️⃣ Upload Page**  
- Allows user to upload video  
- Sends `multipart/form-data` to backend

### **5️⃣ Authentication**  
- Login page gets token → saved in localStorage  
- Axios sends `Authorization: Bearer <token>`

---

# ▶️ **How to Run the Project**

### **1. Clone Repo**
```sh
git clone https://github.com/sravanKumar1211/YouTube-Clone
cd YouTube-Clone

2. Install Dependencies
npm install

3. Start Development Server
npm run dev

4. Make sure backend is running at port 3000

Update the backend URL in axiosInstance.

🎯 Conclusion

The YouTube Clone frontend replicates a modern video browsing experience with scalable structure and production-level best practices. It serves as a strong portfolio project and integrates perfectly with your custom backend.