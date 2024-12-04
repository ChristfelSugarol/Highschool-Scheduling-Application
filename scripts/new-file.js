function newFile(){
    teachersO = {}
    sectionsO = {}
    subjectsO = {}
    laboratoriesO = {}

    active_file = ""
    document.getElementById("filenameDisplay").textContent = "untitled"

    console.log("New File")

    teachers = populateMap(new Map(),teachersO,Object.keys(teachersO));
    subjects = populateMap(new Map(),subjectsO,Object.keys(subjectsO));
    sections = populateMap(new Map(),sectionsO,Object.keys(sectionsO));
    laboratories = populateMap(new Map(),laboratoriesO,Object.keys(laboratoriesO))       
    schedules = new Map();
    renderTable()


}