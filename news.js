var snws = {
    2: ["bbc", "China pneumonia outbreak: Mystery virus probed in Wuhan"],
    5: ["nos", "Tot nu toe 59 gevallen van mysterieuze longziekte in China"],
    8: ["rtl", "Mysterieuze longziekte lijkt nieuw virus, mogelijk verwant aan SARS"],
    10: ["volkskrant", "Mysterieus longvirus eist eerste leven: 61-jarige Chinees overleden"],
    13: ["nyt", "As First Thailand Case Emerges, WHO Urges China to Search for Virus Source"],
    15: ["nos", "Nieuw virus ook in Japan vastgesteld, patiënt maakt het goed"],
    17: ["bbc", "New virus in China 'has likely already infected hundreds'"],
    19: ["rtl", "Chinese overheid: nieuw coronavirus is van mens op mens overdraagbaar"],
    21: ["nos", "Minister $NAME: Nederland goed voorbereid op nieuw virus"]
};

var nws = {
    0: [],
    1: [],
    2: []
};

function getNews() {
    if (day in snws) {
        source = snws[day][0];
        title = snws[day][1].replace("$NAME", lname);
    }
}