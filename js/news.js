var seed = ""

var outlets = {
    "nos": "NOS",
    "rtl": "RTL",
    "nu": "NU.nl",
    "bbc": "BBC",
    "volkskrant": "Volkskrant",
    "telegraaf": "Telegraaf",
    "nrc": "NRC",
    "trouw": "Trouw",
    "reuters": "Reuters",
    "nyt": "NYT",
    "cnn": "CNN",
    "ad": "AD"
};

var nws = {
    11: [
        ["nos", "Eerste Nederlander met coronavirus opgenomen in Tilburg, `man vierde carnaval'"],
        ["rtl", "Ondernemer uit Loon op Zand is eerste coronapatiënt in het ziekenhuis"],
        ["nu", "RIVM: eerste coronageval in Nederland, man kwam uit risicogebied Italië"]
    ],
    14: [
        ["nrc", "Zijn we voorbereid een epidemie? `Kabinet moet harde maatregelen durven nemen'"],
        ["volkskrant","Epidemiologen waarschuwen: `Coronavirus kan heel snel uit de hand lopen'"],
        ['trouw',"`Het verleden leert ons: maatregelen tegen een epidemie komen eigenlijk altijd te laat'"]
    ],
    18: [
        ["ad", "Eerste overleden coronapatiënt (86) uit Oud-Beijerland ‘was ontzettend lieve man’"]
    ],
    24: [
        ["telegraaf", "Coronahaard in Italië: kwart van bevolking in quarantaine, 196 doden in een dag"]
    ],
    
//     21: [
//         ["!anyMeasures()", "nu", "Experts slaan alarm: Nederlandse maatregelen tegen corona dringend nodig"],
//         ["g('lockdown')&&g('edlow')&&g('edmid')", "nu", "Nederland volledig op slot: alleen huis uit als het nodig is, scholen ook dicht"],
//         ["g('lockdown')&&g('border')", "nu", "Nederland volledig op slot: alleen huis uit als het echt nodig is, grenzen gesloten"],
//         ["g('lockdown')", "nu", "Nederland volledig op slot: alleen huis uit als het echt nodig is, vermijd groepen"]
//     ]
}

var lastNews = -1;

function getNews() {
    if (day in nws) {
        if (Object.keys(outlets).includes(nws[day][0][0])) {
            rI = randInt(0, nws[day].length - 1);
            seed += rI;
            source = nws[day][rI][0];
            title = vars(nws[day][rI][1]);
            lastNews = day;
            return;
        } else {
            for (var i = 1; i < nws[day].length - 1; i++) {
                if (eval(nws[day][i][0])) {
                    source = nws[day][i][1];
                    title = vars(nws[day][i][2]);
                    lastNews = day;
                    return;
                }
            }
        }
    }
}

function vars(a) {
    a = a.replace("$lname", lname);
    a = a.replace("`","‘");
    a = a.replace("'","’")
    return a;
}