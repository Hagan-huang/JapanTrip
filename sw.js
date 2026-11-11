// 離線快取：沒網路時也能打開行程、航班、住宿
const VER = "kt-v2026111133";
const CORE = [
  "./", "./index.html", "./data.js?v=2026111133", "./app.js?v=2026111133", "./manifest.webmanifest",
  "./images/cover.jpg", "./images/hero.jpg", "./images/katana.png",
  "./images/banner-flights.jpg", "./images/banner-days.jpg", "./images/banner-prep.jpg", "./images/banner-money.jpg",
  "./images/tab-flights.png", "./images/tab-days.png", "./images/tab-prep.png", "./images/tab-money.png",
  "./images/icon-192.png", "./images/apple-touch-icon.png"
];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(VER).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VER).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET") return;
  // 共用帳本（Google Apps Script）不快取，永遠走網路
  if (url.hostname.endsWith("script.google.com") || url.hostname.endsWith("googleusercontent.com")) return;
  // 打開網頁：先試網路拿最新版，沒網路才用快取
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(r => { const cp = r.clone(); caches.open(VER).then(c => c.put("./index.html", cp)); return r; })
      .catch(() => caches.match("./index.html").then(r => r || caches.match("./"))));
    return;
  }
  // 其他檔案（圖片、程式、字型）：先用快取，背景再更新
  e.respondWith(caches.match(req).then(hit => {
    const net = fetch(req).then(r => { if (r && (r.ok || r.type === "opaque")) { const cp = r.clone(); caches.open(VER).then(c => c.put(req, cp)); } return r; }).catch(() => hit);
    return hit || net;
  }));
});
