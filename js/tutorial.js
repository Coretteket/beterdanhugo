var tutdays = [11, 11, 19, 26, 33, 40];

var tut = [
    ["speed==0", "Klik <span class='desk'>linksboven</span> op de startknop <span class='mob'>hieronder</span> om het spel te beginnen."],
    ["!anyMeasures();", "Je kan op elk moment een maatregel invoeren of afschaffen door <span class='desk'>links</span><span class='mob'>hieronder</span> op één van de knoppen te klikken."],
    ["!sped", "Met de tijdsknoppen <span class='desk'>linksboven</span><span class='mob'>hieronder</span> kan je het spel versnellen of op pauze zetten."],
    ["anytuts", "Het is belangrijk om het nieuws <span class='desk'>hieronder</span><span class='mob'>hierboven</span> in de gaten te houden, zodat je weet wat er speelt in de samenleving."],
    ["anytuts&&!toggled", "<span class='desk'>Hierboven</span><span class='mob'>Bovenaan</span> staan actuele cijfers over de verspreiding van corona. Met de knoppen kan je de verschillende grafieken zien."],
]

var anymeas = false;
var anytuts = false;
var nowtut = false;

function anyMeasures() {
    checkBtn();
    for (const [key, value] of Object.entries(a)) {
        if (a[key][0] > 0) {
            anymeas = true;
            return anymeas;
        }
    }
    return anymeas;
}

var stoptut = false;

function showTut() {
    if (dev) return;
    if (tutdays.includes(day) && !stoptut /*&& aname == null*/ ) {
        // hide("tutnudge");
        var changed = false;
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
                changed = true;
                q("tut").innerHTML = "<p>" + tuttxt + "</p>" + "<span id='x' onClick='remTut()'>×</span>";
                q("tut").classList = "box tut";
                // console.log(tuttxt);

                // setTimeout(() => {
                //     // q("tutnudge").style = `top:${q("tut").getBoundingClientRect().top}px;left:${q("tut").getBoundingClientRect().left}px;height:${q("tut").offsetHeight }px;width:${q("tut").offsetWidth}px;`;
                //     // show("tutnudge")
                // }, 400);
                break;
            }
        }
        if (!changed) remTut();

    }
}

function remTut() {
    stoptut = true;
    q("tut").classList = "box tut remtut";
}