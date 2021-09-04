var acts = {
    // 12: ["btn-p1000"],
    // 15: ["btn-p1000"]
}

var chos = {
    //10: ["", "Je bent live in een tv-programma over het oprukkende coronavirus, als een assistent je een briefje doorschuift. De eerste Nederlandse coronapatiënt blijkt zojuist in het ziekenhuis te zijn opgenomen. Als minister is het vanaf nu jouw taak om de uitbraak onder controle te krijgen.", {"Aanpassen": "delActions();", "Niet aanpassen": "delActions();"}]
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
                q(acts[day][i]).classList = "btn txt";
            } else {
                q(acts[day][i]).classList = "btn txt d-none";
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