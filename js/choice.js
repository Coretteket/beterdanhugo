var acts = {
    10: ["Zoals nu: na het bericht over een eerste dode aan deze mysterieuze ziekte overweegt het Ministerie van Buitenlandse Zaken aanpassing van het reisadvies voor de stad Wuhan met een waarschuwing om dierenmarkten te vermijden. Wat is jouw advies?", {"Aanpassen": "delActions();", "Niet aanpassen": "delActions();"}, false]
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