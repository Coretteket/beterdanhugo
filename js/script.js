var tikkie = "https://tikkie.me/pay/i506jspbpmcl385t6uv0";
q("tikkie").href = tikkie;
q("tikkie2").href = tikkie;

console.log('%cBeter dan Hugo', 'background:#212529;color:#ebebeb;font-size:2.5em;font-family:sans-serif;font-weight:900;padding:20px;border-radius:10px;');
console.log("https://github.com/coretteket/beterdanhugo");

var id = "id";
var rand32 = window.crypto.getRandomValues(new Uint32Array(4));
rand32.forEach(e => id += e.toString(36));

var screenwidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

var mstr = "";
var lastMC = 11;

var pst = [
    "`id=${id}&os=${jscd.os}&osv=${jscd.osv}&browser=${jscd.browser}&browserv=${jscd.browserv}&theme=${(!lightmode)*1}&width=${screenwidth}&visit=${visitTime}&useragent=${navigator.userAgent}`",
    "`id=${id}&start=${startTime}&useragent=${navigator.userAgent}`",
    "`id=${id}&theme=${(!lightmode)*1}&end=${endTime}&deaths=${Math.round(s.F)}&stringency=${stringency}&measures=${mstr}&useragent=${navigator.userAgent}`"
];

setTimeout(() => { post(0); }, 5e3);

var startTime = 0;

const epoch = 1581894e3;
var cont = true;
var day = -1;

var platform = navigator.userAgent;

var ldays = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
var wdays = ["zo", "ma.", "di.", "wo.", "do.", "vr.", "za."];
var mos = ["err", "januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];

var currentPinned = 0;

var speeds = [0, 2500, 1500, 750];
var speed = 0;
var counter = speeds[3] * 2 / 3;

var y = 2020;

var lname = "De Jonge";


var beta = (url.searchParams.get("beta") != null);
var dev = (url.searchParams.get("dev") != null);
var faq = (url.searchParams.get("faq") != null);
var m = (url.searchParams.get("m") != null);
var seeded = (url.searchParams.get("s") != null);

var started = false;
var gameOver = false;
var FAQ = false;

var marr = {};


if (dev || m || seeded) {
    if (m) readMeasures();
    speeds[3] = 100;
    dev = true;
    start();
} else if (beta) {
    show("start", "disclaimer");
} else if (faq) {
    beta = true;
    show("start", "disclaimer");
    toggleFAQ();
} else {
    // show("wip");
    beta = true;
    show("start", "disclaimer");
}

dev && console.log(`Aantal artikelen: %c${nws.length}`, 'color:violet');

function readMeasures() {
    var input = url.searchParams.get("m").match(/[a-zA-Z]+|[0-9]+/g);
    var dayProcessed = 0;
    var names = Object.keys(a);
    for (var i = 0; i < input.length; i += 2) {
        dayProcessed += parseInt(input[i]);
        marr[dayProcessed] = [];
        for (var j = 0; j < input[i + 1].length; j++) {
            marr[dayProcessed].push(names[input[i + 1][j].charCodeAt(0) - 97]);
        }
    }
}

// function checkStart() {
//     // lname = q("lname").value.replace(/[\[\]0-9\(\)\.,?!=+<>/\\\n%_@#$€^&*]/gi, '');
//     // lname = lname.charAt(0).toUpperCase() + lname.slice(1);
//     var starttxt = q("starttxt");
//     if (lname.replace(/ /g, '') == "") {
//         starttxt.innerText = "Kies eerst een achternaam.";
//         setTimeout((() => { starttxt.innerHTML = "Voor we beginnen, hoe mogen we je noemen?"; }), 4e3);
//     } else if (lname.length > 25) {
//         starttxt.innerText = "Kies een kortere achternaam.";
//         setTimeout((() => { starttxt.innerHTML = "Voor we beginnen, hoe mogen we je noemen?"; }), 4e3);
//     } else {
//         start();
//     }
// }

function start() {
    startTime = Math.floor(new Date() / 1000);
    show("timechoice", "col1", "col2", "news");
    hide("disclaimer", "start", "wip");
    // newsSize();
    started = true;
    var delay = 5000 - new Date() + visitTimeL + 1000;
    setTimeout(() => { post(1); }, delay > 0 ? delay : 0);
    // setTimeout(() => { if (speed == 0) setChoices(); }, 10000)
    setSpeed(1);
    q("btn-socdis").classList.add("nudge");
}

function format(i) {
    var j = i < 10 ? Math.round(i * 10) / 10 : i;
    return j.toLocaleString('nl-NL', { maximumFractionDigits: 1 }) + "%";
}

function shares(i, j1, j2, k) {
    var txt = ""
    if (i < j1) txt += "🟩 ";
    else if (i < j2) txt += "🟨 ";
    else txt += "🟥 "
    if (i >= 100) txt += Math.round(i) + '%';
    else txt += format(Math.abs(i));
    if (k == "bevolking besmet") txt += " " + k;
    else if (i < 0) txt += " minder " + k;
    else txt += " meer " + k;
    return txt + "\n";
}

var sharetxt = "";

function end() {
    if (dev) console.log("Seed: %c" + visitTime, 'color:violet');
    if (dev) console.log("Meas: %c" + mstr, 'color:violet');

    pause();
    getStringency();
    gameOver = true;
    // q("tikkie-pseudo").href = tikkie;

    let str = "";

    var immune = s.R / s.N * 100;
    q("res-pop").innerHTML = format(immune);
    if (immune > 6) q("res-pop").classList.add("worse");
    if (immune < 4) q("res-pop").classList.add("better");

    var deaths = s.F / 100 - 100;
    var absdeath = Math.abs(deaths);
    if (deaths >= 100) q("res-dead").innerHTML = `${Math.round(absdeath/100)+1}x`;
    else q("res-dead").innerHTML = format(absdeath);
    if (deaths > 5) q("res-dead").classList.add("worse");
    if (deaths < -5) q("res-dead").classList.add("better");
    if (deaths > 0) q("deadline").innerHTML = `meer doden`;
    else q("deadline").innerHTML = `minder doden`;

    if (Math.abs(deaths) < 5) str += "iets "
    if (deaths > 0) str += "meer "
    else str += "minder "

    str += "mensen, terwijl je "

    var meas = (stringency - .5) / .5 * 100;
    var absmeas = Math.abs(meas);
    var displaymeas = format(absmeas);
    q("res-meas").innerHTML = displaymeas;
    if (meas > 5) q("res-meas").classList.add("worse");
    if (meas < -5) q("res-meas").classList.add("better");
    if (meas > 0) q("measline").innerHTML = `meer maatregelen`;
    else q("measline").innerHTML = `minder maatregelen`;

    if (Math.abs(meas) < 5) str += "iets "
    if (meas > 0) str += "meer "
    else str += "minder "

    sharetxt = "Zo deed ik het als coronaminister:\n"
    sharetxt += shares(meas, -5, 5, "maatregelen");
    sharetxt += shares(deaths, -5, 5, "doden");
    sharetxt += shares(immune, 4, 6, "bevolking besmet");
    sharetxt += "\nKan jij het beterdanhugo.nl?"

    q("twitter-share").href = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(sharetxt);
    q("mail-share").href = "mailto:?body=" + encodeURIComponent(sharetxt);

    q("eval").innerText = str;

    try {
        if (navigator.share && jscd.mobile) {
            show("mobile");
            hide("fallback");
        }
    } catch (e) {
        console.log(e);
    }

    setTimeout(() => {
        hide("timechoice", "col1", "col2", "news");
        show("gameover");
        q("bdh").onclick = restart;
        q("bdh").style = "cursor:pointer;"
        setTimeout(() => { q("mobile").getElementsByTagName("a")[0].classList.add("nudge"); }, 5000);
        endTime = Math.floor(new Date() / 1000);
        post(2);
        confettiStart = Date.now()
        if (meas < 0 && deaths < 0) confettiFrame();
    }, !dev ? 2000 : 0);
}

function startTimer() {
    startedAt = Date.now();
    requestAnimationFrame(timer);
}

function timer() {
    if (0 != speed) {
        var a = (Date.now() - startedAt) / speeds[speed];
        1 <= a && update();
        0 < a && 1 > a ? requestAnimationFrame(timer) : startTimer()
    }
};

function update() {
    day++;

    if (day in marr) {
        for (var i = 0; i < marr[day].length; i++) {
            toggles.push(marr[day][i]);
            if (!q("btn-" + marr[day][i]).classList.contains("txtsel")) q("btn-" + marr[day][i]).classList = "btn txt txtsel";
            else { q("btn-" + marr[day][i]).classList = "btn txt"; }
            // console.log(marr[day][i]);
        }
    }

    // if (day >= dateToInt(2020, 6, 1) && s.Ps[day-5] < 100) { end(); return; };
    if (day == dateToInt(2020, 6, 1) /*&& !dev*/ ) { end(); return; };
    // if (day == 12 && !a.socdis[0] > 0) {
    //     q("btn-socdis").classList.add("nudge");
    // setChoices();
    // }

    for (const [k, v] of Object.entries(a)) { if (cm(k)) a[k][5]++; };

    var intdate = intToDate(day);
    q("date").innerHTML = intdate[2] + " " + mos[intdate[1]] + " " + intdate[0];

    checkBtn();
    getIndex();
    getStringency();
    // showTut();
    setChoices();
    updateStats();
    setNews();
}

function restart() {
    window.location.href += "";
}

function act(i, j) {
    a[i][0] = j;
}

function choose(i, j) {
    c[i][0] = j;
}

var title = "";
var source = "";

function setNews() {
    title = ""
    source = "";

    getNews();

    // if (screenwidth < 600) title = hyphenate(title);

    if (day == 11) {
        var div = q("firstnews");
        div.innerHTML = '<img draggable="false" class="logo" src="img/' + source + '.jpg" width="16" height="16" alt="' + outlets[source] + ' logo"><p class="app">' + outlets[source] + ' · do. 27 februari</p><p class="newstitle">' + title + '</p>';
        var div = q("content");
        div.innerHTML = '<img draggable="false" src="img/' + source + '.jpg" width="16" height="16" alt="' + outlets[source] + ' logo"><p class="app">' + outlets[source] + ' · <span class="big">do. </span>27 februari</p><p class="newstitle">' + title + '</p>';
        // snws = [
        //     [source, "-1", title]
        // ];
    } else if (title != "") {
        if (q("scroll").children.length > 4) {
            q("scroll").addEventListener("mousedown", mouseDownHandler);
            q("scroll").style.cursor = "grab";
        }
        var a = intToDate(day);
        var div = document.createElement('div');
        div.setAttribute("class", "box desk");
        div.innerHTML += '<img class="logo" draggable="false" src="img/' + source + '.jpg" width="16" height="16" alt="' + outlets[source] + ' logo">';
        div.innerHTML += '<p class="app">' + outlets[source] + ' · ' + wdays[a[3]] + ' ' + a[2] + ' ' + mos[a[1]] + '</p>';
        div.innerHTML += "<p class='newstitle'>" + title + "</p>";
        var news = q("tut");
        news.parentNode.insertBefore(div, news.nextSibling);

        var pin = q('content');
        pin.children[0].src = 'img/' + source + '.jpg';
        pin.children[1].innerHTML = outlets[source] + ' · <span class="big">' + wdays[a[3]] + ' </span>' + a[2] + ' ' + mos[a[1]];
        pin.children[2].innerHTML = title;

        // var pluswhat = snws.length - currentPinned;
        // q("totop").innerHTML = "+" + pluswhat;

        // if (currentPinned == snws.length - 1) {
        //     snws.push([source, day, title]);
        //     updatePinned(snws.length - 1);
        // } else {
        //     snws.push([source, day, title]);
        // }

        /*if (snws.length > 5) {
            q("news").children[7].setAttribute("class", "rembox desk");
        }*/

    }
}

var paused = false;

function updateStats() {
    calcCOV();
    addData(testChart, day, s.P);
    q("testCount").innerText = s.P;
    addData(hospChart, day, s.H);
    q("hospCount").innerText = s.H;
    addData(deadChart, day, s.D);
    q("deadCount").innerText = s.D;
    // statColor();
}

function pause() {
    preSpeed = speed;
    setSpeed(0);
    q("s1").classList = "btn paused";
    q("s2").classList = "btn paused";
    q("s3").classList = "btn paused";
    q("col1").classList.add("freeze");
    q("col2").classList.add("freeze");
    paused = true;
}

function unpause() {
    q("s1").classList.remove("paused");
    q("s2").classList.remove("paused");
    q("s3").classList.remove("paused");
    q("col1").classList.remove("freeze");
    q("col2").classList.remove("freeze");
    paused = false;
    setSpeed(preSpeed);
}

// function updatePinned(i) {
//     if (i >= snws.length || i < 0) {
//         return;
//     }
//     var pin = q('content');
//     var a = intToDate(snws[i][1]);
//     pin.children[0].setAttribute('src', 'img/' + snws[i][0] + '.jpg');
//     pin.children[1].innerHTML = outlets[snws[i][0]] + ' · <span class="big">' + wdays[a[3]] + ' </span>' + a[2] + ' ' + mos[a[1]];
//     pin.children[3].innerHTML = snws[i][2];

//     currentPinned = i;

//     var pluswhat = snws.length - currentPinned - 1;
//     q("totop").innerHTML = "+" + pluswhat;

//     if (currentPinned == snws.length - 1) {
//         q("up").classList = "inactive";
//         q("down").classList = "active";
//         q("totop").style = "opacity: 0;";
//     } else if (currentPinned == 0) {
//         q("up").classList = "active";
//         q("down").classList = "inactive";
//         q("totop").style = "opacity: 1;";
//     } else {
//         q("up").classList = "active";
//         q("down").classList = "active";
//         q("totop").style = "opacity: 1;";
//     }
// }

var toggled = false;


function toggleStat(s) {
    var o = ["test", "hosp", "dead"];
    if (!o.includes(s)) return;
    toggled = true;
    removeItem(o, s);
    show(s + "Cnt");
    hide(o[0] + "Cnt", o[1] + "Cnt");
    q(s + "Btn").classList.add("statbtnactive");
    q(o[0] + "Btn").classList.remove("statbtnactive");
    q(o[1] + "Btn").classList.remove("statbtnactive");
}

// var prevLevel = 0;
// function statColor() {
//     var pt = s.P / r.testcapacity();
//     if (pt <= 0.025) level = 0;
//     if (pt > 0.025 && pt <= 0.05) level = 1;
//     if (pt > 0.05 && pt <= 0.075) level = 2;
//     if (pt > 0.075 && pt <= 0.15) level = 3;
//     if (pt > 0.15 && pt <= 0.3) level = 4;
//     if (pt > 0.3 && pt <= 0.6) level = 5; 
//     if (pt > 0.6) level = 6;
//     if (prevLevel == level) return;
//     for (let div of q("statbtns").children) {
//         for (var i = 0; i <= 6; i++) {
//             div.classList.remove("lev"+i);
//         }
//         div.classList.add("lev"+level);
//     };
//     prevLevel = level;
// }

// var FAQ = false;
var preSpeed = 0;

function toggleFAQ() {
    if ((!beta && !dev) || (paused && !gameOver)) return;
    if (FAQ) {
        q(lightmode ? "light" : "dark").classList.add("notrans");
        if (!gameOver && started) {
            show("timechoice", "col1", "col2", "news");
            setSpeed(preSpeed);
        } else if (!started) {
            show("start");
        } else if (FAQ && gameover) {
            show("gameover");
        }
        if (!gameOver) {
            q("bdh").onclick = null;
            q("bdh").style = null;
        }

        window.scrollTo(0, 0);
        hide("faq");
        FAQ = false;
        setTimeout(() => {
            q(lightmode ? "light" : "dark").offsetHeight;
            q(lightmode ? "light" : "dark").classList.remove("notrans");
        }, 100);
    } else {
        if (!gameOver) {
            q("bdh").onclick = toggleFAQ;
            q("bdh").style = "cursor:pointer;"
        }
        window.scrollTo(0, 0);
        hide( /*"disclaimermob",*/ "gameover", "timechoice", "col1", "col2", "news", "start");
        show("faq");
        // q("knowmore").innerHTML = "Terug naar spel.";
        FAQ = true;
        preSpeed = speed;
        setSpeed(0);
    }
}

var toggles = [];
var unfreeze = {};
var freeze = {};
var lock = ["eduni", "shops", "horeca", "clubs", "gather", "theater", "events", "workhome", "socdis"];

function toggleBtn(btn) {
    if (paused) { return; }
    if (q("btn-socdis").classList.contains("nudge")) q("btn-socdis").classList.remove("nudge");
    if (toggles.includes(btn)) {
        removeItem(toggles, btn);
    } else {
        toggles.push(btn);
    };
    if (!q("btn-" + btn).classList.contains("txtsel")) {
        q("btn-" + btn).classList = "btn txt txtsel";
        if (btn == "lockdown" && q("btn-curfew").classList.contains("txtsel")) {
            q("btn-curfew").classList = "btn txt";
            if (toggles.includes("curfew")) {
                removeItem(toggles, "curfew");
            } else {
                toggles.push("curfew");
            }
        } else if (btn == "curfew" && q("btn-lockdown").classList.contains("txtsel")) {
            q("btn-lockdown").classList = "btn txt";
            if (toggles.includes("lockdown")) {
                removeItem(toggles, "lockdown");
            } else {
                toggles.push("lockdown");
            }
        }
    } else {
        q("btn-" + btn).classList = "btn txt";
        if (q("btn-lockdown").classList.contains("txtsel") && lock.includes(btn)) {
            q("btn-lockdown").classList = "btn txt";
            if (toggles.includes("lockdown")) {
                removeItem(toggles, "lockdown");
            } else {
                toggles.push("lockdown");
            }
        } else if (q("btn-curfew").classList.contains("txtsel") && btn == "clubs") {
            q("btn-curfew").classList = "btn txt";
            if (toggles.includes("curfew")) {
                removeItem(toggles, "curfew");
            } else {
                toggles.push("curfew");
            }
        }
    }
    if (btn == "lockdown") {
        for (var i = 0; i < lock.length; i++) {
            if (!q("btn-" + lock[i]).classList.contains("txtsel")) {
                toggleBtn(lock[i]);
            }
        }
    } else if (btn == "curfew") {
        if (!q("btn-clubs").classList.contains("txtsel")) {
            toggleBtn("clubs");
        }
    }
    // anymeas = true;
}

function checkBtn() {
    lastMC++;
    for (var i = 0; i < toggles.length; i++) {
        var btn = toggles[i];
        var abtn = eval("a." + btn);
        mstr += lastMC > 0 ? lastMC : "";
        mstr += String.fromCharCode(Object.keys(a).indexOf(btn) + 97);
        lastMC = 0;
        var delay = abtn[3];
        if (abtn[0] <= 0) {
            act(btn, day);
            if (day in freeze) {
                freeze[day].push(btn);
            } else {
                freeze[day] = [btn];
            }
            if (day + delay in unfreeze) {
                unfreeze[day + delay].push(btn);
            } else {
                unfreeze[day + delay] = [btn];
            }
        } else {
            act(btn, -day);
            if (day in freeze) {
                freeze[day].push(btn);
            } else {
                freeze[day] = [btn];
            }
            if (day + delay in unfreeze) {
                unfreeze[day + delay].push(btn);
            } else {
                unfreeze[day + delay] = [btn];
            }
        }
    }
    toggles = [];
    if (day in freeze) {
        for (var i = 0; i < freeze[day].length; i++) {
            q("btn-" + freeze[day][i]).classList.add("paused");
            q("btn-" + freeze[day][i]).classList.remove("nudge");
            q("btn-" + freeze[day][i]).removeAttribute("onclick");
        }
    }
    if (day in unfreeze) {
        for (var i = 0; i < unfreeze[day].length; i++) {
            q("btn-" + unfreeze[day][i]).classList.remove("paused");
            q("btn-" + unfreeze[day][i]).setAttribute("onclick", "toggleBtn('" + unfreeze[day][i] + "');");
        }
    }
}

function dateToInt(y, m, d) {
    var get = new Date(y, m - 1, d).getTime() / 1000 - epoch;
    var get = get / 24 / 60 / 60
    return Math.round(get);
}

function intToDate(i) {
    t = epoch + i * 60 * 60 * 24;
    date = new Date(t * 1000);
    w = date.getDay();
    d = date.getDate();
    m = date.getMonth() + 1;
    y = date.getYear() + 1900;
    return [y, m, d, w];
}

var sped = false;

function setSpeed(i) {
    if (speed == i || paused || gameOver) return;
    if (i > 1) sped = true;
    if (speed > 0) {
        preSpeed = speed;
    }

    q("s" + speed).setAttribute('class', 'btn');
    q("s" + i).setAttribute('class', 'btn tsel');
    if (speed == 0 && i > 0) {
        q("s1").classList.remove("nudge")
        speed = i;
        startTimer();
    } else {
        speed = i;
    }
    // if (i > 0 && day == 11) showTut();
}

var lightmode = true;

function colorSwitch() {
    q(lightmode ? "light" : "dark").classList.add("notrans");
    document.documentElement.style.overflow = "hidden";
    document.body.clientWidth;
    document.documentElement.setAttribute(
        "data-color-scheme", !lightmode ? "light" : "dark"
    );
    document.documentElement.style.overflow = "";
    if (lightmode) {
        q("light").setAttribute("id", "dark");
        // q("colormode").getElementsByTagName("i")[0].innerHTML = "&#xf185;";
        show("sun");
        hide("moon");

        lightmode = false;
    } else {
        q("dark").setAttribute("id", "light");
        // q("colormode").getElementsByTagName("i")[0].innerHTML = "&#xf186;";
        hide("sun");
        show("moon");
        lightmode = true;
    }
    q(lightmode ? "light" : "dark").offsetHeight;
    q(lightmode ? "light" : "dark").classList.remove("notrans");
}

function removeItem(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}


var colors = ["#F94144", "#F8961E", "#F9C74F", "#43AA8B", "#277DA1"];

function confettiFrame() {
    if (!jscd.mobile) {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 120,
            origin: { x: -.05, y: .4 },
            colors: colors,
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 120,
            origin: { x: 1.05, y: .4 },
            colors: colors,
        });
    } else {
        confetti({
            particleCount: 5,
            angle: 270,
            spread: 55,
            origin: { y: -.5 },
            colors: colors,
        });
    }

    if (Date.now() < confettiStart + 1000) {
        requestAnimationFrame(confettiFrame);
    }
}

function randBetween(min, max) {
    return Math.random() * (max - min) + min; //Math.floor(
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function q(i) {
    return document.getElementById(i);
}

function show() {
    for (j = 0; j < arguments.length; j++) {
        q(arguments[j]).classList.remove("hide");
    }
}

function hide() {
    for (j = 0; j < arguments.length; j++) {
        q(arguments[j]).classList.add("hide");
    }
}

function post(i) {
    if (dev) return;
    var xml = new XMLHttpRequest();
    // xml.onreadystatechange = function() { if (xml.readyState == 4 && xml.status == 200) { console.log(xml.responseText); } };
    xml.open("POST", "https://nieuwindekamer.nl/bdh/data.php", true);
    xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xml.send(eval(pst[i]));
}

function share() {
    try {
        navigator.share({
            title: 'Beter dan Hugo',
            text: sharetxt.replace("beterdanhugo.nl", "Beter dan Hugo"),
            url: 'https://beterdanhugo.nl'
        });

    } catch (e) {
        console.log(e);
    }
}

// if (!Array.prototype.last) {
//     Array.prototype.last = () => {
//         return this[this.length - 1];
//     };
// };

window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches && colorSwitch();

// q("lname").addEventListener("keydown", function(a) { "Enter" == a.key && checkStart() });

document.addEventListener("keypress", function(a) { " " == a.key && 0 == speed ? setSpeed(preSpeed) : " " == a.key && 0 < speed ? setSpeed(0) : 0 < a.key && 5 > a.key && started && setSpeed(a.key - 1) });

dev || (window.onbeforeunload = () => { if (!gameOver && started) return "" });

// function newsSize() {
//     if (q('col1').offsetHeight == q('col2').offsetHeight) {
//         var pos1 = Math.round(q('stats').getBoundingClientRect().bottom);
//         var pos = Math.round(q('news').getBoundingClientRect().top);
//         var height = document.documentElement.clientHeight;
//         q('news').setAttribute("style", "max-height: " + ((height - pos > 760 ? 750 : height - pos - 10)) + "px;");
//         q('scroll').setAttribute("style", "max-height: " + (height - pos1 - 10) + "px;");
//     } else {
//         var maxheight = q('timechoice').offsetHeight + q('col1').offsetHeight + q('col2').offsetHeight;
//         var sheight = q('stats').offsetHeight + 10;
//         maxheight += q('col1').offsetHeight;
//         maxheight += q('col2').offsetHeight;
//         q('news').setAttribute("style", "max-height: " + maxheight + "px;");
//         q('scroll').setAttribute("style", "max-height: " + (maxheight - sheight) + "px;");
//     }
// }

let pos = { top: 0, y: 0 };
const mouseDownHandler = function(a) { q("scroll").style.cursor = "grabbing", pos = { top: q("scroll").scrollTop, y: a.clientY }, document.addEventListener("mousemove", mouseMoveHandler), document.addEventListener("mouseup", mouseUpHandler) },
    mouseMoveHandler = function(a) { q("scroll").scrollTop = pos.top - a.clientY + pos.y },
    mouseUpHandler = function() { document.removeEventListener("mousemove", mouseMoveHandler), document.removeEventListener("mouseup", mouseUpHandler), q("scroll").style.cursor = "grab" };

// window.addEventListener('resize', function(event) { newsSize(); }, true);

// for (var key in outlets) {
//     var img=new Image();
//     img.src="img/"+key+".jpg";
// }

for (var i = day; i < 11; i++) {
    day++;
    day < 10 ? calcCOV() : updateStats();
}
var aa = intToDate(day);
q("date").innerHTML = aa[2] + " " + mos[aa[1]] + " " + aa[0];
// setChoices();
setNews();