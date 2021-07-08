var msgs = {
    1: {
        "txt": "<p><b>China pneumonia outbreak: Mystery virus probed in Wuhan (BBC)</b></p><p>Chinese authorities have launched an investigation into a mysterious viral pneumonia which has infected dozens of people in the central city of Wuhan. It comes amid online fears the virus could be linked to Sars, or severe acute respiratory syndrome. The potentially deadly, flu-like Sars virus killed more than 700 people around the world in 2002-03, after originating in China. Local authorities say there has been no human-to-human transmission. However, a number of those infected worked at a seafood market in the city, leading authorities to clean the area.</p>",
        "btn": [
            ["Volgende.", "next(2);setDate(2020, 1, 6)"]
        ]
    },
    2: {
        "txt": "<p><b>Tot nu toe 59 gevallen van mysterieuze longziekte in China (NOS)</b></p><p>In de Oost-Chinese miljoenenstad Wuhan zijn tot dusver 59 besmettingen ontdekt van een mysterieuze longziekte. Volgens de WHO is onduidelijk om wat voor ziekte het gaat en waardoor deze wordt veroorzaakt, maar zou het vaststaan dat de ziekte niet lijkt op eerdere uitbraken. Vermoedelijk is het een vorm van griep, maar het is zelfs niet zeker dat het om een virusziekte gaat. Elf mensen zijn ernstig ziek, van de andere zieken is de toestand vooralsnog stabiel.</p>",
        "btn": [
            ["Volgende.", "next(3);setDate(2020, 1, 10)"]
        ]
    },
    3: {
        "txt": "<p>Na drie weken reces is de agenda van de ministerraad bomvol. Gesproken moet worden over de oplopende spanningen met Iran, eventuele steun tegen de Australische bosbranden, het verloop van het afgelopen nieuwjaar, en dat naast alle gewoonlijke besluiten. Je hebt de zorgwekkende berichten vanuit China gelezen, en weet dat de WHO het op de voet volgt. Toch lijkt enige impact op Nederland zeer onwaarschijnlijk, en andere medische dossiers zijn ook aan de orde. Breng je het onderwerp naar voren?</p>",
        "btn": [
            ["Nee, het is al te druk.", "next(5);setDate(2020,1,11);"],
            ["Ja, het is ook belangrijk.", "next(4);"]
        ]
    },
    4: {
        "txt": "<p>In de toch al langere ministerraad komt het onderwerp als laatste aan bod. Je benadrukt de onduidelijkheid, maar spreekt ook zorgen uit over een mogelijke link aan eerdere SARS-epidemieën. De Minister van Buitenlandse Zaken weet dat de Verenigde Staten op 6 januari het reisadvies naar Wuhan, waar de ziekte vandaan lijkt te komen, al heeft bijgesteld met een waarschuwing. Hij vraagt om jouw advies.</p>",
        "btn": [
            ["Een waarschuwing over de ziekte is nodig.", "next(5);setDate(2020,1,11);setMeasure('warningWuhan',true);"],
            ["Het is nog te vroeg voor een waarschuwing.", "next(5);setDate(2020,1,11)"]
        ]
    },
    5: {
        "txt": "<p><b>China Reports First Death From New Virus (New York Times)</b></p><p> Chinese state media on Saturday reported the first known death from a new virus that has infected dozens of people in China and set off worries across Asia. The Xinhua news agency cited the health commission in the central Chinese city of Wuhan, where the illness first appeared, in reporting the death. The health commission said the patient, a 61-year-old man, died on Thursday night. While no new cases have been detected since Jan. 3, questions remain. Experts have said the minimum incubation period for some infections is 15 days, suggesting that it may be another week before authorities can determine the full extent of the illness.</p>",
        "btn": [
            ["Volgende.", "if(getMeasure('warningWuhan')){next(6);setDate(2020,1,13)}else{next(7);setDate(2020,1,14)};"]
        ]
    },
    6: {
        "txt": "<p><b>Reisadvies Wuhan in China bijgesteld door nieuwe ziekte (Nu.nl)</b><p>Het ministerie van Buitenlandse Zaken maakte vandaag bekend dat reizigers in de stad Wuhan in China extra voorzorgsmaatregelen moeten nemen. Zo'n zestig mensen zijn daar een nieuwe, onbekende ziekte opgelopen, waardoor één persoon is overleden. Chinese wetenschappers vermoeden dat de bron een lokale vismarkt is, maar benadrukken dat de ziekte niet besmettelijk lijkt. Het ministerie raadt reizigers aan om regelmatig hun handen te wassen, en contact met dieren en zieken te vermijden.</p>",
        "btn": [
            ["Volgende.", "next(7);setDate(2020,1,14);"]
        ]
    },
    7: {
        "txt": "<p><b>WHO says new Chinese virus could spread, warns hospitals worldwide (Reuters)</b></p><p>There may have been limited human-to-human transmission of a new virus in China within families, and it is possible there could be a wider outbreak, the WHO warned on Tuesday. Yesterday, a Chinese woman was quarantined in Thailand with a mystery strain of coronavirus, the first time the virus has been detected outside China. The WHO is preparing for the possibility that there could be a wider outbreak, Maria Van Kerkhove, acting head of WHO’s emerging diseases unit, told a Geneva news briefing. “It is still early days, we don’t have a clear clinical picture.”</p>",
        "btn": [
            ["Volgende.", "next(8);setDate(2020,1,15);"]
        ]
    },
    8: {
        "txt": "<p>Na afloop van een werkbezoek aan het Martini Ziekenhuis heeft een journalist een vraag over het nieuwe virus. “Minister $NAME, in een persconferentie waarschuwde de Wereldgezondheidsorganisatie gisteren alle ziekenhuizen wereldwijd voor het 2019-nCoV virus. Moeten we ons zorgen maken over een nieuwe epidemie als SARS?”</p>",
        "btn": [
            ["Nederland is goed voorbereid."],
            ["Het zijn zorgwekkende berichten."]
        ]
    }
}

var measures = {
    "warningWuhan": false
}

const epoch = 1577833200

var day = 0
var prevID = 0
var surname = "De Jonge"

var months = ["JAN", "FEB", "MRT", "APR", "MEI", "JUN", "JUL", "AUG", "SEP", "OKT", "NOV", "DEC"]
var days = ["zo", "ma", "di", "wo", "do", "vr", "za"]

function setMeasure(m, b) {
    measures[m] = Boolean(b)
}

function getMeasure(m) {
    return measures[m];
}

function dateToInt(y, m, d) {
    var get = new Date(y, m - 1, d).getTime() / 1000 - epoch;
    var get = get / 24 / 60 / 60
    return Math.round(get);
}

function name() {
    return surname;
}


function setDate(y, m, d) {
    i = dateToInt(y, m, d)
    if (i <= day) {
        return;
    }
    console.log(day)
    var timer = setInterval(function() {
        this.day += 1;
        console.log(this.day)
        t = epoch + this.day * 60 * 60 * 24;
        date = new Date(t * 1000);
        w = date.getDay();
        d = date.getDate();
        m = date.getMonth();
        y = date.getYear() + 1900;
        var moyear = document.getElementById("ctop");
        moyear.innerText = months[m] + " " + y;
        var day = document.getElementById("cbottom");
        day.innerText = ((d < 10) ? "0" + d.toString() : d);
        var mob = document.getElementById("date");
        mob.innerText = ((d < 10) ? "0" + d.toString() : d) + "/" + ((m + 1 < 10) ? "0" + (m + 1).toString() : m + 1) + "/" + y;
        var wkd = document.getElementById("weekday");
        wkd.innerText = days[w] + ".";
        if (this.day == i) {
            clearInterval(timer);
        }
        if (this.day >= dateToInt(2020, 3, 18)) {
            document.getElementById("hugo").innerText = "Hugo";
            document.getElementById("hugo").removeAttribute('id', "hugo");
        }
    }, 200);
}

function start() {
    surname = document.getElementById("name").innerText.replace(/[\[\]0-9\(\)\.\,\=\+\<\>\/\\\n]/gi, '');
    console.log(surname)
    var startbtn = document.getElementsByClassName("btn0")[0];
    if (surname == "Typ uw achternaam hier") {
        startbtn.innerHTML = "&raquo; Kies eerst een achternaam.";
        setTimeout(function() { startbtn.innerHTML = "&raquo; Volgende."; }, 4000);
    } else if (surname.length > 20) {
        startbtn.innerText = "&raquo; Kies een kortere achternaam.";
        setTimeout(function() { startbtn.innerHTML = "&raquo; Volgende."; }, 4000);
    } else {
        document.getElementById("name").removeAttribute("contenteditable");
        document.getElementById("name").innerHTML = surname;
        next(1);
        setDate(2020, 1, 3);
    }
}

function next(id) {
    var prevbtns = document.getElementsByClassName("btn" + prevID);
    for (var i = 0; i < prevbtns.length; i++) {
        prevbtns[i].onclick = function() {};
    }
    var p = document.createElement('div');
    console.log(msgs[id])
    var buttons = ""
    for (var i = 0; i < msgs[id]["btn"].length; i++) {
        buttons = buttons + '<button class="btn btn' + id + '" onclick="' + msgs[id]["btn"][i][1] + '">&raquo; ' + msgs[id]["btn"][i][0] + '</button>';
    }
    p.innerHTML = msgs[id]["txt"].replace("$NAME", surname) + buttons;
    p.setAttribute('class', 'lbox');
    var element = document.getElementById("append");
    element.insertBefore(p, element.firstChild);
    prevID = id
}

document.getElementById("name").focus();
document.getElementById("name").select();