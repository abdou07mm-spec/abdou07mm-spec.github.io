// ═══════════════════════════════════════════════════════════════
//  NEXORA DZ — Google Apps Script
//  الصقه في محرر Apps Script داخل Google Sheets الخاص بك
//  Extensions → Apps Script → الصق هذا الكود → Deploy → Web App
// ═══════════════════════════════════════════════════════════════

const SHEET_NAME = 'التسجيلات'; // اسم ورقة البيانات

const HEADERS = [
  'التاريخ والوقت',
  'الاسم',
  'اللقب',
  'رقم بطاقة التعريف',
  'تاريخ الازدياد',
  'مكان الازدياد',
  'الولاية',
  'البلدية / الدائرة',
  'المستوى الدراسي',
  'رقم الهاتف',
  'البريد الإلكتروني',
  'اللجنة المختارة',
  'المهارات',
  'مهارات أخرى',
  'دوافع الانضمام',
];

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length)
         .setBackground('#1a6b3c')
         .setFontColor('#ffffff')
         .setFontWeight('bold')
         .setHorizontalAlignment('center');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function doPost(e) {
  try {
    const p = e.parameter;
    const sheet = getOrCreateSheet();

    sheet.appendRow([
      new Date(),
      p.firstName    || '',
      p.lastName     || '',
      p.idNumber     || '',
      p.birthDate    || '',
      p.birthPlace   || '',
      p.wilaya       || '',
      p.daira        || '',
      p.education    || '',
      p.phone        || '',
      p.email        || '',
      p.committee    || '',
      p.skills       || '',
      p.otherSkills  || '',
      p.motivation   || '',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'NEXORA DZ Script is running ✓' }))
    .setMimeType(ContentService.MimeType.JSON);
}
