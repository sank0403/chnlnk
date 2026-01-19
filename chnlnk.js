var gameOver = false;
let isPaused = false;

function pauseMomentumTimer() {
  isPaused = true;
}

function resumeMomentumTimer() {
  isPaused = false;
}

localStorage.setItem("cldynamiteUsedThisRound", "false");

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
var bbInterval = setInterval(function () {
    var toDate = new Date();
    var tomorrow = new Date();
    tomorrow.setHours(24, 0, 0, 0);

    var diffMS = (tomorrow - toDate) / 1000;
    var diffHr = Math.floor(diffMS / 3600);
    diffMS -= diffHr * 3600;
    var diffMi = Math.floor(diffMS / 60);
    diffMS -= diffMi * 60;
    var diffS = Math.floor(diffMS);

    var result =
        (diffHr < 10 ? "0" + diffHr : diffHr) + ":" +
        (diffMi < 10 ? "0" + diffMi : diffMi) + ":" +
        (diffS < 10 ? "0" + diffS : diffS);

    if (localStorage.getItem("gameovercl" + days) == 1) {
        div.innerHTML = result;
        clearInterval(bbInterval); // ← stops runaway intervals
    }
}, 1000);


//Open Stats at end of game
function OpenStats() {
	document.getElementById("statsbutton").click();
}

function OpenADDModal() {
	document.getElementById("addpop").click();
}

function OpenTIMEModal() {
	document.getElementById("timepop").click();
}

function OpenHINTModal() {
	document.getElementById("Rafflebutton").click();
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
	HTMLButton.innerText = "SHARE"
}


//Display Footer after game
function displayFooter() {
	// document.getElementById("pzlhdr").style.display = "block";
	// document.getElementById("pzl").style.display = "block";
	document.getElementById("bbhdr").style.display = "block";
	document.getElementById("bb").style.display = "block";
	document.getElementById("HTMLButton").style.display = "block";
	document.getElementById("Rafflebutton").style.display = "block";
	document.getElementById("Archivebutton").style.display = "block";
	document.getElementById("submission").style.display = "block";
	//document.getElementById("toggle-row").style.visibility = "visible";
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
localStorage.setItem("clshowalert",0);
}

if (!localStorage.clshowalert){
localStorage.setItem("clshowalert",0);
}

if (!localStorage.clhardmode){
localStorage.setItem("clhardmode",0);
}

if (!localStorage.clshowrules){
localStorage.setItem("clshowrules",1);
setTimeout(OpenRules, 1100);
}



//Baseline Date
var a = new Date(); // Current date now.
var b = new Date(2025, 12, 9, 0, 0, 0, 0); // Start of TENIZ.
var d = (a - b); // Difference in milliseconds.
var days = parseInt((d / 1000) / 86400);
if (localStorage.getItem('gameovercl' + days) != 0 && localStorage.getItem('gameovercl' + days) != 1) {
	localStorage['gameovercl' + days] = 0;
	localStorage.setItem("cllives","🔴🔴🔴🔴🔴");
	localStorage.setItem("clcorrect"," ");
	localStorage.setItem("vowelcount",0);
    localStorage.setItem("consocount",0);
	localStorage.setItem("vowelactive",0);
	localStorage.setItem("cllivescnt",0);
	localStorage.setItem("clstarscnt",0);
	localStorage.setItem("clguesscnt",0);
	localStorage.setItem("clgamestarted",0);
	localStorage.setItem("clwordone","");
	localStorage.setItem("clwordtwo","");
	localStorage.setItem("clwordthree","");	
	localStorage.setItem("clwordfour","");	
	localStorage.setItem("clwordfive","");	
	localStorage.setItem("clwordsix","");	
	localStorage.setItem("clwordlast","");
	localStorage.setItem("cldisabledkey", JSON.stringify(""));
	localStorage.setItem("clgamecnt",0);
	if(localStorage.clhardmode==1){
		localStorage.setItem("momentumStart", Date.now());
		localStorage.setItem("momentumRemaining", 60);
	}
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

function getUnrevealedConsonants() {
  const tiles = document.querySelectorAll(".tile, .tilesmall, .voweltile, .voweltilesmall");
  const result = [];

  tiles.forEach(tile => {
    // Skip tiles with any of these classes
    if (
      tile.classList.contains("correct") ||
      tile.classList.contains("starting") ||
      tile.classList.contains("voweltilesmall") ||
      tile.classList.contains("voweltile")
    ) {
      return;
    }

    // Extract row and column from ID like "2-3"
    const [row, col] = tile.id.split("-").map(Number);

    // Determine the letter from the correct word array
    let letter = "";
    if (row === 1) letter = wordone[col];
    if (row === 2) letter = wordtwo[col];
    if (row === 3) letter = wordthree[col];
    if (row === 4) letter = wordfour[col];
    if (row === 5) letter = wordfive[col];
    if (row === 6) letter = wordsix[col];
    if (row === 7) letter = wordlast[col];

    // Avoid duplicates
    if (!result.includes(letter)) {
      result.push(letter);
    }
  });

  return result;
}

function markTileWithQuestion(letter) {
  // Select all tile types
  const tiles = document.querySelectorAll(".tile, .tilesmall, .voweltile, .voweltilesmall");

  // Collect only eligible tiles for this letter
  const eligible = [];

  tiles.forEach(tile => {
    const [row, col] = tile.id.split("-").map(Number);

    // Determine the letter from the correct word array
    let tileLetter = "";
    if (row === 1) tileLetter = wordone[col];
    if (row === 2) tileLetter = wordtwo[col];
    if (row === 3) tileLetter = wordthree[col];
    if (row === 4) tileLetter = wordfour[col];
    if (row === 5) tileLetter = wordfive[col];
    if (row === 6) tileLetter = wordsix[col];
    if (row === 7) tileLetter = wordlast[col];

    // Skip tiles that don't match the letter
    if (tileLetter !== letter) return;

    // Skip tiles with forbidden classes
    if (
      tile.classList.contains("correct") ||
      tile.classList.contains("starting")
    ) {
      return;
    }

    eligible.push(tile);
  });

  // No eligible tiles? Exit safely
  if (eligible.length === 0) return;

  // Pick ONE tile at random
  const chosenTile = eligible[Math.floor(Math.random() * eligible.length)];

  // Mark it visually
  chosenTile.classList.add("mystery","flash2");
   chosenTile.innerText = "❓";

  // if (!chosenTile.querySelector(".mystery-icon")) {
    // const icon = document.createElement("div");
    // icon.classList.add("mystery-icon");
    // icon.innerText = "❓";
    // chosenTile.appendChild(icon);
  // }
}

function removeQuestionFromTile(letter) {
  const tiles = document.querySelectorAll(".mystery");

  tiles.forEach(tile => {
    const [row, col] = tile.id.split("-").map(Number);

    let tileLetter = "";
    if (row === 1) tileLetter = wordone[col];
    if (row === 2) tileLetter = wordtwo[col];
    if (row === 3) tileLetter = wordthree[col];
    if (row === 4) tileLetter = wordfour[col];
    if (row === 5) tileLetter = wordfive[col];
    if (row === 6) tileLetter = wordsix[col];
    if (row === 7) tileLetter = wordlast[col];

    if (tileLetter === letter) {
      tile.classList.remove("mystery","flash2");
	  tile.innerText = "";
      // const icon = tile.querySelector(".mystery-icon");
      // if (icon) icon.remove();
    }
  });
}

function disableKeys(keys) {
  keys.forEach(k => document.getElementById("Key" + k).classList.add("disabled"));
}

function showTimedBonus() {
    const bonus = document.createElement("div");
    bonus.id = "timed-bonus";

    bonus.innerHTML = `
        <div class="burst"></div>
        <div class="bonus-text">⏱️ TIMED MODE BONUS ⭐ +1</div>
    `;

    document.body.appendChild(bonus);

    // Remove after animation completes
    setTimeout(() => bonus.remove(), 3200);
}

function showStreakPopup(message) {
  const el = document.getElementById("streakPopupText");

  if (el.innerText.trim() !== "") {
    el.innerText += "\n" + message;
  } else {
    el.innerText = message;
  }

  document.getElementById("streakPopup").classList.remove("hidden");

}

function closeStreakPopup() {
  document.getElementById("streakPopup").classList.add("hidden");
}


function openLifeTradeModal() {
    isPaused = true;; // pause timer
    const modal = document.createElement("div");
    modal.id = "life-trade-modal";
    modal.innerHTML = `
        <div class="life-trade-box">
            <div class="life-trade-title">TRADE OFFER</div>
            <div class="life-trade-msg">Trade 2 Stars for an Extra Life?</div>
            <div class="life-trade-buttons">
                <button id="trade-yes">YES</button>
                <button id="trade-no">NO</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById("trade-yes").onclick = () => {
        modal.remove();
        applyLifeTrade();
        isPaused = false; // resume timer
    };

    document.getElementById("trade-no").onclick = () => {
        modal.remove();
        isPaused = false; // resume timer
    };
}




function applyLifeTrade() {
    // Deduct stars
    localStorage.totalclstars = Number(localStorage.totalclstars) - 2;

    // Restore 1 life
    localStorage.cllivescnt = Number(localStorage.cllivescnt) - 1;

    // Update life display
    const livesLeft = 5 - Number(localStorage.cllivescnt);
    localStorage.cllives = "🔴".repeat(livesLeft);
    document.getElementById("lives").innerText = localStorage.cllives;
	document.getElementById("answer").innerText = "";
    // Animation
    showLifeRestored();
}


function showLifeRestored() {
    const pop = document.createElement("div");
    pop.id = "life-restored";
    pop.innerText = "+1 LIFE 🔴";
    document.body.appendChild(pop);

    setTimeout(() => pop.remove(), 2000);
}

function showDynamiteAdded() {
    const pop = document.createElement("div");
    pop.id = "life-restored";
	if (localStorage.clhardmode == 1){
		pop.innerText = "+2 DYNAMITES 💣";
	}
	else{
		pop.innerText = "+1 DYNAMITE 💣";
	}
    document.body.appendChild(pop);
    setTimeout(() => pop.remove(), 2000);
}

function showMysteryAdded() {
    const pop = document.createElement("div");
    pop.id = "life-restored";
    pop.innerText = "MYSTERY LETTER ❓";
    document.body.appendChild(pop);

    setTimeout(() => pop.remove(), 2000);
}

function showPerfectSolve() {
    const box = document.createElement("div");
    box.id = "perfect-solve";
	if (localStorage.clhardmode == 1){
		box.innerHTML = `
			<div class="perfect-burst"></div>
			<div class="perfect-text">👌 PERFECT SOLVE +2 💣</div>
		`;
	}
	else{
		box.innerHTML = `
			<div class="perfect-burst"></div>
			<div class="perfect-text">👌 PERFECT SOLVE +1 💣</div>
		`;		
	}

    document.body.appendChild(box);

    setTimeout(() => box.remove(), 3000);
}



function updateDynamiteUI() {
    const dyn = Number(localStorage.cldynamite || 0);
    document.getElementById("dynamite-btn").innerText = "💣 x" + dyn;
}
updateDynamiteUI();


document.getElementById("dynamite-btn").onclick = () => {
   if (!gameOver) {	
		let dyn = Number(localStorage.cldynamite || 0);

		if (dyn <= 0) {
			shakeDynamiteButton();
			return;
		}

		useDynamite();
   }
};

// Shuffle helper
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function useDynamite() {
    if (!gameOver) {

        // ⭐ First-time tutorial message
        if (!localStorage.getItem("cldynamiteTutorialShown")) {
            // showMessage("DYNAMITE ELIMINATES 2 INVALID LETTERS FROM THE KEYBOARD. HIT AGAIN TO USE!");
			showStreakPopup("💣 DYNAMITE ELIMINATES 2 INVALID LETTERS FROM THE KEYBOARD ⌨️. \n HIT AGAIN TO USE!");
			showMessage("");
            localStorage.setItem("cldynamiteTutorialShown", "true");
            return;
        }

        let dyn = Number(localStorage.cldynamite || 0);

        const forbiddenLetters = new Set(
            (wordtwo + wordthree + wordfour + wordfive + wordsix).split("")
        );

        const keys = [...document.querySelectorAll(".key-tile")];

        const eligibleKeys = keys.filter(k => {
            if (k.classList.contains("disabled")) return false;

            const letter = k.id.replace("Key", "");
            if (forbiddenLetters.has(letter)) return false;

            return true;
        });

        if (eligibleKeys.length < 2) {
            showMessage("NOT ENOUGH KEYS TO BE ELIMINATED!");
			shakeDynamiteButton();
            return;
        }

        // ⭐ Consume 1 dynamite
        localStorage.cldynamite = dyn - 1;
        updateDynamiteUI();

        // Shuffle to make selection random
        shuffle(eligibleKeys);

        const toRemove = eligibleKeys.slice(0, 2);

        let disabledkeyarr = [];
        let temp = JSON.parse(localStorage.getItem("cldisabledkey"));
        if (temp && temp.length > 0) disabledkeyarr = temp;

        const removedLetters = [];

        toRemove.forEach(k => {
            k.classList.add("disabled");

            const letter = k.id.replace("Key", "");
            removedLetters.push(letter);

            disabledkeyarr.push(letter);
        });

        localStorage.setItem("cldisabledkey", JSON.stringify(disabledkeyarr));

        showMessage("DYNAMITE ELIMINATED: " + removedLetters.join(", "));
        localStorage.setItem("cldynamiteUsedThisRound", "true");

        showDynamiteBlast();
    }
}


function showMessage(msg) {
    document.getElementById("answer").innerText = msg;
}

function showDynamiteBlast() {
    const blast = document.createElement("div");
    blast.id = "dynamite-blast";
    blast.innerText = "💥";
    document.body.appendChild(blast);
    setTimeout(() => blast.remove(), 1200);
}

function shakeDynamiteButton() {
    const btn = document.getElementById("dynamite-btn");
	if ((!localStorage.cldynamite)|| (Number(localStorage.cldynamite) === 0)){
		showMessage("NO DYNAMITES AVAILABLE");
	}
    btn.classList.add("shake");
    setTimeout(() => btn.classList.remove("shake"), 400);
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


document.getElementById("hardmodetoggle").addEventListener("change", function () {
  if (this.checked) {
    // console.log("Timed Mode Enabled");
	localStorage.clhardmode = 1;
	localStorage.clgamestarted = 1;
    // enable timed mode logic here
  } else {
    // console.log("Timed Mode Disabled");
	localStorage.clhardmode = 0;
    // disable timed mode logic here
  }
  setTimeout(() => location.reload(), 150);
});

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
				case 6: var clueicon = "❌❌❌❌❌"
					break;					
			}
		
	if (tierlevel == ""){
		var copyText = "🔗 CHN LNK # " + days + " 🧩 \n\n" + cluehdr + " - " + clueicon + "\n🔥 Streak: " + localStorage.totalclstreak + " | ⭐ Stars: " + localStorage.totalclstars + "\n\nhttps://sank0403.github.io/chnlnk/";
	}
	else {
		var copyText = "🔗 CHN LNK # " + days + " 🧩 \n\n" + cluehdr + " - " + clueicon + "\n🔥 Streak: " + localStorage.totalclstreak + " | ⭐ Stars: " + localStorage.totalclstars + "\n" + tiericon +  " Tier: " + tierlevel + "\n\nhttps://sank0403.github.io/chnlnk/";
	}
			
		
	/* Copy the text inside the text field */
	navigator.clipboard.writeText(copyText);

	//Button Text
	let HTMLButton = document.getElementById("HTMLButton");
	HTMLButton.innerText = "COPIED"
	setTimeout(ResetButton, 1000);
}

var firstwordlist = [	"river",	"garden",	"coffee",	"market",	"harbor",	"winter",	"silver",	"forest",	"party",	"black",	"cotton",	"yellow",		"ocean",	"music",	"desert",	"morning","traffic","crystal","thunder","island","candle","rocket","family","summer","cotton","marble","dragon","pepper","harbor","riverbank","meadow","lantern","timber","coral","velvet","canyon","orchard","glacier","prairie","summit","harborfront","compass","lantern","canyon","meadow","timber","coral","velvet","glacier","prairie","summit","compass","lantern","canyon","harbor","maple","copper","puzzle","shadow","signal","berry","iron","canyon","harbor","falcon","marble","timber","lantern","meadow","glacier","prairie","summit","compass","coral","velvet","harborfront","riverbed","gardenia","coffee","market","winter","silver","forest","ocean","music","desert","morning","traffic","crystal","thunder","island","candle","rocket","family","summer","cotton","marble","dragon","pepper","lantern","canyon","meadow","timber","coral","harbor","maple","copper","puzzle","shadow","signal","berry","iron","canyon","harbor","falcon","marble","timber","lantern","meadow","glacier","prairie","summit","compass","coral","velvet","harborfront","riverbed","gardenia","coffee","market","winter","silver","forest","ocean","music","desert","morning","traffic","crystal","thunder","island","candle","rocket","family","summer","cotton","marble","dragon","pepper","lantern","canyon","meadow","timber","coral","harbor","maple","copper","puzzle","shadow","signal","berry","iron","canyon","harbor","falcon","marble","timber","lantern","meadow","glacier","prairie","summit","compass","coral","velvet","harborfront","riverbed","gardenia","coffee","market","winter","silver","forest","ocean","music","desert","morning","traffic","crystal","thunder","island","candle","rocket","family","summer","cotton","marble","dragon","pepper","lantern","canyon","meadow","timber","coral","harbor","maple","copper","puzzle","shadow","signal","berry","iron","canyon","harbor","falcon","marble","timber","lantern","meadow","glacier","prairie","summit","compass","coral","velvet","harborfront","riverbed","gardenia","coffee","market","winter","silver","forest","ocean","music","desert","morning","traffic","crystal","thunder","island","candle","rocket","family","summer","cotton","marble","dragon","pepper","lantern","canyon","meadow","timber","coral"];
var secondwordlist = [	"stone",	"path",		"break",	"share",	"dock",		"storm",	"spoon",	"trail",	"animal",	"box",		"candy",	"banana",		"tide",		"sheet",	"wind",		"dew","light","clear","clap","nation","flame","fuel","bond","heat","thread","statue","scale","mill","seal","erosion","lark","light","wolf","reef","rope","wall","apple","melt","dog","peak","market","rose","glow","echo","grass","frame","sand","curtain","ice","fire","meeting","point","festival","rim","light","leaf","wire","piece","cast","tower","patch","forge","floor","mist","wing","floor","yard","post","bloom","runoff","trail","ridge","needle","bloom","touch","pier","clay","bloom","roast","stall","coat","lining","edge","spray","box","sand","star","jam","ball","roll","breeze","wax","launch","tree","camp","candy","arch","fire","spray","glow","trail","grassland","log","stone","crane","syrup","mine","lock","line","flare","smoothie","nail","ridge","crane","crest","quarry","beam","hook","stream","drift","wind","trailhead","bearing","cove","ribbon","cafe","silt","scent","bean","trend","frost","ore","canopy","current","scale","mirage","routine","circle","shard","burst","reef","holder","booster","album","breeze","thread","step","wing","grinder","shade","echo","larkspur","wolfhound","bloomfield","rope","grove","plate","board","puppet","jammer","tart","grip","bend","watch","dive","tile","cut","flame","brook","crust","field","crest","card","branch","fabric","rail","stonework","petal","mug","basket","chill","chain","fire","floor","note","bloom","glory","lane","cave","stormfront","dockside","smoke","stage","crest","solstice","bale","column","crest","seed","hook","rimstone","grasshopper","sawdust","lagoon","pilot","timberline","circuit","master","ridge","pulse","harvest","alloy","switchback","jetty","crestline","quarryman","ridgepole","wick","clover","icefall","homestead","outlook","heading","shoal","drapery","pavilion","gravel","blossom","grinder","forecast","icicle","pendant","understory","breaker","harmony","outpost","routine","merge","prism","rumble","ferry","lantern","nozzle","reunion","monsoon","textile","mosaic","crestfall","kernel","signal","overlook","pasture","outbuilding","tidepool"];
var thirdwordlist = [	"cold",		"finder",	"room",		"price",	"worker",	"drain",	"rest",		"mix",		"cracker",	"office",	"bar",		"split",		"pool",		"metal",	"mill",		"drop","speed","view","back","state","thrower","tank","paper","wave","count","garden","model","worker","team","control","song","house","pack","shark","swing","flower","core","water","house","hour","stall","garden","stick","chamber","roots","house","bar","call","sheet","drill","room","guard","season","shot","beam","spring","brush","work","iron","bridge","work","ahead","plan","cloud","span","lamp","sale","office","field","stream","marker","line","point","season","screen","walk","pot","cycle","level","holder","rack","fabric","case","bottle","office","bar","light","session","room","call","block","seal","pad","house","fire","strip","support","pit","paint","worm","mix","zone","cabin","path","lift","bottle","shaft","pick","cook","gun","maker","polish","trail","operator","hill","stone","balance","shot","flow","wood","break","sign","wall","beach","cut","table","layer","candle","counter","line","bite","deposit","cover","event","model","image","check","drive","edge","pipe","shark","ring","seat","cover","block","mill","ladder","span","wheel","tree","sound","bloom","pack","road","knot","street","rack","game","show","code","shell","strength","road","tower","bomb","floor","line","thrower","trout","layer","mouse","badge","trick","line","softener","car","wall","softener","holder","case","factor","store","break","lamp","pad","season","vine","marker","painting","line","market","alarm","name","hill","light","weight","base","hill","packet","shot","pool","field","trail","shore","boat","ridge","board","key","line","rate","season","wheel","road","stone","drive","tool","beam","holder","patch","route","act","point","change","water","rod","stage","pit","trail","wheel","model","drop","chain","layer","bar","line","guard","task","lane","light","strip","dock","post","flame","photo","rain","mill","tile","ridge","grinder","tower","deck","fence","frame","life"];
var forthwordlist = [	"front",	"fee",		"key",		"tag",		"bee",		"pipe",		"stop",		"tape",		"jack",		"space",	"graph",	"personality",	"table",	"plate",	"stone",	"zone","trap","point","pack","fair","squad","top","cut","form","down","party","train","strike","captain","panel","bird","key","ice","tank","dance","bed","value","bottle","plant","glass","holder","tool","figure","music","rock","party","stool","sign","music","bit","service","duty","ticket","put","balance","water","fire","bench","gate","deck","flow","start","ahead","cover","class","shade","price","hours","test","flow","stone","dance","blank","ticket","saver","through","holder","path","ground","ring","mount","softener","study","cap","chair","code","house","player","service","center","party","team","lock","party","pit","mall","beam","crew","brush","hole","match","defense","fever","finder","ticket","cap","light","pocket","stove","metal","space","remover","mix","badge","station","path","scale","caller","chart","carving","point","post","clock","house","line","runner","cake","wax","offer","graph","mark","slip","charge","planner","train","search","list","time","case","cleaner","bite","tone","belt","charge","letter","worker","rail","class","house","bark","wave","season","leader","map","work","light","mount","piece","time","word","shock","test","map","bell","squad","plan","cook","squad","line","cake","trap","number","shot","graph","sheet","wash","clock","sheet","ring","study","test","room","point","shade","lock","ticket","leaf","stone","brush","graph","stall","clock","tag","station","house","limit","line","climb","stamp","caller","table","test","mix","leave","ramp","trail","game","chain","graph","limit","ticket","house","map","wall","time","box","balance","ring","work","map","break","guard","order","wheel","holder","name","crew","mix","hub","train","zone","reaction","cake","stool","cook","duty","force","marker","house","mall","worker","office","thrower","frame","storm","worker","floor","trail","wheel","bell","chair","line","shop","jacket"];
var fifthwordlist = [	"line",		"schedule",	"chain",	"team",		"sting",	"cleaner",	"sign",		"measure",	"hammer",	"bar",		"paper",	"test",			"cloth",	"number",	"age",		"defense","door","guard","leader","trade","goal","shelf","line","letter","town","favor","track","zone","chair","show","cage","note","cube","top","card","frame","chain","cap","food","ceiling","ring","box","eight","hall","slide","trick","sample","post","stand","rate","charge","station","booth","away","scale","wheel","drill","press","keeper","chair","chart","line","time","charge","room","tree","point","long","drive","rate","wall","floor","page","price","mode","gate","ring","finder","floor","tone","point","sheet","group","lock","lift","word","key","card","charge","stage","favor","spirit","step","trick","stop","walk","balance","chief","stroke","punch","point","line","pitch","fee","booth","lock","beam","watch","pipe","shop","bar","tool","tape","number","master","marker","reading","id","top","knife","guard","office","tower","party","cook","up","stand","seal","letter","paper","sheet","knot","rate","pad","station","party","price","keeper","study","spray","mark","shift","loop","card","head","strike","car","act","rules","chip","form","ticket","board","maker","flow","beam","point","work","keeper","search","wave","drive","maker","rope","leader","layout","book","car","dance","stand","door","plate","caller","paper","metal","station","tower","music","tone","group","drive","service","guard","tree","step","booth","pile","path","stroke","paper","holder","tower","line","master","key","line","cook","rate","duty","name","runner","score","match","form","access","marker","piece","store","paper","line","booth","rules","maker","clock","keeper","cutter","board","tone","bench","maker","room","duty","form","house","badge","tag","chief","match","cap","station","marker","time","stand","sample","booklet","station","field","stone","key","walk","strike","chair","squad","shop","drain","badge","lamp","mix","house","rope","lift","cook","keeper","pocket"];
var sixthwordlist = [	"cook",		"change",	"link",		"spirit",	"operation","spray",	"language",	"step",		"toe",		"chart",	"bag",		"pilot",		"pattern",	"crunch",	"limit",	"system","frame","rail","board","route","keeper","life","dance","carrier","square","box","record","call","lift","time","match","pad","tray","hat","trick","shop","reaction","stone","chain","fan","tone","cutter","ball","pass","show","shot","size","office","alone","limit","card","master","worker","game","model","house","sergeant","release","role","lift","top","cook","zone","card","service","house","guard","shot","train","card","clock","plan","number","match","shift","code","leader","tool","lamp","shift","guard","metal","leader","step","ticket","search","chain","table","rate","name","bag","level","count","shot","sign","through","board","officer","count","line","guard","cook","perfect","schedule","worker","step","balance","tower","wrench","keeper","code","box","measure","plate","key","line","room","card","shelf","edge","rail","chair","bell","favor","book","hill","alone","stamp","carrier","plane","music","work","limit","lock","master","trick","match","net","group","bottle","sheet","worker","hole","reader","shot","zone","wash","break","committee","bag","letter","booth","game","space","chart","split","guard","bench","net","party","form","train","space","swing","board","grid","stand","wash","floor","mixer","frame","rack","id","plane","shop","master","guard","stand","shift","leader","time","charge","duty","bark","ladder","worker","driver","finder","count","weight","badge","bell","cook","code","chain","dance","booklet","limit","officer","plate","up","card","point","letter","code","stone","work","room","weight","dance","worker","committee","space","tower","net","blade","meeting","shift","press","space","service","station","letter","party","number","line","officer","point","lock","master","line","keeper","mixer","size","cover","master","test","path","chain","through","zone","lift","leader","keeper","pipe","number","shade","tape","party","swing","ticket","stove","badge","watch"];
var lastwordlist = [	"book",		"order",	"cable",	"level",	"manual",	"bottle",	"barrier",	"ladder",	"ring",		"patterns",	"drop",		"episode",		"maker",	"time",		"line",		"check","shop","car","game","map","net","jacket","floor","bag","root","office","holder","center","ticket","keeper","point","lock","table","trick","shot","keeper","time","path","link","club","shift","blade","room","code","case","clock","chart","chair","complex","line","holder","key","shift","plan","citizen","party","major","valve","player","shaft","score","stove","marker","reader","counter","rules","duty","caller","station","trick","tower","layout","crunch","point","key","word","board","kit","light","worker","rail","shop","role","ladder","booth","party","store","runner","limit","tag","holder","ground","down","caller","maker","lane","game","badge","down","cutter","duty","booklet","score","board","shift","count","board","guard","set","role","word","cutter","step","rack","chain","dance","service","reader","life","case","car","lift","rope","box","stand","climb","complex","duty","bag","crash","stand","flow","line","step","key","shot","point","weight","leader","rack","metal","badge","punch","dock","caller","marker","station","room","chair","holder","carrier","worker","piece","bar","top","level","rail","press","weight","trick","letter","station","bar","dance","meeting","line","alone","station","plan","bowl","shop","mount","number","crash","keeper","key","duty","light","worker","role","keeper","rate","station","chip","rail","shift","seat","tool","down","scale","number","rope","stove","word","store","floor","cover","line","badge","rack","hill","reader","guard","head","word","path","flow","service","scale","floor","badge","chair","bar","bell","weight","edge","room","worker","release","bar","counter","master","head","favor","plate","cook","badge","guard","step","code","cook","net","bowl","chart","charge","key","score","finder","store","lane","marker","ticket","role","role","cleaner","plate","tree","measure","favor","dance","booth","pipe","number","tower"];
var submitterlist = [	"","","","","","","","","Divya","Vidya","Kanishk","Div","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",];

// if (days%firstwordlist.length > 0){
	// var offset = Math.floor(days/firstwordlist.length);
// }
// else{
	// var offset = (days/firstwordlist.length) - 1;
// }
// if (days > firstwordlist.length){
	// var index  = days - 1 - (offset * firstwordlist.length);
// }
// else {
	// var index = days - 1;
// }
var index = days-1;
var wordone = firstwordlist[index].toUpperCase();
var wordtwo = secondwordlist[index].toUpperCase();
var wordthree = thirdwordlist[index].toUpperCase();
var wordfour = forthwordlist[index].toUpperCase();
var wordfive = fifthwordlist[index].toUpperCase();
var wordsix = sixthwordlist[index].toUpperCase();
var wordlast = lastwordlist[index].toUpperCase();
if (wordone.length > 8 || wordtwo.length > 8 || wordthree.length > 8 || wordfour.length > 8 || wordfive.length > 8 || wordsix.length > 8 || wordlast.length > 8){
	const box1 = document.getElementById ("boardfirst");
    box1.style.setProperty("padding-left", "0px");
	const box2 = document.getElementById ("boardsecond");
    box2.style.setProperty("padding-left", "0px");
	const box3 = document.getElementById ("boardthird");
    box3.style.setProperty("padding-left", "0px");
	const box4 = document.getElementById ("boardforth");
    box4.style.setProperty("padding-left", "0px");
	const box5 = document.getElementById ("boardfifth");
    box5.style.setProperty("padding-left", "0px");
	const box6 = document.getElementById ("boardsixth");
    box6.style.setProperty("padding-left", "0px");
	const box7 = document.getElementById ("boardlast");
    box7.style.setProperty("padding-left", "0px");
}    

var word = (wordone + wordtwo + wordthree + wordfour + wordfive + wordsix + wordlast).toUpperCase();
var solveword = (wordtwo + wordthree + wordfour + wordfive + wordsix).toUpperCase();
if (localStorage.vowelcount == 0){
for (let i = 0; i < solveword.length; i++) {
		if (solveword[i] == "A" || solveword[i] == "E" || solveword[i] == "I" || solveword[i] == "O" || solveword[i] == "U"){
			localStorage.vowelcount = Number(localStorage.vowelcount) + 1;
		}
	}	
}	
var wordonewidth = wordone.length; 
var wordtwowidth = wordtwo.length; 
var wordthreewidth = wordthree.length; 
var wordfourwidth = wordfour.length; 
var wordfivewidth = wordfive.length; 
var wordsixwidth = wordsix.length; 
var wordlastwidth = wordlast.length; 
var disabledkeyarr = [];
if (localStorage.vowelactive != 1){	
document.getElementById("answer").style.color = "lightgray";
document.getElementById("answer").innerText = "VOWELS ARE DISABLED TILL ALL OTHER LETTERS ARE FOUND.";
}
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')
openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
	pauseMomentumTimer();
	modalhide();
  })
})



overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
	resumeMomentumTimer();
	modalshow();
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
	resumeMomentumTimer();
	modalshow();
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


const openHintmodalButtons = document.querySelectorAll('[data-hintmodal-target]')
const closeHintmodalButtons = document.querySelectorAll('[data-close2-button]')
const overlay2 = document.getElementById('overlay2')


openHintmodalButtons.forEach(button => {
	button.addEventListener('click', () => {
		const hintmodal = document.querySelector(button.dataset.hintmodalTarget)
		openHintmodal(hintmodal)
		closeSummary(summary)
		modalhide();
	})
})

overlay2.addEventListener('click', () => {
	const hintmodals = document.querySelectorAll('.hintmodal.active')
	hintmodals.forEach(hintmodal => {
		closeHintmodal(hintmodal)
		modalshow();
	})
})

closeHintmodalButtons.forEach(button => {
	button.addEventListener('click', () => {
		const hintmodal = button.closest('.hintmodal')
		closeHintmodal(hintmodal)
		modalshow();
	})
})

function openHintmodal(hintmodal) {
	if (hintmodal == null) return
	hintmodal.classList.add('active')
	overlay2.classList.add('active')
}

function closeHintmodal(hintmodal) {
	if (hintmodal == null) return
	hintmodal.classList.remove('active')
	overlay2.classList.remove('active')
}

const openSummaryButtons = document.querySelectorAll('[data-summary-target]')
const closeSummaryButtons = document.querySelectorAll('[data-close1-button]')
const overlay1 = document.getElementById('overlay1')


openSummaryButtons.forEach(button => {
	button.addEventListener('click', () => {
		const summary = document.querySelector(button.dataset.summaryTarget)
		document.getElementById("submission").classList.add("flash2");
		// const elems = document.getElementsByClassName("toggle-label");
		// for (let el of elems) {
		  // el.classList.add("flash2");
		// }
		openSummary(summary)
		pauseMomentumTimer();
		modalhide();
	})
})

overlay1.addEventListener('click', () => {
	const summarys = document.querySelectorAll('.summary.active')
	summarys.forEach(summary => {
		closeSummary(summary)
		resumeMomentumTimer();
		modalshow();
	})
})

closeSummaryButtons.forEach(button => {
	button.addEventListener('click', () => {
		const summary = button.closest('.summary')
		closeSummary(summary)
		resumeMomentumTimer();
		modalshow();
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

const openaddmodalButtons = document.querySelectorAll('[data-addmodal-target]')
const closeaddmodalButtons = document.querySelectorAll('[data-close3-button]')
const overlay3 = document.getElementById('overlay3')


openaddmodalButtons.forEach(button => {
	button.addEventListener('click', () => {
		const addmodal = document.querySelector(button.dataset.addmodalTarget)
		openaddmodal(addmodal)
		pauseMomentumTimer();
		modalhide();
	})
})

// overlay3.addEventListener('click', () => {
	// const addmodals = document.querySelectorAll('.addmodal.active')
	// addmodals.forEach(addmodal => {
		// closeaddmodal(addmodal)
		// modalshow();
	// })
// })

closeaddmodalButtons.forEach(button => {
	button.addEventListener('click', () => {
		const addmodal = button.closest('.addmodal')
		closeaddmodal(addmodal)
		resumeMomentumTimer();
		modalshow();
	})
})

function openaddmodal(addmodal) {
	if (addmodal == null) return
	addmodal.classList.add('active')
	overlay3.classList.add('active')
}

function closeaddmodal(addmodal) {
	if (addmodal == null) return
	addmodal.classList.remove('active')
	overlay3.classList.remove('active')
}

const opentimemodalButtons = document.querySelectorAll('[data-timemodal-target]')
const closetimemodalButtons = document.querySelectorAll('[data-close3-button]')
const overlay5 = document.getElementById('overlay5')


opentimemodalButtons.forEach(button => {
	button.addEventListener('click', () => {
		const timemodal = document.querySelector(button.dataset.timemodalTarget)
		opentimemodal(timemodal)
		pauseMomentumTimer();
		modalhide();
	})
})

// overlay5.addEventListener('click', () => {
	// const timemodals = document.querySelectorAll('.timemodal.active')
	// timemodals.forEach(timemodal => {
		// closetimemodal(timemodal)
		// modalshow();
	// })
// })

closetimemodalButtons.forEach(button => {
	button.addEventListener('click', () => {
		const timemodal = button.closest('.timemodal')
		closetimemodal(timemodal)
		resumeMomentumTimer();
		modalshow();
	})
})

function opentimemodal(timemodal) {
	if (timemodal == null) return
	timemodal.classList.add('active')
	overlay5.classList.add('active')
}

function closetimemodal(timemodal) {
	if (timemodal == null) return
	timemodal.classList.remove('active')
	overlay5.classList.remove('active')
}

const openpastmodalButtons = document.querySelectorAll('[data-pastmodal-target]')
const closepastmodalButtons = document.querySelectorAll('[data-close4-button]')
const overlay4 = document.getElementById('overlay4')


openpastmodalButtons.forEach(button => {
	button.addEventListener('click', () => {
		const pastmodal = document.querySelector(button.dataset.pastmodalTarget)
		openpastmodal(pastmodal)
		closeSummary(summary)
		modalhide();
	})
})

overlay4.addEventListener('click', () => {
	const pastmodals = document.querySelectorAll('.pastmodal.active')
	pastmodals.forEach(pastmodal => {
		closepastmodal(pastmodal)
		modalshow();		
	})
})

closepastmodalButtons.forEach(button => {
	button.addEventListener('click', () => {
		const pastmodal = button.closest('.pastmodal')
		closepastmodal(pastmodal)
		modalshow();				
	})
})

function openpastmodal(pastmodal) {
	if (pastmodal == null) return
	pastmodal.classList.add('active')
	overlay4.classList.add('active')
}

function closepastmodal(pastmodal) {
	if (pastmodal == null) return
	pastmodal.classList.remove('active')
	overlay4.classList.remove('active')
}

function playArchive(){
		const div = document.getElementById("archiveboard");
		div.innerHTML = ""; // Clears all child elements	
        for  (let q = days-1; q >= 1; q--)  {
            // <span id="0-0" class="tile">P</span>
            let archivetile = document.createElement("span");
            archivetile.id = q.toString();
			archivetile.classList.add("archivetile");
			archivetile.innerText = "Day "+q;
			if ((localStorage.getItem('archovercl' + q) == "1")){
				if ((localStorage.getItem('archstatcl' + q) == "1")){
					archivetile.classList.add("correct");
				}
				else{
					archivetile.classList.add("failed");
				}
			}
			const link = document.createElement("a");
			link.href = `archive.html?q=${q}`;
			link.target = "_blank";   // ← opens in a new tab/window
			link.appendChild(archivetile);
			document.getElementById("archiveboard").appendChild(link);			
        }			
}

function modalhide(){
		document.getElementById("boardfirst").style.visibility = "hidden";
		document.getElementById("boardsecond").style.visibility = "hidden";
		document.getElementById("boardthird").style.visibility = "hidden";
		document.getElementById("boardforth").style.visibility = "hidden";
		document.getElementById("boardfifth").style.visibility = "hidden";
		document.getElementById("boardsixth").style.visibility = "hidden";
		document.getElementById("boardlast").style.visibility = "hidden";
		if(localStorage.clhardmode == 1){
			document.getElementById("momentum-bar-container").style.display = "none";
		}
		const rows = document.getElementsByClassName("keyboard-row");
		for (let row of rows) {
		row.style.visibility = "hidden";
		}	
		document.getElementById("toggle-row").style.visibility = "hidden";
}


function modalshow(){
		document.getElementById("boardfirst").style.visibility = "visible";
		document.getElementById("boardsecond").style.visibility = "visible";
		document.getElementById("boardthird").style.visibility = "visible";
		document.getElementById("boardforth").style.visibility = "visible";
		document.getElementById("boardfifth").style.visibility = "visible";
		document.getElementById("boardsixth").style.visibility = "visible";
		document.getElementById("boardlast").style.visibility = "visible";
		if(localStorage.clhardmode == 1){
			if (localStorage.getItem('gameovercl' + days) == "1"){
			document.getElementById("momentum-counter").innerText = "60";
			}
			document.getElementById("momentum-bar-container").style.display = "block";
		}
		const rows = document.getElementsByClassName("keyboard-row");
		for (let row of rows) {
		row.style.visibility = "visible";
		}	
		document.getElementById("toggle-row").style.visibility = "visible";
}

function restoreMomentumTimer() {
  const savedStart = localStorage.getItem("momentumStart");
  const savedRemaining = localStorage.getItem("momentumRemaining");

  if (!savedStart || !savedRemaining) {
    startMomentumTimer();
    return;
  }

  const elapsed = Math.floor((Date.now() - savedStart) / 1000);
  const remaining = savedRemaining - elapsed;

  if (remaining > 0) {
    momentumTime = remaining;
    updateMomentumBar();
    startMomentumInterval(); // resume ticking
  } else {
    handleMomentumFailure(); // timer expired while page was closed
    startMomentumTimer();    // start a new cycle
  }
}

// if (localStorage.clhardmode == 1) {
	let momentumTime = 60; // seconds
	let momentumInterval;
	// let lives = 5;
	// let lastSolvedCount = 0;
	// localStorage.setItem("momentumStart", Date.now());
	// localStorage.setItem("momentumRemaining", momentumTime);
// }
function startMomentumTimer() {
  momentumTime = 60;
  updateMomentumBar();
  startMomentumInterval();
}


function startMomentumInterval() {
if (!gameOver){	
  clearInterval(momentumInterval);

	momentumInterval = setInterval(() => {

if (gameOver) {
    clearInterval(momentumInterval);
    return;
}
if (isPaused) return;
 // NEW: skip ticking

    momentumTime--;
    updateMomentumBar();

    localStorage.setItem("momentumStart", Date.now());
    localStorage.setItem("momentumRemaining", momentumTime);

    if (momentumTime <= 0) {
      handleMomentumFailure();
      momentumTime = 60; // reset without creating new interval
    }

}, 1000);

}
}


function updateMomentumBar() {
  // if (!gameOver) {
    const bar = document.getElementById("momentum-bar");
    const counter = document.getElementById("momentum-counter");

    const percent = (momentumTime / 60) * 100;
    bar.style.width = percent + "%";

    counter.innerText = Math.max(0, momentumTime);


    if (percent > 40) {
      bar.style.backgroundColor = "#4caf50";
    } else if (percent > 20) {
      bar.style.backgroundColor = "#ff9800";
    } else {
      bar.style.backgroundColor = "#f44336";
    // }
  }
}

function handleMomentumFailure() {
  if (localStorage.cllivescnt < 5) {
    localStorage.cllivescnt = Number(localStorage.cllivescnt) + 1;
    flashBarRed();
    updateLivesDisplay();
  }
}

function flashBarRed() {
  const bar = document.getElementById("momentum-bar");
  bar.style.backgroundColor = "#ff0000";
  setTimeout(() => updateMomentumBar(), 500);
}

function updateLivesDisplay() {
	// if (LetterFound == 0){
		// localStorage.cllivescnt = Number(localStorage.cllivescnt) + 1;
		document.getElementById("answer").style.color = "lightgray";
		if (localStorage.clMysteryActive === "true") {
			const MysteryLetter = localStorage.clMysteryLetter;
			removeQuestionFromTile(MysteryLetter);
			localStorage.clMysteryActive = "false";
		}
		switch (Number(localStorage.cllivescnt)) {
				case 0: localStorage.cllives = "🔴🔴🔴🔴🔴";
					break;
				case 1: localStorage.cllives = "🔴🔴🔴🔴";
					document.getElementById("answer").innerText = "TIME UP - FIRST LIFE LOST!"
					break;	
				case 2: localStorage.cllives = "🔴🔴🔴";
					document.getElementById("answer").innerText = "TIME UP - SECOND LIFE LOST!"
					break;				
				case 3: localStorage.cllives = "🔴🔴";
					document.getElementById("answer").innerText = "TIME UP - THIRD LIFE LOST!"				
					break;	
				case 4: localStorage.cllives = "🔴";
					document.getElementById("answer").innerText = "TIME UP - LAST LIFE ALERT!"		
					setTimeout(FinalClue, 500);			
					// Offer star-for-life trade when only 1 life remains
					if (Number(localStorage.cllivescnt) == 4 &&
						Number(localStorage.totalclstars) >= 2 &&
						localStorage.cltradeoffered != 1) {

						localStorage.cltradeoffered = 1; // prevent repeat offers
						openLifeTradeModal();
					}					
					break;	
				// case 5: localStorage.cllives = "⚠️";
				// 	document.getElementById("answer").innerText = "LAST LIFE ALERT!"
				// 	setTimeout(FinalClue, 500);	
				// 	break;
				case 5: localStorage.cllives = "❌❌❌❌❌";
					break;					
		}		
		
		document.getElementById("lives").innerText = localStorage.cllives;
		document.getElementById("lives").classList.add("blink");
		setTimeout(removeblink, 3000);	
		
		
		
	if (Number(localStorage.cllivescnt == 5)){
		for (let i = 0; i < wordonewidth; i++) {
			let currTile = document.getElementById("1" + '-' + i);
			currTile.innerText = wordone[i];
			currTile.classList.remove("poptile","correct");
			// currTile.classList.add("failed", "animated");
		}	
		for (let i = 0; i < wordtwowidth; i++) {
			let currTile = document.getElementById("2" + '-' + i);
			currTile.innerText = wordtwo[i];
			currTile.classList.remove("poptile","correct","mystery","flash2");
			currTile.classList.add("failed", "animated");
		}		
		for (let i = 0; i < wordthreewidth; i++) {
			let currTile = document.getElementById("3" + '-' + i);
			currTile.innerText = wordthree[i];
			currTile.classList.remove("poptile","correct","mystery","flash2");
			currTile.classList.add("failed", "animated");
		}		
		for (let i = 0; i < wordfourwidth; i++) {
			let currTile = document.getElementById("4" + '-' + i);
			currTile.innerText = wordfour[i];
			currTile.classList.remove("poptile","correct","mystery","flash2");
			currTile.classList.add("failed", "animated");
		}		
		for (let i = 0; i < wordfivewidth; i++) {
			let currTile = document.getElementById("5" + '-' + i);
			currTile.innerText = wordfive[i];
			currTile.classList.remove("poptile","correct","mystery","flash2");
			currTile.classList.add("failed", "animated");
		}		
		for (let i = 0; i < wordsixwidth; i++) {
			let currTile = document.getElementById("6" + '-' + i);
			currTile.innerText = wordsix[i];
			currTile.classList.remove("poptile","correct","mystery","flash2");
			currTile.classList.add("failed", "animated");
		}
		for (let i = 0; i < wordlastwidth; i++) {
			let currTile = document.getElementById("7" + '-' + i);
			currTile.innerText = wordlast[i];
			currTile.classList.remove("poptile","correct");
			// currTile.classList.add("failed", "animated");
		}		
			gameOver = true;			
			document.getElementById("toggle-row").style.display = "none";
			disableKeys("BCDFGHJKLMNPQRSTVWXYZ".split("")); // consonants
			disableKeys(["A","E","I","O","U"]); // vowels
			// if (localStorage.clhardmode == 1){
				// NEW: delete saved timer so refresh cannot restore it
				localStorage.removeItem("momentumStart");
				localStorage.removeItem("momentumRemaining");

				// NEW: freeze bar at full
				momentumTime = 60;
				updateMomentumBar();

				// NEW: stop the timer forever
				clearInterval(momentumInterval);
			// }
			localStorage.starclxcount = Number(localStorage.starclxcount) + 1;
			colorx = "green";
			localStorage.clgamecnt = 6;
			document.getElementById("answer").style.color = "red";
			document.getElementById("answer").innerText = "GAME OVER! OUT OF LIVES.";
			localStorage.setItem(('gameovercl' + days), 1);	
			localStorage.totalclplayed = Number(localStorage.totalclplayed) + 1;	
			localStorage.totalclstreak = 0;		
			SetTier();			
			var winpct = localStorage.totalclplayed > 0
						? Math.round(localStorage.totalclwins / localStorage.totalclplayed * 100)
						: 0;
			document.getElementById(11).innerText = "PLAYED: " + localStorage.totalclplayed;
			document.getElementById(12).innerText = "WIN %: " + winpct;
			document.getElementById(13).innerText = "STREAK: " + localStorage.totalclstreak + tiericon;
			document.getElementById(14).innerText = "STARS: " + localStorage.totalclstars;			
			displayFooter();
			localStorage.gameclwon = 0;
			localStorage.clgamestarted = 0;
			localStorage.clhardmode = 0;			
			setTimeout(OpenStats, 3200);				
	}	
	// }
}

function onConsonantSolved() {
  // Call this whenever a new consonant is correctly guessed
momentumTime = 60;
updateMomentumBar();

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
	// var yValues = [localStorage.starcl5count, localStorage.starcl4count, localStorage.starcl3count, localStorage.starcl2count, localStorage.starcl1count, localStorage.starcl0count, localStorage.starclxcount];
	var yValues = [localStorage.starcl5count, localStorage.starcl4count, localStorage.starcl3count, localStorage.starcl2count, localStorage.starcl1count, localStorage.starclxcount];
	//var barColors = ["red", "green","blue","orange","brown","yellow","cyan","white"];
	// var barColors = [color5, color4, color3, color2, color1, color0, colorx];
	var barColors = [color5, color4, color3, color2, color1, colorx];


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


window.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("hardmodetoggle");
  const saved = localStorage.getItem("clhardmode");

  if (saved === "1") {
    toggle.checked = true;
   // enable timed mode logic here
  } else {
    toggle.checked = false;
   // disable timed mode logic here
  }
});


function intialize() {
	if (localStorage.clgamestarted == 1){
	// if (localStorage.clhardmode ==1){	
		document.getElementById("toggle-row").style.display = "none";
	}
	document.getElementById("momentum-bar-container").style.display = "none";
	// if ((localStorage.clhardmode == 1) && (!localStorage.getItem('gameovercl' + days))){
	if (localStorage.clhardmode == 1) {			
		restoreMomentumTimer();	
		document.getElementById("momentum-bar-container").style.display = "block";
	}
	if (Number (localStorage.clcorrect) == 0){
		localStorage.clcorrect = wordonewidth + wordlastwidth;
	} 
	let ele = document.getElementById("daycount");
	ele.innerHTML += (days);
	if (submitterlist[index] != ""){
		let ele1 = document.getElementById("submitter");
		ele1.innerHTML += "Submitted By " + submitterlist[index];
		// ele1.classList.add("flash2");
	}
	
/* 	document.getElementById("pzlhdr").style.display = "none";
	document.getElementById("pzl").style.display = "none"; */
	document.getElementById("bbhdr").style.display = "none";
	document.getElementById("bb").style.display = "none";
	document.getElementById("HTMLButton").style.display = "none";
	document.getElementById("Rafflebutton").style.display = "none";
	document.getElementById("Archivebutton").style.display = "none";
	document.getElementById("submission").style.display = "none";
	// document.getElementById("toggle-row").style.visibility = "hidden";
	
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
			if (wordone.length > 9 || wordtwo.length > 9 || wordthree.length > 9 || wordfour.length > 9 || wordfive.length > 9 || wordsix.length > 9 || wordlast.length > 9){
				tile.classList.add("tilesmall");
			}
			else{
				tile.classList.add("tile");
			}
			document.getElementById("boardfirst").appendChild(tile);
			
        }
		for (let i = 0; i < wordonewidth; i++) {
			let currTile = document.getElementById("1" + '-' + i);
			currTile.innerText = wordone[i];
			currTile.classList.remove("poptile");
			currTile.classList.add("starting");
		}			

	var element = document.getElementById("boardsecond");
        //element.style.width = boardWidth;
        for (let c = 0; c < wordtwowidth; c++) {
            // <span id="0-0" class="tile">P</span>
            let tile = document.createElement("span");
            tile.id = "2" + "-" + c.toString();
            // tile.classList.add("tile");
			if (wordtwo[c] == "A" || wordtwo[c] == "E" || wordtwo[c] == "I" || wordtwo[c] == "O" || wordtwo[c] == "U"){
				if (wordone.length > 9 || wordtwo.length > 9 || wordthree.length > 9 || wordfour.length > 9 || wordfive.length > 9 || wordsix.length > 9 || wordlast.length > 9){
					tile.classList.add("voweltilesmall");
				}
				else{
					tile.classList.add("voweltile");
				}
			}
			else{
				if (wordone.length > 9 || wordtwo.length > 9 || wordthree.length > 9 || wordfour.length > 9 || wordfive.length > 9 || wordsix.length > 9 || wordlast.length > 9){
					tile.classList.add("tilesmall");
				}
				else{
					tile.classList.add("tile");
				}
			}	
					
            tile.innerText = "";
            document.getElementById("boardsecond").appendChild(tile);
        }		

	var element = document.getElementById("boardthird");
        //element.style.width = boardWidth;
        for (let c = 0; c < wordthreewidth; c++) {
            // <span id="0-0" class="tile">P</span>
            let tile = document.createElement("span");
            tile.id = "3" + "-" + c.toString();
            // tile.classList.add("tile");
			if (wordthree[c] == "A" || wordthree[c] == "E" || wordthree[c] == "I" || wordthree[c] == "O" || wordthree[c] == "U"){
				if (wordone.length > 9 || wordtwo.length > 9 || wordthree.length > 9 || wordfour.length > 9 || wordfive.length > 9 || wordsix.length > 9 || wordlast.length > 9){
					tile.classList.add("voweltilesmall");
				}
				else{
					tile.classList.add("voweltile");
				}
			}
			else{
				if (wordone.length > 9 || wordtwo.length > 9 || wordthree.length > 9 || wordfour.length > 9 || wordfive.length > 9 || wordsix.length > 9 || wordlast.length > 9){
					tile.classList.add("tilesmall");
				}
				else{
					tile.classList.add("tile");
				}
			}				
            tile.innerText = "";
            document.getElementById("boardthird").appendChild(tile);
        }	
		
	var element = document.getElementById("boardforth");
        //element.style.width = boardWidth;
        for (let c = 0; c < wordfourwidth; c++) {
            // <span id="0-0" class="tile">P</span>
            let tile = document.createElement("span");
            tile.id = "4" + "-" + c.toString();
            // tile.classList.add("tile");
			if (wordfour[c] == "A" || wordfour[c] == "E" || wordfour[c] == "I" || wordfour[c] == "O" || wordfour[c] == "U"){
				if (wordone.length > 9 || wordtwo.length > 9 || wordthree.length > 9 || wordfour.length > 9 || wordfive.length > 9 || wordsix.length > 9 || wordlast.length > 9){
					tile.classList.add("voweltilesmall");
				}
				else{
					tile.classList.add("voweltile");
				}
			}
			else{
				if (wordone.length > 9 || wordtwo.length > 9 || wordthree.length > 9 || wordfour.length > 9 || wordfive.length > 9 || wordsix.length > 9 || wordlast.length > 9){
					tile.classList.add("tilesmall");
				}
				else{
					tile.classList.add("tile");
				}
			}					
            tile.innerText = "";
            document.getElementById("boardforth").appendChild(tile);
        }

	var element = document.getElementById("boardfifth");
        //element.style.width = boardWidth;
        for (let c = 0; c < wordfivewidth; c++) {
            // <span id="0-0" class="tile">P</span>
            let tile = document.createElement("span");
            tile.id = "5" + "-" + c.toString();
            // tile.classList.add("tile");
			if (wordfive[c] == "A" || wordfive[c] == "E" || wordfive[c] == "I" || wordfive[c] == "O" || wordfive[c] == "U"){
				if (wordone.length > 9 || wordtwo.length > 9 || wordthree.length > 9 || wordfour.length > 9 || wordfive.length > 9 || wordsix.length > 9 || wordlast.length > 9){
					tile.classList.add("voweltilesmall");
				}
				else{
					tile.classList.add("voweltile");
				}
			}
			else{
				if (wordone.length > 9 || wordtwo.length > 9 || wordthree.length > 9 || wordfour.length > 9 || wordfive.length > 9 || wordsix.length > 9 || wordlast.length > 9){
					tile.classList.add("tilesmall");
				}
				else{
					tile.classList.add("tile");
				}
			}					
            tile.innerText = "";
            document.getElementById("boardfifth").appendChild(tile);
        }	
		
	var element = document.getElementById("boardsixth");
        //element.style.width = boardWidth;
        for (let c = 0; c < wordsixwidth; c++) {
            // <span id="0-0" class="tile">P</span>
            let tile = document.createElement("span");
            tile.id = "6" + "-" + c.toString();
            // tile.classList.add("tile");
			if (wordsix[c] == "A" || wordsix[c] == "E" || wordsix[c] == "I" || wordsix[c] == "O" || wordsix[c] == "U"){
				if (wordone.length > 9 || wordtwo.length > 9 || wordthree.length > 9 || wordfour.length > 9 || wordfive.length > 9 || wordsix.length > 9 || wordlast.length > 9){
					tile.classList.add("voweltilesmall");
				}
				else{
					tile.classList.add("voweltile");
				}
			}
			else{
				if (wordone.length > 9 || wordtwo.length > 9 || wordthree.length > 9 || wordfour.length > 9 || wordfive.length > 9 || wordsix.length > 9 || wordlast.length > 9){
					tile.classList.add("tilesmall");
				}
				else{
					tile.classList.add("tile");
				}
			}				
            tile.innerText = "";
            document.getElementById("boardsixth").appendChild(tile);
        }		
		
	var element = document.getElementById("boardlast");
        //element.style.width = boardWidth;
        for (let c = 0; c < wordlastwidth; c++) {
            // <span id="0-0" class="tile">P</span>
            let tile = document.createElement("span");
            tile.id = "7" + "-" + c.toString();
			if (wordone.length > 9 || wordtwo.length > 9 || wordthree.length > 9 || wordfour.length > 9 || wordfive.length > 9 || wordsix.length > 9 || wordlast.length > 9){
				tile.classList.add("tilesmall");
			}
			else{
				tile.classList.add("tile");
			}
            tile.innerText = "";
            document.getElementById("boardlast").appendChild(tile);
        }		

		for (let i = 0; i < wordlastwidth; i++) {
			let currTile = document.getElementById("7" + '-' + i);
			currTile.innerText = wordlast[i];
			currTile.classList.remove("poptile");
			currTile.classList.add("starting");
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
	if (localStorage.vowelactive == 0){
	document.getElementById("KeyA").classList.add("disabled", "key-tile-disabled");
	document.getElementById("KeyE").classList.add("disabled", "key-tile-disabled");
	document.getElementById("KeyI").classList.add("disabled", "key-tile-disabled");
	document.getElementById("KeyO").classList.add("disabled", "key-tile-disabled");
	document.getElementById("KeyU").classList.add("disabled", "key-tile-disabled");
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
			var winpct = localStorage.totalclplayed > 0
						? Math.round(localStorage.totalclwins / localStorage.totalclplayed * 100)
						: 0;
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
				// currTile.classList.add("animated","correct");
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
				// currTile.classList.add("animated","correct");
			}		
				document.getElementById("answer").style.color = "lightgray";
				// if (Number(localStorage.clstarscnt) == 0){
					// document.getElementById("answer").innerText = "STREAK INTACT. THOUGH, NO STARS WON!";
				// }
				
				const baseStars = 5 - Number(localStorage.cllivescnt);
				const bonusApplied = (Number(localStorage.clstarscnt) > baseStars); // true only if timed-mode bonus increased stars
				
				
				if (Number(localStorage.clstarscnt) > 0){
					let msg = "";

					if (localStorage.clstarscnt === 1) {
						msg = "GREAT GOING! YOU WON 1 STAR TODAY.";
					} else {
						msg = "GREAT GOING! YOU WON " + localStorage.clstarscnt + " STARS TODAY.";
					}

					if (bonusApplied) {
						msg += " (INCLUDING +1 TIMED MODE BONUS!)";
					}

					document.getElementById("answer").innerText = msg;
				
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
						// document.getElementById("lives").classList.add("animated");
					}				
				}
		}
		else {
			colorx = "green";
			for (let i = 0; i < wordonewidth; i++) {
				let currTile = document.getElementById("1" + '-' + i);
				currTile.innerText = wordone[i];
				currTile.classList.remove("poptile","correct");
				// currTile.classList.add("failed", "animated");
			}	
			for (let i = 0; i < wordtwowidth; i++) {
				let currTile = document.getElementById("2" + '-' + i);
				currTile.innerText = wordtwo[i];
				currTile.classList.remove("poptile","correct","mystery","flash2");
				currTile.classList.add("failed", "animated");
			}				
			for (let i = 0; i < wordthreewidth; i++) {
				let currTile = document.getElementById("3" + '-' + i);
				currTile.innerText = wordthree[i];
				currTile.classList.remove("poptile","correct","mystery","flash2");
				currTile.classList.add("failed", "animated");
			}				
			for (let i = 0; i < wordfourwidth; i++) {
				let currTile = document.getElementById("4" + '-' + i);
				currTile.innerText = wordfour[i];
				currTile.classList.remove("poptile","correct","mystery","flash2");
				currTile.classList.add("failed", "animated");
			}				
			for (let i = 0; i < wordfivewidth; i++) {
				let currTile = document.getElementById("5" + '-' + i);
				currTile.innerText = wordfive[i];
				currTile.classList.remove("poptile","correct","mystery","flash2");
				currTile.classList.add("failed", "animated");
			}				
			for (let i = 0; i < wordsixwidth; i++) {
				let currTile = document.getElementById("6" + '-' + i);
				currTile.innerText = wordsix[i];
				currTile.classList.remove("poptile","correct","mystery","flash2");
				currTile.classList.add("failed", "animated");
			}				
			for (let i = 0; i < wordlastwidth; i++) {
				let currTile = document.getElementById("7" + '-' + i);
				currTile.innerText = wordlast[i];
				currTile.classList.remove("poptile","correct");
				// currTile.classList.add("failed", "animated");
			}		
				document.getElementById("answer").style.color = "red";
				document.getElementById("answer").innerText = "GAME OVER! OUT OF LIVES.";
		}
		gameOver = true;
		document.getElementById("toggle-row").style.display = "none";
		document.getElementById("KeyA").classList.add("key-tile-disabled");
		document.getElementById("KeyE").classList.add("key-tile-disabled");
		document.getElementById("KeyI").classList.add("key-tile-disabled");
		document.getElementById("KeyO").classList.add("key-tile-disabled");
		document.getElementById("KeyU").classList.add("key-tile-disabled");		
		disableKeys(["A","E","I","O","U"]); // vowels
		disableKeys("BCDFGHJKLMNPQRSTVWXYZ".split("")); // consonants
		// if (localStorage.clhardmode == 1){
			// NEW: delete saved timer so refresh cannot restore it
			localStorage.removeItem("momentumStart");
			localStorage.removeItem("momentumRemaining");

			// NEW: freeze bar at full
			momentumTime = 60;
			updateMomentumBar();

			// NEW: stop the timer forever
			clearInterval(momentumInterval);
		// }
		setTimeout(OpenStats, 1100);
		displayFooter();		
		localStorage.clgamestarted = 0;
		localStorage.clhardmode = 0;		
	}
	// Default Path
	else {	
			if (localStorage.clgamestarted == 1){
				document.getElementById("toggle-row").style.display = "none";
			}
			if(localStorage.vowelactive == 1){
			disableKeys("BCDFGHJKLMNPQRSTVWXYZ".split("")); // consonants
			document.getElementById("KeyA").classList.add( "key-tile-enabled");
			document.getElementById("KeyE").classList.add( "key-tile-enabled");
			document.getElementById("KeyI").classList.add( "key-tile-enabled");
			document.getElementById("KeyO").classList.add( "key-tile-enabled");
			document.getElementById("KeyU").classList.add( "key-tile-enabled");				
			}
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
					if (currTile.innerText !== "❓"){
					currTile.classList.add("correct");
					}
					else{
					currTile.classList.add("mystery");	
					}
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
					if (currTile.innerText !== "❓"){
					currTile.classList.add("correct");
					}
					else{
					currTile.classList.add("mystery");	
					}					
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
					if (currTile.innerText !== "❓"){
					currTile.classList.add("correct");
					}
					else{
					currTile.classList.add("mystery");	
					}					
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
					if (currTile.innerText !== "❓"){
					currTile.classList.add("correct");
					}
					else{
					currTile.classList.add("mystery");	
					}					
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
					if (currTile.innerText !== "❓"){
					currTile.classList.add("correct");
					}
					else{
					currTile.classList.add("mystery");	
					}					
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
	localStorage.clgamestarted = 1;
	document.getElementById("toggle-row").style.display = "none";
	localStorage.clguesscnt = Number(localStorage.clguesscnt) + 1;
	document.getElementById("lives").classList.remove("blink");	
	document.getElementById("answer").innerText = "";	
	var LetterFound = 0;
    if ("KeyA" <= e.code && e.code <= "KeyZ") {
		if (Number(localStorage.clguesscnt) === 7) {
			if (localStorage.clMysteryActive === "true") {
				const MysteryLetter = localStorage.clMysteryLetter;
				removeQuestionFromTile(MysteryLetter);
				if (e.code[3] === MysteryLetter) {
					// Player hit the Mystery tile
					// const lives = 5 - Number(localStorage.cllivescnt);
					// if (lives < 5) {
						// localStorage.cllivescnt = Number(localStorage.cllivescnt) - 1;
						// showLifeRestored();
						// document.getElementById("answer").innerText = "PERFECT GUESS! \n YOU GAINED +1 LIFE!";
					// } else {
						let dyn = Number(localStorage.cldynamite || 0);
						if (localStorage.clhardmode == 1){
								localStorage.cldynamite = dyn + 2;
								document.getElementById("answer").innerText = "PERFECT GUESS! \n YOU GAINED +2 DYNAMITES!";
						}
						else{
								localStorage.cldynamite = dyn + 1;
								document.getElementById("answer").innerText = "PERFECT GUESS! \n YOU GAINED +1 DYNAMITE!";							
						}
						updateDynamiteUI();
						showDynamiteAdded();
						// showStreakPopup("❓ Perfect Guess! You gained +1 Dynamite!");
					// }
				}

				// Either way, heart is consumed
				localStorage.clMysteryActive = "false";
				// removeQuestionFromTile(MysteryLetter);
			}
		}		
		// for (let i = 0; i < wordonewidth; i++){
		// 	let currTile = document.getElementById("1" + '-' + i);
		// 	if (e.code[3] == wordone[i]){
		// 		if (currTile.innerText == ""){
		// 			currTile.innerText = e.code[3];
		// 			currTile.classList.add("correct","poptile");
		// 			localStorage.clcorrect = Number(localStorage.clcorrect) + 1;	
		// 			localStorage.consocount = Number(localStorage.consocount) + 1;			
		// 		}
		// 		// LetterFound = 0;
		// 	}	
		// }
		for (let i = 0; i < wordtwowidth; i++){
			let currTile = document.getElementById("2" + '-' + i);
			// if (localStorage.clhardmode == 1){
				// onConsonantSolved();
			// }
			if (e.code[3] == wordtwo[i]){
				if (localStorage.clhardmode == 1){
					onConsonantSolved();
				}
				if (currTile.innerText == ""){
					currTile.innerText = e.code[3];
					currTile.classList.add("correct","poptile");
					if (localStorage.cldisabledkey.includes(e.code[3])){
						// do nothing
					}
					else{
						localStorage.consocount = Number(localStorage.consocount) + 1;			
						localStorage.clcorrect = Number(localStorage.clcorrect) + 1;
					}			
				}
				LetterFound = 1;
			}	
		}	
		for (let i = 0; i < wordthreewidth; i++){
			let currTile = document.getElementById("3" + '-' + i);
			// if (localStorage.clhardmode == 1){
				// onConsonantSolved();
			// }				
			if (e.code[3] == wordthree[i]){
				if (localStorage.clhardmode == 1){
					onConsonantSolved();
				}				
				if (currTile.innerText == ""){
					currTile.innerText = e.code[3];
					currTile.classList.add("correct","poptile");
					if (localStorage.cldisabledkey.includes(e.code[3])){
						// do nothing
					}
					else{
						localStorage.consocount = Number(localStorage.consocount) + 1;			
						localStorage.clcorrect = Number(localStorage.clcorrect) + 1;
					}		
				}
				LetterFound = 1;
			}	
		}			
		for (let i = 0; i < wordfourwidth; i++){
			let currTile = document.getElementById("4" + '-' + i);
			// if (localStorage.clhardmode == 1){
				// onConsonantSolved();
			// }			
			if (e.code[3] == wordfour[i]){
				if (localStorage.clhardmode == 1){
					onConsonantSolved();
				}				
				if (currTile.innerText == ""){
					currTile.innerText = e.code[3];
					currTile.classList.add("correct","poptile");
					if (localStorage.cldisabledkey.includes(e.code[3])){
						// do nothing
					}
					else{
						localStorage.consocount = Number(localStorage.consocount) + 1;			
						localStorage.clcorrect = Number(localStorage.clcorrect) + 1;
					}		
				}
				LetterFound = 1;
			}	
		}		
		for (let i = 0; i < wordfivewidth; i++){
			let currTile = document.getElementById("5" + '-' + i);
			// if (localStorage.clhardmode == 1){
				// onConsonantSolved();
			// }		
			if (e.code[3] == wordfive[i]){
				if (localStorage.clhardmode == 1){
					onConsonantSolved();
				}				
				if (currTile.innerText == ""){
					currTile.innerText = e.code[3];
					currTile.classList.add("correct","poptile");
					if (localStorage.cldisabledkey.includes(e.code[3])){
						// do nothing
					}
					else{
						localStorage.consocount = Number(localStorage.consocount) + 1;			
						localStorage.clcorrect = Number(localStorage.clcorrect) + 1;
					}		
				}
				LetterFound = 1;
			}	
		}		
		for (let i = 0; i < wordsixwidth; i++){
			let currTile = document.getElementById("6" + '-' + i);
			// if (localStorage.clhardmode == 1){
				// onConsonantSolved();
			// }			
			if (e.code[3] == wordsix[i]){
				if (localStorage.clhardmode == 1){
					onConsonantSolved();
				}				
				if (currTile.innerText == ""){
					currTile.innerText = e.code[3];
					currTile.classList.add("correct","poptile");
					if (localStorage.cldisabledkey.includes(e.code[3])){
						// do nothing
					}
					else{
						localStorage.consocount = Number(localStorage.consocount) + 1;			
						localStorage.clcorrect = Number(localStorage.clcorrect) + 1;
					}			
				}
				LetterFound = 1;
			}	
		}		
		// for (let i = 0; i < wordlastwidth; i++){
		// 	let currTile = document.getElementById("7" + '-' + i);
		// 	if (e.code[3] == wordlast[i]){
		// 		if (currTile.innerText == ""){
		// 			currTile.innerText = e.code[3];
		// 			currTile.classList.add("correct","poptile");
		// 			localStorage.clcorrect = Number(localStorage.clcorrect) + 1;
		// 			localStorage.consocount = Number(localStorage.consocount) + 1;
		// 		}
		// 		// LetterFound = 0;				
		// 	}
		// }	
		if (localStorage.consocount > 5 && localStorage.clshowalert == 0 && localStorage.totalclplayed > 0){
			OpenADDModal();
			localStorage.clshowalert = 1;
		}
		
		if (localStorage.consocount > 5 && localStorage.clshowalert == 4 && localStorage.totalclplayed > 0){
			OpenTIMEModal();
			localStorage.clshowalert = 5;
		}		
	if ((Number(localStorage.consocount) == solveword.length - Number(localStorage.vowelcount)) && localStorage.vowelactive == 0){
		document.getElementById("KeyA").classList.remove("disabled", "key-tile-disabled");
		document.getElementById("KeyE").classList.remove("disabled", "key-tile-disabled");
		document.getElementById("KeyI").classList.remove("disabled", "key-tile-disabled");
		document.getElementById("KeyO").classList.remove("disabled", "key-tile-disabled");
		document.getElementById("KeyU").classList.remove("disabled", "key-tile-disabled");
		document.getElementById("KeyA").classList.add( "key-tile-enabled","poptile");
		document.getElementById("KeyE").classList.add( "key-tile-enabled","poptile");
		document.getElementById("KeyI").classList.add( "key-tile-enabled","poptile");
		document.getElementById("KeyO").classList.add( "key-tile-enabled","poptile");
		document.getElementById("KeyU").classList.add( "key-tile-enabled","poptile");	
		disableKeys("BCDFGHJKLMNPQRSTVWXYZ".split("")); // consonants
		document.getElementById("answer").style.color = "lightgray";
		document.getElementById("answer").innerText = "ONLY VOWELS LEFT!"	
		localStorage.vowelactive = 1;	
		setTimeout(FinalClue, 0);	
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
		document.getElementById("answer").style.color = "lightgray";
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
					
					// Offer star-for-life trade when only 1 life remains
					if (Number(localStorage.cllivescnt) == 4 &&
						Number(localStorage.totalclstars) >= 2 &&
						localStorage.cltradeoffered != 1) {

						localStorage.cltradeoffered = 1; // prevent repeat offers
						openLifeTradeModal();
					}
					break;	
				// case 5: localStorage.cllives = "⚠️";
				// 	document.getElementById("answer").innerText = "LAST LIFE ALERT!"
				// 	setTimeout(FinalClue, 500);	
				// 	break;
				case 5: localStorage.cllives = "❌❌❌❌❌";
					break;					
		}		
		
		document.getElementById("lives").innerText = localStorage.cllives;
		document.getElementById("lives").classList.add("blink");
		setTimeout(removeblink, 3000);	
	}
	
		if (Number(localStorage.clguesscnt) === 6) {
			const availableLetters = getUnrevealedConsonants(); 
			const mysteryLetter = availableLetters[Math.floor(Math.random() * availableLetters.length)];

			localStorage.clMysteryLetter = mysteryLetter;
			if (!mysteryLetter || mysteryLetter === "undefined"){
				//do nothing
			}
			else{
				localStorage.clMysteryActive = "true";
				markTileWithQuestion(localStorage.clMysteryLetter); // visually add ❓
				showMysteryAdded();
				document.getElementById("answer").innerText = "IDENTIFY THE MYSTERY LETTER IN THE NEXT TRY FOR A BONUS!"				
			}
		}	
	
	if (Number(localStorage.cllivescnt == 5)){
		for (let i = 0; i < wordonewidth; i++) {
			let currTile = document.getElementById("1" + '-' + i);
			currTile.innerText = wordone[i];
			currTile.classList.remove("poptile","correct");
			// currTile.classList.add("failed", "animated");
		}	
		for (let i = 0; i < wordtwowidth; i++) {
			let currTile = document.getElementById("2" + '-' + i);
			currTile.innerText = wordtwo[i];
			currTile.classList.remove("poptile","correct","mystery","flash2");
			currTile.classList.add("failed", "animated");
		}		
		for (let i = 0; i < wordthreewidth; i++) {
			let currTile = document.getElementById("3" + '-' + i);
			currTile.innerText = wordthree[i];
			currTile.classList.remove("poptile","correct","mystery","flash2");
			currTile.classList.add("failed", "animated");
		}		
		for (let i = 0; i < wordfourwidth; i++) {
			let currTile = document.getElementById("4" + '-' + i);
			currTile.innerText = wordfour[i];
			currTile.classList.remove("poptile","correct","mystery","flash2");
			currTile.classList.add("failed", "animated");
		}		
		for (let i = 0; i < wordfivewidth; i++) {
			let currTile = document.getElementById("5" + '-' + i);
			currTile.innerText = wordfive[i];
			currTile.classList.remove("poptile","correct","mystery","flash2");
			currTile.classList.add("failed", "animated");
		}		
		for (let i = 0; i < wordsixwidth; i++) {
			let currTile = document.getElementById("6" + '-' + i);
			currTile.innerText = wordsix[i];
			currTile.classList.remove("poptile","correct","mystery","flash2");
			currTile.classList.add("failed", "animated");
		}
		for (let i = 0; i < wordlastwidth; i++) {
			let currTile = document.getElementById("7" + '-' + i);
			currTile.innerText = wordlast[i];
			currTile.classList.remove("poptile","correct");
			// currTile.classList.add("failed", "animated");
		}		
			gameOver = true;
			document.getElementById("toggle-row").style.display = "none";
			disableKeys(["A","E","I","O","U"]); // vowels
			disableKeys("BCDFGHJKLMNPQRSTVWXYZ".split("")); // consonants
			// if (localStorage.clhardmode == 1){
				// NEW: delete saved timer so refresh cannot restore it
				localStorage.removeItem("momentumStart");
				localStorage.removeItem("momentumRemaining");

				// NEW: freeze bar at full
				momentumTime = 60;
				updateMomentumBar();

				// NEW: stop the timer forever
				clearInterval(momentumInterval);
			// }

			localStorage.starclxcount = Number(localStorage.starclxcount) + 1;
			colorx = "green";
			localStorage.clgamecnt = 6;
			document.getElementById("answer").style.color = "red";
			document.getElementById("answer").innerText = "GAME OVER! OUT OF LIVES.";
			localStorage.setItem(('gameovercl' + days), 1);	
			localStorage.totalclplayed = Number(localStorage.totalclplayed) + 1;	
			localStorage.totalclstreak = 0;		
			SetTier();			
			var winpct = localStorage.totalclplayed > 0
						? Math.round(localStorage.totalclwins / localStorage.totalclplayed * 100)
						: 0;
			document.getElementById(11).innerText = "PLAYED: " + localStorage.totalclplayed;
			document.getElementById(12).innerText = "WIN %: " + winpct;
			document.getElementById(13).innerText = "STREAK: " + localStorage.totalclstreak + tiericon;
			document.getElementById(14).innerText = "STARS: " + localStorage.totalclstars;			
			displayFooter();
			localStorage.gameclwon = 0;
			localStorage.clgamestarted = 0;
			localStorage.clhardmode = 0;
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
			currTile.classList.add("animated");
		}	
		for (let i = 0; i < wordthreewidth; i++) {
			let currTile = document.getElementById("3" + '-' + i);
			currTile.innerText = wordthree[i];
			currTile.classList.remove("poptile");
			currTile.classList.add("animated");
		}	
		for (let i = 0; i < wordfourwidth; i++) {
			let currTile = document.getElementById("4" + '-' + i);
			currTile.innerText = wordfour[i];
			currTile.classList.remove("poptile");
			currTile.classList.add("animated");
		}			
		for (let i = 0; i < wordfivewidth; i++) {
			let currTile = document.getElementById("5" + '-' + i);
			currTile.innerText = wordfive[i];
			currTile.classList.remove("poptile");
			currTile.classList.add("animated");
		}			
		for (let i = 0; i < wordsixwidth; i++) {
			let currTile = document.getElementById("6" + '-' + i);
			currTile.innerText = wordsix[i];
			currTile.classList.remove("poptile");
			currTile.classList.add("animated");
		}			
		for (let i = 0; i < wordlastwidth; i++) {
			let currTile = document.getElementById("7" + '-' + i);
			currTile.innerText = wordlast[i];
			currTile.classList.remove("poptile");
			// currTile.classList.add("animated");
		}		
			gameOver = true;
			document.getElementById("toggle-row").style.display = "none";
			disableKeys(["A","E","I","O","U"]); // vowels
			// if (localStorage.clhardmode == 1){
				// NEW: delete saved timer so refresh cannot restore it
				localStorage.removeItem("momentumStart");
				localStorage.removeItem("momentumRemaining");

				// NEW: freeze bar at full
				momentumTime = 60;
				updateMomentumBar();

				// NEW: stop the timer forever
				clearInterval(momentumInterval);
			// }
			    // PERFECT SOLVE CHECK
				if ((Number(localStorage.cllivescnt) === 0) && (localStorage.getItem("cldynamiteUsedThisRound") === "false")) {
					showPerfectSolve();
					// Award dynamite
					let dyn = Number(localStorage.cldynamite || 0);
					if (localStorage.clhardmode == 1){
					   localStorage.cldynamite = dyn + 2;	
					}
					else{
						localStorage.cldynamite = dyn + 1;
					}
					updateDynamiteUI();
					
				}

			localStorage.clstarscnt = 5 - Number(localStorage.cllivescnt);
			// Bonus star for timed mode win
			// Only apply bonus if hard mode is active and dynamite is not used
			if ((Number(localStorage.clhardmode) === 1) && (localStorage.getItem("cldynamiteUsedThisRound") === "false")) {
				// Save the original star count
				const beforeBonus = Number(localStorage.clstarscnt);

				// Apply bonus with cap
				const afterBonus = Math.min(5, beforeBonus + 1);

				localStorage.clstarscnt = afterBonus;

				// Only show animation if the bonus actually increased stars
				if (afterBonus > beforeBonus) {
					showTimedBonus();
				}
			}

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
			document.getElementById("answer").style.color = "lightgray";
			// if (Number(localStorage.clstarscnt) == 0){
				// document.getElementById("answer").innerText = "STREAK INTACT. THOUGH, NO STARS WON!";
			// }
			// else if (Number(localStorage.clstarscnt) > 0){
					// if (localStorage.clstarscnt == 1){
						// document.getElementById("answer").innerText = "GREAT GOING! YOU WON " + localStorage.clstarscnt +" STAR TODAY.";
					// }
					// else {
						// document.getElementById("answer").innerText = "GREAT GOING! YOU WON " + localStorage.clstarscnt +" STARS TODAY.";
					// }
			// }
			const baseStars = 5 - Number(localStorage.cllivescnt);
			const bonusApplied = (Number(localStorage.clstarscnt) > baseStars); // true only if timed-mode bonus increased stars

			let msg = "";

			if (localStorage.clstarscnt === 1) {
				msg = "GREAT GOING! YOU WON 1 STAR TODAY.";
			} else {
				msg = "GREAT GOING! YOU WON " + localStorage.clstarscnt + " STARS TODAY.";
			}

			if (bonusApplied) {
				msg += " (INCLUDING +1 TIMED MODE BONUS!)";
				localStorage.cllives = "🔴".repeat(localStorage.clstarscnt);
				document.getElementById("lives").innerText = localStorage.cllives;				
				
				
			}

			document.getElementById("answer").innerText = msg;
						
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
			let streak = Number(localStorage.totalclstreak || 0);
			if (streak > 0 && streak % 10 === 0) {
				let dyn = Number(localStorage.cldynamite || 0);
				localStorage.cldynamite = dyn + 3;			
				setTimeout(function() {
					showStreakPopup("🔥 10‑DAY STREAK! YOU EARNED +3 DYNAMITES!");
				}, 5000);
			}
			if (streak === 10){
				setTimeout(function() {
					showStreakPopup("BRONZE BADGE (10+ STREAK) ALERT - 🥉");
				}, 5000);					
			}
			if (streak === 25){
				setTimeout(function() {
					showStreakPopup("SILVER BADGE (25+ STREAK) ALERT - 🥈");
				}, 5000);					
			}		
			if (streak === 50){
				setTimeout(function() {
					showStreakPopup("GOLD BADGE (50+ STREAK) ALERT - 🥇");
				}, 5000);					
			}	
			if (streak === 100){
				setTimeout(function() {
					showStreakPopup("ULTIMATE BADGE (100+ STREAK) ALERT - 🏆");
				}, 5000);					
			}				
			updateDynamiteUI();
			localStorage.totalclstars = Number(localStorage.totalclstars) + Number(localStorage.clstarscnt);
			SetTier();
			var winpct = localStorage.totalclplayed > 0
						? Math.round(localStorage.totalclwins / localStorage.totalclplayed * 100)
						: 0;
			document.getElementById(11).innerText = "PLAYED: " + localStorage.totalclplayed;
			document.getElementById(12).innerText = "WIN %: " + winpct;
			document.getElementById(13).innerText = "STREAK: " + localStorage.totalclstreak + tiericon;
			document.getElementById(14).innerText = "STARS: " + localStorage.totalclstars;			
			displayFooter();
			localStorage.gameclwon = 1;
			localStorage.clgamestarted = 0;
			localStorage.clhardmode = 0;
			setTimeout(ConfettiStart, 1000);
			if(localStorage.clshowalert > 1 && localStorage.clshowalert < 4){
				setTimeout(OpenStats, 6800);
				setTimeout(OpenHINTModal, 4800);
				localStorage.clshowalert = Number(localStorage.clshowalert)+1;
			}
			else{
				setTimeout(OpenStats, 4800)
				if (localStorage.clshowalert == 1){
				localStorage.clshowalert = Number(localStorage.clshowalert)+1;	
				}
			}
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