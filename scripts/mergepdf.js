
// Function to merge PDF files in a directory
async function mergePDFs(directoryPath, outputFilePath) {
  try {
    const files = fs.readdirSync(directoryPath).filter(file => file.endsWith(".pdf"));
    if (files.length === 0) {
      console.error("No PDF files found in the directory.");
      return;
    }

    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const fileBuffer = fs.readFileSync(filePath);
      const pdf = await PDFDocument.load(fileBuffer);

      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      pages.forEach(page => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();
    fs.writeFileSync(outputFilePath, mergedPdfBytes);

    console.log(`PDF files merged successfully into: ${outputFilePath}`);
  } catch (error) {
    console.error("An error occurred while merging PDFs:", error);
  }
}
