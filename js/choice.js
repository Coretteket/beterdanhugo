var acts = {
    60: ["Onderweg naar de ministerraad stelt een journalist een vraag. “De WHO waarschuwde gisteren alle ziekenhuizen over het coronavirus. Moeten we ons zorgen maken over een epidemie?”", {"Ja, zeker": "delActions();","Nee": "delActions();"}]
}

var action = ""
var actbtns = {}

function getActions() {
    if (day in acts) {
        action = acts[day][0];
        actbtns = acts[day][1];
    } else {
        action = "";
        actbtns = {};
    }
}