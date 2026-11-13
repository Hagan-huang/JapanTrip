// =============================================
//  行程資料：要改行程就改這個檔案
//  type：move（交通）、spot（景點）、food（吃）、note（提醒）
//  mode：地鐵、JR、京阪、阪急、阪神、近鐵、叡電、纜車、公車、步行、計程車、飛機、船
//  tbd: true 代表待定，會用虛線框顯示
//  close：關門／時間提醒；map：Google Maps 搜尋關鍵字
// =============================================

window.TRIP = {
  title: "京都・大阪 9 天 8 夜",
  code: "KANSAI//2027",
  range: "2027.01.13 – 01.21",
  departAt: "2027-01-13T01:55:00+08:00",
  updated: "2026-11-13",

  // 共用帳本：Google Apps Script 部署後的網址（設定步驟見 README）
  SHEET_URL: "https://script.google.com/macros/s/AKfycbwOpjTe9wPVYV4QP1Sl7c1Rf0TN4n66Gn96t36PQorv4yIU3pHELckhgYSiupUTiuOdvA/exec",

  // 首頁背景圖：Gemini 畫好後放到 images/ 資料夾，填檔名，例如 "images/hero.jpg"
  HERO_IMAGE: "images/hero.jpg",
  // 封面圖（直式，手機全螢幕）；沒填就用 HERO_IMAGE
  COVER_IMAGE: "images/cover.jpg",
  // 各分頁上方橫幅圖（3:1 橫圖）；沒填就從封面裁一塊
  BANNERS: { home: "images/banner-home.jpg", flights: "images/banner-flights.jpg", days: "images/banner-days.jpg", prep: "images/banner-prep.jpg", money: "images/banner-money.jpg" },
  // 橫幅圖要對準哪裡（水平% 垂直%）
  BANNER_POS: { home: "66% 50%", flights: "62% 42%", days: "68% 55%", prep: "72% 62%", money: "78% 45%" },
  // 底部按鈕圖示：Gemini 畫好後放 images/，例如 flights: "images/tab-flights.png"
  TAB_ICONS: { home: "images/tab-home.png", flights: "images/tab-flights.png", days: "images/tab-days.png", prep: "images/tab-prep.png", money: "images/tab-money.png" },

  // 行程修改：網站會自動把這些列寫進試算表（每個 id 只寫一次，會整天取代）
  ITIN_PATCHES: [
    {"id": "2026-11-13-osk15-kyoto", "dates": ["1/15", "1/16"], "rows": [["1/15", "08:00", "交通", "JR", "湖西線 京都 → 近江高島", "約 1 小時", "", "", false, "", ""], ["1/15", "09:10", "交通", "計程車", "近江高島站 → 白鬚神社", "約 5 分，4 人剛好一台", "", "", false, "", ""], ["1/15", "09:20", "景點", "", "白鬚神社・湖中鳥居", "", "", "白鬚神社", false, "", ""], ["1/15", "10:30", "交通", "JR", "近江高島 → 比叡山坂本，走到坂本纜車站", "", "", "", false, "", ""], ["1/15", "12:00", "交通", "纜車", "坂本纜車上山", "單程 ¥960；12–2 月首末班停駛", "", "", false, "", ""], ["1/15", "12:30", "景點", "", "延曆寺東塔（根本中堂）＋午餐", "常有積雪，穿防滑的鞋", "東塔 16:00 關", "延暦寺 根本中堂", false, "", ""], ["1/15", "15:30", "交通", "纜車", "纜車下山 → JR 回京都", "約 17:00 到", "", "", false, "", ""], ["1/15", "晚上", "提醒", "", "打包，準備明天搬去大阪", "", "", "", false, "", ""], ["1/15", "17:55", "交通", "飛機", "IT212 降落關西機場 T1", "", "", "", false, "1/15 大阪組", ""], ["1/15", "18:45", "交通", "JR", "HARUKA 關西機場 → 京都", "約 80 分；機場 JR 窗口買 ICOCA & HARUKA，單程 ¥2,700", "", "", false, "1/15 大阪組", ""], ["1/15", "20:15", "景點", "", "入住京都麗嘉皇家酒店", "京都站中央口走路約 7 分", "有些方案 20:30 截止入住，晚到先通知飯店", "リーガロイヤルホテル京都", false, "1/15 大阪組", ""], ["1/15", "晚上", "吃", "", "京都站周邊晚餐（拉麵小路、Porta 地下街）", "", "", "京都駅 拉麺小路", false, "1/15 大阪組", ""], ["1/16", "08:15", "交通", "地鐵", "EN HOTEL 退房 → 烏丸線到京都站", "約 12 分", "", "", false, "京都組", ""], ["1/16", "08:30", "提醒", "", "麗嘉退房，走到京都站跟京都組會合", "走路約 7 分", "", "", false, "1/15 大阪組", ""], ["1/16", "—", "提醒", "", "行李怎麼處理？宅急便寄大阪，或寄放京都站置物櫃", "", "", "", true, "京都組、1/15 大阪組", ""], ["1/16", "08:45", "交通", "JR", "京都站 → 嵯峨野線到龜岡", "約 30 分；龜岡站走 8 分到乘船處", "", "", false, "京都組、1/15 大阪組", ""], ["1/16", "10:00", "景點", "", "保津川遊船（約 2 小時，到嵐山）", "冬季暖桌船，¥6,000，要預約（6 人）", "冬季 10:00–14:30 開船", "保津川下り 乗船場", false, "京都組、1/15 大阪組", "6 人"], ["1/16", "12:00", "吃", "", "嵐山午餐 → 竹林小徑、渡月橋", "", "", "嵐山 竹林の小径", false, "京都組、1/15 大阪組", ""], ["1/16", "13:15", "交通", "阪急", "嵐山 → 桂 → 大阪梅田 → 九條", "約 1 小時 15 分", "", "", false, "京都組、1/15 大阪組", ""], ["1/16", "10:25", "交通", "飛機", "IT210 降落關西 T1 → 南海到難波", "", "", "", false, "1/16 大阪組", ""], ["1/16", "12:00", "吃", "", "難波午餐、逛黑門市場", "", "", "黒門市場", false, "1/16 大阪組", ""], ["1/16", "14:30", "交通", "阪神", "大阪難波 → 九條，到住宿", "約 5 分", "", "", false, "1/16 大阪組", ""], ["1/16", "15:00", "景點", "", "全員在大阪住宿會合、入住", "", "", "大阪市西区九条南1-5-2", false, "", "8 人"], ["1/16", "晚上", "吃", "", "8 人道頓堀晚餐（先訂位）→ 柏青哥初體驗", "明天 5 點要出門，別玩太晚", "", "", false, "", ""]]}
  ],

  // 組別：行程頁可以切換「看誰的行程」，每組只看到自己的安排
  groups: [
    { id: "kyoto", name: "京都組", desc: "我們 3 人＋1/14 會合 1 人", arrive: 0 },
    { id: "osk15", name: "1/15 大阪組", desc: "IT212・2 人", arrive: 2 },
    { id: "osk16", name: "1/16 大阪組", desc: "IT210・2 人", arrive: 3 }
  ],

  // 機場：lat/lon 用來畫航線地圖；tz 是時區（台灣 +8，韓國、日本 +9）
  airports: {
    TPE: { name: "桃園", lat: 25.08, lon: 121.23, tz: 8 },
    KHH: { name: "高雄", lat: 22.58, lon: 120.35, tz: 8 },
    TAE: { name: "大邱", lat: 35.90, lon: 128.66, tz: 9 },
    KIX: { name: "關西", lat: 34.43, lon: 135.24, tz: 9 }
  },

  // 去程依出發日期分頁；回程只有一筆
  flightDates: ["1/13", "1/14", "1/15", "1/16"],
  flights: [
    { id: "f13", pax: 3, date: "1/13", g: "kyoto", who: "我們 3 人", color: "cyan",
      note: "大邱要入境：領行李、重新託運（轉機 2h40m）",
      legs: [
        { no: "TW664", airline: "德威航空", from: "TPE", fromT: "T1", to: "TAE", dep: "2027-01-13T01:55+08:00", arr: "2027-01-13T05:20+09:00" },
        { no: "TW509", airline: "德威航空", from: "TAE", to: "KIX", toT: "T1", dep: "2027-01-13T08:00+09:00", arr: "2027-01-13T09:30+09:00" }
      ] },
    { id: "f14", pax: 1, date: "1/14", g: "kyoto", who: "京都會合 1 人", color: "purple", note: "約 21:30 到京都站",
      legs: [ { no: "CI176", airline: "中華航空", from: "KHH", to: "KIX", toT: "T1", dep: "2027-01-14T15:25+08:00", arr: "2027-01-14T19:10+09:00" } ] },
    { id: "f15", pax: 2, date: "1/15", g: "osk15", who: "大阪會合 2 人", color: "yellow", note: "",
      legs: [ { no: "IT212", airline: "台灣虎航", from: "TPE", fromT: "T1", to: "KIX", toT: "T1", dep: "2027-01-15T14:40+08:00", arr: "2027-01-15T17:55+09:00" } ] },
    { id: "f16", pax: 2, date: "1/16", g: "osk16", who: "大阪會合 2 人", color: "yellow", note: "",
      legs: [ { no: "IT210", airline: "台灣虎航", from: "TPE", fromT: "T1", to: "KIX", toT: "T1", dep: "2027-01-16T07:00+08:00", arr: "2027-01-16T10:25+09:00" } ] },
    { id: "ret", ret: true, who: "回程・全員", color: "pink", note: "捷星廉航：最晚 12:55 到機場",
      legs: [ { no: "GK055", airline: "捷星日本", from: "KIX", fromT: "T1", to: "TPE", toT: "T1", dep: "2027-01-21T14:55+09:00", arr: "2027-01-21T17:15+08:00" } ] }
  ],

  days: [
    {
      date: "1/13", g: ["kyoto"], dow: "三", icon: "plane", hue: "cyan",
      title: "抵達＋東山散步", stay: "EN HOTEL Kyoto", people: "3 人",
      items: [
        { t: "09:30", type: "move", mode: "飛機", text: "關西機場 T1 入境", note: "紅眼班機，今天排輕鬆" },
        { t: "10:45", type: "move", mode: "JR", text: "HARUKA 關西機場 → 京都", note: "約 75 分；機場 JR 窗口買 ICOCA & HARUKA，單程 ¥2,700" },
        { t: "12:30", type: "food", text: "京都站午餐 → 烏丸線到四條，飯店寄放行李", map: "EN HOTEL Kyoto" },
        { t: "14:00", type: "spot", text: "南禪寺・水路閣 → 哲學之道 → 銀閣寺", close: "銀閣寺 15:30 前到", map: "銀閣寺" },
        { t: "晚上", type: "spot", text: "附近錢湯，早點休息", note: "錢湯約 ¥550" }
      ]
    },
    {
      date: "1/14", g: ["kyoto"], dow: "四", icon: "torii", hue: "pink",
      title: "鞍馬・貴船＋金閣寺", stay: "EN HOTEL Kyoto", people: "3 人",
      items: [
        { t: "08:30", type: "move", mode: "京阪", text: "祇園四條 → 出町柳，轉叡山電車到鞍馬", note: "出町柳到鞍馬約 30 分，¥470" },
        { t: "09:15", type: "spot", text: "鞍馬寺 → 沿山路走到貴船", note: "積雪結冰就改搭電車到貴船口，再轉巴士 33 號", map: "鞍馬寺" },
        { t: "11:30", type: "spot", text: "貴船神社：本宮 → 結社 → 奧宮", close: "冬季 6:00–18:00", map: "貴船神社" },
        { t: "12:30", type: "food", text: "貴船午餐" },
        { t: "14:00", type: "move", mode: "計程車", text: "出町柳 → 金閣寺", note: "也可以搭公車" },
        { t: "15:00", type: "spot", text: "金閣寺", close: "17:00 關門，15:30 前到", map: "金閣寺" },
        { t: "晚上", type: "spot", text: "船岡溫泉", note: "老錢湯，¥550，15:00 開", map: "船岡温泉" },
        { t: "21:30", type: "note", text: "第 4 人到京都站，回飯店會合" }
      ]
    },
    {
      date: "1/15", g: ["kyoto"], dow: "五", icon: "torii2", hue: "purple",
      title: "白鬚神社＋比叡山", stay: "EN HOTEL Kyoto", people: "4 人",
      alt: { osk15: { title: "抵達關西 → 京都", stay: "京都麗嘉皇家酒店", people: "2 人" } },
      items: [
        { t: "08:00", type: "move", mode: "JR", text: "湖西線 京都 → 近江高島", note: "約 1 小時" },
        { t: "09:10", type: "move", mode: "計程車", text: "近江高島站 → 白鬚神社", note: "約 5 分，4 人剛好一台" },
        { t: "09:20", type: "spot", text: "白鬚神社・湖中鳥居", map: "白鬚神社" },
        { t: "10:30", type: "move", mode: "JR", text: "近江高島 → 比叡山坂本，走到坂本纜車站" },
        { t: "12:00", type: "move", mode: "纜車", text: "坂本纜車上山", note: "單程 ¥960；12–2 月首末班停駛" },
        { t: "12:30", type: "spot", text: "延曆寺東塔（根本中堂）＋午餐", close: "東塔 16:00 關", note: "常有積雪，穿防滑的鞋", map: "延暦寺 根本中堂" },
        { t: "15:30", type: "move", mode: "纜車", text: "纜車下山 → JR 回京都", note: "約 17:00 到" },
        { t: "晚上", type: "note", text: "打包，準備明天搬去大阪" },
        { t: "17:55", type: "move", mode: "飛機", text: "IT212 降落關西機場 T1", g: ["osk15"] },
        { t: "18:45", type: "move", mode: "JR", text: "HARUKA 關西機場 → 京都", note: "約 80 分；機場 JR 窗口買 ICOCA & HARUKA，單程 ¥2,700", g: ["osk15"] },
        { t: "20:15", type: "spot", text: "入住京都麗嘉皇家酒店", note: "京都站中央口走路約 7 分", close: "有些方案 20:30 截止入住，晚到先通知飯店", map: "リーガロイヤルホテル京都", g: ["osk15"] },
        { t: "晚上", type: "food", text: "京都站周邊晚餐（拉麵小路、Porta 地下街）", g: ["osk15"], map: "京都駅 拉麺小路" }
      ]
    },
    {
      date: "1/16", dow: "六", icon: "boat", hue: "cyan",
      title: "保津川遊船 → 搬去大阪", stay: "大阪 九条南", people: "4 人 → 全員",
      alt: { osk15: { title: "保津川遊船 → 搬去大阪", people: "6 人 → 全員" }, osk16: { title: "抵達大阪 → 全員會合", people: "2 人 → 全員" } },
      items: [
        { t: "08:15", type: "move", mode: "JR", text: "退房 → 京都站轉嵯峨野線到龜岡", note: "龜岡站走 8 分到乘船處", g: ["kyoto"] },
        { t: "上午", type: "spot", text: "大阪市區自由行動（黑門市場、心齋橋）", note: "行李先寄放住處或難波站置物櫃", g: ["osk15"] },
        { t: "10:25", type: "move", mode: "飛機", text: "IT210 降落關西 T1 → 南海到難波", note: "可以先跟 1/15 大阪組會合", g: ["osk16"] },
        { t: "12:00", type: "food", text: "跟 1/15 大阪組會合，難波午餐", g: ["osk15", "osk16"] },
        { t: "14:30", type: "move", mode: "阪神", text: "大阪難波 → 九條，到住宿", note: "約 5 分", g: ["osk15", "osk16"] },
        { t: "—", type: "note", text: "行李怎麼處理？宅急便寄大阪，或寄放京都站置物櫃", tbd: true, g: ["kyoto"] },
        { t: "10:00", type: "spot", text: "保津川遊船（約 2 小時，到嵐山）", note: "冬季暖桌船，¥6,000，要預約", close: "冬季 10:00–14:30 開船", map: "保津川下り 乗船場", g: ["kyoto"] },
        { t: "12:00", type: "food", text: "嵐山午餐 → 竹林小徑、渡月橋", map: "嵐山 竹林の小径", g: ["kyoto"] },
        { t: "13:15", type: "move", mode: "阪急", text: "嵐山 → 桂 → 大阪梅田 → 九條", note: "約 1 小時 15 分", g: ["kyoto"] },
        { t: "15:00", type: "spot", text: "全員在大阪住宿會合、入住", people: "8 人", map: "大阪市西区九条南1-5-2" },
        { t: "晚上", type: "food", text: "8 人道頓堀晚餐（先訂位）→ 柏青哥初體驗", note: "明天 5 點要出門，別玩太晚" }
      ]
    },
    {
      date: "1/17", dow: "日", icon: "fox", hue: "pink",
      title: "清水日出 → 稻荷 → 競馬場 → 宇治", stay: "大阪 九条南", people: "8 人",
      items: [
        { t: "05:00", type: "move", mode: "地鐵", text: "九條 → 京阪首班車到清水五条", note: "出發前查 1/17 週日首班車；備案是 2 台計程車", tbd: true },
        { t: "06:45", type: "spot", text: "清水寺看日出（約 07:05）", note: "¥500", map: "清水寺" },
        { t: "07:30", type: "spot", text: "三年坂、二年坂 → 八坂神社", note: "店還沒開，街景沒有人", map: "八坂神社" },
        { t: "08:45", type: "move", mode: "京阪", text: "祇園四條 → 伏見稻荷", note: "約 10 分" },
        { t: "09:00", type: "spot", text: "伏見稻荷：千本鳥居走到四辻＋午餐", note: "來回約 1.5 小時", map: "伏見稲荷大社" },
        { t: "12:50", type: "move", mode: "京阪", text: "伏見稻荷 → 淀", note: "約 20 分，淀站直通競馬場" },
        { t: "13:30", type: "spot", text: "京都競馬場", note: "19 歲可入場，但不能買馬券", map: "京都競馬場" },
        { t: "15:40", type: "move", mode: "京阪", text: "淀 → 中書島 → 宇治", note: "約 30 分" },
        { t: "16:30", type: "spot", text: "平等院", close: "庭園最後入場 17:15", note: "¥700", map: "平等院" },
        { t: "17:30", type: "food", text: "宇治晚餐（抹茶甜點、茶蕎麥）" },
        { t: "18:45", type: "move", mode: "京阪", text: "宇治 → 中書島 → 淀屋橋 → 回九條", note: "這天買京阪＋大阪地鐵一日券 ¥2,160" }
      ]
    },
    {
      date: "1/18", dow: "一", icon: "deer", hue: "yellow",
      title: "奈良＋新世界溫泉", stay: "大阪 九条南", people: "8 人",
      items: [
        { t: "09:00", type: "move", mode: "阪神", text: "九條 → 近鐵奈良（直通）", note: "約 50 分" },
        { t: "09:50", type: "spot", text: "奈良公園餵鹿 → 東大寺大佛殿 → 二月堂 → 春日大社", close: "大佛殿 8:00–17:00", note: "大佛殿 ¥800", map: "東大寺 大仏殿" },
        { t: "13:00", type: "food", text: "奈良町午餐（麺闘庵 巾著狐烏龍麵）", note: "週一 11:00–15:00，早點登記候位", map: "麺闘庵 奈良" },
        { t: "15:00", type: "move", mode: "近鐵", text: "回大阪" },
        { t: "16:30", type: "spot", text: "Spa World 世界大溫泉（新今宮）", note: "平日約 ¥2,000", map: "スパワールド" },
        { t: "19:00", type: "food", text: "新世界・通天閣吃串炸", map: "新世界 通天閣" }
      ]
    },
    {
      date: "1/19", dow: "二", icon: "ninja", hue: "purple",
      title: "大阪城＋動漫＋忍者", stay: "大阪 九条南", people: "8 人",
      items: [
        { t: "10:00", type: "spot", text: "大阪城公園", note: "天守閣 ¥1,200；中央線九條到森之宮附近", map: "大阪城天守閣" },
        { t: "12:30", type: "spot", text: "心齋橋：寶可夢中心、まんだらけ", map: "ポケモンセンターオーサカDX" },
        { t: "14:30", type: "spot", text: "忍者體驗（道頓堀）", note: "約 ¥6,600／人，要預約", tbd: true },
        { t: "16:30", type: "spot", text: "日本橋オタロード：Animate、駿河屋、扭蛋", map: "オタロード 日本橋" },
        { t: "19:00", type: "food", text: "道頓堀晚餐 → 柏青哥" }
      ]
    },
    {
      date: "1/20", dow: "三", icon: "fall", hue: "cyan",
      title: "箕面瀑布＋梅田", stay: "大阪 九条南", people: "8 人",
      items: [
        { t: "—", type: "note", text: "滑雪（琵琶湖 Valley）要不要排在這天？", tbd: true },
        { t: "09:30", type: "move", mode: "阪急", text: "大阪梅田 → 箕面", note: "約 30 分" },
        { t: "10:15", type: "spot", text: "溪谷步道走到箕面大瀑布", note: "單程約 40 分，沿路吃炸楓葉", map: "箕面大滝" },
        { t: "13:30", type: "spot", text: "梅田：寶可夢中心、Nintendo OSAKA（大丸 13F）", close: "10:00–20:00", map: "Nintendo OSAKA" },
        { t: "16:30", type: "spot", text: "梅田藍天大廈空中庭園看夕陽", note: "¥2,000；日落約 17:15", map: "梅田スカイビル 空中庭園" },
        { t: "晚上", type: "note", text: "自由：柏青哥第二輪、打包" }
      ]
    },
    {
      date: "1/21", dow: "四", icon: "plane2", hue: "pink",
      title: "回國", stay: "—", people: "8 人",
      items: [
        { t: "08:30", type: "food", text: "住宿附近早餐", tbd: true },
        { t: "10:00", type: "note", text: "退房，8 人帶行李集合" },
        { t: "10:45", type: "move", mode: "阪神", text: "ドーム前 → 大阪難波，轉南海空港急行", note: "約 1 小時 5–15 分；備案：長堀鶴見綠地線到大正轉 JR 關空快速" },
        { t: "12:00", type: "move", mode: "飛機", text: "關西機場 T1 報到", close: "最晚 12:55 到" },
        { t: "14:55", type: "move", mode: "飛機", text: "GK055 → 桃園 T1 17:15" }
      ]
    }
  ],

  todo: [
    { id: "keta", text: "K-ETA：12 月底看韓國是否延長豁免，沒延長最晚 1/9 申請（我們 3 人）" },
    { id: "earrival", text: "免 K-ETA 入境的人填韓國電子入境卡（e-Arrival Card）" },
    { id: "transfer", text: "確認大邱轉機：兩段分開買，延誤有沒有保障" },
    { id: "vjw", text: "填 Visit Japan Web（入境日本）" },
    { id: "hozu", text: "預約 1/16 保津川遊船" },
    { id: "ninja", text: "預約 1/19 忍者體驗" },
    { id: "dinner", text: "訂 1/16 晚上 8 人晚餐" },
    { id: "firsttrain", text: "查 1/17 週日首班車時刻" },
    { id: "student", text: "帶學生證（EN HOTEL 入住要出示）" },
    { id: "checkin", text: "GK055 網路報到" },
    { id: "taxrefund", text: "日本 11/1 起退稅新制：買東西先付含稅價，1/21 在機場安檢前給海關看商品才退稅；退稅品先別拆、別託運，當天提早到機場" },
    { id: "safetyapp", text: "手機裝 Safety tips（日本觀光局官方 App，地震、海嘯警報有中文推播）" },
    { id: "sos", text: "在主頁「工具箱 → 緊急求助」填好旅平險、信用卡掛失電話" }
  ],
  // 已經在用網站的人，清單存在自己手機；這裡列的項目會補進去一次（刪掉後不會再出現）
  LIST_ADDS: [
    { id: "taxrefund", list: "todo" }, { id: "safetyapp", list: "todo" }, { id: "sos", list: "todo" }
  ],

  shopping: [
    { id: "icoca", text: "ICOCA & HARUKA（關西機場 JR 窗口）" },
    { id: "keihan", text: "京阪＋大阪地鐵一日券（1/17 用）" },
    { id: "yen", text: "日圓現金（屋台、錢湯常只收現金）" },
    { id: "esim", text: "日本網卡或 eSIM" },
    { id: "shoes", text: "防滑的鞋（比叡山、鞍馬可能積雪）" }
  ],

  // 給司機看的目的地（住宿以外）
  taxi: [
    { label: "關西機場 第 1 航廈", name: "関西国際空港 第1ターミナル", zip: "〒549-0001", addr: "大阪府泉南郡田尻町泉州空港中1", note: "国際線の出発ロビー（4階）までお願いします" }
  ],

  stays: [
    // nights：住哪幾晚（主頁「回住宿」會照今天日期挑）；g：只給某組住，沒填＝所有組
    { name: "EN HOTEL Kyoto", date: "1/13 – 1/16", nights: ["1/13", "1/14", "1/15"], g: ["kyoto"], addr: "京都市下京區西洞院通四条下ル妙伝寺町 698", station: "烏丸線「四條」、阪急「烏丸」走路約 6 分", time: "15:00 入住／10:00 退房，可寄放行李", extra: "入住要出示學生證", map: "EN HOTEL Kyoto",
      ja: { name: "EN HOTEL Kyoto（エン ホテル 京都）", zip: "〒600-8472", addr: "京都府京都市下京区西洞院通四条南入ル妙伝寺町698", note: "四条西洞院のバス停の近くです", tel: "" } },
    { name: "京都麗嘉皇家酒店（1/15 大阪組）", date: "1/15 – 1/16", nights: ["1/15"], g: ["osk15"], addr: "京都市下京區東堀川通塩小路下ル松明町 1", station: "JR 京都站中央口走路約 7 分；八条口有免費接駁車（約每 20 分一班，京都站發 9:10–19:10）", time: "14:00 入住／11:00 退房", extra: "", map: "リーガロイヤルホテル京都",
      ja: { name: "リーガロイヤルホテル京都", zip: "〒600-8237", addr: "京都府京都市下京区東堀川通塩小路下ル松明町1番地", note: "京都駅から歩いて7分ほどです", tel: "075-341-1121" } },
    { name: "大阪 九条南", date: "1/16 – 1/21", nights: ["1/16", "1/17", "1/18", "1/19", "1/20"], addr: "大阪市西區九条南 1-5-2", station: "阪神「ドーム前」「九條」走路 3–4 分；長堀鶴見綠地線「ドーム前千代崎」約 5 分", time: "入住時間待確認", extra: "", map: "大阪市西区九条南1-5-2",
      ja: { name: "宿泊先（民泊）", zip: "〒550-0025", addr: "大阪府大阪市西区九条南1丁目5-2", note: "京セラドーム大阪の北側です", tel: "" } }
  ]
};
