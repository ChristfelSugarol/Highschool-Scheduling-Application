var sectionsO = {
    "se_Altair": {
        "name": "Altair",
        "subjects": [
            "English",
            "Math"
        ]
    },
    "se_Rigel": {
        "name": "Rigel",
        "subjects": [
            "English",
            "Math"
        ]
    },
    "se_Vega": {
        "name": "Vega",
        "subjects": [
            "English",
            "Math"
        ]
    },
    "se_Polaris": {
        "name": "Polaris",
        "subjects": [
            "English",
            "Math"
        ]
    },
    "se_Curie": {
        "name": "Curie",
        "subjects": [
            "English",
            "Math"
        ]
    },
    "se_Franklin": {
        "name": "Franklin",
        "subjects": [
            "English",
            "Math"
        ]
    },
}

var teachersO = {
    "te_Ryan_Ocumen": {
        "name": "Ryan Ocumen",
        "subjects": [
            "Math"
        ],
        "availability": {
            "mon": true,
            "tue": true,
            "wed": true,
            "thu": true,
            "fri": true
        }
    },
    "te_Kathreen_Abroguina": {
        "name": "Kathreen Abroguina",
        "subjects": [
            "English"
        ],
        "availability": {
            "mon": true,
            "tue": true,
            "wed": true,
            "thu": true,
            "fri": true
        }
    }
}

var subjectsO = {
    "se_Research3": {
        "has_definite_schedule": true,
        "has_teacher": true,
        "laboratory": {
            "room": "English Lab",
            "meetings": 1
        },
        "break": null,
        "isMathSci": true,

        "name": "Research3",
        "teachers": [
            "Ryan Ocumen"
        ],
        "section": ["Altair"],
        "periods": {
            "single": 2,
            "double": 1,
            "triple": 0
        },
        "availability": {
            "mon": true,
            "tue": true,
            "wed": true,
            "thu": true,
            "fri": true
        },

        "definite_schedule":{
            "mon": {
                "start": 3,
                "duration": 2
            },
            "tue": {
                "start": null,
                "duration": null
            },
            "wed": {
                "start": 2,
                "duration": 1                
            },
            "thu": {
                "start": null,
                "duration": null                
            },
            "fri": {
                "start": 5,
                "duration": 3            
            },
        },
        
    },

    "se_Lunch": {
        "has_definite_schedule": false,
        "has_teacher": false,
        "laboratory": null,
        "break": "Lunch",
        "isMathSci": false,

        "name": "Lunch",
        "teachers": [

        ],
        "section": ["Altair", "Rigel"],
        "periods": {
            "single": 5,
            "double": 0,
            "triple": 0
        },
        "availability": {
            "mon": true,
            "tue": true,
            "wed": true,
            "thu": true,
            "fri": true
        },

        "definite_schedule":{
            "mon": {
                "start": null,
                "duration": null
            },
            "tue": {
                "start": null,
                "duration": null
            },
            "wed": {
                "start": null,
                "duration": null                
            },
            "thu": {
                "start": null,
                "duration": null                
            },
            "fri": {
                "start": null,
                "duration": null            
            },
        },
        
    }
}

var laboratoriesO = {
    "ca_Comlab2": {
        "name": "Comlab 2",
        "subjects": []
    },
    "ca_Comlab1": {
        "name": "Comlab 1",
        "subjects": []
    }
}