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

function restart(){
	started = false;
	counter = 0;
	clearInterval(interval);
}
//-----------game-----------------

var alphabet = "abcdefghjiklnmopqrstuvwxyz";
var alphabet2 = "zyxwvutsrqpomnlkjihgfedcba";
var validityArray = new Array(26).fill(0);
var numCorrect = 0;
var counter = 0;

function testValidity(evt){
	evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    var charStr = String.fromCharCode(charCode);
    var currentLetter = alphabet.charAt(counter);
    if(alphabet.charAt(counter) == charStr){
    	tallyCorrect(counter);
    	changeElement(counter, charCode, true);
	}
	else{
		tallyIncorrect(counter);
    	changeElement(counter, charCode, false);
	}
	if(counter == 25){
    	restart();
    	
    }
    counter++;
}

function tallyCorrect(index){
	validityArray[counter] = 1;
   	numCorrect = numCorrect + 1;
   	document.getElementById("temp").innerHTML = "numcorrect: " + 
   		numCorrect + "\n" +"counter: " + counter;
}

function tallyIncorrect(index){
	validityArray[counter] = 0;
	//numCorrect = numCorrect - 1;
	document.getElementById("temp").innerHTML = "numcorrect: " + 
   		numCorrect + "\n" +"counter: " + counter;
}

function changeElement(counter, inputAscii, correct){
	var thisChar = String.fromCharCode(counter+97);
	var lowercase = thisChar.toLowerCase();
	if(correct){
		document.getElementById(lowercase).className = "correct";	
	}
	else{
		document.getElementById(lowercase).className = "incorrect";	
	}
	var counterToAscii = counter+97;
	/*
	alert("expected: " + thisChar + "(" + counterToAscii + ")"
	 + "\n" + "input: " + inputAscii);
	 */
	//a = 65
}

