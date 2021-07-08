var msgs = {
    1: {
        "txt": "<p>" + greeting() + ", en een gelukkig nieuwjaar natuurlijk. Dit jaar is er helaas weer veel vuurwerkletsel te betreuren, maar alles lijkt onder controle op de spoedeisende hulp. De andere medische dossiers staan dit kerstreces vooralsnog op pauze. Na een kort werkbezoek morgen is de eerstvolgende ministerraad pas op 10 januari. De huidige datum vind je bovenin het scherm.</p>",
        "btn": [
            ["Volgende.", "next(9)"]
        ]
    },
    9: {
        "date": [2020, 1, 2],
        "txt": "<p>Na afloop van het werkbezoek aan het Martini Ziekenhuis heeft een journalist een vraag die weinig met het bezoek te maken heeft. “Danku, minister $NAME. De Chinese overheid maakte afgelopen dinsdag bekend een onbekende longontsteking te hebben ontdekt, en een dag later werd een markt uit voorzorg hermetisch afgesloten. Ik heb met een epidemioloog gesproken die vreest dat dit een nieuwe SARS zou kunnen zijn, hoe kijkt u daarnaar?”</p><p style='margin-top:.5em;'>Je bestuurt de simulatie door telkens keuzes te maken. Kies één van onderstaande opties.</p>",
        "btn": [
            ["“Ik weet niet meer dan u.”", "next(10)"],
            ["“Geen commentaar.”", "next(10)"],
            ["“Een nieuw virus?”", "next(10)"]
        ]
    },
    10: {
        "date": [2020, 1, 3],
        "txt": "<p><b>China pneumonia outbreak: Mystery virus probed in Wuhan (BBC)</b></p><p>Chinese authorities have launched an investigation into a mysterious viral pneumonia which has infected dozens of people in the central city of Wuhan. A total of 44 cases have been confirmed so far officials said on Friday. It comes amid fears the virus could be linked to Sars, or severe acute respiratory syndrome. The potentially deadly, flu-like Sars virus killed more than 700 people around the world in 2002-03, after originating in China.</p>",
        "btn": [
            ["Volgende.", "next(2)"]
        ]
    },
    2: {
        "date": [2020, 1, 6],
        "txt": "<p><b>Tot nu toe 59 gevallen van mysterieuze longziekte in China (NOS)</b></p><p>In de Oost-Chinese miljoenenstad Wuhan zijn tot dusver 59 besmettingen ontdekt van een mysterieuze longziekte. Volgens de WHO is onduidelijk om wat voor ziekte het gaat en waardoor deze wordt veroorzaakt, maar experts vrezen een nieuwe vorm van SARS. Vermoedelijk is het een variant van de griep, maar het is niet zeker dat het om een virusziekte gaat. Elf mensen zijn ernstig ziek, van de andere zieken is de toestand stabiel.</p>",
        "btn": [
            ["Volgende.", "next(3)"]
        ]
    },
    3: {
        "date": [2020, 1, 10],
        "txt": "<p>Na drie weken reces is de agenda van de ministerraad bomvol. Gesproken moet worden over de oplopende spanningen met Iran, eventuele steun tegen de Australische bosbranden, het verloop van het afgelopen nieuwjaar, en dat naast alle gewoonlijke besluiten. Je hebt de zorgwekkende berichten vanuit China gelezen, en weet dat de WHO het op de voet volgt. Toch lijkt enige impact op Nederland zeer onwaarschijnlijk, en andere medische dossiers zijn ook aan de orde. Breng je het onderwerp naar voren?</p>",
        "btn": [
            ["Nee, het is al te druk.", "next(5)"],
            ["Ja, het is ook belangrijk.", "next(4);setChoice('jan10Meeting',true)"]
        ]
    },
    4: {
        "date": [2020, 1, 10],
        "txt": "<p>In de toch al langere ministerraad komt het onderwerp als laatste aan bod. Je benadrukt de onduidelijkheid, maar spreekt ook zorgen uit over een mogelijke link aan eerdere SARS-epidemieën. De Minister van Buitenlandse Zaken weet dat de Verenigde Staten op 6 januari het reisadvies naar Wuhan, waar de ziekte vandaan lijkt te komen, al heeft bijgesteld met een waarschuwing. Hij vraagt om jouw advies.</p>",
        "btn": [
            ["“Een waarschuwing over de ziekte is nodig.”", "next(5);setChoice('jan10Warning',true);"],
            ["“Het is nog te vroeg voor een waarschuwing.”", "next(5);"]
        ]
    },
    5: {
        "date": [2020, 1, 11],
        "txt": "<p><b>China Reports First Death From New Virus (New York Times)</b></p><p> Chinese state media on Saturday reported the first known death from a new virus that has infected dozens of people in China and set off worries across Asia. The health commission said the patient, a 61-year-old man, died on Thursday night. While no new cases have been detected since Jan. 3, questions remain. Experts have said the incubation period for most infections is two weeks, suggesting that it may be another week before authorities can determine the full extent of the illness.</p>",
        "btn": [
            ["Volgende.", "if(getChoice('jan10Warning')){next(6)}else{next(7)}"]
        ]
    },
    6: {
        "date": [2020, 1, 13],
        "txt": "<p><b>Reisadvies Wuhan in China bijgesteld door nieuwe ziekte (Nu.nl)</b><p>Het ministerie van Buitenlandse Zaken maakte vandaag bekend dat reizigers in de stad Wuhan in China extra voorzorgsmaatregelen moeten nemen. Zo'n zestig mensen zijn daar een nieuwe, onbekende ziekte opgelopen, waardoor één persoon is overleden. Wetenschappers vermoeden dat de bron een lokale vismarkt is, maar benadrukken dat de ziekte niet besmettelijk lijkt. Het ministerie raadt reizigers aan om regelmatig hun handen te wassen, en contact met dieren en zieken te vermijden.</p>",
        "btn": [
            ["Volgende.", "next(7)"]
        ]
    },
    7: {
        "date": [2020, 1, 14],
        "txt": "<p><b>WHO says new Chinese virus could spread, warns hospitals worldwide (Reuters)</b></p><p>There may have been very limited human-to-human transmission of a new virus in China, which scientists named 2019-nCoV, within families, and it is possible there could be a wider outbreak, the WHO warned on Tuesday. This comes after a Chinese woman was quarantined in Thailand with a mystery strain of coronavirus, the first time the virus has been detected outside China. The WHO is preparing for the possibility that there could be a wider outbreak, the acting head of WHO’s emerging diseases unit told a Geneva news briefing. “It is still early days, we don’t have a clear clinical picture.”</p>",
        "btn": [
            ["Volgende.", "next(8)"]
        ]
    },
    8: {
        "date": [2020, 1, 17],
        "txt": "<p>Terwijl je het ministerie binnenloopt voor de wekelijkse ministerraad vraagt een journalist over het nieuwe virus. “Minister $NAME, in een persconferentie waarschuwde de Wereldgezondheidsorganisatie gisteren alle ziekenhuizen wereldwijd voor het nieuwe virus uit China. Moeten we ons zorgen maken over een nieuwe epidemie?”</p>",
        "btn": [
            ["“Nederland is goed voorbereid.”", "next(11);setChoice('jan17NoThreat',true);"],
            ["“Het zijn zorgwekkende berichten.”", "next(12);setChoice('jan17Threat',true);"],
            ["Je loopt snel door naar binnen.", "if(getChoice('jan10Meeting')){if(getChoice('jan10Warning')){next(16)}else{next(15)}}else{next(13)}"]
        ]
    },
    11: {
        "date": [2020, 1, 17],
        "txt": "<p>Je reageert: “We hoeven ons geen zorgen te maken. De kans dat dit virus überhaupt Nederland bereikt is klein, en daarbovenop lijkt het dat dit virus niet snel mens-op-mens verspreidt. We hebben hier de beste zorg, en staan bovenaan alle lijstjes. We zijn hier dus hartstikke goed op voorbereid, wat er ook gebeurt.”</p>",
        "btn": [
            ["Volgende.", "if(getChoice('jan10Meeting')){if(getChoice('jan10Warning')){next(16)}else{next(15)}}else{next(13)}"]
        ]
    },
    12: {
        "date": [2020, 1, 17],
        "txt": "<p>Je reageert: “Het zijn inderdaad zorgwekkende berichten vanuit China. Het ministerie staat in goed contact met de Chinese autoriteiten en de WHO, om te voorkomen dat dit uit de hand loopt. Het virus is ondertussen al één keer de grens over gegaan. We weten nog heel veel niet, maar we moeten altijd voorbereid zijn op het ergste.”</p>",
        "btn": [
            ["Volgende.", "if(getChoice('jan10Meeting')){if(getChoice('jan10Warning')){next(16)}else{next(15)}}else{next(14)}"]
        ]
    },
    13: {
        "date": [2020, 1, 17],
        "txt": "<p>De toeslagenaffaire is vandaag een groot thema in de ministerraad, maar als het nodig is zou tijd gemaakt kunnen worden voor bespreking van het mysterievirus. Het nieuwe 'coronavirus' is ondertussen internationaal gegaan: zowel naar Thailand als Japan, en de WHO waarschuwt alle landen. Toch lijken er niet veel meer mensen besmet te zijn geraakt, naast degene die zelf of wiens familie de Chinese vismarkt bezochten.</p>",
        "btn": [
            ["Bespreking is nu niet nodig.", "next(20)"],
            ["We moeten het er over hebben.", "next(14)"]
        ]
    },
    14: {
        "date": [2020, 1, 17],
        "txt": "<p>Na uitvoerige detailbespreking over de toeslagenaffaire komt het virus aan bod. Je brengt de andere ministers op de hoogte van de laatste berichten vanuit de Wereldgezondheidsorganisatie, en spreekt voorzichtige zorgen uit over het feit dat het virus al de grens over is gekomen in andere Aziatische landen. Omdat deze allemaal een link lijken te hebben met de Chinese vismarkt, stelt de minister van Buitenlandse Zaken voor het reisadvies voor Wuhan bij te stellen.</p>",
        "btn": [
            ["“Het reisadvies moet bijgesteld.”", "setChoice('jan17Warning',true);if(getChoice('jan17NoThreat')){next(17)}else if(getChoice('jan17Threat')){next(18)}else{next(19)}"],
            ["“Het reisadvies is goed zo.”", "if(getChoice('jan17NoThreat')){next(17)}else if(getChoice('jan17Threat')){next(18)}else{next(20)}"]
        ]
    },
    15: {
        "date": [2020, 1, 17],
        "txt": "<p style='margin-bottom:.5em;'>Je bent deze week achter de schermen druk bezig geweest met voorbereidingen in samenwerking met de GGD's en het RIVM. De  protocollen zijn opengeslagen, en één van de opties bleek een 'Outbreak Management Team' van epidemiologen. De minister-president vindt het nu nog niet nodig, omdat hij wil voorkomen dat er paniek zou ontstaan, als mensen zouden denken dat er grote risico's zijn. Hij laat de keuze echter aan jou over. Daarnaast vraagt de minister van Buitenlandse Zaken nogmaals of een waarschuwing voor reizigers in Wuhan nodig is, nu de situatie erger lijkt.</p>",
        "tgl": [
            ["OMT-advies vragen", "jan17OMT", true],
            ["reisadvies bijstellen", "jan17Warning", true]
        ],
        "btn": [
            ["Volgende.", "saveToggles(15);if(getChoice('jan17NoThreat')){next(17)}else if(getChoice('jan17Threat')){next(18)}else if(getChoice('jan17Warning')){next(19)}else{next(20)}"]
        ]
    },
    16: {
        "date": [2020, 1, 17],
        "txt": "<p style='margin-bottom:.5em;'>Je bent deze week achter de schermen druk bezig geweest met voorbereidingen in samenwerking met de GGD's en het RIVM. De protocollen zijn opengeslagen, en één van de opties bleek een 'Outbreak Management Team' van epidemiologen. De minister-president vindt het nu nog niet nodig, omdat hij wil voorkomen dat er paniek zou ontstaan, als mensen zouden denken dat er grote risico's zijn. Hij laat de keuze echter aan jou over.</p>",
        "btn": [
            ["OMT-advies vragen.", "setChoice('jan17OMT',true);if(getChoice('jan17NoThreat')){next(17)}else if(getChoice('jan17Threat')){next(18)}else{next(20)}"],
            ["Nog geen advies vragen.", "if(getChoice('jan17NoThreat')){next(17)}else if(getChoice('jan17Threat')){next(18)}else{next(20)}"],
        ]
    },
    17: {
        "date": [2020, 1, 17],
        "txt": "<p><b>Minister $NAME: Nederland 'hartstikke goed voorbereid' op virus (RTL Nieuws)</b></p><p>De minister van Volksgezondheid zei zich vandaag geen enkele zorgen te maken over het nieuwe 2019-nCoV virus dat vanuit China nu twee andere landen heeft bereikt. Minister $NAME benadrukte dat Nederland meer dan de meeste landen is voorbereid op dit soort ziektes. Sommige experts vrezen echter dat het virus mens-op-mens overdraagbaar is, waardoor het mogelijk tot een epidemie zou kunnen uitgroeien.</p>",
        "btn": [
            ["Volgende", "if(getChoice('jan17Warning')){next(19)}else{next(20)}"]
        ]
    },
    18: {
        "date": [2020, 1, 17],
        "txt": "<p><b>Minister $NAME: 'zorgwekkende berichten' over nieuw coronavirus (RTL Nieuws)</b></p><p>De minister van Volksgezondheid sprak vrijdag zijn zorgen uit over het 2019-nCoV virus, dat inmiddels vanuit China twee andere landen heeft bereikt. Volgens $NAME zijn voorbereidingen 'op het ergste' in volle gang, en is er veel contact met Chinese autoriteiten en de Wereldgezondheidsorganisatie om te voorkomen dat het virus uitgroeit tot een epidemie. Volgens experts is die kans klein, maar aanwezig: er zijn namelijk signalen dat het virus van mens-tot-mens verspreidt.</p>",
        "btn": [
            ["Volgende", "if(getChoice('jan17Warning')){next(19)}else{next(20)}"]
        ]
    },
    19: {
        "date": [2020, 1, 18],
        "txt": "<p><b>Reisadvies Wuhan in China bijgesteld door nieuw coronavirus (Nu.nl)</b><p>Het ministerie van Buitenlandse Zaken maakte vandaag bekend dat reizigers in de stad Wuhan in China extra voorzorgsmaatregelen moeten nemen. Al honderden zijn daar een longziekte opgelopen, waardoor minstens vier personen zijn overleden. Wetenschappers vermoeden dat de bron een lokale vismarkt is, maar het virus is ondertussen al in twee andere landen opgedoken. Het ministerie raadt reizigers aan om regelmatig hun handen te wassen, en contact met dieren en zieken te vermijden.</p>",
        "btn": [
            ["Volgende.", "next(20)"]
        ]
    },
    20: {
        "date": [2020, 1, 20],
        "txt": "<p><b>First US case of Wuhan coronavirus confirmed by CDC (CNN)</b></p><p>The United States has its first confirmed case of a new virus that appeared in Wuhan, China, the US Centers for Disease Control and Prevention announced Tuesday. The patient had recently returned from the Chinese city. The coronavirus has already sickened hundreds and killed six people in Asia. Officials said the United States will be more strict about health screenings of airplane passengers arriving from Wuhan.</p>",
        "btn": [
            ["Volgende.", ""]
        ]
    }
}


var choices = {
    "jan10Meeting": false,
    "jan10Warning": false,
    "jan17Threat": false,
    "jan17NoThreat": false,
    "jan17Inform": false,
    "jan17OMT": false,
    "jan17Warning": false
}

const epoch = 1577833200

var day = 0
var prevID = 0
var surname = "De Jonge"

var months = ["JAN", "FEB", "MRT", "APR", "MEI", "JUN", "JUL", "AUG", "SEP", "OKT", "NOV", "DEC"]
var days = ["zo", "ma", "di", "wo", "do", "vr", "za"]

function setChoice(m, b) {
    choices[m] = b
}

function getChoice(m) {
    return choices[m];
}

function dateToInt(y, m, d) {
    var get = new Date(y, m - 1, d).getTime() / 1000 - epoch;
    var get = get / 24 / 60 / 60
    return Math.round(get);
}

function name() {
    return surname;
}

function greeting() {
    today = new Date()
    if (today.getHours() < 4) {
        return "Goedenavond";
    } else if (today.getHours() < 12) {
        return "Goedemorgen";
    } else if (today.getHours() < 18) {
        return "Goedemiddag";
    } else {
        return "Goedenavond";
    }
}


function setDate(arr) {
    y = arr[0];
    m = arr[1];
    d = arr[2];
    i = dateToInt(y, m, d)
    if (i <= day) {
        return;
    }
    var timer = setInterval(function() {
        this.day += 1;
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
    surname = document.getElementById("name").value.replace(/[\[\]0-9\(\)\.\,\=\+\<\>\/\\\n]/gi, '');
    var startbtn = document.getElementsByClassName("btn0")[0];
    if (surname == "") {
        startbtn.innerHTML = "» Kies eerst een achternaam.";
        setTimeout(function() { startbtn.innerHTML = "» Start."; }, 4000);
    } else if (surname.length > 20) {
        startbtn.innerText = "» Kies een kortere achternaam.";
        setTimeout(function() { startbtn.innerHTML = "» Start."; }, 4000);
    } else {
        document.getElementById("name").setAttribute("readonly", "readonly");
        next(1);
    }
}

var tglcnt = 0;
var tglstates = [];
var firsttoggle = true;

function next(id) {
    var prevbtns = document.getElementsByClassName("btn" + prevID);
    for (var i = 0; i < prevbtns.length; i++) {
        prevbtns[i].onclick = function() {};
    }
    var p = document.createElement('div');
    console.log(choices)
    var toggles = ""
    if ("tgl" in msgs[id]) {
        if (firsttoggle) {
            toggles += "<p style='margin-bottom:.5em;'>Klik op de verschillende opties om deze wel of niet te selecteren, je keuzes worden opgeslagen als je op 'volgende' klikt.</p>";
            firsttoggle = false;
        }

        for (var i = 0; i < msgs[id]["tgl"].length; i++) {
            toggles = toggles + '<a id="tgl' + tglcnt + '" class="btn tgl' + id + '" onclick="toggle(' + tglcnt + ')">&ndash; Niet ' + msgs[id]["tgl"][i][0] + '</a><br>';
            tglstates[tglcnt] = false;
            tglcnt++;
        }
    }
    var buttons = ""
    for (var i = 0; i < msgs[id]["btn"].length; i++) {
        buttons = buttons + '<button class="btn btn' + id + '" onclick="' + msgs[id]["btn"][i][1] + '">&raquo; ' + msgs[id]["btn"][i][0] + '</button><br>';
    }
    p.innerHTML = msgs[id]["txt"].replaceAll("$NAME", surname) + toggles + buttons;
    p.setAttribute('class', 'lbox');
    var element = document.getElementById("append");
    element.insertBefore(p, element.firstChild);
    setDate(msgs[id]["date"]);
    prevID = id;
}

function toggle(i) {
    var tgltxt = document.getElementById("tgl" + i).innerHTML;
    if (tglstates[i]) {
        tglstates[i] = false;
        document.getElementById("tgl" + i).innerHTML = tgltxt.replace('Wel', 'Niet');
    } else {
        tglstates[i] = true;
        document.getElementById("tgl" + i).innerHTML = tgltxt.replace('Niet', 'Wel');
    }
}

function saveToggles(id) {
    for (var i = 0; i < msgs[id]["tgl"].length; i++) {
        tgl = i + tglcnt - msgs[id]["tgl"].length
        document.getElementById("tgl" + tgl).setAttribute("onclick", "this.onclick=function(){return false}")
        if (tglstates[tgl]) {
            setChoice(msgs[id]["tgl"][i][1], msgs[id]["tgl"][i][2]);
        }
    }
}

document.getElementById("name").focus();
document.getElementById("name").select();