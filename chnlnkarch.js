var gameOver = false;

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


/* window.localStorage;
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
setTimeout(OpenRules, 1100);
} */

//Baseline Date
var a = new Date(); // Current date now.
var b = new Date(2025, 12, 9, 0, 0, 0, 0); // Start of TENIZ.
var d = (a - b); // Difference in milliseconds.
var maxdays = parseInt((d / 1000) / 86400);
/* if (localStorage.getItem('gameovercl' + days) != 0 && localStorage.getItem('gameovercl' + days) != 1) {
	localStorage['gameovercl' + days] = 0;
	localStorage.setItem("cllives","🔴🔴🔴🔴🔴");
	localStorage.setItem("clcorrect"," ");
	localStorage.setItem("vowelcount",0);
    localStorage.setItem("consocount",0);
	localStorage.setItem("vowelactive",0);
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
 */
 


const params = new URLSearchParams(window.location.search);
var days = params.get("q"); 
if (days >= maxdays){
	days = maxdays - 1;
}


function disablevowels(){
	document.getElementById("KeyA").classList.add("disabled");	
	document.getElementById("KeyE").classList.add("disabled");	
	document.getElementById("KeyI").classList.add("disabled");	
	document.getElementById("KeyO").classList.add("disabled");	
	document.getElementById("KeyU").classList.add("disabled");	
}


function disableconsos(){
	document.getElementById("KeyB").classList.add("disabled");
	document.getElementById("KeyC").classList.add("disabled");
	document.getElementById("KeyD").classList.add("disabled");
	document.getElementById("KeyF").classList.add("disabled");
	document.getElementById("KeyG").classList.add("disabled");
	document.getElementById("KeyH").classList.add("disabled");
	document.getElementById("KeyJ").classList.add("disabled");
	document.getElementById("KeyK").classList.add("disabled");	
	document.getElementById("KeyL").classList.add("disabled");
	document.getElementById("KeyM").classList.add("disabled");
	document.getElementById("KeyN").classList.add("disabled");
	document.getElementById("KeyP").classList.add("disabled");
	document.getElementById("KeyQ").classList.add("disabled");
	document.getElementById("KeyR").classList.add("disabled");
	document.getElementById("KeyS").classList.add("disabled");
	document.getElementById("KeyT").classList.add("disabled");
	document.getElementById("KeyV").classList.add("disabled");
	document.getElementById("KeyW").classList.add("disabled");
	document.getElementById("KeyX").classList.add("disabled");
	document.getElementById("KeyY").classList.add("disabled");
	document.getElementById("KeyZ").classList.add("disabled");
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

//Open Rules the very first time
// function OpenRules() {
	// document.getElementById("rulesbutton").click();
// }

//Clipboard Code
// function myFunction() {
	// if (localStorage.clgamecnt == 6){
		// var cluehdr = "X/5";
	// }
	// else {
		// cluehdr = localStorage.clgamecnt + "/5";
	// }
	// switch (Number(localStorage.clgamecnt)) {
				// case 0: var clueicon = "🔴 🔴 🔴 🔴 🔴"
					// break;
				// case 1: var clueicon = "🔴 🔴 🔴 🔴 ⭐"
					// break;	
				// case 2: var clueicon = "🔴 🔴 🔴 ⭐ ⭐"
					// break;				
				// case 3: var clueicon = "🔴 🔴 ⭐ ⭐ ⭐"
					// break;	
				// case 4: var clueicon = "🔴 ⭐ ⭐ ⭐ ⭐"
					// break;	
				// case 5: var clueicon = "⭐ ⭐ ⭐ ⭐ ⭐"
					// break;
				// case 6: var clueicon = "❌❌❌❌❌"
					// break;					
			// }
		
	// if (tierlevel == ""){
		// var copyText = "🔗 CHN LNK # " + days + " 🧩 \n\n" + cluehdr + " - " + clueicon + "\n🔥 Streak: " + localStorage.totalclstreak + " | ⭐ Stars: " + localStorage.totalclstars + "\n\nhttps://sank0403.github.io/chnlnk/";
	// }
	// else {
		// var copyText = "🔗 CHN LNK # " + days + " 🧩 \n\n" + cluehdr + " - " + clueicon + "\n🔥 Streak: " + localStorage.totalclstreak + " | ⭐ Stars: " + localStorage.totalclstars + "\n" + tiericon +  " Tier: " + tierlevel + "\n\nhttps://sank0403.github.io/chnlnk/";
	// }
			
		
	/* Copy the text inside the text field */
	// navigator.clipboard.writeText(copyText);

	//Button Text
	// let HTMLButton = document.getElementById("HTMLButton");
	// HTMLButton.innerText = "COPIED"
	// setTimeout(ResetButton, 1000);
// }

// var firstwordlist =  ["river",			"garden",						"coffee",						"market",						"harbor",						"winter",						"silver",						"forest",						"party",						"black",						"cotton",						"yellow",						"ocean",						"music",						"desert",						"morning",						"traffic",						"crystal",						"thunder",						"island",						"candle",						"rocket",						"family",						"summer",						"cotton",						"marble",						"dragon",						"pepper",						"harbor",						"riverbank",						"meadow",						"lantern",						"timber",						"coral",						"velvet",						"canyon",						"orchard",						"glacier",						"prairie",						"summit",						"harborfront",						"compass",						"lantern",						"canyon",						"meadow",						"timber",						"coral",						"velvet",						"glacier",			"prairie",			"summit",			"compass",			"lantern",			"canyon",			"harbor",			"maple",			"copper",			"puzzle",			"shadow",			"signal",			"berry",			"iron",			"canyon",			"harbor",			"falcon",			"marble",			"timber",			"lantern",			"meadow",			"glacier",			"prairie",			"summit",			"compass",			"coral",			"velvet",			"harborfront",			"riverbed",			"gardenia",			"coffee",			"market",			"winter",			"silver",			"forest",			"ocean",			"music",			"desert",			"morning",			"traffic",			"crystal",			"thunder",			"island",			"candle",			"rocket",			"family",			"summer",			"cotton",			"marble",			"dragon",			"pepper",			"lantern",			"canyon",			"meadow",			"timber",			"coral",			"harbor",			"maple",			"copper",			"puzzle",			"shadow",			"signal",			"berry",			"iron",			"canyon",			"harbor",			"falcon",			"marble",			"timber",			"lantern",			"meadow",			"glacier",			"prairie",			"summit",			"compass",			"coral",			"velvet",			"harborfront",			"riverbed",			"gardenia",			"coffee",			"market",			"winter",			"silver",			"forest",			"ocean",			"music",			"desert",			"morning",			"traffic",			"crystal",			"thunder",			"island",			"candle",			"rocket",			"family",			"summer",			"cotton",			"marble",			"dragon",			"pepper",			"lantern",			"canyon",			"meadow",			"timber",			"coral",			"harbor",			"maple",			"copper",			"puzzle",			"shadow",			"signal",			"berry",			"iron",			"canyon",			"harbor",			"falcon",			"marble",			"timber",			"lantern",			"meadow",			"glacier",			"prairie",			"summit",			"compass",			"coral",			"velvet",			"harborfront",			"riverbed",			"gardenia",			"coffee",			"market",			"winter",			"silver",			"forest",			"ocean",			"music",			"desert",			"morning",			"traffic",			"crystal",			"thunder",			"island",			"candle",			"rocket",			"family",			"summer",			"cotton",			"marble",			"dragon",			"pepper",			"lantern",			"canyon",			"meadow",			"timber",			"coral",			"harbor",			"maple",			"copper",			"puzzle",			"shadow",			"signal",			"berry",			"iron",			"canyon",			"harbor",			"falcon",			"marble",			"timber",			"lantern",			"meadow",			"glacier",			"prairie",			"summit",			"compass",			"coral",			"velvet",			"harborfront",			"riverbed",			"gardenia",			"coffee",			"market",			"winter",			"silver",			"forest",			"ocean",			"music",			"desert",			"morning",			"traffic",			"crystal",			"thunder",			"island",			"candle",			"rocket",			"family",			"summer",			"cotton",			"marble",			"dragon",			"pepper",			"lantern",			"canyon",			"meadow",			"timber",			"coral"];
// var secondwordlist = ["stone",						"path",						"break",						"share",						"dock",						"storm",						"spoon",						"trail",						"animal",						"box",						"candy",						"banana",						"tide",						"sheet",						"wind",						"dew",						"light",						"clear",						"clap",						"nation",						"flame",						"fuel",						"bond",						"heat",						"thread",						"statue",						"scale",						"mill",						"seal",						"erosion",						"lark",						"light",						"wolf",						"reef",						"rope",						"wall",						"apple",						"melt",						"dog",						"peak",						"market",						"rose",						"glow",						"echo",						"grass",						"frame",						"sand",						"curtain",			"ice",			"fire",			"meeting",			"point",			"festival",			"rim",			"light",			"leaf",			"wire",			"piece",			"cast",			"tower",			"patch",			"forge",			"floor",			"mist",			"wing",			"floor",			"yard",			"post",			"bloom",			"runoff",			"trail",			"ridge",			"needle",			"bloom",			"touch",			"pier",			"clay",			"bloom",			"roast",			"stall",			"coat",			"lining",			"edge",			"spray",			"box",			"sand",			"star",			"jam",			"ball",			"roll",			"breeze",			"wax",			"launch",			"tree",			"camp",			"candy",			"arch",			"fire",			"spray",			"glow",			"trail",			"grassland",			"log",			"stone",			"crane",			"syrup",			"mine",			"lock",			"line",			"flare",			"smoothie",			"nail",			"ridge",			"crane",			"crest",			"quarry",			"beam",			"hook",			"stream",			"drift",			"wind",			"trailhead",			"bearing",			"cove",			"ribbon",			"cafe",			"silt",			"scent",			"bean",			"trend",			"frost",			"ore",			"canopy",			"current",			"scale",			"mirage",			"routine",			"circle",			"shard",			"burst",			"reef",			"holder",			"booster",			"album",			"breeze",			"thread",			"step",			"wing",			"grinder",			"shade",			"echo",			"larkspur",			"wolfhound",			"bloomfield",			"rope",			"grove",			"plate",			"board",			"puppet",			"jammer",			"tart",			"grip",			"bend",			"watch",			"dive",			"tile",			"cut",			"flame",			"brook",			"crust",			"field",			"crest",			"card",			"branch",			"fabric",			"rail",			"stonework",			"petal",			"mug",			"basket",			"chill",			"chain",			"fire",			"floor",			"note",			"bloom",			"glory",			"lane",			"cave",			"stormfront",			"dockside",			"smoke",			"stage",			"crest",			"solstice",			"bale",			"column",			"crest",			"seed",			"hook",			"rimstone",			"grasshopper",			"sawdust",			"lagoon",			"pilot",			"timberline",			"circuit",			"master",			"ridge",			"pulse",			"harvest",			"alloy",			"switchback",			"jetty",			"crestline",			"quarryman",			"ridgepole",			"wick",			"clover",			"icefall",			"homestead",			"outlook",			"heading",			"shoal",			"drapery",			"pavilion",			"gravel",			"blossom",			"grinder",			"forecast",			"icicle",			"pendant",			"understory",			"breaker",			"harmony",			"outpost",			"routine",			"merge",			"prism",			"rumble",			"ferry",			"lantern",			"nozzle",			"reunion",			"monsoon",			"textile",			"mosaic",			"crestfall",			"kernel",			"signal",			"overlook",			"pasture",			"outbuilding",			"tidepool"];
// var thirdwordlist = [	"cold",		"finder",	"room",		"price",	"worker",	"drain",	"rest",		"mix",		"cracker",	"office",	"bar",		"split",		"pool",		"metal",	"mill",		"drop",			"speed","view","back","state","thrower","tank","paper","wave","count","garden","model","worker","team","control","song","house","pack","shark","swing","flower","core","water","house","hour","stall","garden","stick","chamber","roots","house","bar","call","sheet","drill","room","guard","season","shot","beam","spring","brush","work","iron","bridge","work","ahead","plan","cloud","span","lamp","sale","office","field","stream","marker","line","point","season","screen","walk","pot","cycle","level","holder","rack","fabric","case","bottle","office","bar","light","session","room","call","block","seal","pad","house","fire","strip","support","pit","paint","worm","mix","zone","cabin","path","lift","bottle","shaft","pick","cook","gun","maker","polish","trail","operator","hill","stone","balance","shot","flow","wood","break","sign","wall","beach","cut","table","layer","candle","counter","line","bite","deposit","cover","event","model","image","check","drive","edge","pipe","shark","ring","seat","cover","block","mill","ladder","span","wheel","tree","sound","bloom","pack","road","knot","street","rack","game","show","code","shell","strength","road","tower","bomb","floor","line","thrower","trout","layer","mouse","badge","trick","line","softener","car","wall","softener","holder","case","factor","store","break","lamp","pad","season","vine","marker","painting","line","market","alarm","name","hill","light","weight","base","hill","packet","shot","pool","field","trail","shore","boat","ridge","board","key","line","rate","season","wheel","road","stone","drive","tool","beam","holder","patch","route","act","point","change","water","rod","stage","pit","trail","wheel","model","drop","chain","layer","bar","line","guard","task","lane","light","strip","dock","post","flame","photo","rain","mill","tile","ridge","grinder","tower","deck","fence","frame","life"];
// var forthwordlist = [	"front",	"fee",		"key",		"tag",		"bee",		"pipe",		"stop",		"tape",		"jack",		"space",	"graph",	"personality",	"table",	"plate",	"stone",	"zone",			"trap","point","pack","fair","squad","top","cut","form","down","party","train","strike","captain","panel","bird","key","ice","tank","dance","bed","value","bottle","plant","glass","holder","tool","figure","music","rock","party","stool","sign","music","bit","service","duty","ticket","put","balance","water","fire","bench","gate","deck","flow","start","ahead","cover","class","shade","price","hours","test","flow","stone","dance","blank","ticket","saver","through","holder","path","ground","ring","mount","softener","study","cap","chair","code","house","player","service","center","party","team","lock","party","pit","mall","beam","crew","brush","hole","match","defense","fever","finder","ticket","cap","light","pocket","stove","metal","space","remover","mix","badge","station","path","scale","caller","chart","carving","point","post","clock","house","line","runner","cake","wax","offer","graph","mark","slip","charge","planner","train","search","list","time","case","cleaner","bite","tone","belt","charge","letter","worker","rail","class","house","bark","wave","season","leader","map","work","light","mount","piece","time","word","shock","test","map","bell","squad","plan","cook","squad","line","cake","trap","number","shot","graph","sheet","wash","clock","sheet","ring","study","test","room","point","shade","lock","ticket","leaf","stone","brush","graph","stall","clock","tag","station","house","limit","line","climb","stamp","caller","table","test","mix","leave","ramp","trail","game","chain","graph","limit","ticket","house","map","wall","time","box","balance","ring","work","map","break","guard","order","wheel","holder","name","crew","mix","hub","train","zone","reaction","cake","stool","cook","duty","force","marker","house","mall","worker","office","thrower","frame","storm","worker","floor","trail","wheel","bell","chair","line","shop","jacket"];
// var fifthwordlist = [	"line",		"schedule",	"chain",	"team",		"sting",	"cleaner",	"sign",		"measure",	"hammer",	"bar",		"paper",	"test",			"cloth",	"number",	"age",		"defense",		"door","guard","leader","trade","goal","shelf","line","letter","town","favor","track","zone","chair","show","cage","note","cube","top","card","frame","chain","cap","food","ceiling","ring","box","eight","hall","slide","trick","sample","post","stand","rate","charge","station","booth","away","scale","wheel","drill","press","keeper","chair","chart","line","time","charge","room","tree","point","long","drive","rate","wall","floor","page","price","mode","gate","ring","finder","floor","tone","point","sheet","group","lock","lift","word","key","card","charge","stage","favor","spirit","step","trick","stop","walk","balance","chief","stroke","punch","point","line","pitch","fee","booth","lock","beam","watch","pipe","shop","bar","tool","tape","number","master","marker","reading","id","top","knife","guard","office","tower","party","cook","up","stand","seal","letter","paper","sheet","knot","rate","pad","station","party","price","keeper","study","spray","mark","shift","loop","card","head","strike","car","act","rules","chip","form","ticket","board","maker","flow","beam","point","work","keeper","search","wave","drive","maker","rope","leader","layout","book","car","dance","stand","door","plate","caller","paper","metal","station","tower","music","tone","group","drive","service","guard","tree","step","booth","pile","path","stroke","paper","holder","tower","line","master","key","line","cook","rate","duty","name","runner","score","match","form","access","marker","piece","store","paper","line","booth","rules","maker","clock","keeper","cutter","board","tone","bench","maker","room","duty","form","house","badge","tag","chief","match","cap","station","marker","time","stand","sample","booklet","station","field","stone","key","walk","strike","chair","squad","shop","drain","badge","lamp","mix","house","rope","lift","cook","keeper","pocket"];
// var sixthwordlist = [	"cook",		"change",	"link",		"spirit",	"operation","spray",	"language",	"step",		"toe",		"chart",	"bag",		"pilot",		"pattern",	"crunch",	"limit",	"system",		"frame","rail","board","route","keeper","life","dance","carrier","square","box","record","call","lift","time","match","pad","tray","hat","trick","shop","reaction","stone","chain","fan","tone","cutter","ball","pass","show","shot","size","office","alone","limit","card","master","worker","game","model","house","sergeant","release","role","lift","top","cook","zone","card","service","house","guard","shot","train","card","clock","plan","number","match","shift","code","leader","tool","lamp","shift","guard","metal","leader","step","ticket","search","chain","table","rate","name","bag","level","count","shot","sign","through","board","officer","count","line","guard","cook","perfect","schedule","worker","step","balance","tower","wrench","keeper","code","box","measure","plate","key","line","room","card","shelf","edge","rail","chair","bell","favor","book","hill","alone","stamp","carrier","plane","music","work","limit","lock","master","trick","match","net","group","bottle","sheet","worker","hole","reader","shot","zone","wash","break","committee","bag","letter","booth","game","space","chart","split","guard","bench","net","party","form","train","space","swing","board","grid","stand","wash","floor","mixer","frame","rack","id","plane","shop","master","guard","stand","shift","leader","time","charge","duty","bark","ladder","worker","driver","finder","count","weight","badge","bell","cook","code","chain","dance","booklet","limit","officer","plate","up","card","point","letter","code","stone","work","room","weight","dance","worker","committee","space","tower","net","blade","meeting","shift","press","space","service","station","letter","party","number","line","officer","point","lock","master","line","keeper","mixer","size","cover","master","test","path","chain","through","zone","lift","leader","keeper","pipe","number","shade","tape","party","swing","ticket","stove","badge","watch"];
// var lastwordlist = [	"book",		"order",	"cable",	"level",	"manual",	"bottle",	"barrier",	"ladder",	"ring",		"patterns",	"drop",		"episode",		"maker",	"time",		"line",		"check",		"shop","car","game","map","net","jacket","floor","bag","root","office","holder","center","ticket","keeper","point","lock","table","trick","shot","keeper","time","path","link","club","shift","blade","room","code","case","clock","chart","chair","complex","line","holder","key","shift","plan","citizen","party","major","valve","player","shaft","score","stove","marker","reader","counter","rules","duty","caller","station","trick","tower","layout","crunch","point","key","word","board","kit","light","worker","rail","shop","role","ladder","booth","party","store","runner","limit","tag","holder","ground","down","caller","maker","lane","game","badge","down","cutter","duty","booklet","score","board","shift","count","board","guard","set","role","word","cutter","step","rack","chain","dance","service","reader","life","case","car","lift","rope","box","stand","climb","complex","duty","bag","crash","stand","flow","line","step","key","shot","point","weight","leader","rack","metal","badge","punch","dock","caller","marker","station","room","chair","holder","carrier","worker","piece","bar","top","level","rail","press","weight","trick","letter","station","bar","dance","meeting","line","alone","station","plan","bowl","shop","mount","number","crash","keeper","key","duty","light","worker","role","keeper","rate","station","chip","rail","shift","seat","tool","down","scale","number","rope","stove","word","store","floor","cover","line","badge","rack","hill","reader","guard","head","word","path","flow","service","scale","floor","badge","chair","bar","bell","weight","edge","room","worker","release","bar","counter","master","head","favor","plate","cook","badge","guard","step","code","cook","net","bowl","chart","charge","key","score","finder","store","lane","marker","ticket","role","role","cleaner","plate","tree","measure","favor","dance","booth","pipe","number","tower"];
// var submitterlist = [	"","","","","","","","","Divya","Vidya","Kanishk","Div","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",];
var masterwordlist = [
["river","stone","cold","front","line","cook","book",""],
["garden","path","finder","fee","schedule","change","order",""],
["coffee","break","room","key","chain","link","cable",""],
["market","share","price","tag","team","spirit","level",""],
["harbor","dock","worker","bee","sting","operation","manual",""],
["winter","storm","drain","pipe","cleaner","spray","bottle",""],
["silver","spoon","rest","stop","sign","language","barrier",""],
["forest","trail","mix","tape","measure","step","ladder",""],
["party","animal","cracker","jack","hammer","toe","ring","Divya"],
["black","box","office","space","bar","chart","patterns","Vidya"],
["cotton","candy","bar","graph","paper","bag","drop","Kanishk"],
["yellow","banana","split","personality","test","pilot","episode","Divya"],
["ocean","tide","pool","table","cloth","pattern","maker",""],
["music","sheet","metal","plate","number","crunch","time",""],
["desert","wind","mill","stone","age","limit","line",""],
["morning","dew","drop","zone","defense","system","check",""],
["traffic","light","speed","trap","door","frame","shop",""],
["crystal","clear","view","point","guard","rail","car",""],
["thunder","clap","back","pack","leader","board","game",""],
["island","nation","state","fair","trade","route","map",""],
["candle","flame","thrower","squad","goal","keeper","net",""],
["rocket","fuel","tank","top","shelf","life","jacket",""],
["family","bond","paper","cut","line","dance","floor",""],
["summer","heat","wave","form","letter","carrier","bag",""],
["cotton","thread","count","down","town","square","root",""],
["marble","statue","garden","party","favor","box","office",""],
["dragon","scale","model","train","track","record","holder",""],
["pepper","mill","worker","strike","zone","call","center",""],
["harbor","seal","team","captain","chair","lift","ticket",""],
["riverbank","erosion","control","panel","show","time","keeper",""],
["meadow","lark","song","bird","cage","match","point",""],
["lantern","light","house","key","note","pad","lock",""],
["timber","wolf","pack","ice","cube","tray","table",""],
["coral","reef","shark","tank","top","hat","trick",""],
["velvet","rope","swing","dance","card","trick","shot",""],
["canyon","wall","flower","bed","frame","shop","keeper",""],
["orchard","apple","core","value","chain","reaction","time",""],
["glacier","melt","water","bottle","cap","stone","path",""],
["prairie","dog","house","plant","food","chain","link",""],
["summit","peak","hour","glass","ceiling","fan","club",""],
["harborfront","market","stall","holder","ring","tone","shift",""],
["compass","rose","garden","tool","box","cutter","blade",""],
["lantern","glow","stick","figure","eight","ball","room",""],
["canyon","echo","chamber","music","hall","pass","code",""],
["meadow","grass","roots","rock","slide","show","case",""],
["timber","frame","house","party","trick","shot","clock",""],
["coral","sand","bar","stool","sample","size","chart",""],
["velvet","curtain","call","sign","post","office","chair",""],
["glacier","ice","sheet","music","stand","alone","complex",""],
["prairie","fire","drill","bit","rate","limit","line",""],
["summit","meeting","room","service","charge","card","holder",""],
["compass","point","guard","duty","station","master","key",""],
["lantern","festival","season","ticket","booth","worker","shift",""],
["canyon","rim","shot","put","away","game","plan",""],
["harbor","light","beam","balance","scale","model","citizen",""],
["maple","leaf","spring","water","wheel","house","party",""],
["copper","wire","brush","fire","drill","sergeant","major",""],
["puzzle","piece","work","bench","press","release","valve",""],
["shadow","cast","iron","gate","keeper","role","player",""],
["signal","tower","bridge","deck","chair","lift","shaft",""],
["berry","patch","work","flow","chart","top","score",""],
["iron","forge","ahead","start","line","cook","stove",""],
["canyon","floor","plan","ahead","time","zone","marker",""],
["harbor","mist","cloud","cover","charge","card","reader",""],
["falcon","wing","span","class","room","service","counter",""],
["marble","floor","lamp","shade","tree","house","rules",""],
["timber","yard","sale","price","point","guard","duty",""],
["lantern","post","office","hours","long","shot","caller",""],
["meadow","bloom","field","test","drive","train","station",""],
["glacier","runoff","stream","flow","rate","card","trick",""],
["prairie","trail","marker","stone","wall","clock","tower",""],
["summit","ridge","line","dance","floor","plan","layout",""],
["compass","needle","point","blank","page","number","crunch",""],
["coral","bloom","season","ticket","price","match","point",""],
["velvet","touch","screen","saver","mode","shift","key",""],
["harborfront","pier","walk","through","gate","code","word",""],
["riverbed","clay","pot","holder","ring","leader","board",""],
["gardenia","bloom","cycle","path","finder","tool","kit",""],
["coffee","roast","level","ground","floor","lamp","light",""],
["market","stall","holder","ring","tone","shift","worker",""],
["winter","coat","rack","mount","point","guard","rail",""],
["silver","lining","fabric","softener","sheet","metal","shop",""],
["forest","edge","case","study","group","leader","role",""],
["ocean","spray","bottle","cap","lock","step","ladder",""],
["music","box","office","chair","lift","ticket","booth",""],
["desert","sand","bar","code","word","search","party",""],
["morning","star","light","house","key","chain","store",""],
["traffic","jam","session","player","card","table","runner",""],
["crystal","ball","room","service","charge","rate","limit",""],
["thunder","roll","call","center","stage","name","tag",""],
["island","breeze","block","party","favor","bag","holder",""],
["candle","wax","seal","team","spirit","level","ground",""],
["rocket","launch","pad","lock","step","count","down",""],
["family","tree","house","party","trick","shot","caller",""],
["summer","camp","fire","pit","stop","sign","maker",""],
["cotton","candy","strip","mall","walk","through","lane",""],
["marble","arch","support","beam","balance","board","game",""],
["dragon","fire","pit","crew","chief","officer","badge",""],
["pepper","spray","paint","brush","stroke","count","down",""],
["lantern","glow","worm","hole","punch","line","cutter",""],
["canyon","trail","mix","match","point","guard","duty",""],
["meadow","grassland","zone","defense","line","cook","booklet",""],
["timber","log","cabin","fever","pitch","perfect","score",""],
["coral","stone","path","finder","fee","schedule","board",""],
["harbor","crane","lift","ticket","booth","worker","shift",""],
["maple","syrup","bottle","cap","lock","step","count",""],
["copper","mine","shaft","light","beam","balance","board",""],
["puzzle","lock","pick","pocket","watch","tower","guard",""],
["shadow","line","cook","stove","pipe","wrench","set",""],
["signal","flare","gun","metal","shop","keeper","role",""],
["berry","smoothie","maker","space","bar","code","word",""],
["iron","nail","polish","remover","tool","box","cutter",""],
["canyon","ridge","trail","mix","tape","measure","step",""],
["harbor","crane","operator","badge","number","plate","rack",""],
["falcon","crest","hill","station","master","key","chain",""],
["marble","quarry","stone","path","marker","line","dance",""],
["timber","beam","balance","scale","reading","room","service",""],
["lantern","hook","shot","caller","id","card","reader",""],
["meadow","stream","flow","chart","top","shelf","life",""],
["glacier","drift","wood","carving","knife","edge","case",""],
["prairie","wind","break","point","guard","rail","car",""],
["summit","trailhead","sign","post","office","chair","lift",""],
["compass","bearing","wall","clock","tower","bell","rope",""],
["coral","cove","beach","house","party","favor","box",""],
["velvet","ribbon","cut","line","cook","book","stand",""],
["harborfront","cafe","table","runner","up","hill","climb",""],
["riverbed","silt","layer","cake","stand","alone","complex",""],
["gardenia","scent","candle","wax","seal","stamp","duty",""],
["coffee","bean","counter","offer","letter","carrier","bag",""],
["market","trend","line","graph","paper","plane","crash",""],
["winter","frost","bite","mark","sheet","music","stand",""],
["silver","ore","deposit","slip","knot","work","flow",""],
["forest","canopy","cover","charge","rate","limit","line",""],
["ocean","current","event","planner","pad","lock","step",""],
["music","scale","model","train","station","master","key",""],
["desert","mirage","image","search","party","trick","shot",""],
["morning","routine","check","list","price","match","point",""],
["traffic","circle","drive","time","keeper","net","weight",""],
["crystal","shard","edge","case","study","group","leader",""],
["thunder","burst","pipe","cleaner","spray","bottle","rack",""],
["island","reef","shark","bite","mark","sheet","metal",""],
["candle","holder","ring","tone","shift","worker","badge",""],
["rocket","booster","seat","belt","loop","hole","punch",""],
["family","album","cover","charge","card","reader","dock",""],
["summer","breeze","block","letter","head","shot","caller",""],
["cotton","thread","mill","worker","strike","zone","marker",""],
["marble","step","ladder","rail","car","wash","station",""],
["dragon","wing","span","class","act","break","room",""],
["pepper","grinder","wheel","house","rules","committee","chair",""],
["lantern","shade","tree","bark","chip","bag","holder",""],
["canyon","echo","sound","wave","form","letter","carrier",""],
["meadow","larkspur","bloom","season","ticket","booth","worker",""],
["timber","wolfhound","pack","leader","board","game","piece",""],
["coral","bloomfield","road","map","maker","space","bar",""],
["harbor","rope","knot","work","flow","chart","top",""],
["maple","grove","street","light","beam","split","level",""],
["copper","plate","rack","mount","point","guard","rail",""],
["puzzle","board","game","piece","work","bench","press",""],
["shadow","puppet","show","time","keeper","net","weight",""],
["signal","jammer","code","word","search","party","trick",""],
["berry","tart","shell","shock","wave","form","letter",""],
["iron","grip","strength","test","drive","train","station",""],
["canyon","bend","road","map","maker","space","bar",""],
["harbor","watch","tower","bell","rope","swing","dance",""],
["falcon","dive","bomb","squad","leader","board","meeting",""],
["marble","tile","floor","plan","layout","grid","line",""],
["timber","cut","line","cook","book","stand","alone",""],
["lantern","flame","thrower","squad","car","wash","station",""],
["meadow","brook","trout","line","dance","floor","plan",""],
["glacier","crust","layer","cake","stand","mixer","bowl",""],
["prairie","field","mouse","trap","door","frame","shop",""],
["summit","crest","badge","number","plate","rack","mount",""],
["compass","card","trick","shot","caller","id","number",""],
["coral","branch","line","graph","paper","plane","crash",""],
["velvet","fabric","softener","sheet","metal","shop","keeper",""],
["harborfront","rail","car","wash","station","master","key",""],
["riverbed","stonework","wall","clock","tower","guard","duty",""],
["gardenia","petal","softener","sheet","music","stand","light",""],
["coffee","mug","holder","ring","tone","shift","worker",""],
["market","basket","case","study","group","leader","role",""],
["winter","chill","factor","test","drive","time","keeper",""],
["silver","chain","store","room","service","charge","rate",""],
["forest","fire","break","point","guard","duty","station",""],
["ocean","floor","lamp","shade","tree","bark","chip",""],
["music","note","pad","lock","step","ladder","rail",""],
["desert","bloom","season","ticket","booth","worker","shift",""],
["morning","glory","vine","leaf","pile","driver","seat",""],
["traffic","lane","marker","stone","path","finder","tool",""],
["crystal","cave","painting","brush","stroke","count","down",""],
["thunder","stormfront","line","graph","paper","weight","scale",""],
["island","dockside","market","stall","holder","badge","number",""],
["candle","smoke","alarm","clock","tower","bell","rope",""],
["rocket","stage","name","tag","line","cook","stove",""],
["family","crest","hill","station","master","code","word",""],
["summer","solstice","light","house","key","chain","store",""],
["cotton","bale","weight","limit","line","dance","floor",""],
["marble","column","base","line","cook","booklet","cover",""],
["dragon","crest","hill","climb","rate","limit","line",""],
["pepper","seed","packet","stamp","duty","officer","badge",""],
["lantern","hook","shot","caller","name","plate","rack",""],
["canyon","rimstone","pool","table","runner","up","hill",""],
["meadow","grasshopper","field","test","score","card","reader",""],
["timber","sawdust","trail","mix","match","point","guard",""],
["coral","lagoon","shore","leave","form","letter","head",""],
["harbor","pilot","boat","ramp","access","code","word",""],
["maple","timberline","ridge","trail","marker","stone","path",""],
["copper","circuit","board","game","piece","work","flow",""],
["puzzle","master","key","chain","store","room","service",""],
["shadow","ridge","line","graph","paper","weight","scale",""],
["signal","pulse","rate","limit","line","dance","floor",""],
["berry","harvest","season","ticket","booth","worker","badge",""],
["iron","alloy","wheel","house","rules","committee","chair",""],
["canyon","switchback","road","map","maker","space","bar",""],
["harbor","jetty","stone","wall","clock","tower","bell",""],
["falcon","crestline","drive","time","keeper","net","weight",""],
["marble","quarryman","tool","box","cutter","blade","edge",""],
["timber","ridgepole","beam","balance","board","meeting","room",""],
["lantern","wick","holder","ring","tone","shift","worker",""],
["meadow","clover","patch","work","bench","press","release",""],
["glacier","icefall","route","map","maker","space","bar",""],
["prairie","homestead","act","break","room","service","counter",""],
["summit","outlook","point","guard","duty","station","master",""],
["compass","heading","change","order","form","letter","head",""],
["coral","shoal","water","wheel","house","party","favor",""],
["velvet","drapery","rod","holder","badge","number","plate",""],
["harborfront","pavilion","stage","name","tag","line","cook",""],
["riverbed","gravel","pit","crew","chief","officer","badge",""],
["gardenia","blossom","trail","mix","match","point","guard",""],
["coffee","grinder","wheel","hub","cap","lock","step",""],
["market","forecast","model","train","station","master","code",""],
["winter","icicle","drop","zone","marker","line","cook",""],
["silver","pendant","chain","reaction","time","keeper","net",""],
["forest","understory","layer","cake","stand","mixer","bowl",""],
["ocean","breaker","bar","stool","sample","size","chart",""],
["music","harmony","line","cook","booklet","cover","charge",""],
["desert","outpost","guard","duty","station","master","key",""],
["morning","routine","task","force","field","test","score",""],
["traffic","merge","lane","marker","stone","path","finder",""],
["crystal","prism","light","house","key","chain","store",""],
["thunder","rumble","strip","mall","walk","through","lane",""],
["island","ferry","dock","worker","strike","zone","marker",""],
["candle","lantern","post","office","chair","lift","ticket",""],
["rocket","nozzle","flame","thrower","squad","leader","role",""],
["family","reunion","photo","frame","shop","keeper","role",""],
["summer","monsoon","rain","storm","drain","pipe","cleaner",""],
["cotton","textile","mill","worker","badge","number","plate",""],
["marble","mosaic","tile","floor","lamp","shade","tree",""],
["dragon","crestfall","ridge","trail","mix","tape","measure",""],
["pepper","kernel","grinder","wheel","house","party","favor",""],
["lantern","signal","tower","bell","rope","swing","dance",""],
["canyon","overlook","deck","chair","lift","ticket","booth",""],
["meadow","pasture","fence","line","cook","stove","pipe",""],
["timber","outbuilding","frame","shop","keeper","badge","number",""],
["coral","tidepool","life","jacket","pocket","watch","tower",""]
];
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
var wordone = masterwordlist[index][0].toUpperCase();
var wordtwo = masterwordlist[index][1].toUpperCase();
var wordthree = masterwordlist[index][2].toUpperCase();
var wordfour = masterwordlist[index][3].toUpperCase();
var wordfive = masterwordlist[index][4].toUpperCase();
var wordsix = masterwordlist[index][5].toUpperCase();
var wordlast = masterwordlist[index][6].toUpperCase();
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
var vowelcount = 0;
var consocount = 0;
var correct = 0;
var livescnt  = 0;
var lives = "🔴🔴🔴🔴🔴";
if (vowelcount == 0){
for (let i = 0; i < solveword.length; i++) {
		if (solveword[i] == "A" || solveword[i] == "E" || solveword[i] == "I" || solveword[i] == "O" || solveword[i] == "U"){
			vowelcount = vowelcount + 1;
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
var vowelactive = 0;
if (vowelactive != 1){	
document.getElementById("answer").style.color = "lightgray";
document.getElementById("answer").innerText = "VOWELS ARE DISABLED TILL ALL OTHER LETTERS ARE FOUND";
}
window.onload = function(){
    intialize();
}


function intialize() {
	if (correct == 0){
		correct = wordonewidth + wordlastwidth;
	} 
	let ele = document.getElementById("daycount");
	ele.innerHTML += days;
	if (masterwordlist[index][7] != ""){
		let ele1 = document.getElementById("submitter");
		ele1.innerHTML += "Submitted By " + masterwordlist[index][7];
		// ele1.classList.add("flash2");
	}	
	if (localStorage.getItem('archovercl' + days) != 0 && localStorage.getItem('archovercl' + days) != 1) {
		localStorage['archovercl' + days] = 0; 
		localStorage['archstatcl' + days] = 0; 
	}	
/* 	document.getElementById("pzlhdr").style.display = "none";
	document.getElementById("pzl").style.display = "none"; */
	// document.getElementById("bbhdr").style.display = "none";
	// document.getElementById("bb").style.display = "none";
	// document.getElementById("HTMLButton").style.display = "none";
	// document.getElementById("Rafflebutton").style.display = "none";
	// document.getElementById("CoffeButton").style.display = "block";
	// document.getElementById("FBButton").style.display = "none";
	// document.getElementById("TwitterButton").style.display = "none";
	/* document.getElementById("WAButton").style.display = "none"; */
	// document.getElementById("ffhdr").style.display = "none";
	// document.getElementById("ffdtl").style.display = "none";
	document.getElementById("lives").innerText = lives;		
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
	if (vowelactive == 0){
	document.getElementById("KeyA").classList.add("disabled", "key-tile-disabled");
	document.getElementById("KeyE").classList.add("disabled", "key-tile-disabled");
	document.getElementById("KeyI").classList.add("disabled", "key-tile-disabled");
	document.getElementById("KeyO").classList.add("disabled", "key-tile-disabled");
	document.getElementById("KeyU").classList.add("disabled", "key-tile-disabled");
	}
    // Listen for Key Press
	
	if ((localStorage.getItem('archovercl' + days) == "1")){
			for (let i = 0; i < wordonewidth; i++) {
				let currTile = document.getElementById("1" + '-' + i);
				currTile.innerText = wordone[i];
				currTile.classList.remove("poptile");
				currTile.classList.add("starting");		
			}	
			for (let i = 0; i < wordtwowidth; i++) {
				let currTile = document.getElementById("2" + '-' + i);
				currTile.innerText = wordtwo[i];
				currTile.classList.remove("poptile");
				if ((localStorage.getItem('archstatcl' + days) == "1")){
					currTile.classList.add("animated","correct");
				}
				else{
					currTile.classList.add("animated","failed");
				}
			}		
			for (let i = 0; i < wordthreewidth; i++) {
				let currTile = document.getElementById("3" + '-' + i);
				currTile.innerText = wordthree[i];
				currTile.classList.remove("poptile");
				if ((localStorage.getItem('archstatcl' + days) == "1")){
					currTile.classList.add("animated","correct");
				}
				else{
					currTile.classList.add("animated","failed");
				}			}				
			for (let i = 0; i < wordfourwidth; i++) {
				let currTile = document.getElementById("4" + '-' + i);
				currTile.innerText = wordfour[i];
				currTile.classList.remove("poptile");
				if ((localStorage.getItem('archstatcl' + days) == "1")){
					currTile.classList.add("animated","correct");
				}
				else{
					currTile.classList.add("animated","failed");
				}			}			
			for (let i = 0; i < wordfivewidth; i++) {
				let currTile = document.getElementById("5" + '-' + i);
				currTile.innerText = wordfive[i];
				currTile.classList.remove("poptile");
				if ((localStorage.getItem('archstatcl' + days) == "1")){
					currTile.classList.add("animated","correct");
				}
				else{
					currTile.classList.add("animated","failed");
				}			}			
			for (let i = 0; i < wordsixwidth; i++) {
				let currTile = document.getElementById("6" + '-' + i);
				currTile.innerText = wordsix[i];
				currTile.classList.remove("poptile");
				if ((localStorage.getItem('archstatcl' + days) == "1")){
					currTile.classList.add("animated","correct");
				}
				else{
					currTile.classList.add("animated","failed");
				}			}			
			for (let i = 0; i < wordlastwidth; i++) {
				let currTile = document.getElementById("7" + '-' + i);
				currTile.innerText = wordlast[i];
				currTile.classList.remove("poptile");
				currTile.classList.add("starting");		
			}
			document.getElementById("answer").style.color = "lightgray";
			document.getElementById("answer").innerText = "YOU HAVE ALREADY PLAYED THIS CHAIN!"		
			disableconsos();
			disablevowels();
	}
	else{
		document.addEventListener("keyup", (e) => {
			if ("KeyA" <= e.code && e.code <= "KeyZ") {
				if (!document.getElementById(e.code).classList.contains("disabled")){
					processInput(e);
				}
			}
		})
	}
    // SetTier();
	// var winpct = Math.round(localStorage.totalclwins / localStorage.totalclplayed * 100);
	// document.getElementById(11).innerText = "PLAYED: " + localStorage.totalclplayed;
	// document.getElementById(12).innerText = "WIN %: " + winpct;
	// document.getElementById(13).innerText = "STREAK: " + localStorage.totalclstreak + tiericon;
	// document.getElementById(14).innerText = "STARS: " + localStorage.totalclstars;

	//Current Day Game Over
	// if (localStorage.getItem('gameovercl' + days) == "1") {
		// if (localStorage.gameclwon == 1) {
			// switch (Number(localStorage.clstarscnt)) {
				// case 0: color0 = "green";
					// break;
				// case 1: color1 = "green";
					// break;
				// case 2: color2 = "green";
					// break;
				// case 3: color3 = "green";
					// break;
				// case 4: color4 = "green";
					// break;
				// case 5: color5 = "green";
					// break;
			// }			
			// for (let i = 0; i < wordonewidth; i++) {
				// let currTile = document.getElementById("1" + '-' + i);
				// currTile.innerText = wordone[i];
				// currTile.classList.remove("poptile");
				// currTile.classList.add("animated","correct");
			// }	
			// for (let i = 0; i < wordtwowidth; i++) {
				// let currTile = document.getElementById("2" + '-' + i);
				// currTile.innerText = wordtwo[i];
				// currTile.classList.remove("poptile");
				// currTile.classList.add("animated","correct");
			// }		
			// for (let i = 0; i < wordthreewidth; i++) {
				// let currTile = document.getElementById("3" + '-' + i);
				// currTile.innerText = wordthree[i];
				// currTile.classList.remove("poptile");
				// currTile.classList.add("animated","correct");
			// }				
			// for (let i = 0; i < wordfourwidth; i++) {
				// let currTile = document.getElementById("4" + '-' + i);
				// currTile.innerText = wordfour[i];
				// currTile.classList.remove("poptile");
				// currTile.classList.add("animated","correct");
			// }			
			// for (let i = 0; i < wordfivewidth; i++) {
				// let currTile = document.getElementById("5" + '-' + i);
				// currTile.innerText = wordfive[i];
				// currTile.classList.remove("poptile");
				// currTile.classList.add("animated","correct");
			// }			
			// for (let i = 0; i < wordsixwidth; i++) {
				// let currTile = document.getElementById("6" + '-' + i);
				// currTile.innerText = wordsix[i];
				// currTile.classList.remove("poptile");
				// currTile.classList.add("animated","correct");
			// }			
			// for (let i = 0; i < wordlastwidth; i++) {
				// let currTile = document.getElementById("7" + '-' + i);
				// currTile.innerText = wordlast[i];
				// currTile.classList.remove("poptile");
				// currTile.classList.add("animated","correct");
			// }		
				// document.getElementById("answer").style.color = "lightgray";
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
/* 					for (let s = 0; s < localStorage.clstarscnt; s++){
						document.getElementById("answerstar").innerText += "⭐";
					} */	
					// var templives = "";
					// templives = document.getElementById("lives").innerText;
					// for (i=0; i<5; i++){
						// templives = templives.replace("🔴", "⭐");
					// }	
					// document.getElementById("lives").innerText = templives;
					// if (Number (localStorage.clstarscnt) != 0){
						// document.getElementById("lives").classList.add("animated");
					// }				
				// }
		// }
		// else {
			// colorx = "green";
			// for (let i = 0; i < wordonewidth; i++) {
				// let currTile = document.getElementById("1" + '-' + i);
				// currTile.innerText = wordone[i];
				// currTile.classList.remove("poptile","correct");
				// currTile.classList.add("failed", "animated");
			// }	
			// for (let i = 0; i < wordtwowidth; i++) {
				// let currTile = document.getElementById("2" + '-' + i);
				// currTile.innerText = wordtwo[i];
				// currTile.classList.remove("poptile","correct");
				// currTile.classList.add("failed", "animated");
			// }				
			// for (let i = 0; i < wordthreewidth; i++) {
				// let currTile = document.getElementById("3" + '-' + i);
				// currTile.innerText = wordthree[i];
				// currTile.classList.remove("poptile","correct");
				// currTile.classList.add("failed", "animated");
			// }				
			// for (let i = 0; i < wordfourwidth; i++) {
				// let currTile = document.getElementById("4" + '-' + i);
				// currTile.innerText = wordfour[i];
				// currTile.classList.remove("poptile","correct");
				// currTile.classList.add("failed", "animated");
			// }				
			// for (let i = 0; i < wordfivewidth; i++) {
				// let currTile = document.getElementById("5" + '-' + i);
				// currTile.innerText = wordfive[i];
				// currTile.classList.remove("poptile","correct");
				// currTile.classList.add("failed", "animated");
			// }				
			// for (let i = 0; i < wordsixwidth; i++) {
				// let currTile = document.getElementById("6" + '-' + i);
				// currTile.innerText = wordsix[i];
				// currTile.classList.remove("poptile","correct");
				// currTile.classList.add("failed", "animated");
			// }				
			// for (let i = 0; i < wordlastwidth; i++) {
				// let currTile = document.getElementById("7" + '-' + i);
				// currTile.innerText = wordlast[i];
				// currTile.classList.remove("poptile","correct");
				// currTile.classList.add("failed", "animated");
			// }		
				// document.getElementById("answer").style.color = "red";
				// document.getElementById("answer").innerText = "GAME OVER! OUT OF LIVES.";
		// }
		// gameOver = true;
		// document.getElementById("KeyA").classList.add("key-tile-disabled");
		// document.getElementById("KeyE").classList.add("key-tile-disabled");
		// document.getElementById("KeyI").classList.add("key-tile-disabled");
		// document.getElementById("KeyO").classList.add("key-tile-disabled");
		// document.getElementById("KeyU").classList.add("key-tile-disabled");		
		// disableconsos();
		// disablevowels();
		// setTimeout(OpenStats, 1100);
		// displayFooter();		
	// }
	// Default Path
	// else {
			// if(localStorage.vowelactive == 1){
			// disableconsos();
			// document.getElementById("KeyA").classList.add( "key-tile-enabled");
			// document.getElementById("KeyE").classList.add( "key-tile-enabled");
			// document.getElementById("KeyI").classList.add( "key-tile-enabled");
			// document.getElementById("KeyO").classList.add( "key-tile-enabled");
			// document.getElementById("KeyU").classList.add( "key-tile-enabled");				
			// }
		// var disabled = JSON.parse(localStorage.getItem("cldisabledkey"));
		// for (let i = 0; i < disabled.length; i++){
			// document.getElementById("Key" + disabled[i]).classList.add("disabled");
		// }
		// if (localStorage.clwordone != ""){
			// for (let i = 0; i < wordonewidth; i++){
				// let currTile = document.getElementById("1" + '-' + i);
				// if (localStorage.clwordone[i] == "?"){
					// currTile.innerText = "";
				// }
				// else if (localStorage.clwordone[i] != ""){
					// currTile.innerText = localStorage.clwordone[i];
					// currTile.classList.add("correct");
				// }
			// }	
		// }
		// if (localStorage.clwordtwo != ""){
			// for (let i = 0; i < wordtwowidth; i++){
				// let currTile = document.getElementById("2" + '-' + i);
				// if (localStorage.clwordtwo[i] == "?"){
					// currTile.innerText = "";
				// }
				// else if (localStorage.clwordtwo[i] != ""){
					// currTile.innerText = localStorage.clwordtwo[i];
					// currTile.classList.add("correct");
				// }
			// }	
		// }		
		// if (localStorage.clwordthree != ""){
			// for (let i = 0; i < wordthreewidth; i++){
				// let currTile = document.getElementById("3" + '-' + i);
				// if (localStorage.clwordthree[i] == "?"){
					// currTile.innerText = "";
				// }
				// else if (localStorage.clwordthree[i] != ""){
					// currTile.innerText = localStorage.clwordthree[i];
					// currTile.classList.add("correct");
				// }
			// }	
		// }		
		// if (localStorage.clwordfour != ""){
			// for (let i = 0; i < wordfourwidth; i++){
				// let currTile = document.getElementById("4" + '-' + i);
				// if (localStorage.clwordfour[i] == "?"){
					// currTile.innerText = "";
				// }
				// else if (localStorage.clwordfour[i] != ""){
					// currTile.innerText = localStorage.clwordfour[i];
					// currTile.classList.add("correct");
				// }
			// }	
		// }		
		// if (localStorage.clwordfive != ""){
			// for (let i = 0; i < wordfivewidth; i++){
				// let currTile = document.getElementById("5" + '-' + i);
				// if (localStorage.clwordfive[i] == "?"){
					// currTile.innerText = "";
				// }
				// else if (localStorage.clwordfive[i] != ""){
					// currTile.innerText = localStorage.clwordfive[i];
					// currTile.classList.add("correct");
				// }
			// }	
		// }		
		// if (localStorage.clwordsix != ""){
			// for (let i = 0; i < wordsixwidth; i++){
				// let currTile = document.getElementById("6" + '-' + i);
				// if (localStorage.clwordsix[i] == "?"){
					// currTile.innerText = "";
				// }
				// else if (localStorage.clwordsix[i] != ""){
					// currTile.innerText = localStorage.clwordsix[i];
					// currTile.classList.add("correct");
				// }
			// }	
		// }			
		// if (localStorage.clwordlast != ""){
			// for (let i = 0; i < wordlastwidth; i++){
				// let currTile = document.getElementById("7" + '-' + i);
				// if (localStorage.clwordlast[i] == "?"){
					// currTile.innerText = "";
				// }
				// else if (localStorage.clwordlast[i] != ""){
					// currTile.innerText = localStorage.clwordlast[i];
					// currTile.classList.add("correct");
				// }
			// }	
		// }
	// }

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
			if (e.code[3] == wordtwo[i]){
				if (currTile.innerText == ""){
					currTile.innerText = e.code[3];
					currTile.classList.add("correct","poptile");
					// if (localStorage.cldisabledkey.includes(e.code[3])){
						// do nothing
					// }
					// else{
						// localStorage.consocount = Number(localStorage.consocount) + 1;			
						// localStorage.clcorrect = Number(localStorage.clcorrect) + 1;
						consocount = consocount + 1;
						correct = correct + 1;
					// }			
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
					// if (localStorage.cldisabledkey.includes(e.code[3])){
						// do nothing
					// }
					// else{
						// localStorage.consocount = Number(localStorage.consocount) + 1;			
						// localStorage.clcorrect = Number(localStorage.clcorrect) + 1;
						consocount = consocount + 1;
						correct = correct + 1;
					// }		
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
					// if (localStorage.cldisabledkey.includes(e.code[3])){
						// do nothing
					// }
					// else{
						// localStorage.consocount = Number(localStorage.consocount) + 1;			
						// localStorage.clcorrect = Number(localStorage.clcorrect) + 1;
						consocount = consocount + 1;
						correct = correct + 1;
					// }		
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
					// if (localStorage.cldisabledkey.includes(e.code[3])){
						// do nothing
					// }
					// else{
						// localStorage.consocount = Number(localStorage.consocount) + 1;			
						// localStorage.clcorrect = Number(localStorage.clcorrect) + 1;
						consocount = consocount + 1;
						correct = correct + 1;
					// }		
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
					// if (localStorage.cldisabledkey.includes(e.code[3])){
						// do nothing
					// }
					// else{
						// localStorage.consocount = Number(localStorage.consocount) + 1;			
						// localStorage.clcorrect = Number(localStorage.clcorrect) + 1;
						consocount = consocount + 1;
						correct = correct + 1;
					// }			
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
		// if (localStorage.consocount > 5 && localStorage.clshowalert == 0 && localStorage.totalclplayed > 0){
			// OpenADDModal();
			// localStorage.clshowalert = 1;
		// }
	if ((consocount == solveword.length - vowelcount) && vowelactive == 0){
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
		disableconsos();
		document.getElementById("answer").style.color = "lightgray";
		document.getElementById("answer").innerText = "ONLY VOWELS LEFT!"	
		vowelactive = 1;	
		setTimeout(FinalClue, 0);	
	}		
		document.getElementById(e.code).classList.add("disabled");
		// var disabledkey = e.code[3];
		// if (disabledkeyarr.length == 0){
			// var temp = JSON.parse(localStorage.getItem("cldisabledkey"));
			// if (temp != ""){
				// disabledkeyarr.push(temp);
			// }
		// }
		// disabledkeyarr.push(disabledkey);
		// disabledkeyarr = [].concat.apply([], disabledkeyarr);
		// localStorage.setItem("cldisabledkey", JSON.stringify(disabledkeyarr));		
    }
		
	if (LetterFound == 0){
		livescnt += 1;
		document.getElementById("answer").style.color = "lightgray";
		switch (livescnt) {
				case 0: lives = "🔴🔴🔴🔴🔴";
					break;
				case 1: lives = "🔴🔴🔴🔴";
					document.getElementById("answer").innerText = "FIRST LIFE LOST!"
					break;	
				case 2: lives = "🔴🔴🔴";
					document.getElementById("answer").innerText = "SECOND LIFE LOST!"
					break;				
				case 3: lives = "🔴🔴";
					document.getElementById("answer").innerText = "THIRD LIFE LOST!"				
					break;	
				case 4: lives = "🔴";
					document.getElementById("answer").innerText = "FOURTH LIFE LOST - LAST LIFE ALERT!"		
					setTimeout(FinalClue, 500);			
					break;	
				// case 5: localStorage.cllives = "⚠️";
				// 	document.getElementById("answer").innerText = "LAST LIFE ALERT!"
				// 	setTimeout(FinalClue, 500);	
				// 	break;
				case 5: lives = "❌❌❌❌❌";
					break;					
		}		
		
		document.getElementById("lives").innerText = lives;
		document.getElementById("lives").classList.add("blink");
		setTimeout(removeblink, 3000);	
	}
	
	if (livescnt == 5){
		for (let i = 0; i < wordonewidth; i++) {
			let currTile = document.getElementById("1" + '-' + i);
			currTile.innerText = wordone[i];
			currTile.classList.remove("poptile","correct");
			// currTile.classList.add("failed", "animated");
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
			// currTile.classList.add("failed", "animated");
		}		
			gameOver = true;
			localStorage['archovercl' + days] = 1;
			disableconsos();
			disablevowels();
			document.getElementById("answer").style.color = "red";
			document.getElementById("answer").innerText = "GAME OVER! OUT OF LIVES.";
				
	}	
	
	if (correct == word.length){
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
			localStorage['archovercl' + days] = 1; 
			localStorage['archstatcl' + days] = 1; 
			disablevowels();
			document.getElementById("answer").style.color = "lightgray";
			document.getElementById("answer").innerText = "CHAIN COMPLETED SUCCESSFULLY!";	
/* 			for (let s = 0; s < localStorage.clstarscnt; s++){
				document.getElementById("answerstar").innerText += "⭐";
			} */
			// var templives = "";
			// templives = document.getElementById("lives").innerText;
			// for (i=0; i<5; i++){
				// templives = templives.replace("🔴", "⭐");
			// }	
			// document.getElementById("lives").innerText = templives;
			// if (Number (localStorage.clstarscnt) != 0){
				// document.getElementById("lives").classList.add("animated");
			// }
			// localStorage.setItem(('gameovercl' + days), 1);	
			// localStorage.totalclplayed = Number(localStorage.totalclplayed) + 1;
			// localStorage.totalclwins = Number(localStorage.totalclwins) + 1;
			// localStorage.totalclstreak = Number(localStorage.totalclstreak) + 1;
			// localStorage.totalclstars = Number(localStorage.totalclstars) + Number(localStorage.clstarscnt);
			// SetTier();
			// var winpct = Math.round(localStorage.totalclwins / localStorage.totalclplayed * 100);
			// document.getElementById(11).innerText = "PLAYED: " + localStorage.totalclplayed;
			// document.getElementById(12).innerText = "WIN %: " + winpct;
			// document.getElementById(13).innerText = "STREAK: " + localStorage.totalclstreak + tiericon;
			// document.getElementById(14).innerText = "STARS: " + localStorage.totalclstars;			
			// displayFooter();
			// localStorage.gameclwon = 1;
			// setTimeout(ConfettiStart, 1000);
			// setTimeout(OpenStats, 4800);
	}	
	// let clwordone = "";
	// for (let i = 0; i < wordonewidth; i++){
		// let currTile = document.getElementById("1" + '-' + i);
		// if (currTile.innerText == ""){
			// clwordone += "?";
		// }
		// else{
			// clwordone += currTile.innerText;
		// }
		// localStorage.clwordone = clwordone;
	// }	
	// let clwordtwo = "";
	// for (let i = 0; i < wordtwowidth; i++){
		// let currTile = document.getElementById("2" + '-' + i);
		// if (currTile.innerText == ""){
			// clwordtwo += "?";
		// }
		// else{
			// clwordtwo += currTile.innerText;
		// }
		// localStorage.clwordtwo = clwordtwo;
	// }	
	
	// let clwordthree = "";
	// for (let i = 0; i < wordthreewidth; i++){
		// let currTile = document.getElementById("3" + '-' + i);
		// if (currTile.innerText == ""){
			// clwordthree += "?";
		// }
		// else{
			// clwordthree += currTile.innerText;
		// }
		// localStorage.clwordthree = clwordthree;
	// }	

	// let clwordfour = "";
	// for (let i = 0; i < wordfourwidth; i++){
		// let currTile = document.getElementById("4" + '-' + i);
		// if (currTile.innerText == ""){
			// clwordfour += "?";
		// }
		// else{
			// clwordfour += currTile.innerText;
		// }
		// localStorage.clwordfour = clwordfour;
	// }	
	
	// let clwordfive = "";
	// for (let i = 0; i < wordfivewidth; i++){
		// let currTile = document.getElementById("5" + '-' + i);
		// if (currTile.innerText == ""){
			// clwordfive += "?";
		// }
		// else{
			// clwordfive += currTile.innerText;
		// }
		// localStorage.clwordfive = clwordfive;
	// }		

	// let clwordsix = "";
	// for (let i = 0; i < wordsixwidth; i++){
		// let currTile = document.getElementById("6" + '-' + i);
		// if (currTile.innerText == ""){
			// clwordsix += "?";
		// }
		// else{
			// clwordsix += currTile.innerText;
		// }
		// localStorage.clwordsix = clwordsix;
	// }	

	// let clwordlast = "";
	// for (let i = 0; i < wordlastwidth; i++){
		// let currTile = document.getElementById("7" + '-' + i);
		// if (currTile.innerText == ""){
			// clwordlast += "?";
		// }
		// else{
			// clwordlast += currTile.innerText;
		// }
		// localStorage.clwordlast = clwordlast;
	// }		

}