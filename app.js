(() => {
"use strict";
const T = window.TRIP;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const store = {
  get(k, d) { try { const v = localStorage.getItem("kt_" + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem("kt_" + k, JSON.stringify(v)); } catch {} }
};
let toastTimer;
function toast(msg) {
  const t = $("#toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}
const mapUrl = q => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

/* =========================================================
   Hero
   ========================================================= */
function heroSVG() {
  // 隨機但固定的窗戶
  let seed = 7; const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  const cols = ["#05d9e8", "#ff2a6d", "#f9f871", "#b967ff"];
  let bld = "", win = "";
  const blds = [[0,190,34,130],[30,205,30,115],[56,175,26,145],[104,200,30,120],[132,215,22,105],[250,205,26,115],[272,185,22,135],[372,180,30,140],[350,210,26,110]];
  blds.forEach(([x,y,w,h]) => {
    bld += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#120826" stroke="#2a1550" stroke-width="1"/>`;
    for (let yy = y + 8; yy < y + h - 6; yy += 9) for (let xx = x + 4; xx < x + w - 4; xx += 7)
      if (rnd() > .62) win += `<rect x="${xx}" y="${yy}" width="3" height="4" fill="${cols[Math.floor(rnd()*4)]}" opacity="${(.35 + rnd()*.6).toFixed(2)}"/>`;
  });
  const stripes = [0,1,2,3,4].map(i => `<rect x="250" y="${92 + i*9}" width="100" height="${2 + i}" fill="#1c0733"/>`).join("");
  return `<svg class="city" viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#05030f"/><stop offset=".55" stop-color="#1c0733"/><stop offset="1" stop-color="#3a0b3d"/></linearGradient>
    <linearGradient id="sun" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f9f871"/><stop offset=".6" stop-color="#ff2a6d"/><stop offset="1" stop-color="#b967ff"/></linearGradient>
    <linearGradient id="gnd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a0a3f"/><stop offset="1" stop-color="#07060f"/></linearGradient>
    <filter id="gl" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <filter id="gl2" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5"/></filter>
  </defs>
  <rect width="400" height="320" fill="url(#sky)"/>
  <circle cx="300" cy="105" r="50" fill="#ff2a6d" opacity=".35" filter="url(#gl2)"/>
  <circle cx="300" cy="105" r="44" fill="url(#sun)"/>${stripes}
  <polygon points="0,215 60,170 110,200 170,160 230,195 290,165 340,190 400,170 400,240 0,240" fill="#170a30"/>
  <!-- 五重塔 -->
  <g stroke="#05d9e8" stroke-width="1.3" fill="#0d0620" filter="url(#gl)" class="flick2">
    <line x1="80" y1="98" x2="80" y2="112"/>
    <path d="M66 126 L80 112 L94 126 Z"/><rect x="72" y="126" width="16" height="10"/>
    <path d="M62 146 L80 132 L98 146 Z"/><rect x="71" y="146" width="18" height="10"/>
    <path d="M58 166 L80 152 L102 166 Z"/><rect x="70" y="166" width="20" height="10"/>
    <path d="M54 186 L80 172 L106 186 Z"/><rect x="69" y="186" width="22" height="10"/>
    <path d="M50 206 L80 192 L110 206 Z"/><rect x="68" y="206" width="24" height="24"/>
  </g>
  <!-- 大阪城 -->
  <g stroke="#ff2a6d" stroke-width="1.3" fill="#0d0620" filter="url(#gl)" class="flick3">
    <path d="M300 160 L316 148 L332 160 Z"/><rect x="304" y="160" width="24" height="12"/>
    <path d="M294 180 L316 166 L338 180 Z"/><rect x="300" y="180" width="32" height="12"/>
    <path d="M288 200 L316 186 L344 200 Z"/><rect x="296" y="200" width="40" height="14"/>
    <path d="M284 214 L348 214 L356 236 L276 236 Z"/>
  </g>
  ${bld}${win}
  <!-- 霓虹招牌 -->
  <g font-family="Noto Sans TC,sans-serif" font-weight="900" font-size="11" text-anchor="middle" filter="url(#gl)">
    <g class="flick"><rect x="36" y="210" width="16" height="46" fill="#07060f" stroke="#ff2a6d"/><text x="44" y="224" fill="#ff2a6d">京</text><text x="44" y="238" fill="#ff2a6d">都</text><text x="44" y="252" fill="#ff2a6d" font-size="8">◆</text></g>
    <g class="flick3"><rect x="356" y="214" width="16" height="46" fill="#07060f" stroke="#05d9e8"/><text x="364" y="228" fill="#05d9e8">大</text><text x="364" y="242" fill="#05d9e8">阪</text><text x="364" y="256" fill="#05d9e8" font-size="8">◆</text></g>
    <g class="flick2"><rect x="108" y="222" width="22" height="14" fill="#07060f" stroke="#f9f871"/><text x="119" y="233" fill="#f9f871" font-size="8">BAR</text></g>
    <g class="flick"><rect x="252" y="226" width="22" height="30" fill="#07060f" stroke="#b967ff"/><text x="263" y="239" fill="#b967ff" font-size="8">忍</text><text x="263" y="251" fill="#b967ff" font-size="8">者</text></g>
  </g>
  <rect x="0" y="262" width="400" height="58" fill="url(#gnd)"/>
  <!-- 鳥居 -->
  <g fill="#ff2a6d" filter="url(#gl)">
    <path d="M128 196 Q200 184 272 196 L274 204 Q200 193 126 204 Z"/>
    <rect x="140" y="212" width="120" height="6"/>
    <rect x="196" y="204" width="8" height="10"/>
    <rect x="152" y="202" width="9" height="88"/>
    <rect x="239" y="202" width="9" height="88"/>
  </g>
  <g fill="#ff2a6d" opacity=".25" transform="translate(0,580) scale(1,-1)"><rect x="152" y="290" width="9" height="40"/><rect x="239" y="290" width="9" height="40"/></g>
  <g stroke="#05d9e8" stroke-width=".6" opacity=".35"><line x1="0" y1="296" x2="400" y2="296"/><line x1="0" y1="305" x2="400" y2="305"/><line x1="0" y1="316" x2="400" y2="316"/></g>
</svg>`;
}
function initHero() {
  $("#tCode").textContent = T.code;
  $("#tTitle").textContent = T.title; $("#tTitle").dataset.t = T.title;
  $("#tRange").textContent = T.range;
  const art = $("#heroArt");
  const cover = T.COVER_IMAGE || T.HERO_IMAGE;
  if (T.HERO_IMAGE) document.documentElement.style.setProperty("--img", `url("${T.HERO_IMAGE}")`);
  if (cover) {
    const img = new Image(); img.className = "bg"; img.alt = "";
    img.onload = () => { art.innerHTML = ""; art.appendChild(img); };
    img.onerror = () => { art.innerHTML = heroSVG(); };
    img.src = cover;
  } else art.innerHTML = heroSVG();
  // 倒數
  const ms = new Date(T.departAt) - new Date();
  const days = Math.ceil(ms / 864e5);
  $("#count").innerHTML = days > 0 ? `出發倒數 <b>${days}</b> 天` : days > -9 ? `旅行中 <b>DAY ${1 - days}</b>` : `旅程結束 <b>✓</b>`;
  const bd = days > 0 ? `${T.range}　//　T-${days} DAYS` : days > -9 ? `${T.range}　//　DAY ${1 - days}` : T.range;
  $$("[data-bd]").forEach(x => x.textContent = bd);
  // 雨
  const cv = $("#rain"), cx = cv.getContext("2d");
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let W, H, drops = [];
  const resize = () => {
    const r = devicePixelRatio || 1; W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W * r; cv.height = H * r; cx.setTransform(r, 0, 0, r, 0, 0);
    drops = Array.from({ length: Math.round(W / 6) }, () => ({ x: Math.random() * W, y: Math.random() * H, l: 8 + Math.random() * 14, v: 4 + Math.random() * 5, a: .15 + Math.random() * .35 }));
  };
  resize(); addEventListener("resize", resize);
  let visible = true;
  new IntersectionObserver(e => visible = e[0].isIntersecting).observe(cv);
  window.__stopRain = () => { visible = false; };
  (function loop() {
    if (visible) {
      cx.clearRect(0, 0, W, H);
      for (const d of drops) {
        cx.strokeStyle = `rgba(150,230,255,${d.a})`; cx.lineWidth = 1;
        cx.beginPath(); cx.moveTo(d.x, d.y); cx.lineTo(d.x - 1.5, d.y + d.l); cx.stroke();
        d.y += d.v; d.x -= .3;
        if (d.y > H) { d.y = -d.l; d.x = Math.random() * W; }
      }
    }
    requestAnimationFrame(loop);
  })();
}

/* =========================================================
   Flights
   ========================================================= */
const CMAP = { cyan: "var(--cyan)", pink: "var(--pink)", purple: "var(--purple)", yellow: "var(--yellow)" };
const AP = T.airports;
const hm = d => d.toLocaleTimeString("zh-TW", { hour: "2-digit", minute: "2-digit", hour12: false });
// 用機場當地時間顯示
const localT = (iso, code) => { const d = new Date(iso); const u = new Date(d.getTime() + AP[code].tz * 36e5); return String(u.getUTCHours()).padStart(2, "0") + ":" + String(u.getUTCMinutes()).padStart(2, "0"); };
const durTxt = ms => { const m = Math.round(ms / 6e4); return `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, "0")}m`; };
const apName = (c, t) => AP[c].name + (t ? " " + t : "");

function flightCard(f, i) {
  const L = f.legs, a = L[0], z = L[L.length - 1];
  const total = new Date(z.arr) - new Date(a.dep);
  return `<div class="card glow fl" style="--c:${CMAP[f.color] || "var(--cyan)"}" data-f="${i}">
    <div class="top"><span>${f.ret ? "1/21（四）" : esc(f.date)}　${esc(f.who)}</span><span>${L.map(l => esc(l.no || l.airline)).join(" → ")}</span></div>
    <div class="row">
      <div><div class="t">${localT(a.dep, a.from)}</div><div class="p">${esc(apName(a.from, a.fromT))}</div></div>
      <div class="mid"><span>${L.length > 1 ? "轉機・" : ""}${durTxt(total)}</span></div>
      <div class="end"><div class="t">${localT(z.arr, z.to)}</div><div class="p">${esc(apName(z.to, z.toT))}</div></div>
    </div>
    ${L.length > 1 ? `<div class="legs">經 ${L.slice(0, -1).map(l => AP[l.to].name).join("、")}</div>` : ""}
    ${f.note ? `<div class="nt">▸ ${esc(f.note)}</div>` : ""}
    <div class="go">飛行過程 ▸</div>
  </div>`;
}
let fTab = 0;
function initFlights() {
  const out = T.flights.map((f, i) => [f, i]).filter(([f]) => !f.ret);
  const render = () => {
    $("#ftabs").innerHTML = T.flightDates.map((d, k) => { const n = out.filter(([f]) => f.date === d).length; return `<button class="${k === fTab ? "on" : ""}" data-t="${k}">${d}<small>${n ? n + " 班" : "—"}</small></button>`; }).join("");
    const list = out.filter(([f]) => f.date === T.flightDates[fTab]);
    $("#flightList").innerHTML = list.length ? list.map(([f, i]) => flightCard(f, i)).join("") : `<div class="card"><div class="empty">這天目前沒有人搭機</div></div>`;
  };
  // 預設選第一個有航班的日期
  const gsel = store.get("group", "kyoto"), mine = out.find(([f]) => f.g === gsel);
  fTab = mine ? T.flightDates.indexOf(mine[0].date) : Math.max(0, T.flightDates.findIndex(d => out.some(([f]) => f.date === d)));
  render();
  $("#retList").innerHTML = T.flights.map((f, i) => f.ret ? flightCard(f, i) : "").join("");
  $("#ftabs").addEventListener("click", e => { const b = e.target.closest("button"); if (b) { fTab = +b.dataset.t; render(); } });
  $("#flights").addEventListener("click", e => { const c = e.target.closest(".fl"); if (c) openFlight(T.flights[+c.dataset.f]); });
  $("#modal").addEventListener("click", e => { if (e.target.id === "modal" || e.target.closest(".xx")) closeFlight(); });
}

/* ---- 航線地圖 ---- */
const MAPB = { lon0: 116, lon1: 138, lat0: 21, lat1: 39 }, MW = 440, MH = 360;
const P = (lat, lon) => [((lon - MAPB.lon0) / (MAPB.lon1 - MAPB.lon0) * MW).toFixed(1), ((MAPB.lat1 - lat) / (MAPB.lat1 - MAPB.lat0) * MH).toFixed(1)];
const poly = pts => pts.map(([la, lo]) => P(la, lo).join(",")).join(" ");
const LAND = [
  // 中國沿海
  [[21, 116], [23, 116.5], [24.4, 118.1], [25.5, 119.5], [26.7, 119.8], [28, 121], [29.5, 121.9], [30.8, 121.9], [31.7, 121.2], [32.5, 120.8], [34.3, 119.5], [35.3, 119.4], [36, 120.3], [36.9, 122.4], [37.4, 122.6], [37.6, 121], [37.3, 119.5], [37.8, 118.9], [38.5, 117.6], [39, 117.5], [39, 116], [21, 116]],
  // 台灣
  [[25.3, 121.5], [25, 122], [24, 121.6], [23, 121.4], [22, 120.9], [21.9, 120.7], [22.6, 120.3], [23.5, 120.1], [24.5, 120.6], [25.1, 121]],
  // 朝鮮半島
  [[39, 124.6], [38.3, 124.8], [37.7, 126.1], [37, 126.6], [36.5, 126.3], [35.9, 126.6], [35, 126.3], [34.4, 126.5], [34.5, 127.4], [34.8, 128.4], [35.1, 129.1], [35.5, 129.4], [36.5, 129.4], [37.5, 129.1], [38.6, 128.3], [39, 127.9]],
  // 九州
  [[33.9, 130.9], [33.6, 130.3], [33.2, 129.6], [32.6, 129.8], [31.4, 130.2], [31, 130.7], [31.4, 131.4], [32.4, 131.7], [33.3, 131.7], [33.9, 131]],
  // 四國
  [[34.3, 133], [34.4, 134.6], [33.9, 134.7], [33.2, 134.2], [33, 133], [32.8, 132.6], [33.4, 132.4], [34, 132.7]],
  // 本州
  [[34, 131], [34.4, 131.4], [35.2, 132.6], [35.5, 133.3], [35.6, 134.5], [35.7, 135.3], [35.5, 135.9], [35.8, 136], [36.3, 136.3], [37, 136.8], [37.5, 137.3], [37.2, 138], [37.6, 138.6], [37.9, 139], [35, 139], [34.6, 138], [34.6, 137], [34.3, 136.8], [33.5, 136], [33.4, 135.7], [34.2, 135.1], [34.7, 135.2], [34.7, 134], [34.4, 133.3], [34.3, 132.3]]
];
function arcPath(a, b) {
  const [x1, y1] = P(a.lat, a.lon).map(Number), [x2, y2] = P(b.lat, b.lon).map(Number);
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy);
  let nx = -dy / len, ny = dx / len; if (ny > 0) { nx = -nx; ny = -ny; }
  const k = 0.18 * len, cx = mx + nx * k, cy = my + ny * k;
  return `M${x1},${y1} Q${cx.toFixed(1)},${cy.toFixed(1)} ${x2},${y2}`;
}
let flightRAF = 0;
function openFlight(f) {
  const L = f.legs, codes = [...new Set(L.flatMap(l => [l.from, l.to]))];
  let grid = "";
  for (let lo = 118; lo <= 138; lo += 4) { const [x] = P(30, lo); grid += `<line x1="${x}" y1="0" x2="${x}" y2="${MH}"/>`; }
  for (let la = 22; la <= 38; la += 4) { const [, y] = P(la, 120); grid += `<line x1="0" y1="${y}" x2="${MW}" y2="${y}"/>`; }
  const svg = `<svg viewBox="0 0 ${MW} ${MH}" xmlns="http://www.w3.org/2000/svg">
    <defs><filter id="mg" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <radialGradient id="rad" cx="50%" cy="50%" r="60%"><stop offset="0" stop-color="#1a0f3a"/><stop offset="1" stop-color="#05040c"/></radialGradient></defs>
    <rect width="${MW}" height="${MH}" fill="url(#rad)"/>
    <g stroke="#2a2150" stroke-width=".6">${grid}</g>
    <g fill="rgba(5,217,232,.07)" stroke="#05d9e8" stroke-width="1" stroke-linejoin="round" opacity=".75">${LAND.map(p => `<polygon points="${poly(p)}"/>`).join("")}</g>
    <g fill="none" stroke="#ff2a6d" stroke-width="2" stroke-dasharray="5 5" filter="url(#mg)">${L.map((l, k) => `<path id="leg${k}" d="${arcPath(AP[l.from], AP[l.to])}"/>`).join("")}</g>
    <path id="trail" fill="none" stroke="#f9f871" stroke-width="2.5" filter="url(#mg)"/>
    ${codes.map(c => { const [x, y] = P(AP[c].lat, AP[c].lon); return `<g filter="url(#mg)"><circle cx="${x}" cy="${y}" r="5" fill="#07060f" stroke="#f9f871" stroke-width="2"/><text x="${x}" y="${+y + 18}" fill="#e9e6ff" font-size="12" font-weight="700" text-anchor="middle" font-family="Noto Sans TC,sans-serif">${AP[c].name}</text><text x="${x}" y="${+y - 10}" fill="#f9f871" font-size="9" text-anchor="middle" font-family="JetBrains Mono,monospace">${c}</text></g>`; }).join("")}
    <g id="plane" filter="url(#mg)"><path d="M10 0 L-6 -7 L-3 0 L-6 7 Z" fill="#fff" stroke="#05d9e8" stroke-width="1.2"/></g>
  </svg>`;
  const first = L[0], last = L[L.length - 1];
  let legsHtml = "";
  L.forEach((l, k) => {
    legsHtml += `<div class="leg">
      <div class="pt"><b>${localT(l.dep, l.from)}</b><span>${esc(apName(l.from, l.fromT))} 起飛</span></div>
      <div class="air">✈ ${esc(l.airline)} ${esc(l.no)}・飛行 ${durTxt(new Date(l.arr) - new Date(l.dep))}
        ${l.no ? `・<a href="https://www.flightradar24.com/data/flights/${l.no.toLowerCase()}" target="_blank" rel="noopener">即時追蹤 ↗</a>` : ""}</div>
      <div class="pt"><b>${localT(l.arr, l.to)}</b><span>${esc(apName(l.to, l.toT))} 降落</span></div></div>`;
    if (k < L.length - 1) legsHtml += `<div class="lay">⏳ 在${AP[l.to].name}轉機 ${durTxt(new Date(L[k + 1].dep) - new Date(l.arr))}${f.note ? "・" + esc(f.note.replace(/^.*?：/, "").replace(/（.*?）/g, "")) : ""}</div>`;
  });
  const tzs = [...new Set(codes.map(c => AP[c].tz))];
  $("#sheet").innerHTML = `
    <div class="hd"><div><h3>${esc(f.who)}</h3><p>${f.ret ? "1/21（四）" : esc(f.date)}・${L.map(l => esc(l.no || l.airline)).join(" → ")}</p></div><button class="xx" aria-label="關閉">✕</button></div>
    <div class="map">${svg}</div>
    <div class="fst" id="fst"></div><div class="fbar"><i id="fbar"></i></div>
    ${legsHtml}
    ${f.note && L.length === 1 ? `<div class="hint">▸ ${esc(f.note)}</div>` : ""}
    ${tzs.length > 1 ? `<div class="tzn">時間都是當地時間：台灣 UTC+8，韓國、日本 UTC+9（比台灣快 1 小時）</div>` : ""}`;
  $("#modal").classList.add("open");
  document.body.style.overflow = "hidden";
  animateFlight(f);
}
function closeFlight() {
  $("#modal").classList.remove("open"); document.body.style.overflow = ""; cancelAnimationFrame(flightRAF); clearTimeout(flightRAF);
}
function animateFlight(f) {
  const L = f.legs, paths = L.map((_, k) => $("#leg" + k)), lens = paths.map(p => p.getTotalLength());
  const plane = $("#plane"), trail = $("#trail"), st = $("#fst"), bar = $("#fbar");
  const t0 = +new Date(L[0].dep), t1 = +new Date(L[L.length - 1].arr);
  // 依時間算出飛機在哪一段、飛了多少
  const where = now => {
    for (let k = 0; k < L.length; k++) {
      const d = +new Date(L[k].dep), a = +new Date(L[k].arr);
      if (now < d) return { k, p: 0, ground: true };
      if (now <= a) return { k, p: (now - d) / (a - d) };
    }
    return { k: L.length - 1, p: 1 };
  };
  const place = (k, p) => {
    const path = paths[k], len = lens[k], pt = path.getPointAtLength(p * len), pt2 = path.getPointAtLength(Math.min(len, p * len + 1)), pt0 = path.getPointAtLength(Math.max(0, p * len - 1));
    const ang = Math.atan2(pt2.y - pt0.y, pt2.x - pt0.x) * 180 / Math.PI;
    plane.setAttribute("transform", `translate(${pt.x},${pt.y}) rotate(${ang})`);
    const prev = paths.slice(0, k).map(x => x.getAttribute("d")).join(" ");
    // 已飛過的部分畫成黃線
    const seg = []; for (let s = 0; s <= 30; s++) { const q = path.getPointAtLength(p * len * s / 30); seg.push(`${s ? "L" : "M"}${q.x.toFixed(1)},${q.y.toFixed(1)}`); }
    trail.setAttribute("d", prev + " " + seg.join(""));
  };
  const nowMs = Date.now();
  if (nowMs >= t0 && nowMs <= t1) {
    // 飛行中：顯示真實位置
    const tick = () => {
      const n = Date.now(), w = where(n);
      place(w.k, w.p);
      bar.style.width = ((n - t0) / (t1 - t0) * 100).toFixed(1) + "%";
      st.innerHTML = w.ground ? `<span class="dot warn"></span>在${AP[L[w.k].from].name}轉機中・下一班 ${localT(L[w.k].dep, L[w.k].from)} 起飛` : `<span class="dot ok"></span>飛行中・${L[w.k].no || L[w.k].airline}・剩 <b>${durTxt(+new Date(L[w.k].arr) - n)}</b>`;
      flightRAF = setTimeout(() => requestAnimationFrame(tick), 5000);
    };
    tick(); return;
  }
  const done = nowMs > t1;
  const days = Math.ceil((t0 - nowMs) / 864e5);
  st.innerHTML = done ? `<span class="dot ok"></span>已抵達 ✓` : `<span class="dot warn"></span>尚未起飛・倒數 <b>${days}</b> 天・下面是飛行過程模擬`;
  bar.style.width = done ? "100%" : "0";
  if (done) { place(L.length - 1, 1); return; }
  // 模擬：依各段飛行時間比例跑一輪（約 6 秒），轉機時停一下
  const durs = L.map(l => +new Date(l.arr) - +new Date(l.dep)), sum = durs.reduce((a, b) => a + b, 0);
  const total = 6000, pause = 700;
  const start = performance.now();
  const loop = now => {
    let t = (now - start) % (total + pause * (L.length - 1) + 1200);
    let acc = 0;
    for (let k = 0; k < L.length; k++) {
      const d = durs[k] / sum * total;
      if (t <= acc + d) { place(k, (t - acc) / d); break; }
      acc += d;
      if (k < L.length - 1) { if (t <= acc + pause) { place(k, 1); break; } acc += pause; }
      else place(k, 1);
    }
    flightRAF = requestAnimationFrame(loop);
  };
  flightRAF = requestAnimationFrame(loop);
}

/* =========================================================
   Days
   ========================================================= */
const ICONS = {
  plane: '<path d="M4 22l32-12-8 20-6-7-6 5 1-8z"/><path d="M22 23l14-13"/>',
  plane2: '<path d="M6 30h28"/><path d="M8 24l6-2 6-8 4 1-3 6 9-3c2-1 4 0 4 1s-1 2-3 3L12 28z"/>',
  torii: '<path d="M5 9q15-4 30 0"/><path d="M8 15h24"/><path d="M12 10v24M28 10v24"/><path d="M20 10v5"/>',
  torii2: '<path d="M7 8q13-4 26 0"/><path d="M10 13h20"/><path d="M13 9v17M27 9v17"/><path d="M4 30q4-3 8 0t8 0 8 0 8 0"/><path d="M4 35q4-3 8 0t8 0 8 0 8 0"/>',
  boat: '<path d="M5 24h30l-5 7H10z"/><path d="M20 24V8l10 12H20"/><path d="M3 35q4-3 8 0t8 0 8 0 8 0"/>',
  fox: '<path d="M8 6l6 10h12l6-10 2 16-14 12L6 22z"/><circle cx="15" cy="21" r="1.5"/><circle cx="25" cy="21" r="1.5"/><path d="M18 27h4"/>',
  deer: '<path d="M14 14q-6-4-4-10M14 10l-4 0M26 14q6-4 4-10M26 10h4"/><path d="M13 16q7-4 14 0l-2 14q-5 4-10 0z"/><circle cx="17" cy="21" r="1.2"/><circle cx="23" cy="21" r="1.2"/>',
  ninja: '<path d="M20 4l4 12 12 4-12 4-4 12-4-12-12-4 12-4z"/><circle cx="20" cy="20" r="3"/>',
  fall: '<path d="M6 8h28"/><path d="M12 8v18M18 8v22M24 8v20M30 8v16"/><path d="M4 33q5-4 10 0t10 0 10 0"/>'
};
const MODE_C = { "地鐵": "var(--cyan)", "JR": "var(--green)", "京阪": "var(--purple)", "阪急": "var(--purple)", "阪神": "var(--purple)", "近鐵": "var(--purple)", "叡電": "var(--purple)", "南海": "var(--purple)", "纜車": "var(--yellow)", "公車": "var(--yellow)", "步行": "var(--dim)", "計程車": "var(--orange)", "飛機": "var(--pink)", "船": "var(--cyan)" };
const HUE = { cyan: "var(--cyan)", pink: "var(--pink)", purple: "var(--purple)", yellow: "var(--yellow)" };
const KATANA = `<img class="kat" src="images/katana.png" alt="">`;
const FX = `<div class="fx" id="fx"><div class="flash"></div>${KATANA}
  <svg class="cut" viewBox="0 0 100 100" preserveAspectRatio="none"><defs><linearGradient id="cg" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".5" stop-color="#05d9e8"/><stop offset="1" stop-color="#ff2a6d"/></linearGradient></defs>
  <line x1="102" y1="12" x2="-2" y2="90" stroke="url(#cg)" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>
  <div class="zan">ザシュッ！</div></div>`;
let curDay = 0;
new Image().src = "images/katana.png";
const GIDS = T.groups.map(g => g.id);
let group = store.get("group", "kyoto");
if (group !== "all" && !GIDS.includes(group)) group = "kyoto";
const itemGroups = (it, d) => it.g || d.g || GIDS;
const visibleItems = d => group === "all" ? d.items : d.items.filter(it => itemGroups(it, d).includes(group));
function renderGroupSel() {
  $("#gsel").innerHTML = `<div class="lb">👀 看誰的行程</div><div class="opts">${T.groups.map(g =>
    `<button data-g="${g.id}" class="${group === g.id ? "on" : ""}">${esc(g.name)}<small>${esc(g.desc)}</small></button>`).join("")}
    <button data-g="all" class="${group === "all" ? "on" : ""}">全部<small>所有組一起看</small></button></div>`;
  const arrive = group === "all" ? 0 : T.groups.find(g => g.id === group).arrive;
  $$(".dt").forEach((b, j) => b.classList.toggle("off", j < arrive));
}
function initDays() {
  const railIn = $("#railIn");
  railIn.innerHTML = T.days.map((d, i) =>
    `<button class="dt" data-i="${i}"><span class="d">${esc(d.date)}</span><span class="w">週${esc(d.dow)}</span></button>`).join("");
  railIn.addEventListener("click", e => { const b = e.target.closest(".dt"); if (b) selectDay(+b.dataset.i, true); });
  $("#dayView").addEventListener("click", e => { const b = e.target.closest("[data-jump]"); if (b) selectDay(+b.dataset.jump, true); });
  $("#gsel").addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    group = b.dataset.g; store.set("group", group); renderGroupSel();
    // 切到該組第一天（如果目前這天他們還沒到）
    const arrive = group === "all" ? 0 : T.groups.find(g => g.id === group).arrive;
    if (curDay < arrive) selectDay(arrive, false); else renderDay(T.days[curDay], 0);
  });
  // 旅行中預設選今天
  const now = new Date(), y = 2027;
  const idx = T.days.findIndex(d => { const [m, dd] = d.date.split("/").map(Number); const x = new Date(y, m - 1, dd); return x.toDateString() === now.toDateString(); });
  renderGroupSel();
  const arrive = group === "all" ? 0 : T.groups.find(g => g.id === group).arrive;
  selectDay(idx >= 0 ? idx : arrive, false);
}
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
let slashing = false;
function selectDay(i, anim) {
  if (anim && (i === curDay || slashing)) return;
  curDay = i;
  $$(".dt").forEach((b, j) => b.classList.toggle("on", j === i));
  const rail = $("#rail"), target = 4 + i * 64 + 32 - rail.clientWidth / 2;
  rail.scrollTo({ left: Math.max(0, target), behavior: anim ? "smooth" : "auto" });
  const view = $("#dayView"), old = $(".dcard", view);
  if (!anim || reduce || !old) { renderDay(T.days[i], 0); return; }
  // 斬擊：舊卡片被切成兩半飛開，新卡片出現
  slashing = true;
  const top = old.offsetTop, h = old.offsetHeight;
  const halves = ["a", "b"].map(k => { const c = old.cloneNode(true); c.classList.add("half", k); c.style.top = top + "px"; c.style.left = "0"; c.style.right = "0"; return c; });
  renderDay(T.days[i], 320);
  view.append(...halves);
  view.insertAdjacentHTML("beforeend", FX);
  const fx = $("#fx"); fx.style.top = top + "px"; fx.style.height = h + "px";
  requestAnimationFrame(() => fx.classList.add("go"));
  view.classList.add("shake");
  if (navigator.vibrate) setTimeout(() => navigator.vibrate(30), 300);
  setTimeout(() => { halves.forEach(x => x.remove()); fx.remove(); view.classList.remove("shake"); slashing = false; }, 1000);
}
function renderDay(d, delay = 0) {
  const c = HUE[d.hue] || "var(--cyan)";
  const grp = group === "all" ? null : T.groups.find(g => g.id === group);
  const away = grp && T.days.indexOf(d) < grp.arrive;
  const rank = t => /^\d/.test(t) ? +t.replace(":", "") : ({ "上午": 900, "下午": 1400, "晚上": 2000 }[t] ?? -1);
  const alt = (group !== "all" && d.alt && d.alt[group]) || {};
  const di = T.days.indexOf(d);
  const sorted = visibleItems(d).map((it, k) => [it, k]).sort((x, y) => (rank(x[0].t) - rank(y[0].t)) || (x[1] - y[1])).map(x => x[0]);
  const items = sorted.map((it, k) => {
    const tbd = it.tbd ? '<span class="tbdl">待定</span>' : "";
    const gl = group === "all" && (it.g || d.g) && itemGroups(it, d).length < GIDS.length ? itemGroups(it, d).map(id => `<span class="gl">${esc(T.groups.find(g => g.id === id).name)}</span>`).join("") : "";
    const pp = (it.people ? `<span class="pp">${esc(it.people)}</span>` : "") + gl;
    const close = it.close ? `<div class="close">${esc(it.close)}</div>` : "";
    const note = it.note ? `<div class="sub">${esc(it.note)}</div>` : "";
    let body;
    if (it.type === "move") {
      body = `<div class="mv">${it.mode ? `<span class="tag" style="--tc:${MODE_C[it.mode] || "var(--cyan)"}">${esc(it.mode)}</span>` : ""}${tbd}${esc(it.text)}${pp}</div>${note}${close}`;
    } else if (it.type === "note") {
      body = `<div class="mv notep">${tbd}${esc(it.text)}${pp}</div>${note}${close}`;
    } else {
      const inner = `${it.map ? '<span class="m">MAP ↗</span>' : ""}<div class="n">${tbd}${esc(it.text)}${pp}</div>${note}${close}`;
      body = it.map ? `<a class="spot" href="${mapUrl(it.map)}" target="_blank" rel="noopener">${inner}</a>` : `<div class="spot">${inner}</div>`;
    }
    return `<div class="it t-${it.type}${it.tbd ? " tbd" : ""}" style="animation-delay:${delay + 120 + k * 40}ms"><span class="tm">${esc(it.t)}</span>${body}</div>`;
  }).join("");
  $("#dayView").innerHTML = `
    <div class="card glow dcard" style="--c:${c};animation-delay:${delay}ms;animation-fill-mode:backwards">
      <div class="art"><svg viewBox="0 0 40 40" width="44" height="44" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[d.icon] || ICONS.torii}</svg></div>
      <div><div class="k">DAY ${di + 1} · ${esc(d.date)} 週${esc(d.dow)}</div><h3>${esc(away ? "還在台灣" : alt.title || d.title)}</h3>
      <div class="s">${away ? `${esc(T.days[grp.arrive].date)} 才出發` : `住 ${esc(alt.stay || d.stay)}<span class="pp">${esc(alt.people || d.people)}</span>`}</div></div>
    </div>
    ${away ? `<div class="card away"><b>🇹🇼</b>${esc(grp.name)} ${esc(T.days[grp.arrive].date)} 才出發，這天還沒到日本<div class="mt"><button class="btn sm yel" data-jump="${grp.arrive}">看 ${esc(T.days[grp.arrive].date)} ▸</button></div></div>` : `<div class="tl">${items}</div>`}`;
}

/* =========================================================
   Prep
   ========================================================= */
function initPrep() {
  const checks = store.get("checks", {});
  const box = (el, title, list) => {
    const done = list.filter(x => checks[x.id]).length;
    el.innerHTML = `<h4>${title}<span class="prog">${done}/${list.length}</span></h4>` + list.map(x =>
      `<label><input type="checkbox" data-id="${esc(x.id)}" ${checks[x.id] ? "checked" : ""}><span>${esc(x.text)}</span></label>`).join("");
  };
  const render = () => { box($("#todoBox"), "待辦清單", T.todo); box($("#shopBox"), "待買清單", T.shopping); };
  render();
  $("#prep").addEventListener("change", e => {
    if (e.target.dataset.id) { checks[e.target.dataset.id] = e.target.checked; store.set("checks", checks); render(); }
  });
  $("#stayList").innerHTML = T.stays.map(s => `
    <div class="card glow stay" style="--c:var(--purple)">
      <span class="dd">${esc(s.date)}</span><h4>${esc(s.name)}</h4>
      <p>📍 ${esc(s.addr)}</p><p>🚉 ${esc(s.station)}</p><p>🕒 ${esc(s.time)}</p>${s.extra ? `<p>⚠ ${esc(s.extra)}</p>` : ""}
      <div class="mt"><a class="btn sm" href="${mapUrl(s.map)}" target="_blank" rel="noopener">開啟地圖 ↗</a></div>
    </div>`).join("");
}

/* =========================================================
   Money
   ========================================================= */
const CATS = [["餐飲", "🍜"], ["交通", "🚃"], ["門票", "🎫"], ["購物", "🛍"], ["住宿", "🏨"], ["其他", "✦"]];
const catIcon = c => (CATS.find(x => x[0] === c) || CATS[5])[1];
const M = {
  me: store.get("me", ""),
  key: store.get("key", ""),
  rate: store.get("rate", 0.21),          // 1 JPY = ? TWD
  budget: store.get("budget", 0),         // TWD
  personal: store.get("personal", []),
  cache: store.get("cache", { members: [], records: [] }),
  pending: store.get("pending", []),
  tab: "add",
  form: { kind: "p", cur: "JPY", cat: "餐飲", split: [], mode: "eq" },
  online: null
};
const remote = !!T.SHEET_URL;

// ---- 後端：Google 試算表；沒設定網址時用本機測試模式 ----
const api = remote ? {
  async list() {
    const r = await fetch(`${T.SHEET_URL}?action=list&key=${encodeURIComponent(M.key)}`);
    return r.json();
  },
  async post(body) {
    const r = await fetch(T.SHEET_URL, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify({ ...body, key: M.key }) });
    return r.json();
  }
} : {
  db() { return store.get("demo", { members: [], records: [] }); },
  save(d) { store.set("demo", d); },
  async list() { return { ok: true, ...this.db() }; },
  async post(b) {
    const d = this.db();
    if (b.action === "join") { const ex = d.members.includes(b.name); if (!ex) d.members.push(b.name); this.save(d); return { ok: true, exists: ex }; }
    if (b.action === "add") { if (!d.records.some(r => r.id === b.rec.id)) d.records.push(b.rec); this.save(d); return { ok: true }; }
    if (b.action === "delete") { d.records = d.records.filter(r => !(r.id === b.id && r.createdBy === b.by)); this.save(d); return { ok: true }; }
    if (b.action === "rename") {
      if (d.members.includes(b.to)) return { ok: false, error: "這個名字已經有人用了" };
      d.members = d.members.map(m => m === b.from ? b.to : m);
      d.records.forEach(r => { if (r.payer === b.from) r.payer = b.to; if (r.createdBy === b.from) r.createdBy = b.to; if (b.from in r.split) { r.split[b.to] = r.split[b.from]; delete r.split[b.from]; } });
      this.save(d); return { ok: true };
    }
    return { ok: false, error: "unknown" };
  }
};

const fmtJ = n => "¥" + Math.round(n).toLocaleString();
const fmtT = n => "NT$" + Math.round(n).toLocaleString();
const toJ = (a, c) => c === "JPY" ? a : a / M.rate;
const toT = (a, c) => c === "TWD" ? a : a * M.rate;
const fmtOrig = (a, c) => c === "JPY" ? fmtJ(a) : "NT$" + (+a).toLocaleString(undefined, { maximumFractionDigits: 2 });
const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
const shortDate = s => { const [, m, d] = s.split("-"); return `${+m}/${+d}`; };

function splitEqual(amount, names, cur) {
  const unit = cur === "JPY" ? 1 : 0.01, total = Math.round(amount / unit), n = names.length;
  const base = Math.floor(total / n), rem = total - base * n, out = {};
  names.forEach((nm, i) => out[nm] = +((base + (i < rem ? 1 : 0)) * unit).toFixed(2));
  return out;
}

// 目前看得到的分帳資料（伺服器快取＋還沒上傳的）
function sharedView() {
  const del = new Set(M.pending.filter(p => p.action === "delete").map(p => p.id));
  const recs = M.cache.records.filter(r => !del.has(r.id)).map(r => ({ ...r }));
  M.pending.filter(p => p.action === "add").forEach(p => { if (!recs.some(r => r.id === p.rec.id)) recs.push({ ...p.rec, _pending: true }); });
  const members = [...M.cache.members];
  if (M.me && !members.includes(M.me)) members.push(M.me);
  return { members, records: recs };
}

async function sync(quiet) {
  if (remote && !M.key) return;
  try {
    // 先上傳離線時記的
    while (M.pending.length) {
      const p = M.pending[0];
      const r = await api.post(p);
      if (!r.ok && r.error === "密碼錯誤") throw new Error("密碼錯誤");
      M.pending.shift(); store.set("pending", M.pending);
    }
    const data = await api.list();
    if (!data.ok) throw new Error(data.error || "讀取失敗");
    M.cache = { members: data.members || [], records: data.records || [] };
    store.set("cache", M.cache);
    M.online = true;
    if (!quiet) toast("已同步");
  } catch (e) {
    M.online = false;
    if (e.message === "密碼錯誤") { M.key = ""; store.set("key", ""); toast("團體密碼錯誤，請重新輸入"); }
    else if (!quiet) toast("離線中，連上網路後會自動上傳");
  }
  renderMoney();
}

function renderWho() {
  const w = $("#who");
  if (!M.me) { w.innerHTML = `<span>還沒加入群組：個人帳可以直接用，分帳要先加入</span>`; return; }
  w.innerHTML = `<span>我是 <b>${esc(M.me)}</b></span><button class="btn sm dim" id="rename">改名</button>${!remote ? '<span class="pend">單機測試模式</span>' : ""}`;
}

function joinForm(msg) {
  return `<div class="card glow" style="--c:var(--yellow)">
    <div style="font-weight:700;margin-bottom:8px">加入分帳群組</div>
    <div class="hint" style="margin:0 0 10px">${esc(msg || "輸入你的暱稱，之後其他人分帳時就選得到你。")}</div>
    <div class="fld"><span>暱稱（最多 12 字）</span><input class="in" id="jName" maxlength="12" value="${esc(M.me)}"></div>
    ${remote ? `<div class="fld"><span>團體密碼</span><input class="in" id="jKey" type="password" value="${esc(M.key)}"></div>` : `<div class="hint">共用帳本還沒設定，現在是單機測試模式，資料只存在這支手機。</div>`}
    <button class="btn full yel mt" id="jGo">加入</button>
  </div>`;
}

function renderMoney() {
  renderWho();
  $$("#mtabs button").forEach(b => b.classList.toggle("on", b.dataset.m === M.tab));
  const v = $("#mView");
  if (M.tab === "add") v.innerHTML = viewAdd();
  else if (M.tab === "mine") v.innerHTML = viewMine();
  else v.innerHTML = viewGroup();
}

function viewAdd() {
  const f = M.form, sv = sharedView();
  const needJoin = f.kind === "s" && (!M.me || (remote && !M.key));
  let shared = "";
  if (f.kind === "s") {
    if (needJoin) shared = joinForm("要分帳，先加入群組。");
    else {
      if (!f.splitTouched) f.split = [...sv.members];
      if (!f.payer || !sv.members.includes(f.payer)) f.payer = M.me;
      const amt = parseFloat($("#fAmt")?.value) || 0;
      const eq = f.split.length ? splitEqual(amt, f.split, f.cur) : {};
      shared = `
      <div class="fld"><span>誰付的</span><select class="in" id="fPayer">${sv.members.map(m => `<option ${m === f.payer ? "selected" : ""}>${esc(m)}</option>`).join("")}</select></div>
      <div class="fld"><span>分給誰（${f.split.length} 人）</span>
        <div class="chips">${sv.members.map(m => `<button class="chip ${f.split.includes(m) ? "on" : ""}" data-sp="${esc(m)}">${esc(m)}</button>`).join("")}</div>
        <div class="row2 mt"><button class="btn sm" data-q="all">全選</button><button class="btn sm dim" data-q="none">清除</button></div>
      </div>
      <div class="fld"><span>分法</span><div class="chips"><button class="chip ${f.mode === "eq" ? "on" : ""}" data-md="eq">均分</button><button class="chip ${f.mode === "cu" ? "on" : ""}" data-md="cu">自訂金額</button></div>
        ${f.mode === "eq" ? (f.split.length && amt ? `<div class="hint">每人約 ${fmtOrig(Object.values(eq)[0], f.cur)}</div>` : "") :
          `<div class="custom">${f.split.map(m => `<span>${esc(m)}</span><input class="in cu" type="number" inputmode="decimal" data-cu="${esc(m)}" value="${f.custom?.[m] ?? ""}" placeholder="0">`).join("")}</div><div class="hint" id="cuSum"></div>`}
      </div>
      ${sv.members.length < 2 ? `<div class="hint">目前群組只有你一個人，等其他人加入後就能選他們。</div>` : ""}`;
    }
  }
  return `<div class="card">
    <div class="tog"><button data-k="p" class="${f.kind === "p" ? "on" : ""}">個人</button><button data-k="s" class="${f.kind === "s" ? "on" : ""}">分帳</button></div>
    <div class="fld"><span>金額</span><div class="amt"><input class="in" id="fAmt" type="number" inputmode="decimal" placeholder="0" value="${f.amt ?? ""}">
      <select class="in" id="fCur"><option value="JPY" ${f.cur === "JPY" ? "selected" : ""}>日圓</option><option value="TWD" ${f.cur === "TWD" ? "selected" : ""}>台幣</option></select></div></div>
    <div class="fld"><span>分類</span><div class="chips">${CATS.map(([c, i]) => `<button class="chip ${f.cat === c ? "on" : ""}" data-cat="${c}">${i} ${c}</button>`).join("")}</div></div>
    <div class="fld"><span>日期</span><input class="in" id="fDate" type="date" value="${f.date || today()}"></div>
    <div class="fld"><span>備註</span><input class="in" id="fNote" maxlength="40" placeholder="例如：一蘭拉麵" value="${esc(f.note || "")}"></div>
    ${shared}
    ${needJoin ? "" : `<button class="btn full pink mt" id="fSave">記下來</button>`}
  </div>`;
}

function mineList() {
  const sv = sharedView(), list = [];
  M.personal.forEach(r => list.push({ ...r, kind: "p", mine: r.amount }));
  if (M.me) sv.records.forEach(r => { if (r.split && M.me in r.split) list.push({ ...r, kind: "s", mine: r.split[M.me] }); });
  return list.sort((a, b) => (b.date || "").localeCompare(a.date || "") || (b.createdAt || 0) - (a.createdAt || 0));
}

function viewMine() {
  const list = mineList();
  const totJ = list.reduce((s, r) => s + toJ(r.mine, r.currency), 0);
  const totT = totJ * M.rate;
  const pct = M.budget ? Math.min(100, totT / M.budget * 100) : 0;
  const byCat = {}; list.forEach(r => byCat[r.category] = (byCat[r.category] || 0) + toJ(r.mine, r.currency));
  const maxCat = Math.max(1, ...Object.values(byCat));
  const groups = {}; list.forEach(r => (groups[r.date] = groups[r.date] || []).push(r));
  return `
  <div class="card glow">
    <div class="hint" style="margin:0">我的總花費（含分帳份額）</div>
    <div class="big">${fmtJ(totJ)}<small>≈ ${fmtT(totT)}</small></div>
    ${M.budget ? `<div class="bar"><i style="width:${pct}%"></i></div>
      <div class="hint">預算 ${fmtT(M.budget)}・${totT > M.budget ? `<span class="neg">超支 ${fmtT(totT - M.budget)}</span>` : `剩 ${fmtT(M.budget - totT)}`}</div>` : `<div class="hint">在下方設定預算，就會顯示進度條。</div>`}
  </div>
  ${list.length ? `<div class="card"><div style="font-weight:700;margin-bottom:6px">分類統計</div>
    ${CATS.filter(([c]) => byCat[c]).map(([c, i]) => `<div class="cat"><span>${i} ${c}</span><div class="bar"><i style="width:${byCat[c] / maxCat * 100}%"></i></div><span class="v">${fmtJ(byCat[c])}</span></div>`).join("")}</div>` : ""}
  <div class="card">
    ${list.length ? Object.keys(groups).map(d => {
      const sub = groups[d].reduce((s, r) => s + toJ(r.mine, r.currency), 0);
      return `<div class="dayh"><span>${d ? shortDate(d) : "—"}</span><span>${fmtJ(sub)}</span></div>` + groups[d].map(r => `
        <div class="rec"><div class="ci">${catIcon(r.category)}</div>
          <div class="rt">${r.kind === "s" ? "🔗 " : ""}${esc(r.note || r.category)}${r._pending ? '<span class="pend">待上傳</span>' : ""}
            <small>${r.kind === "s" ? `分帳・${esc(r.payer)} 付 ${fmtOrig(r.amount, r.currency)}` : "個人"}</small></div>
          <div class="ra">${fmtOrig(r.mine, r.currency)}<small>${r.currency === "JPY" ? "≈ " + fmtT(toT(r.mine, "JPY")) : "≈ " + fmtJ(toJ(r.mine, "TWD"))}</small></div>
          ${r.kind === "p" ? `<button class="x" data-delp="${r.id}" aria-label="刪除">✕</button>` : ""}
        </div>`).join("");
    }).join("") : `<div class="empty">還沒有任何紀錄，去「記一筆」新增吧</div>`}
  </div>
  <div class="card">
    <div style="font-weight:700;margin-bottom:10px">設定</div>
    <div class="fld"><span>匯率：1 日圓 = ? 台幣</span><input class="in" id="sRate" type="number" step="0.001" inputmode="decimal" value="${M.rate}"></div>
    <div class="fld"><span>我的預算（台幣）</span><input class="in" id="sBudget" type="number" inputmode="numeric" value="${M.budget || ""}" placeholder="例如 30000"></div>
    <div class="row2"><button class="btn sm" id="sSave">儲存設定</button><button class="btn sm yel" id="exJson">備份（JSON）</button><button class="btn sm yel" id="exCsv">匯出 CSV</button><button class="btn sm dim" id="imJson">匯入備份</button></div>
    <input type="file" id="imFile" accept="application/json" hidden>
    <div class="hint">個人帳只存在這支手機。換手機或清除瀏覽器資料前，記得先按「備份」。</div>
  </div>`;
}

function balances(sv) {
  const b = {}; sv.members.forEach(m => b[m] = { paid: 0, owe: 0 });
  sv.records.forEach(r => {
    const p = b[r.payer] || (b[r.payer] = { paid: 0, owe: 0 });
    p.paid += toJ(r.amount, r.currency);
    Object.entries(r.split || {}).forEach(([n, a]) => (b[n] || (b[n] = { paid: 0, owe: 0 })).owe += toJ(a, r.currency));
  });
  return b;
}
function settle(b) {
  const cr = [], db = [];
  Object.entries(b).forEach(([n, x]) => { const net = Math.round(x.paid - x.owe); if (net > 0) cr.push([n, net]); else if (net < 0) db.push([n, -net]); });
  cr.sort((a, c) => c[1] - a[1]); db.sort((a, c) => c[1] - a[1]);
  const out = []; let i = 0, j = 0;
  while (i < db.length && j < cr.length) {
    const amt = Math.min(db[i][1], cr[j][1]);
    if (amt > 0) out.push([db[i][0], cr[j][0], amt]);
    db[i][1] -= amt; cr[j][1] -= amt;
    if (db[i][1] <= 0) i++; if (cr[j][1] <= 0) j++;
  }
  return out;
}

function viewGroup() {
  if (!M.me || (remote && !M.key)) return joinForm();
  const sv = sharedView(), b = balances(sv), st = settle(b);
  const pend = M.pending.length;
  const status = !remote ? `<span class="dot warn"></span>單機測試模式（共用帳本還沒設定）`
    : M.online === false ? `<span class="dot warn"></span>離線中${pend ? `，${pend} 筆待上傳` : ""}`
    : `<span class="dot ok"></span>已連線${pend ? `，${pend} 筆待上傳` : ""}`;
  const recs = [...sv.records].sort((a, c) => (c.date || "").localeCompare(a.date || "") || (c.createdAt || 0) - (a.createdAt || 0));
  return `
  <div class="status">${status}<button class="btn sm" id="gSync" style="margin-left:auto">重新整理</button></div>
  <div class="card"><div style="font-weight:700;margin-bottom:6px">成員（${sv.members.length}）</div>
    <div class="chips">${sv.members.map(m => `<span class="chip ${m === M.me ? "on" : ""}">${esc(m)}</span>`).join("")}</div></div>
  <div class="card glow" style="--c:var(--green)">
    <div style="font-weight:700;margin-bottom:6px">結算建議</div>
    ${st.length ? st.map(([f, t, a]) => `<div class="settle"><span>${esc(f)}</span><span>→</span><span>${esc(t)}</span><b style="margin-left:auto">${fmtJ(a)}</b><small class="hint" style="margin:0">≈ ${fmtT(a * M.rate)}</small></div>`).join("") : `<div class="empty">目前大家都不欠錢 👍</div>`}
    <div class="hint">用最少的轉帳次數算出來的。台幣金額照你設定的匯率換算。</div>
  </div>
  <div class="card">
    <div class="bal h"><span>成員</span><span>先墊</span><span>應分攤</span><span>差額</span></div>
    ${Object.entries(b).map(([n, x]) => { const net = x.paid - x.owe; return `<div class="bal"><span>${esc(n)}</span><span>${fmtJ(x.paid)}</span><span>${fmtJ(x.owe)}</span><span class="${net > 0.5 ? "pos" : net < -0.5 ? "neg" : ""}">${net > 0 ? "+" : ""}${fmtJ(net)}</span></div>`; }).join("")}
    <div class="hint">差額＋代表別人要還你，−代表你要還別人。</div>
  </div>
  <div class="card"><div style="font-weight:700;margin-bottom:4px">所有分帳紀錄</div>
    ${recs.length ? recs.map(r => `<div class="rec"><div class="ci">${catIcon(r.category)}</div>
      <div class="rt">${esc(r.note || r.category)}${r._pending ? '<span class="pend">待上傳</span>' : ""}
        <small>${r.date ? shortDate(r.date) : ""}・${esc(r.payer)} 付・分 ${Object.keys(r.split || {}).length} 人・${esc(r.createdBy)} 記</small></div>
      <div class="ra">${fmtOrig(r.amount, r.currency)}</div>
      ${r.createdBy === M.me ? `<button class="x" data-dels="${r.id}" aria-label="刪除">✕</button>` : ""}</div>`).join("") : `<div class="empty">還沒有分帳紀錄</div>`}
  </div>`;
}

function readForm() {
  const f = M.form;
  if ($("#fAmt")) f.amt = $("#fAmt").value;
  if ($("#fCur")) f.cur = $("#fCur").value;
  if ($("#fDate")) f.date = $("#fDate").value;
  if ($("#fNote")) f.note = $("#fNote").value;
  if ($("#fPayer")) f.payer = $("#fPayer").value;
  $$(".cu").forEach(i => { f.custom = f.custom || {}; f.custom[i.dataset.cu] = i.value; });
}

async function saveRecord() {
  readForm();
  const f = M.form, amount = parseFloat(f.amt);
  if (!(amount > 0)) return toast("請輸入金額");
  const base = { id: uid(), date: f.date || today(), amount, currency: f.cur, category: f.cat, note: (f.note || "").trim(), createdAt: Date.now() };
  if (f.kind === "p") {
    M.personal.push(base); store.set("personal", M.personal);
    toast("已記到個人帳");
  } else {
    if (!f.split.length) return toast("至少要分給一個人");
    let split;
    if (f.mode === "eq") split = splitEqual(amount, f.split, f.cur);
    else {
      split = {}; let sum = 0;
      f.split.forEach(m => { const v = parseFloat(f.custom?.[m]) || 0; split[m] = v; sum += v; });
      if (Math.abs(sum - amount) > (f.cur === "JPY" ? 0.5 : 0.01)) return toast(`自訂金額加總 ${fmtOrig(sum, f.cur)}，跟總額不一樣`);
    }
    const rec = { ...base, payer: f.payer || M.me, split, createdBy: M.me };
    M.pending.push({ action: "add", rec }); store.set("pending", M.pending);
    toast("已記到分帳");
    sync(true);
  }
  M.form = { kind: f.kind, cur: f.cur, cat: f.cat, split: f.split, splitTouched: f.splitTouched, mode: "eq", payer: f.payer, date: f.date };
  renderMoney();
}

async function doJoin() {
  const name = ($("#jName").value || "").trim();
  if (!name) return toast("請輸入暱稱");
  if (remote) { M.key = ($("#jKey").value || "").trim(); if (!M.key) return toast("請輸入團體密碼"); store.set("key", M.key); }
  try {
    const r = await api.post({ action: "join", name });
    if (!r.ok) { if (r.error === "密碼錯誤") { M.key = ""; store.set("key", ""); } return toast(r.error || "加入失敗"); }
    if (r.exists && name !== M.me && !confirm(`「${name}」已經在群組裡，是你本人嗎？`)) return;
    M.me = name; store.set("me", name); M.form.splitTouched = false;
    toast(`歡迎，${name}`);
    await sync(true);
  } catch { toast("連不上網路，請稍後再試"); }
}

async function doRename() {
  const to = (prompt("新的暱稱（最多 12 字）", M.me) || "").trim().slice(0, 12);
  if (!to || to === M.me) return;
  try {
    const r = await api.post({ action: "rename", from: M.me, to });
    if (!r.ok) return toast(r.error || "改名失敗");
    M.me = to; store.set("me", to); M.form.splitTouched = false; toast("已改名"); sync(true);
  } catch { toast("改名需要網路"); }
}

function download(name, text, type) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([text], { type })); a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

function initMoney() {
  $("#mtabs").addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; readForm(); M.tab = b.dataset.m; renderMoney(); });
  $("#who").addEventListener("click", e => { if (e.target.id === "rename") doRename(); });
  const v = $("#mView");
  v.addEventListener("click", e => {
    const t = e.target.closest("button"); if (!t) return;
    const f = M.form;
    if (t.dataset.k) { readForm(); f.kind = t.dataset.k; renderMoney(); }
    else if (t.dataset.cat) { readForm(); f.cat = t.dataset.cat; renderMoney(); }
    else if (t.dataset.sp) { readForm(); const n = t.dataset.sp; f.split = f.split.includes(n) ? f.split.filter(x => x !== n) : [...f.split, n]; f.splitTouched = true; renderMoney(); }
    else if (t.dataset.q) { readForm(); f.split = t.dataset.q === "all" ? [...sharedView().members] : []; f.splitTouched = t.dataset.q !== "all"; renderMoney(); }
    else if (t.dataset.md) { readForm(); f.mode = t.dataset.md; renderMoney(); }
    else if (t.id === "fSave") saveRecord();
    else if (t.id === "jGo") doJoin();
    else if (t.id === "gSync") sync(false);
    else if (t.dataset.delp) { if (confirm("刪除這筆個人紀錄？")) { M.personal = M.personal.filter(r => r.id !== t.dataset.delp); store.set("personal", M.personal); renderMoney(); } }
    else if (t.dataset.dels) { if (confirm("刪除這筆分帳？所有人都會看不到。")) { const id = t.dataset.dels; if (M.pending.some(p => p.action === "add" && p.rec.id === id)) M.pending = M.pending.filter(p => !(p.action === "add" && p.rec.id === id)); else M.pending.push({ action: "delete", id, by: M.me }); store.set("pending", M.pending); renderMoney(); sync(true); } }
    else if (t.id === "sSave") {
      const r = parseFloat($("#sRate").value), bgt = parseFloat($("#sBudget").value) || 0;
      if (r > 0) { M.rate = r; store.set("rate", r); }
      M.budget = bgt; store.set("budget", bgt); toast("設定已儲存"); renderMoney();
    }
    else if (t.id === "exJson") download(`japan-trip-ledger-${today()}.json`, JSON.stringify({ app: "kansai2027", personal: M.personal, rate: M.rate, budget: M.budget, me: M.me }, null, 2), "application/json");
    else if (t.id === "exCsv") {
      const rows = [["日期", "類型", "分類", "備註", "我的金額", "幣別", "約台幣"]];
      mineList().forEach(r => rows.push([r.date, r.kind === "s" ? "分帳" : "個人", r.category, r.note || "", r.mine, r.currency, Math.round(toT(r.mine, r.currency))]));
      download(`japan-trip-ledger-${today()}.csv`, "﻿" + rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n"), "text/csv");
    }
    else if (t.id === "imJson") $("#imFile").click();
  });
  v.addEventListener("change", async e => {
    if (e.target.id === "imFile" && e.target.files[0]) {
      try {
        const d = JSON.parse(await e.target.files[0].text());
        const ids = new Set(M.personal.map(r => r.id)); let n = 0;
        (d.personal || []).forEach(r => { if (!ids.has(r.id)) { M.personal.push(r); n++; } });
        store.set("personal", M.personal); toast(`匯入 ${n} 筆`); renderMoney();
      } catch { toast("檔案格式不對"); }
    }
    if (e.target.id === "fCur" || e.target.id === "fPayer") { readForm(); renderMoney(); }
  });
  v.addEventListener("input", e => {
    if (e.target.id === "fAmt" && M.form.kind === "s" && M.form.mode === "eq") {
      const f = M.form, amt = parseFloat(e.target.value) || 0;
      const names = f.split;
      const chipsHint = $$(".fld", v).find(x => x.textContent.startsWith("分法"));
      if (chipsHint) { let hh = chipsHint.querySelector(".hint"); if (!hh) { hh = document.createElement("div"); hh.className = "hint"; chipsHint.appendChild(hh); } hh.textContent = names.length && amt ? `每人約 ${fmtOrig(Object.values(splitEqual(amt, names, f.cur))[0], f.cur)}` : ""; }
    }
    if (e.target.classList.contains("cu")) {
      const f = M.form; let sum = 0; $$(".cu", v).forEach(i => sum += parseFloat(i.value) || 0);
      const amt = parseFloat($("#fAmt").value) || 0, el = $("#cuSum");
      if (el) el.textContent = `加總 ${fmtOrig(sum, f.cur)} ／ 總額 ${fmtOrig(amt, f.cur)}${Math.abs(sum - amt) > (f.cur === "JPY" ? .5 : .01) ? "（還差 " + fmtOrig(amt - sum, f.cur) + "）" : " ✓"}`;
    }
  });
  addEventListener("online", () => sync(true));
  renderMoney();
  if (M.me) sync(true);
}

/* =========================================================
   Cover & tabs
   ========================================================= */
const TAB_SVG = {
  flights: '<path d="M3 13l18-7-4 13-4-4-4 3 1-5z"/><path d="M13 15l8-9"/>',
  days: '<path d="M3 6q9-3 18 0"/><path d="M5 10h14"/><path d="M7 7v14M17 7v14"/><path d="M12 7v3"/>',
  prep: '<rect x="5" y="7" width="14" height="14" rx="3"/><path d="M9 7V5a3 3 0 016 0v2"/><path d="M9 13l2 2 4-4"/>',
  money: '<circle cx="12" cy="12" r="9"/><path d="M8 7l4 5 4-5M12 12v6M8.5 13h7M8.5 16h7"/>'
};
function initTabs() {
  const TABS = ["flights", "days", "prep", "money"];
  const icons = T.TAB_ICONS || {};
  $$("#tabbar [data-ic]").forEach(i => {
    const k = i.dataset.ic;
    i.innerHTML = icons[k] ? `<img src="${icons[k]}" alt="">` : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="filter:drop-shadow(0 0 4px currentColor)">${TAB_SVG[k]}</svg>`;
  });
  const show = (tab, push) => {
    if (!TABS.includes(tab)) tab = "days";
    $$(".page").forEach(p => p.classList.toggle("on", p.id === tab));
    $$("#tabbar button").forEach(b => b.classList.toggle("on", b.dataset.tab === tab));
    store.set("tab", tab);
    if (push) history.replaceState(null, "", "#" + tab);
    scrollTo(0, 0);
    if (tab === "days") { const r = $("#rail"), i = curDay; r.scrollLeft = Math.max(0, 4 + i * 64 + 32 - r.clientWidth / 2); }
  };
  $("#tabbar").addEventListener("click", e => { const b = e.target.closest("button"); if (b) show(b.dataset.tab, true); });
  // 封面：點 ENTER 進入；網址有 #分頁 就直接進去
  const cover = $("#cover");
  const enter = () => {
    cover.classList.add("gone"); document.body.style.overflow = "";
    setTimeout(() => { cover.style.display = "none"; window.__stopRain && window.__stopRain(); }, 600);
  };
  const h = location.hash.slice(1);
  if (TABS.includes(h)) { cover.style.display = "none"; window.__stopRain && window.__stopRain(); show(h, false); }
  else { document.body.style.overflow = "hidden"; show(store.get("tab", "days"), false); }
  $("#enter").addEventListener("click", enter);
}

initHero(); initFlights(); initDays(); initPrep(); initMoney(); initTabs();
$("#foot").innerHTML = `LAST UPDATE ${esc(T.updated)}<br>行程是草稿，隨時會改`;
})();
