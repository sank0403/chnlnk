initMonthlyStats();
// FIRST VISIT CHECK (must run before any reload logic)
if (!localStorage.clshowrules) {
    localStorage.setItem("clshowrules", 1);
    setTimeout(OpenRules, 5000);
    // Prevent deployment reload from firing on first visit
    localStorage.setItem("skipReloadOnce", "1");
}

function getHintState() {
    return {
        consecutiveDays: Number(localStorage.consecutiveDays || 0),
        hintAvailable: localStorage.hintAvailable === "true",
        lastPlayed: localStorage.lastPlayed || null
    };
}

function saveHintState(days, available, lastPlayed) {
    localStorage.consecutiveDays = days;
    localStorage.hintAvailable = available;
    localStorage.lastPlayed = lastPlayed;
}

function triggerVibration(pattern = [75]) {
    if ("vibrate" in navigator) {
        navigator.vibrate(pattern);
    }
}


(function importFFFromURL() {
    const allowedHost = "thechnlnk.com";
    if (window.location.hostname !== allowedHost) return;

    const params = new URLSearchParams(window.location.search);
    const encoded = params.get("ff");
    if (!encoded) return; // Only run when ?ff= is present

    try {
        const decoded = atob(encoded);
        const list = JSON.parse(decoded);

        if (!Array.isArray(list)) return;

        // Clean names
        let cleaned = list
            .map(n => (typeof n === "string" ? n.trim() : ""))
            .filter(n => n.length > 0);

        // Remove receiver's own name
        const myName = (localStorage.playerName || "").trim().toUpperCase();
        cleaned = cleaned.filter(n => n.toUpperCase() !== myName);

        // Enforce max 4 friends (You + 7 = 8 rows)
        cleaned = cleaned.slice(0, 7);

        // Save final list
        localStorage.ffList = JSON.stringify(cleaned);
        console.log("Imported F&F list:", cleaned);

        // Clean the URL
        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, "", cleanUrl);

    } catch (e) {
        console.warn("Invalid F&F import link");
    }
})();


const BUILD_VERSION = "2026.06.13.01";

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

// --- Rank-based brag pools ---
const brags_rank1 = [
  "I’m sitting on the throne again 👑. Someone polish my crown. #FnF_rank1",
  "Top spot secured. The view from up here is crazy 😎. #FnF_rank1",
  "I’m not competing. I’m teaching. #FnF_rank1",
  "Leaderboard update: I’m still him. #FnF_rank1",
  "Crown’s on, streak’s hot 🔥👑. Try me. #FnF_rank1",
  "I’m basically a walking trophy case 🏆. #FnF_rank1",
  "If you’re reading this, you’re behind me. #FnF_rank1",
  "I’m the final boss of this leaderboard. #FnF_rank1",
  "I didn’t climb here. I belong here. #FnF_rank1",
  "The throne fits perfectly. Weird. #FnF_rank1",
  "I’m the reason the leaderboard exists. #FnF_rank1",
  "I’m not lucky. I’m consistent. #FnF_rank1",
  "Top spot again? Yawn. #FnF_rank1",
  "I woke up and chose domination. #FnF_rank1",
  "I don’t chase ranks. Ranks chase me. #FnF_rank1",
  "I’m the benchmark. Everyone else is homework. #FnF_rank1",
  "I’m the main character of this leaderboard. #FnF_rank1",
  "I’m the plot twist nobody survives. #FnF_rank1",
  "I’m the standard they try to reach. #FnF_rank1",
  "I’m the one they study to improve. #FnF_rank1",
  "I’m the undefeated storyline. #FnF_rank1",
  "I’m the boss fight they can’t beat. #FnF_rank1",
  "I’m the top of the food chain. #FnF_rank1",
  "I’m the scoreboard’s favorite child. #FnF_rank1",
  "I’m the one who sets the curve. #FnF_rank1",
  "I’m the one they warn new players about. #FnF_rank1",
  "I’m the top spot’s landlord — rent is due. #FnF_rank1",
  "I’m the one who makes #2 nervous. #FnF_rank1",
  "I’m the one who makes the rules. #FnF_rank1",
  "I’m the one who breaks the game. #FnF_rank1",
  "I’m the one they screenshot. #FnF_rank1",
  "I’m the one they try to copy. #FnF_rank1",
  "I’m the one who makes winning look easy. #FnF_rank1",
  "I’m the one who turns pressure into performance. #FnF_rank1",
  "I’m the one who doesn’t move — the world moves around me. #FnF_rank1",
  "I’m the one who makes the leaderboard look good. #FnF_rank1",
  "I’m the one who keeps the crown warm. #FnF_rank1",
  "I’m the one who ends arguments. #FnF_rank1",
  "I’m the one who makes the top spot look effortless. #FnF_rank1"
];

const brags_rank2 = [
  "I’m only one spot away. Whoever’s #1 should start sweating 😏. #FnF_rank2",
  "Second place, but the takeover is loading… #FnF_rank2",
  "I’m right behind the leader. Breathing down their neck 😈. #FnF_rank2",
  "Almost at the top. Almost. #FnF_rank2",
  "Enjoy your lead while it lasts 👀. #FnF_rank2",
  "I’m #2 but built like a #1. #FnF_rank2",
  "I’m the storm before the dethroning. #FnF_rank2",
  "I’m the pressure the leader feels at night. #FnF_rank2",
  "I’m the shadow right behind #1. #FnF_rank2",
  "I’m the sequel that’s better than the original. #FnF_rank2",
  "I’m the next chapter. #FnF_rank2",
  "I’m the upgrade. #FnF_rank2",
  "I’m the threat level rising. #FnF_rank2",
  "I’m the warm-up for the takeover. #FnF_rank2",
  "I’m the one they fear the most. #FnF_rank2",
  "I’m the almost-champion with champion energy. #FnF_rank2",
  "I’m the pressure cooker. #FnF_rank2",
  "I’m the one who knocks on #1’s door. #FnF_rank2",
  "I’m the one who makes #1 nervous. #FnF_rank2",
  "I’m the one who turns second place into danger. #FnF_rank2",
  "I’m the one who’s about to flip the script. #FnF_rank2",
  "I’m the one who’s closing the gap. #FnF_rank2",
  "I’m the one who’s rewriting the rankings. #FnF_rank2",
  "I’m the one who’s about to take the crown. #FnF_rank2",
  "I’m the one who keeps #1 awake. #FnF_rank2",
  "I’m the one who makes the chase exciting. #FnF_rank2",
  "I’m the one who’s almost there. #FnF_rank2",
  "I’m the one who’s sharpening my claws. #FnF_rank2",
  "I’m the one who’s coming in hot. #FnF_rank2",
  "I’m the one who’s about to make history. #FnF_rank2",
  "I’m the one who’s too close for comfort. #FnF_rank2",
  "I’m the one who’s breathing fire. #FnF_rank2",
  "I’m the one who’s about to break through. #FnF_rank2",
  "I’m the one who’s turning pressure into progress. #FnF_rank2",
  "I’m the one who’s about to take over. #FnF_rank2",
  "I’m the one who’s rewriting the leaderboard. #FnF_rank2",
  "I’m the one who’s knocking on the throne. #FnF_rank2"
];

const brags_rank3 = [
  "Top 3 and dangerous 😮‍💨. #FnF_rank3",
  "Bronze today, gold tomorrow. #FnF_rank3",
  "I’m in striking distance. Watch this space. #FnF_rank3",
  "Third place but rising like a problem. #FnF_rank3",
  "Two people above me… for now. #FnF_rank3",
  "I’m the sleeper pick. #FnF_rank3",
  "I’m the quiet threat. #FnF_rank3",
  "I’m the midpoint menace. #FnF_rank3",
  "I’m the one they forget until it’s too late. #FnF_rank3",
  "I’m the spark before the fire. #FnF_rank3",
  "I’m the middle child with main-character energy. #FnF_rank3",
  "I’m the calm before the leaderboard quake. #FnF_rank3",
  "I’m the bronze bullet. #FnF_rank3",
  "I’m the rising tide. #FnF_rank3",
  "I’m the pressure from below. #FnF_rank3",
  "I’m the one who’s about to shake things up. #FnF_rank3",
  "I’m the bronze medalist with gold ambition. #FnF_rank3",
  "I’m the one who’s heating up. #FnF_rank3",
  "I’m the one who’s creeping upward. #FnF_rank3",
  "I’m the one who’s about to surprise everyone. #FnF_rank3",
  "I’m the one who’s sharpening my strategy. #FnF_rank3",
  "I’m the one who’s gaining momentum. #FnF_rank3",
  "I’m the one who’s turning bronze into brilliance. #FnF_rank3",
  "I’m the one who’s about to break into the top 2. #FnF_rank3",
  "I’m the one who’s quietly plotting. #FnF_rank3",
  "I’m the one who’s building pressure. #FnF_rank3",
  "I’m the one who’s about to make noise. #FnF_rank3",
  "I’m the one who’s rising from the middle. #FnF_rank3",
  "I’m the one who’s turning third into threat. #FnF_rank3",
  "I’m the one who’s about to disrupt the top spots. #FnF_rank3",
  "I’m the one who’s climbing with intent. #FnF_rank3",
  "I’m the one who’s turning patience into progress. #FnF_rank3",
  "I’m the one who’s about to catch fire. #FnF_rank3",
  "I’m the one who’s lurking in the shadows. #FnF_rank3",
  "I’m the one who’s about to strike. #FnF_rank3",
  "I’m the one who’s turning bronze into danger. #FnF_rank3",
  "I’m the one who’s about to make a move. #FnF_rank3"
];

const brags_rank4 = [
  "I’m warming up. The climb starts now 🔥. #FnF_rank4",
  "Fourth place but plotting something scary. #FnF_rank4",
  "Everyone above me should stay alert. #FnF_rank4",
  "I’m the dark horse of this leaderboard. #FnF_rank4",
  "I’m coming for the top spots. Slowly. Menacingly. #FnF_rank4",
  "I’m the quiet comeback. #FnF_rank4",
  "I’m the one they underestimate. #FnF_rank4",
  "I’m the underdog with bite. #FnF_rank4",
  "I’m the one who ruins someone’s comfort zone. #FnF_rank4",
  "I’m the sleeper agent. #FnF_rank4",
  "I’m the comeback arc loading. #FnF_rank4",
  "I’m the one who’s about to surprise everyone. #FnF_rank4",
  "I’m the pressure from the depths. #FnF_rank4",
  "I’m the one who climbs when no one’s watching. #FnF_rank4",
  "I’m the fourth place with first-place hunger. #FnF_rank4",
  "I’m the one sharpening my skills down here. #FnF_rank4",
  "I’m the one who’s about to flip the script. #FnF_rank4",
  "I’m the one who turns fourth into fear. #FnF_rank4",
  "I’m the one who’s not done yet. #FnF_rank4",
  "I’m the one who’s about to make noise. #FnF_rank4",
  "I’m the one who’s charging up. #FnF_rank4",
  "I’m the one who’s about to rise. #FnF_rank4",
  "I’m the one who’s building momentum. #FnF_rank4",
  "I’m the one who’s preparing the comeback. #FnF_rank4",
  "I’m the one who’s about to shake the rankings. #FnF_rank4",
  "I’m the one who’s turning fourth into fire. #FnF_rank4",
  "I’m the one who’s about to climb fast. #FnF_rank4",
  "I’m the one who’s quietly dangerous. #FnF_rank4",
  "I’m the one who’s about to break expectations. #FnF_rank4",
  "I’m the one who’s turning pressure into power. #FnF_rank4",
  "I’m the one who’s about to shock the top 3. #FnF_rank4",
  "I’m the one who’s rising from the depths. #FnF_rank4",
  "I’m the one who’s about to ignite. #FnF_rank4",
  "I’m the one who’s turning fourth into fuel. #FnF_rank4",
  "I’m the one who’s about to disrupt the leaderboard. #FnF_rank4",
  "I’m the one who’s climbing with purpose. #FnF_rank4"
];

const brags_rank5 = [
  "I’m fifth… but dangerous. Comeback season loading 🔥. #FnF_rank5",
  "I’m plotting my rise from the shadows 😎. #FnF_rank5",
  "Don’t worry about my rank. Worry about my potential. #FnF_rank5",
  "I’m the underdog. And that’s scary. #FnF_rank5",
  "Laugh now. I’ll see you at the top later. #FnF_rank5",
  "I’m the bottom seed with top-tier ambition. #FnF_rank5",
  "I’m the plot twist waiting to happen. #FnF_rank5",
  "I’m the one with nothing to lose. #FnF_rank5",
  "I’m the chaos factor. #FnF_rank5",
  "I’m the comeback story in progress. #FnF_rank5",
  "I’m the one who starts slow and ends strong. #FnF_rank5",
  "I’m the fifth place with first-place dreams. #FnF_rank5",
  "I’m the one who’s about to ruin someone’s month. #FnF_rank5",
  "I’m the sleeper hit. #FnF_rank5",
  "I’m the one who’s charging up. #FnF_rank5",
  "I’m the one who’s not staying down here. #FnF_rank5",
  "I’m the one who’s about to flip the leaderboard upside down. #FnF_rank5",
  "I’m the one who’s cooking something. #FnF_rank5",
  "I’m the one who’s about to shock everyone. #FnF_rank5",
  "I’m the one who’s turning fifth place into legend. #FnF_rank5",
  "I’m the one who’s about to rise from the ashes. #FnF_rank5",
  "I’m the one who’s quietly preparing revenge. #FnF_rank5",
  "I’m the one who’s about to climb five spots. #FnF_rank5",
  "I’m the one who’s turning losses into lessons. #FnF_rank5",
  "I’m the one who’s about to make a comeback. #FnF_rank5",
  "I’m the one who’s building the ultimate return. #FnF_rank5",
  "I’m the one who’s about to surprise the whole board. #FnF_rank5",
  "I’m the one who’s turning fifth into launchpad. #FnF_rank5",
  "I’m the one who’s about to break expectations. #FnF_rank5",
  "I’m the one who’s rising from the bottom. #FnF_rank5",
  "I’m the one who’s about to make noise. #FnF_rank5",
  "I’m the one who’s turning fifth into fire. #FnF_rank5",
  "I’m the one who’s about to climb like crazy. #FnF_rank5",
  "I’m the one who’s about to rewrite the story. #FnF_rank5",
  "I’m the one who’s about to shock the leaderboard. #FnF_rank5"
];

const brags_rank6 = [
  "I’m sixth, but I’m the storm forming quietly. #FnF_rank6",
  "I’m the one everyone forgets until it’s too late. #FnF_rank6",
  "I’m the sleeper agent of this leaderboard. #FnF_rank6",
  "I’m the calm before someone else’s disaster. #FnF_rank6",
  "I’m sixth, but I’m studying everyone’s weaknesses. #FnF_rank6",
  "I’m the one who rises when others get comfortable. #FnF_rank6",
  "I’m the shadow climbing the ranks. #FnF_rank6",
  "I’m the one who’s about to ruin someone’s week. #FnF_rank6",
  "I’m sixth, but my comeback arc is loading. #FnF_rank6",
  "I’m the one who’s quietly sharpening my skills. #FnF_rank6",
  "I’m the one who’s about to jump three spots. #FnF_rank6",
  "I’m the one who’s charging up in silence. #FnF_rank6",
  "I’m sixth, but I’m built for late‑game chaos. #FnF_rank6",
  "I’m the one who’s about to flip the script. #FnF_rank6",
  "I’m the one who’s turning sixth into momentum. #FnF_rank6",
  "I’m the one who’s about to make the leaderboard nervous. #FnF_rank6",
  "I’m the one who’s quietly plotting greatness. #FnF_rank6",
  "I’m sixth, but I’m not staying here long. #FnF_rank6",
  "I’m the one who’s about to surprise the top half. #FnF_rank6",
  "I’m the one who’s turning sixth into a launchpad. #FnF_rank6",
  "I’m the one who’s about to break expectations. #FnF_rank6",
  "I’m the one who’s rising from the shadows. #FnF_rank6",
  "I’m the one who’s about to make noise from below. #FnF_rank6",
  "I’m the one who’s turning sixth into fire. #FnF_rank6",
  "I’m the one who’s about to climb like a problem. #FnF_rank6",
  "I’m the one who’s rewriting the bottom‑half story. #FnF_rank6",
  "I’m the one who’s about to shake the board awake. #FnF_rank6",
  "I’m the one who’s turning sixth into danger. #FnF_rank6",
  "I’m the one who’s about to rise unexpectedly. #FnF_rank6",
  "I’m the one who’s preparing a silent takeover. #FnF_rank6"
];

const brags_rank7 = [
  "I’m seventh, but I’m vibing like I’m top three. #FnF_rank7",
  "I’m the chaos gremlin of this leaderboard. #FnF_rank7",
  "I’m seventh, but my confidence is undefeated. #FnF_rank7",
  "I’m the wildcard nobody asked for. #FnF_rank7",
  "I’m the one who’s here for the drama, not the stats. #FnF_rank7",
  "I’m seventh, but I’m playing like I’m first. #FnF_rank7",
  "I’m the one who’s about to cause problems on purpose. #FnF_rank7",
  "I’m the comedic relief with main‑character energy. #FnF_rank7",
  "I’m seventh, but I’m dangerous when motivated. #FnF_rank7",
  "I’m the one who’s about to start climbing unhinged. #FnF_rank7",
  "I’m the one who’s turning seventh into a storyline. #FnF_rank7",
  "I’m seventh, but I’m built different. #FnF_rank7",
  "I’m the one who’s about to ruin someone’s comfort zone. #FnF_rank7",
  "I’m seventh, but I’m cooking something questionable. #FnF_rank7",
  "I’m the one who’s about to jump out of nowhere. #FnF_rank7",
  "I’m seventh, but I’m not scared of the top. #FnF_rank7",
  "I’m the one who’s about to make a chaotic comeback. #FnF_rank7",
  "I’m seventh, but I’m still a threat. #FnF_rank7",
  "I’m the one who’s turning seventh into entertainment. #FnF_rank7",
  "I’m seventh, but I’m plotting a miracle. #FnF_rank7",
  "I’m the one who’s about to break someone’s lead. #FnF_rank7",
  "I’m seventh, but I’m not done yet. #FnF_rank7",
  "I’m the one who’s about to climb like a glitch. #FnF_rank7",
  "I’m seventh, but I’m still in the game. #FnF_rank7",
  "I’m the one who’s about to cause leaderboard turbulence. #FnF_rank7",
  "I’m seventh, but I’m aiming for chaos. #FnF_rank7",
  "I’m the one who’s about to make seventh iconic. #FnF_rank7",
  "I’m seventh, but I’m rising soon. #FnF_rank7",
  "I’m the one who’s about to shock the middle ranks. #FnF_rank7",
  "I’m seventh, but I’m not staying here. #FnF_rank7"
];

const brags_rank8 = [
  "I’m last… but I’m the final boss in disguise. #FnF_rank8",
  "I’m eighth, but I’m everyone’s worst nightmare waiting to happen. #FnF_rank8",
  "I’m the plot twist at the bottom of the board. #FnF_rank8",
  "I’m last, but I’m living rent‑free in everyone’s future. #FnF_rank8",
  "I’m the underdog with villain potential. #FnF_rank8",
  "I’m eighth, but I’m the most dangerous one here. #FnF_rank8",
  "I’m the rock bottom rocket ship. #FnF_rank8",
  "I’m last, but I’m charging up something unholy. #FnF_rank8",
  "I’m eighth, but I’m about to ruin someone’s month. #FnF_rank8",
  "I’m the bottom seed with main‑character energy. #FnF_rank8",
  "I’m last, but I’m not scared of heights. #FnF_rank8",
  "I’m eighth, but I’m plotting a ridiculous comeback. #FnF_rank8",
  "I’m the one who rises when everyone stops paying attention. #FnF_rank8",
  "I’m last, but I’m the funniest threat alive. #FnF_rank8",
  "I’m eighth, but I’m cooking chaos. #FnF_rank8",
  "I’m the one who’s about to jump six spots for no reason. #FnF_rank8",
  "I’m last, but I’m still dangerous. #FnF_rank8",
  "I’m eighth, but I’m the spark of leaderboard drama. #FnF_rank8",
  "I’m the one who’s turning last place into legend. #FnF_rank8",
  "I’m last, but I’m not staying down here. #FnF_rank8",
  "I’m eighth, but I’m the comeback arc waiting to happen. #FnF_rank8",
  "I’m the one who’s about to shock the entire board. #FnF_rank8",
  "I’m last, but I’m still in the fight. #FnF_rank8",
  "I’m eighth, but I’m the chaos engine. #FnF_rank8",
  "I’m the one who’s about to flip the leaderboard upside down. #FnF_rank8",
  "I’m last, but I’m the most entertaining one here. #FnF_rank8",
  "I’m eighth, but I’m plotting something spicy. #FnF_rank8",
  "I’m the one who’s about to make last place iconic. #FnF_rank8",
  "I’m last, but I’m rising soon. #FnF_rank8",
  "I’m eighth, but I’m the comeback nobody expects. #FnF_rank8"
];



// --- Callout brags (optional) ---
const brags_callouts = [
  "Hey {name}, blink twice if you need help catching up. #FnF_callout",
  "{name}, I’m farming you for wins at this point 😬. #FnF_callout",
  "{name}, I’m about to pass you again. #FnF_callout",
  "Someone check on {name}. They’re struggling. #FnF_callout",
  "{name}, enjoy your lead while it lasts. #FnF_callout",
  "{name}, I hope you stretched. I’m right behind you. #FnF_callout",
  "{name}, you good? Your rank looks shaky. #FnF_callout",
  "{name}, I’m closing in. Don’t trip. #FnF_callout",
  "{name}, I’m on your heels like a shadow. #FnF_callout",
  "{name}, I’m about to make you regret logging in. #FnF_callout",
  "{name}, I’m the reason you keep checking the leaderboard. #FnF_callout",
  "{name}, I’m gaining on you like interest. #FnF_callout",
  "{name}, I’m the pressure you feel at night. #FnF_callout",
  "{name}, I’m the plot twist you didn’t ask for. #FnF_callout",
  "{name}, I’m coming for your spot. Warm it up for me. #FnF_callout",
  "{name}, I’m the storm on your horizon. #FnF_callout",
  "{name}, I’m the one who’s about to ruin your day. #FnF_callout",
  "{name}, I’m the one you should be worried about. #FnF_callout",
  "{name}, I’m the one who’s about to overtake you. #FnF_callout",
  "{name}, I’m the one who’s creeping up fast. #FnF_callout",
  "{name}, I’m the one who’s about to shake your confidence. #FnF_callout",
  "{name}, I’m the one who’s turning up the pressure. #FnF_callout",
  "{name}, I’m the one who’s about to flip the rankings. #FnF_callout",
  "{name}, I’m the one who’s coming in hot. #FnF_callout",
  "{name}, I’m the one who’s about to take your spot. #FnF_callout"
];

function onDailyPuzzleCompleted() {
    let { consecutiveDays, hintAvailable, lastPlayed } = getHintState();

    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    // -----------------------------------------
    // PHASE 2 — HOLD MODE
    // If Safety Net is already active:
    // Completing the puzzle keeps it active.
    // Missing a day is handled in onGameLoad().
    // -----------------------------------------
    if (hintAvailable) {
        saveHintState(consecutiveDays, true, today);
        updateHintProgress(consecutiveDays, true);
        return;
    }

    // -----------------------------------------
    // PHASE 1 — EARNING MODE
    // Only track streak if Safety Net is NOT active yet.
    // -----------------------------------------

    if (!lastPlayed) {
        consecutiveDays = 1;
    }
    else if (lastPlayed === today) {
        // Already completed today → do nothing
    }
    else if (lastPlayed === yesterday) {
        consecutiveDays++;
    }
    else {
        // Missed a day → reset streak
        consecutiveDays = 1;
    }

    // Earn Safety Net at 4 days
    if (consecutiveDays >= 4) {
        hintAvailable = true;
    }

    saveHintState(consecutiveDays, hintAvailable, today);
    updateHintProgress(consecutiveDays, hintAvailable);
}



function getBragLine(rank, totalPlayers, closestName) {
    let pool;

    if (rank === 1) pool = brags_rank1;
    else if (rank === 2 && totalPlayers >= 2) pool = brags_rank2;
    else if (rank === 3 && totalPlayers >= 3) pool = brags_rank3;
    else if (rank === 4 && totalPlayers >= 4) pool = brags_rank4;
    else if (rank === 5 && totalPlayers >= 5) pool = brags_rank5;
    else if (rank === 6 && totalPlayers >= 6) pool = brags_rank6;
    else if (rank === 7 && totalPlayers >= 7) pool = brags_rank7;
    else if (rank === 8 && totalPlayers === 8) pool = brags_rank8;
    else pool = brags_rank1; // fallback for weird states

    // 20% chance to use a callout brag
    if (closestName && Math.random() < 0.4) {
        const callout = brags_callouts[Math.floor(Math.random() * brags_callouts.length)];
        return callout.replace("{name}", closestName);
    }

    return pool[Math.floor(Math.random() * pool.length)];
}

var gameOver = false;
let isPaused = false;

function pauseMomentumTimer() {
    isPaused = true;
}

function resumeMomentumTimer() {
    isPaused = false;
}

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

// document.getElementById("wabutton").addEventListener("click", function() {
    // const menu = document.getElementById("waMenu");
    // menu.style.display = menu.style.display === "block" ? "none" : "block";
// });

// Optional: close menu when clicking outside
// document.addEventListener("click", function(e) {
    // const wrapper = document.querySelector(".wa-wrapper");
    // if (!wrapper.contains(e.target)) {
        // document.getElementById("waMenu").style.display = "none";
    // }
// });

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
        "cunt", "dick", "pussy", "slut", "whore", "ass"
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
        closeBtn.style.top = "-10px"; // move it slightly above the container
        closeBtn.style.right = "-10px"; // shift it outside the right edge
        closeBtn.style.background = "black"; // match container background
        closeBtn.style.color = "yellow";
        closeBtn.style.border = "2px solid yellow";
        closeBtn.style.borderRadius = "50%";
        closeBtn.style.width = "24px";
        closeBtn.style.height = "24px";
        closeBtn.style.fontSize = "16px";
        closeBtn.style.lineHeight = "20px";
        closeBtn.style.cursor = "pointer";
        closeBtn.style.zIndex = "10000000"; // ensure it's above everything
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
                    doc(db, "leaderboard", playerId), {
                        name: newName,
                        updated: serverTimestamp()
                    }, {
                        merge: true
                    }
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

    const todayNum = now.getDate();
    const played = Number(localStorage.monthclplayed);

    // --- CASE 1: First time ever OR new month → full reset ---
    if (!lastMonth || lastMonth !== currentMonth) {
        localStorage.monthcl_lastMonth = currentMonth;
        localStorage.monthclplayed = 0;
        localStorage.monthclstars = 0;
        localStorage.monthwins = 0;
        return;
    }

    // --- CASE 2: Corrupted or impossible values → full reset ---
    const invalidPlayed =
        isNaN(played) ||
        played < 0 ||
        played > todayNum ||
        played > 31;

    if (invalidPlayed) {
        localStorage.monthcl_lastMonth = currentMonth;
        localStorage.monthclplayed = 0;
        localStorage.monthclstars = 0;
        localStorage.monthwins = 0;
        return;
    }

    // Same month and values are valid → do nothing
}


let selectedRating = null;

function showFeedbackPopup() {
    document.getElementById("feedbackPopup").classList.remove("hidden");
}

function hideFeedbackPopup() {
    document.getElementById("feedbackPopup").classList.add("hidden");
}

document.querySelectorAll(".fb-star").forEach(btn => {
    btn.addEventListener("click", () => {
        selectedRating = btn.dataset.value;

        // highlight selected
        document.querySelectorAll(".fb-star").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");

        // enable submit
        const submitBtn = document.getElementById("fbSubmit");
        submitBtn.classList.remove("disabled");
        submitBtn.disabled = false;
    });
});

document.getElementById("fbCancel").addEventListener("click", () => {
	localStorage.lastFeedbackDate = new Date().toLocaleDateString('en-CA');
    hideFeedbackPopup();
    OpenStats();
});

document.getElementById("fbSubmit").addEventListener("click", async () => {
    const text = document.getElementById("fbText").value;

    const feedbackData = {
        uid: auth.currentUser?.uid || null,
        playerName: localStorage.playerName || null,
        // country: localStorage.country || null,
        rating: Number(selectedRating),
        text: text.trim(),
        updated: serverTimestamp()
    };

    try {
        await addDoc(collection(db, "feedback"), feedbackData);

        // ⭐ Save last feedback date for 50‑day cooldown
        localStorage.lastFeedbackDate = new Date().toLocaleDateString('en-CA');
		localStorage.cldynamite = Number(localStorage.cldynamite || 0) + 5;
		const dyn = Number(localStorage.cldynamite || 0);
		document.getElementById("dynamite-btn").innerText = "💣 x" + dyn;
        // ⭐ Show thank-you toast
        showThankYouToast();
    } catch (err) {
        console.error("Feedback save error:", err);
    }

    hideFeedbackPopup();

    // Delay stats opening slightly so toast is visible
    setTimeout(OpenStats, 1500);
});


function shouldShowFeedbackPopup() {
    const last = localStorage.lastFeedbackDate;
    if (!last) return true;

    const lastDate = new Date(last);
    const now = new Date();

    const diffMs = now - lastDate;
    const days50 = 50 * 24 * 60 * 60 * 1000;

    return diffMs > days50;
}


function showThankYouToast() {
    const toast = document.getElementById("thankYouToast");
    toast.classList.remove("hidden");

    // fade in
    setTimeout(() => toast.classList.add("show"), 10);

    // fade out after 3.5 seconds
    setTimeout(() => {
        toast.classList.remove("show");

        // fully hide after fade-out
        setTimeout(() => toast.classList.add("hidden"), 400);
    }, 3500);
}

function showError(message) {
    const popup = document.getElementById("errorPopup");
    popup.textContent = message;
    popup.classList.add("show");

    setTimeout(() => {
        popup.classList.remove("show");
    }, 5000); // fades out after 2 seconds
}

async function submitLeaderboardEntry(playerName) {

    // --- Extract stats from localStorage ---
    const played = Number(localStorage.monthclplayed) || 0;
    const stars = Number(localStorage.monthclstars) || 0;
    const wins = Number(localStorage.monthwins) || 0;
    const dynamite = Number(localStorage.cldynamite) || 0;

    const ztwins = Number(localStorage.totalclwins) || 0;
    const ztplayed = Number(localStorage.totalclplayed) || 0;
    const ztstars = Number(localStorage.totalclstars) || 0;
    const ztstreak = Number(localStorage.totalclstreak) || 0;

    const zzstar1 = Number(localStorage.starcl1count) || 0;
    const zzstar2 = Number(localStorage.starcl2count) || 0;
    const zzstar3 = Number(localStorage.starcl3count) || 0;
    const zzstar4 = Number(localStorage.starcl4count) || 0;
    const zzstar5 = Number(localStorage.starcl5count) || 0;
    const zzstarx = Number(localStorage.starclxcount) || 0;

    const winpct = played > 0 ? Math.round((wins / played) * 100) : 0;

    const now = new Date();
    const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    const today = now.getDate();

    // --- Auth guard ---
    if (!auth.currentUser) {
        await logWriteFailure("unknown", playerName, "no-auth", {
            message: "auth.currentUser was null"
        });
        return;
    }

    const playerId = auth.currentUser.uid;

	// --- Basic validation with logging ---
	if (played > today) {
		await logWriteFailure(playerId, playerName, "client-played-exceeds-today", {
			played,
			today
		});
		showError("Invalid Stats: Total Played cannot exceed today's date.");
		return;
	}

	if (wins > played) {
		await logWriteFailure(playerId, playerName, "client-wins-exceed-played", {
			wins,
			played
		});
		showError("Invalid Stats: Wins cannot exceed Total Played.");
		return;
	}

	if (stars > (5 * wins)) {
		await logWriteFailure(playerId, playerName, "client-stars-exceed-limit", {
			stars,
			wins,
			maxAllowed: wins * 5
		});
		showError("Invalid Stats: Stars cannot exceed max possible value.");
		return;
	}


    let updates = null; // <-- declared outside try so catch can access it

    try {
        const ref = doc(db, "leaderboard", playerId);
        const snap = await getDoc(ref);

        if (snap.exists()) {
            const old = snap.data();

            const statsChanged =
                old.stars !== stars ||
                old.wins !== wins ||
                old.played !== played;

            const monthChanged = old.month !== monthKey;

            // --- Skip write if nothing changed ---
            if (!statsChanged && !monthChanged) {
                return;
            }
        }

        // --- Build updates object ---
        updates = {
            name: playerName,
            played,
            stars,
            wins,
            winpct,
            month: monthKey,
            dynamite,
            ztwins,
            ztplayed,
            ztstars,
            ztstreak,
            zzstar1,
            zzstar2,
            zzstar3,
            zzstar4,
            zzstar5,
            zzstarx,
            updated: serverTimestamp()
        };

        // --- Perform write ---
        await setDoc(ref, updates, { merge: true });

    } catch (err) {
        // --- Log failure remotely ---
        await logWriteFailure(playerId, playerName, err.code || "unknown", {
            updates,
            message: err.message
        });
        throw err;
    }
}

async function logWriteFailure(uid, playerName, reason, details) {
    try {
        // 1. Log the failure
        await addDoc(collection(db, "write_failures"), {
            uid: uid || "unknown",
            playerName: playerName || "unknown",
            reason,
            details,
            ts: serverTimestamp(),
            userAgent: navigator.userAgent,
            path: window.location.pathname
        });

        // 2. Also notify the user with a popup
        if (uid) {
            const userRef = doc(db, "users", uid);

            const message = `Hey ${playerName} - Looks like your stats didn't save the last time. Please refresh the page and reach us at info@thechnlnk.com if that doesn't solve the issue. Cheers!`;

            await updateDoc(userRef, {
                popup: {
                    type: "announcement",
                    message,
                    seen: false
                }
            }).catch(async err => {
                // If user doc doesn't exist, create it
                if (err.message.includes("No document")) {
                    await setDoc(userRef, {
                        popup: {
                            type: "announcement",
                            message,
                            seen: false
                        }
                    });
                } else {
                    throw err;
                }
            });
        }

    } catch (e) {
        console.error("Failed to log write failure:", e);
    }
}



let leaderboardLoadedThisSession = false;

document.getElementById("leaderboardHeader").addEventListener("click", async function() {
    const content = document.getElementById("leaderboardContent");
    const toggle = document.getElementById("leaderboardToggle");
    const winners = document.getElementById("previousMonthWinners");

    const isOpen = content.style.maxHeight && content.style.maxHeight !== "0px";

    if (isOpen) {
        // CLOSE
        content.style.maxHeight = "0px";
        winners.classList.add("hidden");
        toggle.textContent = "▼";
		// document.getElementById("ffCollapsible").style.display = "none";
    } else {
        // OPEN

        if (!leaderboardLoadedThisSession) {
            await loadLeaderboard();
            await loadPreviousMonthWinners();
            leaderboardLoadedThisSession = true;
        }

        winners.classList.remove("hidden");
        content.style.maxHeight = content.scrollHeight + "px";
        toggle.textContent = "▲";
		// document.getElementById("ffCollapsible").style.display = "block";
    }
});

document.getElementById("notifyAllBtn").addEventListener("click", async () => {
    let ff = window.ffLeaderboard || [];

    // 🔥 DELETE INVALID USERS FROM LOCALSTORAGE AND MEMORY
    const invalidNames = ff
        .filter(p => p.id === null || p.stars === "-" || p.wins === "-" || p.winpct === "-")
        .map(p => p.name);

    // Remove from localStorage
    let ffList = JSON.parse(localStorage.ffList || "[]");
    ffList = ffList.filter(name => !invalidNames.includes(name));
    localStorage.ffList = JSON.stringify(ffList);

    // Remove from in-memory leaderboard
    ff = ff.filter(p => !invalidNames.includes(p.name));

    // 🔥 REFRESH LEADERBOARD UI
    await loadFFLeaderboard();
    // 🔥 END INVALID DELETE + REFRESH


    const me = localStorage.playerName || "Me";
    const meStats = ff.find(p => p.name === me) || { name: me, stars: 0, wins: 0, winpct: 0 };

    let all = [meStats, ...ff.filter(p => p.name !== me)];

    all.sort((a, b) => {
        if (b.stars !== a.stars) return b.stars - a.stars;
        if (b.wins !== a.wins) return b.wins - a.wins;
        return b.winpct - a.winpct;
    });

    // ⭐ Build ranked list (names only)
    const rankedList = all
        .map((p, i) => `${i + 1}. ${p.name}`)
        .join("\n");

    // ⭐ Build sharable F&F link (names only)
    const ffNames = all.map(p => p.name);
    const encoded = btoa(JSON.stringify(ffNames));
    const baseUrl = "https://thechnlnk.com";
    const shareLink = `${baseUrl}?ff=${encoded}`;

   // ⭐ Build final message (brag + ranked list + link)
    const message =
`I made this F&F Group for CHN LNK. Click to join:
${shareLink}

Current Ranking:
${rankedList}
`;

    if (navigator.share) {
        await navigator.share({ title: "CHN LNK Challenge", text: message });
    } else {
        navigator.clipboard.writeText(message);
        alert("Message copied!");
    }
});

document.getElementById("bragBtn").addEventListener("click", async () => {
    let ff = window.ffLeaderboard || [];

    // 🔥 DELETE INVALID USERS FROM LOCALSTORAGE AND MEMORY
    const invalidNames = ff
        .filter(p => p.id === null || p.stars === "-" || p.wins === "-" || p.winpct === "-")
        .map(p => p.name);

    // Remove from localStorage
    let ffList = JSON.parse(localStorage.ffList || "[]");
    ffList = ffList.filter(name => !invalidNames.includes(name));
    localStorage.ffList = JSON.stringify(ffList);

    // Remove from in-memory leaderboard
    ff = ff.filter(p => !invalidNames.includes(p.name));

    // 🔥 REFRESH LEADERBOARD UI
    await loadFFLeaderboard();
    // 🔥 END INVALID DELETE + REFRESH


    const me = localStorage.playerName || "Me";
    const meStats = ff.find(p => p.name === me) || { name: me, stars: 0, wins: 0, winpct: 0 };

    let all = [meStats, ...ff.filter(p => p.name !== me)];

    all.sort((a, b) => {
        if (b.stars !== a.stars) return b.stars - a.stars;
        if (b.wins !== a.wins) return b.wins - a.wins;
        return b.winpct - a.winpct;
    });

    // ⭐ Build ranked list WITH STATS
    const rankedList = all
        .map((p, i) => `${i + 1}. ${p.name} (${p.stars}⭐ ${p.wins}W ${p.winpct}%)`)
        .join("\n");

    // ⭐ Get brag line based on rank
    const rank = window.ffCurrentRank;
    const total = window.ffTotalPlayers;
    const closest = window.ffClosestRivalName;

    let bragLine = getBragLine(rank, total, closest);

    // ⭐ Build final message (brag + ranked list)
    const message =
`${bragLine}

Current Ranking:
${rankedList}

🔥Let's see who has the last laugh at the end of the month! #thechnlnk
`;

    if (navigator.share) {
        await navigator.share({ title: "CHN LNK Bragging Rights", text: message });
    } else {
        navigator.clipboard.writeText(message);
        alert("Message copied!");
    }
});



// ---------------------------------------------------------
// GLOBAL Helpers for localStorage friend list
// ---------------------------------------------------------
function getFFList() {
    try {
        return JSON.parse(localStorage.ffList || "[]");
    } catch {
        return [];
    }
}

function saveFFList(list) {
    localStorage.ffList = JSON.stringify(list);
}



let ffLoadedThisSession = false;

document.addEventListener("DOMContentLoaded", () => {

    // ---------------------------------------------------------
    // F&F Collapsible Click Handler
    // ---------------------------------------------------------
    document.getElementById("ffHeader").addEventListener("click", async function() {
        const content = document.getElementById("ffContent");
        const toggle = document.getElementById("ffToggle");

        const isOpen = content.style.maxHeight && content.style.maxHeight !== "0px";

        if (isOpen) {
            content.style.maxHeight = "0px";
            toggle.textContent = "▼";
        } else {

            if (!ffLoadedThisSession) {
                await loadFFLeaderboard();
                ffLoadedThisSession = true;
            }

            content.style.maxHeight = content.scrollHeight + "px";
            toggle.textContent = "▲";
        }
    });

    // ---------------------------------------------------------
    // Load F&F Leaderboard (YOU + FRIENDS)
    // ---------------------------------------------------------
    async function loadFFLeaderboard() {
        const tbody = document.getElementById("ffBody");
        tbody.innerHTML = "<tr><td colspan='6'>Loading...</td></tr>";

        const uid = auth.currentUser.uid;
        const monthKey = new Date().toISOString().slice(0,7); // YYYY-MM

        // --- A. Fetch YOUR stats ---
        let you = null;
        try {
            const meRef = doc(db, "leaderboard", uid);
            const meSnap = await getDoc(meRef);

            if (meSnap.exists()) {
                you = { id: uid, ...meSnap.data() };
            } else {
                you = {
                    id: uid,
                    name: localStorage.playerName || "You",
                    stars: 0,
                    wins: 0,
                    winpct: 0,
                    updated: 0
                };
            }
        } catch (err) {
            you = {
                id: uid,
                name: localStorage.playerName || "You",
                stars: 0,
                wins: 0,
                winpct: 0,
                updated: 0
            };
        }

        // --- B. Fetch FRIEND stats (LOCAL ONLY — NO UID LOOKUPS) ---
        const list = getFFList();

        // Show CHALLENGE button only if at least one friend exists
        const challengeBtn = document.getElementById("notifyAllBtn");
        const bragBtn = document.getElementById("bragBtn");
        const fnftextBtn = document.getElementById("cpNote");
		
        challengeBtn.style.display = list.length > 0 ? "inline-block" : "none";
        bragBtn.style.display = list.length > 0 ? "inline-block" : "none";
        fnftextBtn.style.display = list.length === 0 ? "block" : "none";
        const friends = [];

        for (let i = 0; i < list.length; i++) {
            const friendName = list[i];
            if (!friendName) continue;

            // Query leaderboard by NAME ONLY
            const q = query(
                collection(db, "leaderboard"),
                where("name", "==", friendName),
                where("month", "==", monthKey)
            );

            const snap = await getDocs(q);

            if (snap.empty) {
                // Friend exists locally but not on leaderboard
                friends.push({
                    id: null,
                    name: friendName,
                    stars: "-",
                    wins: "-",
                    winpct: "-",
                    updated: 9999999999999
                });
                continue;
            }

            // If multiple entries exist, pick the highest ranked
            const results = [];
            snap.forEach(doc => results.push({ id: doc.id, ...doc.data() }));

            results.sort((a, b) =>
                b.stars - a.stars ||
                b.wins - a.wins ||
                b.winpct - a.winpct ||
                a.updated - b.updated
            );

            friends.push(results[0]);
        }

        // --- C. Combine + Sort ---
        const combined = [you, ...friends];

        combined.sort((a, b) => {
            const sa = Number(a.stars) || 0;
            const sb = Number(b.stars) || 0;
            if (sb !== sa) return sb - sa;

            const wa = Number(a.wins) || 0;
            const wb = Number(b.wins) || 0;
            if (wb !== wa) return wb - wa;

            const pa = Number(a.winpct) || 0;
            const pb = Number(b.winpct) || 0;
            if (pb !== pa) return pb - pa;

            return (a.updated || 0) - (b.updated || 0);
        });
		
		// ⭐ STEP 2 — Compute rank + closest rival for brag system
		const myName = you.name;
		const myIndex = combined.findIndex(p => p.name === myName);
		const myRank = myIndex + 1;
		const totalPlayers = combined.length;

		window.ffCurrentRank = myRank;
		window.ffTotalPlayers = totalPlayers;

		let closest = null;
		if (myRank > 1) {
			closest = combined[myRank - 2].name;
		} else if (myRank < totalPlayers) {
			closest = combined[myRank].name;
		}
		window.ffClosestRivalName = closest;

		// ⭐ Make available globally for Notify All
		window.ffLeaderboard = combined;		

        // ⭐ Make available globally for Notify All
        window.ffLeaderboard = combined;

        // --- D. Render ---
        tbody.innerHTML = "";

        for (let i = 0; i < combined.length; i++) {
            const p = combined[i];
            const rank = i + 1;

            const row = document.createElement("tr");
            const isYou = p.id === uid;
            const isInvalid = p.id === null || p.stars === "-" || p.wins === "-" || p.winpct === "-";

            row.innerHTML = `
                <td>${rank}</td>
                <td>${p.name}</td>
                <td>${p.stars}</td>
                <td>${p.wins}</td>
                <td>${p.winpct}%</td>
                <td>
                    ${!isYou ? `<span class="ff-delete-icon" onclick="deleteFFUser('${p.name}')">X</span>` : ""}
                </td>
            `;

            if (isYou) {
                row.style.background = "rgba(255,255,255,0.1)";
                row.style.fontWeight = "bold";
                row.querySelectorAll("td").forEach(td => td.classList.add("current-player-cell"));
            }

            if (!isYou && isInvalid) {
                row.style.background = "rgba(255,0,0,0.15)";
                row.style.color = "#ff6b6b";
                row.style.fontWeight = "bold";
            }

            tbody.appendChild(row);
        }

        // --- E. Fill empty slots ---
        for (let i = combined.length + 1; i <= 8; i++) {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${i}</td>
                <td><button class="ff-add-btn" onclick="addFFUser(${i})">Add User</button></td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td></td>
            `;
            tbody.appendChild(row);
        }
    }

    window.loadFFLeaderboard = loadFFLeaderboard;
});


function addFFUser(slot) {
    const tbody = document.getElementById("ffBody");
    const row = tbody.children[slot - 1];

    row.innerHTML = `
        <td>${slot}</td>
        <td colspan="4">
            <div style="display:flex; gap:8px; align-items:center;">
                <input id="ffInput${slot}" 
                       type="text" 
                       placeholder="Enter friend's name"
                       style="flex:1; padding:6px; border-radius:6px; border:1px solid #444; background:#000; color:#fff;">
                
                <button class="ff-add-btn" onclick="saveFFUser(${slot})">Save</button>
            </div>
        </td>
		 <td></td>   <!-- NEW: empty delete-icon column -->
    `;
    // ⭐ Autofocus AFTER the HTML is inserted
    const input = document.getElementById(`ffInput${slot}`);
    input.focus();	
}

async function saveFFUser(slot) {
    let name = document.getElementById(`ffInput${slot}`).value;

    name = name.trim().replace(/\s+/g, " ").normalize("NFC");

    if (!name) {
        const tbody = document.getElementById("ffBody");
        const row = tbody.children[slot - 1];
        row.innerHTML = `
            <td>${slot}</td>
            <td><button class="ff-add-btn" onclick="addFFUser(${slot})">Add User</button></td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td></td>
        `;
        return;
    }

    const list = getFFList();
    const exists = list.some(n => n && n.toUpperCase() === name.toUpperCase());
    if (exists) {
        alert("This friend is already added.");
        return;
    }

    list[slot - 2] = name;
    saveFFList(list);
    // Force a fresh reload
    ffLoadedThisSession = false;

    const header = document.getElementById("ffHeader");

    // 1. Collapse (simulate user click)
    header.click();

    // 2. Reopen after animation (simulate second click)
    setTimeout(() => {
        header.click();
    }, 150);
}


async function deleteFFUser(name) {
    let list = getFFList();
    list = list.filter(n => n && n.toUpperCase() !== name.toUpperCase());
    saveFFList(list);
    // Refresh the table
    ffLoadedThisSession = false;
    loadFFLeaderboard();
}
window.deleteFFUser = deleteFFUser;


document.getElementById("dynamite-btn").addEventListener("click", () => {
    if (!gameOver) return;

    OpenRules();

    // Expand MASTER collapsible by simulating a click if it's not already open
    const master = document.querySelector(".collapsible.master");
    if (master && !master.classList.contains("active")) {
        master.click();
    }

    // Expand DYNAMITE collapsible by simulating a click if it's not already open
    const dynamiteButton = Array.from(document.querySelectorAll(".collapsible"))
        .find(btn => btn.textContent.includes("Dynamite"));

    if (dynamiteButton && !dynamiteButton.classList.contains("active")) {
        dynamiteButton.click();
    }

    // Smooth scroll into view
    setTimeout(() => {
        dynamiteButton.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }, 200);
});


async function loaddynamites() {
    const user = auth.currentUser;
    if (!user) return;

    const currentUID = user.uid;
    const playerRef = doc(db, "leaderboard", currentUID);

    try {
        const snap = await getDoc(playerRef);
        if (!snap.exists()) return;

        const d = snap.data();

        // -----------------------------
        // OPTIONAL POPUP CHECK (users collection)
        // -----------------------------
		const userRef = doc(db, "users", currentUID);
		const userSnap = await getDoc(userRef);

		if (userSnap.exists()) {
			const u = userSnap.data();

			// --- RESET FLAG LOGIC ---
			if (u.popup && u.popup.reset === true) {
				
				if (localStorage.getItem('gameovercl' + days) == 1) {
					localStorage.removeItem('gameovercl' + days);
					localStorage.monthclplayed = Number(localStorage.monthclplayed) - 1;
					localStorage.totalclplayed = Number(localStorage.totalclplayed) - 1;

					switch (Number(localStorage.clstarscnt)) {
						case 0:
							localStorage.starclxcount = Number(localStorage.starclxcount) - 1;
							localStorage.totalclstreak = Number(localStorage.starcl0count) + Number(localStorage.starcl1count) + Number(localStorage.starcl2count) + Number(localStorage.starcl3count) + Number(localStorage.starcl4count) + Number(localStorage.starcl5count);
							break;
						case 1:
							localStorage.totalclstars = Number(localStorage.totalclstars) - 1;
							localStorage.monthclstars = Number(localStorage.monthclstars) - 1;
							localStorage.starcl1count = Number(localStorage.starcl1count) - 1;
							localStorage.totalclstreak = Number(localStorage.totalclstreak) - 1;
							localStorage.totalclwins = Number(localStorage.totalclwins) - 1;
							localStorage.monthwins = Number(localStorage.monthwins) - 1;
							break;
						case 2:
							localStorage.totalclstars = Number(localStorage.totalclstars) - 2;
							localStorage.monthclstars = Number(localStorage.monthclstars) - 2;
							localStorage.starcl2count = Number(localStorage.starcl2count) - 1;
							localStorage.totalclstreak = Number(localStorage.totalclstreak) - 1;
							localStorage.totalclwins = Number(localStorage.totalclwins) - 1;
							localStorage.monthwins = Number(localStorage.monthwins) - 1;
							break;
						case 3:
							localStorage.totalclstars = Number(localStorage.totalclstars) - 3;
							localStorage.monthclstars = Number(localStorage.monthclstars) - 3;
							localStorage.starcl3count = Number(localStorage.starcl3count) - 1;
							localStorage.totalclstreak = Number(localStorage.totalclstreak) - 1;
							localStorage.totalclwins = Number(localStorage.totalclwins) - 1;
							localStorage.monthwins = Number(localStorage.monthwins) - 1;
							break;
						case 4:
							localStorage.totalclstars = Number(localStorage.totalclstars) - 4;
							localStorage.monthclstars = Number(localStorage.monthclstars) - 4;
							localStorage.starcl4count = Number(localStorage.starcl4count) - 1;
							localStorage.totalclstreak = Number(localStorage.totalclstreak) - 1;
							localStorage.totalclwins = Number(localStorage.totalclwins) - 1;
							localStorage.monthwins = Number(localStorage.monthwins) - 1;
							break;
						case 5:
							localStorage.totalclstars = Number(localStorage.totalclstars) - 5;
							localStorage.monthclstars = Number(localStorage.monthclstars) - 5;
							localStorage.starcl5count = Number(localStorage.starcl5count) - 1;
							localStorage.totalclstreak = Number(localStorage.totalclstreak) - 1;
							localStorage.totalclwins = Number(localStorage.totalclwins) - 1;
							localStorage.monthwins = Number(localStorage.monthwins) - 1;
							break;
					}
				}
				await updateDoc(userRef, {
					"popup.reset": false
				});
				window.location.reload();			
				return;
			}

			// --- POPUP LOGIC ---
			if (u.popup && u.popup.seen === false) {
				showPopupToUser(u.popup.type, u.popup.message);
				const serverDynamite1 = d.dynamite;
				const localDynamite1 = Number(localStorage.cldynamite ?? 0);
				await updateDoc(userRef, {
					"popup.seen": true
				});
				if (serverDynamite1 > localDynamite1) {
					localStorage.cldynamite = serverDynamite1;
					const dyn1 = Number(localStorage.cldynamite || 0);
					document.getElementById("dynamite-btn").innerText = "💣 x" + dyn1;					
					// return;
				}				
			}
		}
        // -----------------------------

        // If server has no dynamite field → do nothing
        if (!("dynamite" in d)) return;

        const serverDynamite = d.dynamite;
        const localDynamite = Number(localStorage.cldynamite ?? 0);

       // if (Number(localStorage.monthclstars ?? 0) !== Number(d.stars) && d.name === "Sankar") {
          //  localStorage.monthclstars = d.stars;
		  //  localStorage.totalclstars = d.ztstars;
          //  rankReset();
          //  return;
       // }

        // Stat Retrieve Block
       // if (Number(localStorage.totalclplayed ?? 0) < Number(d.ztplayed) || Number(localStorage.monthclplayed ?? 0) < Number(d.played)){
		if (Number(localStorage.totalclplayed ?? 0) < Number(d.ztplayed)){	
            localStorage.cldynamite = d.dynamite;
            localStorage.monthclplayed = d.played;
            localStorage.monthclstars = d.stars;
            localStorage.monthwins = d.wins;
            localStorage.totalclplayed = d.ztplayed;
            localStorage.totalclstars = d.ztstars;
            localStorage.totalclstreak = d.ztstreak;
            localStorage.totalclwins = d.ztwins;
            localStorage.starcl1count = d.zzstar1;
            localStorage.starcl2count = d.zzstar2;
            localStorage.starcl3count = d.zzstar3;
            localStorage.starcl4count = d.zzstar4;
            localStorage.starcl5count = d.zzstar5;
            localStorage.starclxcount = d.zzstarx;
            statsRetreival();
            return;
        }

        if (serverDynamite > localDynamite) {
            localStorage.cldynamite = serverDynamite;
            showDynamitePopup(serverDynamite - localDynamite);
        }

    } catch (err) {
        console.error("Error loading dynamites:", err);
    }
}


function showDynamitePopup(amountGained) {
    const gained = amountGained > 0 ? amountGained : 0;

    const popup = document.createElement("div");
    popup.className = "dynamite-popup";

    // SPECIAL CASE → gained exactly 2 (invite reward)
    if (gained === 2) {
        popup.innerHTML = `
            <div class="dynamite-popup-inner">
                <h2>💣 Dynamites Awarded 📧</h2>
                <p style="white-space: nowrap;">Thanks for your referral to <strong>CHN LNK</strong>!</p>
                <p>You earned <strong>+2 Dynamites</strong> for spreading the word.</p><br>
                <p>You now have <strong>${localStorage.cldynamite}</strong> Dynamites.</p><br>
                <button id="closeDynamitePopup">OK</button>
            </div>
        `;
    }

    // DEFAULT POPUP → leaderboard Top 3
    else {
        popup.innerHTML = `
            <div class="dynamite-popup-inner">
                <h2>💣 Dynamites Awarded 🏆 </h2>
                <p style="white-space: nowrap;">For a <strong>Top 3 Finish</strong> in the Monthly Leaderboard!</p>
                ${gained > 0 ? `<p>+${gained} new Dynamites added!</p>` : ""}
                <p>Congrats! You now have <strong>${localStorage.cldynamite}</strong> Dynamites.</p><br>
                <button id="closeDynamitePopup">OK</button>
            </div>
        `;
    }

    document.body.appendChild(popup);

    document.getElementById("closeDynamitePopup").onclick = () => {
        popup.remove();
        const dyn = Number(localStorage.cldynamite || 0);
        document.getElementById("dynamite-btn").innerText = "💣 x" + dyn;
    };
}

function showPopupToUser(type, message, reloadOnClose = false) {
    const popup = document.createElement("div");
    popup.className = "dynamite-popup";

    // Icon mapping
    const icons = {
        announcement: "📢",
        warning: "⚠️",
        reward: "🏆",
        default: "🔔"
    };

    // Title mapping (your switch block)
    let title = "";
    switch (type) {
        case "announcement":
            title = "Announcement";
            break;
        case "warning":
            title = "Important";
            break;
        case "reward":
            title = "Congratulations!";
            break;
        default:
            title = "Message";
    }

    const icon = icons[type] || icons.default;

    popup.innerHTML = `
        <div class="dynamite-popup-inner">
            <h2>${icon} ${title}</h2>
            <p>${message}</p><br>
            <button id="closeGenericPopup">OK</button>
        </div>
    `;

    document.body.appendChild(popup);

    document.getElementById("closeGenericPopup").onclick = () => {
        popup.remove();
        if (reloadOnClose) {
            window.location.reload();
        }
    };
}



function statsRetreival() {
	const popup = document.createElement("div");
    popup.className = "dynamite-popup";
    popup.innerHTML = `
        <div class="dynamite-popup-inner">
            <h2>📶 Stats Retreived ✅ </h2>
			<p>Congrats! Your Stats are successfully retreived.</p><br>
			<button id="closeDynamitePopup">OK</button>
        </div>
    `;
    document.body.appendChild(popup);

    document.getElementById("closeDynamitePopup").onclick = () => {
        popup.remove();
		window.location.reload();
    };
}




function rankReset() {
	const popup = document.createElement("div");
    popup.className = "dynamite-popup";
    popup.innerHTML = `
        <div class="dynamite-popup-inner">
            <h2>📶 Admin Rank Reset ✅ </h2>
			<p>Congrats! Admin Rank is successfully reset.</p><br>
			<button id="closeDynamitePopup">OK</button>
        </div>
    `;
    document.body.appendChild(popup);

    document.getElementById("closeDynamitePopup").onclick = () => {
        popup.remove();
		window.location.reload();
    };
}

async function loadPreviousMonthWinners() {
    const ref = doc(db, "winnerlist", "latest");
    const snap = await getDoc(ref);

    if (!snap.exists()) return;

    const data = snap.data();

    document.getElementById("prevWinnersTitle").textContent =
        `${data.monthLabel} Winners`;

	document.getElementById("prev1").innerHTML = `<span class="rotate-medal">🥇</span> ${data.first}`;
	document.getElementById("prev2").innerHTML = `<span class="rotate-medal">🥈</span> ${data.second}`;
	document.getElementById("prev3").innerHTML = `<span class="rotate-medal">🥉</span> ${data.third}`;


    document.getElementById("previousMonthWinners").classList.remove("hidden");
}


async function loadLeaderboard() {
    const leaderboardBody = document.getElementById("leaderboardBody");
    leaderboardBody.innerHTML = "<tr><td colspan='6'>Loading...</td></tr>";

    const currentUID = auth.currentUser.uid;
    const currentPlayerName = localStorage.playerName;

    // 🔥 ADMIN NAME — EXCLUDE COMPLETELY
    const ADMIN_NAME = "Sankar";

    const now = new Date();
    const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

    try {
        // --- A. Read current player's doc (1 read) ---
        let playerData = null;
        try {
            const playerRef = doc(db, "leaderboard", currentUID);
            const playerSnap = await getDoc(playerRef);
            if (playerSnap.exists()) {
                playerData = playerSnap.data();
            }
        } catch (e) {
            console.warn("Could not load current player doc:", e);
        }

        // --- 1. Read TOP 5 (fetch 6 to compensate for admin removal) ---
        const topQ = query(
            collection(db, "leaderboard"),
            where("month", "==", monthKey),
            orderBy("stars", "desc"),
            orderBy("wins", "desc"),
            orderBy("winpct", "desc"),
            orderBy("updated", "asc"),
            limit(6)
        );

        const topSnap = await getDocs(topQ);
        leaderboardBody.innerHTML = "";

        // Filter out admin by name
        let top5 = [];
        topSnap.forEach(docSnap => {
            const d = { id: docSnap.id, ...docSnap.data() };
            if (d.name !== ADMIN_NAME) top5.push(d);
        });

        // Always keep exactly 5 rows
        top5 = top5.slice(0, 5);

        // --- 2. Render top 5 with tie-aware ranks ---
        let displayRank = 1;
        for (let i = 0; i < top5.length; i++) {
            if (i > 0) {
                const prev = top5[i - 1];
                const curr = top5[i];

                const tied =
                    prev.stars === curr.stars &&
                    prev.wins === curr.wins &&
                    prev.winpct === curr.winpct;

                if (!tied) displayRank = i + 1;
            }

            const p = top5[i];
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${
                    displayRank === 1 ? "🥇" :
                    displayRank === 2 ? "🥈" :
                    displayRank === 3 ? "🥉" :
                    displayRank
                }</td>
                <td>${p.name}</td>
                <td>${p.stars}</td>
                <td>${p.wins}</td>
                <td>${p.winpct}%</td>
            `;

            if (p.id === currentUID) {
                row.style.background = "rgba(255,255,255,0.1)";
                row.style.fontWeight = "bold";
                row.querySelectorAll("td").forEach(td => td.classList.add("current-player-cell"));
            }

            leaderboardBody.appendChild(row);
        }

        // --- 3. If player is in top 5, stop here ---
        const inTop5 = top5.some(p => p.id === currentUID);
        document.getElementById("nrNote").style.display = "none";
        if (inTop5) return;

        // --- 4. Read TOP 250 (fetch 251 to compensate for admin removal) ---
        const top250Q = query(
            collection(db, "leaderboard"),
            where("month", "==", monthKey),
            orderBy("stars", "desc"),
            orderBy("wins", "desc"),
            orderBy("winpct", "desc"),
            orderBy("updated", "asc"),
            limit(251)
        );

        const top250Snap = await getDocs(top250Q);

        // Filter out admin by name
        let top250 = [];
        top250Snap.forEach(docSnap => {
            const d = { id: docSnap.id, ...docSnap.data() };
            if (d.name !== ADMIN_NAME) top250.push(d);
        });

        // Always keep exactly 250 rows
        top250 = top250.slice(0, 250);

        // --- 5. Check if user is in top 250 ---
        const idx = top250.findIndex(p => p.id === currentUID);

        if (idx === -1) {
            // Spacer row
            const spacer = document.createElement("tr");
            spacer.innerHTML = `
                <td style="text-align:center;">⋮</td>
                <td></td><td></td><td></td><td></td>
            `;
            leaderboardBody.appendChild(spacer);

            // 250th player
            const last = top250[top250.length - 1];
            const lastRow = document.createElement("tr");
            lastRow.innerHTML = `
                <td>250</td>
                <td>${last.name}</td>
                <td>${last.stars}</td>
                <td>${last.wins}</td>
                <td>${last.winpct}%</td>
            `;
            leaderboardBody.appendChild(lastRow);

            // NR row
            const userRow = document.createElement("tr");
            userRow.innerHTML = `
                <td>NR*</td>
                <td>${currentPlayerName}</td>
                <td>${playerData?.stars ?? "-"}</td>
                <td>${playerData?.wins ?? "-"}</td>
                <td>${playerData?.winpct ?? "-"}%</td>
            `;
            userRow.style.background = "rgba(255,255,255,0.1)";
            userRow.style.fontWeight = "bold";
            userRow.querySelectorAll("td").forEach(td => td.classList.add("current-player-cell"));
            leaderboardBody.appendChild(userRow);

            document.getElementById("nrNote").style.display = "inline";
            return;
        } else {
            document.getElementById("nrNote").style.display = "none";
        }

        // --- 6. User IS in top 250 → compute tie-aware rank ---
        let rank = 1;
        for (let i = 0; i < top250.length; i++) {
            if (i > 0) {
                const prev = top250[i - 1];
                const curr = top250[i];

                const tied =
                    prev.stars === curr.stars &&
                    prev.wins === curr.wins &&
                    prev.winpct === curr.winpct;

                if (!tied) rank = i + 1;
            }

            if (top250[i].id === currentUID) break;
        }

        const d = top250[idx];

        // --- 7. Render user row as extra entry ---
        if (rank >= 7) {
            const spacer = document.createElement("tr");
            spacer.innerHTML = `
                <td style="text-align:center;">⋮</td>
                <td></td><td></td><td></td><td></td>
            `;
            leaderboardBody.appendChild(spacer);
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
        row.style.background = "rgba(255,255,255,0.1)";
        row.style.fontWeight = "bold";
        row.querySelectorAll("td").forEach(td => td.classList.add("current-player-cell"));

        leaderboardBody.appendChild(row);

    } catch (err) {
        console.error("Leaderboard error:", err);
        leaderboardBody.innerHTML = "<tr><td colspan='6'>Error loading leaderboard.</td></tr>";
    }
}



function showGame() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("game").style.display = "block";
}


function postStatsToWhatsApp() {

    if (localStorage.clgamecnt == 6) {
        var cluehdr = "X/5";
    } else {
        cluehdr = localStorage.clgamecnt + "/5";
    }

    switch (Number(localStorage.clgamecnt)) {
        case 0:
            var clueicon = "⚪ ⚪ ⚪ ⚪ ⚪"
            break;
        case 1:
            var clueicon = "⭐ ❌ ❌ ❌ ❌"
            break;
        case 2:
            var clueicon = "⭐ ⭐ ❌ ❌ ❌"
            break;
        case 3:
            var clueicon = "⭐ ⭐ ⭐ ❌ ❌"
            break;
        case 4:
            var clueicon = "⭐ ⭐ ⭐ ⭐ ❌"
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
    const tierLine = tier ? `${tiericon} Level: ${tier}` : "";
    return `🔗 CHN LNK # ${puzzleNumber} 🧩

${movesUsed} - ${dots}
🔥 Streak: ${streak} | ⭐ Stars: ${stars}
${tierLine}

https://thechnlnk.com`;
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
    // await loadLeaderboard();

    // Now show the leaderboard 
    document.getElementById("leaderboardCollapsible").style.display = "block";
	document.getElementById("ffCollapsible").style.display = "block";

}

async function OpenStatsGO() {

    // Ensure player name exists BEFORE loading leaderboard
    await initPlayerName();

    // Now safe to load leaderboard
    // await loadLeaderboard();

    // Now show the leaderboard 
    document.getElementById("leaderboardCollapsible").style.display = "block";
	document.getElementById("ffCollapsible").style.display = "block";

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
    HTMLButton.innerHTML = `
        <span class="invite-inner">
            SHARE<span class="blink-icon1">📲</span>
        </span>
    `;
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
    // localStorage.setItem("clshowalert", 0);
}

// if (!localStorage.clshowalert) {
    // localStorage.setItem("clshowalert", 0);
// }

if (!localStorage.clhardmode) {
    localStorage.setItem("clhardmode", 0);
}

// if (localStorage.getItem('gameovercl30') == 0 && (!localStorage.cl30reset)) {
	// localStorage.removeItem('gameovercl30');
	// localStorage.cl30reset = 1;
// }
	
// Baseline Date (Jan 9, 2026 at local midnight)
const start = new Date(2026, 0, 9);
start.setHours(0, 0, 0, 0);

// Convert a date to a stable LOCAL day number (DST-proof, leap-year-proof)
function toLocalDayNumber(date) {
    // Clone and normalize to local midnight
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);

    // Convert local midnight to a UTC-aligned timestamp
    // This removes timezone and DST offsets entirely
    const localMidnightUTC = d.getTime() - (d.getTimezoneOffset() * 60000);

    // Convert to day index
    return Math.floor(localMidnightUTC / 86400000);
}

// Compute today's puzzle index (increments exactly at local midnight)
const today = new Date();
const days = toLocalDayNumber(today) - toLocalDayNumber(start);

// if ((localStorage.getItem('gameovercl39') == 1) && (!localStorage.cl39reset) && (localStorage.clgamecnt == 6) && (days == 39)) {
	// localStorage.removeItem('gameovercl39');
	// localStorage.cl39reset = 1;
	// localStorage.monthclplayed = Number(localStorage.monthclplayed) - 1;
	// localStorage.starclxcount = Number(localStorage.starclxcount) - 1;
	// localStorage.totalclplayed = Number(localStorage.totalclplayed) - 1;
	// localStorage.totalclstreak = Number(localStorage.starcl0count) + Number(localStorage.starcl1count) + Number(localStorage.starcl2count) + Number(localStorage.starcl3count) + Number(localStorage.starcl4count) + Number(localStorage.starcl5count) ;
// }
if (localStorage.getItem('gameovercl' + days) != 0 && localStorage.getItem('gameovercl' + days) != 1) {
    localStorage['gameovercl' + days] = 0;
    localStorage['gamestatcl' + days] = 0;
    localStorage.setItem("cllives", "⚪⚪⚪⚪⚪");
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
	localStorage.setItem("cldynamiteUsedThisRound", "false");
	localStorage.setItem("slotmachine", 0);
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
        tiericon = "💎";
    } else {
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
    localStorage.monthclstars = Number(localStorage.monthclstars) - 2;

    // Restore 1 life
    localStorage.cllivescnt = Number(localStorage.cllivescnt) - 1;

    // Update life display
    const livesLeft = 5 - Number(localStorage.cllivescnt);
    localStorage.cllives = "⚪".repeat(livesLeft);
    document.getElementById("lives").innerText = localStorage.cllives;
    document.getElementById("answer").innerText = "";
    // Animation
    showLifeRestored();
}


function showLifeRestored() {
    const pop = document.createElement("div");
    pop.id = "life-restored";
    pop.innerText = "+1 LIFE ⚪";
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

    // ⭐ Animate the dynamite button
    // animateDynamiteButton();

    // ⭐ If tutorial not shown, show it now
    if (!localStorage.getItem("cldynamiteTutorialShown")) {
        setTimeout(() => {
            showStreakPopup(
                "💣 DYNAMITE ELIMINATES 3 INVALID LETTERS FROM THE KEYBOARD ⌨️"
            );
            localStorage.setItem("cldynamiteTutorialShown", "true");
        }, 2600); // small delay so animation feels smooth
    }

    setTimeout(() => pop.remove(), 2000);
}

function showMysteryAdded() {
    const pop = document.createElement("div");
    pop.id = "life-restored";
    pop.innerText = "IDENTIFY MYSTERY LETTER ❓";
    document.body.appendChild(pop);

    setTimeout(() => pop.remove(), 2000);
}

function showSafetyNetPopup() {
    const pop = document.createElement("div");
    pop.id = "life-restored"; // reuse same styling
    pop.innerText = "😇 SAFETY NET ACTIVE — NO LIFE LOST!";
    document.body.appendChild(pop);

    setTimeout(() => pop.remove(), 2000);
}

function updateHintProgress(consecutiveDays, hintAvailable) {
    const circle = document.getElementById("hint-circle");
    const bulb = document.getElementById("hint-bulb");

    // If hint is already earned, freeze at 100%
    if (hintAvailable) {
        circle.style.background = `conic-gradient(white 360deg, #444 360deg)`; 
        bulb.classList.add("ready");
        return;
    }

    // Otherwise show progress toward earning it
    const percent = Math.min(consecutiveDays, 4) * 25;
    const degrees = (percent / 100) * 360;

    circle.style.background = `conic-gradient(
        white ${degrees}deg,   /* CHANGED from yellow → white */
        #444 ${degrees}deg
    )`;

    if (percent === 100) {
        bulb.classList.add("ready");
    } else {
        bulb.classList.remove("ready");
    }
}

document.getElementById("hint-bulb").addEventListener("click", () => {
    if (!gameOver) {
        // NORMAL BEHAVIOR DURING GAMEPLAY
        const { hintAvailable } = getHintState();

        if (!hintAvailable) {
            updateAnswer("Safety Net Inactive — play 4 consecutive days to activate!");
        } else {
            updateAnswer("Safety Net Active — one incorrect entry won’t cost a life!");
        }
        return;
    }

    // GAME OVER → OPEN MODAL + EXPAND SAFETY NET
    OpenRules();

    // Expand MASTER collapsible ("📘 Additional Rules") using a real click
    const master = document.querySelector(".collapsible.master");
    if (master && !master.classList.contains("active")) {
        master.click();
    }

    // Expand SAFETY NET collapsible using a real click
    const safetyButton = Array.from(document.querySelectorAll(".collapsible"))
        .find(btn => btn.textContent.includes("Safety Net"));

    if (safetyButton && !safetyButton.classList.contains("active")) {
        safetyButton.click();
    }

    // Smooth scroll into view
    setTimeout(() => {
        safetyButton.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }, 200);
});



function showPerfectSolve() {
    const box = document.createElement("div");
    box.id = "perfect-solve";
    if (localStorage.clhardmode == 1) {
        box.innerHTML = `
			<div class="perfect-burst"></div>
			<div class="perfect-text">👌 PERFECT SOLVE +3 💣</div>
		`;
    } else {
        box.innerHTML = `
			<div class="perfect-burst"></div>
			<div class="perfect-text">👌 PERFECT SOLVE +2 💣</div>
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
    if (gameOver) return;
	// if (localStorage.clMysteryActive === "true") {
        // const MysteryLetter = localStorage.clMysteryLetter;
        // removeQuestionFromTile(MysteryLetter);
        // localStorage.clMysteryActive = "false";
    // }
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

    shuffle(eligibleKeys);

    const toRemove = eligibleKeys.slice(0, 3);

    let disabledkeyarr = JSON.parse(localStorage.getItem("cldisabledkey")) || [];
    const removedLetters = [];

    toRemove.forEach(k => {
        k.classList.add("disabled");

        const letter = k.id.replace("Key", "");
        removedLetters.push(letter);

        disabledkeyarr.push(letter);
    });

    localStorage.setItem("cldisabledkey", JSON.stringify(disabledkeyarr));
    localStorage.setItem("cldynamiteUsedThisRound", "true");

    showDynamiteBlast();

    // ⭐ First-time tutorial AFTER action, showing removed letters
    if (!localStorage.getItem("cldynamiteTutorialShown")) {
        localStorage.setItem("cldynamiteTutorialShown", "true");

        showStreakPopup(
			"💣 DYNAMITE ELIMINATES 3 INVALID LETTERS FROM THE KEYBOARD ⌨️" +
            "\nDYNAMITE ELIMINATED: " + removedLetters.join(", ") 
        );
        return;
    }

    // Normal message for future uses
    showMessage("DYNAMITE ELIMINATED: " + removedLetters.join(", "));
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
        showMessage("NO DYNAMITES AVAILABLE. <br>CHECK ? TO LEARN MORE.");
    }
    btn.classList.add("shake");
    setTimeout(() => btn.classList.remove("shake"), 400);
}


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
async function myFunction() {
    const gameCount = Number(localStorage.clgamecnt);

    const cluehdr = (gameCount === 6) ? "X/5" : `${gameCount}/5`;

    let clueicon = "";
    switch (gameCount) {
        case 0: clueicon = "⚪ ⚪ ⚪ ⚪ ⚪"; break;
        case 1: clueicon = "⭐ ❌ ❌ ❌ ❌"; break;
        case 2: clueicon = "⭐ ⭐ ❌ ❌ ❌"; break;
        case 3: clueicon = "⭐ ⭐ ⭐ ❌ ❌"; break;
        case 4: clueicon = "⭐ ⭐ ⭐ ⭐ ❌"; break;
        case 5: clueicon = "⭐ ⭐ ⭐ ⭐ ⭐"; break;
        case 6: clueicon = "❌❌❌❌❌"; break;
    }

    let copyText =
`🔗 CHN LNK #${days} 🧩

${cluehdr} - ${clueicon}
🔥 Streak: ${localStorage.totalclstreak} | ⭐ Stars: ${localStorage.totalclstars}
`;

    if (tierlevel !== "") {
        copyText += `${tiericon} Level: ${tierlevel}\n`;
    }

    copyText += `\nhttps://thechnlnk.com`;

    // ⭐ MOBILE: Native share sheet
    if (navigator.share && /Mobi|Android|iPhone/i.test(navigator.userAgent)) {
        try {
            await navigator.share({
                title: "CHN LNK",
                text: copyText   // everything goes here
            });
            return;

        } catch (err) {
            console.log("Native share cancelled, falling back to clipboard.");
        }
    }

    // ⭐ DESKTOP: Copy to clipboard only
    navigator.clipboard.writeText(copyText);

    const HTMLButton = document.getElementById("HTMLButton");
    // HTMLButton.innerText = "COPIED✅";
    HTMLButton.innerHTML = `
        <span class="invite-inner">
            COPIED<span class="blink-icon1">✅</span>
        </span>
    `;	
    setTimeout(ResetButton, 1000);
}

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
	["lucky","stone","cold","blood","group","photo","finish","k.achu"],
	["light","weight","lifting","gear","change","over","time","gouri"],
	["coffee","table","tennis","match","point","break","room","h_ll"],
	["desert","wind","mill","stone","age","limit","line",""],
	["morning","dew","drop","zone","defense","system","check",""],
	["fire","dance","party","popper","bottle","neck","collar","gouri"],
	["traffic","light","speed","trap","door","frame","shop",""],
	["crystal","clear","view","point","guard","rail","car",""],
	["thunder","clap","back","pack","leader","board","game",""],
	["shadow","boxing","glove","puppet","master","mind","control","Kanishk"],
	["island","nation","state","fair","trade","route","map",""],
	["hydro","power","play","curling","rock","maple","syrup",""],
	["screen","shot","glass","window","frame","work","station","Vidya"],	
	["candle","flame","thrower","squad","goal","keeper","net",""],
	["rocket","fuel","tank","top","shelf","life","jacket",""],
	["family","bond","paper","cut","line","dance","floor",""],
	["gingerbread","house","agent","general","science","fiction","writer","Kanishk"],
	["sun","baked","good","evening","news","paper","clip","adailysliceoforange"],
	["soda","pop","quiz","master","switch","board","walk","kevin"],
	["train","station","wagon","wheel","well","deserved","fate","ilost"],
	["summer","heat","wave","form","letter","carrier","bag",""],
	["cotton","thread","count","down","town","square","root",""],
	["marble","statue","garden","party","favor","box","office",""],
	["code","red","cross","country","club","sandwich","bag","Div"],
	["merry","christmas","tree","house","break","fast","back","Anirudh"],	
	["dragon","scale","model","train","track","record","holder",""],
	["pepper","mill","worker","strike","zone","call","center",""],
	["harbor","seal","team","captain","chair","lift","ticket",""],
	["riverbank","erosion","control","panel","show","time","keeper",""],
	["sleep","walking","pole","jumping","jack","rabbit","hutch","elysia"],
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
	["shutter","speed","tracking","device","control","panel","board","Vidya"],
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
	["race","car","alarm","clock","face","mask","out","alski"],
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
	["coral","tidepool","life","jacket","pocket","watch","tower",""],
	["slow","baked","potato","salad","dressing","room","divider",""],
	["wind","mill","stone","wall","paper","cut","throat",""],
	["garlic","press","box","lunch","time","machine","washable",""],
	["fine","dining","table","tennis","racquet","ball","gown",""],
	["snow","cone","head","first","class","act","fast",""],
	["recycled","plastic","surgeon","general","admission","ticket","booth",""],
	["knee","deep","sleep","over","easy","access","denied",""],
	["still","water","melon","head","count","down","pour",""],
	["iron","man","cave","drawing","room","number","line",""],
	["dart","board","walk","back","ground","ball","bearing",""],
	["spring","board","walk","way","back","pack","rat",""],
	["jazz","band","wagon","wheel","house","hold","tight",""],
	["puppy","love","letter","carrier","pigeon","hole","punch",""],
	["net","gain","weight","loss","leader","board","member",""],
	["periodic","table","saw","horse","race","track","record",""],
	["heavenly","body","double","space","walk","around","town",""],
	["movie","night","light","switch","blade","runner","up",""],
	["move","over","head","first","step","forward","thinking",""],
	["chill","out","side","kick","start","fresh","air",""],
	["grand","baby","swiss","bank","loan","shark","tank",""],
	["olive","oil","lamp","post","office","building","permit",""],
	["top","hat","trick","shot","glass","door","bell",""],
	["tool","box","spring","roll","call","sign","post",""],
	["remote","start","over","kill","joy","ride","share",""],
	["walnut","bread","pudding","pop","tart","cherry","pie",""],
	["side","kick","ball","joint","venture","capital","city",""],
	["wild","card","stock","photo","bomb","shell","game",""],
	["double","rainbow","road","block","party","balloon","animal",""],
	["dungeon","master","mind","blown","away","game","plan",""],
	["japanese","garden","state","bird","food","fight","club",""],
	["wafer","thin","ice","skate","ramp","up","town",""],
	["sit","down","south","pacific","ocean","water","vapor",""],
	["love","language","school","district","attorney","general","store",""],
	["smelly","fish","stick","around","town","square","foot",""],
	["tick","off","balance","sheet","rock","face","time",""],
	["rain","drop","dead","head","over","kill","time",""],
	["purple","rain","shower","head","cold","sore","loser",""],
	["secret","agent","orange","tree","branch","out","reach",""],
	["master","key","ring","leader","board","room","service",""],
	["heart","break","dance","floor","board","game","plan",""],
	["turkey","dinner","roll","call","center","field","day",""],
	["oil","lamp","shade","tree","house","guest","book",""],
	["traffic","circle","back","down","time","machine","wash",""],
	["ice","box","office","supply","chain","store","credit",""],
	["mean","time","slot","machine","gun","shot","glass",""],
	["part","time","honored","guest","towel","rack","railway",""],
	["monkey","bread","basket","case","closed","border","patrol",""],
	["glee","club","soda","water","aerobics","class","dismissed",""],
	["blue","grass","root","beer","belly","button","down",""],
	["jewel","heist","movie","trailer","park","ranger","station",""],
	["sleep","walk","way","out","smart","cookie","cutter",""],
	["coffee","break","up","start","trouble","shoot","hoops",""],
	["easter","parade","ground","round","about","nothing","else",""],
	["nail","polish","silver","spoon","rest","area","rug",""],
	["animated","movie","theater","balcony","seating","chart","topping",""],
	["landing","pad","lock","box","spring","roll","call",""],
	["hat","trick","pony","express","mail","service","charge",""],
	["easy","target","practice","round","number","one","time",""],
	["blood","bank","roll","call","back","fire","truck",""],
	["duty","free","country","kitchen","table","salt","shaker",""],
	["pry","open","mind","game","show","business","partner",""],
	["silver","spoon","fed","up","front","desk","job",""],
	["ugly","sweater","weather","proof","positive","feedback","loop",""],
	["champagne","bottle","cap","stone","cold","war","machine",""],
	["home","base","camp","fire","fighter","jet","black",""],
	["hidden","talent","scout","leader","board","meeting","place",""],
	["street","light","house","work","force","field","trip",""],
	["green","light","show","boat","house","cat","nip",""],
	["red","sea","horse","back","flip","phone","booth",""],
	["last","minute","hand","print","media","outlet","mall",""],
	["stranger","danger","zone","defense","strategy","game","night",""],
	["theater","kid","rock","show","pony","express","lane",""],
	["take","charge","account","balance","board","meeting","place",""],
	["tennis","ball","park","ranger","station","wagon","wheel",""],
	["fast","lane","change","order","form","field","test",""],
	["bank","note","card","game","day","bed","frame",""],
	["green","onion","powder","puff","pastry","cloth","napkin",""],
	["light","switch","side","job","market","trend","setter",""],
	["dry","clean","cut","short","story","book","fair",""],
	["credit","check","please","hold","fast","food","fight",""],
	["umbrella","stand","tall","order","out","come","clean",""],
	["sorry","sight","line","up","town","center","stage",""],
	["fortune","cookie","dough","boy","scout","master","plan",""],
	["marble","run","away","game","bird","watching","tv",""],
	["smoke","free","play","house","special","event","planning",""],
	["brain","storm","drain","cover","story","book","mark",""],
	["rubber","duck","pond","fish","stick","figure","skating",""],
	["music","note","book","shelf","life","time","off",""],
	["vibrant","color","blind","side","dish","towel","rack",""],
	["burning","rubber","band","together","forever","young","crowd",""],
	["brass","ring","size","down","under","pressure","cooker",""],
	["safety","pin","drop","box","car","wash","cloth",""],
	["candy","cane","sugar","rush","hour","glass","ceiling",""],
	["candy","cane","sugar","plum","tree","house","warming",""],
	["black","hole","punch","line","dance","hall","monitor",""],
	["safety","first","lady","finger","food","truck","stop",""],
	["art","school","bus","stop","sign","language","barrier",""],
	["red","carpet","burn","in","flight","deck","hand",""],
	["razor","sharp","cheddar","cheese","cracker","jack","hammer",""],
	["high","rise","above","ground","level","off","white",""],
	["entrance","exam","room","access","road","trip","advisor",""],
	["crack","open","sesame","street","smart","cookie","monster",""],
	["tooth","pick","pocket","watch","dog","house","guest",""],
	["french","toast","master","mind","game","night","shift",""],
	["smooth","sailing","club","sandwich","bread","crumb","cake",""],
	["haunted","house","party","animal","rescue","mission","control",""],
	["lamp","shade","tree","branch","out","last","call",""],
	["movie","plot","twist","tie","rack","up","stairs",""],
	["fried","fish","stick","shift","key","nutrient","dense",""],
	["picture","perfect","match","game","ready","made","man",""],
	["boxing","gym","rat","race","car","door","hinge",""],
	["budget","cut","loose","tooth","pick","clean","room",""],
	["chestnut","brown","sugar","free","trial","run","around",""],
	["cloud","cover","song","list","price","check","mark",""],
	["game","show","time","out","smart","phone","call",""],
	["great","white","elephant","trunk","hatch","door","bell",""],
	["green","house","party","animal","kingdom","come","back",""],
	["stinger","scorpion","tail","back","track","event","planner",""],
	["egg","white","lie","flat","tire","pressure","cooker",""],
	["fur","baby","shower","cap","size","chart","topper",""],
	["swedish","fish","pond","lily","pad","lock","up",""],
	["fast","internet","troll","doll","house","music","video",""],
	["horse","race","car","pool","party","trick","question",""],
	["stainless","steel","wool","sweater","dress","rehearsal","dinner",""],
	["food","fight","club","music","box","score","keeper",""],
	["chocolate","cake","plate","glass","eye","ball","bearing",""],
	["color","purple","rain","storm","drain","board","room",""],
	["lay","flat","tire","pressure","cook","out","cold",""],
	["pirate","flag","ship","shape","shift","manager","approval",""],
	["bunny","rabbit","foot","loose","lip","stick","up",""],
	["power","trip","wire","tap","dance","music","festival",""],
	["birthday","gift","horse","race","car","wash","tub",""],
	["fire","truck","stop","sign","language","barrier","reef",""],
	["ever","green","pepper","spray","paint","brush","fire",""],
	["pencil","drawing","board","walk","through","put","off",""],
	["bridge","tower","control","group","therapy","dog","fight",""],
	["reality","star","struck","gold","brick","work","out",""],
	["just","born","free","checking","account","balance","beam",""],
	["cyber","space","travel","guide","book","fair","deal",""],
	["iron","man","cave","drawing","board","game","show",""],
	["white","flag","pole","vault","door","stop","sign",""],
	["highway","exit","sign","post","season","ticket","counter",""],
	["balloon","animal","farm","house","cleaning","service","call",""],
	["pet","rock","show","room","service","animal","lover",""],
	["cold","case","study","guide","dog","house","party",""],
	["paper","bag","pipe","dream","job","title","page",""],
	["poison","oak","tree","lined","paper","tiger","cub",""],
	["scary","movie","ticket","counter","culture","shock","absorber",""],
	["leopard","shark","tank","top","secret","ballot","box",""],
	["garbage","truck","stop","watch","tower","bridge","loan",""],
	["mountain","peak","season","pass","word","play","ground",""],
	["greek","salad","bar","tender","care","free","range",""],
	["steel","drum","roll","call","girl","power","ranger",""],
	["immediate","family","style","guide","post","card","board",""],
	["hot","mess","around","town","square","dance","floor",""],
	["grip","strength","training","camp","fire","escape","room",""],
	["swan","lake","bed","bug","spray","paint","brush",""],
	["empire","state","flag","pole","dance","off","topic",""],
	["toss","salad","dressing","room","service","animal","house",""],
	["council","chamber","music","school","spirit","guide","dog",""],
	["give","credit","card","game","face","lift","off",""],
	["under","cover","song","bird","watch","tower","defense",""],
	["bi","polar","bear","cub","scout","leader","board",""],
	["magic","spell","check","twice","daily","grind","out",""],
	["paper","back","door","frame","work","shop","keeper",""],
	["bicycle","chain","link","fence","post","war","zone",""],
	["quarter","back","scratch","off","hand","wave","breaker",""],
	["spell","book","worm","wood","worker","bee","hive",""],
	["navy","blue","cheese","cloth","napkin","ring","toss",""],
	["apple","sauce","pan","handle","bar","code","word",""],
	["pay","phone","book","store","front","desk","job",""],
	["bed","head","space","station","break","down","under",""],
	["work","hard","rock","solid","gold","leaf","blower",""],
	["chain","reaction","time","travel","channel","guide","dog",""],
	["sun","flower","power","line","dance","floor","plan",""],
	["test","question","mark","down","payment","method","actor",""],
	["photo","shoot","out","house","guest","room","service",""],
	["diamond","ring","toss","up","north","star","gaze",""],
	["ever","after","thought","bubble","tea","leaf","blower",""],
	["good","morning","breath","taking","over","easy","going",""],
	["branch","off","center","stage","coach","bag","pipe",""],
	["nothing","doing","fine","print","run","wild","flower",""],
	["milk","chocolate","factory","outlet","mall","cop","out",""],
	["new","year","book","case","study","group","think",""],
	["pumpkin","patch","work","smart","phone","call","center",""],
	["bad","dream","team","player","piano","man","eater",""],
	["complete","opposite","side","eye","ball","game","show",""],
	["family","tree","house","hold","over","night","fall",""],
	["repair","man","up","town","house","guest","room",""],
	["ice","pack","animal","print","shop","local","time",""],
	["catch","fire","truck","stop","sign","out","loud",""],
	["ripe","avocado","pit","bull","frog","prince","charles",""],
	["classical","jazz","club","soda","fountain","pen","pal",""],
	["thus","far","gone","away","game","cock","fight",""],
	["diamond","ring","toss","out","look","back","pain",""],
	["broken","record","store","front","row","boat","yard",""],
	["base","hit","job","title","fight","club","sandwich",""],
	["king","pin","board","walk","way","back","track",""],
	["pop","corn","dog","house","guest","pass","over",""],
	["gray","area","code","breaker","box","office","space",""],
	["hairy","situation","room","key","word","game","show",""],
	["early","morning","coffee","bean","sprout","up","start",""],
	["quick","sand","storm","drain","pipe","dream","catcher",""],
	["silly","goose","egg","white","flag","pole","vault",""],
	["tailgate","party","foul","mouth","guard","dog","pound",""],
	["closer","look","up","town","house","hunting","ground",""],
	["safe","keeping","clean","shaven","head","hunting","lodge",""],
	["wasp","nest","egg","plant","food","court","martial",""],
	["shower","curtain","call","girl","talk","back","bone",""],
	["super","star","fish","stick","figure","eight","ball",""],
	["hawaiian","punch","drunk","tank","top","banana","pudding",""],
	["steam","engine","oil","change","purse","strings","attached",""],
	["record","breaking","news","paper","napkin","ring","finger",""],
	["glue","stick","around","town","square","meal","prep",""],
	["great","job","offer","letter","head","way","out",""],
	["finger","bone","head","start","over","weight","limit",""],
	["lone","star","struck","down","town","square","peg",""],
	["pirate","treasure","chest","cold","call","center","field",""],
	["outer","space","station","wagon","wheel","chair","cushion",""],
	["granola","bar","bell","curve","ball","field","mouse",""],
	["gang","sign","language","barrier","wall","clock","hand",""],
	["guitar","solo","mission","control","freak","show","dog",""],
	["space","shuttle","bus","pass","judgement","day","job",""],
	["white","noise","maker","space","walk","tall","tale",""],
	["summer","camp","fire","alarm","clock","tower","defense",""],
	["pumpkin","spice","market","price","out","loud","mouth",""],
	["generous","offer","up","side","table","saw","dust",""],
	["turtle","wax","museum","glass","case","study","hall",""],
	["group","photo","album","cover","girl","friend","request",""],
	["pack","animal","kingdom","come","home","run","wild",""],
	["corner","store","credit","union","jack","frost","bite",""],
	["lightning","flash","light","touch","screen","share","price",""],
	["heat","lamp","shade","tree","farm","land","line",""],
	["bust","open","road","work","bench","warmer","weather",""],
	["veronica","mars","bar","stool","sample","size","matters",""],
	["ice","cream","cheese","cake","mix","tape","worm",""],
	["social","work","place","card","table","tennis","bracelet",""],
	["time","machine","learning","curve","ball","game","night",""],
	["comedy","club","sandwich","shop","talk","trash","bin",""],
	["school","bus","stop","sign","language","barrier","reef",""],
	["lead","pencil","pusher","pin","head","room","service",""],
	["bake","sale","price","check","mark","up","lift",""],
	["sugar","cube","root","beer","pong","table","cloth",""],
	["beat","down","town","house","rental","property","value",""],
	["house","party","animal","cracker","jack","hammer","head",""],
	["long","lost","world","cup","size","zero","gravity",""],
	["rap","sheet","music","video","call","sign","off",""],
	["reflex","action","star","power","plant","life","line",""],
	["call","out","cold","winter","coat","tail","number",""],
	["drift","wood","stock","exchange","student","driver","license",""],
	["red","eye","candy","cane","sugar","daddy","daycare",""],
	["silent","night","stand","point","break","fast","forward",""],
	["poll","worker","bee","sting","ray","gun","belt",""],
	["birthday","candle","light","switch","blade","runner","up",""],
	["group","photo","finish","strong","arm","chair","lift",""],
	["thunder","storm","cloud","cover","letter","head","start",""],
	["black","belt","buckle","up","high","quality","time",""],
	["puzzle","piece","meal","plan","prep","school","bell",""],
	["gold","mine","field","day","dream","boat","ride",""],
	["chili","powder","puff","piece","meal","time","stamp",""],
	["model","train","track","record","label","price","tag",""],
	["navel","orange","juice","bar","tab","key","fob",""],
	["sand","paper","weight","loss","leader","ship","yard",""],
	["grape","fruit","juice","press","release","date","line",""],
	["nesting","doll","face","lift","ticket","agent","orange",""],
	["glasses","case","closed","door","bell","curve","ball",""],
	["serial","killer","whale","bone","dry","creek","bed",""],
	["barrier","reef","shark","week","long","hair","piece",""],
	["silky","smooth","surface","tension","headache","relief","pitcher",""],
	["creative","thinking","back","bend","over","time","warp",""],
	["wireless","speaker","phone","book","burning","love","life",""],
	["pizza","party","time","zone","out","cast","iron",""],
	["neck","pillow","fight","fair","trade","school","bus",""],
	["credit","card","table","spoon","feed","back","home",""],
	["family","tree","branch","office","party","hat","trick",""],
	["locker","room","service","call","center","court","case",""],
	["turnpike","exit","door","prize","winning","ticket","broker",""],
	["sweet","potato","head","first","cut","off","broadway",""],
	["drum","stick","figure","head","stone","cold","weather",""],
	["brief","case","study","guide","book","end","game",""],
	["arm","chair","lift","off","key","stone","mason",""],
	["simple","truth","bomb","threat","level","headed","home",""],
	["gut","feeling","good","day","off","shore","line",""],
	["skate","ramp","up","wind","fall","fashion","sense",""],
	["sharp","knife","edge","case","study","guide","line",""],
	["early","bird","call","center","piece","meal","plan",""],
	["salad","fork","over","pass","time","travel","light",""],
	["ketchup","bottle","neck","deep","dive","bar","mitzvah"],
	["home","school","bell","bottom","dollar","sign","off"],
	["fighter","jet","ski","jump","rope","swing","set"],
	["history","channel","surf","board","game","face","lift"],
	["auto","pay","day","care","free","trade","show"],
	["chemical","reaction","time","sheet","cake","pop","tart"],
	["steam","train","car","race","track","team","sport"],
	["garbage","truck","bed","room","number","pad","lock"],
	["giant","squid","ink","jet","black","top","heavy"],
	["full","moon","dust","storm","front","page","turner"],
	["easy","street","food","chain","saw","dust","buster"],
	["beaded","curtain","call","off","hand","ball","drop"],
	["sure","fire","drill","sergeant","major","general","store"],
	["honey","comb","over","hang","tight","space","force"],
	["prune","juice","glass","ceiling","fan","base","coat"],
	["serving","spoon","feed","back","talk","radio","station"],
	["smooth","move","over","night","watch","dog","house"],
	["main","squeeze","bottle","rocket","science","fair","game"],
	["mission","control","freak","accident","report","back","draft"],
	["cotton","candy","bar","soap","bubble","gum","drop"],
	["wrecking","ball","point","guard","rail","road","block"],
	["grass","fed","up","hill","side","kick","start"],
	["prom","dress","code","red","pepper","jack","hammer"],
	["fist","fight","dirty","laundry","list","price","cut"],
	["drug","store","credit","check","mark","off","road"],
	["finger","tip","toe","nail","file","cabinet","member"],
	["magnet","school","lunch","counter","strike","gold","mine"],
	["daily","double","time","share","price","check","engine"],
	["flying","high","road","house","sitting","room","mate"],
	["popsicle","stick","around","town","car","jack","rabbit"],
	["exhaust","pipe","bomb","shell","game","over","time"],
	["maple","sugar","high","fashion","show","room","divider"],
	["hornet","nest","egg","salad","bowl","cut","loose"],
	["magazine","cover","letter","head","cold","water","slide"],	
	["bald","eagle","eye","witness","stand","up","tight"],
	["copy","cat","walk","about","face","palm","tree"],
	["loose","cannon","ball","park","bench","press","pass"],
	["hard","rock","band","camp","ground","beef","stew"],
	["ghost","story","line","cook","book","fair","fight"],
	["banana","split","second","nature","trail","mix","tape"],
	["hot","flash","frozen","dinner","date","night","shift"],
	["smoke","screen","test","pilot","light","show","off"],
	["cow","boy","band","stand","still","life","style"],
	["surround","sound","track","record","high","school","house"],
	["romantic","comedy","tour","bus","ticket","office","cubicle"],
	["answering","machine","wash","board","game","night","owl"],
	["bitter","sweet","spot","check","list","price","tag"],
	["peanut","butter","knife","fight","song","bird","seed"],
	["arm","rest","stop","light","year","book","case"],
	["swear","word","cloud","storage","shed","light","jacket"],
	["blue","blood","hound","dog","tag","along","side"],
	["power","nap","time","bomb","squad","car","seat"],
	["dumb","bell","hop","scotch","tape","measure","up"],
	["coffee","table","tennis","elbow","grease","monkey","bread"],
	["wedding","ring","tone","deaf","ear","plug","in"],
	["skin","deep","sea","food","bank","account","balance"],
	["friendly","fire","hazard","pay","grade","school","night"],
	["beauty","sleep","tight","end","user","manual","override"],
	["sinking","ship","yard","stick","figure","skate","board"],
	["parking","meter","maid","service","dog","park","bench"],
	["boarding","pass","gas","grill","master","class","work"],
	["powder","keg","party","size","up","stream","line"],
	["guitar","hero","sandwich","board","walk","man","cave"],
	["sweet","tooth","pick","pocket","watch","face","first"],
	["swan","song","bird","bath","water","proof","read"],
	["open","house","fire","sale","price","point","blank"],
	["artichoke","heart","beat","up","lift","off","spring"],
	["wrist","watch","dog","tag","team","work","book"],
	["problem","free","will","power","tool","box","cutter"],
	["crawl","space","suit","case","study","hall","way"],
	["brain","freeze","tag","sale","price","match","point"],
	["reality","tv","show","host","family","business","owner"],
	["double","take","cover","story","time","warp","speed"],
	["silver","screen","door","bell","curve","ball","point"],
	["desert","island","chain","store","front","porch","swing"],
	["cup","cake","walk","off","duty","free","throw"],
	["close","second","class","photo","album","art","museum"],
	["coffee","mug","shot","clock","radio","wave","pool"],
	["salt","water","fall","back","drop","dead","pan"],
	["hawk","eye","contact","lens","cap","stone","wall"],
	["spare","rib","eye","shadow","puppet","show","time"],
	["ice","cream","soda","pop","star","power","couple"],
	["cold","feet","first","place","card","trick","play"],
	["ground","floor","model","home","sick","leave","out"],
	["nature","lover","boy","wonder","drug","store","hours"],
	["pretty","please","hold","steady","hand","cream","cheese"],
	["jelly","fish","tank","top","bunk","bed","bug"],
	["lemon","drop","kick","stand","alone","time","crunch"],
	["crystal","clear","cut","down","side","line","backer"],
	["sea","turtle","neck","pillow","top","dog","house"],
	["wind","tunnel","vision","test","kitchen","counter","offer"],
	["warm","welcome","center","stage","hand","made","up"],
	["stage","right","hand","shake","up","grade","school"],
	["inside","job","fair","trade","secret","identity","crisis"],
	["sword","fish","eye","brow","beat","box","car"],
	["wicked","witch","hunt","down","town","hall","pass"],
	["cheap","trick","play","fair","game","face","value"],
	["loose","change","maker","space","race","track","meet"],
	["paper","thin","ice","pick","up","hill","top"],
	["rain","forest","fire","fly","trap","door","mat"],
	["heavenly","body","part","time","table","top","soil"],
	["pretty","boy","wonder","land","slide","show","girl"],
	["log","cabin","fever","pitch","black","olive","branch"],
	["grand","mother","goose","egg","shell","fish","tank"],
	["sugar","rush","hour","long","face","cream","puff"],
	["lunch","box","car","pool","noodle","soup","kitchen"],	
];
if (days%masterwordlist.length > 0){
	var offset = Math.floor(days/masterwordlist.length);
}
else{
	var offset = (days/masterwordlist.length) - 1;
}
if (days > masterwordlist.length){
	var index  = days - 1 - (offset * masterwordlist.length);
}
else {
	var index = days - 1;
}
// var index = days - 1;
var wordone = masterwordlist[index][0].toUpperCase();
var wordtwo = masterwordlist[index][1].toUpperCase();
var wordthree = masterwordlist[index][2].toUpperCase();
var wordfour = masterwordlist[index][3].toUpperCase();
var wordfive = masterwordlist[index][4].toUpperCase();
var wordsix = masterwordlist[index][5].toUpperCase();
var wordlast = masterwordlist[index][6].toUpperCase();

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
	if (localStorage.getItem("slotmachine") !=1){
		updateAnswer("Vowels are disabled till all other letters are found!");
	} 
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
        // document.getElementById("submission").classList.add("flash2");
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


function normalize(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function playArchive() {
    const board = document.getElementById("archiveboard");
    board.innerHTML = "";

    const today = new Date();
    const todayNorm = normalize(today);

    const archiveEnd = days - 1; // yesterday's day number
    let currentDayNumber = archiveEnd;

    // Start at yesterday (real date, no normalization here)
    let cursor = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);

    const monthNodes = [];

    while (currentDayNumber >= 1) {
        const year = cursor.getFullYear();
        const month = cursor.getMonth();

        const monthDiv = document.createElement("div");
        monthDiv.classList.add("month");

        const title = document.createElement("div");
        title.classList.add("month-title");
        title.innerText = cursor.toLocaleString("default", { month: "long" }) + " " + year;
        monthDiv.appendChild(title);

        const grid = document.createElement("div");
        grid.classList.add("calendar-grid");

        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        dayNames.forEach(d => {
            const dn = document.createElement("div");
            dn.classList.add("day-name");
            dn.innerText = d;
            grid.appendChild(dn);
        });

        const firstOfMonth = new Date(year, month, 1);
        const startOffset = firstOfMonth.getDay();

        for (let i = 0; i < startOffset; i++) {
            const filler = document.createElement("div");
            filler.classList.add("day");
            filler.innerHTML = "";
            grid.appendChild(filler);
        }

        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const validDates = [];
        for (let d = 1; d <= daysInMonth; d++) {
            const cellDate = new Date(year, month, d);
            const cellNorm = normalize(cellDate);
            if (cellNorm < todayNorm) validDates.push(d);
        }

        const mapping = {};
        for (let i = validDates.length - 1; i >= 0; i--) {
            if (currentDayNumber < 1) break;
            mapping[validDates[i]] = currentDayNumber--;
        }

        for (let d = 1; d <= daysInMonth; d++) {
            const cellDate = new Date(year, month, d);
            const cellNorm = normalize(cellDate);

            if (cellNorm >= todayNorm) {
                const empty = document.createElement("div");
                empty.classList.add("day", "disabled");
                empty.innerHTML = `<div class="day-num">${d}</div>`;
                grid.appendChild(empty);
                continue;
            }

            if (!(d in mapping)) {
                const empty = document.createElement("div");
                empty.classList.add("day", "disabled");
                empty.innerHTML = `<div class="day-num">${d}</div>`;
                grid.appendChild(empty);
                continue;
            }

            const q = mapping[d];

            const link = document.createElement("a");
            link.classList.add("day", "clickable");
            link.dataset.day = q;
            link.href = `archive.html?q=${q}`;
            link.target = "_blank";

            link.innerHTML = `
                <div class="puzzle-num">#${q}</div>
                <div class="day-num">${d}</div>
            `;

            const over1 = localStorage.getItem("archovercl" + q);
            const stat1 = localStorage.getItem("archstatcl" + q);
            const over2 = localStorage.getItem("gameovercl" + q);
            const stat2 = localStorage.getItem("gamestatcl" + q);

            if (over2 === "1") {
                link.classList.add(stat2 === "0" ? "failedarch" : "correctarch");
            } else if (over1 === "1") {
                link.classList.add(stat1 === "1" ? "correctarch" : "failedarch");
            }

            grid.appendChild(link);
        }

        monthDiv.appendChild(grid);
        monthNodes.push(monthDiv);

        // ⭐ Non-mutating, safe month step: always go to the 1st of the previous month
        cursor = new Date(year, month - 1, 1);
    }

    monthNodes.reverse().forEach(m => board.appendChild(m));

    setupMonthNavigation();
}


let currentMonthIndex = 0;

function setupMonthNavigation() {
    const board = document.getElementById("archiveboard");
    const months = board.querySelectorAll(".month");
    if (!months.length) return;

    // ⭐ Start at newest month (rightmost)
    currentMonthIndex = months.length - 1;
    updateMonthPosition();

    const prevBtn = document.getElementById("prev-month");
    const nextBtn = document.getElementById("next-month");

    function updateButtons() {
        prevBtn.disabled = currentMonthIndex === 0;                     // Jan
        nextBtn.disabled = currentMonthIndex === months.length - 1;    // Feb
    }

    updateButtons();

    // ⭐ < goes to OLDER (left)
    prevBtn.onclick = () => {
        if (currentMonthIndex > 0) {
            currentMonthIndex--;
            updateMonthPosition();
            updateButtons();
        }
    };

    // ⭐ > goes to NEWER (right)
    nextBtn.onclick = () => {
        if (currentMonthIndex < months.length - 1) {
            currentMonthIndex++;
            updateMonthPosition();
            updateButtons();
        }
    };
}

function updateMonthPosition() {
    const board = document.getElementById("archiveboard");
    const months = board.querySelectorAll(".month");
    if (!months.length) return;

    const monthWidth = months[0].offsetWidth; // ⭐ actual width
    const offset = currentMonthIndex * monthWidth;

    board.style.transform = `translateX(-${offset}px)`;
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
	document.getElementById("top-resources").style.visibility = "hidden";
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
	document.getElementById("top-resources").style.visibility = "visible";
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
	const { hintAvailable } = getHintState();
    if (localStorage.cllivescnt < 5) {
		if (!hintAvailable) {
			localStorage.cllivescnt = Number(localStorage.cllivescnt) + 1;
			flashBarRed();
			updateLivesDisplay();
		}
		else{
			// SAFETY NET ACTIVATED
			showSafetyNetPopup();
			const { lastPlayed } = getHintState(); // keep the old date
			saveHintState(0, false, null);
			updateHintProgress(0, false);						
		}
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
            localStorage.cllives = "⚪⚪⚪⚪⚪";
            break;
        case 1:
            localStorage.cllives = "⚪⚪⚪⚪";
            // document.getElementById("answer").innerText = "TIME UP - FIRST LIFE LOST!"
            updateAnswer("Time Up - First Life Lost!");
            break;
        case 2:
            localStorage.cllives = "⚪⚪⚪";
            // document.getElementById("answer").innerText = "TIME UP - SECOND LIFE LOST!"
            updateAnswer("Time Up - Second Life Lost!");
            break;
        case 3:
            localStorage.cllives = "⚪⚪";
            // document.getElementById("answer").innerText = "TIME UP - THIRD LIFE LOST!"
            updateAnswer("Time Up - Third Life Lost!");
            break;
        case 4:
            localStorage.cllives = "⚪";
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
        updateAnswer("Game Over! Out Of Lives.");
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
		onDailyPuzzleCompleted(); 
    }
    // }
}

function onConsonantSolved() {
    // Call this whenever a new consonant is correctly guessed
    momentumTime = 60;
    updateMomentumBar();

}

function shouldRunDynamitesToday() {
    const d = new Date();

    // Local YYYY-MM-DD
    const today =
        d.getFullYear() + "-" +
        String(d.getMonth() + 1).padStart(2, "0") + "-" +
        String(d.getDate()).padStart(2, "0");

    const lastRun = localStorage.getItem("dynamitesLastRun");

    if (lastRun === today) {
        return false; // already ran today (local)
    }

    // mark today as run
    localStorage.setItem("dynamitesLastRun", today);
    return true;
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
// =========================
// SLOT MACHINE REVEAL FX
// =========================
// ⭐ SLOT MACHINE FUNCTION — LETTER SPIN + TILE RAINBOW
function revealSlotMachineRow(rowId, finalWord, delayStart = 0) {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const tiles = document.querySelectorAll(
        `#${rowId} .tile, #${rowId} .voweltile, #${rowId} .tilesmall, #${rowId} .voweltilesmall`
    );

    tiles.forEach((tile, index) => {

        // Ensure tile has a .letter span
        let letterSpan = tile.querySelector(".letter");
        if (!letterSpan) {
            const span = document.createElement("span");
            span.classList.add("letter");
            span.textContent = tile.textContent.trim();
            tile.textContent = "";
            tile.appendChild(span);
            letterSpan = span;
        }

        setTimeout(() => {

            // Show tile + start rainbow
            tile.classList.remove("tile-hidden");
            tile.classList.add("rainbow-spin");

            // Start letter spin
            letterSpan.classList.add("slot-spin");

            // Randomize letters during spin
            let spinInterval = setInterval(() => {
                letterSpan.textContent = letters[Math.floor(Math.random() * letters.length)];
            }, 40);

            // Stop spinning and lock final letter
            setTimeout(() => {
                clearInterval(spinInterval);

                letterSpan.classList.remove("slot-spin");
                letterSpan.textContent = finalWord[index];
                letterSpan.classList.add("slot-lock");

                // Stop rainbow + return to gray
                tile.classList.remove("rainbow-spin");
                tile.style.backgroundColor = "#555"; // your normal gray

            }, 350 + index * 120);

        }, delayStart + index * 80);
    });
}

// =========================
// END SLOT MACHINE FX
// =========================

window.onload = function() {
    initMonthlyStats();
	onGameLoad();  // ← reset streak BEFORE drawing UI
	const { consecutiveDays, hintAvailable } = getHintState();
	updateHintProgress(consecutiveDays, hintAvailable);
    const now = new Date();
    const today =
        now.getFullYear() + "-" +
        String(now.getMonth() + 1).padStart(2, "0") + "-" +
        String(now.getDate()).padStart(2, "0");

    // --- Submitter animation once per day ---
    const lastAnimate = localStorage.getItem("AnimationDate");

    if (lastAnimate !== today) {
        // Play animation today
        document.getElementById("submitter").classList.add("submitter-fade");
		document.getElementById("top-resources").classList.add("top-slide");
		document.querySelector(".top-stack").classList.add("top-slide");
        // Store today's date so it won't play again until tomorrow
        localStorage.setItem("AnimationDate", today);
    }
    auth.onAuthStateChanged(async user => {
        if (!user) return;

        window.playerUID = user.uid;

        // Ensure Firebase token is fully refreshed
        await user.getIdToken(true);

        // Initialize game
        initialize();
		// Run slot machine only once per day
		if (localStorage.getItem('gameovercl' + days) == 0 && localStorage.getItem("slotmachine") != 1) {

			// Hide letters for slot-machine rows
			document.querySelectorAll("#boardfirst .tile, #boardfirst .voweltile, #boardfirst .tilesmall, #boardfirst .voweltilesmall")
				.forEach(t => t.classList.add("tile-hidden"));

			document.querySelectorAll("#boardlast .tile, #boardlast .voweltile, #boardlast .tilesmall, #boardlast .voweltilesmall")
				.forEach(t => t.classList.add("tile-hidden"));

			// Run slot machine after intro animations
			setTimeout(() => {
				revealSlotMachineRow("boardfirst", wordone);
				revealSlotMachineRow("boardlast", wordlast, 200);
			}, 1000);

			localStorage.setItem("slotmachine", 1);
		}
        // Load dynamites after Firestore is ready
		const gameOverKey = 'gameovercl' + days;

		if (localStorage.getItem(gameOverKey) === "1") {
			// Always run when today's game is over
			setTimeout(() => loaddynamites(), 50);
		} else if (shouldRunDynamitesToday()) {
			// Otherwise run only once per day
			setTimeout(() => loaddynamites(), 50);
		}
    });

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

    // Select all clickable archive tiles
    const tiles = board.querySelectorAll(".day.clickable");

    tiles.forEach(tile => {
        const q = tile.dataset.day; // ⭐ correct day number

        // Clear old classes
        tile.classList.remove("correctarch", "failedarch");

        // Read saved state
        const over1 = localStorage.getItem("archovercl" + q);
        const stat1 = localStorage.getItem("archstatcl" + q);
        const over2 = localStorage.getItem("gameovercl" + q);
        const stat2 = localStorage.getItem("gamestatcl" + q);

        // Apply new state
        if (over2 === "1") {
            tile.classList.add(stat2 === "0" ? "failedarch" : "correctarch");
        } else if (over1 === "1") {
            tile.classList.add(stat1 === "1" ? "correctarch" : "failedarch");
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

function onGameLoad() {
    let { consecutiveDays, hintAvailable, lastPlayed } = getHintState();

    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    // If Safety Net is active and the player missed a day → reset it
    if (hintAvailable && lastPlayed && lastPlayed !== today && lastPlayed !== yesterday) {
        saveHintState(0, false, lastPlayed);
        updateHintProgress(0, false);
        return;
    }

    // If Safety Net is NOT active, streak resets only if missed a day
    if (!hintAvailable && lastPlayed && lastPlayed !== today && lastPlayed !== yesterday) {
        saveHintState(0, false, lastPlayed);
        updateHintProgress(0, false);
    }
}




function initialize() {
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
        ele1.innerHTML += "By " + masterwordlist[index][7];
        // ele1.classList.add("flash2");
    }
    // if(days == 26){
		// let ele1 = document.getElementById("submitter");
		// ele1.innerHTML = '<a href="https://www.canucklegame.ca/" target="_blank"><strong style="color:white; font-size:18px;">🍁CANUCKLE</strong><strong style="color:white; font-size:18px;"> EDITION🍁</strong></a>';		
		// ele1.classList.add("flash2");
    // }

	if (days === 100) {
		const popup = document.createElement("div");
		popup.className = "dynamite-popup";
		popup.innerHTML = `
			<div class="dynamite-popup-inner">
				<h2>🎁 Bonus Opportunity 🎉</h2>
				<p style="white-space: nowrap;">We are celebrating <strong>100 days of CHN LNK</strong>!</p>
				<p>Go to the <strong>PLAY PAST CHAINS</strong> link on the summary page and send us screenshots showing you have played all 100 days to win 25 bonus Dynamites!</p><br>
				<p>Email us at <strong>info@thechnlnk.com</strong> with your leaderboard name.</p><br>
				<button id="closeDynamitePopup">OK</button>
			</div>
		`;

		// ⭐ THIS WAS MISSING
		document.body.appendChild(popup);

		// ⭐ THIS WAS ALSO MISSING
		document.getElementById("closeDynamitePopup").onclick = () => popup.remove();
	}



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
		if (localStorage.getItem('gameovercl' + days) == 0 && localStorage.getItem("slotmachine") !=1){ 
			keyboardRow.classList.add("keyboard-row", "keyboard-slide");
		} else {
			keyboardRow.classList.add("keyboard-row");
		} 

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
	showGame();
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
                currTile.classList.remove("poptile", "popanswer");
                currTile.classList.add("animated", "correct");
            }
            for (let i = 0; i < wordthreewidth; i++) {
                let currTile = document.getElementById("3" + '-' + i);
                currTile.innerText = wordthree[i];
                currTile.classList.remove("poptile", "popanswer");
                currTile.classList.add("animated", "correct");
            }
            for (let i = 0; i < wordfourwidth; i++) {
                let currTile = document.getElementById("4" + '-' + i);
                currTile.innerText = wordfour[i];
                currTile.classList.remove("poptile", "popanswer");
                currTile.classList.add("animated", "correct");
            }
            for (let i = 0; i < wordfivewidth; i++) {
                let currTile = document.getElementById("5" + '-' + i);
                currTile.innerText = wordfive[i];
                currTile.classList.remove("poptile", "popanswer");
                currTile.classList.add("animated", "correct");
            }
            for (let i = 0; i < wordsixwidth; i++) {
                let currTile = document.getElementById("6" + '-' + i);
                currTile.innerText = wordsix[i];
                currTile.classList.remove("poptile", "popanswer");
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
                    msg += "<br> (INCLUDING +1 TIMED MODE BONUS!)";
                }

                document.getElementById("answer").innerHTML = msg;

                /* 					for (let s = 0; s < localStorage.clstarscnt; s++){
                						document.getElementById("answerstar").innerText += "⭐";
                					} */
                var templives = "";
                templives = document.getElementById("lives").innerText;
                for (i = 0; i < 5; i++) {
                    templives = templives.replace("⚪", "⭐");
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
            document.getElementById("answer").innerText = "Game Over! Out Of Lives.";
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
        setTimeout(OpenStatsGO, 1100);
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
                        updateAnswer("Perfect Guess! <br> You Gained +2 Dynamites!");
                    } else {
                        localStorage.cldynamite = dyn + 1;
                        // document.getElementById("answer").innerText = "PERFECT GUESS! \n YOU GAINED +1 DYNAMITE!";
                        updateAnswer("Perfect Guess! <br> You Gained +1 Dynamite!");
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
        // if (localStorage.consocount > 5 && localStorage.clshowalert == 0 && localStorage.totalclplayed > 0) {
            // OpenADDModal();
            // localStorage.clshowalert = 1;
        // }

        // if (localStorage.consocount > 5 && localStorage.clshowalert == 4 && localStorage.totalclplayed > 0) {
            // OpenTIMEModal();
            // localStorage.clshowalert = 5;
        // }
        if ((Number(localStorage.consocount) == solveword.length - Number(localStorage.vowelcount)) && localStorage.vowelactive == 0) {
            disableKeys("BCDFGHJKLMNPQRSTVWXYZ".split("")); // consonants
            document.querySelectorAll('span[id*="-"].disabled').forEach(tile => {
                tile.classList.remove('disabled');
                if (tile.innerText === "🔒") {
                    tile.innerText = "🔓";
                }
                // setTimeout(function() {
                tile.innerText = "";
                // tile.classList.add("popanswer");
                document.getElementById("KeyA").classList.remove("disabled", "key-tile-disabled");
                document.getElementById("KeyE").classList.remove("disabled", "key-tile-disabled");
                document.getElementById("KeyI").classList.remove("disabled", "key-tile-disabled");
                document.getElementById("KeyO").classList.remove("disabled", "key-tile-disabled");
                document.getElementById("KeyU").classList.remove("disabled", "key-tile-disabled");
                // document.getElementById("KeyA").classList.add("key-tile-enabled", "droptile");
                // document.getElementById("KeyE").classList.add("key-tile-enabled", "droptile");
                // document.getElementById("KeyI").classList.add("key-tile-enabled", "droptile");
                // document.getElementById("KeyO").classList.add("key-tile-enabled", "droptile");
                // document.getElementById("KeyU").classList.add("key-tile-enabled", "droptile");
                document.getElementById("KeyA").classList.add("key-tile-enabled");
                document.getElementById("KeyE").classList.add("key-tile-enabled");
                document.getElementById("KeyI").classList.add("key-tile-enabled");
                document.getElementById("KeyO").classList.add("key-tile-enabled");
                document.getElementById("KeyU").classList.add("key-tile-enabled");				
                document.getElementById("answer").style.color = "lightgray";
                // document.getElementById("answer").innerText = "ONLY VOWELS LEFT!"
                updateAnswer("ONLY VOWELS LEFT!");
				triggerVibration(); // single pulse
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
	const { hintAvailable } = getHintState();
    if (LetterFound == 0) {
		if (!hintAvailable) {
			localStorage.cllivescnt = Number(localStorage.cllivescnt) + 1;
			document.getElementById("answer").style.color = "lightgray";
			switch (Number(localStorage.cllivescnt)) {
				case 0:
					localStorage.cllives = "⚪⚪⚪⚪⚪";
					break;
				case 1:
					localStorage.cllives = "⚪⚪⚪⚪";
					// document.getElementById("answer").innerText = "FIRST LIFE LOST!"
					updateAnswer("First Life Lost!");
					break;
				case 2:
					localStorage.cllives = "⚪⚪⚪";
					// document.getElementById("answer").innerText = "SECOND LIFE LOST!"
					updateAnswer("Second Life Lost!");
					break;
				case 3:
					localStorage.cllives = "⚪⚪";
					// document.getElementById("answer").innerText = "THIRD LIFE LOST!"
					updateAnswer("Third Life Lost!");
					break;
				case 4:
					localStorage.cllives = "⚪";
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
		else{
			// SAFETY NET ACTIVATED
			showSafetyNetPopup();
			const { lastPlayed } = getHintState(); // keep the old date
			saveHintState(0, false, null);
			updateHintProgress(0, false);							
		}	
    }

	if (Number(localStorage.clguesscnt) === 6) {

		// Filter out blanks BEFORE selecting
		const availableLetters = getUnrevealedConsonants().filter(letter => {
			return typeof letter === "string" && letter.trim().length > 0;
		});

		// If nothing left, safely skip mystery letter
		if (availableLetters.length === 0) {
			return;
		}

		const mysteryLetter = availableLetters[Math.floor(Math.random() * availableLetters.length)];
		localStorage.clMysteryLetter = mysteryLetter;

		if (!mysteryLetter || mysteryLetter === "undefined") {
			return; // safe skip
		}

		localStorage.clMysteryActive = "true";
		markTileWithQuestion(mysteryLetter);
		showMysteryAdded();
		updateAnswer("Identify the mystery letter in the next try for a Bonus!");
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
        updateAnswer("Game Over! Out Of Lives.");
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
		onDailyPuzzleCompleted();
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
            currTile.classList.remove("poptile", "popanswer");
            currTile.classList.add("animated");
        }
        for (let i = 0; i < wordthreewidth; i++) {
            let currTile = document.getElementById("3" + '-' + i);
            currTile.innerText = wordthree[i];
            currTile.classList.remove("poptile", "popanswer");
            currTile.classList.add("animated");
        }
        for (let i = 0; i < wordfourwidth; i++) {
            let currTile = document.getElementById("4" + '-' + i);
            currTile.innerText = wordfour[i];
            currTile.classList.remove("poptile", "popanswer");
            currTile.classList.add("animated");
        }
        for (let i = 0; i < wordfivewidth; i++) {
            let currTile = document.getElementById("5" + '-' + i);
            currTile.innerText = wordfive[i];
            currTile.classList.remove("poptile", "popanswer");
            currTile.classList.add("animated");
        }
        for (let i = 0; i < wordsixwidth; i++) {
            let currTile = document.getElementById("6" + '-' + i);
            currTile.innerText = wordsix[i];
            currTile.classList.remove("poptile", "popanswer");
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
                localStorage.cldynamite = dyn + 3;
            } else {
                localStorage.cldynamite = dyn + 2;
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
            msg += "<br> (INCLUDING +1 TIMED MODE BONUS!)";
            localStorage.cllives = "⚪".repeat(localStorage.clstarscnt);
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
            templives = templives.replace("⚪", "⭐");
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
                showStreakPopup("ULTIMATE BADGE (100+ STREAK) ALERT - 💎");
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
		setTimeout(() => {
			const playerName = localStorage.getItem("playerName");

			// Must have a name AND must be past the 50‑day cooldown
			if (playerName && playerName.trim() !== "" && shouldShowFeedbackPopup()) {
				showFeedbackPopup();
			} else {
				OpenStats();
			}
		}, 4800);
		onDailyPuzzleCompleted();
        // if (localStorage.clshowalert > 1 && localStorage.clshowalert < 4) {
            // setTimeout(OpenStats, 6800);
            // setTimeout(OpenHINTModal, 4800);
            // localStorage.clshowalert = Number(localStorage.clshowalert) + 1;
        // } else {
            // setTimeout(OpenStats, 4800)
            // if (localStorage.clshowalert == 1) {
                // localStorage.clshowalert = Number(localStorage.clshowalert) + 1;
            // }
        // }
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