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

//constant news - dag staat vast, nieuws ook
var cnws = {
    2: ["bbc", "China pneumonia outbreak: Mystery virus probed in Wuhan"],
    5: ["nos", "Tot nu toe 59 gevallen van mysterieuze longziekte in China"],
    8: ["rtl", "Mysterieuze longziekte lijkt nieuw virus, mogelijk verwant aan SARS"],
    10: ["volkskrant", "Mysterieus longvirus eist eerste leven: 61-jarige Chinees overleden"],
    13: ["reuters", "Thailand finds first case of new Chinese virus, says no outbreak"],
    15: ["nos", "Nieuw virus ook in Japan vastgesteld, patiënt maakt het goed"],
    17: ["bbc", "New virus in China 'has likely already infected hundreds'"],
    19: ["rtl", "Chinese overheid: nieuw coronavirus is van mens op mens overdraagbaar"],
    21: ["cnn", "First US case of Wuhan coronavirus confirmed by CDC"],
    24: ["nyt", "Coronavirus Is Spreading, but W.H.O. Says It’s Not a Global Emergency"]
};

//high prio news - dag staat vast, nieuws niet
var hnws = {
    2: [
        ["dev == false", "bbc", "China pneumonia outbreak: Mystery virus probed in Wuhan"],
        ["dev == true", "bbc", "Whatcha know about rolling out in the deep end"]
    ]
}

//low prio news - dag staat niet vast, nieuws ook niet
var lnws = {

}

var lastNews = -1;

var boop = "day == 3";

function getNews() {
    if (day in hnws) {
        for (var i = 0; i < hnws[day].length; i++) {
            if (eval(hnws[day][i][0])) {
                source = hnws[day][i][1];
                title = vars(hnws[day][i][2]);
                lastNews = day;
                console.log(dev);
                break;
            }
        }
    } else if (day in cnws) {
        source = cnws[day][0];
        title = vars(cnws[day][1]);
        lastNews = day;
    }
    // lnws if >=2 days
}

function vars(a) {
    if (!a.includes("$")) { return a; }
    a = a.replace("$lname", lname);
    return a;
}