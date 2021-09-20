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
    "cnn": "CNN",
    "ad": "Algemeen Dagblad"
};

var nws = {
    11: [
        ["nos", "Eerste Nederlander met coronavirus opgenomen in Tilburg, ‘man vierde carnaval’"],
        ["telegraaf", "Eerste opgenomen corona-patiënt is 56-jarige zakenman uit Loon op Zand"],
        ["nu", "RIVM: eerste coronageval in Nederland, man kwam uit risicogebied Italië"]
    ],
    15: [
        ["nyt", "‘It’s Pure Panic’: In China, Coronavirus Takes Toll on Other Patients"]
    ],
    18: [
        ["ad", "Eerste overleden coronapatiënt (86) uit Oud-Beijerland ‘was ontzettend lieve man’"]
    ],
    24: [
        ["telegraaf", "Coronahaard in Italië: kwart van bevolking in quarantaine, 196 doden in een dag"]
    ],
    25: [
        ["telegraaf", "Coronahaard in Italië: kwart van bevolking in quarantaine, 196 doden in een dag"]
    ],
    26: [
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
    if (!a.includes("$")) { return a; }
    a = a.replace("$lname", lname);
    return a;
}