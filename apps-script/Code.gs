/**
 * 京都大阪行程網頁：共用分帳＋帳號同步後端（Google Apps Script）
 * 把這整份貼到 Google 試算表的「擴充功能 → Apps Script」，
 * 改好下面的團體密碼，再部署成網頁應用程式。
 * 注意：這份放在公開的 GitHub 上，真正的密碼只改在 Apps Script 裡，不要改這個檔案。
 */
const PASSWORD = '請改成你們的團體密碼';

const MEMBERS = '成員';
const RECORDS = '分帳紀錄';
const USERDATA = '個人資料';
const REC_HEAD = ['id', '日期', '付款人', '金額', '幣別', '分類', '備註', '分給誰(JSON)', '記帳人', '記帳時間', '已刪除'];
const MEM_HEAD = ['暱稱', '加入時間', '航班', '個人密碼(雜湊)'];
const CHUNK = 45000; // 一格最多約 5 萬字，個人資料太長時分好幾格存

function doGet(e) {
  const p = e.parameter || {};
  if (p.key !== PASSWORD) return out({ ok: false, error: '密碼錯誤' });
  if (p.action === 'list') return out(list_());
  return out({ ok: false, error: 'unknown action' });
}

function doPost(e) {
  let b;
  try { b = JSON.parse(e.postData.contents); } catch (err) { return out({ ok: false, error: 'bad json' }); }
  if (b.key !== PASSWORD) return out({ ok: false, error: '密碼錯誤' });
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    switch (b.action) {
      case 'join': return out(join_(b.name, b.pin));
      case 'getMe': return out(getMe_(b.name, b.pin));
      case 'saveMe': return out(saveMe_(b.name, b.pin, b.data));
      case 'add': return out(add_(b.rec));
      case 'delete': return out(del_(b.id, b.by));
      case 'rename': return out(rename_(b.from, b.to, b.pin));
      case 'setFlight': return out(setFlight_(b.name, b.flight, b.pin));
      default: return out({ ok: false, error: 'unknown action' });
    }
  } finally {
    lock.releaseLock();
  }
}

function out(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function sheet_(name, head) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(name);
  if (!sh) { sh = ss.insertSheet(name); sh.appendRow(head); sh.setFrozenRows(1); return sh; }
  // 舊版表頭比較短時補上新欄位
  const cur = sh.getRange(1, 1, 1, head.length).getValues()[0];
  head.forEach((h, i) => { if (!cur[i]) sh.getRange(1, i + 1).setValue(h); });
  return sh;
}
const membersSheet_ = () => sheet_(MEMBERS, MEM_HEAD);
const recordsSheet_ = () => sheet_(RECORDS, REC_HEAD);
const userSheet_ = () => sheet_(USERDATA, ['暱稱', '更新時間', '資料(JSON)']);

function hash_(name, pin) {
  const raw = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(name) + '|' + String(pin) + '|kansai2027', Utilities.Charset.UTF_8);
  return Utilities.base64Encode(raw);
}
function findRow_(sh, name) {
  const v = sh.getRange(1, 1, Math.max(sh.getLastRow(), 1), 1).getValues();
  for (let i = 1; i < v.length; i++) if (String(v[i][0]) === String(name)) return i + 1;
  return 0;
}
// 驗證暱稱＋個人密碼，回傳成員所在列（0 代表失敗）
function auth_(name, pin) {
  const sh = membersSheet_(), row = findRow_(sh, name);
  if (!row || !pin) return 0;
  return sh.getRange(row, 4).getValue() === hash_(name, pin) ? row : 0;
}

function members_() {
  const v = membersSheet_().getDataRange().getValues().slice(1);
  return v.map(r => String(r[0])).filter(Boolean);
}

function list_() {
  const rows = recordsSheet_().getDataRange().getValues().slice(1);
  const records = rows.filter(r => r[0] && r[10] !== true).map(r => {
    let split = {};
    try { split = JSON.parse(r[7] || '{}'); } catch (e) {}
    const d = r[1] instanceof Date ? Utilities.formatDate(r[1], 'Asia/Tokyo', 'yyyy-MM-dd') : String(r[1]);
    return { id: String(r[0]), date: d, payer: String(r[2]), amount: Number(r[3]), currency: String(r[4]), category: String(r[5]), note: String(r[6]), split: split, createdBy: String(r[8]), createdAt: Number(r[9]) || 0 };
  });
  const flights = {};
  membersSheet_().getDataRange().getValues().slice(1).forEach(r => { if (r[0] && r[2]) flights[String(r[0])] = String(r[2]); });
  return { ok: true, members: members_(), records: records, flights: flights };
}

function join_(name, pin) {
  name = String(name || '').trim().slice(0, 12);
  pin = String(pin || '').trim();
  if (!name) return { ok: false, error: '暱稱不能空白' };
  if (pin.length < 4) return { ok: false, error: '個人密碼至少 4 個字' };
  const sh = membersSheet_(), row = findRow_(sh, name);
  if (!row) { sh.appendRow([name, new Date(), '', hash_(name, pin)]); return { ok: true, exists: false, data: null }; }
  const saved = sh.getRange(row, 4).getValue();
  if (!saved) sh.getRange(row, 4).setValue(hash_(name, pin)); // 舊帳號第一次設定個人密碼
  else if (saved !== hash_(name, pin)) return { ok: false, error: '個人密碼錯誤（這個暱稱已經有人用了）' };
  return { ok: true, exists: true, data: readData_(name) };
}

function readData_(name) {
  const sh = userSheet_(), row = findRow_(sh, name);
  if (!row) return null;
  const vals = sh.getRange(row, 3, 1, Math.max(sh.getLastColumn() - 2, 1)).getValues()[0];
  const json = vals.map(String).join('');
  try { return json ? JSON.parse(json) : null; } catch (e) { return null; }
}

function getMe_(name, pin) {
  if (!auth_(name, pin)) return { ok: false, error: '個人密碼錯誤' };
  return { ok: true, data: readData_(name) };
}

function saveMe_(name, pin, data) {
  if (!auth_(name, pin)) return { ok: false, error: '個人密碼錯誤' };
  const sh = userSheet_(), json = JSON.stringify(data || {}), parts = [];
  for (let i = 0; i < json.length; i += CHUNK) parts.push(json.slice(i, i + CHUNK));
  let row = findRow_(sh, name);
  if (!row) { sh.appendRow([name]); row = sh.getLastRow(); }
  const width = Math.max(sh.getLastColumn() - 2, parts.length, 1);
  const cells = []; for (let i = 0; i < width; i++) cells.push(parts[i] || '');
  sh.getRange(row, 2).setValue(new Date());
  sh.getRange(row, 3, 1, width).setNumberFormat('@').setValues([cells]);
  return { ok: true };
}

function add_(rec) {
  if (!rec || !rec.id) return { ok: false, error: '資料不完整' };
  const sh = recordsSheet_();
  const ids = sh.getRange(1, 1, sh.getLastRow(), 1).getValues().map(r => String(r[0]));
  if (ids.indexOf(String(rec.id)) >= 0) return { ok: true, dup: true }; // 離線重送時不會重複
  sh.appendRow([rec.id, "'" + rec.date, rec.payer, rec.amount, rec.currency, rec.category, rec.note || '', JSON.stringify(rec.split || {}), rec.createdBy, rec.createdAt || Date.now(), false]);
  return { ok: true };
}

function del_(id, by) {
  const sh = recordsSheet_();
  const v = sh.getDataRange().getValues();
  for (let i = 1; i < v.length; i++) {
    if (String(v[i][0]) === String(id)) {
      if (String(v[i][8]) !== String(by)) return { ok: false, error: '只有記帳的人可以刪除' };
      sh.getRange(i + 1, 11).setValue(true);
      return { ok: true };
    }
  }
  return { ok: true };
}

function setFlight_(name, flight, pin) {
  const row = auth_(name, pin);
  if (!row) return { ok: false, error: '請重新登入' };
  membersSheet_().getRange(row, 3).setValue(String(flight || ''));
  return { ok: true };
}

function rename_(from, to, pin) {
  to = String(to || '').trim().slice(0, 12);
  if (!to) return { ok: false, error: '暱稱不能空白' };
  const row = auth_(from, pin);
  if (!row) return { ok: false, error: '請重新登入' };
  if (members_().indexOf(to) >= 0) return { ok: false, error: '這個名字已經有人用了' };
  const ms = membersSheet_();
  ms.getRange(row, 1).setValue(to);
  ms.getRange(row, 4).setValue(hash_(to, pin)); // 密碼雜湊跟名字綁在一起，要一起更新
  const us = userSheet_(), urow = findRow_(us, from);
  if (urow) us.getRange(urow, 1).setValue(to);
  const rs = recordsSheet_(), rv = rs.getDataRange().getValues();
  for (let i = 1; i < rv.length; i++) {
    let changed = false;
    if (String(rv[i][2]) === from) { rv[i][2] = to; changed = true; }
    if (String(rv[i][8]) === from) { rv[i][8] = to; changed = true; }
    let split = {};
    try { split = JSON.parse(rv[i][7] || '{}'); } catch (e) {}
    if (from in split) { split[to] = split[from]; delete split[from]; rv[i][7] = JSON.stringify(split); changed = true; }
    if (changed) rs.getRange(i + 1, 1, 1, rv[i].length).setValues([rv[i]]);
  }
  return { ok: true };
}
