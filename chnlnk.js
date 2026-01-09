var gameOver = false;
//Confetti Begin
btnParty.addEventListener("click", () => {
  confetti("tsparticles", {
    angle: 90,
    count: 300,
    position: { x: 50, y: 50 },
    spread: 90,
    startVelocity: 50,
    decay: 0.9,
    gravity: 1,
    drift: 0,
    ticks: 200,
    colors: ["#fff", "#f00"],
    shapes: ["square", "circle"],
    scalar: 1,
    zIndex: 2000,
    disableForReducedMotion: true
  });
});
//Confetti End
//Counter Construct
var div = document.getElementById("bb");
setInterval(function () {
	var toDate = new Date();
	var tomorrow = new Date();
	tomorrow.setHours(24, 0, 0, 0);
	var diffMS = tomorrow.getTime() / 1000 - toDate.getTime() / 1000;
	var diffHr = Math.floor(diffMS / 3600);
	diffMS = diffMS - diffHr * 3600;
	var diffMi = Math.floor(diffMS / 60);
	diffMS = diffMS - diffMi * 60;
	var diffS = Math.floor(diffMS);
	var result = ((diffHr < 10) ? "0" + diffHr : diffHr);
	result += ":" + ((diffMi < 10) ? "0" + diffMi : diffMi);
	result += ":" + ((diffS < 10) ? "0" + diffS : diffS);
	if (localStorage.getItem('gameovercl' + days) == 1) {
		div.innerHTML = result;
	}
}, 1000);

//Open Stats at end of game
function OpenStats() {
	document.getElementById("statsbutton").click();
}

//Open Rules the very first time
function OpenRules() {
	document.getElementById("rulesbutton").click();
}

//Confetti after game successfully completed 
function ConfettiStart() {
	document.getElementById("btnParty").click();
}

function removeblink() {
	if (!gameOver){
		document.getElementById("lives").classList.remove("blink");
		//document.getElementById("answer").innerText = "";
	}
}

//Final Clue Text Attenion 
function FinalClue() {
	document.getElementById("answer").classList.add("popanswer");
}

//Button Text
function ResetButton() {
	let HTMLButton = document.getElementById("HTMLButton");
	HTMLButton.innerText = "COPY STATS🔊"
}


//Display Footer after game
function displayFooter() {
	document.getElementById("pzlhdr").style.display = "block";
	document.getElementById("pzl").style.display = "block";
	document.getElementById("bbhdr").style.display = "block";
	document.getElementById("bb").style.display = "block";
	document.getElementById("HTMLButton").style.display = "block";
	// document.getElementById("CoffeButton").style.display = "block";	
	// document.getElementById("FBButton").style.display = "block";	
	// document.getElementById("TwitterButton").style.display = "block";	
}

window.localStorage;
if (!localStorage.totalclplayed){
localStorage.setItem("totalclplayed",0);
localStorage.setItem("totalclwins",0);
localStorage.setItem("totalclstreak",0);
localStorage.setItem("totalclstars",0);
localStorage.setItem("gameclwon", 0);
localStorage.setItem("starcl0count", 0);
localStorage.setItem("starcl1count", 0);
localStorage.setItem("starcl2count", 0);
localStorage.setItem("starcl3count", 0);
localStorage.setItem("starcl4count", 0);
localStorage.setItem("starcl5count", 0);
localStorage.setItem("starclxcount", 0);
}

//Baseline Date
var a = new Date(); // Current date now.
var b = new Date(2025, 12, 8, 0, 0, 0, 0); // Start of TENIZ.
var d = (a - b); // Difference in milliseconds.
var days = parseInt((d / 1000) / 86400);
if (localStorage.getItem('gameovercl' + days) != 0 && localStorage.getItem('gameovercl' + days) != 1) {
	localStorage['gameovercl' + days] = 0;
	localStorage.setItem("cllives","🔴🔴🔴🔴🔴");
	localStorage.setItem("clcorrect"," ");
	localStorage.setItem("cllivescnt",0);
	localStorage.setItem("clstarscnt",0);
	localStorage.setItem("clwordone","");
	localStorage.setItem("clwordtwo","");
	localStorage.setItem("clwordthree","");	
	localStorage.setItem("clwordfour","");	
	localStorage.setItem("clwordfive","");	
	localStorage.setItem("clwordsix","");	
	localStorage.setItem("clwordlast","");
	localStorage.setItem("cldisabledkey", JSON.stringify(""));
	localStorage.setItem("clgamecnt",0);
}

/* for (var d = 1; d < Number(days) ; d++){
	localStorage.removeItem('gameovercl' + d);
} */

var tierlevel = ""		
var tiericon = ""	
function SetTier() {
	if (localStorage.totalclstreak >= 10 && localStorage.totalclstreak <= 24)  {
		tierlevel = "Bronze (Streak 10 - 24)";
		tiericon = "🥉"; 
	}
	else if (localStorage.totalclstreak >= 25 && localStorage.totalclstreak <= 49) {
		tierlevel = "Silver (Streak 25 - 49)";
		tiericon = "🥈"; 
	}
	else if (localStorage.totalclstreak >= 50 && localStorage.totalclstreak <= 99) {
		tierlevel = "Gold (Streak 50 - 99)";
		tiericon = "🥇";
	}
	else if (localStorage.totalclstreak >= 100) {
		tierlevel = "Ultimate (Streak 100+)";
		tiericon = "🏆";
	}
	else {
		tierlevel = "";
		tiericon = "";
	}		
}

// function FBFunction() {
// 	myFunction();
// 	setTimeout(myFunctionOpenFB, 100);
// }

// function myFunctionOpenFB() {
// 	window.open("https://www.facebook.com/groups/329553752723826/?ref=share", "_blank");
// }

// function TwitterFunction() {
// 	myFunction();
// 	setTimeout(myTwitterOpenFB, 100);
// }

// function myTwitterOpenFB() {
// 	window.open("https://twitter.com/GeordleGame", "_blank");
// }

// function WAFunction() {
// 	myFunction();
// 	setTimeout(myFunctionOpenWA, 100);
// }

// function myFunctionOpenWA() {
// 	/* window.open("https://wa.me/?text=urlencodedtext", "_blank"); */
// 	/* var linktext = "Paste Stats and Share!"; */
// 	/* var walink = "https://wa.me/?text=" + linktext; */
// 	/* window.open(walink); */
// 	window.open("https://wa.me/", "_blank");
// }

//Clipboard Code
function myFunction() {
	if (localStorage.clgamecnt == 6){
		var cluehdr = "X/5";
	}
	else {
		cluehdr = localStorage.clgamecnt + "/5";
	}
	switch (Number(localStorage.clgamecnt)) {
				case 0: var clueicon = "🔴 🔴 🔴 🔴 🔴"
					break;
				case 1: var clueicon = "🔴 🔴 🔴 🔴 ⭐"
					break;	
				case 2: var clueicon = "🔴 🔴 🔴 ⭐ ⭐"
					break;				
				case 3: var clueicon = "🔴 🔴 ⭐ ⭐ ⭐"
					break;	
				case 4: var clueicon = "🔴 ⭐ ⭐ ⭐ ⭐"
					break;	
				case 5: var clueicon = "⭐ ⭐ ⭐ ⭐ ⭐"
					break;
				case 6: var clueicon = "💀 💀 💀 💀 💀"
					break;					
			}
		
	if (tierlevel == ""){
		var copyText = "CHN LNK # " + days + " \n\n" + cluehdr + " - " + clueicon + "\n🔥 Streak: " + localStorage.totalclstreak + " | ⭐ Stars: " + localStorage.totalclstars + "\n\nhttps://sank0403.github.io/chnlnk/";
	}
	else {
		var copyText = "CHN LNK # " + days + " \n\n" + cluehdr + " - " + clueicon + "\n🔥 Streak: " + localStorage.totalclstreak + " | ⭐ Stars: " + localStorage.totalclstars + "\n" + tiericon +  " Tier: " + tierlevel + "\n\nhttps://sank0403.github.io/chnlnk/";
	}
			
		
	/* Copy the text inside the text field */
	navigator.clipboard.writeText(copyText);

	//Button Text
	let HTMLButton = document.getElementById("HTMLButton");
	HTMLButton.innerText = "COPIED☑️"
	setTimeout(ResetButton, 1000);
}

var firstwordlist = ["solid", "first"];
var secondwordlist = ["gold", "cousin"];
var thirdwordlist = ["standard", "marriage"];
var forthwordlist = ["oil", "story"];
var fifthwordlist = ["spill", "television"];
var sixthwordlist = ["vase", "film"];
var lastwordlist = ["life", "director"];


if (days%firstwordlist.length > 0){
	var offset = Math.floor(days/firstwordlist.length);
}
else{
	var offset = (days/firstwordlist.length) - 1;
}
if (days > firstwordlist.length){
	var index  = days - 1 - (offset * firstwordlist.length);
}
else {
	var index = days - 1;
}

var wordone = firstwordlist[index].toUpperCase();
var wordtwo = secondwordlist[index].toUpperCase();
var wordthree = thirdwordlist[index].toUpperCase();
var wordfour = forthwordlist[index].toUpperCase();
var wordfive = fifthwordlist[index].toUpperCase();
var wordsix = sixthwordlist[index].toUpperCase();
var wordlast = lastwordlist[index].toUpperCase();
var word = (wordone + wordtwo + wordthree + wordfour + wordfive + wordsix + wordlast).toUpperCase();
var wordonewidth = wordone.length; 
var wordtwowidth = wordtwo.length; 
var wordthreewidth = wordthree.length; 
var wordfourwidth = wordfour.length; 
var wordfivewidth = wordfive.length; 
var wordsixwidth = wordsix.length; 
var wordlastwidth = wordlast.length; 
var disabledkeyarr = [];
document.getElementById("answer").style.color = "#6AAA64";
document.getElementById("answer").innerText = "GAME ON!";
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')
openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}

const openSummaryButtons = document.querySelectorAll('[data-summary-target]')
const closeSummaryButtons = document.querySelectorAll('[data-close1-button]')
const overlay1 = document.getElementById('overlay1')


openSummaryButtons.forEach(button => {
	button.addEventListener('click', () => {
		const summary = document.querySelector(button.dataset.summaryTarget)
		openSummary(summary)
	})
})

overlay1.addEventListener('click', () => {
	const summarys = document.querySelectorAll('.summary.active')
	summarys.forEach(summary => {
		closeSummary(summary)
	})
})

closeSummaryButtons.forEach(button => {
	button.addEventListener('click', () => {
		const summary = button.closest('.summary')
		closeSummary(summary)
	})
})

function openSummary(summary) {
	if (summary == null) return
	UpdateChart();
	summary.classList.add('active')
	overlay1.classList.add('active')
}

function closeSummary(summary) {
	if (summary == null) return
	summary.classList.remove('active')
	overlay1.classList.remove('active')
}

//Chart Code
color0 = "brown"
color1 = "brown"
color2 = "brown"
color3 = "brown"
color4 = "brown"
color5 = "brown"
colorx = "brown"
function UpdateChart() {
	// var xValues = ["5 ⭐", "4 ⭐", "3 ⭐", "2 ⭐", "1 ⭐", "0 ⭐", "X"];;
	var xValues = ["5 ⭐", "4 ⭐", "3 ⭐", "2 ⭐", "1 ⭐", "X"];;
	var yValues = [localStorage.starcl5count, localStorage.starcl4count, localStorage.starcl3count, localStorage.starcl2count, localStorage.starcl1count, localStorage.starcl0count, localStorage.starclxcount];
	//var barColors = ["red", "green","blue","orange","brown","yellow","cyan","white"];
	var barColors = [color5, color4, color3, color2, color1, color0, colorx];

	new Chart("myChart", {
		type: "bar",
		data: {
			labels: xValues,
			datasets: [{
				backgroundColor: barColors,
				data: yValues
			}]
		},
		options: {
			legend: { display: false },
			title: {
				display: false,
				text: "⭐ STAR DISTRIBUTION ⭐"
			}
		}
	});
}

window.onload = function(){
    intialize();
	UpdateChart();
}


function intialize() {
	if (Number (localStorage.clcorrect) == 0){
		localStorage.clcorrect = wordonewidth + wordlastwidth;
	} 
	let ele = document.getElementById("daycount");
	ele.innerHTML += (days);
	document.getElementById("pzlhdr").style.display = "none";
	document.getElementById("pzl").style.display = "none";
	document.getElementById("bbhdr").style.display = "none";
	document.getElementById("bb").style.display = "none";
	document.getElementById("HTMLButton").style.display = "none";
	// document.getElementById("CoffeButton").style.display = "block";
	// document.getElementById("FBButton").style.display = "none";
	// document.getElementById("TwitterButton").style.display = "none";
	/* document.getElementById("WAButton").style.display = "none"; */
	// document.getElementById("ffhdr").style.display = "none";
	// document.getElementById("ffdtl").style.display = "none";
	document.getElementById("lives").innerText = localStorage.cllives;		
    // Create the game board
	var element = document.getElementById("boardfirst");
        //element.style.width = boardWidth;
        for (let c = 0; c < wordonewidth; c++) {
            // <span id="0-0" class="tile">P</span>
            let tile = document.createElement("span");
            tile.id = "1" + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("boardfirst").appendChild(tile);
        }
			for (let i = 0; i < wordonewidth; i++) {
				let currTile = document.getElementById("1" + '-' + i);
				currTile.innerText = wordone[i];
				currTile.classList.remove("poptile");
				currTile.classList.add("correct");
			}			

	var element = document.getElementById("boardsecond");
        //element.style.width = boardWidth;
        for (let c = 0; c < wordtwowidth; c++) {
            // <span id="0-0" class="tile">P</span>
            let tile = document.createElement("span");
            tile.id = "2" + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("boardsecond").appendChild(tile);
        }		

	var element = document.getElementById("boardthird");
        //element.style.width = boardWidth;
        for (let c = 0; c < wordthreewidth; c++) {
            // <span id="0-0" class="tile">P</span>
            let tile = document.createElement("span");
            tile.id = "3" + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("boardthird").appendChild(tile);
        }	
		
	var element = document.getElementById("boardforth");
        //element.style.width = boardWidth;
        for (let c = 0; c < wordfourwidth; c++) {
            // <span id="0-0" class="tile">P</span>
            let tile = document.createElement("span");
            tile.id = "4" + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("boardforth").appendChild(tile);
        }

	var element = document.getElementById("boardfifth");
        //element.style.width = boardWidth;
        for (let c = 0; c < wordfivewidth; c++) {
            // <span id="0-0" class="tile">P</span>
            let tile = document.createElement("span");
            tile.id = "5" + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("boardfifth").appendChild(tile);
        }	
		
	var element = document.getElementById("boardsixth");
        //element.style.width = boardWidth;
        for (let c = 0; c < wordsixwidth; c++) {
            // <span id="0-0" class="tile">P</span>
            let tile = document.createElement("span");
            tile.id = "6" + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("boardsixth").appendChild(tile);
        }		
		
	var element = document.getElementById("boardlast");
        //element.style.width = boardWidth;
        for (let c = 0; c < wordlastwidth; c++) {
            // <span id="0-0" class="tile">P</span>
            let tile = document.createElement("span");
            tile.id = "7" + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("boardlast").appendChild(tile);
        }		

			for (let i = 0; i < wordlastwidth; i++) {
				let currTile = document.getElementById("7" + '-' + i);
				currTile.innerText = wordlast[i];
				currTile.classList.remove("poptile");
				currTile.classList.add("correct");
			}		
  
    // Create the key board
    let keyboard = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["Z", "X", "C", "V", "B", "N", "M"]
    ]
	
/* 	    let keyboard = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["⏎", "Z", "X", "C", "V", "B", "N", "M", "⌫" ]
    ] */
	
/*     let keyboard = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L", " "],
        ["Enter", "Z", "X", "C", "V", "B", "N", "M", "⌫" ]
    ]	 */

    for (let i = 0; i < keyboard.length; i++) {
        let currRow = keyboard[i];
        let keyboardRow = document.createElement("div");
        keyboardRow.classList.add("keyboard-row");

        for (let j = 0; j < currRow.length; j++) {
            let keyTile = document.createElement("div");

            let key = currRow[j];
            keyTile.innerText = key;
            if (key == "⏎") {
                keyTile.id = "Enter";
            }
            else if (key == "⌫") {
                keyTile.id = "Backspace";
            }
            else if ("A" <= key && key <= "Z") {
                keyTile.id = "Key" + key; // "Key" + "A";
            } 

            keyTile.addEventListener("click", processKey);

            if (key == "⏎" || key == "⌫"){
                keyTile.classList.add("enter-key-tile");
            } else {
                keyTile.classList.add("key-tile");
            }
            keyboardRow.appendChild(keyTile);
        }
        document.body.appendChild(keyboardRow);
    }
	
    // Listen for Key Press
		document.addEventListener("keyup", (e) => {
			if ("KeyA" <= e.code && e.code <= "KeyZ") {
				if (!document.getElementById(e.code).classList.contains("disabled")){
					processInput(e);
				}
			}
		})
    SetTier();
	var winpct = Math.round(localStorage.totalclwins / localStorage.totalclplayed * 100);
	document.getElementById(11).innerText = "PLAYED: " + localStorage.totalclplayed;
	document.getElementById(12).innerText = "WIN %: " + winpct;
	document.getElementById(13).innerText = "STREAK: " + localStorage.totalclstreak + tiericon;
	document.getElementById(14).innerText = "STARS: " + localStorage.totalclstars;

	//Current Day Game Over
	if (localStorage.getItem('gameovercl' + days) == "1") {
		if (localStorage.gameclwon == 1) {
			switch (Number(localStorage.clstarscnt)) {
				case 0: color0 = "green";
					break;
				case 1: color1 = "green";
					break;
				case 2: color2 = "green";
					break;
				case 3: color3 = "green";
					break;
				case 4: color4 = "green";
					break;
				case 5: color5 = "green";
					break;
			}			
			for (let i = 0; i < wordonewidth; i++) {
				let currTile = document.getElementById("1" + '-' + i);
				currTile.innerText = wordone[i];
				currTile.classList.remove("poptile");
				currTile.classList.add("animated","correct");
			}	
			for (let i = 0; i < wordtwowidth; i++) {
				let currTile = document.getElementById("2" + '-' + i);
				currTile.innerText = wordtwo[i];
				currTile.classList.remove("poptile");
				currTile.classList.add("animated","correct");
			}		
			for (let i = 0; i < wordthreewidth; i++) {
				let currTile = document.getElementById("3" + '-' + i);
				currTile.innerText = wordthree[i];
				currTile.classList.remove("poptile");
				currTile.classList.add("animated","correct");
			}				
			for (let i = 0; i < wordfourwidth; i++) {
				let currTile = document.getElementById("4" + '-' + i);
				currTile.innerText = wordfour[i];
				currTile.classList.remove("poptile");
				currTile.classList.add("animated","correct");
			}			
			for (let i = 0; i < wordfivewidth; i++) {
				let currTile = document.getElementById("5" + '-' + i);
				currTile.innerText = wordfive[i];
				currTile.classList.remove("poptile");
				currTile.classList.add("animated","correct");
			}			
			for (let i = 0; i < wordsixwidth; i++) {
				let currTile = document.getElementById("6" + '-' + i);
				currTile.innerText = wordsix[i];
				currTile.classList.remove("poptile");
				currTile.classList.add("animated","correct");
			}			
			for (let i = 0; i < wordlastwidth; i++) {
				let currTile = document.getElementById("7" + '-' + i);
				currTile.innerText = wordlast[i];
				currTile.classList.remove("poptile");
				currTile.classList.add("animated","correct");
			}		
				document.getElementById("answer").style.color = "#6AAA64";
				if (Number(localStorage.clstarscnt) == 0){
					document.getElementById("answer").innerText = "STREAK INTACT. THOUGH, NO STARS WON!";
				}
				else if (Number(localStorage.clstarscnt) > 0){
					if (localStorage.clstarscnt == 1){
						document.getElementById("answer").innerText = "GREAT GOING! YOU WON " + localStorage.clstarscnt +" STAR TODAY.";
					}
					else {
						document.getElementById("answer").innerText = "GREAT GOING! YOU WON " + localStorage.clstarscnt +" STARS TODAY.";
					}					
/* 					for (let s = 0; s < localStorage.clstarscnt; s++){
						document.getElementById("answerstar").innerText += "⭐";
					} */	
					var templives = "";
					templives = document.getElementById("lives").innerText;
					for (i=0; i<5; i++){
						templives = templives.replace("🔴", "⭐");
					}	
					document.getElementById("lives").innerText = templives;
					if (Number (localStorage.clstarscnt) != 0){
						document.getElementById("lives").classList.add("animated");
					}				
				}
		}
		else {
			colorx = "green";
			for (let i = 0; i < wordonewidth; i++) {
				let currTile = document.getElementById("1" + '-' + i);
				currTile.innerText = wordone[i];
				currTile.classList.remove("poptile","correct");
				currTile.classList.add("failed", "animated");
			}	
			for (let i = 0; i < wordtwowidth; i++) {
				let currTile = document.getElementById("2" + '-' + i);
				currTile.innerText = wordtwo[i];
				currTile.classList.remove("poptile","correct");
				currTile.classList.add("failed", "animated");
			}				
			for (let i = 0; i < wordthreewidth; i++) {
				let currTile = document.getElementById("3" + '-' + i);
				currTile.innerText = wordthree[i];
				currTile.classList.remove("poptile","correct");
				currTile.classList.add("failed", "animated");
			}				
			for (let i = 0; i < wordfourwidth; i++) {
				let currTile = document.getElementById("4" + '-' + i);
				currTile.innerText = wordfour[i];
				currTile.classList.remove("poptile","correct");
				currTile.classList.add("failed", "animated");
			}				
			for (let i = 0; i < wordfivewidth; i++) {
				let currTile = document.getElementById("5" + '-' + i);
				currTile.innerText = wordfive[i];
				currTile.classList.remove("poptile","correct");
				currTile.classList.add("failed", "animated");
			}				
			for (let i = 0; i < wordsixwidth; i++) {
				let currTile = document.getElementById("6" + '-' + i);
				currTile.innerText = wordsix[i];
				currTile.classList.remove("poptile","correct");
				currTile.classList.add("failed", "animated");
			}				
			for (let i = 0; i < wordlastwidth; i++) {
				let currTile = document.getElementById("7" + '-' + i);
				currTile.innerText = wordlast[i];
				currTile.classList.remove("poptile","correct");
				currTile.classList.add("failed", "animated");
			}		
				document.getElementById("answer").style.color = "red";
				document.getElementById("answer").innerText = "GAME OVER! OUT OF LIVES.";
		}
		gameOver = true;
		setTimeout(OpenStats, 1100);
		displayFooter();		
	}
	// Default Path
	else {
		var disabled = JSON.parse(localStorage.getItem("cldisabledkey"));
		for (let i = 0; i < disabled.length; i++){
			document.getElementById("Key" + disabled[i]).classList.add("disabled");
		}
		if (localStorage.clwordone != ""){
			for (let i = 0; i < wordonewidth; i++){
				let currTile = document.getElementById("1" + '-' + i);
				if (localStorage.clwordone[i] == "?"){
					currTile.innerText = "";
				}
				else if (localStorage.clwordone[i] != ""){
					currTile.innerText = localStorage.clwordone[i];
					currTile.classList.add("correct");
				}
			}	
		}
		if (localStorage.clwordtwo != ""){
			for (let i = 0; i < wordtwowidth; i++){
				let currTile = document.getElementById("2" + '-' + i);
				if (localStorage.clwordtwo[i] == "?"){
					currTile.innerText = "";
				}
				else if (localStorage.clwordtwo[i] != ""){
					currTile.innerText = localStorage.clwordtwo[i];
					currTile.classList.add("correct");
				}
			}	
		}		
		if (localStorage.clwordthree != ""){
			for (let i = 0; i < wordthreewidth; i++){
				let currTile = document.getElementById("3" + '-' + i);
				if (localStorage.clwordthree[i] == "?"){
					currTile.innerText = "";
				}
				else if (localStorage.clwordthree[i] != ""){
					currTile.innerText = localStorage.clwordthree[i];
					currTile.classList.add("correct");
				}
			}	
		}		
		if (localStorage.clwordfour != ""){
			for (let i = 0; i < wordfourwidth; i++){
				let currTile = document.getElementById("4" + '-' + i);
				if (localStorage.clwordfour[i] == "?"){
					currTile.innerText = "";
				}
				else if (localStorage.clwordfour[i] != ""){
					currTile.innerText = localStorage.clwordfour[i];
					currTile.classList.add("correct");
				}
			}	
		}		
		if (localStorage.clwordfive != ""){
			for (let i = 0; i < wordfivewidth; i++){
				let currTile = document.getElementById("5" + '-' + i);
				if (localStorage.clwordfive[i] == "?"){
					currTile.innerText = "";
				}
				else if (localStorage.clwordfive[i] != ""){
					currTile.innerText = localStorage.clwordfive[i];
					currTile.classList.add("correct");
				}
			}	
		}		
		if (localStorage.clwordsix != ""){
			for (let i = 0; i < wordsixwidth; i++){
				let currTile = document.getElementById("6" + '-' + i);
				if (localStorage.clwordsix[i] == "?"){
					currTile.innerText = "";
				}
				else if (localStorage.clwordsix[i] != ""){
					currTile.innerText = localStorage.clwordsix[i];
					currTile.classList.add("correct");
				}
			}	
		}			
		if (localStorage.clwordlast != ""){
			for (let i = 0; i < wordlastwidth; i++){
				let currTile = document.getElementById("7" + '-' + i);
				if (localStorage.clwordlast[i] == "?"){
					currTile.innerText = "";
				}
				else if (localStorage.clwordlast[i] != ""){
					currTile.innerText = localStorage.clwordlast[i];
					currTile.classList.add("correct");
				}
			}	
		}
	}

}


function processKey() {
    e = { "code" : this.id };
    processInput(e);
}

function processInput(e) {
    if (gameOver) return; 
	document.getElementById("lives").classList.remove("blink");	
	document.getElementById("answer").innerText = "";
	var LetterFound = 0;
    if ("KeyA" <= e.code && e.code <= "KeyZ") {
		for (let i = 0; i < wordonewidth; i++){
			let currTile = document.getElementById("1" + '-' + i);
			if (e.code[3] == wordone[i]){
				if (currTile.innerText == ""){
					currTile.innerText = e.code[3];
					currTile.classList.add("correct","poptile");
					localStorage.clcorrect = Number(localStorage.clcorrect) + 1;				
				}
				LetterFound = 1;
			}	
		}
		for (let i = 0; i < wordtwowidth; i++){
			let currTile = document.getElementById("2" + '-' + i);
			if (e.code[3] == wordtwo[i]){
				if (currTile.innerText == ""){
					currTile.innerText = e.code[3];
					currTile.classList.add("correct","poptile");
					localStorage.clcorrect = Number(localStorage.clcorrect) + 1;				
				}
				LetterFound = 1;
			}	
		}	
		for (let i = 0; i < wordthreewidth; i++){
			let currTile = document.getElementById("3" + '-' + i);
			if (e.code[3] == wordthree[i]){
				if (currTile.innerText == ""){
					currTile.innerText = e.code[3];
					currTile.classList.add("correct","poptile");
					localStorage.clcorrect = Number(localStorage.clcorrect) + 1;				
				}
				LetterFound = 1;
			}	
		}			
		for (let i = 0; i < wordfourwidth; i++){
			let currTile = document.getElementById("4" + '-' + i);
			if (e.code[3] == wordfour[i]){
				if (currTile.innerText == ""){
					currTile.innerText = e.code[3];
					currTile.classList.add("correct","poptile");
					localStorage.clcorrect = Number(localStorage.clcorrect) + 1;				
				}
				LetterFound = 1;
			}	
		}		
		for (let i = 0; i < wordfivewidth; i++){
			let currTile = document.getElementById("5" + '-' + i);
			if (e.code[3] == wordfive[i]){
				if (currTile.innerText == ""){
					currTile.innerText = e.code[3];
					currTile.classList.add("correct","poptile");
					localStorage.clcorrect = Number(localStorage.clcorrect) + 1;				
				}
				LetterFound = 1;
			}	
		}		
		for (let i = 0; i < wordsixwidth; i++){
			let currTile = document.getElementById("6" + '-' + i);
			if (e.code[3] == wordsix[i]){
				if (currTile.innerText == ""){
					currTile.innerText = e.code[3];
					currTile.classList.add("correct","poptile");
					localStorage.clcorrect = Number(localStorage.clcorrect) + 1;				
				}
				LetterFound = 1;
			}	
		}		
		for (let i = 0; i < wordlastwidth; i++){
			let currTile = document.getElementById("7" + '-' + i);
			if (e.code[3] == wordlast[i]){
				if (currTile.innerText == ""){
					currTile.innerText = e.code[3];
					currTile.classList.add("correct","poptile");
					localStorage.clcorrect = Number(localStorage.clcorrect) + 1;
				}
				LetterFound = 1;				
			}
		}	
		document.getElementById(e.code).classList.add("disabled");
		var disabledkey = e.code[3];
		if (disabledkeyarr.length == 0){
			var temp = JSON.parse(localStorage.getItem("cldisabledkey"));
			if (temp != ""){
				disabledkeyarr.push(temp);
			}
		}
		disabledkeyarr.push(disabledkey);
		disabledkeyarr = [].concat.apply([], disabledkeyarr);
		localStorage.setItem("cldisabledkey", JSON.stringify(disabledkeyarr));		
    }
	
	if (LetterFound == 0){
		localStorage.cllivescnt = Number(localStorage.cllivescnt) + 1;
		document.getElementById("answer").style.color = "red";
		switch (Number(localStorage.cllivescnt)) {
				case 0: localStorage.cllives = "🔴🔴🔴🔴🔴";
					break;
				case 1: localStorage.cllives = "🔴🔴🔴🔴";
					document.getElementById("answer").innerText = "FIRST LIFE LOST!"
					break;	
				case 2: localStorage.cllives = "🔴🔴🔴";
					document.getElementById("answer").innerText = "SECOND LIFE LOST!"
					break;				
				case 3: localStorage.cllives = "🔴🔴";
					document.getElementById("answer").innerText = "THIRD LIFE LOST!"				
					break;	
				case 4: localStorage.cllives = "🔴";
					document.getElementById("answer").innerText = "FOURTH LIFE LOST - LAST LIFE ALERT!"		
					setTimeout(FinalClue, 500);			
					break;	
				// case 5: localStorage.cllives = "⚠️";
				// 	document.getElementById("answer").innerText = "LAST LIFE ALERT!"
				// 	setTimeout(FinalClue, 500);	
				// 	break;
				case 5: localStorage.cllives = "💀💀💀💀💀";
					break;					
		}		
		
		document.getElementById("lives").innerText = localStorage.cllives;
		document.getElementById("lives").classList.add("blink");
		setTimeout(removeblink, 3000);	
	}
	
	if (Number(localStorage.cllivescnt == 5)){
		for (let i = 0; i < wordonewidth; i++) {
			let currTile = document.getElementById("1" + '-' + i);
			currTile.innerText = wordone[i];
			currTile.classList.remove("poptile","correct");
			currTile.classList.add("failed", "animated");
		}	
		for (let i = 0; i < wordtwowidth; i++) {
			let currTile = document.getElementById("2" + '-' + i);
			currTile.innerText = wordtwo[i];
			currTile.classList.remove("poptile","correct");
			currTile.classList.add("failed", "animated");
		}		
		for (let i = 0; i < wordthreewidth; i++) {
			let currTile = document.getElementById("3" + '-' + i);
			currTile.innerText = wordthree[i];
			currTile.classList.remove("poptile","correct");
			currTile.classList.add("failed", "animated");
		}		
		for (let i = 0; i < wordfourwidth; i++) {
			let currTile = document.getElementById("4" + '-' + i);
			currTile.innerText = wordfour[i];
			currTile.classList.remove("poptile","correct");
			currTile.classList.add("failed", "animated");
		}		
		for (let i = 0; i < wordfivewidth; i++) {
			let currTile = document.getElementById("5" + '-' + i);
			currTile.innerText = wordfive[i];
			currTile.classList.remove("poptile","correct");
			currTile.classList.add("failed", "animated");
		}		
		for (let i = 0; i < wordsixwidth; i++) {
			let currTile = document.getElementById("6" + '-' + i);
			currTile.innerText = wordsix[i];
			currTile.classList.remove("poptile","correct");
			currTile.classList.add("failed", "animated");
		}
		for (let i = 0; i < wordlastwidth; i++) {
			let currTile = document.getElementById("7" + '-' + i);
			currTile.innerText = wordlast[i];
			currTile.classList.remove("poptile","correct");
			currTile.classList.add("failed", "animated");
		}		
			gameOver = true;
			localStorage.starclxcount = Number(localStorage.starclxcount) + 1;
			colorx = "green";
			localStorage.clgamecnt = 6;
			document.getElementById("answer").style.color = "red";
			document.getElementById("answer").innerText = "GAME OVER! OUT OF LIVES.";
			localStorage.setItem(('gameovercl' + days), 1);	
			localStorage.totalclplayed = Number(localStorage.totalclplayed) + 1;	
			localStorage.totalclstreak = 0;		
			SetTier();			
			var winpct = Math.round(localStorage.totalclwins / localStorage.totalclplayed * 100);
			document.getElementById(11).innerText = "PLAYED: " + localStorage.totalclplayed;
			document.getElementById(12).innerText = "WIN %: " + winpct;
			document.getElementById(13).innerText = "STREAK: " + localStorage.totalclstreak + tiericon;
			document.getElementById(14).innerText = "STARS: " + localStorage.totalclstars;			
			displayFooter();
			localStorage.gameclwon = 0;
			setTimeout(OpenStats, 3200);				
	}	
	
	if (Number(localStorage.clcorrect) == word.length){
		for (let i = 0; i < wordonewidth; i++) {
			let currTile = document.getElementById("1" + '-' + i);
			currTile.innerText = wordone[i];
			currTile.classList.remove("poptile");
			// currTile.classList.add("animated");
		}	
		for (let i = 0; i < wordtwowidth; i++) {
			let currTile = document.getElementById("2" + '-' + i);
			currTile.innerText = wordtwo[i];
			currTile.classList.remove("poptile");
			// currTile.classList.add("animated");
		}	
		for (let i = 0; i < wordthreewidth; i++) {
			let currTile = document.getElementById("3" + '-' + i);
			currTile.innerText = wordthree[i];
			currTile.classList.remove("poptile");
			// currTile.classList.add("animated");
		}	
		for (let i = 0; i < wordfourwidth; i++) {
			let currTile = document.getElementById("4" + '-' + i);
			currTile.innerText = wordfour[i];
			currTile.classList.remove("poptile");
			// currTile.classList.add("animated");
		}			
		for (let i = 0; i < wordfivewidth; i++) {
			let currTile = document.getElementById("5" + '-' + i);
			currTile.innerText = wordfive[i];
			currTile.classList.remove("poptile");
			// currTile.classList.add("animated");
		}			
		for (let i = 0; i < wordsixwidth; i++) {
			let currTile = document.getElementById("6" + '-' + i);
			currTile.innerText = wordsix[i];
			currTile.classList.remove("poptile");
			// currTile.classList.add("animated");
		}			
		for (let i = 0; i < wordlastwidth; i++) {
			let currTile = document.getElementById("7" + '-' + i);
			currTile.innerText = wordlast[i];
			currTile.classList.remove("poptile");
			// currTile.classList.add("animated");
		}		
			gameOver = true;
			localStorage.clstarscnt = 5 - Number(localStorage.cllivescnt);
			switch (Number(localStorage.clstarscnt)) {
				case 0: localStorage.starcl0count = Number(localStorage.starcl0count) + 1;
					color0 = "green";
					localStorage.clgamecnt = 0;
					break;
				case 1: localStorage.starcl1count = Number(localStorage.starcl1count) + 1;
					color1 = "green";
					localStorage.clgamecnt = 1;
					break;
				case 2: localStorage.starcl2count = Number(localStorage.starcl2count) + 1;
					color2 = "green";
					localStorage.clgamecnt = 2;
					break;
				case 3: localStorage.starcl3count = Number(localStorage.starcl3count) + 1;
					color3 = "green";
					localStorage.clgamecnt = 3;
					break;
				case 4: localStorage.starcl4count = Number(localStorage.starcl4count) + 1;
					color4 = "green";
					localStorage.clgamecnt = 4;
					break;
				case 5: localStorage.starcl5count = Number(localStorage.starcl5count) + 1;
					color5 = "green";
					localStorage.clgamecnt = 5;
					break;
			}
			document.getElementById("answer").style.color = "#6AAA64";
			if (Number(localStorage.clstarscnt) == 0){
				document.getElementById("answer").innerText = "STREAK INTACT. THOUGH, NO STARS WON!";
			}
			else if (Number(localStorage.clstarscnt) > 0){
					if (localStorage.clstarscnt == 1){
						document.getElementById("answer").innerText = "GREAT GOING! YOU WON " + localStorage.clstarscnt +" STAR TODAY.";
					}
					else {
						document.getElementById("answer").innerText = "GREAT GOING! YOU WON " + localStorage.clstarscnt +" STARS TODAY.";
					}
			}
/* 			for (let s = 0; s < localStorage.clstarscnt; s++){
				document.getElementById("answerstar").innerText += "⭐";
			} */
			var templives = "";
			templives = document.getElementById("lives").innerText;
			for (i=0; i<5; i++){
				templives = templives.replace("🔴", "⭐");
			}	
			document.getElementById("lives").innerText = templives;
			if (Number (localStorage.clstarscnt) != 0){
				document.getElementById("lives").classList.add("animated");
			}
			localStorage.setItem(('gameovercl' + days), 1);	
			localStorage.totalclplayed = Number(localStorage.totalclplayed) + 1;
			localStorage.totalclwins = Number(localStorage.totalclwins) + 1;
			localStorage.totalclstreak = Number(localStorage.totalclstreak) + 1;
			localStorage.totalclstars = Number(localStorage.totalclstars) + Number(localStorage.clstarscnt);
			SetTier();
			var winpct = Math.round(localStorage.totalclwins / localStorage.totalclplayed * 100);
			document.getElementById(11).innerText = "PLAYED: " + localStorage.totalclplayed;
			document.getElementById(12).innerText = "WIN %: " + winpct;
			document.getElementById(13).innerText = "STREAK: " + localStorage.totalclstreak + tiericon;
			document.getElementById(14).innerText = "STARS: " + localStorage.totalclstars;			
			displayFooter();
			localStorage.gameclwon = 1;
			setTimeout(ConfettiStart, 1000);
			setTimeout(OpenStats, 4800);
	}	
	let clwordone = "";
	for (let i = 0; i < wordonewidth; i++){
		let currTile = document.getElementById("1" + '-' + i);
		if (currTile.innerText == ""){
			clwordone += "?";
		}
		else{
			clwordone += currTile.innerText;
		}
		localStorage.clwordone = clwordone;
	}	
	let clwordtwo = "";
	for (let i = 0; i < wordtwowidth; i++){
		let currTile = document.getElementById("2" + '-' + i);
		if (currTile.innerText == ""){
			clwordtwo += "?";
		}
		else{
			clwordtwo += currTile.innerText;
		}
		localStorage.clwordtwo = clwordtwo;
	}	
	
	let clwordthree = "";
	for (let i = 0; i < wordthreewidth; i++){
		let currTile = document.getElementById("3" + '-' + i);
		if (currTile.innerText == ""){
			clwordthree += "?";
		}
		else{
			clwordthree += currTile.innerText;
		}
		localStorage.clwordthree = clwordthree;
	}	

	let clwordfour = "";
	for (let i = 0; i < wordfourwidth; i++){
		let currTile = document.getElementById("4" + '-' + i);
		if (currTile.innerText == ""){
			clwordfour += "?";
		}
		else{
			clwordfour += currTile.innerText;
		}
		localStorage.clwordfour = clwordfour;
	}	
	
	let clwordfive = "";
	for (let i = 0; i < wordfivewidth; i++){
		let currTile = document.getElementById("5" + '-' + i);
		if (currTile.innerText == ""){
			clwordfive += "?";
		}
		else{
			clwordfive += currTile.innerText;
		}
		localStorage.clwordfive = clwordfive;
	}		

	let clwordsix = "";
	for (let i = 0; i < wordsixwidth; i++){
		let currTile = document.getElementById("6" + '-' + i);
		if (currTile.innerText == ""){
			clwordsix += "?";
		}
		else{
			clwordsix += currTile.innerText;
		}
		localStorage.clwordsix = clwordsix;
	}	

	let clwordlast = "";
	for (let i = 0; i < wordlastwidth; i++){
		let currTile = document.getElementById("7" + '-' + i);
		if (currTile.innerText == ""){
			clwordlast += "?";
		}
		else{
			clwordlast += currTile.innerText;
		}
		localStorage.clwordlast = clwordlast;
	}		
}
