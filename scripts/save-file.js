function mapToString(map) {
    return JSON.stringify(Array.from(map).reduce((obj, [key, value]) => {
      obj[key] = serializeMapValue(value);
      return obj;
    }, {}));
  }
  
  function serializeMapValue(value) {
    if (value instanceof Map) {
      return Array.from(value).reduce((obj, [k, v]) => {
        obj[k] = serializeMapValue(v);
        return obj;
      }, {});
    } else if (Array.isArray(value)) {
      return value.map(item => serializeMapValue(item));
    } else {
      return value;
    }
}

function exportedfile() {
    ef = {
        "teachersO":mapToString(teachers),
        "subjectsO":mapToString(subjects),
        "sectionsO":mapToString(sections),
        "laboratoriesO":mapToString(laboratories)
    }
    
    return JSON.stringify(ef)
}

async function openFileSaveDialog(defaultContent = '', options = {}) {
    defaultContent = JSON.stringify(exportedfile())

    const defaultOptions = {
        initialDirectory: os.homedir(),
        defaultFileName: 'untitled.txt',
        filters: [
            { name: 'All Files', extensions: ['json'] }
        ]
    };

    const opts = { ...defaultOptions, ...options };
    const platform = os.platform();
    let command;
    let selectedFile = null;

    try {
        switch(platform) {
            case 'win32':
                command = `powershell.exe -Command "Add-Type -AssemblyName System.Windows.Forms; \
                $savePicker = New-Object System.Windows.Forms.SaveFileDialog; \
                $savePicker.InitialDirectory = '${opts.initialDirectory}'; \
                $savePicker.FileName = '${opts.defaultFileName}'; \
                $savePicker.Filter = 'All Files (*.*)|*.*'; \
                $savePicker.ShowDialog(); \
                $savePicker.FileName"`;
                break;

            case 'darwin':
                command = `osascript -e 'tell application "System Events"
                    activate
                    set fileName to choose file name with prompt "Save As:" default name "${opts.defaultFileName}"
                    return POSIX path of fileName
                end tell'`;
                break;

            case 'linux':
                command = `zenity --file-selection --save --confirm-overwrite \
                --filename="${path.join(opts.initialDirectory, opts.defaultFileName)}" \
                --title="Save File"`;
                break;

            default:
                throw new Error('Unsupported operating system');
        }

        const { stdout } = await execPromise(command);
        selectedFile = stdout.trim();
        selectedFile = selectedFile.replace(/(\r\n|\n|\r)/gm, "");
        selectedFile = selectedFile.replace("OK", '');
        console.log(selectedFile)

        if (selectedFile) {
            fs.writeFile(selectedFile, defaultContent,  err => {
                if (err) {
                  console.error(err);
                } else {

                }
              });
            console.log('File saved successfully at:', selectedFile);
            return selectedFile;
        }

    } catch (error) {
        console.error('Error in save file dialog:', error);
        throw error;
    }

    return null;
}

async function saveCustomFile() {
    const content = JSON.stringify(exportedfile(), null, 2);
    try {
        const savedFilePath = await openFileSaveDialog(content, {
            defaultFileName: 'data.json',
            initialDirectory: path.join(os.homedir(), 'Documents'),
            filters: [
                { name: 'JSON Files', extensions: ['json'] },
            ]
        });
        
        if (savedFilePath) {
            console.log('JSON file saved at:', savedFilePath);

        }
        active_file = savedFilePath
        document.getElementById("filenameDisplay").textContent = active_file.split("\\")[active_file.split("\\").length - 1]

    } catch (error) {
        console.error('Error saving JSON file:', error);
    }
}

function saveOnCurrent(){
    if (active_file != "") {
        fs.writeFile(active_file, JSON.stringify(exportedfile()),  err => {
            if (err) {
              console.error(err);
            } else {
              // file written successfully
            }
          });
        console.log('File saved successfully at:', active_file);
    } else {
        saveCustomFile()
    }
}