const { exec } = require('child_process');
const os = require('os');
const path = require('path');
const { dialog } = require('electron');
const util = require('util');
const execPromise = util.promisify(exec);
const fs = require('fs');

function stringToMap(str) {
    const obj = JSON.parse(str);
    return new Map(Object.entries(obj).map(([key, value]) => [key, deserializeMapValue(value)]));
  }
  
  function deserializeMapValue(value) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return new Map(Object.entries(value).map(([k, v]) => [k, deserializeMapValue(v)]));
    } else if (Array.isArray(value)) {
      return value.map(item => deserializeMapValue(item));
    } else {
      return value;
    }
}

function replaceFirstLast(text, newFirst, newLast) {
    if (text.length < 2) {
        return text;
    }
    return newFirst + text.slice(1, -1) + newLast;
}

async function openFileSelectionDialog(options = {}) {
    const defaultOptions = {
        initialDirectory: os.homedir(),
        filters: [
            { name: 'JSON Files', extensions: ['json'] },
            { name: 'All Files', extensions: ['*'] }
        ],
        properties: ['openFile']
    };

    // If using Electron
    if (typeof dialog !== 'undefined') {
        try {
            const result = await dialog.showOpenDialog(options);
            if (!result.canceled) {
                return result.filePaths[0];
            }
        } catch (error) {
            console.error('Error using Electron dialog:', error);
        }
    }

    // Fallback to command-line file explorer
    const platform = os.platform();
    let command;
    let selectedFile = null;

    try {
        switch(platform) {
            case 'win32':
                // Using PowerShell to create a file picker dialog
                command = `powershell.exe -Command "Add-Type -AssemblyName System.Windows.Forms; \
                $filePicker = New-Object System.Windows.Forms.OpenFileDialog; \
                $filePicker.InitialDirectory = '${defaultOptions.initialDirectory}'; \
                $filePicker.Filter = 'JSON Files (*.json)|*.json|All Files (*.*)|*.*'; \
                $filePicker.ShowDialog(); \
                $filePicker.FileName"`;
                break;

            case 'darwin':
                // Using AppleScript to show file picker
                command = `osascript -e 'choose file with prompt "Please select a file:"'`;
                break;

            case 'linux':
                // Using zenity for file selection
                command = `zenity --file-selection --title="Select a file"`;
                break;

            default:
                throw new Error('Unsupported operating system');
        }

        const { stdout } = await execPromise(command);
        selectedFile = stdout.trim();

        // Remove quotes if present (common in some OS responses)
        selectedFile = selectedFile.replace(/^["'](.+)["']$/, '$1');
        selectedFile = selectedFile.replace(/(\r\n|\n|\r)/gm, "");
        selectedFile = selectedFile.replace("OK", '');

        if (selectedFile) {
            console.log('Selected file:', selectedFile);
            return selectedFile;
        }

    } catch (error) {
        console.error('Error opening file selection dialog:', error);
        throw error;
    }

    return null;
}




async function selectFile() {
    try {
        const selectedFilePath = await openFileSelectionDialog({
            filters: [
                { name: 'Text Files', extensions: ['txt', 'md'] },
                { name: 'All Files', extensions: ['*'] }
            ]
        });

        if (selectedFilePath) {

            
            console.log('User selected:', selectedFilePath);
            fs.readFile(selectedFilePath, 'utf8', (err, raw_data) => {
                if (err) {
                  console.error(err);
                  return;
                } else {
                    console.log("Data Loaded")
                    data = JSON.parse(JSON.parse(raw_data))


                
                    
                    active_file = selectedFilePath
                    document.getElementById("filenameDisplay").textContent = selectedFilePath.split("\\")[selectedFilePath.split("\\").length - 1]

                    teachersO = data.teachersO
                    sectionsO = data.sectionsO
                    subjectsO = data.subjectsO
                    laboratoriesO = data.laboratoriesO

                    teachers = stringToMap(teachersO)
                    subjects = stringToMap(subjectsO)
                    sections = stringToMap(sectionsO)
                    laboratories = stringToMap(laboratoriesO)       
                    schedules = new Map();
                    renderTable()

                    //active_file = "savedFilePath"
                    document.getElementById("filenameDisplay").textContent = active_file.split("\\")[active_file.split("\\").length - 1]
            
                }
            });


            

        } else {
            console.log('No file selected');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

