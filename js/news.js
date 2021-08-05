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
    // 2: ["bbc", "China pneumonia outbreak: Mystery virus probed in Wuhan"]
};

//high prio news - dag staat vast, nieuws niet
var hnws = {
    // 17: [
    //     ["p['jan11_warning']", "telegraaf", "Mogelijk meer dan duizend besmet in Wuhan, reisadvies aangepast"],
    //     ["!p['jan11_warning']", "telegraaf", "Mogelijk meer dan duizend besmet in Wuhan, tientallen Nederlanders gestrand"]
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