const PDFKit = require("pdfkit");
const fs = require("fs");

const pdf = new PDFKit();

// Adiciona uma imagem na posição X: 300 e Y: 300
pdf.image("img/Rocketseat.png", 300, 300);

//pdf.text('Hello Rocketseat PDF');
pdf
  //.font("Fira Code")
  .fontSize("13")
  .fillColor("#6155a4")
  .text("Texto formatado", {
    align: "center"
  });

pdf.pipe(fs.createWriteStream("test2.pdf"));
pdf.end();
