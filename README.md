這是一份為您的專案量身打造的、極具專業度與學術涵養的 `README.md`。這份 README 不僅展示了您的技術能力（React + Supabase），更完美突顯了您專案最大的亮點：**「深厚的教育心理學與學習科學底蘊」**。

您可以直接複製以下內容，並貼上至您的 `README.md` 檔案中：

---

```markdown
# 🧠 Data Structures & Algorithms - 適應性數位學習平台 (Adaptive LMS)

[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC.svg)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E.svg)](https://supabase.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

這不僅僅是一個演算法刷題網站，而是一個嚴格遵循 **《How People Learn (HPL)》** 學習科學原則，以及 **《Four spaces of network learning models》** 理論所打造的「適應性數位學習生態系統 (Adaptive E-Learning Ecosystem)」。

本系統專為「資料結構與演算法 (CS-201)」設計，旨在解決傳統程式學習平台「認知負荷過高」與「過度競爭焦慮」的痛點，幫助學員不僅學會 Coding，更培養出面對未知 Bug 的挫折忍受力 (AQ) 與創造性問題解決能力。

---

## 🌟 核心教育理念與系統實踐 (Pedagogical Foundation)

本系統完美融合了 HPL 四大面向與網路學習四大空間：

### 1. 學習者中心 (Learner-Centered)
* **先備知識動態診斷**：學員首次登入時，系統會調查其程式基礎與面對 Bug 的心智模型（本質論 vs 增進論）。
* **自適應學習軌道 (Adaptive Tracks)**：依據診斷結果，系統自動分派「基礎概念建構」、「邊界除錯深化」或「高階最佳化」軌道，並動態調整認知鷹架 (Scaffolding) 的介入程度。

### 2. 知識中心 (Knowledge-Centered) & 網路學習模式
* **結構化知識學習 (Phase 1 ~ 3)**：
  * **非正式概念**：用「生活譬喻（如：爬樓梯）」建立直覺。
  * **漸進正式化**：過渡到嚴謹的數學公式與 Big O 分析。
  * **技能自動化**：內建多語言編譯器，進行無時間壓力的刻意練習。
* **複雜問題與任務導向學習 (Phase 4)**：
  * 給予真實工程災難情境（如：伺服器流量暴增）與 **15分鐘倒數計時**。強制關閉鷹架，要求學員透過「探究式計畫板」寫下假說，鍛鍊高壓下的 AQ。

### 3. 評量中心 (Assessment-Centered)
* **開放式學習者模型 (Open Learner Model, OLM)**：將學習分析 (LA) 具象化為「Skill Meters (技能量表)」，協助學習者進行後設認知監控。
* **形成性自我評量與 e-Portfolio**：摒棄傳統打分，使用自信度滑桿給予即時修正建議，並完整追蹤任務完成度與在線累積時數。

### 4. 社群中心 (Community-Centered)
* **零競爭的共學環境 (Anti-Competitive Design)**：移除解題速度排行榜，改以「XP 經驗值」進行自我參照的遊戲化激勵。
* **踩坑博物館 (Bug Hall of Fame)**：鼓勵分享錯誤，並支援 **完全匿名發文**，讓「犯錯」成為進步的勳章，徹底消除學生的學術防衛心態。

---

## 🚀 系統功能與特色 (Key Features)

* **🔐 安全的身份認證 (Authentication)**
  * 採用 Supabase Auth，支援 Email 驗證註冊。
  * 全域路由守衛 (Route Guards)，未登入自動攔截，登入後無縫顯示個人化導覽列。
* **📊 學習分析主頁 (LA Dashboard)**
  * 顯示微觀學習進度 (Khan-style Trace) 與 OLM 技能雷達。
  * 點擊「建議下一步」按鈕，精準觸發 Deep Linking 跳轉至對應虛擬教室節點。
* **💻 沈浸式虛擬教室 (Virtual Classroom)**
  * 支援 JavaScript, Python, C++, Java 多語系切換的 Coding Editor。
  * 模擬非同步編譯執行與終端機 (Terminal) 輸出回饋。
* **🤝 雲端共學資源庫 (Community Library)**
  * 真實連線 Supabase 資料庫，支援發佈貼文、即時按讚與防呆刪除機制。
* **🎓 動態結業證書 (Completion Certificate)**
  * 自動統整學員 Email、解鎖任務數與真實活動秒數，生成具備質感的學術證書。
  * 支援直接列印/儲存為 PDF (智慧隱藏網頁導覽列)。

---

## 🛠️ 技術堆疊 (Tech Stack)

* **前端框架**: React (v18), React Router DOM
* **樣式排版**: Tailwind CSS (響應式設計 RWD, 支援手機自適應選單)
* **後端與資料庫**: Supabase (PostgreSQL, Authentication)
* **部署**: Vercel

---

## 📦 安裝與本地運行 (Local Setup)

1. **複製專案 (Clone the repository)**
   ```bash
   git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
   cd your-repo-name

```

2. **安裝依賴套件 (Install dependencies)**
```bash
npm install
# 或 yarn install

```


3. **設定環境變數 (Set up Environment Variables)**
在根目錄建立 `.env` 檔案，並填入您的 Supabase 憑證：
```env
VITE_SUPABASE_URL=您的_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=您的_SUPABASE_ANON_KEY

```


4. **啟動開發伺服器 (Start the dev server)**
```bash
npm run dev

```


打開瀏覽器前往 `http://localhost:5173` 即可預覽。

---

## 🗄️ 資料庫結構 (Database Schema)

本專案於 Supabase 使用以下核心資料表：

* `dsa_tasks`: 紀錄任務清單與完成狀態 (結合 XP 遊戲化)。
* `dsa_online_history`: 即時追蹤並加總每日學習在線秒數。
* `dsa_community_posts`: 儲存社群貼文，包含作者、內容、類型 (Bug/Share)、標籤、讚數及匿名狀態。

*(附註：詳細的 SQL 建表語法可參考專案開發文件。)*

