const fs = require('fs');
const path = require('path');

// Test SparkMD5
const SparkMD5 = require('../libraries/spark-md5.min.js');
const Papa = require('../libraries/papaparse.min.js');
const marked = require('../libraries/marked.min.js');
const JSZip = require('../libraries/jszip.min.js');
const PDFLib = require('../libraries/pdf-lib.min.js');

async function runTests() {
  console.log("=== STARTING COMPONENT TESTS ===");

  // 1. SparkMD5
  const sampleTxt = fs.readFileSync(path.join(__dirname, '../tests/data/sample.txt'));
  const md5Hash = SparkMD5.ArrayBuffer.hash(sampleTxt.buffer.slice(sampleTxt.byteOffset, sampleTxt.byteOffset + sampleTxt.byteLength));
  console.log("✓ SparkMD5 hash on sample.txt:", md5Hash);

  // 2. PapaParse - CSV to JSON
  const sampleCsv = fs.readFileSync(path.join(__dirname, '../tests/data/sample.csv'), 'utf8');
  const parsedCsv = Papa.parse(sampleCsv, { header: true, skipEmptyLines: true });
  console.log("✓ PapaParse CSV -> JSON rows:", parsedCsv.data.length, parsedCsv.data);

  // 3. PapaParse - JSON to CSV
  const unparsedCsv = Papa.unparse(parsedCsv.data);
  console.log("✓ PapaParse JSON -> CSV output lines:", unparsedCsv.split('\n').length);

  // 4. Marked - Markdown to HTML
  const sampleMd = fs.readFileSync(path.join(__dirname, '../tests/data/sample.md'), 'utf8');
  const renderedHtml = marked.parse(sampleMd);
  console.log("✓ Marked MD -> HTML generated length:", renderedHtml.length, "includes <h1>:", renderedHtml.includes('<h1'));

  // 5. JSZip - File ZIP
  const zip = new JSZip();
  zip.file("sample.txt", sampleTxt);
  zip.file("sample.csv", sampleCsv);
  const zipBuffer = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
  console.log("✓ JSZip generated ZIP size:", zipBuffer.length, "bytes");

  // 6. JSZip - File Unzip
  const unzipped = await JSZip.loadAsync(zipBuffer);
  const fileNames = Object.keys(unzipped.files);
  console.log("✓ JSZip unzipped entries:", fileNames);

  // 7. PDFLib - Merge & Create
  const samplePdfBytes = fs.readFileSync(path.join(__dirname, '../tests/data/sample.pdf'));
  const pdfDoc = await PDFLib.PDFDocument.load(samplePdfBytes);
  console.log("✓ PDFLib loaded sample.pdf, page count:", pdfDoc.getPageCount());

  // Split test
  const splitDoc = await PDFLib.PDFDocument.create();
  const [copiedPage] = await splitDoc.copyPages(pdfDoc, [0]);
  splitDoc.addPage(copiedPage);
  const splitPdfBytes = await splitDoc.save();
  console.log("✓ PDFLib split page 1 saved bytes:", splitPdfBytes.length);

  // Watermark test
  const watermarkDoc = await PDFLib.PDFDocument.load(samplePdfBytes);
  const helveticaFont = await watermarkDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);
  const pages = watermarkDoc.getPages();
  pages[0].drawText('CONFIDENTIAL', {
    x: 50,
    y: 100,
    size: 24,
    font: helveticaFont,
    color: PDFLib.rgb(0.7, 0.7, 0.7),
    opacity: 0.5
  });
  const watermarkedBytes = await watermarkDoc.save();
  console.log("✓ PDFLib watermarked document saved bytes:", watermarkedBytes.length);

  // Rotate test
  pages[0].setRotation(PDFLib.degrees(90));
  const rotatedBytes = await watermarkDoc.save();
  console.log("✓ PDFLib rotated page document saved bytes:", rotatedBytes.length);

  // Image to PDF / JPG to PDF test
  const imgToPdfDoc = await PDFLib.PDFDocument.create();
  const sampleJpgBytes = fs.readFileSync(path.join(__dirname, '../tests/data/sample.jpg'));
  const embeddedJpg = await imgToPdfDoc.embedJpg(sampleJpgBytes);
  const imgPage = imgToPdfDoc.addPage([embeddedJpg.width, embeddedJpg.height]);
  imgPage.drawImage(embeddedJpg, { x: 0, y: 0, width: embeddedJpg.width, height: embeddedJpg.height });
  const imgPdfBytes = await imgToPdfDoc.save();
  console.log("✓ PDFLib embedded JPG into PDF saved bytes:", imgPdfBytes.length);

  // TXT to PDF test
  const txtDoc = await PDFLib.PDFDocument.create();
  const font = await txtDoc.embedFont(PDFLib.StandardFonts.Helvetica);
  const txtPage = txtDoc.addPage([595.28, 841.89]);
  txtPage.drawText("Test line from TXT to PDF", { x: 50, y: 800, size: 12, font });
  const txtPdfBytes = await txtDoc.save();
  console.log("✓ PDFLib TXT to PDF saved bytes:", txtPdfBytes.length);

  console.log("=== ALL COMPONENT ENGINE TESTS PASSED ===");
}

runTests().catch(err => {
  console.error("Test failed:", err);
  process.exit(1);
});

