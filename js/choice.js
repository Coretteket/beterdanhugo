var acts = {
    //te maken acties
}

var chos = {
    1: ["Welkom terug in 2020!", {"Aanpassen": "delActions();", "Niet aanpassen": "delActions();"}, false]
}

var choice = ""
var chobtns = {}

function getActions() {
    if (day in chos) {
        choice = chos[day][0];
        chobtns = chos[day][1];
        important = chos[day][2];
    } else {
        choice = "";
        chobtns = {};
        important = false;
    }
}

function act(i,j) {
    a[i] = j;
}

function choose(i,j) {
    c[i] = j;
}