//-----------stopwatch-----------------

var startTime;
var interval;
var clock;
var started = false;
document.getElementById("start").onkeypress = function(evt) {
    testValidity(evt);
    if(!started){
    	started = true;
    	start();
    }
};

function start(){
	startTime = Date.now();
	interval = setInterval(update, 1);
}

function update(){
	clock = (Date.now()-startTime)/1000;
	render();
}

function render(){
	document.getElementById("stopwatch").innerHTML = clock;
}

function stop(){
	started = false;
	clearInterval(interval);
}
//-----------game-----------------

var alphabet = "abcdefghjiklnmopqrstuvwxyz";
var alphabet2 = "zyxwvutsrqpomnlkjihgfedcba";
var counter = 0;

function testValidity(evt){
	evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    var charStr = String.fromCharCode(charCode);
    var currentLetter = alphabet.charAt(counter);
    if(counter > 25){
    	stop();
    }
    counter++;
}
