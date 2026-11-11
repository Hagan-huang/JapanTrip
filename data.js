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
  updated: "2026-11-11",

  // 共用帳本：Google Apps Script 部署後的網址（設定步驟見 README）
  SHEET_URL: "",

  // 首頁背景圖：Gemini 畫好後放到 images/ 資料夾，填檔名，例如 "images/hero.jpg"
  HERO_IMAGE: "images/hero.jpg",

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
    { date: "1/13", who: "我們 3 人", color: "cyan",
      note: "大邱要入境：領行李、重新託運（轉機 2h40m）",
      legs: [
        { no: "TW664", airline: "德威航空", from: "TPE", fromT: "T1", to: "TAE", dep: "2027-01-13T01:55+08:00", arr: "2027-01-13T05:20+09:00" },
        { no: "TW509", airline: "德威航空", from: "TAE", to: "KIX", toT: "T1", dep: "2027-01-13T08:00+09:00", arr: "2027-01-13T09:30+09:00" }
      ] },
    { date: "1/14", who: "京都會合 1 人", color: "purple", note: "約 21:30 到京都站",
      legs: [ { no: "CI176", airline: "中華航空", from: "KHH", to: "KIX", toT: "T1", dep: "2027-01-14T15:25+08:00", arr: "2027-01-14T19:10+09:00" } ] },
    { date: "1/15", who: "大阪會合（1/15）", color: "yellow", note: "",
      legs: [ { no: "IT212", airline: "台灣虎航", from: "TPE", fromT: "T1", to: "KIX", toT: "T1", dep: "2027-01-15T14:40+08:00", arr: "2027-01-15T17:55+09:00" } ] },
    { date: "1/16", who: "大阪會合（1/16）", color: "yellow", note: "",
      legs: [ { no: "IT210", airline: "台灣虎航", from: "TPE", fromT: "T1", to: "KIX", toT: "T1", dep: "2027-01-16T07:00+08:00", arr: "2027-01-16T10:25+09:00" } ] },
    { ret: true, who: "回程・全員", color: "pink", note: "捷星廉航：最晚 12:55 到機場",
      legs: [ { no: "GK055", airline: "捷星日本", from: "KIX", fromT: "T1", to: "TPE", toT: "T1", dep: "2027-01-21T14:55+09:00", arr: "2027-01-21T17:15+08:00" } ] }
  ],

  days: [
    {
      date: "1/13", dow: "三", icon: "plane", hue: "cyan",
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
      date: "1/14", dow: "四", icon: "torii", hue: "pink",
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
      date: "1/15", dow: "五", icon: "torii2", hue: "purple",
      title: "白鬚神社＋比叡山", stay: "EN HOTEL Kyoto", people: "4 人",
      items: [
        { t: "08:00", type: "move", mode: "JR", text: "湖西線 京都 → 近江高島", note: "約 1 小時" },
        { t: "09:10", type: "move", mode: "計程車", text: "近江高島站 → 白鬚神社", note: "約 5 分，4 人剛好一台" },
        { t: "09:20", type: "spot", text: "白鬚神社・湖中鳥居", map: "白鬚神社" },
        { t: "10:30", type: "move", mode: "JR", text: "近江高島 → 比叡山坂本，走到坂本纜車站" },
        { t: "12:00", type: "move", mode: "纜車", text: "坂本纜車上山", note: "單程 ¥960；12–2 月首末班停駛" },
        { t: "12:30", type: "spot", text: "延曆寺東塔（根本中堂）＋午餐", close: "東塔 16:00 關", note: "常有積雪，穿防滑的鞋", map: "延暦寺 根本中堂" },
        { t: "15:30", type: "move", mode: "纜車", text: "纜車下山 → JR 回京都", note: "約 17:00 到" },
        { t: "晚上", type: "note", text: "打包，準備明天搬去大阪" }
      ]
    },
    {
      date: "1/16", dow: "六", icon: "boat", hue: "cyan",
      title: "保津川遊船 → 搬去大阪", stay: "大阪 九条南", people: "4 人 → 全員",
      items: [
        { t: "08:15", type: "move", mode: "JR", text: "退房 → 京都站轉嵯峨野線到龜岡", note: "龜岡站走 8 分到乘船處" },
        { t: "—", type: "note", text: "行李怎麼處理？宅急便寄大阪，或寄放京都站置物櫃", tbd: true },
        { t: "10:00", type: "spot", text: "保津川遊船（約 2 小時，到嵐山）", note: "冬季暖桌船，¥6,000，要預約", close: "冬季 10:00–14:30 開船", map: "保津川下り 乗船場" },
        { t: "12:00", type: "food", text: "嵐山午餐 → 竹林小徑、渡月橋", map: "嵐山 竹林の小径" },
        { t: "13:15", type: "move", mode: "阪急", text: "嵐山 → 桂 → 大阪梅田 → 九條", note: "約 1 小時 15 分" },
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
    { id: "checkin", text: "GK055 網路報到" }
  ],

  shopping: [
    { id: "icoca", text: "ICOCA & HARUKA（關西機場 JR 窗口）" },
    { id: "keihan", text: "京阪＋大阪地鐵一日券（1/17 用）" },
    { id: "yen", text: "日圓現金（屋台、錢湯常只收現金）" },
    { id: "esim", text: "日本網卡或 eSIM" },
    { id: "shoes", text: "防滑的鞋（比叡山、鞍馬可能積雪）" }
  ],

  stays: [
    { name: "EN HOTEL Kyoto", date: "1/13 – 1/16", addr: "京都市下京區西洞院通四条下ル妙伝寺町 698", station: "烏丸線「四條」、阪急「烏丸」走路約 6 分", time: "15:00 入住／10:00 退房，可寄放行李", extra: "入住要出示學生證", map: "EN HOTEL Kyoto" },
    { name: "大阪 九条南", date: "1/16 – 1/21", addr: "大阪市西區九条南 1-5-2", station: "阪神「ドーム前」「九條」走路 3–4 分；長堀鶴見綠地線「ドーム前千代崎」約 5 分", time: "入住時間待確認", extra: "", map: "大阪市西区九条南1-5-2" }
  ]
};
