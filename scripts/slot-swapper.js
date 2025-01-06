var activeSelector = 0;
var cellColor = "";
var selection = {
    map: "",
    item: "",
    1: {
        day: "",
        slots: [],
        cellColor: "#90EE90",
        cells: []
    },
    2: {
        day: "",
        slots: [],
        cellColor: "#006400",
        cells: []
    }
};

function changeActiveSwapSelector(context){
    if (context == 1){
        document.getElementById("swapBar1").style.display = "flex"
        document.getElementById("swapBarMain").style.display = "none"
    } else {
        document.getElementById("swapBar2").style.display = "flex"
        document.getElementById("swapBarMain").style.display = "none"
    }
    activeSelector = context
    //document.getElementById("swapBarMain").style.backgroundColor = cellColor;
}

function resetSlotSelection(){
    if (activeSelector != 0){
        selection[activeSelector]["day"] = "";
        selection[activeSelector]["slots"] = [];
        for (j = 0; j < selection[activeSelector]["cells"].length; j++) {
            document.querySelector(`[data-slotid='${selection[i]["cells"][j]}']`).style.backgroundColor = "rgba(0,0,0,0)";
        }
        selection[activeSelector]["cells"] = [];
    } else {
        for (i = 1; i <= 2; i++){
            selection[i]["day"] = "";
            selection[i]["slots"] = [];
            for (j = 0; j < selection[i]["cells"].length; j++) {
                document.querySelector(`[data-slotid='${selection[i]["cells"][j]}']`).style.backgroundColor = "rgba(0,0,0,0)";
            }
            selection[i]["cells"] = [];
        }
    }
    returnToSwapBarMain();
}

function selectSlot(button){
    const isSelected = button.getAttribute("data-selected")
    const map = button.getAttribute("data-map")
    const item = button.getAttribute("data-item")
    const day = button.getAttribute("data-day")
    const slot = button.getAttribute("data-slot")
    const slotid = button.getAttribute("data-slotid")

    // Fetches the linked slots of the button (backend-wise)
    let buttonSlots = []
    if (window[map].get(item).get(day).get(slot) != "None"){
        buttonSlots = window[map].get(item).get(day).get(slot).get("LinkedPeriods")
    } else {
        buttonSlots = [slot]
    }

    if (activeSelector != 0){ //A whole bunch of if statements to see if the button meets the necessary requirements

        // Check if the slot is on the same table as the others
        if (selection["map"] == "" || (map == selection["map"] && item == selection["item"])){

        // Check if the slot is on the same day as the others 
        if (day == selection[activeSelector]["day"] || selection[activeSelector]["day"] == ""){
            //Check if the slot is adjacent to the others
            if (selection[activeSelector]["slots"].includes(''+(parseInt(slot)-1)) || selection[activeSelector]["slots"].includes(''+(parseInt(slot)+1)) || selection[activeSelector]["slots"].length == 0 || (selection[activeSelector]["slots"].length == 1 && selection[activeSelector]["slots"].includes(slot))){
                
                //If the button is already selected, unselect it
                if (isSelected == "true"){
                    if(!buttonSlots.every(r => selection[activeSelector]["slots"].includes(r))){
                        return
                    }


                    // Prevents user from deselecting slots in the middle of a range
                    if (selection[activeSelector]["slots"].includes(''+(parseInt(buttonSlots[0])-1)) && selection[activeSelector]["slots"].includes(''+(parseInt(buttonSlots[buttonSlots.length-1])+1))){
                        return
                    }

                    // Removes the slots from the selections
                    for (i = 0; i < buttonSlots.length; i++){
                        const index = selection[activeSelector]["slots"].indexOf(buttonSlots[i])
                        selection[activeSelector]["slots"].splice(index, 1)
                    }
                    selection[activeSelector]["cells"].splice(selection[activeSelector]["cells"].indexOf(slotid), 1)

                    button.setAttribute("data-selected", "false")
                    button.style.backgroundColor = "rgba(0,0,0,0)"
                    button.style.color = "white"
                    
                //If the button has not yet been selected, select it
                } else {
                    selection[activeSelector]["slots"] = selection[activeSelector]["slots"].concat(buttonSlots)
                    selection[activeSelector]["cells"].push(slotid)

                    button.setAttribute("data-selected", "true")
                    button.style.backgroundColor = selection[activeSelector]["cellColor"]

                    /*console.log(window[map].get(item).get(day).get(slot) == "None")
                    if (window[map].get(item).get(day).get(slot) == "None")  {
                        button.style.color = selection[activeSelector]["cellColor"]
                    }*/
                }

                if (selection[activeSelector]["slots"].length == 0){
                    selection[activeSelector]["day"] = ""
                } else {
                    selection[activeSelector]["day"] = day
                }

                if (selection[1]["slots"].length == 0 && selection[2]["slots"].length == 0){
                    selection["map"] = ""
                    selection["item"] = ""
                } else if (selection["map"] == ""){
                    selection["map"] = map
                    selection["item"] = item
                }
            }
        }}
    } else {
        return
    }

    //window[map]
}

function swapSchedules(){
    if (selection[1]["slots"].length == selection[2]["slots"].length){

        selection[1]["slots"].sort()
        selection[2]["slots"].sort()
        var tempSlots = []

        selection[1]["slots"].forEach((slot) => {
            tempSlots.push(window[selection["map"]].get(selection["item"]).get(selection[1]["day"]).get(slot)
        )})

        selection[2]["slots"].forEach((slot, key) => {
            window[selection["map"]].get(selection["item"]).get(selection[1]["day"]).set(selection[1]["slots"][key], window[selection["map"]].get(selection["item"]).get(selection[2]["day"]).get(slot))
        })

        tempSlots.forEach((slot, key) => {
            window[selection["map"]].get(selection["item"]).get(selection[2]["day"]).set(selection[2]["slots"][key], slot)
        })
        
        //Reset schedule map
        selection = {
            map: "",
            item: "",
            1: {
                day: "",
                slots: [],
                cellColor: "#90EE90",
                cells: []
            },
            2: {
                day: "",
                slots: [],
                cellColor: "#006400",
                cells: []
            }
        }
        renderTable()
    }
}

function verifyConflicts(){
    //Iterate through every single slot in teachers
    /*teacher_schedules.forEach((item1_obj, item1) => {
        item1_obj.forEach((day1_obj, day1) => {
            day1_obj.forEach((slot1_obj, slot1) => {
                if (slot1_obj != "None"){

                    //Compare the current slot to every other slot in teachers
                    teacher_schedules.forEach((item2_obj, item2) => {
                        if (item2_obj != item1_obj){
                            item2_obj.forEach((day2_obj, day2) => {
                                day1_obj.forEach((slot2_obj, slot2) => {
                                    if (slot2_obj != "None"){
                                        if (slot1_obj.get("Section") == slot2_obj.get("Section")){
                                            document.querySelector(`[data-slotid=teacher_schedules${item1}${day1}${slot1}]`).style.backgroundColor = "#FF0000";
                                            document.querySelector(`[data-slotid=teacher_schedules${item2}${day2}${slot2}]`).style.backgroundColor = "#FF0000";
                                        } } }) }) }
                    })

                    section_schedules
                }
            })
        })
    })*/
}

function returnToSwapBarMain(){
    activeSelector = 0
    document.getElementById("swapBar1").style.display = "none"
    document.getElementById("swapBar2").style.display = "none"
    document.getElementById("swapBarMain").style.display = "flex"
}