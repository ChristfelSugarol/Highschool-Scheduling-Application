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

      htmlContent = htmlContent.replaceAll('color: #1a1a1a; padding:0.2rem;  margin: 0px', 'color: white; padding:0.2rem;  margin: 0px')


      var cssContent = await fs.promises.readFile('styles.css', 'utf8');

      console.log(cssContent.includes("background-color: #1a1a1a;"))
      cssContent = cssContent.replace("background-color: #1a1a1a;", "background-color: #white;")
      console.log(cssContent.includes("background-color: #1a1a1a;"))
      cssContent = cssContent.replace("color: #ffffff;", "color: black;")
      cssContent = cssContent.replace("background-color: #2c2c2c", "background-color: white")
      cssContent = cssContent.replace("background-color: #333333", "background-color: white")
    
      var dcs = "<!DOCTYPE html> <html><head><style>" + cssContent + "</style></head><body>" + htmlContent + "</body></html>"


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

      generatePDFfromHTML(dcs, finalName).then(() => console.log('PDF generated successfully')).catch(err => console.error('Error generating PDF:', err));
    }

    
    currentSchedule = 'sections'
    await renderTable()
  }
}

async function merge_pdf(){
  const filePath = ""
  const teacherFolder = "teacher_individual_scheds/"
  const sectionFolder = "section_individual_scheds/"
  mergePDFs(filePath + teacherFolder, "output/teachers.pdf")
  mergePDFs(filePath + sectionFolder, "output/sections.pdf")
}

async function export_pdf(){
  await export_indpdf()
  await merge_pdf()
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