
var startTime;
var interval;
var clock;
var started = false;
var complete = false;
var alphabet = "abcdefghijklmnopqrstuvwxyz";
var validityArray = new Array(26).fill(0);
var numCorrect = 0;
var numCorrectMem = 0;
var counter = 0;
var gameSuccess = false;
var finishTime = Number.MAX_SAFE_INTEGER;
document.onkeydown = function(evt) {
	if(numCorrectMem > 25){numCorrectMem = 0; resetButtons();}
	event = evt || window.event;
	if(!event.repeat){
    	if(!started && !complete){
    		
	    	start();	
	    }
	    testValidity(event);
	}
};

function needReset(){
	if(numCorrect == 26){
		resetButtons();
	}
}

function start(){
	started = true;
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
	resetVariables();
}

function resetButtons(){
	for(i = 0; i < alphabet.length; i++){
		document.getElementById(alphabet.charAt(i)).className = "inactive";
	}
}

function resetVariables(){
	validityArray.fill(0);
	counter = 0;
	numCorrectMem = numCorrect;
	numCorrect = 0;
	clearInterval(interval);
	interval = null;
	started = false;	
}

function complete(){
	complete = true;
	clearInterval(interval);
	interval = null;
}

//the main block of game logic
function testValidity(evt){
	evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    //test for backspace
    if(charCode == 08){  
    	if(counter > 0){
    		counter--;
    	}
    	tallyIncorrect(counter);
    	changeElement(counter, charCode, 3);
    }

    //test for enter
    else if(charCode == 13){
    	resetButtons();
    	restart();
    	complete();
	}
   
   	//every other keypress
    else{
    	var charStr = String.fromCharCode(charCode).toLowerCase();
    	var currentLetter = alphabet.charAt(counter);
    	if(alphabet.charAt(counter) == charStr){
	    	tallyCorrect(counter);
    		changeElement(counter, charCode, 1);
		}
		else{
			tallyIncorrect(counter);
    		changeElement(counter, charCode, 2);
		}
		counter++;
	}
	displayWpm();
	//numDisplay();
	if(counter == 26 && numCorrect == 26){
		displayCurrentBest();
	    restart();
	   	complete();
    }
}

function displayCurrentBest(){
	finishTime = Math.min(finishTime, clock);
	document.getElementById("record").innerHTML = finishTime;
}
function displayWpm(){
	if(clock){
	//letters per minute divided by average word length (5.1)
	document.getElementById("wpm").innerHTML = Math.floor((60*(numCorrect / clock))/5.1);
	}
}

function numDisplay(){
	document.getElementById("temp").innerHTML = "numcorrect: " + 
   		numCorrect + "\n" +"counter: " + counter;
}

function tallyCorrect(counter){
	validityArray[counter] = 1;
   	numCorrect = numCorrect + 1;
}

function tallyIncorrect(counter){
	if(validityArray[counter] == 1){
		numCorrect--;
		validityArray[counter] = 0;
	}	
}

function changeElement(counter, inputAscii, correct){
	var thisChar = String.fromCharCode(counter+97);
	var lowercase = thisChar.toLowerCase();
	if(correct==1){
		document.getElementById(lowercase).className = "correct";	
	}
	if(correct==2){
		document.getElementById(lowercase).className = "incorrect";	
	}
	if(correct==3){
		document.getElementById(lowercase).className = "inactive";	
	}
}

