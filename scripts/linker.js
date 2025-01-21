const { spawn } = require('child_process');

var teacher_schedules = new Map();
var section_schedules = new Map();

var backend_process_output = []

function parseStringToMap(data){
    data = data.replace(/None/g, '"None"')
    data = data.replace(/'/g, '"')
    data = data.replace(/(\{|\,)\s*(\d+)\s*\:/g, '$1"$2":')
    data = JSON.parse(data)
    
    return data
}

function dataToSchedule(){
    console.log(backend_process_output[backend_process_output.length - 2])

    data1 = parseStringToMap(backend_process_output[backend_process_output.length - 1])
    data2 = parseStringToMap(backend_process_output[backend_process_output.length - 2])
    
    //.replace(/None/g, 'null').replace(/'/g, '"').replace(/(\{|\,)\s*(\d+)\s*\:/g, '$1"$2":')
    console.log("Schedule Data Check")
    console.log(data1)
    console.log(data2)

    teacher_schedules = remapTeacherSchedules(populateMap(teacher_schedules,data1,Object.keys(data1)));
    section_schedules = remapSectionSchedules(populateMap(section_schedules,data2,Object.keys(data2)));
}

function remapTeacherSchedules(data){
    data.forEach((item, id1) => {
        item.forEach((day,id2) => {
            day.forEach((slot, id3) => {
                if (slot != "None"){
                    slot.set("Conflicts", [])
                    // Search for linked timeslots
                    let linkedperiods = []
                    for (i = parseInt(id3)-2; i <= parseInt(id3)+2; i++){
                        let id4 = ''+i
                        if (day.has(id4)){
                            if(day.get(id4) != "None"){
                                if(day.get(id4).get("Section") == slot.get("Section") && day.get(id4).get("Subject") == slot.get("Subject")){
                                    linkedperiods.push(id4)
                                }
                            }
                        }
                    }
                    slot.set("LinkedPeriods", linkedperiods)
                }
            })
        })
    })
    return data
}

function remapSectionSchedules(data){
    data.forEach((item, id1) => {
        item.forEach((day,id2) => {
            day.forEach((slot, id3) => {
                if (slot != "None"){
                    slot.set("Conflicts", [])
                    // Search for linked timeslots
                    let linkedperiods = []
                    for (i = parseInt(id3)-2; i <= parseInt(id3)+2; i++){
                        let id4 = ''+i
                        if (day.has(id4)){
                            if(day.get(id4) != "None"){
                                if(day.get(id4).get("Teacher") == slot.get("Teacher") && day.get(id4).get("Subject") == slot.get("Subject")){
                                    linkedperiods.push(id4)
                                }
                            }
                        }
                    }
                    slot.set("LinkedPeriods", linkedperiods)
                }
            })
        })
    })
    return data
}


function runBackEnd(data) {
    console.log("Starting Python process...");

    

    return new Promise((resolve, reject) => {
        const childPython = spawn('python', ['backend/dist/scheduler/scheduler.py'])
        let fullOutput = '';

        const input_data = readOptionsData(data);

        childPython.stdin.write(JSON.stringify(input_data));
        childPython.stdin.end();

        // Handle each line of output in real-time
        childPython.stdout.on('data', (data) => {
            const output = data.toString();
            // Split by newlines in case multiple print statements came together
            const lines = output.split('\n');

            

            lines.forEach(line => {
                if (line.trim()) {  // Only process non-empty lines
                    backend_process_output.push(line.trim())
                    console.log('[Python]:', line.trim());
                    fullOutput += line + '\n';
                }
            });


        });

        // Handle errors in real-time too
        childPython.stderr.on('data', (data) => {
            console.error('[Python Error]:', data.toString().trim());
        });

        childPython.on('close', (code) => {
            if (code === 0) {
                resolve(fullOutput.trim());
            } else {
                reject(new Error(`Process exited with code ${code}`));
            }
        });

        childPython.on('error', (err) => {
            reject(new Error(`Failed to start Python process: ${err.message}`));
        });
    });

    
}

// Example usage
async function write_input_to_file(data) {
    try {
        const result = await runBackEnd(data);
        console.log("Algorithm Process Done")
        dataToSchedule()
        renderTable()
        return result;
    } catch (err) {
        console.error('Error:', err.message);
        throw err;
    }
}

