/**
 * Menu Studio · shared saving (Google Apps Script)
 * The Mangroves Abu Dhabi, LXR Hotels & Resorts
 *
 * Keeps the latest version of every menu in a Google Sheet, so all of the F&B team
 * continue from the same saved menu, and keeps every saved version so any earlier
 * version can be restored.
 *
 * Setup (once): see shared-saving/SETUP.md
 */

// ▼▼ Change this to the passcode you give the F&B team (they type it once per browser). ▼▼
const TEAM_PASSCODE = 'change-me';

const CHUNK = 45000;          // Google Sheets allows 50,000 characters per cell
const MENUS = 'Menus';        // latest version of each menu
const HISTORY = 'History';    // every saved version

function doGet(e) {
  const p = e.parameter || {};
  try {
    if (p.action === 'list') return out({ ok: true, menus: listMenus() });
    if (p.action === 'history') return out({ ok: true, versions: history(p.id) });
    if (p.action === 'version') return out({ ok: true, version: version(p.id, Number(p.rev)) });
    if (p.action === 'ping') return out({ ok: true });
    return out({ ok: false, error: 'Unknown action' });
  } catch (err) {
    return out({ ok: false, error: String(err) });
  }
}

function doPost(e) {
  let body;
  try { body = JSON.parse(e.postData.contents); } catch (err) { return out({ ok: false, error: 'Bad request' }); }
  if (body.key !== TEAM_PASSCODE) return out({ ok: false, error: 'passcode' });
  if (body.action === 'check') return out({ ok: true });
  if (body.action !== 'save') return out({ ok: false, error: 'Unknown action' });

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sh = sheet(MENUS);
    const row = findRow(sh, body.id);
    const current = row ? readRow(sh, row) : null;
    const curRev = current ? current.rev : 0;
    if (!body.force && Number(body.base || 0) !== curRev) {
      return out({ ok: false, error: 'conflict', current: current });
    }
    const rev = curRev + 1, at = new Date().toISOString(), by = String(body.by || '').slice(0, 60);
    const data = JSON.stringify(body.data);
    writeRow(sh, row || sh.getLastRow() + 1, [body.id, rev, at, by], data);
    writeRow(sheet(HISTORY), sheet(HISTORY).getLastRow() + 1, [body.id, rev, at, by], data);
    return out({ ok: true, rev: rev, at: at, by: by });
  } finally {
    lock.releaseLock();
  }
}

/* ---------- helpers ---------- */
function out(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

function book() {
  const props = PropertiesService.getScriptProperties();
  let id = props.getProperty('SHEET_ID');
  if (id) return SpreadsheetApp.openById(id);
  const ss = SpreadsheetApp.create('Menu Studio · shared saves (do not edit)');
  props.setProperty('SHEET_ID', ss.getId());
  ss.getSheets()[0].setName(MENUS);
  ss.insertSheet(HISTORY);
  [MENUS, HISTORY].forEach(n => ss.getSheetByName(n).appendRow(['menu', 'version', 'saved at', 'saved by', 'parts', 'data…']));
  return ss;
}

function sheet(name) { return book().getSheetByName(name); }

function findRow(sh, id) {
  const n = sh.getLastRow();
  if (n < 2) return 0;
  const ids = sh.getRange(2, 1, n - 1, 1).getValues();
  for (let i = 0; i < ids.length; i++) if (ids[i][0] === id) return i + 2;
  return 0;
}

function writeRow(sh, r, meta, data) {
  const parts = [];
  for (let i = 0; i < data.length; i += CHUNK) parts.push(data.slice(i, i + CHUNK));
  const old = sh.getLastColumn();
  if (old > 5 + parts.length) sh.getRange(r, 6 + parts.length, 1, old - 5 - parts.length).clearContent();
  // the leading apostrophe stops Sheets from reading a chunk as a formula or number
  sh.getRange(r, 1, 1, 5 + parts.length).setValues([meta.concat([parts.length], parts.map(s => "'" + s))]);
}

function readRow(sh, r, withData) {
  const w = sh.getLastColumn();
  const v = sh.getRange(r, 1, 1, w).getValues()[0];
  const o = { id: v[0], rev: Number(v[1]), at: v[2] instanceof Date ? v[2].toISOString() : String(v[2]), by: v[3] };
  if (withData !== false) o.data = JSON.parse(v.slice(5, 5 + Number(v[4])).join(''));
  return o;
}

function listMenus() {
  const sh = sheet(MENUS), n = sh.getLastRow(), res = [];
  for (let r = 2; r <= n; r++) res.push(readRow(sh, r));
  return res;
}

function history(id) {
  const sh = sheet(HISTORY), n = sh.getLastRow();
  if (n < 2) return [];
  const v = sh.getRange(2, 1, n - 1, 4).getValues(), res = [];
  for (let i = v.length - 1; i >= 0 && res.length < 50; i--) {
    if (v[i][0] === id) res.push({ rev: Number(v[i][1]), at: v[i][2] instanceof Date ? v[i][2].toISOString() : String(v[i][2]), by: v[i][3] });
  }
  return res;
}

function version(id, rev) {
  const sh = sheet(HISTORY), n = sh.getLastRow();
  const v = sh.getRange(2, 1, n - 1, 2).getValues();
  for (let i = v.length - 1; i >= 0; i--) if (v[i][0] === id && Number(v[i][1]) === rev) return readRow(sh, i + 2);
  return null;
}

/** Run this once from the editor (▶ Run) to create the Google Sheet and grant permissions. */
function setup() {
  const ss = book();
  Logger.log('Shared saves sheet: ' + ss.getUrl());
}
