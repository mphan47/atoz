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
var finishTime = Number.MAX_SAFE_INTEGER;

//document.getElementById("record").innerHTML = getCookieValue(record);

/*
	checks to see if a game is in progress
	if not, start a game
*/
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

//starts the clock
function start(){
	started = true;
	startTime = Date.now();
	interval = setInterval(update, 1);
}

//updates the clock timer
function update(){
	clock = (Date.now()-startTime)/1000;
	render();
}

//renders the timer in the document
function render(){
	document.getElementById("stopwatch").innerHTML = clock;
}

//resets all button colors to black
function resetButtons(){
	for(i = 0; i < alphabet.length; i++){
		document.getElementById(alphabet.charAt(i)).className = "inactive";
	}
}

//resets the variables of the game
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

/*
	main game logic
	checkes for the type of key entry
	backspace - move the counter backwards
	enter - stop the game
	other - compare keypress to the letter expected and continue
*/
function testValidity(evt){
	evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    //test for backspace
    if(charCode == 08){  
    	if(counter > 0){
    		counter--;
    	}
    	tallyIncorrect(counter);
    	changeElement(counter, 3);
    }

    //test for enter
    else if(charCode == 13){
    	resetButtons();
    	resetVariables();
    	complete();
	}
   
   	//every other keypress
    else{
    	var charStr = String.fromCharCode(charCode).toLowerCase();
    	var currentLetter = alphabet.charAt(counter);
    	if(alphabet.charAt(counter) == charStr){
	    	tallyCorrect(counter);
    		changeElement(counter, 1);
		}
		else{
			tallyIncorrect(counter);
    		changeElement(counter, 2);
		}
		counter++;
	}
	displayWpm();
	if(counter == 26 && numCorrect == 26){
		displayCurrentBest();
	    resetVariables();
	   	complete();
    }
}

//displays the lowest finish time of the player
function displayCurrentBest(){
	//finishTime = Math.min(getCookieValue(record), clock);
	finishTime = Math.min(finishTime, clock);
	setCookie(record, finishTime, 7);
	document.getElementById("record").innerHTML = finishTime;
}

/*
	displays the user's wpm
	formula - letters per minute divided by average word length (5.1)
*/
function displayWpm(){
	if(clock){
	document.getElementById("wpm").innerHTML = Math.floor((60*(numCorrect / clock))/5.1);
	}
}

/*
	change to the validityArray index to 1(correct) and increment numCorrect
	counter - the current index
*/
function tallyCorrect(counter){
	validityArray[counter] = 1;
   	numCorrect = numCorrect + 1;
}

/*
	if the value overriden was a correct value, decrement numCorrect
	and change the respective value in the validityArray
	counter - the current index
*/
function tallyIncorrect(counter){
	if(validityArray[counter] == 1){
		numCorrect = numCorrect - 1;
		validityArray[counter] = 0;
	}	
}

/*
	changes the color of the html element based on the input
	counter - the current index of the alphabet
	inputType:
		1 - user entered value is correct -> change to green
		2 - user value is incorrect -> change to red
		3 - backspace was pressed -> reset the color to black
*/
function changeElement(counter, inputType){
	var thisChar = String.fromCharCode(counter+97);
	var lowercase = thisChar.toLowerCase();
	if(inputType==1){
		document.getElementById(lowercase).className = "correct";	
	}
	if(inputType==2){
		document.getElementById(lowercase).className = "incorrect";	
	}
	if(inputType==3){
		document.getElementById(lowercase).className = "inactive";	
	}
}

/*
	creates a cookie with the given parameters
	name - the name of the cookie (used for record in this app)
	value - the value to be associated with the cookie
	expirationDays - time until the cookie expires
*/
function setCookie(name, value, expirationDays){
	var d = new Date();
	d.setTime(d.getTime() + (expirationDays*24*60*60*1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

/*
	returns the value of the cookie with the given name
	name - the name of the cookie to be obtained
*/
function getCookieValue(name) {
	var value = "; " + document.cookie;
	var parts = value.split("; " + name + "=");
	if (parts.length == 2) {
  		return parts.pop().split(";").shift();
	}
}

