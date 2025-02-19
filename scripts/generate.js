//WARNING: 'se'+x should be an ID which is NOT implemented


class subject_object {
    constructor(Predmet, items){
        this.Predmet = Predmet,
        this.Tip = items[(Math.floor(Math.random() * items.length))],
        this.Nastavnik = null, // Assuming the first teacher handles the subject
        this.Grupe = null, // Group = Section name
        this.Ucionica = null, // Classroom ID = Section ID
        this.Trajanje = null, // 1 for single, 2 for double, 3 for triple periods
        this.Definite = null
        this.Laboratory = null
    }
}


function boolToInt(a) {
    if (a == false){
        return 0
    }

    return 1
}

function debugMode(testcase) {
    if (testcase == 1){
        console.log("Populate Classroom Success")
    } else if (testcase == 2){
        
    }
}

function convertion() {
    var classroom_list = new Map();

    // Populate classroom list from sections
    Array.from(sections.entries()).forEach(([key, value]) => {
        var place_arr = [value.get("name")]

        classroom_list.set(key, place_arr);
    });

    console.log(Object.fromEntries(classroom_list.entries()))

    const final_object = {
        Ucionice: Object.fromEntries(classroom_list.entries()), // Convert Map to Array for JSON output
        Casovi: [],
        Teacher_Availability: [],
        Subject_Availability: []
    };

    // Process subjects and their periods
    Array.from(subjects.entries()).forEach(([key, map_value]) => {
        const value = Object.fromEntries(map_value)

        if(value.has_definite_schedule == true) {

            //template
            var items = ['P', 'V', 'L']


            //iterate through all sections
            value.section.forEach((x, i) => {
                var lab_meetings = 0

                if (value.laboratory != null){
                    lab_meetings = value.laboratory.get("meetings") 
                }

                var section_teacher

                if (value.has_teacher == true){
                    section_teacher = value.teachers[0]
                } else {
                    //create a random entity to fill it up
                    const random_id = Math.random() * 100000
                    const rTeacherName = "PecsonSugarolSirilanKeyword #" + random_id.toString()
    
                    section_teacher = rTeacherName
    
                    var object_pkg = {
                        "Name": rTeacherName,
                        "Mon": 1,
                        "Tue": 1,
                        "Wed": 1,
                        "Thu": 1,
                        "Fri": 1
                    }
    
                    final_object.Teacher_Availability.push(object_pkg)
    
                }

                if (value.definite_schedule.get('mon').get('duration') != null){
                    var class_template = new subject_object(value.name, items)
                    class_template.Nastavnik = section_teacher
                    class_template.Grupe = [x]
                    class_template.Ucionica = "se_" + x
                    class_template.Trajanje = value.definite_schedule.get('mon').get('duration')
                    class_template.Definite = {"day": 0, "pos": value.definite_schedule.get('mon').get('start')}
                    class_template.Break = value.break
                    class_template.MathSci = value.isMathSci

                    if ((lab_meetings > 0 && (value.definite_schedule.get('mon').get('duration') == LABORATORY_PERIOD))){
                        class_template.Laboratory = value.laboratory.get("room")
                        lab_meetings += -1
                    }

                    final_object.Casovi.push(class_template);
                }
    
                if (value.definite_schedule.get('tue').get('duration') != null){
                    var class_template = new subject_object(value.name, items)
                    class_template.Nastavnik = section_teacher
                    class_template.Grupe = [x]
                    class_template.Ucionica = "se_" + x
                    class_template.Trajanje = value.definite_schedule.get('tue').get('duration')
                    class_template.Definite =  {"day": 1, "pos": value.definite_schedule.get('tue').get('start')}
                    class_template.Break = value.break
                    class_template.MathSci = value.isMathSci

                    if ((lab_meetings > 0) && (value.definite_schedule.get('tue').get('duration') == LABORATORY_PERIOD)){
                        class_template.Laboratory = value.laboratory.get("room")
                        lab_meetings += -1
                    }
    
                    final_object.Casovi.push(class_template);
                }
    
                if (value.definite_schedule.get('wed').get('duration') != null){
                    var class_template = new subject_object(value.name, items)
                    class_template.Nastavnik = section_teacher
                    class_template.Grupe = [x]
                    class_template.Ucionica = "se_" + x
                    class_template.Trajanje = value.definite_schedule.get('wed').get('duration')
                    class_template.Definite =  {"day": 2, "pos": value.definite_schedule.get('wed').get('start')}
                    class_template.Break = value.break
                    class_template.MathSci = value.isMathSci

                    if ((lab_meetings > 0) && (value.definite_schedule.get('wed').get('duration') == LABORATORY_PERIOD)){
                        class_template.Laboratory = value.laboratory.get("room")
                        lab_meetings += -1
                    }
    
                    final_object.Casovi.push(class_template);
                }
    
                if (value.definite_schedule.get('thu').get('duration') != null){
                    var class_template = new subject_object(value.name, items)
                    class_template.Nastavnik = section_teacher
                    class_template.Grupe = [x]
                    class_template.Ucionica = "se_" + x
                    class_template.Trajanje = value.definite_schedule.get('thu').get('duration')
                    class_template.Definite =  {"day": 3, "pos": value.definite_schedule.get('thu').get('start')}
                    class_template.Break = value.break
                    class_template.MathSci = value.isMathSci

                    if ((lab_meetings > 0) && (value.definite_schedule.get('thu').get('duration') == LABORATORY_PERIOD)){
                        class_template.Laboratory = value.laboratory.get("room")
                        lab_meetings += -1
                    }
    
                    final_object.Casovi.push(class_template);
                }
    
                if (value.definite_schedule.get('fri').get('duration') != null){
                    var class_template = new subject_object(value.name, items)
                    class_template.Nastavnik = section_teacher
                    class_template.Grupe = [x]
                    class_template.Ucionica = "se_" + x
                    class_template.Trajanje = value.definite_schedule.get('fri').get('duration')
                    class_template.Definite =  {"day": 4, "pos": value.definite_schedule.get('fri').get('start')}
                    class_template.Break = value.break
                    class_template.MathSci = value.isMathSci

                    if ((lab_meetings > 0) && (value.definite_schedule.get('fri').get('duration') == LABORATORY_PERIOD)){
                        class_template.Laboratory = value.laboratory.get("room")
                        lab_meetings += -1
                    }
    
                    final_object.Casovi.push(class_template);
                }
            })
            //Not dynamic days anymore :( too lazy to convert object to array
            
        } else {
            // Convert periods into an array [single, double, triple]
            const period_converted = {
                1: value.periods.get("single"),
                2: value.periods.get("double"),
                3: value.periods.get("triple")
            };

            Object.entries(period_converted).forEach(([period_length, index]) => {
                a = index
                index = period_length
                period_length = a

                console.log(index)
                console.log(period_length)
                if (period_length > 0) { // Check if periods exist
                    
                    var items = ['P', 'V', 'L']

                    

                    for (let x = 0; x < period_length; x++) {
                        var random_teacher_list = []

                        value.section.forEach((x) => {
                            var section_teacher = ""

                            if (value.has_teacher == true){
                                section_teacher = value.teachers[0]
                            } else {
                                //create a random entity to fill it up
                                const random_id = Math.random() * 100000
                                const rTeacherName = "PecsonSugarolSirilanKeyword #" + random_id.toString()
                
                                section_teacher = rTeacherName
                
                                var object_pkg = {
                                    "Name": rTeacherName,
                                    "Mon": 1,
                                    "Tue": 1,
                                    "Wed": 1,
                                    "Thu": 1,
                                    "Fri": 1
                                }
                
                                final_object.Teacher_Availability.push(object_pkg)
                
                            }

                            random_teacher_list.push(section_teacher)
                        });

                        value.section.forEach((x, i) => {
                            var lab_meetings = 0

                            if (value.laboratory != null){
                                lab_meetings = value.laboratory.meetings 
                            }

                            var subject_object = {
                                Predmet: value.name,
                                Tip: items[(Math.floor(Math.random() * items.length))],
                                Nastavnik: random_teacher_list[i], // Assuming the first teacher handles the subject
                                Grupe: [x], // Group = Section name
                                Ucionica: "se_"+x, // Classroom ID = Section ID
                                Trajanje: parseInt(index), // 1 for single, 2 for double, 3 for triple periods
                                Definite: null,
                                Laboratory: null,
                                Break: value.break,
                                MathSci: value.isMathSci                      
                            };

                            if ((lab_meetings > 0) && (index + 1 == LABORATORY_PERIOD)){
                                subject_object.Laboratory = value.laboratory.get("room")
                                lab_meetings += -1
                            }

                            final_object.Casovi.push(subject_object);
                        });
                    }
                }
            });
        }
        


    }); 

    //Convert Teacher availability to data
    Array.from(teachers.entries()).forEach(([key, map_value]) => {
        const value = Object.fromEntries(map_value)
        var object_pkg = {
            "Name": value.name,
            "Mon": boolToInt(value.availability.get('mon')),
            "Tue": boolToInt(value.availability.get('tue')),
            "Wed": boolToInt(value.availability.get('wed')),
            "Thu": boolToInt(value.availability.get('thu')),
            "Fri": boolToInt(value.availability.get('fri'))
        }

        final_object.Teacher_Availability.push(object_pkg)
    })

    Array.from(subjects.entries()).forEach(([key, map_value]) => {
        const value = Object.fromEntries(map_value)

        var object_pkg = {}

        //if a subject has a defined schedule then it is automatically AVAILABLE for all days

        if(value.has_definite_schedule == true) {
            object_pkg = {
                "Name": value.name,
                "Mon": 1,
                "Tue": 1,
                "Wed": 1,
                "Thu": 1,
                "Fri": 1
            }
        } else {
            object_pkg = {
                "Name": value.name,
                "Mon": boolToInt(value.availability.get('mon')),
                "Tue": boolToInt(value.availability.get('tue')),
                "Wed": boolToInt(value.availability.get('wed')),
                "Thu": boolToInt(value.availability.get('thu')),
                "Fri": boolToInt(value.availability.get('fri'))
            }
        }
        
        final_object.Subject_Availability.push(object_pkg)
    })

    write_input_to_file(JSON.stringify(fixed_schedule_casovi_post_process(final_object, null, 2)))
}

function fixed_schedule_casovi_post_process(data){
    fixed_arr = []
    rest_arr = []

    for (let i = 0; i < data["Casovi"].length; i++){
        if (data["Casovi"][i].Definite == null){
            fixed_arr.push(data["Casovi"][i])
        } else {
            rest_arr.push(data["Casovi"][i])
        }
    }
    
    data["Casovi"] = rest_arr.concat(fixed_arr)

    return data
}

function printRawData(){
    console.log(JSON.stringify(sectionsO))
    console.log(JSON.stringify(teachersO))
    console.log(JSON.stringify(subjectsO))
    console.log(JSON.stringify(laboratoriesO))
}

function generate() {
    start_loading()
    //printRawData()
    convertion()
    export_interaction()
}


