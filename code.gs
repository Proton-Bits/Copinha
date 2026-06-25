function doPost(e) {

  const sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName("Inscritos");

  sheet.appendRow([
    new Date(),
    e.parameter.nome,
    e.parameter.goleiro
  ]);

  return ContentService
    .createTextOutput("OK");
}
