const { spawn } = require('child_process');

var backend_process_output = []

function parseStringToMap(data){
    data = data.replace(/None/g, '"None"')
    data = data.replace(/'/g, '"')
    data = data.replace(/(\{|\,)\s*(\d+)\s*\:/g, '$1"$2":')
    data = JSON.parse(data)
    
    return data
}

function dataToSchedule(){
    data1 = parseStringToMap(backend_process_output[backend_process_output.length - 1])
    data2 = parseStringToMap(backend_process_output[backend_process_output.length - 2])
    //.replace(/None/g, 'null').replace(/'/g, '"').replace(/(\{|\,)\s*(\d+)\s*\:/g, '$1"$2":')
    console.log("Schedule Data Check")
    console.log(data1)
    console.log(data2)

    teacher_schedules = populateMap(teacher_schedules,data1,Object.keys(data1));
    section_schedules = populateMap(section_schedules,data2,Object.keys(data2));
}

function runBackEnd(data) {
    console.log("Starting Python process...");
    return new Promise((resolve, reject) => {
        const childPython = spawn('backend/dist/scheduler/scheduler.exe', [JSON.stringify(data)]);
        let fullOutput = '';

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
        dataToSchedule()
        renderTable()
        return result;
    } catch (err) {
        console.error('Error:', err.message);
        throw err;
    }
}

