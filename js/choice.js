var acts = {
    // 12: ["btn-p1000"],
    // 15: ["btn-p1000"]
}

var chos = {
    12: ["Belangrijk", "Welkom terug in 2020! Een journalist vraagt je of we ons zorgen moeten maken over de mysterieuze longziekte uit Wuhan, die nu ook Frankrijk heeft bereikt. Hoe reageer je?", {"Aanpassen": "delActions();", "Niet aanpassen": "delActions();"}]
}

var chotit = ""
var cho = "";
var chobtns = {};

function getChoices() {
    if (day in chos) {
        chotit = chos[day][0];
        cho = chos[day][1];
        chobtns = chos[day][2];
    } else {
        cho = "";
        chobtns = {};
    }
}

function showActions() {
    if (day in acts) {
        for (var i = 0; i < acts[day].length; i++) {
            if (q(acts[day][i]).classList.contains("d-none")) {
                q(acts[day][i]).setAttribute("class","btn txt");
            } else {
                q(acts[day][i]).setAttribute("class","btn txt d-none");
            }
        }
    }
}

function act(i,j) {
    a[i][0] = j;
}

function choose(i,j) {
    c[i][0] = j;
}