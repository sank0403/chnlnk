# CHN LNK Redesign — Changelog (v50 test bundle)

Only **three files** were changed: `index.html`, `chnlnk.css`, `chnlnk.js`.
Every other file in this folder is byte-identical to the repo (verified by SHA-256 — see Verification).
All game logic is preserved: Safety Net, dynamites, Mystery Letter, Last Life Trade-Off,
Timed Mode (one-time pre-game choice; the toggle still hides when the game starts — that code
was not touched), Perfect Solve, all 53 localStorage keys, state restore, Firebase leaderboards,
and the end sequence (win: stars + gold text → confetti → Summary; loss: reveal flip → Summary).
No Reset button was added. No new sections were added. The page still ends with Timed Mode.

Line numbers below refer to the **edited** files unless marked "(orig …)".

---

## chnlnk.css — the bulk of the redesign

Approach: the original stylesheet is kept intact and a clearly marked
`CHN LNK REDESIGN — v50` layer is appended at the end. Its rules override the originals by
source order/specificity. **No original selector was renamed or removed** (325 original
selectors, all still present; 50 added), so the archive game — which shares this file —
is skinned by the same layer and cannot break. One in-place fix: the invalid line
`margin padding: 4px 6px;` in `#answer` (browsers ignored it) is now `padding: 4px 6px;`.

What the layer does:

- **Theme**: charcoal `#121214` background, raised panels `#1A1A1E/#222228`, white text;
  green `#3DDC68` (correct), amber/gold `#F5B83D` (vowels, stars, win), red `#E5484D` (wrong),
  deep muted red `#7A2020` (lose reveal). Page is a centred max-430px column on desktop.
- **Header**: logo left (white wordmark, LINK heavier), "daily chn lnk #…" label right, muted.
- **Nav**: the old absolute icon strip becomes a static row of 4 equal green-tinted filled
  buttons with icon + text labels.
- **Status rows**: Lives on its own prominent row (large glowing green ♥ glyphs — see JS touch 1;
  dark red when all lives are lost, gold when converted to stars). Second row, a step down:
  Safety Net ring badge (~36px, the game's own 😇; the progress ring itself is still drawn by
  `updateHintProgress()` in JS) labelled "Safety Net", and the dynamite pill labelled "Dynamites".
- **Board**: the 7 word rows lose their individual boxes and sit in **one unified panel**;
  connectors recoloured to muted grey.
- **Tiles — one fluid sizing system** (this is the `.tilesmall` requirement): `--tile` =
  `clamp(40px, 14vw, 58px)` for `.tile`/`.voweltile`; `--tile-small` = `clamp(30px, 10.6vw, 44px)`
  (≈0.76 scale) for `.tilesmall`/`.voweltilesmall`, with proportional fluid font sizes.
  Board rows are `flex-wrap: nowrap` with shrink enabled, so the widest rows always fit:
  worst case `.tile` = 9 letters, worst case `.tilesmall` = 11 letters (the longest word in
  `masterwordlist` is 11; tiles go "small" when any word in a chain exceeds 9 letters).
  Vowel tiles get an amber border/tint (red is now reserved for wrong/failed). `.correct` →
  green with dark letters; `.failed` → deep muted red `#7A2020` with white letters (the lose
  reveal); `.starting` → neutral grey panel tone.
- **Feedback strip** (`#answer`): fixed height 60px, fluid width, panel styling. The animated
  border segments are hidden; instead the strip pulses once (0.65s soft glow, unified for all
  kinds) in the colour of its kind class — `fb-correct` green, `fb-wrong` red, `fb-locked`
  amber, `fb-win` gold, `fb-info` neutral (classes are set by JS touch 2). Longest real
  messages wrap to at most 2 lines and fit the 60px height at every width (see Verification).
- **Keyboard**: dark uniform keys — every letter key takes a 1/10-row flex basis, so all keys
  share one size/shape and shorter rows centre on the same grid; fixed 400px row width replaced
  by fluid 100%/max-430px. Used/eliminated/swept keys (`.key-tile.disabled`) are dimmed and
  **struck through**; the base sheet's `pointer-events: none` on `.disabled` still makes them
  untappable. Vowel keys use an amber outline (`.key-tile-disabled` / `.key-tile-enabled`)
  instead of the old red one. A `.key-tile.key-correct` green rule is pre-staged for proposal P1.
- **Legend + Timed Mode**: one-line legend styling (amber mini-key icon, "Locked vowel" grey,
  unlock sentence amber). Timed Mode keeps the mockup presentation: styled switch (green when
  on), "ENABLE TIMED MODE" label, and the caption underneath.
- **Modals/popups re-skin only** (content/behaviour untouched): all six modals (`#modal`,
  `#summary`, `#hintmodal`, `#addmodal`, `#timemodal`, `#pastmodal`), headers, close buttons,
  collapsible rule sections, leaderboard tables, buttons, Chart.js canvas (fluid width),
  overlays (now a translucent dark backdrop), `.popup`, name popup, feedback popup, error
  popup, thank-you toast, dynamite popup, life-trade modal, and the JS-generated popups
  (`#life-restored`, `#timed-bonus`, `#perfect-solve`). Modal widths are
  `min(400px, 100vw − 24px)`; Summary and Help scroll **vertically inside the modal** when
  long — the page behind never scrolls sideways. `white-space: nowrap` was removed from the
  Summary notes (`.cp-note`, `.nr-note`, `.prev-winner-title`) so they wrap instead of
  overflowing at 320px. `#migrationModal` keeps its inline styles (not overridden).
- **Responsive**: fluid `clamp()` sizing throughout plus breakpoints at 480px (rules
  text/tutorial image stack) and 360px (header/nav/status tightening). `overflow-x: hidden`
  on `html`/`body` as a final guard. Verified at 320 / 360 / 390 / 430 / 1280px (see below).

## index.html — structure only (all ids, links and handlers preserved)

- Asset links bumped `?v=49` → `?v=50` (CSS + JS). (Meta `build-version` left at 49 — your call.)
- Title: vowels now `color:#3DDC68` (was red); LINK wrapped in `<span class="title-link">` for
  the heavier weight; the `<h1>` and the `.waviy1` day label are wrapped in a new
  `<div class="header-row">` so the label sits beside the logo. `#daycount` is still filled by
  JS by id.
- The `#stats` nav block was **moved** from above the title to directly below the header, and a
  text label was added inside each existing clickable item: **Help** (rulesbutton), **Email**
  (mailto link), **Support** (BuyMeACoffee link), **Stats** (statsbutton). The duplicate
  `id="stats-item"` in the Summary was left exactly as-is, as instructed.
- `#top-resources` restructured into two rows: row 1 = `LIVES` label + `#lives`; row 2 =
  `#hint-progress` + a `Safety Net` label, and `#dynamite-btn` + a `Dynamites` label. The labels
  are **outside** `#dynamite-btn`/`#lives` because JS rewrites those elements' text.
- Added the one-line legend `<div id="vowel-legend">` right after `#answer` (JS touch 4 moves
  it below the keyboard at startup).
- Added `<div class="timed-caption">Solve the chain before time runs out to win extra perks</div>`
  inside `#toggle-row` (it moves with the toggle; toggle behaviour unchanged).

## chnlnk.js — only the four sanctioned touches (diff = 108 lines, all listed here)

### Touch 1 — lives glyphs (♥ / ★), in `updateLivesDisplay()` and every duplicated site
His code builds the lives string in several places; all were swapped consistently or the win
conversion would have broken. Counts and storage semantics are unchanged — only the glyphs:
- Day-init reset (orig 2377 → line 2387): `⚪⚪⚪⚪⚪` → `♥♥♥♥♥`.
- `applyLifeTrade()` (orig 2620 → 2630): `"⚪".repeat(...)` → `"♥".repeat(...)`.
- `updateLivesDisplay()` switch (orig 4420–4456 → 4430–4466): ⚪ strings → ♥ strings;
  case 5 `❌❌❌❌❌` → `♥♥♥♥♥`, plus line **4471** toggles a `lives-depleted` class on `#lives`
  (CSS colours the all-lost hearts dark red, since one text string can carry only one colour).
- The duplicated switch inside `processInput()` (orig 5731–5769 → 5760–5798): same swaps;
  toggle at line **5803**.
- Page-load restore (line **4906**): same `lives-depleted` toggle so a restored lost game
  colours correctly.
- Win conversion: `templives.replace("⚪", "⭐")` → `replace("♥", "★")` at orig 5242 → **5268**
  (restore path) and orig 6064 → **6094** (live path); timed-bonus repeat at orig 6049 → **6079**;
  lines **5271** and **6097** add a `lives-stars` class so CSS colours the ★ glyphs gold.
  (★/♥ are text glyphs, so CSS can colour them; ⭐/⚪ emoji could not be.)
- Deliberately untouched: the `clueicon` strings in the share-text builders (⚪/❌/⭐ there are
  share-message content, not the lives display) and the `+1 LIFE ⚪` toast text.

### Touch 2 — feedback kind classes for `#answer`
- `updateAnswer()` (lines **2216–2225**): after the existing border-animation restart, the
  message is classified by keyword and one class is set — `fb-win` (great going / you won /
  perfect guess), `fb-locked` (only vowels left / vowels are disabled), `fb-wrong` (life lost /
  last life alert / game over / out of lives / time up), `fb-correct`, else `fb-info`.
  Message texts, timing and the `run-border` mechanism are unchanged; the classes only let CSS
  own the colours (they use `!important` colour because several callers set
  `answer.style.color = "lightgray"` inline first).
- The two direct `#answer` writers that bypass `updateAnswer()`: restore-win (lines
  **5259–5260**, adds `fb-win`) and restore-lose (lines **5323–5324**, adds `fb-wrong`).

### Touch 3 — vowel-unlock sweep: NO code change was needed (verified)
Your own code already implements Sankar's rule: at the unlock moment `processInput()` calls
`disableKeys("BCDFGHJKLMNPQRSTVWXYZ")` (orig line 5678), and the restore path does the same
(orig line 5329). Every unclicked consonant therefore already gets `.disabled` — and the new
CSS gives `.key-tile.disabled` the struck-through treatment, exactly like a wrong key or a
dynamite-eliminated key (`useDynamite()` also only adds `.disabled`). So the sweep is delivered
by CSS alone, and dynamite behaviour is untouched.

### Touch 4 — visual order (lines 5141–5152)
One small block right after the keyboard is built (before `showGame()`): it moves the
`#vowel-legend` element and the existing `#toggle-row` element to directly after the last
`.keyboard-row`, giving the rendered order board → feedback → keyboard → legend → Timed Mode.
All logic references both elements by id (`getElementById`), and the modal show/hide functions
use `getElementsByClassName("keyboard-row")` / ids, so relocating the nodes changes no
behaviour — including the toggle-row hide/show logic.

### Nothing else in the JS changed
The full original↔edited diff contains only the hunks above. `masterwordlist` is byte-identical
(SHA-256 match), the localStorage key set is identical (53 keys, none added/removed), and the
Safety Net / dynamite / Timed Mode / trade / leaderboard function bodies are untouched.

---

## Verification (all run against the edited files)

- `node --check chnlnk.js` — **passes**.
- **ID cross-check**: 92 string ids referenced via `getElementById` in JS; all resolve to
  index.html or to JS-created elements. The 17 ids that resolve to neither (KeyA/KeyE/KeyI/KeyO/
  KeyU — created by the keyboard builder as `"Key" + letter`; waMenu, addpop, timepop, pzlhdr,
  pzl, CoffeButton, FBButton, TwitterButton, WAButton, ffhdr, ffdtl, answerstar — references
  inside commented-out/dead code) are **identical in the original files** — no new unresolved
  ids were introduced. Numeric stat ids 11–14 present.
- **HTML tag balance**: div/span/button/a/table/ul/script open/close counts match exactly
  (+7 divs, +11 spans = precisely the new wrappers/labels/legend).
- **CSS**: braces balanced 650/650; selector audit — all 325 original selectors still present,
  0 removed/renamed, 50 added.
- **Serving**: `python3 -m http.server` over the folder — index.html, chnlnk.css?v=50,
  chnlnk.js?v=50, archive.html, chnlnkarch.js and the nav icons all return **HTTP 200**.
- **Only-three-files rule**: SHA-256 of every other bundle file compared against
  `~/workspace/chnlnk/original/` (archive.html, chnlnkarch.js) or a fresh download from the
  repo (chnlnk_manifest.json, migration-listener.js, cofi.jpg, hearticon.png, icon.jpg,
  mail.png, rulesicon.png, statsicon.png, tutorial.gif, whatsapp.png) — **all byte-identical**.
- **Responsive math** (from the shipped clamp values; column = min(viewport, 430px),
  content = column − 20px, board inner = content − 22px):

  | Viewport | Key width (uniform) | .tile pref → 9-letter row fit | .tilesmall pref → 11-letter row fit | Header (logo+label) vs available | Legend vs available | Longest feedback msg |
  |---|---|---|---|---|---|---|
  | 320px | 28.2px | 44.8 → **25.9px** | 33.9 → **22.3px** | 260 / 300 | 274 / 292 | 2 lines, 42px ≤ 60px |
  | 360px | 32.2px | 50.4 → **30.3px** | 38.2 → **25.9px** | 260 / 340 | 299 / 332 | 2 lines, 44px ≤ 60px |
  | 390px | 35.2px | 54.6 → **33.7px** | 41.3 → **28.6px** | 321 / 370 | 321 / 362 | 2 lines, 46px ≤ 60px |
  | 430px | 39.2px | 58.0 → **38.1px** | 44.0 → **32.3px** | 348 / 410 | 332 / 402 | 2 lines, 47px ≤ 60px |
  | 1280px (desktop) | 39.2px | 58.0 → **38.1px** | 44.0 → **32.3px** | 377 / 410 | 332 / 402 | 2 lines, 47px ≤ 60px |

  "Fit" values are the flex-shrunk tile sizes — rows never overflow, wrap mid-word, or scroll
  horizontally at any width. The keyboard's widest row is exact by construction
  (10 × `calc((100% − 18px)/10)` + 9 × 2px gaps = 100%). Modals are `min(400px, 100vw − 24px)`
  with internal vertical scrolling only. **Longest-word case**: 11 letters ("personality",
  "outbuilding", "harborfront" — 14 of 784 puzzles have a 10–11-letter word and use
  `.tilesmall`); at 360px an 11-tile row is 11 × (25.9 + 3px margins) = 318px ≤ 318px board
  inner width. ✔

## Proposals P1 + P2 — APPROVED by Sankar (2026-11-20) and APPLIED

- **P1 — green correct keys. APPLIED.** `processInput()` (work line 5751): when a guess is
  found (`LetterFound != 0`), the guessed key also gets `key-correct`, which the stylesheet's
  `.key-tile.key-correct` rule renders green (it follows `.key-tile.disabled` at equal
  specificity, so the green wins and the strike clears on correct keys only). Restore loop
  (work lines 5374–5381): after re-applying `.disabled` to saved keys, any saved key whose
  letter appears in the revealed board words (`clwordone`…`clwordlast`, `?` stripped) also
  gets `key-correct`, so a reloaded game colours them too. Scoring/storage unchanged.
- **P2 — LIVES → STARS label. APPLIED.** One line at each win-conversion site (work lines
  5275 and 6112, beside the `lives-stars` adds) sets `#lives-label` to `STARS`. As a safety
  net, the same sync was added after every other render of the lives string (work lines
  2632, 4472, 4908, 5815, 6094): it sets the label to `STARS` only when the stored lives
  string actually contains `★`, so it can never fire mid-game.

## Flagged, deliberately unchanged (your decision)

- `chnlnk_manifest.json` still has `background_color`/`theme_color` `#000000` (pure black
  vs the new `#121214` charcoal). Per your three-files rule it was **not** changed. Note the
  page loads the manifest from the production URL, so this only matters at promotion time.
- Returning players with an old `cllives` string in localStorage will see the old ⚪ glyphs
  until the next lives update rebuilds the string (first guess of the day) — cosmetic only.
- Archive calendar colours (`.correctarch` green / `.failedarch` bright red, both `!important`)
  were left for the archive phase; the archive board/keyboard/tiles already pick up the new
  theme from the shared layer.

## Suggested local test checklist

Fresh load (hearts green, vowels amber-locked) → correct guess → wrong guess (life lost, key
struck) → tap a struck key (nothing happens) → locked vowel tap (message, amber pulse) →
play to vowel unlock (all remaining consonants struck, only vowels live) → use a dynamite
(3 keys struck, count decrements) → Safety Net states (ring progress, ready glow, save on a
wrong guess) → win (hearts become gold stars, gold win message, confetti, Summary opens) →
lose (tiles flip to deep-red reveal, Summary opens) → reload mid-game and after game over
(state restored) → Timed Mode on at start (toggle hides, momentum bar runs) → Help + Summary
modals at a narrow width (scroll inside the modal only) → archive page still plays.
