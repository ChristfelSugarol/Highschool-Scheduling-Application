function renderSchedules(data, maptype) {
    let html = '';
    data.forEach((item, id) => {

        if (!id.includes("PecsonSugarolSirilanKeyword")){
            html+=`<table style="table-layout:fixed"><colgroup><col width=10%></colgroup><tr><th colspan="6" class="sched_h1">${id}</th></tr><tr class="sched_h2"><td></td><td>Monday</td><td>Tuesday</td><td>Wednesday</td><td>Thursday</td><td>Friday</td></tr>`;
        
            var timeslots = [];
            for (let i = 0; i < item.entries().next().value[1].size; i++) {
                timeslots.push(`<tr class="sched_tr"><td class="timeLabel">00:00-00:00</td>`)
            }

            item.forEach((day, id1) => {
                day.forEach((slot, id2) => { 

                    try {

                        if (slot.get("Teacher").includes("PecsonSugarolSirilanKeyword")){
                            slot.delete("Teacher")
                        }
                    } catch (er){

                    }


                    if (slot != "None") {
                        // ============== Replace this method; in case the actual Name parameter contains a comma ============
                        //timeslots[id] += `<td>${[...slot].join("\n").replace(/,/g, ": ")}</td>`
                       
                        
                        var slot_entry = `<td data-selected="false" data-slotid='${maptype}${id}${id1}${id2}' data-map='${maptype}' data-item='${id}' data-day='${id1}' data-slot='${id2}' style='padding:0.4rem' onclick='selectSlot(this)'><table>`

                        
                        
                        slot.forEach((tslot, tid) => {
                            if (tid != "Conflicts" && tid != "LinkedPeriods"){
                                var str_in = tslot
                                slot_entry += '<tr style="padding:0.2rem; border: 0px"><td style="padding:0.2rem;  border: 0px">' + str_in + '</td></tr>'
                            }
                        }) 

                        slot_entry += "</table></td>" 
                        



                        timeslots[id2] += slot_entry 
                    }
                    else{
                        timeslots[id2] += `<td data-selected="false" data-slotid='${maptype}${id}${id1}${id2}' data-map='${maptype}' data-item='${id}' data-day='${id1}' data-slot='${id2}' style='padding:0.4rem;' onclick='selectSlot(this)'><table style='padding:0.2rem; border: 0px'><tr style='padding:0.2rem; border: 0px'><td style='padding:0.2rem; border: 0px'><div style='color: #1a1a1a; padding:0.2rem;  margin: 0px'>102106</div></td></tr><tr><td style='padding:0rem; border: 0px; margin: 0px'><div style='color: #1a1a1a; padding:0.2rem;  margin: 0px'>102106</div></td></tr></table></td>`
                        
                    }
                });
            });

            timeslots.forEach((row) => {
                html += row + "</tr>";
            });
            html += '</table>';
        }
    });

    return html;
}

function post_process(){
    //Iterate through tables

    for (var i = 0; i < document.getElementById("dataTable").children.length; i++){
        let table_name = document.getElementById("dataTable").children[i].querySelector(':nth-child(2)')

        for (var j = 14; j > 2; j--){
            
            for (var k = 1; k < 6; k++){
                try {
                    let curr = table_name.children[j].children[k]
                    let next = table_name.children[j+1].children[k]

                    

                    if (next.innerHTML.includes("102106")){
                        continue
                    }

                    if (curr.innerHTML == next.innerHTML){
                        next.remove()
                    
                        if (next.rowSpan == "2"){
                            curr.rowSpan = "3"
                        } else {
                            curr.rowSpan = "2"
                        }
                        
                    }

                    
                } catch (e){

                }
            }
            
            
        }
    }

    //document.getElementById("dataTable").children[0].querySelector(':nth-child(2)').children[6].children[1]
}