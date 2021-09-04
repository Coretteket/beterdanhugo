var tut = {
    13: ["!anyMeasures();", "Je kan op elk moment een maatregel invoeren of afschaffen door op de bijbehorende knop te klikken."],
    21: ["!toggled", "<span class='d-none d-md-inline'>Hierboven</span><span class='d-inline d-md-none'>Bovenaan</span> staan cijfers over de verspreiding van corona. Met de knoppen kan je de verschillende grafieken zien."],
    29: ["!sped", "Met de tijdsknoppen <span class='d-none d-md-inline'>links</span><span class='d-inline d-md-none'>hieronder</span> kan je de simulatie versnellen of op pauze zetten."],
    37: ["!anymeas || !sped || !toggled", "Het is belangrijk om het nieuws <span class='d-none d-md-inline'>hieronder</span><span class='d-inline d-md-none'>hierboven</span> in de gaten te houden, zodat je weet wat er in de samenleving speelt."],

}

var anymeas = false;

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
    if (day in tut && !dev) {
        lastTut = day;
        var tuttxt = "";
        for (i = 0; i < tut[day].length; i += 2) {
            if (eval(tut[day][i])) {
                tuttxt += tut[day][i + 1];
            }
        }
        q("tut").innerHTML = "<p>" + tuttxt + "</p>" + "<i class='fas fa-times' onclick='remTut()'></i>";
        if (tuttxt != "") q("tut").classList = "box tut";
    }
    // evt tijd stopen?
}

function remTut() {
    q("tut").classList = "box tut remtut";
}