//Data Modal inputs

window.onload = function(e){
    const name_field = document.getElementById('name')
    const id_field = document.getElementById('id')

    name_field.addEventListener("keydown", function(event) {
        id_field.value = name_to_id(name_field.value, currentTab)
    });
}
