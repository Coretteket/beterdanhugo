var tutdays = [12, 20, 28, 36, 44];

var tut = [
    ["!anyMeasures();", "Je kan op elk moment een maatregel invoeren of afschaffen door <span class='desk'>links</span><span class='mob'>hieronder</span> op één van de knoppen te klikken."],
    ["!toggled", "<span class='desk'>Hierboven</span><span class='mob'>Bovenaan</span> staan actuele cijfers over de verspreiding van corona. Met de knoppen kan je de verschillende grafieken zien."],
    ["!sped", "Met de tijdsknoppen <span class='desk'>links</span><span class='mob'>hieronder</span> kan je de simulatie versnellen of op pauze zetten."],
    ["anytuts", "Het is belangrijk om het nieuws <span class='desk'>hieronder</span><span class='mob'>hierboven</span> in de gaten te houden, zodat je weet wat er in de samenleving speelt."]
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
    if (tutdays.includes(day) /*&& !dev*/ ) {
        console.log(tut)
        if (tut.length == 0) {
            remTut();
            return;
        }
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
                console.log(tuttxt)
                anytuts = true;
                nowtut = true;
                q("tut").innerHTML = "<p>" + tuttxt + "</p>" + "<i class='fas fa-times' onclick='remTut()'></i>";
                q("tut").classList = "box tut";
                break;
            }
        }

    }
    // if (tutdays.includes(day+1) && !dev) {
    //     remTut();
    // }
}

function remTut() {
    q("tut").classList = "box tut remtut";
}