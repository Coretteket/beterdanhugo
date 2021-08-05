var p = {
    jan11_warning: false
}

var acts = {
    //0: ["Welkom terug in 2020!", {"Aanpassen": "delActions();setSpeed(1);", "Niet aanpassen": "delActions();setSpeed(1);"}, false]
}

var action = ""
var actbtns = {}

function getActions() {
    if (day in acts) {
        action = acts[day][0];
        actbtns = acts[day][1];
        important = acts[day][2];
    } else {
        action = "";
        actbtns = {};
        important = false;
    }
}

function cPar(i,j) {
    p[i] = j;
}