var cchos = {
    noMeasureMotion: ["In het coronadebat was de Tweede Kamer glashelder: nu er dagelijks honderden mensen positief getest worden op corona, kunnen we niet door blijven gaan alsof er niets aan de hand is. Een motie die de minister oproept om maatregelen te nemen werd unaniem aangenomen. Voer je de motie uit?", {"Neem maatregelen": "", "Negeer motie": ""}],
};

var chos = {}

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