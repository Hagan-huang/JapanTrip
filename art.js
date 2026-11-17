/* =========================================================
   插畫：頁首 5 張、每日場景 9 張（金色線稿 SVG）
   - class="d" 的線條會像毛筆一樣依序畫出來（CSS 的 ink 動畫）
   - class="f" 的填色在線條畫完後淡入
   - 其他 class（wing、paw、flow…）是畫完後的小動作
   想換畫法：改這裡的 path 就好；要換成 Gemini 的圖，見 README
   ========================================================= */
(() => {
  const C = (x, y, r) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0`;
  // 日式捲雲
  const cloud = (x, y, s = 1) => `M${x} ${y}h${34 * s}M${x + 6 * s} ${y}q${-2 * s} ${-9 * s} ${7 * s} ${-9 * s}q${4 * s} ${-8 * s} ${12 * s} ${-3 * s}q${7 * s} ${-3 * s} ${9 * s} ${5 * s}q${5 * s} 0 ${5 * s} ${7 * s}`;
  // 鳥居：中心 x、地面 y、寬 w、高 h
  const torii = (x, y, w, h) => {
    const a = w / 2, t = y - h;
    return `<path class="d" d="M${x - a - w * .08} ${t + h * .06}Q${x} ${t - h * .1} ${x + a + w * .08} ${t + h * .06}"/>
      <path class="d" d="M${x - a + w * .04} ${t + h * .16}H${x + a - w * .04}"/>
      <path class="d" d="M${x - a * .78} ${t + h * .08}L${x - a * .84} ${y}"/><path class="d" d="M${x + a * .78} ${t + h * .08}L${x + a * .84} ${y}"/>
      <path class="d" d="M${x - a * .98} ${t + h * .34}H${x + a * .98}"/><path class="d" d="M${x} ${t + h * .16}V${t + h * .34}"/>`;
  };
  // 五重塔：中心 x、地面 y
  const pagoda = (x, y, s = 1) => {
    let p = "";
    for (let i = 0; i < 5; i++) {
      const ry = y - 14 * s - i * 15 * s, w = (27 - i * 3.6) * s, b = (13 - i * 1.8) * s;
      p += `<path class="d" d="M${x - w} ${ry}Q${x - w * .5} ${ry - 3 * s} ${x} ${ry - 7 * s}Q${x + w * .5} ${ry - 3 * s} ${x + w} ${ry}"/>`;
      p += `<path class="d" d="M${x - b} ${ry + 1}V${ry + 12 * s}M${x + b} ${ry + 1}V${ry + 12 * s}"/>`;
    }
    const top = y - 14 * s - 4 * 15 * s - 7 * s;
    p += `<path class="d" d="M${x} ${top}V${top - 18 * s}M${x - 3 * s} ${top - 5 * s}h${6 * s}M${x - 3 * s} ${top - 9 * s}h${6 * s}M${x - 3 * s} ${top - 13 * s}h${6 * s}"/>`;
    p += `<path class="d" d="M${x - 20 * s} ${y}H${x + 20 * s}M${x - 16 * s} ${y}V${y - 3 * s}H${x + 16 * s}V${y}"/>`;
    return p;
  };
  // 側面的飛機（機頭朝右），x,y 是左上角，r 是爬升角度
  const airplane = (x, y, r = -10, s = 1) => `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})">
      <path class="d" d="M0 12Q0 8 6 8H62Q74 8 82 12Q74 16 62 16H6Q0 16 0 12Z"/>
      <path class="d" d="M6 8L1-6H9L20 8"/><path class="d" d="M30 14L42 30H51L46 14"/><path class="d thin" d="M36 8L44-2H50L47 8"/>
      <path class="d thin" d="M50 11.5H70"/></g>`;
  const wave = (x, y, n, w = 14) => { let d = `M${x} ${y}`; for (let i = 0; i < n; i++) d += `q${w / 4} ${-3} ${w / 2} 0t${w / 2} 0`; return d; };
  const sun = (x, y, r) => `<path class="f sunf" d="${C(x, y, r)}"/><path class="d" d="${C(x, y, r)}"/>`;
  const moon = (x, y, r) => `<path class="f moonf" d="M${x + r * .3} ${y - r}A${r} ${r} 0 1 0 ${x + r * .3} ${y + r}A${r * .78} ${r * .78} 0 1 1 ${x + r * .3} ${y - r}Z"/><path class="d" d="M${x + r * .3} ${y - r}A${r} ${r} 0 1 0 ${x + r * .3} ${y + r}A${r * .78} ${r * .78} 0 1 1 ${x + r * .3} ${y - r}"/>`;
  const star = (x, y, k) => `<path class="tw" style="--k:${k}" d="M${x} ${y - 3}V${y + 3}M${x - 3} ${y}H${x + 3}"/>`;
  const bird = (x, y, k) => `<g class="bird" style="--k:${k}"><path d="M${x} ${y}q4 -4 8 0q4 -4 8 0"/></g>`;
  // 楓葉（掉落用）
  const leaf = (x, y, k) => `<path class="leaf" style="--k:${k}" d="M${x} ${y - 5}l1.6 3.4 3.4-1-1.4 3.2 2.4 1.4-3.4.6.4 3-3-1.8-3 1.8.4-3-3.4-.6 2.4-1.4-1.4-3.2 3.4 1z"/>`;

  /* ---------- 頁首插畫（160×120，放在大標題右邊） ---------- */
  const HEAD = {
    // 本部：鳥居、遠山；日本時間白天是太陽＋飛鳥，晚上是月亮＋星星
    home: night => `
      <path class="d" d="M0 102Q18 84 32 90Q42 94 52 104"/>
      <path class="d" d="M120 104Q134 86 146 88Q154 90 160 96"/>
      <path class="d thin" d="M0 108Q14 100 28 104"/>
      ${torii(86, 110, 58, 56)}
      <path class="d" d="M18 110H154"/>
      ${night ? `${moon(130, 26, 11)}${star(28, 22, 0)}${star(52, 40, 1)}${star(104, 14, 2)}${star(150, 54, 3)}` : `${sun(128, 28, 11)}${bird(22, 36, 0)}${bird(44, 26, 1)}`}`,
    // 出発：飛翔的丹頂鶴、捲雲、航線
    flights: () => `
      <path class="route" d="M-4 112Q70 70 164 86"/>
      <g class="crane">
        <path class="d" d="M24 52q-3-4 1-6q4-1 5 3"/><path class="f cap" d="${C(27.5, 46.5, 2.2)}"/>
        <path class="d" d="M24 52l-7 2"/>
        <path class="d" d="M30 50Q44 58 62 62"/>
        <path class="d" d="M62 62Q84 54 106 63Q86 70 62 62"/>
        <path class="d" d="M106 63l16 5M106 63l15 0M104 65l13 8"/>
        <path class="d" d="M98 67L134 76M98 68L131 81"/>
        <g class="wing"><path class="d" d="M72 59Q64 30 88 8Q88 30 100 42Q94 50 86 58"/><path class="d thin" d="M80 54Q78 36 90 20M88 52Q88 38 96 30"/></g>
        <g class="wing2"><path class="d thin" d="M78 64Q96 84 128 92Q108 76 96 66"/></g>
      </g>
      <g class="drift"><path class="d thin" d="${cloud(6, 100, .9)}"/><path class="d thin" d="${cloud(112, 30, .8)}"/></g>`,
    // 旅程：五重塔、山、石燈籠
    days: () => `
      <path class="d" d="M0 108Q22 70 44 84Q58 92 80 80"/>
      <path class="d thin" d="M0 108Q20 94 40 100"/>
      ${pagoda(112, 110, 1)}
      <path class="d" d="M44 110v-14h-6l8-6 8 6h-6v14M40 110h12"/><path class="f glow" d="M44 94h4v4h-4z"/>
      <path class="d" d="M8 110H156"/>
      <path class="d thin" d="M150 30q-6 0-6 6q0 4 4 4h10q4 0 4-4q0-6-6-6q-2-4-6 0" />`,
    // 支度：搖晃的御守、梅花
    prep: () => `
      <g class="swing">
        <path class="d" d="M88 0V22"/>
        <path class="d" d="M88 22q-10-8-8 4q2 8 8 2q6 6 8-2q2-12-8-4"/>
        <path class="d" d="M72 34h32l4 6v54q0 6-6 6H74q-6 0-6-6V40z"/>
        <path class="d thin" d="M74 42h28v50H74z"/>
        <text class="f kanji" x="88" y="62" text-anchor="middle">御</text><text class="f kanji" x="88" y="82" text-anchor="middle">守</text>
        <path class="d thin" d="M84 100l-4 14M92 100l4 14"/>
      </g>
      <g class="ume">${[0, 72, 144, 216, 288].map(a => { const r = a * Math.PI / 180, x = 30 + Math.cos(r) * 7, y = 50 + Math.sin(r) * 7; return `<path class="d thin" d="${C(x.toFixed(1), y.toFixed(1), 5)}"/>`; }).join("")}<path class="f glow" d="${C(30, 50, 2.5)}"/></g>
      <path class="d thin" d="M10 74Q30 62 30 50M30 50Q44 38 56 40"/>
      <g class="ume2">${[0, 72, 144, 216, 288].map(a => { const r = (a + 30) * Math.PI / 180, x = 136 + Math.cos(r) * 5, y = 96 + Math.sin(r) * 5; return `<path class="d thin" d="${C(x.toFixed(1), y.toFixed(1), 3.6)}"/>`; }).join("")}</g>`,
    // 家計簿：招財貓（右手招手）、小判
    money: () => `
      <path class="d" d="${C(80, 50, 22)}"/>
      <path class="d" d="M61 40L62 22L74 30"/><path class="d" d="M86 30L98 22L99 40"/>
      <path class="d" d="M69 50q3-4 6 0M85 50q3-4 6 0"/>
      <path class="d" d="M80 55v2M76 59q4 3 8 0"/>
      <path class="d thin" d="M56 54h10M56 58l10-1M94 54h10M94 57l10 1"/>
      <path class="d" d="M60 66Q50 110 80 110Q110 110 100 66"/>
      <path class="d" d="M62 70Q80 80 98 70"/><path class="f bell" d="${C(80, 79, 4)}"/><path class="d" d="${C(80, 79, 4)}"/>
      <g class="paw"><path class="d" d="M98 70Q110 56 108 40q-1-8-7-6q-6 2-5 12Q98 56 94 64"/><path class="d thin" d="M100 38l1 4M104 37l0 4"/></g>
      <path class="d" d="M68 106q4-6 8 0M84 106q4-6 8 0"/>
      <path class="d thin" d="M66 92q14 6 28 0"/>
      <g class="coin" style="--k:0"><path class="d" d="M26 80q8-5 16 0q-8 6-16 0"/></g>
      <g class="coin" style="--k:1"><path class="d" d="M126 98q8-5 16 0q-8 6-16 0"/></g>
      <path class="spark" style="--k:0" d="M134 74v8M130 78h8"/><path class="spark" style="--k:1" d="M30 62v6M27 65h6"/>`
  };

  /* ---------- 每日場景（360×96，日卡上方的長條） ---------- */
  const DAY = {
    // 1/13 抵達：雲上的飛機、關西機場人工島
    plane: () => `
      <path class="d" d="M0 82H360"/>
      <path class="d thin" d="${wave(206, 90, 7)}"/>
      <path class="d" d="M250 82h96v-6h-96zM262 76v-8h20v8M300 76l6-10h12l6 10"/>
      <g class="bob">${airplane(112, 42, -8)}</g>
      <path class="route" d="M20 76Q70 70 110 58"/>
      <g class="drift"><path class="d thin" d="${cloud(30, 40, 1)}"/><path class="d thin" d="${cloud(210, 26, .8)}"/></g>
      ${sun(318, 30, 9)}`,
    // 1/14 鞍馬・貴船：石階兩旁的紅燈籠、杉林、鳥居
    torii: () => {
      let s = "";
      for (let i = 0; i < 5; i++) {
        const x = 96 + i * 28, y = 86 - i * 9;
        s += `<path class="d thin" d="M${x - 14} ${y + 4}h28"/>`;
        s += `<path class="d" d="M${x - 12} ${y - 16}v20"/><path class="f lantern" style="--k:${i}" d="M${x - 15} ${y - 28}h6v11h-6z"/><path class="d thin" d="M${x - 15} ${y - 28}h6v11h-6zM${x - 16} ${y - 28}h8"/>`;
      }
      for (let i = 0; i < 6; i++) { const x = 18 + i * 12 + (i % 2) * 4, h = 46 + (i % 3) * 10; s += `<path class="d thin" d="M${x} 92V${92 - h}M${x - 8} ${92 - h * .35}L${x} ${92 - h}L${x + 8} ${92 - h * .35}M${x - 6} ${92 - h * .6}L${x} ${92 - h * .95}"/>`; }
      for (let i = 0; i < 5; i++) { const x = 292 + i * 14, h = 50 + (i % 2) * 14; s += `<path class="d thin" d="M${x} 92V${92 - h}M${x - 8} ${92 - h * .35}L${x} ${92 - h}L${x + 8} ${92 - h * .35}"/>`; }
      return s + torii(250, 52, 34, 34) + `<path class="d" d="M0 92H360"/>`;
    },
    // 1/15 白鬚神社：湖中鳥居、倒影晃動、遠山、旭日
    torii2: () => `
      <path class="d" d="M0 52Q30 36 64 46Q100 56 136 54"/><path class="d" d="M226 56Q262 40 292 52Q326 62 360 46"/>
      ${sun(300, 30, 10)}
      ${torii(180, 66, 64, 46)}
      <path class="d" d="M0 66H360"/>
      <g class="shimmer"><path class="d thin" d="M150 74h60M158 80h44M166 86h28M172 92h16"/></g>
      <path class="d thin" d="${wave(20, 80, 6)}"/><path class="d thin" d="${wave(250, 84, 6)}"/>`,
    // 1/16 保津川：船夫撐篙、峽谷、水紋
    boat: () => `
      <path class="d" d="M0 30Q40 20 70 44T130 60"/><path class="d" d="M360 22Q320 26 296 48T240 60"/>
      <path class="d thin" d="M0 52Q30 46 54 60"/>
      <g class="bob">
        <path class="d" d="M120 70h120l-12 10H134z"/>
        <path class="d" d="M214 70V44"/><path class="d" d="${C(214, 40, 4)}"/><path class="d" d="M208 36h12l-6-5z"/>
        <path class="d" d="M214 52l-14 4M214 52l10-6"/>
        <path class="d" d="M224 46L250 92"/>
        <path class="d thin" d="M150 70v-8h22v8M156 62l5-6 5 6"/>
      </g>
      <g class="flow"><path class="d thin" d="${wave(40, 86, 4)}"/><path class="d thin" d="${wave(260, 88, 4)}"/><path class="d thin" d="${wave(150, 92, 3)}"/></g>`,
    // 1/17 清水日出 → 千本鳥居 → 競馬場
    fox: () => {
      let s = sun(316, 40, 14) + `<path class="d" d="M0 86H360"/>`;
      for (let i = 0; i < 6; i++) { const sc = 1 - i * .13, x = 120 + i * 14, h = 64 * sc, w = 52 * sc; s += torii(x, 86, w, h); }
      // 狐狸面具
      s += `<path class="d" d="M32 40l6 14h16l6-14 3 22-17 16-17-16z"/><path class="d thin" d="M41 60l5 2M56 60l-5 2M47 70h4"/><path class="f cap" d="M38 52l3 3M56 52l-3 3"/>`;
      // 小馬（競馬場）
      // 宇治抹茶
      s += `<path class="d" d="M236 70h40q-2 16-20 16q-18 0-20-16z"/><path class="d thin" d="M244 70q12 4 24 0"/><g class="steam"><path class="d thin" d="M250 62q-3-5 0-10t0-10M262 62q-3-5 0-10t0-10"/></g>`;
      return s;
    },
    // 1/18 奈良的鹿、石燈籠、溫泉
    deer: () => `
      <path class="d" d="M0 86H360"/>
      <g class="nod"><path class="d" d="M128 46q-6-8 0-12q6-2 8 4"/><path class="d thin" d="M128 38l-6-12M124 32l-6-2M134 36l4-12M136 30l6-2"/><path class="d" d="M126 46l-6 2"/></g>
      <path class="d" d="M134 46Q140 56 148 58Q170 54 192 58Q198 62 196 66"/>
      <path class="d" d="M150 60v26M158 62v24M184 62v24M192 64v22"/>
      <path class="d thin" d="M164 62q4 4 8 0M174 64q4 4 8 0"/>
      <path class="d" d="M60 86v-26h-8l12-10 12 10h-8v26M54 86h20"/><path class="f glow" d="M60 62h8v8h-8z"/>
      <path class="d" d="M268 86q-10-4-6-16h28q4 12-6 16"/>
      <g class="steam"><path class="d thin" d="M270 64q-4-6 0-12t0-12M278 62q-4-6 0-12t0-12M286 64q-4-6 0-12t0-12"/></g>
      <path class="d thin" d="${wave(300, 92, 3, 16)}"/>`,
    // 1/19 大阪城、手裡劍
    ninja: () => {
      let s = `<path class="d" d="M0 88H360"/><path class="d" d="M120 88l10-18h100l10 18"/>`;
      const tiers = [[134, 70, 92], [142, 56, 76], [150, 44, 60], [158, 32, 44]];
      tiers.forEach(([x, y, w], i) => { s += `<path class="d" d="M${x - 6} ${y}Q${x + w / 2} ${y - 10} ${x + w + 6} ${y}"/><path class="d thin" d="M${x} ${y}v${i ? 12 : 0}M${x + w} ${y}v${i ? 12 : 0}"/>`; });
      s += `<path class="d" d="M160 32q20-14 40 0M176 22l4-4 4 4M174 32v-6M186 32v-6"/>`;
      s += `<g class="spin" style="transform-origin:300px 40px"><path class="d" d="M300 26l4 10 10 4-10 4-4 10-4-10-10-4 10-4z"/><path class="d thin" d="${C(300, 40, 3)}"/></g>`;
      s += `<g class="drift"><path class="d thin" d="${cloud(28, 40, 1)}"/></g><path class="d thin" d="${wave(16, 94, 6)}"/>`;
      return s;
    },
    // 1/20 箕面瀑布、落葉
    fall: () => `
      <path class="d" d="M120 16Q140 12 150 18L154 90M220 16Q206 12 196 18L192 90"/>
      <path class="d" d="M80 90Q100 60 120 16M260 90Q244 60 220 16"/>
      <path class="d" d="M150 18H196"/>
      <g class="flow-down"><path class="d thin" d="M158 20V86M166 22V88M174 20V84M182 22V88M190 20V86"/></g>
      <path class="d thin" d="M136 90q14-8 36-4t36 4"/><path class="d" d="M0 90H360"/>
      ${leaf(60, 20, 0)}${leaf(250, 10, 1)}${leaf(300, 30, 2)}${leaf(100, 6, 3)}
      <path class="d thin" d="M20 90Q40 60 70 70T110 90M290 90Q300 70 330 72T360 84"/>`,
    // 1/21 回國：夕陽、起飛、またね
    plane2: () => `
      <path class="d" d="M0 70H360"/>
      <path class="f sunf" d="M250 70a26 26 0 0 1 52 0z"/><path class="d" d="M250 70a26 26 0 0 1 52 0"/>
      <path class="d thin" d="M246 78h60M256 84h40M266 90h20"/>
      <g class="takeoff">${airplane(62, 46, -16, .9)}</g>
      <path class="route" d="M6 70Q34 68 60 58"/>
      <text class="f mata" x="196" y="40" text-anchor="middle" lang="ja">またね</text>
      <path class="d thin" d="${wave(20, 82, 5)}"/>`
  };

  // 幫每條 class="d" 的線加上 pathLength 和順序（--i），讓它們一條接一條畫出來
  const prep = svg => { let i = 0; return svg.replace(/<path class="d( thin)?"/g, (m, t) => `<path class="d${t || ""}" pathLength="1" style="--i:${i++}"`); };
  const wrap = (body, vb, cls) => `<svg class="${cls}" viewBox="${vb}" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${prep(body)}</svg>`;
  const isNight = () => { const h = new Date(Date.now() + 9 * 36e5).getUTCHours(); return h < 6 || h >= 17; };

  window.ART = {
    head: k => HEAD[k] ? wrap(HEAD[k](isNight()), "0 0 160 120", "hart") : "",
    day: k => wrap((DAY[k] || DAY.torii)(), "0 0 360 96", "dart"),
    keys: { head: Object.keys(HEAD), day: Object.keys(DAY) }
  };
})();
