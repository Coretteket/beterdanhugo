var chos = {
    // 20: ["In het coronadebat was de Tweede Kamer glashelder: nu er dagelijks honderden mensen positief getest worden op corona, kunnen we niet door blijven gaan alsof er niets aan de hand is. Een motie die de minister oproept om maatregelen te nemen werd unaniem aangenomen. Voer je de motie uit?", { "Neem maatregelen": "", "Negeer motie": "" }],
}

var cho = "";
var chobtns = {};

function getChoices() {
    if (day in chos) {
        cho = chos[day][0];
        chobtns = chos[day][1];
    } else {
        cho = "";
        chobtns = {};
    }
}

// function setChoices() {
//     getChoices();
//     if (cho != "") {
//         var sethtml = "";
//         sethtml += "<p>" + cho + "</p>";
//         for (const [key, value] of Object.entries(chobtns)) {
//             sethtml += "<a class='btn txt' onclick='" + value + "remChoices()'>" + key + "</a>"
//         }
//         q("choice").innerHTML = sethtml;
//         q("main").classList = "withchoice";
//         q("choice").classList.remove("remchoice");
//         show("choice");
//         hide("disclaimer");
//         pause();
//     }
// }


// function remChoices() {
//     q("choice").classList.add("remchoice");
//     setTimeout(() => {
//         hide("choice");
//         show('disclaimer');
//         q("main").classList = "wochoice";
//         unpause();
//     }, 400);

// }

function setChoices() {
    pause();
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