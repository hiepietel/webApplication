var color = [-1, -1, -1];
var shape = -1;
//var color = [255, 0,0];
//var shape = 0;
var pawn = "";
var compPawn = "";
var endGame = false;
var board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
/*var p11= document.getElementById("p11");
var p12= document.getElementById("p12");
var p13= document.getElementById("p13");
var p21= document.getElementById("p21");
var p22= document.getElementById("p22");
var p23= document.getElementById("p23");
var p31= document.getElementById("p31");
var p32= document.getElementById("p32");
var p33= document.getElementById("p33");
*/
$(document).ready(function () {
    $("#game").hide();
    $("#end").hide();

});
function gameOverShow() {
    $("#game").hide();
    $("#end").show();
}

function chooseColor(r, g, b) {
    color[0] = r;
    color[1] = g;
    color[2] = b;
    console.log(r + " " + g + " " + b);
    showPlayerPawn();
}
function chooseShape(chosenShape) {
    shape = chosenShape;
    showPlayerPawn();
}
function checkWin(gracz) {
    //sprawdzenie poziome
    for (var i = 0; i < 3; i++) {
        if (board[i][0] === gracz && board[i][1] === gracz && board[i][2] === gracz) {
            //console.log("wygrana");
            return true;
        }
    }
    for ( i = 0; i < 3; i++) {
        if (board[0][i] === gracz && board[1][i] === gracz && board[2][i] === gracz) {
            //console.log("wygrana w pionie");
            return true;
        }
    }
    if (board[0][0] === gracz && board[1][1] === gracz && board[2][2] === gracz) {
        //console.log("wygrana po ukosie");
        return true;
    }
    if (board[0][2] === gracz && board[1][1] === gracz && board[2][0] === gracz) {
        //console.log("wygrana po ukosie11");
        return true;
    }
    return false;

}
function draw() {
    if (checkWin(1) === false && checkWin(2) === false) {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (board[i][j] === 0) { return false; }
            }
        }
    }
    return true;
}
function minimax(i, j, player) {
    var m, mmx;


    if (checkWin(player)) {
        if (player === 1) { return -1; }
        else { return 2; }
    }
    if (draw()) { return 0; }

    if (player === 2) { player = 1; }
    else if (player === 1) { player = 2; }

    if (player === 1) { mmx = 10; }
    else { mmx = -10; }

    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            if (board[i][j] === 0) {
                board[i][j] = player;
                m = minimax(i, j, player);
                board[i][j] = 0;
                if ((player === 1 && m < mmx) || (player === 2 && m > mmx)) {
                    mmx = m;
                }

            }

        }


    }
    return mmx;
}
function compMove() {
    var move, ki, kj, m, mmx, player;

    mmx = -10;

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] === 0) {
                board[i][j] = 2;
                player = 2;
                m = minimax(i, j, player);
                board[i][j] = 0;
                if (m > mmx) {
                    mmx = m;
                    kj = j; ki = i;
                }
            }
        }
    }
    board[ki][kj] = 2;
    console.log(ki + " " + kj);
    document.getElementById("p" + (ki + 1).toString() + (kj + 1).toString()).innerHTML = compPawn;
    if (checkWin(2)) {
        alert("przegrywasz");
        endGame = true;
        $("#newgame").show();
    }

}
function showTable() {
    for (var i = 0; i < 3; i++) {

        console.log(board[i][0] + " " + board[i][1] + " " + board[i][2]);
    }

}
function pole(id) {
    var vertical = Math.floor(id / 10); //pion
    var horizontal = id % 10; //poziom

    if (board[vertical - 1][horizontal - 1] === 0 && endGame === false) {
        document.getElementById("p" + id).innerHTML = pawn;
        board[vertical - 1][horizontal - 1] = 1;
        if (checkWin(1)) {
            alert("wygrana");
            endGame = true;
            $("#newgame").show();
        }
        else if (draw()) {
            alert("remis");
            endGame = true;
            $("#newgame").show();
        }
        else {
            compMove();
            showTable();
        }
    }

    console.log(vertical + " " + horizontal);



    //console.log(id);
    //p11.innerHTML="<svg width=\"100\" height=\"100\"><circle cx=\"50\" cy=\"50\" r=\"40\" stroke=\"green\" stroke-width=\"4\" fill=\"yellow\" /></svg>";
}
function retColor() {
    return "rgb(" + color[0].toString() + "," + color[1].toString() + "," + color[2].toString() + ")";
}
function showPlayerPawn() {
    if (shape !== -1) {
        pawn = "<svg width=\"100\" height=\"100\">";
        if (shape === 0) {
            pawn += "<circle cx=\"50\" cy=\"50\" r=\"40\" stroke=" + retColor() + " stroke-width=\"12\" fill=\"white\" />";
        }
        else if (shape === 1) {
            pawn += "<line x1=\"10\" y1=\"10\" x2=\"90\" y2=\"90\" style=\"stroke:" + retColor() + ";stroke-width:12\" /><line x1=\"90\" y1=\"10\" x2=\"10\" y2=\"90\" style=\"stroke:" + retColor() + ";stroke-width:12\" />";
        }
        pawn += "</svg>";
        document.getElementById("pawn").innerHTML = pawn;

    }
}
function retCompColor() {
    return "rgb(" + (255 - color[0]).toString() + "," + (255 - color[1]).toString() + "," + (255 - color[2]).toString() + ")";
}
function setCompPawn() {
    //var compColor = [255-color[0], 255-color[1], 255-color[2]];
    compPawn = "<svg width=\"100\" height=\"100\">";
    if (shape === 0) {
        compPawn += "<line x1=\"10\" y1=\"10\" x2=\"90\" y2=\"90\" style=\"stroke:" + retCompColor() + "; stroke-width:12\" /><line x1=\"90\" y1=\"10\" x2=\"10\" y2=\"90\" style=\"stroke:" + retCompColor() + "; stroke-width:12\"  />";
    }
    else if (shape === 1) {
        compPawn += "<circle cx=\"50\" cy=\"50\" r=\"40\" stroke=\"" + retCompColor() + "\" stroke-width=\"12\" fill=\"white\" />";
    }
    compPawn += "</svg>";


}
function newGame() {
    board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    endGame = false;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            document.getElementById("p" + (i + 1).toString() + (j + 1).toString()).innerHTML = "";
        }
    }
    $("#newgame").hide();

}
function returnToMain() {
    newGame();
    $("#intro").show();
    $("#game").hide();
}
function gameLoop() {
    if ((shape === 0 || shape === 1) && (color[0] !== -1 && color[1] !== -1 && color[2] !== -1)) {
        $("#intro").hide();
        $("#game").show();
        $("#newgame").hide();
        console.log("game start");
        endGame = false;
        setCompPawn();

    }
    else {
        alert("nie wybrales pionka");
        console.log(shape);
    }
}