// =============================================
//  價格簿：交通票價、門票、一日券（每人、日圓）
//  價格「跟著行程文字走」，不是綁在某一天：
//  行程挪到別天、改時間，價格會一起過去；每天下方的「今日交通」會重新比較單買和一日券。
//
//  怎麼加一筆：
//    { has: ["關鍵字1", "關鍵字2"], parts: [{ op: "keihan", yen: 240 }] }
//    has：行程文字裡「全部」出現這些字才算（寫越具體越不會誤套）；由上往下找，第一筆符合的就用
//    mode：可選，限定交通方式（地鐵、JR、京阪…）
//    parts：一段一段的錢。op 是誰收的錢，一日券靠它判斷涵不涵蓋：
//      kmetro 京都地鐵｜kbus 京都市巴士｜keihan 京阪（京都段）｜keihanx 京阪（跨到大阪）
//      eiden 叡電｜kyobus 京都巴士（不是市巴士）｜jr JR｜hankyu 阪急｜hanshin 阪神｜kintetsu 近鐵｜nankai 南海
//      ometro 大阪地鐵｜cable 纜車｜taxi 計程車（每人分攤）｜in 門票（可加 id，給周遊卡用）
//    est: true ＝ 估的（畫面顯示「約」）；label：這段在幹嘛（點價格會看到）
//    parts 寫 [] ＝ 確定免費，不會被算成「沒有價格」
// =============================================
window.PRICES = {
  checked: "2026-11-23",

  rules: [
    // ---------- 機場 ----------
    { has: ["HARUKA"], parts: [{ op: "jr", yen: 2700, label: "HARUKA 關西機場→京都（2026/11/1 起單程價）" }] },
    { has: ["南海到難波"], parts: [{ op: "nankai", yen: 970, label: "南海 關西機場→難波" }] },
    { has: ["大阪難波", "南海"], parts: [{ op: "hanshin", yen: 220, label: "阪神 ドーム前→大阪難波" }, { op: "nankai", yen: 970, label: "南海 難波→關西機場" }] },

    // ---------- 1/13 京都 ----------
    { has: ["烏丸線到四條"], parts: [{ op: "kmetro", yen: 220, label: "烏丸線 京都→四條" }] },
    { has: ["市巴士 203"], parts: [{ op: "kbus", yen: 230, label: "市巴士 203 四條西洞院→銀閣寺道" }] },
    { has: ["南禪寺", "銀閣寺"], parts: [{ op: "in", yen: 1000, label: "銀閣寺（2026/4/1 起；南禪寺境內、水路閣免費）" }] },
    { has: ["梅湯"], parts: [
      { op: "kmetro", yen: 220, label: "地鐵東西線 蹴上→三條京阪" },
      { op: "keihan", yen: 180, label: "京阪 三條→清水五條" },
      { op: "in", yen: 550, label: "サウナの梅湯" }] },
    { has: ["錢湯"], parts: [{ op: "in", yen: 550, label: "京都錢湯" }] },

    // ---------- 1/14 鞍馬・貴船・金閣寺 ----------
    { has: ["出町柳", "鞍馬"], mode: "京阪", parts: [{ op: "keihan", yen: 240, label: "京阪 祇園四條→出町柳" }, { op: "eiden", yen: 470, label: "叡電 出町柳→鞍馬" }] },
    { has: ["鞍馬寺"], parts: [{ op: "in", yen: 500, label: "鞍馬寺 愛山費" }] },
    { has: ["貴船神社"], parts: [] },
    { has: ["貴船口", "一乘寺"], parts: [
      { op: "kyobus", yen: 200, label: "京都巴士 33 貴船→貴船口駅前" },
      { op: "eiden", yen: 470, label: "叡電 貴船口→一乘寺" }] },
    { has: ["修學院離宮"], parts: [] },
    { has: ["修學院站", "出町柳"], parts: [{ op: "eiden", yen: 220, label: "叡電 修學院→出町柳" }] },
    { has: ["京阪直達祇園四條"], parts: [{ op: "keihan", yen: 240, label: "京阪 出町柳→祇園四條" }] },
    { has: ["出町柳", "金閣寺"], mode: "計程車", parts: [
      { op: "eiden", yen: 470, est: true, label: "叡電 貴船口→出町柳" },
      { op: "taxi", yen: 700, est: true, label: "計程車 出町柳→金閣寺（一台約 ¥2,000，3 人分攤）" }] },
    { has: ["金閣寺"], parts: [{ op: "in", yen: 500, label: "金閣寺" }] },
    { has: ["船岡溫泉"], parts: [
      { op: "kbus", yen: 230, est: true, label: "市巴士 金閣寺→船岡溫泉" },
      { op: "in", yen: 550, label: "船岡溫泉" },
      { op: "kbus", yen: 230, est: true, label: "市巴士 回四條西洞院" }] },

    // ---------- 1/15 白鬚神社・二條城・金閣寺 ----------
    { has: ["地鐵四條", "近江高島"], parts: [
      { op: "kmetro", yen: 290, label: "地鐵 四條→烏丸御池→山科（烏丸線轉東西線，算一段）" },
      { op: "jr", yen: 770, label: "JR 湖西線 山科→近江高島" }] },
    { has: ["近江高島", "二條城前"], parts: [
      { op: "taxi", yen: 300, est: true, label: "計程車 白鬚神社→近江高島站（一台約 ¥1,200，4 人分攤）" },
      { op: "jr", yen: 770, label: "JR 湖西線 近江高島→山科" },
      { op: "kmetro", yen: 290, label: "地鐵東西線 山科→二條城前" }] },
    { has: ["二之丸御殿"], parts: [{ op: "in", yen: 1300, label: "二條城 入城＋二之丸御殿" }] },
    { has: ["市巴士 12 號"], parts: [{ op: "kbus", yen: 230, label: "市巴士 12 二條城前→金閣寺道" }] },
    // （下面是舊的比叡山路線，行程已經拿掉；之後排回來會自動套用）
    { has: ["京都", "近江高島"], mode: "JR", parts: [
      { op: "kmetro", yen: 220, est: true, label: "烏丸線 四條→京都" },
      { op: "jr", yen: 860, est: true, label: "JR 湖西線 京都→近江高島" }] },
    { has: ["白鬚神社"], mode: "計程車", parts: [{ op: "taxi", yen: 300, est: true, label: "計程車 約 5 分（一台約 ¥1,200，4 人分攤）" }] },
    { has: ["白鬚神社"], parts: [] },
    { has: ["近江高島", "比叡山坂本"], parts: [
      { op: "taxi", yen: 300, est: true, label: "計程車 白鬚神社→近江高島站（4 人分攤）" },
      { op: "jr", yen: 590, est: true, label: "JR 近江高島→比叡山坂本" }] },
    { has: ["坂本纜車上山"], parts: [{ op: "cable", yen: 960, label: "坂本纜車 單程（2026/4/1 起；來回 ¥1,830）" }] },
    { has: ["延曆寺"], parts: [{ op: "in", yen: 1000, label: "延曆寺 三塔巡拝" }] },
    { has: ["纜車下山", "JR"], parts: [
      { op: "cable", yen: 960, label: "坂本纜車 單程" },
      { op: "jr", yen: 330, est: true, label: "JR 比叡山坂本→京都" },
      { op: "kmetro", yen: 220, est: true, label: "烏丸線 京都→四條" }] },

    // ---------- 1/16 保津川 → 大阪 ----------
    { has: ["退房", "嵯峨野線"], parts: [{ op: "kmetro", yen: 220, label: "烏丸線 四條→京都" }, { op: "jr", yen: 410, label: "JR 嵯峨野線 京都→龜岡" }] },
    { has: ["烏丸線到京都站"], parts: [{ op: "kmetro", yen: 220, label: "烏丸線 四條→京都" }] },
    { has: ["嵯峨野線", "龜岡"], parts: [{ op: "jr", yen: 410, label: "JR 嵯峨野線 京都→龜岡" }] },
    { has: ["保津川"], parts: [{ op: "in", yen: 6000, label: "保津川遊船" }] },
    { has: ["嵐山", "大阪梅田"], mode: "阪急", parts: [{ op: "hankyu", yen: 410, label: "阪急 嵐山→大阪梅田" }, { op: "ometro", yen: 240, est: true, label: "大阪地鐵 梅田→九條" }] },
    { has: ["大阪難波", "九條"], mode: "阪神", parts: [{ op: "hanshin", yen: 220, est: true, label: "阪神 大阪難波→九條" }] },
    { has: ["8 人道頓堀晚餐"], parts: [
      { op: "ometro", yen: 190, est: true, label: "大阪地鐵 ドーム前千代崎→心齋橋" },
      { op: "ometro", yen: 190, est: true, label: "回程" }] },

    // ---------- 1/17 清水 → 稻荷 → 競馬場 → 宇治 ----------
    { has: ["九條", "清水五条"], parts: [{ op: "ometro", yen: 240, label: "大阪地鐵 九條→淀屋橋" }, { op: "keihanx", yen: 490, est: true, label: "京阪 淀屋橋→清水五条" }] },
    { has: ["清水寺"], parts: [{ op: "in", yen: 500, label: "清水寺" }] },
    { has: ["八坂神社"], parts: [] },
    { has: ["祇園四條", "伏見稻荷"], parts: [{ op: "keihan", yen: 240, est: true, label: "京阪 祇園四條→伏見稻荷" }] },
    { has: ["伏見稻荷：千本鳥居"], parts: [] },
    { has: ["伏見稻荷", "淀"], mode: "京阪", parts: [{ op: "keihan", yen: 320, est: true, label: "京阪 伏見稻荷→淀" }] },
    { has: ["京都競馬場"], parts: [{ op: "in", yen: 200, label: "京都競馬場（網路預約 ¥100）" }] },
    // 「淀屋橋」也含「淀」，這筆要排在「淀→宇治」前面
    { has: ["宇治", "淀屋橋"], parts: [{ op: "keihanx", yen: 490, label: "京阪 宇治→淀屋橋" }, { op: "ometro", yen: 240, label: "大阪地鐵 淀屋橋→九條" }] },
    { has: ["淀", "宇治"], mode: "京阪", parts: [{ op: "keihan", yen: 320, est: true, label: "京阪 淀→中書島→宇治" }] },
    { has: ["平等院"], parts: [{ op: "in", yen: 700, label: "平等院（庭園＋鳳翔館；鳳凰堂內部另 ¥300）" }] },

    // ---------- 1/18 奈良・新世界 ----------
    { has: ["九條", "近鐵奈良"], parts: [{ op: "hanshin", yen: 220, est: true, label: "阪神 九條→大阪難波" }, { op: "kintetsu", yen: 680, label: "近鐵 大阪難波→近鐵奈良" }] },
    { has: ["東大寺"], parts: [{ op: "in", yen: 800, label: "東大寺大佛殿" }] },
    { has: ["回大阪"], mode: "近鐵", parts: [{ op: "kintetsu", yen: 680, label: "近鐵 近鐵奈良→大阪難波" }, { op: "ometro", yen: 190, est: true, label: "大阪地鐵 難波→動物園前" }] },
    { has: ["Spa World"], parts: [{ op: "in", yen: 1500, label: "Spa World 溫泉（加泳池平日 ¥2,000）" }] },
    { has: ["新世界"], parts: [{ op: "ometro", yen: 240, est: true, label: "大阪地鐵 動物園前→回九條" }] },

    // ---------- 1/19 大阪城・心齋橋 ----------
    { has: ["大阪城"], parts: [{ op: "ometro", yen: 240, est: true, label: "大阪地鐵 九條→森之宮" }, { op: "in", id: "osakajo", yen: 1200, label: "大阪城天守閣" }] },
    { has: ["心齋橋", "寶可夢"], parts: [{ op: "ometro", yen: 240, est: true, label: "大阪地鐵 森之宮→心齋橋" }] },
    { has: ["忍者"], parts: [{ op: "in", yen: 6600, est: true, label: "忍者體驗" }] },
    { has: ["オタロード"], parts: [] },
    { has: ["道頓堀晚餐"], parts: [{ op: "ometro", yen: 190, est: true, label: "大阪地鐵 回九條" }] },

    // ---------- 1/20 箕面・梅田 ----------
    { has: ["大阪梅田", "箕面"], parts: [{ op: "ometro", yen: 240, est: true, label: "大阪地鐵 九條→梅田" }, { op: "hankyu", yen: 280, label: "阪急 大阪梅田→箕面" }] },
    { has: ["箕面大瀑布"], parts: [] },
    { has: ["Nintendo OSAKA"], parts: [{ op: "hankyu", yen: 280, label: "阪急 箕面→大阪梅田" }] },
    { has: ["空中庭園"], parts: [{ op: "in", id: "skybldg", yen: 2000, label: "梅田藍天大廈空中庭園" }, { op: "ometro", yen: 240, est: true, label: "大阪地鐵 梅田→回九條" }] }
  ],

  // 一日券：yen 平日、yenWE 週末（沒寫＝每天一樣）；covers 是涵蓋的 op（門票寫 "in:id"）
  passes: [
    { name: "京阪 大阪・京都1日乗車券", yen: 1650, covers: ["keihan", "keihanx"], buy: "スルッとQRtto 先買（一次最多 4 張）" },
    { name: "京阪 京都1日乗車券", yen: 1100, covers: ["keihan"], buy: "スルッとQRtto；只到石清水八幡宮，不能到大阪" },
    { name: "京阪＋大阪地鐵 1日券", yen: 2160, covers: ["keihan", "keihanx", "ometro"], buy: "スルッとQRtto" },
    { name: "大阪地鐵 Enjoy Eco Card", yen: 820, yenWE: 620, covers: ["ometro"], buy: "地鐵站售票機" },
    { name: "大阪周遊卡 1 日", yen: 3500, covers: ["ometro", "in:osakajo"], buy: "線上買；空中庭園 15:00 前才免費" },
    { name: "京都地鐵・巴士 1日券", yen: 1100, covers: ["kmetro", "kbus"], buy: "地鐵站、市巴士上" },
    { name: "京都地鐵 1日券", yen: 800, covers: ["kmetro"], buy: "地鐵站售票機" },
    { name: "叡電 1日券", yen: 1200, covers: ["eiden"], buy: "出町柳站" },
    { name: "叡電・京阪 1日券", yen: 2100, covers: ["keihan", "keihanx", "eiden"], buy: "スルッとQRtto" },
    { name: "地鐵＆叡電 鞍馬・貴船日歸票", yen: 2100, covers: ["kmetro", "eiden"], buy: "地鐵站、出町柳站；市巴士、京都巴士不能用，京阪只有三條〜出町柳" },
    { name: "JR 關西地區周遊券 1 日", yen: 2800, covers: ["jr"], buy: "限外國觀光客，線上或 JR 窗口" }
  ]
};
