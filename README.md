# 京都・大阪 9 天 8 夜｜2027.1.13–1.21

賽博龐克風格的旅行網頁：航班、每日行程、出發前準備、記帳（個人＋分帳）。

## 檔案
- `index.html`：版面和樣式
- `data.js`：**行程資料，要改行程就改這裡**
- `app.js`：程式
- `apps-script/Code.gs`：共用分帳的後端，貼到 Google 試算表裡用

## 開啟 GitHub Pages（只要做一次）
1. 到 repo 的 **Settings → Pages**
2. Source 選 **Deploy from a branch**
3. Branch 選 **main**，資料夾選 **/ (root)**，按 Save
4. 等 1–2 分鐘，網址是 `https://hagan-huang.github.io/JapanTrip/`

## 設定共用分帳（約 10 分鐘，只要做一次）
沒設定之前，分帳是「單機測試模式」，資料只存在自己的手機。

1. 開一份新的 Google 試算表，名稱隨意（例如「日本行分帳」）
2. 上方選單 **擴充功能 → Apps Script**
3. 把編輯器裡原本的內容全部刪掉，貼上 `apps-script/Code.gs` 的全部內容
4. 把第 7 行的 `請改成你們的團體密碼` 改成你們要用的密碼（例如 `kansai0113`），按儲存
5. 右上角 **部署 → 新增部署作業**
   - 類型（齒輪圖示）選 **網頁應用程式**
   - 執行身分：**我**
   - 誰可以存取：**所有人**
   - 按「部署」，第一次會要求授權，選你的 Google 帳號 → 進階 → 前往（不安全）→ 允許
6. 複製「網頁應用程式網址」（`https://script.google.com/macros/s/.../exec`），傳給 Claude，或自己貼到 `data.js` 的 `SHEET_URL`
7. 把團體密碼告訴其他團員；他們第一次打開記帳頁時，輸入暱稱和密碼就能加入

> 之後如果修改了 Apps Script 程式，要用 **部署 → 管理部署作業 → 編輯 → 版本選「新版本」** 重新部署，網址不會變。

## 首頁背景圖
把圖放到 `images/` 資料夾，然後在 `data.js` 的 `HERO_IMAGE` 填檔名，例如 `"images/hero.jpg"`。
