/* Save old options */
var old_CONSECUTIVE_CLASS_LIMIT = 3
var old_NO_CONSECUTIVE_CLASS_COST_MULTIPLIER = 0.5
var old_NO_OVERLAPING_LABORATORY_CLASSES_MULTIPLIER = 0.25
var old_NO_MATH_SCIENCE_AFTER_LUNCH_MULTIPLIER = 0.25
var old_EMPTY_SLOTS_BETWEEN_POWER = 3

function readOptionsData(raw_scheduling_data){
    const input_data = {
        schedule_data: raw_scheduling_data,
        CONSECUTIVE_CLASS_LIMIT: document.getElementById('class_limit').value,
        NO_CONSECUTIVE_CLASS_COST_MULTIPLIER: document.getElementById('class_limit_multiplier').value,
        NO_OVERLAPING_LABORATORY_CLASSES_MULTIPLIER: document.getElementById('laboratory_class_multiplier').value,
        NO_MATH_SCIENCE_AFTER_LUNCH_MULTIPLIER: document.getElementById('after_lunch_multiplier').value,
        EMPTY_SLOTS_BETWEEN_POWER: document.getElementById('empty_slots_multiplier').value
    }

    return input_data
}

function giveParsedInputData(){
    update_old_options()
    closeOptionsMenu()
}

function closeOptionsMenu(){
    const option_window = document.getElementById('option-block')
    option_window.style.display = 'none'
    
    const black_screen = document.getElementById('black-screen')
    black_screen.style.display = 'none'
}

function openOptionsMenu(){
    const option_window = document.getElementById('option-block')
    option_window.style.display = 'flex'
    
    const black_screen = document.getElementById('black-screen')
    black_screen.style.display = 'flex'

    document.getElementById('class_limit').value = old_CONSECUTIVE_CLASS_LIMIT;
    document.getElementById('class_limit_multiplier').value = old_NO_CONSECUTIVE_CLASS_COST_MULTIPLIER;
    document.getElementById('laboratory_class_multiplier').value = old_NO_OVERLAPING_LABORATORY_CLASSES_MULTIPLIER;
    document.getElementById('after_lunch_multiplier').value = old_NO_MATH_SCIENCE_AFTER_LUNCH_MULTIPLIER;
    document.getElementById('empty_slots_multiplier').value = old_EMPTY_SLOTS_BETWEEN_POWER;
}

function load_old_options(){
    document.getElementById('class_limit').value = old_CONSECUTIVE_CLASS_LIMIT;
    document.getElementById('class_limit_multiplier').value = old_NO_CONSECUTIVE_CLASS_COST_MULTIPLIER;
    document.getElementById('laboratory_class_multiplier').value = old_NO_OVERLAPING_LABORATORY_CLASSES_MULTIPLIER;
    document.getElementById('after_lunch_multiplier').value = old_NO_MATH_SCIENCE_AFTER_LUNCH_MULTIPLIER;
    document.getElementById('empty_slots_multiplier').value = old_EMPTY_SLOTS_BETWEEN_POWER;

    closeOptionsMenu()
}

function update_old_options(){
    old_CONSECUTIVE_CLASS_LIMIT = document.getElementById('class_limit').value
    old_NO_CONSECUTIVE_CLASS_COST_MULTIPLIER = document.getElementById('class_limit_multiplier').value
    old_NO_OVERLAPING_LABORATORY_CLASSES_MULTIPLIER = document.getElementById('laboratory_class_multiplier').value
    old_NO_MATH_SCIENCE_AFTER_LUNCH_MULTIPLIER = document.getElementById('after_lunch_multiplier').value
    old_EMPTY_SLOTS_BETWEEN_POWER = document.getElementById('empty_slots_multiplier').value
}