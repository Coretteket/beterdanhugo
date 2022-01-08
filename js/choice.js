var prompts = [
    // ["Spel beginnen", "Begin het spel door <span class='desk'>links</span>boven<span class='mob'>aan</span> op de startknop (<i class='fas fa-play'></i>) te klikken. Je kan daarna wanneer je wil het spel versnellen of pauzeren met de andere tijdsknoppen.", "day==11&&speed==0"],
    ["Maatregelen nemen", "Je kan op elk moment een maatregel invoeren door op de bijbehorende knop te klikken. Probeer een combinatie van maatregelen te vinden die het virus onder controle kan houden.", "day==18&&index<.05"],
    ["Maatregelen nemen", "Je kan op elk moment nieuwe maatregelen invoeren als je denkt dat dat nodig is. Probeer een combinatie van maatregelen te vinden die het virus onder controle kan houden.", "day==18&&index>=.05"],
    ["Gevolgen van beleid", "Het duurt soms even voordat je de impact van jouw beleid in de coronacijfers terugziet, daarom is het ook belangrijk om het binnen&shy;komende nieuws goed in de gaten te houden.", "day==28"],
    ["Maatregelen afschaffen", "Coronamaatregelen zijn ingrijpend, gebruik ze dus zo kort mogelijk. Als jij denkt dat de cijfers het toelaten, kan je ze afschaffen door opnieuw op een maatregelknop te klikken.", "day>=38&&s.dH<-.05&&index>.2", "cookie"],
]

var skip = false;

function setChoices() {
    if (dev || skip) return;
    for (var i = 0; i < prompts.length; i++) {
        if (eval(prompts[i][2])) {
            var popuptitle = prompts[i][0];
            var popuptext = prompts[i][1];
            if (prompts[i][3] == "cookie") document.cookie = "skip=true;max-age=31536000";
            prompts.splice(i, 1);
            break;
        }
    }
    if (popuptitle == null) return;
    pause();
    q("poptitle").innerHTML = popuptitle;
    q("poptext").innerHTML = popuptext;
    show("curtain", "popup");
    setTimeout(function() {
        q("curtain").style.opacity = .95;
        q("popup").style.opacity = 1;
        q("main").style.filter = "blur(1px)";
        q("disclaimer").style.filter = "blur(1px)";
        q("main").classList = "withchoice";
    }, 20);

}

function delChoices() {
    unpause();
    q("curtain").style.opacity = 0;
    q("popup").style.opacity = 0;
    q("main").style.filter = "";
    q("disclaimer").style.filter = "";
    q("main").classList = "wochoice";
    setTimeout(function() { hide("curtain", "popup") }, 275);
}

if (document.cookie.match('(^|;)\\s*skip\\s*=\\s*([^;]+)')) skip = true;