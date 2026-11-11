/**
 * 京都大阪行程網頁：共用分帳後端（Google Apps Script）
 * 把這整份貼到 Google 試算表的「擴充功能 → Apps Script」，
 * 改好下面的團體密碼，再部署成網頁應用程式。
 * 注意：這份放在公開的 GitHub 上，真正的密碼只改在 Apps Script 裡，不要改這個檔案。
 */
const PASSWORD = '請改成你們的團體密碼';

const MEMBERS = '成員';
const RECORDS = '分帳紀錄';
const REC_HEAD = ['id', '日期', '付款人', '金額', '幣別', '分類', '備註', '分給誰(JSON)', '記帳人', '記帳時間', '已刪除'];

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
      case 'join': return out(join_(b.name));
      case 'add': return out(add_(b.rec));
      case 'delete': return out(del_(b.id, b.by));
      case 'rename': return out(rename_(b.from, b.to));
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
  if (!sh) { sh = ss.insertSheet(name); sh.appendRow(head); sh.setFrozenRows(1); }
  return sh;
}
const membersSheet_ = () => sheet_(MEMBERS, ['暱稱', '加入時間']);
const recordsSheet_ = () => sheet_(RECORDS, REC_HEAD);

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
  return { ok: true, members: members_(), records: records };
}

function join_(name) {
  name = String(name || '').trim().slice(0, 12);
  if (!name) return { ok: false, error: '暱稱不能空白' };
  const exists = members_().indexOf(name) >= 0;
  if (!exists) membersSheet_().appendRow([name, new Date()]);
  return { ok: true, exists: exists };
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

function rename_(from, to) {
  to = String(to || '').trim().slice(0, 12);
  if (!to) return { ok: false, error: '暱稱不能空白' };
  if (members_().indexOf(to) >= 0) return { ok: false, error: '這個名字已經有人用了' };
  const ms = membersSheet_(), mv = ms.getDataRange().getValues();
  for (let i = 1; i < mv.length; i++) if (String(mv[i][0]) === from) ms.getRange(i + 1, 1).setValue(to);
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
