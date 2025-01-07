function update_edit_checkboxes(checkboxes, item_array){
    for (var i = 0; i < checkboxes.length; i++){
            if (item_array.includes(checkboxes[i].firstChild.value)){
                checkboxes[i].firstChild.checked=true 
            }
    }
}