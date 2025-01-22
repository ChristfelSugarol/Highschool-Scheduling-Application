const puppeteer = require('puppeteer');
const { PDFDocument } = require('pdf-lib');

has_schedule = false

async function generatePDFfromHTML(htmlContent, outputPath) {
  const options = {
    landscape: true,
    path: outputPath,
    printBackground : true,
    height: 1321.6,
    width: 1000, 
    preferCSSPagesize: true
  }

  const css = fs.readFileSync('styles.css', 'utf8');

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.addStyleTag({ content: css }); 
  await page.setContent(htmlContent);
  await page.pdf(options);
  await browser.close();

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data fetched successfully!");
    }, 2000);
  });
}

function createDirectoryIfNotExistsSync(dirPath) {
  try {
      const normalizedPath = path.normalize(dirPath);
      
      if (!fs.existsSync(normalizedPath)) {
          fs.mkdirSync(normalizedPath, { recursive: true });
          console.log(`Directory created successfully: ${normalizedPath}`);
      } else {
          console.log(`Directory already exists: ${normalizedPath}`);
      }
  } catch (error) {
      console.error(`Error creating directory: ${error.message}`);
      throw error;
  }
}

async function export_indpdf(){
  const teacherFolder = "teacher_individual_scheds/"
  const sectionFolder = "section_individual_scheds/"
  const filePath = ""
  const baseFileName = "page"
  
  currentSchedule = 'teachers'
  renderTable()

  for (var its = 0; its < 2; its++){
    const htmlTableArr = document.getElementById("dataTable").children

    for (it = 0; it < document.getElementById("dataTable").children.length; it++){
      var htmlContent = htmlTableArr[it].outerHTML

      var cssContent = await fs.promises.readFile('styles.css', 'utf8');
      var lightContent = await fs.promises.readFile('lightstyles.css', 'utf8');

      var dcs = "<!DOCTYPE html> <html><head><style>" + cssContent + lightContent + "</style></head><body class='light-mode'>" + htmlContent + "</body></html>"


      var finalName
      var pdfroot 

      if (currentSchedule == 'teachers'){
        finalName = filePath + teacherFolder + baseFileName + it.toString() + '.pdf'
        pdfroot = filePath + teacherFolder
        createDirectoryIfNotExistsSync(pdfroot)
      } else {
        finalName = filePath + sectionFolder + baseFileName + it.toString() + '.pdf'
        pdfroot = filePath + sectionFolder
        createDirectoryIfNotExistsSync(pdfroot)
      }

      await generatePDFfromHTML(dcs, finalName).then(() => console.log('PDF generated successfully')).catch(err => console.error('Error generating PDF:', err));
    }

    
    currentSchedule = 'sections'
    await renderTable()
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data fetched successfully!");
    }, 2000);
  });
}

async function merge_pdf(){
  const filePath = ""
  const teacherFolder = "teacher_individual_scheds/"
  const sectionFolder = "section_individual_scheds/"

  createDirectoryIfNotExistsSync('output')

  await mergePDFs(filePath + teacherFolder, "output/teachers.pdf")
  await mergePDFs(filePath + sectionFolder, "output/sections.pdf")
}


function deleteFolder(folderPath) {
  fs.rm(folderPath, { recursive: true, force: true }, (err) => {
    if (err) {
      console.error(`Error deleting folder "${folderPath}":`, err);
    } else {
      console.log(`Folder "${folderPath}" deleted successfully!`);
    }
  });

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data fetched successfully!");
    }, 2000);
  });
}

async function export_pdf(){
  await export_indpdf()
  await merge_pdf()
  await deleteFolder('teacher_individual_scheds/')
  await deleteFolder('section_individual_scheds/')
}

function export_interaction(){
  has_schedule = true
}

function clear_schedule(){
  console.log("Clearing")
  has_schedule = false
  document.getElementById("dataTable").remove()
  buttonInteractions.innerHTML = '<button onclick="generate()" id = "generateTimetable">Generate Table</button>'
                     
}