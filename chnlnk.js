// FIRST VISIT CHECK (must run before any reload logic)
if (!localStorage.clshowrules) {
    localStorage.setItem("clshowrules", 1);
    setTimeout(OpenRules, 1500);
    // Prevent deployment reload from firing on first visit
    localStorage.setItem("skipReloadOnce", "1");
}

const BUILD_VERSION = "2025.01.27.02";

if (localStorage.getItem("skipReloadOnce") === "1") {
    // Clear the flag and skip reload this one time
    localStorage.removeItem("skipReloadOnce");
} else {
    // Normal deployment reload logic
    if (localStorage.getItem("clBuildVersion") !== BUILD_VERSION) {
        localStorage.setItem("clBuildVersion", BUILD_VERSION);
        location.reload();
    }
}
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
        position: {
            x: 50,
            y: 50
        },
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
var bbInterval = setInterval(function() {
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
        // clearInterval(bbInterval); // ← stops runaway intervals
    }
}, 1000);

document.getElementById("wabutton").addEventListener("click", function() {
    const menu = document.getElementById("waMenu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
});

// Optional: close menu when clicking outside
document.addEventListener("click", function(e) {
    const wrapper = document.querySelector(".wa-wrapper");
    if (!wrapper.contains(e.target)) {
        document.getElementById("waMenu").style.display = "none";
    }
});

function containsEmoji(str) {
    // Matches actual emoji ranges only
    const emojiRegex = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}\u{1F100}-\u{1F1FF}]/u;
    return emojiRegex.test(str);
}

function validateName(name) {
    if (!name) return false;

    const trimmed = name.trim();
    const lower = trimmed.toLowerCase();

    // Length
    if (trimmed.length < 2 || trimmed.length > 20) return false;

    // Emoji check
    if (containsEmoji(trimmed)) return false;

    // Allowed characters
    if (!/^[A-Za-z0-9 _-]+$/.test(trimmed)) return false;

    // Banned words
    const bannedWords = [
        "fuck", "shit", "bitch", "asshole", "bastard",
        "cunt", "dick", "pussy", "slut", "whore", "ass", "hell"
    ];

    if (bannedWords.some(w => lower.includes(w))) return false;

    return true;
}




function showNamePopup() {
    const popup = document.getElementById("namePopup");
    const input = document.getElementById("nameInput");

    if (!input.value.trim()) {
        input.value = getDefaultPlayerName();
    }

    popup.classList.remove("hidden");

    setTimeout(() => {
        input.focus();
        input.select();
    }, 50);
}

function hideNamePopup() {
    document.getElementById("namePopup").classList.add("hidden");
}

function getDefaultPlayerName() {
    return "CLUser" + Date.now();
}


async function initPlayerName() {
    return new Promise(async resolve => {

        let stored = localStorage.playerName;

        // --- 1. If stored name exists but is now invalid ---
        if (stored && !validateName(stored)) {
            localStorage.removeItem("playerName");
            stored = null;
        }

        // --- 2. If valid stored name exists, use it ---
        if (stored) {
            submitLeaderboardEntry(stored);
            resolve(stored);
            return;
        }

        // --- 3. No valid name → show popup ---
        showNamePopup();

        document.getElementById("nameSubmitBtn").onclick = async () => {
            let name = document.getElementById("nameInput").value.trim();
            const errorEl = document.getElementById("nameError");

            if (name === "") {
                name = getDefaultPlayerName();
            }

            // Validate using ONE function
            if (!validateName(name)) {
                errorEl.textContent = "Invalid or banned name. Try again.";
                errorEl.classList.remove("hidden");
                return;
            }

            try {
                // Duplicate name check
                const q = query(
                    collection(db, "leaderboard"),
                    where("name", "==", name)
                );
                const snap = await getDocs(q);

                if (!snap.empty) {
                    errorEl.textContent = "That name is already taken.";
                    errorEl.classList.remove("hidden");
                    return;
                }

                // keep localStorage consistent with edit flow
                localStorage.playerName = name;

                hideNamePopup();

                await submitLeaderboardEntry(name);

                resolve(name);

            } catch (err) {
                console.error("Error checking name:", err);
                errorEl.textContent = "Error checking name. Try again.";
                errorEl.classList.remove("hidden");
            }
        };
    });
}




document.addEventListener("DOMContentLoaded", () => {

    const changeNameBtn = document.getElementById("changeNameBtn");

    changeNameBtn.addEventListener("click", () => {

        // Prevent duplicates
        if (document.getElementById("nameEditContainer")) return;

        const overlay = document.getElementById("globalOverlay");

		const container = document.createElement("div");
		container.id = "nameEditContainer";
		container.style.position = "fixed";
		container.style.top = "120px";
		container.style.left = "50%";
		container.style.transform = "translateX(-50%)";
		container.style.zIndex = "9999999";
		container.style.background = "black";
		container.style.padding = "10px";
		container.style.border = "2px solid yellow";
		container.style.position = "fixed";
		//  Close button
		const closeBtn = document.createElement("button");
		closeBtn.textContent = "x";
		closeBtn.style.position = "absolute";
		closeBtn.style.top = "-10px";           // move it slightly above the container
		closeBtn.style.right = "-10px";         // shift it outside the right edge
		closeBtn.style.background = "black";    // match container background
		closeBtn.style.color = "yellow";
		closeBtn.style.border = "2px solid yellow";
		closeBtn.style.borderRadius = "50%";
		closeBtn.style.width = "24px";
		closeBtn.style.height = "24px";
		closeBtn.style.fontSize = "16px";
		closeBtn.style.lineHeight = "20px";
		closeBtn.style.cursor = "pointer";
		closeBtn.style.zIndex = "10000000";     // ensure it's above everything
		const input = document.createElement("input");
		input.type = "text";
		input.maxLength = 20;
		input.placeholder = "Enter New Name";

		const saveBtn = document.createElement("button");
		saveBtn.textContent = "SAVE";
		saveBtn.className = "buttonmode1";

		const error = document.createElement("p");
		error.style.color = "red";
		error.style.display = "none";

		container.appendChild(closeBtn);
		container.appendChild(input);
		container.appendChild(saveBtn);
		container.appendChild(error);

		overlay.appendChild(container);

		// ⭐ Autofocus
		input.focus();

		// ⭐ Close handler
		closeBtn.addEventListener("click", () => {
			container.remove();
		});

        // ⭐ SAVE HANDLER
        saveBtn.addEventListener("click", async () => {
            let newName = input.value.trim();

            // Use your central validator
            if (!validateName(newName)) {
                error.textContent = "Invalid or banned name. Try again.";
                error.style.display = "block";
                return;
            }

            try {
                const playerId = auth.currentUser.uid;

                // ⭐ Duplicate name check
                const q = query(
                    collection(db, "leaderboard"),
                    where("name", "==", newName)
                );
                const snap = await getDocs(q);

                const someoneElse = snap.docs.some(doc => doc.id !== playerId);

                if (someoneElse) {
                    error.textContent = "That name is already taken.";
                    error.style.display = "block";
                    return;
                }

                // ⭐ Update Firestore
                await setDoc(
                    doc(db, "leaderboard", playerId),
                    { name: newName, updated: serverTimestamp() },
                    { merge: true }
                );

                // ⭐ Sync localStorage
                localStorage.playerName = newName;

                // ⭐ Refresh leaderboard
                await loadLeaderboard();

                container.remove();

            } catch (err) {
                error.textContent = "Error updating name.";
                error.style.display = "block";
                console.error(err);
            }
        });
    });

});

function initMonthlyStats() {
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

    const lastMonth = localStorage.monthcl_lastMonth;

    // First time ever → initialize monthly stats from totals
    if (!lastMonth) {
        localStorage.monthcl_lastMonth = currentMonth;

        localStorage.monthclplayed = localStorage.totalclplayed || 0;
        localStorage.monthclstars  = localStorage.totalclstars  || 0;
        localStorage.monthwins     = localStorage.totalclwins   || 0;

        return;
    }

    // New month → reset monthly stats
    if (lastMonth !== currentMonth) {
        localStorage.monthcl_lastMonth = currentMonth;

        localStorage.monthclplayed = 0;
        localStorage.monthclstars  = 0;
        localStorage.monthwins     = 0;

        return;
    }

    // Same month → do nothing
}


async function submitLeaderboardEntry(playerName) {

    const played = Number(localStorage.monthclplayed) || 0;
    const stars  = Number(localStorage.monthclstars)  || 0;
    // const streak = Number(localStorage.totalclstreak) || 0;
    const wins   = Number(localStorage.monthwins)   || 0;

    const winpct = played > 0 ? Math.round((wins / played) * 100) : 0;
	// const playerRef = doc(db, "leaderboard", playerName); 
	// const existing = await getDoc(playerRef); 
	// if (existing.exists()) { alert("That name is already taken. Please choose another."); return; }
	const playerId = auth.currentUser.uid; // ← use UID as doc ID
    try {
        await setDoc(
            doc(db, "leaderboard", playerId),   // ← one doc per player
            {
                name: playerName,
                played: played,
                stars: stars,
                // streak: streak,
                wins: wins,
                winpct: winpct,
                updated: serverTimestamp()
            },
            { merge: false } // ← keeps old fields if you add new ones later
        );

    } catch (err) {
        console.error("Error saving leaderboard entry:", err);
    }
}

document.getElementById("leaderboardHeader").addEventListener("click", function () {
    const content = document.getElementById("leaderboardContent");
    const toggle = document.getElementById("leaderboardToggle");

    if (content.style.maxHeight && content.style.maxHeight !== "0px") {
        content.style.maxHeight = "0px";
        toggle.textContent = "▼";
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
        toggle.textContent = "▲";
    }
});

async function loadLeaderboard() {
    const leaderboardBody = document.getElementById("leaderboardBody");
    leaderboardBody.innerHTML = "<tr><td colspan='6'>Loading...</td></tr>";

    const currentPlayerName = localStorage.playerName;
    const currentUID = auth.currentUser.uid;

    try {
        // 1. Get top 5
        const topQ = query(
            collection(db, "leaderboard"),
            orderBy("stars", "desc"),
			orderBy("winpct", "desc"),
			orderBy("wins", "desc"),
            limit(5)
        );

        const topSnap = await getDocs(topQ);
        leaderboardBody.innerHTML = "";

        let rank = 1;
        let currentPlayerInTop5 = false;

        topSnap.forEach(docSnap => {
            const d = docSnap.data();

            if (d.name === currentPlayerName) {
                currentPlayerInTop5 = true;
            }

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${
                    rank === 1 ? "🥇" :
                    rank === 2 ? "🥈" :
                    rank === 3 ? "🥉" :
                    rank
                }</td>
                <td>${d.name}</td>
                <td>${d.stars}</td>
                <td>${d.wins}</td>
                <td>${d.winpct}%</td>
            `;

            // highlight current user
            if (d.name === currentPlayerName) {
                row.querySelectorAll("td").forEach(td => td.classList.add("current-player-cell"));
            }

            leaderboardBody.appendChild(row);
            rank++;
        });

        // 2. If current player is NOT in top 5 → show their real rank
        if (!currentPlayerInTop5) {
            const playerRef = doc(db, "leaderboard", currentUID);
            const playerSnap = await getDoc(playerRef);

            if (playerSnap.exists()) {
                const d = playerSnap.data();

                // 3. Compute actual rank
                const rankQ = query(
                    collection(db, "leaderboard"),
                    where("stars", ">", d.stars)
                );

                const rankSnap = await getDocs(rankQ);
                const actualRank = rankSnap.size + 1;

                // 4. Add the current player row as the 6th entry
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${actualRank}</td>
                    <td>${d.name}</td>
                    <td>${d.stars}</td>
                    <td>${d.wins}</td>
                    <td>${d.winpct}%</td>
                `;

                // highlight the current player
                row.style.background = "rgba(255,255,255,0.1)";
                row.style.fontWeight = "bold";
                row.querySelectorAll("td").forEach(td => td.classList.add("current-player-cell"));

                leaderboardBody.appendChild(row);
            }
        }

    } catch (err) {
        console.error("Leaderboard error:", err);
        leaderboardBody.innerHTML = "<tr><td colspan='6'>Error loading leaderboard.</td></tr>";
    }
}


function postStatsToWhatsApp() {

    if (localStorage.clgamecnt == 6) {
        var cluehdr = "X/5";
    } else {
        cluehdr = localStorage.clgamecnt + "/5";
    }

    switch (Number(localStorage.clgamecnt)) {
        case 0:
            var clueicon = "🔴 🔴 🔴 🔴 🔴"
            break;
        case 1:
            var clueicon = "🔴 🔴 🔴 🔴 ⭐"
            break;
        case 2:
            var clueicon = "🔴 🔴 🔴 ⭐ ⭐"
            break;
        case 3:
            var clueicon = "🔴 🔴 ⭐ ⭐ ⭐"
            break;
        case 4:
            var clueicon = "🔴 ⭐ ⭐ ⭐ ⭐"
            break;
        case 5:
            var clueicon = "⭐ ⭐ ⭐ ⭐ ⭐"
            break;
        case 6:
            var clueicon = "❌❌❌❌❌"
            break;
    }

    const stats = buildStats(
        days,
        cluehdr,
        clueicon,
        localStorage.totalclstreak,
        localStorage.totalclstars,
        tierlevel,
        tiericon
    );

    const url = "https://api.whatsapp.com/send?text=" + encodeURIComponent(stats);
    window.open(url, "_blank");
}

function buildStats(puzzleNumber, movesUsed, dots, streak, stars, tier, tiericon) {
    const tierLine = tier ? `${tiericon} Tier: ${tier}` : "";
    return `🔗 CHN LNK # ${puzzleNumber} 🧩

${movesUsed} - ${dots}
🔥 Streak: ${streak} | ⭐ Stars: ${stars}
${tierLine}

https://sank0403.github.io/chnlnk/`;
}


function updateAnswer(text) {
    const el = document.getElementById("answer");

    el.innerHTML = `
        ${text}
		<div class="border-seg border-top"></div>
		<div class="border-seg border-right"></div>
		<div class="border-seg border-bottom"></div>
		<div class="border-seg border-left"></div>
    `;

    el.hidden = false;

    el.classList.remove("run-border");
    void el.offsetWidth;
    el.classList.add("run-border");
}

//Open Stats at end of game
async function OpenStats() {
    document.getElementById("statsbutton").click();

    // Ensure player name exists BEFORE loading leaderboard
    await initPlayerName();

    // Now safe to load leaderboard
    await loadLeaderboard();
	
	// Now show the leaderboard 
	document.getElementById("leaderboardCollapsible").style.display = "block";	
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
    if (!gameOver) {
        document.getElementById("lives").classList.remove("blink");
        //document.getElementById("answer").innerText = "";
    }
}

//Final Clue Text Attenion 
function FinalClue() {
    document.getElementById("answer").classList.remove("popanswer");
    document.getElementById("answer").offsetWidth;
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
    document.getElementById("wabutton").style.display = "block";
    document.getElementById("Rafflebutton").style.display = "block";
    // document.getElementById("Archivebutton").style.display = "block";
    // document.getElementById("submission").style.display = "block";
    //document.getElementById("toggle-row").style.visibility = "visible";
    // document.getElementById("CoffeButton").style.display = "block";	
    // document.getElementById("FBButton").style.display = "block";	
    // document.getElementById("TwitterButton").style.display = "block";	
}

window.localStorage;
if (!localStorage.totalclplayed) {
    localStorage.setItem("totalclplayed", 0);
    localStorage.setItem("totalclwins", 0);
    localStorage.setItem("totalclstreak", 0);
    localStorage.setItem("totalclstars", 0);
    localStorage.setItem("gameclwon", 0);
    localStorage.setItem("starcl0count", 0);
    localStorage.setItem("starcl1count", 0);
    localStorage.setItem("starcl2count", 0);
    localStorage.setItem("starcl3count", 0);
    localStorage.setItem("starcl4count", 0);
    localStorage.setItem("starcl5count", 0);
    localStorage.setItem("starclxcount", 0);
    localStorage.setItem("clshowalert", 0);
}

if (!localStorage.clshowalert) {
    localStorage.setItem("clshowalert", 0);
}

if (!localStorage.clhardmode) {
    localStorage.setItem("clhardmode", 0);
}

//Baseline Date
var a = new Date(); // Current date now.
var b = new Date(2025, 12, 9, 0, 0, 0, 0); // Start of CHN LNK.
var d = (a - b); // Difference in milliseconds.
var days = parseInt((d / 1000) / 86400);
if (localStorage.getItem('gameovercl' + days) != 0 && localStorage.getItem('gameovercl' + days) != 1) {
    localStorage['gameovercl' + days] = 0;
	localStorage['gamestatcl' + days] = 0;
    localStorage.setItem("cllives", "🔴🔴🔴🔴🔴");
    localStorage.setItem("clcorrect", " ");
    localStorage.setItem("vowelcount", 0);
    localStorage.setItem("consocount", 0);
    localStorage.setItem("vowelactive", 0);
    localStorage.setItem("cllivescnt", 0);
    localStorage.setItem("clstarscnt", 0);
    localStorage.setItem("clguesscnt", 0);
    localStorage.setItem("clgamestarted", 0);
    localStorage.setItem("clwordone", "");
    localStorage.setItem("clwordtwo", "");
    localStorage.setItem("clwordthree", "");
    localStorage.setItem("clwordfour", "");
    localStorage.setItem("clwordfive", "");
    localStorage.setItem("clwordsix", "");
    localStorage.setItem("clwordlast", "");
    localStorage.setItem("cldisabledkey", JSON.stringify(""));
    localStorage.setItem("clgamecnt", 0);
    if (localStorage.clhardmode == 1) {
        localStorage.setItem("momentumStart", Date.now());
        localStorage.setItem("momentumRemaining", 60);
    }
    // location.reload();
}

/* for (var d = 1; d < Number(days) ; d++){
	localStorage.removeItem('gameovercl' + d);
} */

var tierlevel = ""
var tiericon = ""

function SetTier() {
    if (localStorage.totalclstreak >= 10 && localStorage.totalclstreak <= 24) {
        tierlevel = "Bronze (Streak 10 - 24)";
        tiericon = "🥉";
    } else if (localStorage.totalclstreak >= 25 && localStorage.totalclstreak <= 49) {
        tierlevel = "Silver (Streak 25 - 49)";
        tiericon = "🥈";
    } else if (localStorage.totalclstreak >= 50 && localStorage.totalclstreak <= 99) {
        tierlevel = "Gold (Streak 50 - 99)";
        tiericon = "🥇";
    } else if (localStorage.totalclstreak >= 100) {
        tierlevel = "Ultimate (Streak 100+)";
        tiericon = "🏆";
    } else {
        tierlevel = "";
        tiericon = "";
    }
}

// const leaderboardHeader = document.getElementById("leaderboardHeader");
// const leaderboardContent = document.getElementById("leaderboardContent");
// const leaderboardToggle = document.getElementById("leaderboardToggle");

// leaderboardHeader.addEventListener("click", async () => {
    // const isClosed = leaderboardContent.style.display === "" || leaderboardContent.style.display === "none";

    // if (isClosed) {
        // await loadLeaderboard();
        // leaderboardContent.style.display = "block";
        // leaderboardToggle.textContent = "▲";
    // } else {
        // leaderboardContent.style.display = "none";
        // leaderboardToggle.textContent = "▼";
    // }
// });

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
    chosenTile.classList.add("mystery", "flash2");
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
            tile.classList.remove("mystery", "flash2");
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
    if (localStorage.clhardmode == 1) {
        pop.innerText = "+2 DYNAMITES 💣";
    } else {
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
    if (localStorage.clhardmode == 1) {
        box.innerHTML = `
			<div class="perfect-burst"></div>
			<div class="perfect-text">👌 PERFECT SOLVE +2 💣</div>
		`;
    } else {
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
            showStreakPopup("💣 DYNAMITE ELIMINATES 3 INVALID LETTERS FROM THE KEYBOARD ⌨️. \n HIT AGAIN TO USE!");
            document.getElementById("answer").innerText = "";
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

        if (eligibleKeys.length < 3) {
            showMessage("NOT ENOUGH KEYS TO BE ELIMINATED!");
            shakeDynamiteButton();
            return;
        }

        // ⭐ Consume 1 dynamite
        localStorage.cldynamite = dyn - 1;
        updateDynamiteUI();

        // Shuffle to make selection random
        shuffle(eligibleKeys);

        const toRemove = eligibleKeys.slice(0, 3);

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
    // document.getElementById("answer").innerText = msg;
	updateAnswer(msg);
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
    if ((!localStorage.cldynamite) || (Number(localStorage.cldynamite) === 0)) {
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


document.getElementById("hardmodetoggle").addEventListener("change", function() {
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
    if (localStorage.clgamecnt == 6) {
        var cluehdr = "X/5";
    } else {
        cluehdr = localStorage.clgamecnt + "/5";
    }
    switch (Number(localStorage.clgamecnt)) {
        case 0:
            var clueicon = "🔴 🔴 🔴 🔴 🔴"
            break;
        case 1:
            var clueicon = "🔴 🔴 🔴 🔴 ⭐"
            break;
        case 2:
            var clueicon = "🔴 🔴 🔴 ⭐ ⭐"
            break;
        case 3:
            var clueicon = "🔴 🔴 ⭐ ⭐ ⭐"
            break;
        case 4:
            var clueicon = "🔴 ⭐ ⭐ ⭐ ⭐"
            break;
        case 5:
            var clueicon = "⭐ ⭐ ⭐ ⭐ ⭐"
            break;
        case 6:
            var clueicon = "❌❌❌❌❌"
            break;
    }

    if (tierlevel == "") {
        var copyText = "🔗 CHN LNK # " + days + " 🧩 \n\n" + cluehdr + " - " + clueicon + "\n🔥 Streak: " + localStorage.totalclstreak + " | ⭐ Stars: " + localStorage.totalclstars + "\n\nhttps://sank0403.github.io/chnlnk/";
    } else {
        var copyText = "🔗 CHN LNK # " + days + " 🧩 \n\n" + cluehdr + " - " + clueicon + "\n🔥 Streak: " + localStorage.totalclstreak + " | ⭐ Stars: " + localStorage.totalclstars + "\n" + tiericon + " Tier: " + tierlevel + "\n\nhttps://sank0403.github.io/chnlnk/";
    }


    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText);

    //Button Text
    let HTMLButton = document.getElementById("HTMLButton");
    HTMLButton.innerText = "COPIED"
    setTimeout(ResetButton, 1000);
}

// var firstwordlist =  ["river",			"garden",						"coffee",						"market",						"harbor",						"winter",						"silver",						"forest",						"party",						"black",						"cotton",						"yellow",						"ocean",						"music",						"desert",						"morning",						"traffic",						"crystal",						"thunder",						"island",						"candle",						"rocket",						"family",						"summer",						"cotton",						"marble",						"dragon",						"pepper",						"harbor",						"riverbank",						"meadow",						"lantern",						"timber",						"coral",						"velvet",						"canyon",						"orchard",						"glacier",						"prairie",						"summit",						"harborfront",						"compass",						"lantern",						"canyon",						"meadow",						"timber",						"coral",						"velvet",						"glacier",			"prairie",			"summit",			"compass",			"lantern",			"canyon",			"harbor",			"maple",			"copper",			"puzzle",			"shadow",			"signal",			"berry",			"iron",			"canyon",			"harbor",			"falcon",			"marble",			"timber",			"lantern",			"meadow",			"glacier",			"prairie",			"summit",			"compass",			"coral",			"velvet",			"harborfront",			"riverbed",			"gardenia",			"coffee",			"market",			"winter",			"silver",			"forest",			"ocean",			"music",			"desert",			"morning",			"traffic",			"crystal",			"thunder",			"island",			"candle",			"rocket",			"family",			"summer",			"cotton",			"marble",			"dragon",			"pepper",			"lantern",			"canyon",			"meadow",			"timber",			"coral",			"harbor",			"maple",			"copper",			"puzzle",			"shadow",			"signal",			"berry",			"iron",			"canyon",			"harbor",			"falcon",			"marble",			"timber",			"lantern",			"meadow",			"glacier",			"prairie",			"summit",			"compass",			"coral",			"velvet",			"harborfront",			"riverbed",			"gardenia",			"coffee",			"market",			"winter",			"silver",			"forest",			"ocean",			"music",			"desert",			"morning",			"traffic",			"crystal",			"thunder",			"island",			"candle",			"rocket",			"family",			"summer",			"cotton",			"marble",			"dragon",			"pepper",			"lantern",			"canyon",			"meadow",			"timber",			"coral",			"harbor",			"maple",			"copper",			"puzzle",			"shadow",			"signal",			"berry",			"iron",			"canyon",			"harbor",			"falcon",			"marble",			"timber",			"lantern",			"meadow",			"glacier",			"prairie",			"summit",			"compass",			"coral",			"velvet",			"harborfront",			"riverbed",			"gardenia",			"coffee",			"market",			"winter",			"silver",			"forest",			"ocean",			"music",			"desert",			"morning",			"traffic",			"crystal",			"thunder",			"island",			"candle",			"rocket",			"family",			"summer",			"cotton",			"marble",			"dragon",			"pepper",			"lantern",			"canyon",			"meadow",			"timber",			"coral",			"harbor",			"maple",			"copper",			"puzzle",			"shadow",			"signal",			"berry",			"iron",			"canyon",			"harbor",			"falcon",			"marble",			"timber",			"lantern",			"meadow",			"glacier",			"prairie",			"summit",			"compass",			"coral",			"velvet",			"harborfront",			"riverbed",			"gardenia",			"coffee",			"market",			"winter",			"silver",			"forest",			"ocean",			"music",			"desert",			"morning",			"traffic",			"crystal",			"thunder",			"island",			"candle",			"rocket",			"family",			"summer",			"cotton",			"marble",			"dragon",			"pepper",			"lantern",			"canyon",			"meadow",			"timber",			"coral"];
// var secondwordlist = ["stone",						"path",						"break",						"share",						"dock",						"storm",						"spoon",						"trail",						"animal",						"box",						"candy",						"banana",						"tide",						"sheet",						"wind",						"dew",						"light",						"clear",						"clap",						"nation",						"flame",						"fuel",						"bond",						"heat",						"thread",						"statue",						"scale",						"mill",						"seal",						"erosion",						"lark",						"light",						"wolf",						"reef",						"rope",						"wall",						"apple",						"melt",						"dog",						"peak",						"market",						"rose",						"glow",						"echo",						"grass",						"frame",						"sand",						"curtain",			"ice",			"fire",			"meeting",			"point",			"festival",			"rim",			"light",			"leaf",			"wire",			"piece",			"cast",			"tower",			"patch",			"forge",			"floor",			"mist",			"wing",			"floor",			"yard",			"post",			"bloom",			"runoff",			"trail",			"ridge",			"needle",			"bloom",			"touch",			"pier",			"clay",			"bloom",			"roast",			"stall",			"coat",			"lining",			"edge",			"spray",			"box",			"sand",			"star",			"jam",			"ball",			"roll",			"breeze",			"wax",			"launch",			"tree",			"camp",			"candy",			"arch",			"fire",			"spray",			"glow",			"trail",			"grassland",			"log",			"stone",			"crane",			"syrup",			"mine",			"lock",			"line",			"flare",			"smoothie",			"nail",			"ridge",			"crane",			"crest",			"quarry",			"beam",			"hook",			"stream",			"drift",			"wind",			"trailhead",			"bearing",			"cove",			"ribbon",			"cafe",			"silt",			"scent",			"bean",			"trend",			"frost",			"ore",			"canopy",			"current",			"scale",			"mirage",			"routine",			"circle",			"shard",			"burst",			"reef",			"holder",			"booster",			"album",			"breeze",			"thread",			"step",			"wing",			"grinder",			"shade",			"echo",			"larkspur",			"wolfhound",			"bloomfield",			"rope",			"grove",			"plate",			"board",			"puppet",			"jammer",			"tart",			"grip",			"bend",			"watch",			"dive",			"tile",			"cut",			"flame",			"brook",			"crust",			"field",			"crest",			"card",			"branch",			"fabric",			"rail",			"stonework",			"petal",			"mug",			"basket",			"chill",			"chain",			"fire",			"floor",			"note",			"bloom",			"glory",			"lane",			"cave",			"stormfront",			"dockside",			"smoke",			"stage",			"crest",			"solstice",			"bale",			"column",			"crest",			"seed",			"hook",			"rimstone",			"grasshopper",			"sawdust",			"lagoon",			"pilot",			"timberline",			"circuit",			"master",			"ridge",			"pulse",			"harvest",			"alloy",			"switchback",			"jetty",			"crestline",			"quarryman",			"ridgepole",			"wick",			"clover",			"icefall",			"homestead",			"outlook",			"heading",			"shoal",			"drapery",			"pavilion",			"gravel",			"blossom",			"grinder",			"forecast",			"icicle",			"pendant",			"understory",			"breaker",			"harmony",			"outpost",			"routine",			"merge",			"prism",			"rumble",			"ferry",			"lantern",			"nozzle",			"reunion",			"monsoon",			"textile",			"mosaic",			"crestfall",			"kernel",			"signal",			"overlook",			"pasture",			"outbuilding",			"tidepool"];
// var thirdwordlist = [	"cold",		"finder",	"room",		"price",	"worker",	"drain",	"rest",		"mix",		"cracker",	"office",	"bar",		"split",		"pool",		"metal",	"mill",		"drop",			"speed","view","back","state","thrower","tank","paper","wave","count","garden","model","worker","team","control","song","house","pack","shark","swing","flower","core","water","house","hour","stall","garden","stick","chamber","roots","house","bar","call","sheet","drill","room","guard","season","shot","beam","spring","brush","work","iron","bridge","work","ahead","plan","cloud","span","lamp","sale","office","field","stream","marker","line","point","season","screen","walk","pot","cycle","level","holder","rack","fabric","case","bottle","office","bar","light","session","room","call","block","seal","pad","house","fire","strip","support","pit","paint","worm","mix","zone","cabin","path","lift","bottle","shaft","pick","cook","gun","maker","polish","trail","operator","hill","stone","balance","shot","flow","wood","break","sign","wall","beach","cut","table","layer","candle","counter","line","bite","deposit","cover","event","model","image","check","drive","edge","pipe","shark","ring","seat","cover","block","mill","ladder","span","wheel","tree","sound","bloom","pack","road","knot","street","rack","game","show","code","shell","strength","road","tower","bomb","floor","line","thrower","trout","layer","mouse","badge","trick","line","softener","car","wall","softener","holder","case","factor","store","break","lamp","pad","season","vine","marker","painting","line","market","alarm","name","hill","light","weight","base","hill","packet","shot","pool","field","trail","shore","boat","ridge","board","key","line","rate","season","wheel","road","stone","drive","tool","beam","holder","patch","route","act","point","change","water","rod","stage","pit","trail","wheel","model","drop","chain","layer","bar","line","guard","task","lane","light","strip","dock","post","flame","photo","rain","mill","tile","ridge","grinder","tower","deck","fence","frame","life"];
// var forthwordlist = [	"front",	"fee",		"key",		"tag",		"bee",		"pipe",		"stop",		"tape",		"jack",		"space",	"graph",	"personality",	"table",	"plate",	"stone",	"zone",			"trap","point","pack","fair","squad","top","cut","form","down","party","train","strike","captain","panel","bird","key","ice","tank","dance","bed","value","bottle","plant","glass","holder","tool","figure","music","rock","party","stool","sign","music","bit","service","duty","ticket","put","balance","water","fire","bench","gate","deck","flow","start","ahead","cover","class","shade","price","hours","test","flow","stone","dance","blank","ticket","saver","through","holder","path","ground","ring","mount","softener","study","cap","chair","code","house","player","service","center","party","team","lock","party","pit","mall","beam","crew","brush","hole","match","defense","fever","finder","ticket","cap","light","pocket","stove","metal","space","remover","mix","badge","station","path","scale","caller","chart","carving","point","post","clock","house","line","runner","cake","wax","offer","graph","mark","slip","charge","planner","train","search","list","time","case","cleaner","bite","tone","belt","charge","letter","worker","rail","class","house","bark","wave","season","leader","map","work","light","mount","piece","time","word","shock","test","map","bell","squad","plan","cook","squad","line","cake","trap","number","shot","graph","sheet","wash","clock","sheet","ring","study","test","room","point","shade","lock","ticket","leaf","stone","brush","graph","stall","clock","tag","station","house","limit","line","climb","stamp","caller","table","test","mix","leave","ramp","trail","game","chain","graph","limit","ticket","house","map","wall","time","box","balance","ring","work","map","break","guard","order","wheel","holder","name","crew","mix","hub","train","zone","reaction","cake","stool","cook","duty","force","marker","house","mall","worker","office","thrower","frame","storm","worker","floor","trail","wheel","bell","chair","line","shop","jacket"];
// var fifthwordlist = [	"line",		"schedule",	"chain",	"team",		"sting",	"cleaner",	"sign",		"measure",	"hammer",	"bar",		"paper",	"test",			"cloth",	"number",	"age",		"defense",		"door","guard","leader","trade","goal","shelf","line","letter","town","favor","track","zone","chair","show","cage","note","cube","top","card","frame","chain","cap","food","ceiling","ring","box","eight","hall","slide","trick","sample","post","stand","rate","charge","station","booth","away","scale","wheel","drill","press","keeper","chair","chart","line","time","charge","room","tree","point","long","drive","rate","wall","floor","page","price","mode","gate","ring","finder","floor","tone","point","sheet","group","lock","lift","word","key","card","charge","stage","favor","spirit","step","trick","stop","walk","balance","chief","stroke","punch","point","line","pitch","fee","booth","lock","beam","watch","pipe","shop","bar","tool","tape","number","master","marker","reading","id","top","knife","guard","office","tower","party","cook","up","stand","seal","letter","paper","sheet","knot","rate","pad","station","party","price","keeper","study","spray","mark","shift","loop","card","head","strike","car","act","rules","chip","form","ticket","board","maker","flow","beam","point","work","keeper","search","wave","drive","maker","rope","leader","layout","book","car","dance","stand","door","plate","caller","paper","metal","station","tower","music","tone","group","drive","service","guard","tree","step","booth","pile","path","stroke","paper","holder","tower","line","master","key","line","cook","rate","duty","name","runner","score","match","form","access","marker","piece","store","paper","line","booth","rules","maker","clock","keeper","cutter","board","tone","bench","maker","room","duty","form","house","badge","tag","chief","match","cap","station","marker","time","stand","sample","booklet","station","field","stone","key","walk","strike","chair","squad","shop","drain","badge","lamp","mix","house","rope","lift","cook","keeper","pocket"];
// var sixthwordlist = [	"cook",		"change",	"link",		"spirit",	"operation","spray",	"language",	"step",		"toe",		"chart",	"bag",		"pilot",		"pattern",	"crunch",	"limit",	"system",		"frame","rail","board","route","keeper","life","dance","carrier","square","box","record","call","lift","time","match","pad","tray","hat","trick","shop","reaction","stone","chain","fan","tone","cutter","ball","pass","show","shot","size","office","alone","limit","card","master","worker","game","model","house","sergeant","release","role","lift","top","cook","zone","card","service","house","guard","shot","train","card","clock","plan","number","match","shift","code","leader","tool","lamp","shift","guard","metal","leader","step","ticket","search","chain","table","rate","name","bag","level","count","shot","sign","through","board","officer","count","line","guard","cook","perfect","schedule","worker","step","balance","tower","wrench","keeper","code","box","measure","plate","key","line","room","card","shelf","edge","rail","chair","bell","favor","book","hill","alone","stamp","carrier","plane","music","work","limit","lock","master","trick","match","net","group","bottle","sheet","worker","hole","reader","shot","zone","wash","break","committee","bag","letter","booth","game","space","chart","split","guard","bench","net","party","form","train","space","swing","board","grid","stand","wash","floor","mixer","frame","rack","id","plane","shop","master","guard","stand","shift","leader","time","charge","duty","bark","ladder","worker","driver","finder","count","weight","badge","bell","cook","code","chain","dance","booklet","limit","officer","plate","up","card","point","letter","code","stone","work","room","weight","dance","worker","committee","space","tower","net","blade","meeting","shift","press","space","service","station","letter","party","number","line","officer","point","lock","master","line","keeper","mixer","size","cover","master","test","path","chain","through","zone","lift","leader","keeper","pipe","number","shade","tape","party","swing","ticket","stove","badge","watch"];
// var lastwordlist = [	"book",		"order",	"cable",	"level",	"manual",	"bottle",	"barrier",	"ladder",	"ring",		"patterns",	"drop",		"episode",		"maker",	"time",		"line",		"check",		"shop","car","game","map","net","jacket","floor","bag","root","office","holder","center","ticket","keeper","point","lock","table","trick","shot","keeper","time","path","link","club","shift","blade","room","code","case","clock","chart","chair","complex","line","holder","key","shift","plan","citizen","party","major","valve","player","shaft","score","stove","marker","reader","counter","rules","duty","caller","station","trick","tower","layout","crunch","point","key","word","board","kit","light","worker","rail","shop","role","ladder","booth","party","store","runner","limit","tag","holder","ground","down","caller","maker","lane","game","badge","down","cutter","duty","booklet","score","board","shift","count","board","guard","set","role","word","cutter","step","rack","chain","dance","service","reader","life","case","car","lift","rope","box","stand","climb","complex","duty","bag","crash","stand","flow","line","step","key","shot","point","weight","leader","rack","metal","badge","punch","dock","caller","marker","station","room","chair","holder","carrier","worker","piece","bar","top","level","rail","press","weight","trick","letter","station","bar","dance","meeting","line","alone","station","plan","bowl","shop","mount","number","crash","keeper","key","duty","light","worker","role","keeper","rate","station","chip","rail","shift","seat","tool","down","scale","number","rope","stove","word","store","floor","cover","line","badge","rack","hill","reader","guard","head","word","path","flow","service","scale","floor","badge","chair","bar","bell","weight","edge","room","worker","release","bar","counter","master","head","favor","plate","cook","badge","guard","step","code","cook","net","bowl","chart","charge","key","score","finder","store","lane","marker","ticket","role","role","cleaner","plate","tree","measure","favor","dance","booth","pipe","number","tower"];
// var submitterlist = [	"","","","","","","","","Divya","Vidya","Kanishk","Div","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",];


var masterwordlist = [
    ["river", "stone", "cold", "front", "line", "cook", "book", ""],
    ["garden", "path", "finder", "fee", "schedule", "change", "order", ""],
    ["coffee", "break", "room", "key", "chain", "link", "cable", ""],
    ["market", "share", "price", "tag", "team", "spirit", "level", ""],
    ["harbor", "dock", "worker", "bee", "sting", "operation", "manual", ""],
    ["winter", "storm", "drain", "pipe", "cleaner", "spray", "bottle", ""],
    ["silver", "spoon", "rest", "stop", "sign", "language", "barrier", ""],
    ["forest", "trail", "mix", "tape", "measure", "step", "ladder", ""],
    ["party", "animal", "cracker", "jack", "hammer", "toe", "ring", "Divya"],
    ["black", "box", "office", "space", "bar", "chart", "patterns", "Vidya"],
    ["cotton", "candy", "bar", "graph", "paper", "bag", "drop", "Kanishk"],
    ["yellow", "banana", "split", "personality", "test", "pilot", "episode", "Divya"],
    ["ocean", "tide", "pool", "table", "cloth", "pattern", "maker", ""],
    ["music", "sheet", "metal", "plate", "number", "crunch", "time", ""],
    ["lucky", "stone", "cold", "blood", "group", "photo", "finish", "k.achu"],
    ["light", "weight", "lifting", "gear", "change", "over", "time", "gouri"],
    ["coffee", "table", "tennis", "match", "point", "break", "room", "h_ll"],
    ["desert", "wind", "mill", "stone", "age", "limit", "line", ""],
    ["morning", "dew", "drop", "zone", "defense", "system", "check", ""],
	["fire", "dance", "party", "popper", "bottle", "neck", "collar", "gouri"],
    ["traffic", "light", "speed", "trap", "door", "frame", "shop", ""],
    ["crystal", "clear", "view", "point", "guard", "rail", "car", ""],
    ["thunder", "clap", "back", "pack", "leader", "board", "game", ""],
    ["island", "nation", "state", "fair", "trade", "route", "map", ""],
    ["candle", "flame", "thrower", "squad", "goal", "keeper", "net", ""],
    ["rocket", "fuel", "tank", "top", "shelf", "life", "jacket", ""],
    ["family", "bond", "paper", "cut", "line", "dance", "floor", ""],
    ["summer", "heat", "wave", "form", "letter", "carrier", "bag", ""],
    ["cotton", "thread", "count", "down", "town", "square", "root", ""],
    ["marble", "statue", "garden", "party", "favor", "box", "office", ""],
    ["dragon", "scale", "model", "train", "track", "record", "holder", ""],
    ["pepper", "mill", "worker", "strike", "zone", "call", "center", ""],
    ["harbor", "seal", "team", "captain", "chair", "lift", "ticket", ""],
    ["riverbank", "erosion", "control", "panel", "show", "time", "keeper", ""],
    ["meadow", "lark", "song", "bird", "cage", "match", "point", ""],
    ["lantern", "light", "house", "key", "note", "pad", "lock", ""],
    ["timber", "wolf", "pack", "ice", "cube", "tray", "table", ""],
    ["coral", "reef", "shark", "tank", "top", "hat", "trick", ""],
    ["velvet", "rope", "swing", "dance", "card", "trick", "shot", ""],
    ["canyon", "wall", "flower", "bed", "frame", "shop", "keeper", ""],
    ["orchard", "apple", "core", "value", "chain", "reaction", "time", ""],
    ["glacier", "melt", "water", "bottle", "cap", "stone", "path", ""],
    ["prairie", "dog", "house", "plant", "food", "chain", "link", ""],
    ["summit", "peak", "hour", "glass", "ceiling", "fan", "club", ""],
    ["harborfront", "market", "stall", "holder", "ring", "tone", "shift", ""],
    ["compass", "rose", "garden", "tool", "box", "cutter", "blade", ""],
    ["lantern", "glow", "stick", "figure", "eight", "ball", "room", ""],
    ["canyon", "echo", "chamber", "music", "hall", "pass", "code", ""],
    ["meadow", "grass", "roots", "rock", "slide", "show", "case", ""],
    ["timber", "frame", "house", "party", "trick", "shot", "clock", ""],
    ["coral", "sand", "bar", "stool", "sample", "size", "chart", ""],
    ["velvet", "curtain", "call", "sign", "post", "office", "chair", ""],
    ["glacier", "ice", "sheet", "music", "stand", "alone", "complex", ""],
    ["prairie", "fire", "drill", "bit", "rate", "limit", "line", ""],
    ["summit", "meeting", "room", "service", "charge", "card", "holder", ""],
    ["compass", "point", "guard", "duty", "station", "master", "key", ""],
    ["lantern", "festival", "season", "ticket", "booth", "worker", "shift", ""],
    ["canyon", "rim", "shot", "put", "away", "game", "plan", ""],
    ["harbor", "light", "beam", "balance", "scale", "model", "citizen", ""],
    ["maple", "leaf", "spring", "water", "wheel", "house", "party", ""],
    ["copper", "wire", "brush", "fire", "drill", "sergeant", "major", ""],
    ["puzzle", "piece", "work", "bench", "press", "release", "valve", ""],
    ["shadow", "cast", "iron", "gate", "keeper", "role", "player", ""],
    ["signal", "tower", "bridge", "deck", "chair", "lift", "shaft", ""],
    ["berry", "patch", "work", "flow", "chart", "top", "score", ""],
    ["iron", "forge", "ahead", "start", "line", "cook", "stove", ""],
    ["canyon", "floor", "plan", "ahead", "time", "zone", "marker", ""],
    ["harbor", "mist", "cloud", "cover", "charge", "card", "reader", ""],
    ["falcon", "wing", "span", "class", "room", "service", "counter", ""],
    ["marble", "floor", "lamp", "shade", "tree", "house", "rules", ""],
    ["timber", "yard", "sale", "price", "point", "guard", "duty", ""],
    ["lantern", "post", "office", "hours", "long", "shot", "caller", ""],
    ["meadow", "bloom", "field", "test", "drive", "train", "station", ""],
    ["glacier", "runoff", "stream", "flow", "rate", "card", "trick", ""],
    ["prairie", "trail", "marker", "stone", "wall", "clock", "tower", ""],
    ["summit", "ridge", "line", "dance", "floor", "plan", "layout", ""],
    ["compass", "needle", "point", "blank", "page", "number", "crunch", ""],
    ["coral", "bloom", "season", "ticket", "price", "match", "point", ""],
    ["velvet", "touch", "screen", "saver", "mode", "shift", "key", ""],
    ["harborfront", "pier", "walk", "through", "gate", "code", "word", ""],
    ["riverbed", "clay", "pot", "holder", "ring", "leader", "board", ""],
    ["gardenia", "bloom", "cycle", "path", "finder", "tool", "kit", ""],
    ["coffee", "roast", "level", "ground", "floor", "lamp", "light", ""],
    ["market", "stall", "holder", "ring", "tone", "shift", "worker", ""],
    ["winter", "coat", "rack", "mount", "point", "guard", "rail", ""],
    ["silver", "lining", "fabric", "softener", "sheet", "metal", "shop", ""],
    ["forest", "edge", "case", "study", "group", "leader", "role", ""],
    ["ocean", "spray", "bottle", "cap", "lock", "step", "ladder", ""],
    ["music", "box", "office", "chair", "lift", "ticket", "booth", ""],
    ["desert", "sand", "bar", "code", "word", "search", "party", ""],
    ["morning", "star", "light", "house", "key", "chain", "store", ""],
    ["traffic", "jam", "session", "player", "card", "table", "runner", ""],
    ["crystal", "ball", "room", "service", "charge", "rate", "limit", ""],
    ["thunder", "roll", "call", "center", "stage", "name", "tag", ""],
    ["island", "breeze", "block", "party", "favor", "bag", "holder", ""],
    ["candle", "wax", "seal", "team", "spirit", "level", "ground", ""],
    ["rocket", "launch", "pad", "lock", "step", "count", "down", ""],
    ["family", "tree", "house", "party", "trick", "shot", "caller", ""],
    ["summer", "camp", "fire", "pit", "stop", "sign", "maker", ""],
    ["cotton", "candy", "strip", "mall", "walk", "through", "lane", ""],
    ["marble", "arch", "support", "beam", "balance", "board", "game", ""],
    ["dragon", "fire", "pit", "crew", "chief", "officer", "badge", ""],
    ["pepper", "spray", "paint", "brush", "stroke", "count", "down", ""],
    ["lantern", "glow", "worm", "hole", "punch", "line", "cutter", ""],
    ["canyon", "trail", "mix", "match", "point", "guard", "duty", ""],
    ["meadow", "grassland", "zone", "defense", "line", "cook", "booklet", ""],
    ["timber", "log", "cabin", "fever", "pitch", "perfect", "score", ""],
    ["coral", "stone", "path", "finder", "fee", "schedule", "board", ""],
    ["harbor", "crane", "lift", "ticket", "booth", "worker", "shift", ""],
    ["maple", "syrup", "bottle", "cap", "lock", "step", "count", ""],
    ["copper", "mine", "shaft", "light", "beam", "balance", "board", ""],
    ["puzzle", "lock", "pick", "pocket", "watch", "tower", "guard", ""],
    ["shadow", "line", "cook", "stove", "pipe", "wrench", "set", ""],
    ["signal", "flare", "gun", "metal", "shop", "keeper", "role", ""],
    ["berry", "smoothie", "maker", "space", "bar", "code", "word", ""],
    ["iron", "nail", "polish", "remover", "tool", "box", "cutter", ""],
    ["canyon", "ridge", "trail", "mix", "tape", "measure", "step", ""],
    ["harbor", "crane", "operator", "badge", "number", "plate", "rack", ""],
    ["falcon", "crest", "hill", "station", "master", "key", "chain", ""],
    ["marble", "quarry", "stone", "path", "marker", "line", "dance", ""],
    ["timber", "beam", "balance", "scale", "reading", "room", "service", ""],
    ["lantern", "hook", "shot", "caller", "id", "card", "reader", ""],
    ["meadow", "stream", "flow", "chart", "top", "shelf", "life", ""],
    ["glacier", "drift", "wood", "carving", "knife", "edge", "case", ""],
    ["prairie", "wind", "break", "point", "guard", "rail", "car", ""],
    ["summit", "trailhead", "sign", "post", "office", "chair", "lift", ""],
    ["compass", "bearing", "wall", "clock", "tower", "bell", "rope", ""],
    ["coral", "cove", "beach", "house", "party", "favor", "box", ""],
    ["velvet", "ribbon", "cut", "line", "cook", "book", "stand", ""],
    ["harborfront", "cafe", "table", "runner", "up", "hill", "climb", ""],
    ["riverbed", "silt", "layer", "cake", "stand", "alone", "complex", ""],
    ["gardenia", "scent", "candle", "wax", "seal", "stamp", "duty", ""],
    ["coffee", "bean", "counter", "offer", "letter", "carrier", "bag", ""],
    ["market", "trend", "line", "graph", "paper", "plane", "crash", ""],
    ["winter", "frost", "bite", "mark", "sheet", "music", "stand", ""],
    ["silver", "ore", "deposit", "slip", "knot", "work", "flow", ""],
    ["forest", "canopy", "cover", "charge", "rate", "limit", "line", ""],
    ["ocean", "current", "event", "planner", "pad", "lock", "step", ""],
    ["music", "scale", "model", "train", "station", "master", "key", ""],
    ["desert", "mirage", "image", "search", "party", "trick", "shot", ""],
    ["morning", "routine", "check", "list", "price", "match", "point", ""],
    ["traffic", "circle", "drive", "time", "keeper", "net", "weight", ""],
    ["crystal", "shard", "edge", "case", "study", "group", "leader", ""],
    ["thunder", "burst", "pipe", "cleaner", "spray", "bottle", "rack", ""],
    ["island", "reef", "shark", "bite", "mark", "sheet", "metal", ""],
    ["candle", "holder", "ring", "tone", "shift", "worker", "badge", ""],
    ["rocket", "booster", "seat", "belt", "loop", "hole", "punch", ""],
    ["family", "album", "cover", "charge", "card", "reader", "dock", ""],
    ["summer", "breeze", "block", "letter", "head", "shot", "caller", ""],
    ["cotton", "thread", "mill", "worker", "strike", "zone", "marker", ""],
    ["marble", "step", "ladder", "rail", "car", "wash", "station", ""],
    ["dragon", "wing", "span", "class", "act", "break", "room", ""],
    ["pepper", "grinder", "wheel", "house", "rules", "committee", "chair", ""],
    ["lantern", "shade", "tree", "bark", "chip", "bag", "holder", ""],
    ["canyon", "echo", "sound", "wave", "form", "letter", "carrier", ""],
    ["meadow", "larkspur", "bloom", "season", "ticket", "booth", "worker", ""],
    ["timber", "wolfhound", "pack", "leader", "board", "game", "piece", ""],
    ["coral", "bloomfield", "road", "map", "maker", "space", "bar", ""],
    ["harbor", "rope", "knot", "work", "flow", "chart", "top", ""],
    ["maple", "grove", "street", "light", "beam", "split", "level", ""],
    ["copper", "plate", "rack", "mount", "point", "guard", "rail", ""],
    ["puzzle", "board", "game", "piece", "work", "bench", "press", ""],
    ["shadow", "puppet", "show", "time", "keeper", "net", "weight", ""],
    ["signal", "jammer", "code", "word", "search", "party", "trick", ""],
    ["berry", "tart", "shell", "shock", "wave", "form", "letter", ""],
    ["iron", "grip", "strength", "test", "drive", "train", "station", ""],
    ["canyon", "bend", "road", "map", "maker", "space", "bar", ""],
    ["harbor", "watch", "tower", "bell", "rope", "swing", "dance", ""],
    ["falcon", "dive", "bomb", "squad", "leader", "board", "meeting", ""],
    ["marble", "tile", "floor", "plan", "layout", "grid", "line", ""],
    ["timber", "cut", "line", "cook", "book", "stand", "alone", ""],
    ["lantern", "flame", "thrower", "squad", "car", "wash", "station", ""],
    ["meadow", "brook", "trout", "line", "dance", "floor", "plan", ""],
    ["glacier", "crust", "layer", "cake", "stand", "mixer", "bowl", ""],
    ["prairie", "field", "mouse", "trap", "door", "frame", "shop", ""],
    ["summit", "crest", "badge", "number", "plate", "rack", "mount", ""],
    ["compass", "card", "trick", "shot", "caller", "id", "number", ""],
    ["coral", "branch", "line", "graph", "paper", "plane", "crash", ""],
    ["velvet", "fabric", "softener", "sheet", "metal", "shop", "keeper", ""],
    ["harborfront", "rail", "car", "wash", "station", "master", "key", ""],
    ["riverbed", "stonework", "wall", "clock", "tower", "guard", "duty", ""],
    ["gardenia", "petal", "softener", "sheet", "music", "stand", "light", ""],
    ["coffee", "mug", "holder", "ring", "tone", "shift", "worker", ""],
    ["market", "basket", "case", "study", "group", "leader", "role", ""],
    ["winter", "chill", "factor", "test", "drive", "time", "keeper", ""],
    ["silver", "chain", "store", "room", "service", "charge", "rate", ""],
    ["forest", "fire", "break", "point", "guard", "duty", "station", ""],
    ["ocean", "floor", "lamp", "shade", "tree", "bark", "chip", ""],
    ["music", "note", "pad", "lock", "step", "ladder", "rail", ""],
    ["desert", "bloom", "season", "ticket", "booth", "worker", "shift", ""],
    ["morning", "glory", "vine", "leaf", "pile", "driver", "seat", ""],
    ["traffic", "lane", "marker", "stone", "path", "finder", "tool", ""],
    ["crystal", "cave", "painting", "brush", "stroke", "count", "down", ""],
    ["thunder", "stormfront", "line", "graph", "paper", "weight", "scale", ""],
    ["island", "dockside", "market", "stall", "holder", "badge", "number", ""],
    ["candle", "smoke", "alarm", "clock", "tower", "bell", "rope", ""],
    ["rocket", "stage", "name", "tag", "line", "cook", "stove", ""],
    ["family", "crest", "hill", "station", "master", "code", "word", ""],
    ["summer", "solstice", "light", "house", "key", "chain", "store", ""],
    ["cotton", "bale", "weight", "limit", "line", "dance", "floor", ""],
    ["marble", "column", "base", "line", "cook", "booklet", "cover", ""],
    ["dragon", "crest", "hill", "climb", "rate", "limit", "line", ""],
    ["pepper", "seed", "packet", "stamp", "duty", "officer", "badge", ""],
    ["lantern", "hook", "shot", "caller", "name", "plate", "rack", ""],
    ["canyon", "rimstone", "pool", "table", "runner", "up", "hill", ""],
    ["meadow", "grasshopper", "field", "test", "score", "card", "reader", ""],
    ["timber", "sawdust", "trail", "mix", "match", "point", "guard", ""],
    ["coral", "lagoon", "shore", "leave", "form", "letter", "head", ""],
    ["harbor", "pilot", "boat", "ramp", "access", "code", "word", ""],
    ["maple", "timberline", "ridge", "trail", "marker", "stone", "path", ""],
    ["copper", "circuit", "board", "game", "piece", "work", "flow", ""],
    ["puzzle", "master", "key", "chain", "store", "room", "service", ""],
    ["shadow", "ridge", "line", "graph", "paper", "weight", "scale", ""],
    ["signal", "pulse", "rate", "limit", "line", "dance", "floor", ""],
    ["berry", "harvest", "season", "ticket", "booth", "worker", "badge", ""],
    ["iron", "alloy", "wheel", "house", "rules", "committee", "chair", ""],
    ["canyon", "switchback", "road", "map", "maker", "space", "bar", ""],
    ["harbor", "jetty", "stone", "wall", "clock", "tower", "bell", ""],
    ["falcon", "crestline", "drive", "time", "keeper", "net", "weight", ""],
    ["marble", "quarryman", "tool", "box", "cutter", "blade", "edge", ""],
    ["timber", "ridgepole", "beam", "balance", "board", "meeting", "room", ""],
    ["lantern", "wick", "holder", "ring", "tone", "shift", "worker", ""],
    ["meadow", "clover", "patch", "work", "bench", "press", "release", ""],
    ["glacier", "icefall", "route", "map", "maker", "space", "bar", ""],
    ["prairie", "homestead", "act", "break", "room", "service", "counter", ""],
    ["summit", "outlook", "point", "guard", "duty", "station", "master", ""],
    ["compass", "heading", "change", "order", "form", "letter", "head", ""],
    ["coral", "shoal", "water", "wheel", "house", "party", "favor", ""],
    ["velvet", "drapery", "rod", "holder", "badge", "number", "plate", ""],
    ["harborfront", "pavilion", "stage", "name", "tag", "line", "cook", ""],
    ["riverbed", "gravel", "pit", "crew", "chief", "officer", "badge", ""],
    ["gardenia", "blossom", "trail", "mix", "match", "point", "guard", ""],
    ["coffee", "grinder", "wheel", "hub", "cap", "lock", "step", ""],
    ["market", "forecast", "model", "train", "station", "master", "code", ""],
    ["winter", "icicle", "drop", "zone", "marker", "line", "cook", ""],
    ["silver", "pendant", "chain", "reaction", "time", "keeper", "net", ""],
    ["forest", "understory", "layer", "cake", "stand", "mixer", "bowl", ""],
    ["ocean", "breaker", "bar", "stool", "sample", "size", "chart", ""],
    ["music", "harmony", "line", "cook", "booklet", "cover", "charge", ""],
    ["desert", "outpost", "guard", "duty", "station", "master", "key", ""],
    ["morning", "routine", "task", "force", "field", "test", "score", ""],
    ["traffic", "merge", "lane", "marker", "stone", "path", "finder", ""],
    ["crystal", "prism", "light", "house", "key", "chain", "store", ""],
    ["thunder", "rumble", "strip", "mall", "walk", "through", "lane", ""],
    ["island", "ferry", "dock", "worker", "strike", "zone", "marker", ""],
    ["candle", "lantern", "post", "office", "chair", "lift", "ticket", ""],
    ["rocket", "nozzle", "flame", "thrower", "squad", "leader", "role", ""],
    ["family", "reunion", "photo", "frame", "shop", "keeper", "role", ""],
    ["summer", "monsoon", "rain", "storm", "drain", "pipe", "cleaner", ""],
    ["cotton", "textile", "mill", "worker", "badge", "number", "plate", ""],
    ["marble", "mosaic", "tile", "floor", "lamp", "shade", "tree", ""],
    ["dragon", "crestfall", "ridge", "trail", "mix", "tape", "measure", ""],
    ["pepper", "kernel", "grinder", "wheel", "house", "party", "favor", ""],
    ["lantern", "signal", "tower", "bell", "rope", "swing", "dance", ""],
    ["canyon", "overlook", "deck", "chair", "lift", "ticket", "booth", ""],
    ["meadow", "pasture", "fence", "line", "cook", "stove", "pipe", ""],
    ["timber", "outbuilding", "frame", "shop", "keeper", "badge", "number", ""],
    ["coral", "tidepool", "life", "jacket", "pocket", "watch", "tower", ""]
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
var index = days - 1;
var wordone = masterwordlist[index][0].toUpperCase();
var wordtwo = masterwordlist[index][1].toUpperCase();
var wordthree = masterwordlist[index][2].toUpperCase();
var wordfour = masterwordlist[index][3].toUpperCase();
var wordfive = masterwordlist[index][4].toUpperCase();
var wordsix = masterwordlist[index][5].toUpperCase();
var wordlast = masterwordlist[index][6].toUpperCase();
// if (wordone.length > 8 || wordtwo.length > 8 || wordthree.length > 8 || wordfour.length > 8 || wordfive.length > 8 || wordsix.length > 8 || wordlast.length > 8) {
    // const box1 = document.getElementById("boardfirst");
    // box1.style.setProperty("padding-left", "10px");
	// box1.style.setProperty("padding-top", "10px");	
	// box1.style.setProperty("padding-bottom", "4px");	
    // const box2 = document.getElementById("boardsecond");
    // box2.style.setProperty("padding-left", "10px");
	// box2.style.setProperty("padding-top", "4px");	
	// box2.style.setProperty("padding-bottom", "4px");	
    // const box3 = document.getElementById("boardthird");
    // box3.style.setProperty("padding-left", "10px");
	// box3.style.setProperty("padding-top", "4px");	
	// box3.style.setProperty("padding-bottom", "4px");	
    // const box4 = document.getElementById("boardforth");
    // box4.style.setProperty("padding-left", "10px");
	// box4.style.setProperty("padding-top", "4px");	
	// box4.style.setProperty("padding-bottom", "4px");	
    // const box5 = document.getElementById("boardfifth");
    // box5.style.setProperty("padding-left", "10px");
	// box5.style.setProperty("padding-top", "4px");	
	// box5.style.setProperty("padding-bottom", "4px");	
    // const box6 = document.getElementById("boardsixth");
    // box6.style.setProperty("padding-left", "10px");
	// box6.style.setProperty("padding-top", "4px");	
	// box6.style.setProperty("padding-bottom", "4px");	
    // const box7 = document.getElementById("boardlast");
    // box7.style.setProperty("padding-left", "10px");
	// box7.style.setProperty("padding-top", "4px");
	// const boxes = document.querySelectorAll(".vertical-glow"); boxes.forEach(box => { box.style.setProperty("margin-left", "18px"); });	
// }

var word = (wordone + wordtwo + wordthree + wordfour + wordfive + wordsix + wordlast).toUpperCase();
var solveword = (wordtwo + wordthree + wordfour + wordfive + wordsix).toUpperCase();
if (localStorage.vowelcount == 0) {
    for (let i = 0; i < solveword.length; i++) {
        if (solveword[i] == "A" || solveword[i] == "E" || solveword[i] == "I" || solveword[i] == "O" || solveword[i] == "U") {
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
if (localStorage.vowelactive != 1) {
    document.getElementById("answer").style.color = "lightgray";
    // document.getElementById("answer").innerText = "VOWELS ARE DISABLED TILL ALL OTHER LETTERS ARE FOUND.";
	updateAnswer("VOWELS ARE DISABLED TILL ALL OTHER LETTERS ARE FOUND.");
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

function playArchive() {
    const div = document.getElementById("archiveboard");
    div.innerHTML = ""; // Clears all child elements	
    for (let q = days - 1; q >= 1; q--) {
        // <span id="0-0" class="tile">P</span>
        let archivetile = document.createElement("span");
        archivetile.id = "archtile-" + q.toString();
        archivetile.classList.add("archivetile");
        archivetile.innerText = "Day " + q;
		if ((localStorage.getItem('gameovercl' + q) == "1")) {
            if ((localStorage.getItem('gamestatcl' + q) == "1")) {
                archivetile.classList.add("correctarch");
            } else if ((localStorage.getItem('gamestatcl' + q) == "0")){
                archivetile.classList.add("failedarch");
            } else if ((localStorage.getItem('gamestatcl' + q) === null)){
                archivetile.classList.add("correctarch");
			}
		} 
		else if ((localStorage.getItem('archovercl' + q) == "1")) {
				if ((localStorage.getItem('archstatcl' + q) == "1")) {
					archivetile.classList.add("correctarch");
				} else {
					archivetile.classList.add("failedarch");
				}
        }
        const link = document.createElement("a");
        link.href = `archive.html?q=${q}`;
        link.target = "_blank"; // ← opens in a new tab/window
        link.appendChild(archivetile);
        document.getElementById("archiveboard").appendChild(link);
    }
}

function modalhide() {
    document.getElementById("boardfirst").style.visibility = "hidden";
    document.getElementById("boardsecond").style.visibility = "hidden";
    document.getElementById("boardthird").style.visibility = "hidden";
    document.getElementById("boardforth").style.visibility = "hidden";
    document.getElementById("boardfifth").style.visibility = "hidden";
    document.getElementById("boardsixth").style.visibility = "hidden";
    document.getElementById("boardlast").style.visibility = "hidden";
    // if(localStorage.clhardmode == 1){
    document.getElementById("momentum-bar-container").style.display = "none";
    // }
    const rows = document.getElementsByClassName("keyboard-row");
    for (let row of rows) {
        row.style.visibility = "hidden";
    }
    const connector = document.getElementsByClassName("vertical-glow");
    for (let row of connector) {
        row.style.visibility = "hidden";
    }	
    document.getElementById("toggle-row").style.visibility = "hidden";
	document.getElementById("answer").style.visibility = "hidden";
}


function modalshow() {
    document.getElementById("boardfirst").style.visibility = "visible";
    document.getElementById("boardsecond").style.visibility = "visible";
    document.getElementById("boardthird").style.visibility = "visible";
    document.getElementById("boardforth").style.visibility = "visible";
    document.getElementById("boardfifth").style.visibility = "visible";
    document.getElementById("boardsixth").style.visibility = "visible";
    document.getElementById("boardlast").style.visibility = "visible";
    if (localStorage.clhardmode == 1) {
        if (localStorage.getItem('gameovercl' + days) == "1") {
            document.getElementById("momentum-counter").innerText = "60";
        }
        document.getElementById("momentum-bar-container").style.display = "block";
    }
    const rows = document.getElementsByClassName("keyboard-row");
    for (let row of rows) {
        row.style.visibility = "visible";
    }
    const connector = document.getElementsByClassName("vertical-glow");
    for (let row of connector) {
        row.style.visibility = "visible";
    }	
    document.getElementById("toggle-row").style.visibility = "visible";
	document.getElementById("answer").style.visibility = "visible";
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
        startMomentumTimer(); // start a new cycle
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
    if (!gameOver) {
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
        case 0:
            localStorage.cllives = "🔴🔴🔴🔴🔴";
            break;
        case 1:
            localStorage.cllives = "🔴🔴🔴🔴";
            // document.getElementById("answer").innerText = "TIME UP - FIRST LIFE LOST!"
			updateAnswer("TIME UP - FIRST LIFE LOST!");
            break;
        case 2:
            localStorage.cllives = "🔴🔴🔴";
            // document.getElementById("answer").innerText = "TIME UP - SECOND LIFE LOST!"
			updateAnswer("TIME UP - SECOND LIFE LOST!");
            break;
        case 3:
            localStorage.cllives = "🔴🔴";
            // document.getElementById("answer").innerText = "TIME UP - THIRD LIFE LOST!"
			updateAnswer("TIME UP - THIRD LIFE LOST!");
            break;
        case 4:
            localStorage.cllives = "🔴";
            // document.getElementById("answer").innerText = "TIME UP - LAST LIFE ALERT!"
			updateAnswer("TIME UP - LAST LIFE ALERT!");
            setTimeout(FinalClue, 1500);
            // Offer star-for-life trade when only 1 life remains
			const today = new Date().toDateString();
            if (Number(localStorage.cllivescnt) == 4 &&
                Number(localStorage.totalclstars) >= 2 &&
                localStorage.cltradeoffered !== today) {
                localStorage.cltradeoffered = today; // prevent repeat offers
                openLifeTradeModal();
            }
            break;
            // case 5: localStorage.cllives = "⚠️";
            // 	document.getElementById("answer").innerText = "LAST LIFE ALERT!"
            // 	setTimeout(FinalClue, 500);	
            // 	break;
        case 5:
            localStorage.cllives = "❌❌❌❌❌";
            break;
    }

    document.getElementById("lives").innerText = localStorage.cllives;
    document.getElementById("lives").classList.add("blink");
    setTimeout(removeblink, 3000);



    if (Number(localStorage.cllivescnt == 5)) {
        for (let i = 0; i < wordonewidth; i++) {
            let currTile = document.getElementById("1" + '-' + i);
            currTile.innerText = wordone[i];
            currTile.classList.remove("poptile", "correct");
            // currTile.classList.add("failed", "animated");
        }
        for (let i = 0; i < wordtwowidth; i++) {
            let currTile = document.getElementById("2" + '-' + i);
            currTile.innerText = wordtwo[i];
            currTile.classList.remove("poptile", "correct", "mystery", "flash2","popanswer");
            currTile.classList.add("failed", "animated");
        }
        for (let i = 0; i < wordthreewidth; i++) {
            let currTile = document.getElementById("3" + '-' + i);
            currTile.innerText = wordthree[i];
            currTile.classList.remove("poptile", "correct", "mystery", "flash2","popanswer");
            currTile.classList.add("failed", "animated");
        }
        for (let i = 0; i < wordfourwidth; i++) {
            let currTile = document.getElementById("4" + '-' + i);
            currTile.innerText = wordfour[i];
            currTile.classList.remove("poptile", "correct", "mystery", "flash2","popanswer");
            currTile.classList.add("failed", "animated");
        }
        for (let i = 0; i < wordfivewidth; i++) {
            let currTile = document.getElementById("5" + '-' + i);
            currTile.innerText = wordfive[i];
            currTile.classList.remove("poptile", "correct", "mystery", "flash2","popanswer");
            currTile.classList.add("failed", "animated");
        }
        for (let i = 0; i < wordsixwidth; i++) {
            let currTile = document.getElementById("6" + '-' + i);
            currTile.innerText = wordsix[i];
            currTile.classList.remove("poptile", "correct", "mystery", "flash2","popanswer");
            currTile.classList.add("failed", "animated");
        }
        for (let i = 0; i < wordlastwidth; i++) {
            let currTile = document.getElementById("7" + '-' + i);
            currTile.innerText = wordlast[i];
            currTile.classList.remove("poptile", "correct");
            // currTile.classList.add("failed", "animated");
        }
        gameOver = true;
        document.getElementById("toggle-row").style.display = "none";
        disableKeys("BCDFGHJKLMNPQRSTVWXYZ".split("")); // consonants
        disableKeys(["A", "E", "I", "O", "U"]); // vowels
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
        document.getElementById("answer").style.color = "lightgray";
		updateAnswer("GAME OVER! OUT OF LIVES.");
        localStorage.setItem(('gameovercl' + days), 1);
		localStorage.setItem(('gamestatcl' + days), 0);
        if (localStorage.getItem('gameovercl' + days) == "1") {
            document.querySelectorAll('span[id*="-"].disabled').forEach(tile => {
                tile.classList.remove('disabled');
            });
        }
        localStorage.totalclplayed = Number(localStorage.totalclplayed) + 1;
		localStorage.monthclplayed = Number(localStorage.monthclplayed) + 1;
        localStorage.totalclstreak = 0;
        SetTier();
        var winpct = localStorage.totalclplayed > 0 ?
            Math.round(localStorage.totalclwins / localStorage.totalclplayed * 100) :
            0;
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
            legend: {
                display: false
            },
            title: {
                display: false,
                text: "⭐ STAR DISTRIBUTION ⭐"
            }
        }
    });
}

window.onload = function() {
	initMonthlyStats();
    intialize();
    UpdateChart();
}

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
        refreshArchiveModal();
    }
});


function refreshArchiveModal() {
    const modal = document.getElementById("pastmodal");
    if (!modal || !modal.classList.contains("active")) return;

    const board = document.getElementById("archiveboard");
    if (!board) return;

    // Select all archive tiles by their class
    const tiles = board.querySelectorAll("span.archivetile");

    tiles.forEach(tile => {
        const q = tile.id.replace("archtile-", ""); // extract day number

        // Clear old classes
        tile.classList.remove("correctarch", "failedarch");

        // Read saved state
        const over1 = localStorage.getItem("archovercl" + q);
        const stat1 = localStorage.getItem("archstatcl" + q);
        const over2 = localStorage.getItem("gameovercl" + q);
        const stat2 = localStorage.getItem("gamestatcl" + q);
        // Apply new state
        if (over2 === "1") {
            if (stat2 === "0") {
                tile.classList.add("failedarch");
            } else {
                tile.classList.add("correctarch");
            }
        }else if (over1 === "1") {
            if (stat1 === "1") {
                tile.classList.add("correctarch");
            } else {
                tile.classList.add("failedarch");
            }
        }
    });
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
    if (localStorage.clgamestarted == 1) {
        // if (localStorage.clhardmode ==1){	
        document.getElementById("toggle-row").style.display = "none";
    }
    document.getElementById("momentum-bar-container").style.display = "none";
    // if ((localStorage.clhardmode == 1) && (!localStorage.getItem('gameovercl' + days))){
    if (localStorage.clhardmode == 1) {
        restoreMomentumTimer();
        document.getElementById("momentum-bar-container").style.display = "block";
    }
    if (Number(localStorage.clcorrect) == 0) {
        localStorage.clcorrect = wordonewidth + wordlastwidth;
    }
    let ele = document.getElementById("daycount");
    ele.innerHTML += (days);
    if (masterwordlist[index][7] != "") {
        let ele1 = document.getElementById("submitter");
        ele1.innerHTML += "Submitted By " + masterwordlist[index][7];
        // ele1.classList.add("flash2");
    }
	// if(days == 17){
        // let ele1 = document.getElementById("submitter");
        // ele1.innerHTML = '<a href="https://www.canucklegame.ca/" target="_blank"><strong style="color:red; font-size:24px;"><u>CANUCKLE</strong></u><strong style="color:white; font-size:24px;"> EDITION</strong></a>';		
		// ele1.classList.add("flash2");
	// }
	

    /* 	document.getElementById("pzlhdr").style.display = "none";
    	document.getElementById("pzl").style.display = "none"; */
    document.getElementById("bbhdr").style.display = "none";
    document.getElementById("bb").style.display = "none";
    document.getElementById("HTMLButton").style.display = "none";
    document.getElementById("wabutton").style.display = "none";
    document.getElementById("Rafflebutton").style.display = "none";
	// document.getElementById("top-resources").style.display = "block";
    // document.getElementById("Archivebutton").style.display = "none";
    // document.getElementById("submission").style.display = "none";
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
        if (wordone.length > 9 || wordtwo.length > 9 || wordthree.length > 9 || wordfour.length > 9 || wordfive.length > 9 || wordsix.length > 9 || wordlast.length > 9) {
            tile.classList.add("tilesmall");
        } else {
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
        if (wordtwo[c] == "A" || wordtwo[c] == "E" || wordtwo[c] == "I" || wordtwo[c] == "O" || wordtwo[c] == "U") {
            if (wordone.length > 9 || wordtwo.length > 9 || wordthree.length > 9 || wordfour.length > 9 || wordfive.length > 9 || wordsix.length > 9 || wordlast.length > 9) {
                tile.classList.add("voweltilesmall", "disabled");
            } else {
                tile.classList.add("voweltile", "disabled");
            }
            // tile.innerText = "🔒";
        } else {
            if (wordone.length > 9 || wordtwo.length > 9 || wordthree.length > 9 || wordfour.length > 9 || wordfive.length > 9 || wordsix.length > 9 || wordlast.length > 9) {
                tile.classList.add("tilesmall");
            } else {
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
        if (wordthree[c] == "A" || wordthree[c] == "E" || wordthree[c] == "I" || wordthree[c] == "O" || wordthree[c] == "U") {
            if (wordone.length > 9 || wordtwo.length > 9 || wordthree.length > 9 || wordfour.length > 9 || wordfive.length > 9 || wordsix.length > 9 || wordlast.length > 9) {
                tile.classList.add("voweltilesmall", "disabled");
            } else {
                tile.classList.add("voweltile", "disabled");
            }
            // tile.innerText = "🔒";
        } else {
            if (wordone.length > 9 || wordtwo.length > 9 || wordthree.length > 9 || wordfour.length > 9 || wordfive.length > 9 || wordsix.length > 9 || wordlast.length > 9) {
                tile.classList.add("tilesmall");
            } else {
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
        if (wordfour[c] == "A" || wordfour[c] == "E" || wordfour[c] == "I" || wordfour[c] == "O" || wordfour[c] == "U") {
            if (wordone.length > 9 || wordtwo.length > 9 || wordthree.length > 9 || wordfour.length > 9 || wordfive.length > 9 || wordsix.length > 9 || wordlast.length > 9) {
                tile.classList.add("voweltilesmall", "disabled");
            } else {
                tile.classList.add("voweltile", "disabled");
            }
            // tile.innerText = "🔒";
        } else {
            if (wordone.length > 9 || wordtwo.length > 9 || wordthree.length > 9 || wordfour.length > 9 || wordfive.length > 9 || wordsix.length > 9 || wordlast.length > 9) {
                tile.classList.add("tilesmall");
            } else {
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
        if (wordfive[c] == "A" || wordfive[c] == "E" || wordfive[c] == "I" || wordfive[c] == "O" || wordfive[c] == "U") {
            if (wordone.length > 9 || wordtwo.length > 9 || wordthree.length > 9 || wordfour.length > 9 || wordfive.length > 9 || wordsix.length > 9 || wordlast.length > 9) {
                tile.classList.add("voweltilesmall", "disabled");
            } else {
                tile.classList.add("voweltile", "disabled");
            }
            // tile.innerText = "🔒";
        } else {
            if (wordone.length > 9 || wordtwo.length > 9 || wordthree.length > 9 || wordfour.length > 9 || wordfive.length > 9 || wordsix.length > 9 || wordlast.length > 9) {
                tile.classList.add("tilesmall");
            } else {
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
        if (wordsix[c] == "A" || wordsix[c] == "E" || wordsix[c] == "I" || wordsix[c] == "O" || wordsix[c] == "U") {
            if (wordone.length > 9 || wordtwo.length > 9 || wordthree.length > 9 || wordfour.length > 9 || wordfive.length > 9 || wordsix.length > 9 || wordlast.length > 9) {
                tile.classList.add("voweltilesmall", "disabled");
            } else {
                tile.classList.add("voweltile", "disabled");
            }
            // tile.innerText = "🔒";
        } else {
            if (wordone.length > 9 || wordtwo.length > 9 || wordthree.length > 9 || wordfour.length > 9 || wordfive.length > 9 || wordsix.length > 9 || wordlast.length > 9) {
                tile.classList.add("tilesmall");
            } else {
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
        if (wordone.length > 9 || wordtwo.length > 9 || wordthree.length > 9 || wordfour.length > 9 || wordfive.length > 9 || wordsix.length > 9 || wordlast.length > 9) {
            tile.classList.add("tilesmall");
        } else {
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

    if (localStorage.getItem('gameovercl' + days) == "1") {
        document.querySelectorAll('span[id*="-"].disabled').forEach(tile => {
            tile.classList.remove('disabled');
        });
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
            } else if (key == "⌫") {
                keyTile.id = "Backspace";
            } else if ("A" <= key && key <= "Z") {
                keyTile.id = "Key" + key; // "Key" + "A";
            }

            keyTile.addEventListener("click", processKey);

            if (key == "⏎" || key == "⌫") {
                keyTile.classList.add("enter-key-tile");
            } else {
                keyTile.classList.add("key-tile");
            }
            keyboardRow.appendChild(keyTile);
        }
        document.body.appendChild(keyboardRow);
    }
    if (localStorage.vowelactive == 0) {
        document.getElementById("KeyA").classList.add("disabled", "key-tile-disabled");
        document.getElementById("KeyE").classList.add("disabled", "key-tile-disabled");
        document.getElementById("KeyI").classList.add("disabled", "key-tile-disabled");
        document.getElementById("KeyO").classList.add("disabled", "key-tile-disabled");
        document.getElementById("KeyU").classList.add("disabled", "key-tile-disabled");
    }
    // Listen for Key Press
    document.addEventListener("keyup", (e) => {
        if ("KeyA" <= e.code && e.code <= "KeyZ") {
            if (!document.getElementById(e.code).classList.contains("disabled")) {
                processInput(e);
            }
        }
    })
    SetTier();
    var winpct = localStorage.totalclplayed > 0 ?
        Math.round(localStorage.totalclwins / localStorage.totalclplayed * 100) :
        0;
    document.getElementById(11).innerText = "PLAYED: " + localStorage.totalclplayed;
    document.getElementById(12).innerText = "WIN %: " + winpct;
    document.getElementById(13).innerText = "STREAK: " + localStorage.totalclstreak + tiericon;
    document.getElementById(14).innerText = "STARS: " + localStorage.totalclstars;

    //Current Day Game Over
    if (localStorage.getItem('gameovercl' + days) == "1") {
        if (localStorage.gameclwon == 1) {
            switch (Number(localStorage.clstarscnt)) {
                case 0:
                    color0 = "green";
                    break;
                case 1:
                    color1 = "green";
                    break;
                case 2:
                    color2 = "green";
                    break;
                case 3:
                    color3 = "green";
                    break;
                case 4:
                    color4 = "green";
                    break;
                case 5:
                    color5 = "green";
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
                currTile.classList.remove("poptile","popanswer");
                currTile.classList.add("animated", "correct");
            }
            for (let i = 0; i < wordthreewidth; i++) {
                let currTile = document.getElementById("3" + '-' + i);
                currTile.innerText = wordthree[i];
                currTile.classList.remove("poptile","popanswer");
                currTile.classList.add("animated", "correct");
            }
            for (let i = 0; i < wordfourwidth; i++) {
                let currTile = document.getElementById("4" + '-' + i);
                currTile.innerText = wordfour[i];
                currTile.classList.remove("poptile","popanswer");
                currTile.classList.add("animated", "correct");
            }
            for (let i = 0; i < wordfivewidth; i++) {
                let currTile = document.getElementById("5" + '-' + i);
                currTile.innerText = wordfive[i];
                currTile.classList.remove("poptile","popanswer");
                currTile.classList.add("animated", "correct");
            }
            for (let i = 0; i < wordsixwidth; i++) {
                let currTile = document.getElementById("6" + '-' + i);
                currTile.innerText = wordsix[i];
                currTile.classList.remove("poptile","popanswer");
                currTile.classList.add("animated", "correct");
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


            if (Number(localStorage.clstarscnt) > 0) {
                let msg = "";

                if (localStorage.clstarscnt === "1") {
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
                for (i = 0; i < 5; i++) {
                    templives = templives.replace("🔴", "⭐");
                }
                document.getElementById("lives").innerText = templives;
                if (Number(localStorage.clstarscnt) != 0) {
                    // document.getElementById("lives").classList.add("animated");
                }
            }
        } else {
            colorx = "green";
            for (let i = 0; i < wordonewidth; i++) {
                let currTile = document.getElementById("1" + '-' + i);
                currTile.innerText = wordone[i];
                currTile.classList.remove("poptile", "correct");
                // currTile.classList.add("failed", "animated");
            }
            for (let i = 0; i < wordtwowidth; i++) {
                let currTile = document.getElementById("2" + '-' + i);
                currTile.innerText = wordtwo[i];
                currTile.classList.remove("poptile", "correct", "mystery", "flash2", "popanswer");
                currTile.classList.add("failed", "animated");
            }
            for (let i = 0; i < wordthreewidth; i++) {
                let currTile = document.getElementById("3" + '-' + i);
                currTile.innerText = wordthree[i];
                currTile.classList.remove("poptile", "correct", "mystery", "flash2", "popanswer");
                currTile.classList.add("failed", "animated");
            }
            for (let i = 0; i < wordfourwidth; i++) {
                let currTile = document.getElementById("4" + '-' + i);
                currTile.innerText = wordfour[i];
                currTile.classList.remove("poptile", "correct", "mystery", "flash2", "popanswer");
                currTile.classList.add("failed", "animated");
            }
            for (let i = 0; i < wordfivewidth; i++) {
                let currTile = document.getElementById("5" + '-' + i);
                currTile.innerText = wordfive[i];
                currTile.classList.remove("poptile", "correct", "mystery", "flash2", "popanswer");
                currTile.classList.add("failed", "animated");
            }
            for (let i = 0; i < wordsixwidth; i++) {
                let currTile = document.getElementById("6" + '-' + i);
                currTile.innerText = wordsix[i];
                currTile.classList.remove("poptile", "correct", "mystery", "flash2", "popanswer");
                currTile.classList.add("failed", "animated");
            }
            for (let i = 0; i < wordlastwidth; i++) {
                let currTile = document.getElementById("7" + '-' + i);
                currTile.innerText = wordlast[i];
                currTile.classList.remove("poptile", "correct");
                // currTile.classList.add("failed", "animated");
            }

            document.getElementById("answer").style.color = "lightgray";
            document.getElementById("answer").innerText = "GAME OVER! OUT OF LIVES.";
        }
        gameOver = true;
        document.getElementById("toggle-row").style.display = "none";
        document.getElementById("KeyA").classList.add("key-tile-disabled");
        document.getElementById("KeyE").classList.add("key-tile-disabled");
        document.getElementById("KeyI").classList.add("key-tile-disabled");
        document.getElementById("KeyO").classList.add("key-tile-disabled");
        document.getElementById("KeyU").classList.add("key-tile-disabled");
        disableKeys(["A", "E", "I", "O", "U"]); // vowels
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
        if (localStorage.clgamestarted == 1) {
            document.getElementById("toggle-row").style.display = "none";
        }
        if (localStorage.vowelactive == 1) {
            disableKeys("BCDFGHJKLMNPQRSTVWXYZ".split("")); // consonants
            document.getElementById("KeyA").classList.add("key-tile-enabled");
            document.getElementById("KeyE").classList.add("key-tile-enabled");
            document.getElementById("KeyI").classList.add("key-tile-enabled");
            document.getElementById("KeyO").classList.add("key-tile-enabled");
            document.getElementById("KeyU").classList.add("key-tile-enabled");
            document.querySelectorAll('span[id*="-"].disabled').forEach(tile => {
                tile.classList.remove('disabled');
            });
        }
        var disabled = JSON.parse(localStorage.getItem("cldisabledkey"));
        for (let i = 0; i < disabled.length; i++) {
            document.getElementById("Key" + disabled[i]).classList.add("disabled");
        }
        if (localStorage.clwordone != "") {
            for (let i = 0; i < wordonewidth; i++) {
                let currTile = document.getElementById("1" + '-' + i);
                if (localStorage.clwordone[i] == "?") {
                    currTile.innerText = "";
                } else if (localStorage.clwordone[i] != "") {
                    currTile.innerText = localStorage.clwordone[i];
                    currTile.classList.add("correct");
                }
            }
        }
        if (localStorage.clwordtwo != "") {
            let chars = Array.from(localStorage.clwordtwo);
            for (let i = 0; i < wordtwowidth; i++) {
                let currTile = document.getElementById(`2-${i}`);
                let ch = chars[i];

                if (ch === "?" || ch === "🔓") {
                    currTile.innerText = "";
                } else if (ch) {
                    currTile.innerText = ch;

                    if (ch === "❓") {
                        currTile.classList.add("mystery");
                    } else if (ch === "🔒") {
                        currTile.classList.add("disabled");
                    } else {
                        currTile.classList.add("correct");
                    }
                }
            }
        }
        if (localStorage.clwordthree != "") {
            let chars = Array.from(localStorage.clwordthree);
            for (let i = 0; i < wordthreewidth; i++) {
                let currTile = document.getElementById(`3-${i}`);
                let ch = chars[i];

                if (ch === "?" || ch === "🔓") {
                    currTile.innerText = "";
                } else if (ch) {
                    currTile.innerText = ch;

                    if (ch === "❓") {
                        currTile.classList.add("mystery");
                    } else if (ch === "🔒") {
                        currTile.classList.add("disabled");
                    } else {
                        currTile.classList.add("correct");
                    }
                }
            }
        }
        if (localStorage.clwordfour != "") {
            let chars = Array.from(localStorage.clwordfour);
            for (let i = 0; i < wordfourwidth; i++) {
                let currTile = document.getElementById(`4-${i}`);
                let ch = chars[i];

                if (ch === "?" || ch === "🔓") {
                    currTile.innerText = "";
                } else if (ch) {
                    currTile.innerText = ch;

                    if (ch === "❓") {
                        currTile.classList.add("mystery");
                    } else if (ch === "🔒") {
                        currTile.classList.add("disabled");
                    } else {
                        currTile.classList.add("correct");
                    }
                }
            }
        }
        if (localStorage.clwordfive != "") {
            let chars = Array.from(localStorage.clwordfive);
            for (let i = 0; i < wordfivewidth; i++) {
                let currTile = document.getElementById(`5-${i}`);
                let ch = chars[i];

                if (ch === "?" || ch === "🔓") {
                    currTile.innerText = "";
                } else if (ch) {
                    currTile.innerText = ch;

                    if (ch === "❓") {
                        currTile.classList.add("mystery");
                    } else if (ch === "🔒") {
                        currTile.classList.add("disabled");
                    } else {
                        currTile.classList.add("correct");
                    }
                }
            }
        }
        if (localStorage.clwordsix != "") {
            let chars = Array.from(localStorage.clwordsix);
            for (let i = 0; i < wordsixwidth; i++) {
                let currTile = document.getElementById(`6-${i}`);
                let ch = chars[i];

                if (ch === "?" || ch === "🔓") {
                    currTile.innerText = "";
                } else if (ch) {
                    currTile.innerText = ch;

                    if (ch === "❓") {
                        currTile.classList.add("mystery");
                    } else if (ch === "🔒") {
                        currTile.classList.add("disabled");
                    } else {
                        currTile.classList.add("correct");
                    }
                }
            }
        }
        if (localStorage.clwordlast != "") {
            for (let i = 0; i < wordlastwidth; i++) {
                let currTile = document.getElementById("7" + '-' + i);
                if (localStorage.clwordlast[i] == "?") {
                    currTile.innerText = "";
                } else if (localStorage.clwordlast[i] != "") {
                    currTile.innerText = localStorage.clwordlast[i];
                    currTile.classList.add("correct");
                }
            }
        }
    }

}


function processKey() {
    e = {
        "code": this.id
    };
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
                    if (localStorage.clhardmode == 1) {
                        localStorage.cldynamite = dyn + 2;
                        // document.getElementById("answer").innerText = "PERFECT GUESS! \n YOU GAINED +2 DYNAMITES!";
						updateAnswer("PERFECT GUESS! \n YOU GAINED +2 DYNAMITES!");
                    } else {
                        localStorage.cldynamite = dyn + 1;
                        // document.getElementById("answer").innerText = "PERFECT GUESS! \n YOU GAINED +1 DYNAMITE!";
						updateAnswer("PERFECT GUESS! \n YOU GAINED +1 DYNAMITE!");
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
        for (let i = 0; i < wordtwowidth; i++) {
            let currTile = document.getElementById("2" + '-' + i);
            // if (localStorage.clhardmode == 1){
            // onConsonantSolved();
            // }
            if (e.code[3] == wordtwo[i]) {
                if (localStorage.clhardmode == 1) {
                    onConsonantSolved();
                }
                if (currTile.innerText == "") {
                    currTile.innerText = e.code[3];
					currTile.classList.remove("popanswer");					
					currTile.offsetWidth;
                    currTile.classList.add("correct", "poptile");
                    if (localStorage.cldisabledkey.includes(e.code[3])) {
                        // do nothing
                    } else {
                        localStorage.consocount = Number(localStorage.consocount) + 1;
                        localStorage.clcorrect = Number(localStorage.clcorrect) + 1;
                    }
                }
                LetterFound = 1;
            }
        }
        for (let i = 0; i < wordthreewidth; i++) {
            let currTile = document.getElementById("3" + '-' + i);
            // if (localStorage.clhardmode == 1){
            // onConsonantSolved();
            // }				
            if (e.code[3] == wordthree[i]) {
                if (localStorage.clhardmode == 1) {
                    onConsonantSolved();
                }
                if (currTile.innerText == "") {
                    currTile.innerText = e.code[3];
					currTile.classList.remove("popanswer");					
					currTile.offsetWidth;					
                    currTile.classList.add("correct", "poptile");
                    if (localStorage.cldisabledkey.includes(e.code[3])) {
                        // do nothing
                    } else {
                        localStorage.consocount = Number(localStorage.consocount) + 1;
                        localStorage.clcorrect = Number(localStorage.clcorrect) + 1;
                    }
                }
                LetterFound = 1;
            }
        }
        for (let i = 0; i < wordfourwidth; i++) {
            let currTile = document.getElementById("4" + '-' + i);
            // if (localStorage.clhardmode == 1){
            // onConsonantSolved();
            // }			
            if (e.code[3] == wordfour[i]) {
                if (localStorage.clhardmode == 1) {
                    onConsonantSolved();
                }
                if (currTile.innerText == "") {
                    currTile.innerText = e.code[3];
					currTile.classList.remove("popanswer");					
					currTile.offsetWidth;					
                    currTile.classList.add("correct", "poptile");
                    if (localStorage.cldisabledkey.includes(e.code[3])) {
                        // do nothing
                    } else {
                        localStorage.consocount = Number(localStorage.consocount) + 1;
                        localStorage.clcorrect = Number(localStorage.clcorrect) + 1;
                    }
                }
                LetterFound = 1;
            }
        }
        for (let i = 0; i < wordfivewidth; i++) {
            let currTile = document.getElementById("5" + '-' + i);
            // if (localStorage.clhardmode == 1){
            // onConsonantSolved();
            // }		
            if (e.code[3] == wordfive[i]) {
                if (localStorage.clhardmode == 1) {
                    onConsonantSolved();
                }
                if (currTile.innerText == "") {
                    currTile.innerText = e.code[3];
					currTile.classList.remove("popanswer");					
					currTile.offsetWidth;					
                    currTile.classList.add("correct", "poptile");
                    if (localStorage.cldisabledkey.includes(e.code[3])) {
                        // do nothing
                    } else {
                        localStorage.consocount = Number(localStorage.consocount) + 1;
                        localStorage.clcorrect = Number(localStorage.clcorrect) + 1;
                    }
                }
                LetterFound = 1;
            }
        }
        for (let i = 0; i < wordsixwidth; i++) {
            let currTile = document.getElementById("6" + '-' + i);
            // if (localStorage.clhardmode == 1){
            // onConsonantSolved();
            // }			
            if (e.code[3] == wordsix[i]) {
                if (localStorage.clhardmode == 1) {
                    onConsonantSolved();
                }
                if (currTile.innerText == "") {
                    currTile.innerText = e.code[3];
					currTile.classList.remove("popanswer");					
					currTile.offsetWidth;					
                    currTile.classList.add("correct", "poptile");
                    if (localStorage.cldisabledkey.includes(e.code[3])) {
                        // do nothing
                    } else {
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
        if (localStorage.consocount > 5 && localStorage.clshowalert == 0 && localStorage.totalclplayed > 0) {
            OpenADDModal();
            localStorage.clshowalert = 1;
        }

        if (localStorage.consocount > 5 && localStorage.clshowalert == 4 && localStorage.totalclplayed > 0) {
            OpenTIMEModal();
            localStorage.clshowalert = 5;
        }
        if ((Number(localStorage.consocount) == solveword.length - Number(localStorage.vowelcount)) && localStorage.vowelactive == 0) {
            disableKeys("BCDFGHJKLMNPQRSTVWXYZ".split("")); // consonants
            document.querySelectorAll('span[id*="-"].disabled').forEach(tile => {
				tile.classList.remove('disabled');		
				if (tile.innerText === "🔒"){
					tile.innerText = "🔓";
				}
                // setTimeout(function() {
                    tile.innerText = "";
                    tile.classList.add("popanswer");
                    document.getElementById("KeyA").classList.remove("disabled", "key-tile-disabled");
                    document.getElementById("KeyE").classList.remove("disabled", "key-tile-disabled");
                    document.getElementById("KeyI").classList.remove("disabled", "key-tile-disabled");
                    document.getElementById("KeyO").classList.remove("disabled", "key-tile-disabled");
                    document.getElementById("KeyU").classList.remove("disabled", "key-tile-disabled");
                    document.getElementById("KeyA").classList.add("key-tile-enabled", "poptile");
                    document.getElementById("KeyE").classList.add("key-tile-enabled", "poptile");
                    document.getElementById("KeyI").classList.add("key-tile-enabled", "poptile");
                    document.getElementById("KeyO").classList.add("key-tile-enabled", "poptile");
                    document.getElementById("KeyU").classList.add("key-tile-enabled", "poptile");
                    document.getElementById("answer").style.color = "lightgray";
                    // document.getElementById("answer").innerText = "ONLY VOWELS LEFT!"
					updateAnswer("ONLY VOWELS LEFT!");
					 setTimeout(FinalClue, 1500);
                // }, 1000);
            });
            localStorage.vowelactive = 1;
           
        }
        document.getElementById(e.code).classList.add("disabled");
        var disabledkey = e.code[3];
        if (disabledkeyarr.length == 0) {
            var temp = JSON.parse(localStorage.getItem("cldisabledkey"));
            if (temp != "") {
                disabledkeyarr.push(temp);
            }
        }
        disabledkeyarr.push(disabledkey);
        disabledkeyarr = [].concat.apply([], disabledkeyarr);
        localStorage.setItem("cldisabledkey", JSON.stringify(disabledkeyarr));
    }

    if (LetterFound == 0) {
        localStorage.cllivescnt = Number(localStorage.cllivescnt) + 1;
        document.getElementById("answer").style.color = "lightgray";
        switch (Number(localStorage.cllivescnt)) {
            case 0:
                localStorage.cllives = "🔴🔴🔴🔴🔴";
                break;
            case 1:
                localStorage.cllives = "🔴🔴🔴🔴";
                // document.getElementById("answer").innerText = "FIRST LIFE LOST!"
				updateAnswer("FIRST LIFE LOST!");
                break;
            case 2:
                localStorage.cllives = "🔴🔴🔴";
                // document.getElementById("answer").innerText = "SECOND LIFE LOST!"
				updateAnswer("SECOND LIFE LOST!");
                break;
            case 3:
                localStorage.cllives = "🔴🔴";
                // document.getElementById("answer").innerText = "THIRD LIFE LOST!"
				updateAnswer("THIRD LIFE LOST!");
                break;
            case 4:
                localStorage.cllives = "🔴";
                // document.getElementById("answer").innerText = "FOURTH LIFE LOST - LAST LIFE ALERT!"
				updateAnswer("FOURTH LIFE LOST - LAST LIFE ALERT!");
                setTimeout(FinalClue, 1500);

                // Offer star-for-life trade when only 1 life remains
				const today = new Date().toDateString();
                if (Number(localStorage.cllivescnt) == 4 &&
                    Number(localStorage.totalclstars) >= 2 &&
                    localStorage.cltradeoffered !== today) {

                    localStorage.cltradeoffered = today; // prevent repeat offers
                    openLifeTradeModal();
                }
                break;
                // case 5: localStorage.cllives = "⚠️";
                // 	document.getElementById("answer").innerText = "LAST LIFE ALERT!"
                // 	setTimeout(FinalClue, 500);	
                // 	break;
            case 5:
                localStorage.cllives = "❌❌❌❌❌";
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
        if (!mysteryLetter || mysteryLetter === "undefined") {
            //do nothing
        } else {
            localStorage.clMysteryActive = "true";
            markTileWithQuestion(localStorage.clMysteryLetter); // visually add ❓
            showMysteryAdded();
            // document.getElementById("answer").innerText = "IDENTIFY THE MYSTERY LETTER IN THE NEXT TRY FOR A BONUS!"	
			updateAnswer("IDENTIFY THE MYSTERY LETTER IN THE NEXT TRY FOR A BONUS!");
        }
    }

    if (Number(localStorage.cllivescnt == 5)) {
        for (let i = 0; i < wordonewidth; i++) {
            let currTile = document.getElementById("1" + '-' + i);
            currTile.innerText = wordone[i];
            currTile.classList.remove("poptile", "correct");
            // currTile.classList.add("failed", "animated");
        }
        for (let i = 0; i < wordtwowidth; i++) {
            let currTile = document.getElementById("2" + '-' + i);
            currTile.innerText = wordtwo[i];
            currTile.classList.remove("poptile", "correct", "mystery", "flash2", "popanswer");
            currTile.classList.add("failed", "animated");
        }
        for (let i = 0; i < wordthreewidth; i++) {
            let currTile = document.getElementById("3" + '-' + i);
            currTile.innerText = wordthree[i];
            currTile.classList.remove("poptile", "correct", "mystery", "flash2", "popanswer");
            currTile.classList.add("failed", "animated");
        }
        for (let i = 0; i < wordfourwidth; i++) {
            let currTile = document.getElementById("4" + '-' + i);
            currTile.innerText = wordfour[i];
            currTile.classList.remove("poptile", "correct", "mystery", "flash2", "popanswer");
            currTile.classList.add("failed", "animated");
        }
        for (let i = 0; i < wordfivewidth; i++) {
            let currTile = document.getElementById("5" + '-' + i);
            currTile.innerText = wordfive[i];
            currTile.classList.remove("poptile", "correct", "mystery", "flash2", "popanswer");
            currTile.classList.add("failed", "animated");
        }
        for (let i = 0; i < wordsixwidth; i++) {
            let currTile = document.getElementById("6" + '-' + i);
            currTile.innerText = wordsix[i];
            currTile.classList.remove("poptile", "correct", "mystery", "flash2", "popanswer");
            currTile.classList.add("failed", "animated");
        }
        for (let i = 0; i < wordlastwidth; i++) {
            let currTile = document.getElementById("7" + '-' + i);
            currTile.innerText = wordlast[i];
            currTile.classList.remove("poptile", "correct");
            // currTile.classList.add("failed", "animated");
        }
        gameOver = true;
        document.getElementById("toggle-row").style.display = "none";
        disableKeys(["A", "E", "I", "O", "U"]); // vowels
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
        document.getElementById("answer").style.color = "lightgray";
        // document.getElementById("answer").innerText = "GAME OVER! OUT OF LIVES.";
		updateAnswer("GAME OVER! OUT OF LIVES.");
        localStorage.setItem(('gameovercl' + days), 1);
        if (localStorage.getItem('gameovercl' + days) == "1") {
            document.querySelectorAll('span[id*="-"].disabled').forEach(tile => {
                tile.classList.remove('disabled');
            });
        }
        localStorage.totalclplayed = Number(localStorage.totalclplayed) + 1;
		localStorage.monthclplayed = Number(localStorage.monthclplayed) + 1;
        localStorage.totalclstreak = 0;
        SetTier();
        var winpct = localStorage.totalclplayed > 0 ?
            Math.round(localStorage.totalclwins / localStorage.totalclplayed * 100) :
            0;
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

    if (Number(localStorage.clcorrect) == word.length) {
        for (let i = 0; i < wordonewidth; i++) {
            let currTile = document.getElementById("1" + '-' + i);
            currTile.innerText = wordone[i];
            currTile.classList.remove("poptile");
            // currTile.classList.add("animated");
        }
        for (let i = 0; i < wordtwowidth; i++) {
            let currTile = document.getElementById("2" + '-' + i);
            currTile.innerText = wordtwo[i];
            currTile.classList.remove("poptile","popanswer");
            currTile.classList.add("animated");
        }
        for (let i = 0; i < wordthreewidth; i++) {
            let currTile = document.getElementById("3" + '-' + i);
            currTile.innerText = wordthree[i];
            currTile.classList.remove("poptile","popanswer");
            currTile.classList.add("animated");
        }
        for (let i = 0; i < wordfourwidth; i++) {
            let currTile = document.getElementById("4" + '-' + i);
            currTile.innerText = wordfour[i];
            currTile.classList.remove("poptile","popanswer");
            currTile.classList.add("animated");
        }
        for (let i = 0; i < wordfivewidth; i++) {
            let currTile = document.getElementById("5" + '-' + i);
            currTile.innerText = wordfive[i];
            currTile.classList.remove("poptile","popanswer");
            currTile.classList.add("animated");
        }
        for (let i = 0; i < wordsixwidth; i++) {
            let currTile = document.getElementById("6" + '-' + i);
            currTile.innerText = wordsix[i];
            currTile.classList.remove("poptile","popanswer");
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
        disableKeys(["A", "E", "I", "O", "U"]); // vowels
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
            if (localStorage.clhardmode == 1) {
                localStorage.cldynamite = dyn + 2;
            } else {
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
            case 0:
                localStorage.starcl0count = Number(localStorage.starcl0count) + 1;
                color0 = "green";
                localStorage.clgamecnt = 0;
                break;
            case 1:
                localStorage.starcl1count = Number(localStorage.starcl1count) + 1;
                color1 = "green";
                localStorage.clgamecnt = 1;
                break;
            case 2:
                localStorage.starcl2count = Number(localStorage.starcl2count) + 1;
                color2 = "green";
                localStorage.clgamecnt = 2;
                break;
            case 3:
                localStorage.starcl3count = Number(localStorage.starcl3count) + 1;
                color3 = "green";
                localStorage.clgamecnt = 3;
                break;
            case 4:
                localStorage.starcl4count = Number(localStorage.starcl4count) + 1;
                color4 = "green";
                localStorage.clgamecnt = 4;
                break;
            case 5:
                localStorage.starcl5count = Number(localStorage.starcl5count) + 1;
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

        if (localStorage.clstarscnt === "1") {
            msg = "GREAT GOING! YOU WON 1 STAR TODAY.";
        } else {
            msg = "GREAT GOING! YOU WON " + localStorage.clstarscnt + " STARS TODAY.";
        }

        if (bonusApplied) {
            msg += " (INCLUDING +1 TIMED MODE BONUS!)";
            localStorage.cllives = "🔴".repeat(localStorage.clstarscnt);
            document.getElementById("lives").innerText = localStorage.cllives;


        }

        // document.getElementById("answer").innerText = msg;
		updateAnswer(msg);

        /* 			for (let s = 0; s < localStorage.clstarscnt; s++){
        				document.getElementById("answerstar").innerText += "⭐";
        			} */
        var templives = "";
        templives = document.getElementById("lives").innerText;
        for (i = 0; i < 5; i++) {
            templives = templives.replace("🔴", "⭐");
        }
        document.getElementById("lives").innerText = templives;
        if (Number(localStorage.clstarscnt) != 0) {
            document.getElementById("lives").classList.add("animated");
        }
        localStorage.setItem(('gameovercl' + days), 1);
		localStorage.setItem(('gamestatcl' + days), 1);
        localStorage.totalclplayed = Number(localStorage.totalclplayed) + 1;
		localStorage.monthclplayed = Number(localStorage.monthclplayed) + 1;
        localStorage.totalclwins = Number(localStorage.totalclwins) + 1;
		localStorage.monthwins = Number(localStorage.monthwins) + 1;
        localStorage.totalclstreak = Number(localStorage.totalclstreak) + 1;
        let streak = Number(localStorage.totalclstreak || 0);
		const el = document.getElementById("streakPopupText"); // Clear dynamite tutorial message if available;
		el.innerText = "";
        if (streak > 0 && streak % 10 === 0) {
            let dyn = Number(localStorage.cldynamite || 0);
            localStorage.cldynamite = dyn + 3;
            setTimeout(function() {
                showStreakPopup("🔥 10‑DAY STREAK! YOU EARNED +3 DYNAMITES!");
            }, 5000);
        }
        if (streak === 10) {
            setTimeout(function() {
                showStreakPopup("BRONZE BADGE (10+ STREAK) ALERT - 🥉");
            }, 5000);
        }
        if (streak === 25) {
            setTimeout(function() {
                showStreakPopup("SILVER BADGE (25+ STREAK) ALERT - 🥈");
            }, 5000);
        }
        if (streak === 50) {
            setTimeout(function() {
                showStreakPopup("GOLD BADGE (50+ STREAK) ALERT - 🥇");
            }, 5000);
        }
        if (streak === 100) {
            setTimeout(function() {
                showStreakPopup("ULTIMATE BADGE (100+ STREAK) ALERT - 🏆");
            }, 5000);
        }
        updateDynamiteUI();
        localStorage.totalclstars = Number(localStorage.totalclstars) + Number(localStorage.clstarscnt);
		localStorage.monthclstars = Number(localStorage.monthclstars) + Number(localStorage.clstarscnt);
        SetTier();
        var winpct = localStorage.totalclplayed > 0 ?
            Math.round(localStorage.totalclwins / localStorage.totalclplayed * 100) :
            0;
        document.getElementById(11).innerText = "PLAYED: " + localStorage.totalclplayed;
        document.getElementById(12).innerText = "WIN %: " + winpct;
        document.getElementById(13).innerText = "STREAK: " + localStorage.totalclstreak + tiericon;
        document.getElementById(14).innerText = "STARS: " + localStorage.totalclstars;
        displayFooter();
        localStorage.gameclwon = 1;
        localStorage.clgamestarted = 0;
        localStorage.clhardmode = 0;
        setTimeout(ConfettiStart, 1000);
        if (localStorage.clshowalert > 1 && localStorage.clshowalert < 4) {
            setTimeout(OpenStats, 6800);
            setTimeout(OpenHINTModal, 4800);
            localStorage.clshowalert = Number(localStorage.clshowalert) + 1;
        } else {
            setTimeout(OpenStats, 4800)
            if (localStorage.clshowalert == 1) {
                localStorage.clshowalert = Number(localStorage.clshowalert) + 1;
            }
        }
    }
    let clwordone = "";
    for (let i = 0; i < wordonewidth; i++) {
        let currTile = document.getElementById("1" + '-' + i);
        if (currTile.innerText == "") {
            clwordone += "?";
        } else {
            clwordone += currTile.innerText;
        }
        localStorage.clwordone = clwordone;
    }
    let clwordtwo = "";
    for (let i = 0; i < wordtwowidth; i++) {
        let currTile = document.getElementById("2" + '-' + i);
        if (currTile.innerText == "") {
            clwordtwo += "?";
        } else {
            clwordtwo += currTile.innerText;
        }
        localStorage.clwordtwo = clwordtwo;
    }

    let clwordthree = "";
    for (let i = 0; i < wordthreewidth; i++) {
        let currTile = document.getElementById("3" + '-' + i);
        if (currTile.innerText == "") {
            clwordthree += "?";
        } else {
            clwordthree += currTile.innerText;
        }
        localStorage.clwordthree = clwordthree;
    }

    let clwordfour = "";
    for (let i = 0; i < wordfourwidth; i++) {
        let currTile = document.getElementById("4" + '-' + i);
        if (currTile.innerText == "") {
            clwordfour += "?";
        } else {
            clwordfour += currTile.innerText;
        }
        localStorage.clwordfour = clwordfour;
    }

    let clwordfive = "";
    for (let i = 0; i < wordfivewidth; i++) {
        let currTile = document.getElementById("5" + '-' + i);
        if (currTile.innerText == "") {
            clwordfive += "?";
        } else {
            clwordfive += currTile.innerText;
        }
        localStorage.clwordfive = clwordfive;
    }

    let clwordsix = "";
    for (let i = 0; i < wordsixwidth; i++) {
        let currTile = document.getElementById("6" + '-' + i);
        if (currTile.innerText == "") {
            clwordsix += "?";
        } else {
            clwordsix += currTile.innerText;
        }
        localStorage.clwordsix = clwordsix;
    }

    let clwordlast = "";
    for (let i = 0; i < wordlastwidth; i++) {
        let currTile = document.getElementById("7" + '-' + i);
        if (currTile.innerText == "") {
            clwordlast += "?";
        } else {
            clwordlast += currTile.innerText;
        }
        localStorage.clwordlast = clwordlast;
    }
}