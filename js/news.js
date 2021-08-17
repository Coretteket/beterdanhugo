var outlets = {
    "nos": "NOS Nieuws",
    "rtl": "RTL Nieuws",
    "nu": "NU.nl",
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
    11: ["bbc", "China pneumonia outbreak: Mystery virus probed in Wuhan"],
    15: ["nos", "Tot nu toe 59 gevallen van mysterieuze longziekte in China"],
    19: ["rtl", "Mysterieuze longziekte lijkt nieuw virus, mogelijk verwant aan SARS"],
    23: ["volkskrant", "Mysterieus longvirus eist eerste leven: 61-jarige Chinees overleden"],
    27: ["nyt", "As First Thailand Case Emerges, WHO Urges China to Search for Virus Source"],
    31: ["nos", "Nieuw virus ook in Japan vastgesteld, patiënt maakt het goed"],
    35: ["bbc", "New virus in China 'has likely already infected hundreds'"],
    39: ["rtl", "Chinese overheid: nieuw coronavirus is van mens op mens overdraagbaar"],
    43: ["nos", "Minister $lname: Nederland goed voorbereid op nieuw virus"]
};

//high prio news - dag staat vast, nieuws niet
var hnws = {
    // 17: [
    //     ["c['jan11_warning']", "telegraaf", "Mogelijk meer dan duizend besmet in Wuhan, reisadvies aangepast"],
    //     ["!c['jan11_warning']", "telegraaf", "Mogelijk meer dan duizend besmet in Wuhan, tientallen Nederlanders gestrand"]
    // ]
}

//low prio news - dag staat niet vast, nieuws ook niet
var lnws = {

}

var lastNews = -1;

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