
var cols = document.querySelectorAll('#puzzle .puzzle-piece');
var colsLength = cols.length;
var dragElem = null;
var log = document.getElementById('log');
var puzzleKey = ["11", "12", "13", "21", "22", "23"];
var puzzleFirstLetter = ["i", "p", "b", "c"]
var puzzleArray = [];
var wynik = 0;
var time = 0;
var timer = document.getElementById("time");
function gameLoop() {
    wynik = 0;
    time = new Date();
}
function checktime() {
    var newTime = new Date();
    time = newTime - time;
    console.log(time);
    var s = time / 1000; //sek
    var min = s / 60; //min
    s = Math.floor(s % 60);
    min = Math.floor(min % 60);

    if (min < 10) { min = "0" + min; }
    if (s < 10) { s = "0" + s; }

    return min + " : " + s;
}
function zwrocAdres(id) {
    console.log("/Photos/" + puzzleFirstLetter[wynik] + "mg" + id.substring(1, 3) + ".png");
    return "/Photos/" + puzzleFirstLetter[wynik] + "mg" + id.substring(1, 3) + ".png";
}

function newPuzzles() {

    if (wynik % 2 != 0) {
        document.getElementById("p11").src = zwrocAdres("p11");
        document.getElementById("p12").src = zwrocAdres("p12");
        document.getElementById("p13").src = zwrocAdres("p13");
        document.getElementById("p21").src = zwrocAdres("p21");
        document.getElementById("p22").src = zwrocAdres("p22");
        document.getElementById("p23").src = zwrocAdres("p23");
    }
    else {
        document.getElementById("p11").src = zwrocAdres("p12");
        document.getElementById("p12").src = zwrocAdres("p21");
        document.getElementById("p13").src = zwrocAdres("p23");
        document.getElementById("p21").src = zwrocAdres("p22");
        document.getElementById("p22").src = zwrocAdres("p11");
        document.getElementById("p23").src = zwrocAdres("p13");
    }
}
function nextLevel() {
    newPuzzles();
    nextLevelHide();
}
function puzzleCheck() {
    //Initialize user key
    puzzleArray = [];
    //Insert the key in the array
    for (var i = 0; i < colsLength; i++) {
        puzzleArray.push(cols[i].children[0].getAttribute('src').substring(11, 13));
        console.log(cols[i].children[0].getAttribute('src').substring(11, 13));
    };
    originKey = puzzleKey.join();
    userKey = puzzleArray.join();

    if (originKey === userKey) {
        wynik += 1;
        if (wynik === puzzleFirstLetter.length) {
            gameOverShow();
            timer.innerHTML = "czas rozwiązania: " + checktime();
            //alert("Twoj czas: "+time);
        }
        else {
            //newPuzzles();
            nextLevelShow();
        }

    };
};
function dragStartHandler(e) {
    //Set data
    dragElem = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
    this.classList.add('over');
    for (var i = 0; i < colsLength; i++) {
        cols[i].classList.add('start');
    };
};
function dragOverHandler(e) {
    e.preventDefault();
    this.classList.add('over');
    e.dataTransfer.dropEffect = 'move';
};

function dragLeaveHandler(e) {
    this.classList.remove('over');
};

function dragDropHandler(e) {
    e.preventDefault();
    //Get data
    dragElem.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
    for (var i = 0; i < colsLength; i++) {
        cols[i].className = "puzzle-piece";
    };
    //Check key
    puzzleCheck();
};
// drag ěěě event lister ě¤ě 
for (var i = 0; i < colsLength; i++) {
    cols[i].addEventListener('dragstart', dragStartHandler, false);
    cols[i].addEventListener('dragover', dragOverHandler, false);
    cols[i].addEventListener('dragleave', dragLeaveHandler, false);
    cols[i].addEventListener('drop', dragDropHandler, false);
};
