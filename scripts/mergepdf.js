
const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const access = util.promisify(fs.access);
const mkdir = util.promisify(fs.mkdir);

async function mergePDFs(sourceDir, outputPath) {
    try {
        const mergedPdf = await PDFDocument.create();
        const files = await readdir(sourceDir);
        
        const pdfFiles = files
            .filter(file => file.toLowerCase().endsWith('.pdf'))
            .sort();
            
        if (pdfFiles.length === 0) {
            throw new Error('No PDF files found in the specified directory');
        }

        console.log(`Found ${pdfFiles.length} PDF files to merge`);

        for (const pdfFile of pdfFiles) {
            try {
                const pdfPath = path.join(sourceDir, pdfFile);
                console.log(`Starting to process: ${pdfFile}`);

                // Read the PDF file
                const pdfBytes = await readFile(pdfPath);
                console.log(`Successfully read file: ${pdfFile}`);

                // Load the PDF document
                const pdf = await PDFDocument.load(pdfBytes, {
                    ignoreEncryption: true,
                    updateMetadata: false
                });
                console.log(`Successfully loaded PDF document: ${pdfFile}`);

                // Get page indices and log them
                const pageIndices = pdf.getPageIndices();
                console.log(`File ${pdfFile} has ${pageIndices.length} pages`);

                // Copy pages with error handling
                try {
                    const pages = await mergedPdf.copyPages(pdf, pageIndices);
                    console.log(`Successfully copied pages from: ${pdfFile}`);

                    // Add pages to the merged PDF
                    pages.forEach((page, index) => {
                        mergedPdf.addPage(page);
                        console.log(`Added page ${index + 1} from ${pdfFile}`);
                    });
                } catch (copyError) {
                    console.error(`Error copying pages from ${pdfFile}:`, copyError);
                    console.log('Skipping this file and continuing with next...');
                    continue;
                }
            } catch (fileError) {
                console.error(`Error processing file ${pdfFile}:`, fileError);
                console.log('Skipping this file and continuing with next...');
                continue;
            }
        }

        if (mergedPdf.getPageCount() === 0) {
            throw new Error('No pages were successfully merged');
        }

        console.log('Saving merged PDF...');
        const mergedPdfFile = await mergedPdf.save();
        await writeFile(outputPath, mergedPdfFile);
        
        console.log(`Successfully merged PDF files into: ${outputPath}`);
        console.log(`Total pages in merged PDF: ${mergedPdf.getPageCount()}`);
    } catch (error) {
        console.error('Error in mergePDFs:', error.message);
        throw error;
    }
}

async function validateDirectory(dir) {
    try {
        await access(dir);
    } catch {
        await mkdir(dir, { recursive: true });
        console.log(`Created directory: ${dir}`);
    }
}

async function merge_pdfs(inp, out, filename) {
    const sourceDirectory = inp;
    const outputDirectory = out;
    const outputFileName = filename;
    
    try {
        await validateDirectory(sourceDirectory);
        await validateDirectory(outputDirectory);
        
        const outputPath = path.join(outputDirectory, outputFileName);
        await mergePDFs(sourceDirectory, outputPath);
    } catch (error) {
        console.error('Failed to merge PDFs:', error);
        process.exit(1);
    }
}

