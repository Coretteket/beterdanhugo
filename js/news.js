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

//constant news - dag staat vast, nieuws ook
var cnws = {
    10: ["nos", "Eerste Nederlander met coronavirus opgenomen in Tilburg, ‘man vierde carnaval’"],
    15: ["nyt", "‘It’s Pure Panic’: In China, Coronavirus Takes Toll on Other Patients"],
    18: ["ad", "Eerste overleden coronapatiënt (86) uit Oud-Beijerland ‘was ontzettend lieve man’"],
    24: ["telegraaf", "Coronahaard in Italië: kwart van bevolking in quarantaine, 196 doden in een dag"],
    25: ["telegraaf", "Coronahaard in Italië: kwart van bevolking in quarantaine, 196 doden in een dag"],
    26: ["telegraaf", "Coronahaard in Italië: kwart van bevolking in quarantaine, 196 doden in een dag"],
    27: ["telegraaf", "Coronahaard in Italië: kwart van bevolking in quarantaine, 196 doden in een dag"]

};

//high prio news - dag staat vast, nieuws niet
var hnws = {
    21: [
        ["!anyMeasures()", "nu", "Experts slaan alarm: Nederlandse maatregelen tegen corona dringend nodig"],
        ["g('lockdown')&&g('edlow')&&g('edmid')", "nu", "Nederland volledig op slot: alleen huis uit als het echt nodig is, scholen ook dicht"],
        ["g('lockdown')&&g('border')", "nu", "Nederland volledig op slot: alleen huis uit als het echt nodig is, grenzen gesloten"],
        ["g('lockdown')", "nu", "Nederland volledig op slot: alleen huis uit als het echt nodig is, vermijd groepen"]
    ]
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
                return;
            }
        }
    } else if (day in cnws) {
        source = cnws[day][0];
        title = vars(cnws[day][1]);
        lastNews = day;
        return;
    } else if (day > lastNews + 3) {
        //
    }
}

function vars(a) {
    if (!a.includes("$")) { return a; }
    a = a.replace("$lname", lname);
    return a;
}