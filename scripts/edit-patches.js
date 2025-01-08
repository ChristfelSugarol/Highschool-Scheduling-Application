function update_edit_checkboxes(checkboxes, item_array){
    for (var i = 0; i < checkboxes.length; i++){
            if (item_array.includes(checkboxes[i].firstChild.value)){
                checkboxes[i].firstChild.checked=true 
            }
    }
}

function toggle_arr_checkboxes(schedule_checkboxes, mode){
    for (let it of schedule_checkboxes){
        it.disabled = mode
    }
}

//show_fixed
var show_fixed = false 

function updated_fixed_schedule(){
    if (show_fixed == false){
        show_fixed = true

        createTable();

        const schedule_checkboxes = document.getElementById('availableDays').getElementsByTagName('input')
        toggle_arr_checkboxes(schedule_checkboxes, true)

    } else {
        show_fixed = false

        const fixed_table = document.getElementById('scheduleGrid')
        fixed_table.innerHTML = ""

        const schedule_checkboxes = document.getElementById('availableDays').getElementsByTagName('input')
        toggle_arr_checkboxes(schedule_checkboxes, false)
    }
}

function reset_form(){
    show_fixed = false

    document.getElementById("name").value = "";
    document.getElementById("id").value = "";
    if (currentTab === 'subjects') {
        document.getElementById('singlePeriods').value = "";
        document.getElementById('doublePeriods').value = "";
        document.getElementById('triplePeriods').value = "";
        document.getElementById('laboratories').value = "none";
        document.getElementById('labPeriods').value = 1;
    }

    const schedule_checkboxes = document.getElementById('availableDays').getElementsByTagName('input')
    for (let it of schedule_checkboxes){
        it.checked = true
    }
}

function name_to_id(name, prefix){
    id = name.replace(" ", "-")
    id = prefix[0] + prefix[1] + "_" + id

    return id
}