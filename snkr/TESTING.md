# CHN LNK Redesign — Test Bundle (for the `snkr` folder)

## What this is
A full copy of your site with ONLY three files changed: `index.html`, `chnlnk.css`, `chnlnk.js`.
Every other file is byte-identical to your repo today (verified by checksum — see CHANGELOG.md).

## Put it on your site
1. Unzip — you get a folder named `snkr`.
2. In your GitHub repo, use **Add file → Upload files** and drag the whole `snkr` folder in (Chrome keeps the folder), then commit.
   (Or with git: copy the `snkr` folder into your repo clone, `git add snkr`, commit, push.)
3. Wait ~a minute for Pages, then open **thechnlnk.com/snkr** in your TEST browser.
   Your live game at thechnlnk.com is untouched.

## Test checklist
- [ ] Fresh load: header, labelled Help/Email/Support/Stats buttons, Lives row, Safety Net + Dynamites row
- [ ] Correct guess → tile + key behaviour; wrong guess → life lost, key struck
- [ ] Locked vowel tap → nothing happens
- [ ] Find all consonants → vowels unlock, remaining consonants struck off, only vowels clickable
- [ ] Dynamite button works; Safety Net ring/angel behaves as before
- [ ] Timed Mode: toggle visible before first move, hidden after; momentum bar works; caption reads "Solve the chain before time runs out to win extra perks"
- [ ] Win: hearts flip to gold stars, gold "GREAT GOING!" text, confetti, Summary modal opens
- [ ] Lose: tiles flip and reveal in deep red, Summary modal opens
- [ ] Close and reopen mid-game and after game over: state preserved as today
- [ ] Open Help (expand all rules — it may scroll inside), Stats, Promote, Archive calendar modal
- [ ] Resize / different phone: no sideways scrolling, no overlaps; longest words fit
- [ ] Archive link still opens the archive (it wears the new CSS skin already; its own page update is phase two)

## Known notes (from CHANGELOG.md)
- P1 (correct keys turn green) and P2 (LIVES label switches to STARS on a win) were approved
  by Sankar and are APPLIED in this bundle — see CHANGELOG "Proposals P1 + P2".
- `chnlnk_manifest.json` still has the old black theme colours — untouched per your three-files rule.
- A returning player may briefly see the old circle glyphs from a saved lives string until their first guess rebuilds it.

## Promote (later, on your word)
Copy the three changed files (plus archive files when their phase is done) from `snkr/` over the repo root. The `?v=50` tag makes browsers fetch the new CSS/JS.
