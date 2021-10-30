var chos = {
    // 45: ["Je bent live in een tv-programma over het oprukkende coronavirus, als een assistent je een briefje doorschuift. De eerste Nederlandse coronapatiënt blijkt zojuist in het ziekenhuis te zijn opgenomen. Als minister is het vanaf nu jouw taak om de uitbraak onder controle te krijgen.", {"Aanpassen": "delActions();", "Niet aanpassen": "delActions();"}],
    // 14: ["Beep boop", {"Optie één": "delActions();", "Optie twee": "delActions();", "Optie drie": "delActions();", "Optie vier": "delActions();"}]
}

var cho = "";
var chobtns = {};

function getChoices() {
    if (day in chos) {
        cho = chos[day][0];
        chobtns = chos[day][1];
    } else {
        cho = "";
        chobtns = {};
    }
}