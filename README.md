# 💻 CS-201: Data Structures & Algorithms Learning Platform

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

這是一個專為「資料結構與演算法 (DSA)」設計的現代化線上學習系統 (LMS)。採用「優雅極簡風 (Elegant Minimalist)」的 UI/UX 設計語言，旨在提供無干擾、高專注度的程式碼學習體驗。

🌐 **Live Demo:** [點此查看線上預覽](https://您的vercel網址.vercel.app) *(請替換為您的實際網址)*

---

## ✨ 核心功能 (Features)

本專案將靜態網頁轉化為具備狀態管理與響應式設計的真實 Web App：

* 📊 **數據驅動儀表板 (Dashboard)**
    * 整合「課程進度條」、「學習時數統計」與仿 GitHub 的「貢獻度日曆 (Contribution Calendar)」。
    * 內建任務清單機制，並透過 `localStorage` 實現前端進度記憶功能。
* 🎥 **客製化虛擬教室 (Virtual Classroom)**
    * 摒棄外部 iframe，實作具備毛玻璃漸層遮罩 (Glassmorphism) 的客製化高質感播放器 UI。
    * 支援動態章節切換與課程進度追蹤。
* 🤖 **全域 AI 學習助教 (Floating AI Assistant)**
    * 右下角懸浮式 AI 對話視窗，支援開闔動畫與模擬對話流，隨時輔助演算法觀念解惑。
* 📱 **完美響應式設計 (RWD)**
    * 支援跨裝置無縫瀏覽，針對行動裝置實作客製化「漢堡下拉選單 (Hamburger Menu)」。
* 🔐 **無縫路由導航 (Routing)**
    * 全面整合 `react-router-dom`，包含註冊、儀表板、課程資訊、資源庫、意見回饋與結業證書等 7 個完整實體頁面。

---

## 🛠️ 技術棧 (Tech Stack)

* **前端框架:** React 18
* **建置工具:** Vite
* **樣式引擎:** Tailwind CSS
* **路由管理:** React Router v6
* **狀態與儲存:** React Hooks (`useState`, `useEffect`), Browser `localStorage`
* **部署環境:** Vercel

---

## 🚀 本地端運行 (Local Development)

若您想在本地端運行此專案，請按照以下步驟操作：

**1. 複製專案 (Clone Repository)**
```bash
git clone [https://github.com/您的帳號/dsa-learning-platform.git](https://github.com/您的帳號/dsa-learning-platform.git)
cd dsa-learning-platform
```
**2. 安裝依賴套件 (Install Dependencies)**

```bash
npm install
```
**3. 啟動開發伺服器 (Start Dev Server)**
```
bash
npm run dev
```
啟動後，請開啟瀏覽器並造訪 http://localhost:5173。

📂 專案結構 (Project Structure)
Plaintext
src/
├── components/          # 可重用的 UI 積木 (Components)
│   ├── AIAssistant.jsx      # 全域懸浮 AI 助教
│   ├── CourseProgressCard.jsx # 儀表板進度卡片
│   ├── TaskList.jsx         # 待辦任務清單
│   └── TopNavigation.jsx    # 全域頂部導覽列 (含 RWD 漢堡選單)
├── pages/               # 完整實體頁面 (Pages)
│   ├── Completion.jsx       # 結業證書與成就
│   ├── CourseInfo.jsx       # 課程詳細資訊
│   ├── Dashboard.jsx        # 學習主頁 (儀表板)
│   ├── Feedback.jsx         # 意見回饋表單
│   ├── Library.jsx          # 程式碼資源庫
│   ├── Registration.jsx     # 註冊與登入入口
│   └── VirtualClassroom.jsx # 虛擬教室與播放器
├── App.jsx              # 核心路由設定檔
└── main.jsx             # React 進入點
🎯 學習目標與應用場景
本專案 (CS-201) 著重於以下演算法領域的學習呈現：

Big O 時間與空間複雜度分析

雙指標 (Two Pointers) 與滑動視窗 (Sliding Window)

動態規劃 (Dynamic Programming) 與記憶化搜尋 (Memoization)

樹 (Trees) 與圖 (Graphs) 的走訪與實作

Disclaimer: 本專案為前端開發實踐與 UI/UX 展示作品，無串接真實後端資料庫，敏感用戶數據與學習狀態皆保存在本地瀏覽器緩存中。