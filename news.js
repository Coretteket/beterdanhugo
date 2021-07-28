var outlets = {
    "nos": "NOS Nieuws",
    "rtl": "RTL Nieuws",
    "nu": "Nu.nl",
    "bbc": "BBC News",
    "volkskrant": "Volkskrant",
    "telegraaf": "Telegraaf",
    "nrc": "NRC Handelsblad",
    "reuters": "Reuters",
    "nyt": "New York Times",
    "cnn": "CNN"
};

var snws = [
    ["reuters", "0", "Chinese officials investigate cause of pneumonia outbreak in Wuhan"]
];

var cnws = {
    2: ["bbc", "China pneumonia outbreak: Mystery virus probed in Wuhan"],
    5: ["nos", "Tot nu toe 59 gevallen van mysterieuze longziekte in China"],
    8: ["rtl", "Mysterieuze longziekte lijkt nieuw virus, mogelijk verwant aan SARS"],
    10: ["volkskrant", "Mysterieus longvirus eist eerste leven: 61-jarige Chinees overleden"],
    13: ["nyt", "As First Thailand Case Emerges, WHO Urges China to Search for Virus Source"],
    15: ["nos", "Nieuw virus ook in Japan vastgesteld, patiënt maakt het goed"],
    17: ["bbc", "New virus in China 'has likely already infected hundreds'"],
    19: ["rtl", "Chinese overheid: nieuw coronavirus is van mens op mens overdraagbaar"],
    21: ["cnn", "First US case of Wuhan coronavirus confirmed by CDC"],
    24: ["nyt", "Coronavirus Is Spreading, but W.H.O. Says It’s Not a Global Emergency"]
};

var nws = {
    0: [],
    1: [],
    2: []
};

function getNews() {
    if (day in cnws) {
        source = cnws[day][0];
        title = cnws[day][1].replace("$NAME", lname);
    }
}