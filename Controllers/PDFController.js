const fs = require('fs');
const PDFDocument = require("pdfkit");

const generateHeader = (doc) => {
    doc
      .fontSize(20)
      .text("Application Credentials", 180, 57)
      .fontSize(10)
      .text("Application", 110, 140)
      .text("Username", 210, 140)
      .text("Password", 320, 140)
      .moveDown();
};

const generateTableRow = (doc, y, c1, c2, c3) => {
    doc
      .fontSize(10)
      .text(c1, 90, y, { width: 90, align: "center" })
      .text(c2, 190, y, { width: 90, align: "center" })
      .text(c3, 300, y, { width: 90, align: "center" });
};

const generateData = (doc, data) => {
    let id, tableTop = 150;
  
    for (id in data) {
      const app_data = data[id];
      const position = tableTop + (Number(id) + 1) * 30;
      generateTableRow(
        doc,
        position,
        app_data.app,
        app_data.username,
        app_data.password
      );
    }
};

const generatePDF = (app_data) => {
    return new Promise((resolve, reject) => {
        let doc = new PDFDocument({ margin: 50 });
        generateHeader(doc);
        generateData(doc, app_data);
        const pdf = `${new Date().getTime().toString()}.pdf`;
        doc.end();
        doc.pipe(fs.createWriteStream(pdf))
            .on("finish", resolve(pdf))
            .on("error", (error) => reject(error));
    });
};

module.exports.generatePDF = generatePDF;