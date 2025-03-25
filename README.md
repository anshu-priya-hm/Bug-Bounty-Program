# Bug Bounty Program

## 📌 Overview  
This is a **Bug Bounty Program** web application built with **Next.js** and **Node.js (Express & SQLite)**.  
It allows users to know about HappyMoney Bug Bounty Program and **submit bug reports**  making it an ideal platform for security researchers and developers to contribute to improving application security.  

---

## 🚀 Features  
✅ Submit bug reports through an interactive form  
✅ Secure backend with **Express.js** and **SQLite** for data storage  
✅ Responsive UI with reusable **React components**  
✅ Next.js framework for **optimized performance** and **server-side rendering (SSR)**  

---

## 📂 Project Structure  

### 🖥 Backend (`backend/`)  
Handles server-side operations using **Express.js** and **SQLite**.  
- 📂 `database.db` – SQLite database file storing bug reports.  
- 🖥 `server.js` – Express server handling API requests.  
- 📜 `package.json` – Backend dependencies.  
- 🔒 `package-lock.json` – Lock file for dependencies.  
- 📁 `uploads/` – Directory for storing uploaded bug report images.  

### 🌐 Frontend  
#### 📦 Components (`components/`)  
Reusable React components for the UI.  
- 🏆 `BountyProgram.js` – Main Bug Bounty Program UI.  
- 🏠 `Header.js` – Website navigation bar.  
- 📝 `SubmitReport.js` – Form to submit new bug reports.  
- 📋 `ViewReports.js` – Displays submitted bug reports.  

#### 📄 Pages (`pages/`)  
Next.js pages for routing.  
- 🏠 `index.js` – Homepage.  
- 📝 `submit-report.js` – Bug submission page.  

### 📁 Public Assets (`public/`)  
Contains static files such as images and icons.  

### 🎨 Styles (`styles/`)  
CSS stylesheets for styling the application.  

### ⚙️ Configuration & Settings  
- 🔧 `next.config.js` – Configuration file for Next.js.  
- 📏 `eslint.config.mjs` – ESLint configuration for code linting.  
- 🛠 `jsconfig.json` – JavaScript project settings.  

### 📦 Project Metadata  
- 📜 `package.json` – Contains project dependencies and scripts.  
- 🔒 `package-lock.json` – Ensures consistent package versions.  
- 📖 `README.md` – Project documentation.  

---

### 1️⃣ Clone the Repository  
git clone https://github.com/anshu-priya-hm/Bug-Bounty-Program.git

## 🛠️ Installation & Setup 
cd Bug-Bounty-Program
npm install

## Start Backend (Express + SQLite)
cd Bug-Bounty-Program/backend
npm install
node server.js

## Start the application
cd Bug-Bounty-Program
npm run dev


