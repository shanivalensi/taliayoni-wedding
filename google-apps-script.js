// ══════════════════════════════════════════════════════════════════
//  TALIA & YONI WEDDING — Google Apps Script RSVP Handler
//
//  SETUP INSTRUCTIONS:
//  1. Go to script.google.com → New Project
//  2. Paste this entire file contents
//  3. Replace SHEET_ID below with your actual Google Sheet ID
//  4. Run → doGet(e) once to authorize permissions
//  5. Deploy → New deployment → Web app
//       Execute as: Me
//       Who has access: Anyone
//  6. Copy the deployment URL → paste into index.html as GOOGLE_SCRIPT_URL
// ══════════════════════════════════════════════════════════════════

const SHEET_ID = "YOUR_GOOGLE_SHEET_ID_HERE"; // ← replace this
const SHEET_NAME = "RSVP";                     // tab name (will be created if missing)

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getOrCreateSheet();

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", "Language", "Nom / שם", "Prénom / שם משפחה",
        "Présent Houppa", "Nb Personnes", "Bus Raanana", "Message"
      ]);
    }

    sheet.appendRow([
      new Date().toISOString(),
      data.lang       || "",
      data.lastName   || "",
      data.firstName  || "",
      data.attending  || "",
      data.guests     || "",
      data.bus        || "",
      data.message    || ""
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

function getOrCreateSheet() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  return sheet;
}

// Test helper — run this once to verify everything works
function testInsert() {
  doPost({
    postData: {
      contents: JSON.stringify({
        lang: "fr", lastName: "Test", firstName: "Invité",
        attending: "oui", guests: "2", bus: "non", message: "Test message"
      })
    }
  });
}
