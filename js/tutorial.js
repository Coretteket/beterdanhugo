var tutdays = [13, 23, 33, 43];
var byetuts = [22, 32, 42, 52];

var tut = [
    ["!anyMeasures();", "Je kan op elk moment een maatregel invoeren of afschaffen door op de bijbehorende knop te klikken."],
    ["!toggled", "<span class='d-none d-md-inline'>Hierboven</span><span class='d-inline d-md-none'>Bovenaan</span> staan actuele cijfers over de verspreiding van corona. Met de knoppen kan je de verschillende grafieken zien."],
    ["!sped", "Met de tijdsknoppen <span class='d-none d-md-inline'>links</span><span class='d-inline d-md-none'>hieronder</span> kan je de simulatie versnellen of op pauze zetten."],
    ["anytuts", "Het is belangrijk om het nieuws <span class='d-none d-md-inline'>hieronder</span><span class='d-inline d-md-none'>hierboven</span> in de gaten te houden, zodat je weet wat er in de samenleving speelt."]
]

var anymeas = false;
var anytuts = false;
var nowtut = false;

function anyMeasures() {
    for (const [key, value] of Object.entries(a)) {
        if (a[key][0] > 0) {
            anymeas = true;
            return anymeas;
        }
    }
    return anymeas;
}

function showTut() {
    if (tutdays.includes(day) && !dev) {
        console.log(day);
        for (var i = 0; i < tut.length; i++) {
            var tuttxt = "";
            for (var j = 0; j < tut[i].length; j += 2) {
                if (eval(tut[i][j])) {
                    tuttxt += tut[i][j + 1];
                }
            }
            tut.splice(i, 1);
            i--;
            if (tuttxt != "") {
                anytuts = true;
                nowtut = true;
                q("tut").innerHTML = "<p>" + tuttxt + "</p>" + "<i class='fas fa-times' onclick='remTut()'></i>";
                q("tut").classList = "box tut";
                break;
            }
        }

    }
    if (nowtut && byetuts.includes(day)) {
        remTut();
        nowtut = false;
    }
}

function remTut() {
    q("tut").classList = "box tut remtut";
}