var wynik = 0;
var correctAnswers = [32, 12, 27];
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
var timer = document.getElementById("time");
var time = 0;
//var equation = document.getElementById("equation");
output.innerHTML = slider.value;

slider.oninput = function () {
    output.innerHTML = this.value;
};
function gameLoop() {
    console.log("gameLoop");
    //$("#eq1").show();
    time = new Date();
    task();
}
function task() {
    if (wynik === 0) {
        showOne();
        var myGraph = new Graph({
            canvasId: "myCanvas",
            minX: -3,
            minY: -15,
            maxX: 3,
            maxY: 5,
            unitsPerTick: 1
        });
        myGraph.drawEquation(function (x) {
            return (3 * x * x - 12);
        }, "green", 3, -2, 2, "blue");
        //rownanie
        //equation.innerHTML ="$$\int_{-2}^{2} -x^2+4dx$$";
    }
    else if (wynik === 1) {
        showTwo();
        var myGraph = new Graph({
            canvasId: "myCanvas",
            minX: -Math.PI,
            minY: -5,
            maxX: 3 * Math.PI,
            maxY: 5,
            unitsPerTick: 1
        });
        myGraph.drawEquation(function (x) {
            return -3 * Math.sin(0.5 * x);
        }, "green", 3, 0, 2 * Math.PI, "blue");

    }
    else if (wynik === 2) {
        showThree();
        var myGraph = new Graph({
            canvasId: "myCanvas",
            minX: -5,
            minY: -20,
            maxX: 5,
            maxY: 5,
            unitsPerTick: 1
        });
        myGraph.drawEquation(function (x) {
            return (4 * x * x * x - 12 * x * x);
        }, "green", 3, 0, 3, "blue");
    }
    //rownanie
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
function checkTask() {
    console.log(output.innerHTML);
    if (output.innerHTML == correctAnswers[wynik]) {
        console.log("true");
        wynik += 1;
        task();
    }
    if (wynik === 3) {
        //alert(checktime());
        timer.innerHTML = "czas rozwiązania: " + checktime();
        gameOverShow();
        //alert("brawo");
    }
    slider.value = 0;
    output.innerHTML = 0;

}
function Graph(config) {
    this.canvas = document.getElementById(config.canvasId);
    this.minX = config.minX;
    this.minY = config.minY;
    this.maxX = config.maxX;
    this.maxY = config.maxY;
    this.unitsPerTick = config.unitsPerTick;

    //scale
    this.axisColor = "#aaa";
    this.font = "8pt Calibri";
    this.tickSize = 20;

    this.context = this.canvas.getContext("2d");

    this.rangeX = this.maxX - this.minX;
    this.rangeY = this.maxY - this.minY;
    this.unitX = this.canvas.width / this.rangeX;
    this.unitY = this.canvas.height / this.rangeY;
    this.centerY = Math.round(Math.abs(this.minY / this.rangeY) * this.canvas.height);
    this.centerX = Math.round(Math.abs(this.minX / this.rangeX) * this.canvas.width);
    this.iteration = (this.maxX - this.minY) / 1000;
    this.scaleX = this.canvas.width / this.rangeX;
    this.scaleY = this.canvas.height / this.rangeY;

    this.cleanField();
    //rysowanie osi
    this.drawXAxis();
    this.drawYAxis();
}
Graph.prototype.cleanField = function () {
    var context = this.context;
    context.save();
    context.fillStyle = "000000";
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}
Graph.prototype.drawXAxis = function () {
    var context = this.context;
    context.save();
    context.beginPath();
    context.moveTo(0, this.centerY);
    context.lineTo(this.canvas.width, this.centerY);
    context.strokeStyle = this.axisColor;
    context.lineWidth = 2;
    context.stroke();

    //ryoswanie kresek na osi

    var xPosIncrement = this.unitsPerTick * this.unitX;
    var xPos, unit;
    context.font = this.font;
    context.textAlign = "center";
    context.textBaseline = "top";

    //kreseczki po lewej
    xPos = this.centerX - xPosIncrement;
    unit = -1 * this.unitsPerTick;
    while (xPos > 0) {
        context.moveTo(xPos, this.centerY - this.tickSize / 2);
        context.lineTo(xPos, this.centerY + this.tickSize / 2);
        context.stroke();
        context.fillText(unit, xPos, this.centerY + this.tickSize / 2 + 3);
        unit -= this.unitsPerTick;
        xPos = Math.round(xPos - xPosIncrement);
    }



    //kreseczki po prawej
    xPos = this.centerX + xPosIncrement;
    unit = this.unitsPerTick;
    while (xPos < this.canvas.width) {
        context.moveTo(xPos, this.centerY - this.tickSize / 2);
        context.lineTo(xPos, this.centerY + this.tickSize / 2);
        context.stroke();
        context.fillText(unit, xPos, this.centerY + this.tickSize / 2 + 3);
        unit += this.unitsPerTick;
        xPos = Math.round(xPos + xPosIncrement);
    }
    context.restore();
};
Graph.prototype.drawYAxis = function () {
    var context = this.context;
    context.save();
    context.beginPath();
    context.moveTo(this.centerX, 0);
    context.lineTo(this.centerX, this.canvas.height);
    context.strokeStyle = this.axisColor;
    context.lineWidth = 2;
    context.stroke();


    //rysowanie kreseczek

    var yPosIncrement = this.unitsPerTick * this.unitY;
    var yPos, unit;
    context.font = this.font;
    context.textAlign = "right";
    context.textBaseline = "middle";
    //kreseczki o gory
    yPos = this.centerY - yPosIncrement;
    unit = this.unitsPerTick;
    while (yPos > 0) {
        context.moveTo(this.centerX - this.tickSize / 2, yPos);
        context.lineTo(this.centerX + this.tickSize / 2, yPos);
        context.stroke();
        context.fillText(unit, this.centerX - this.tickSize / 2 - 3, yPos);
        unit += this.unitsPerTick;
        yPos = Math.round(yPos - yPosIncrement);
    }

    //kreseczki u dolu 
    yPos = this.centerY + yPosIncrement;
    unit = -1 * this.unitsPerTick;
    while (yPos < this.canvas.height) {
        context.moveTo(this.centerX - this.tickSize / 2, yPos);
        context.lineTo(this.centerX + this.tickSize / 2, yPos);
        context.stroke();
        context.fillText(unit, this.centerX - this.tickSize / 2 - 3, yPos);
        unit -= this.unitsPerTick;
        yPos = Math.round(yPos + yPosIncrement);
    }
    context.restore();

};
Graph.prototype.drawEquation = function (equation, color, thickness, minBorder, maxBorder, colorBorder) {
    var context = this.context;
    context.save();
    this.transformContext();
    context.beginPath();
    for (var x = minBorder + this.iteration; x <= maxBorder; x += this.iteration) {
        context.moveTo(x, 0);
        context.lineTo(x, equation(x));
    }

    context.restore();
    context.lineJoin = "round";
    context.lineWidth = thickness;
    context.strokeStyle = colorBorder;

    context.stroke();
    context.restore();

    context = this.context;
    context.save();
    this.transformContext();

    context.beginPath();
    context.moveTo(this.minX, equation(this.minX));

    for (x = this.minX + this.iteration; x <= this.maxX; x += this.iteration) {
        context.lineTo(x, equation(x));
    }

    context.restore();
    context.lineJoin = "round";
    context.lineWidth = thickness;
    context.strokeStyle = color;

    context.stroke();
    context.restore();


};
Graph.prototype.transformContext = function () {
    var context = this.context;

    this.context.translate(this.centerX, this.centerY);

    context.scale(this.scaleX, this.scaleY);
};
	/*window.onload = function(){
		var myGraph = new Graph({
			canvasId :"myCanvas", 
			minX: -10, 
			minY: -10,
			maxX: 10,
			maxY: 10,
			unitsPerTick: 1
			});
		myGraph.drawEquation(function(x){
			return -5 * Math.sin(x); }, "green", 3, -Math.PI,Math.PI, "blue");
		//myGraph.drawEquation(function(x){
		//return -x*x}, "red", 3);
		//myGraph.drawEquation(function(x){
		//return -0.02*x*x*x}, "blue", 3);
		//console.log("text");
		};
		*/
