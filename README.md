# Rebound

**Track what you feel. Bring it to the conversation.**

Rebound is a self-tracking companion for concussion recovery. It records what you did each day and how you felt before and after — and turns that into something you can bring into a conversation with your healthcare professional.

[Live demo](https://rebound-nu.vercel.app) · Built for Hack for Humanity Summer 2026

---

## The problem

Concussion recovery is long, invisible, and hard to describe. A person is asked how they've been feeling since the last appointment, and answers from memory: *better, I think. Some days worse.*

That answer is honest and nearly useless. The information that would actually help — what activity was attempted, what symptoms preceded it, what changed afterwards — happened weeks ago and was never written down.

Meanwhile the graduated return-to-sport framework that guides recovery is public, well-documented, and almost never in the patient's hands. It lives in clinical guidance, not on the phone of the person actually doing the recovering.

## What Rebound does differently

The obvious product here is an app that tells you when you're ready for the next stage. That app would be easier to build and far more dangerous.

Rebound's starting point is the opposite:

> **Rebound records your progress. It does not determine when you should progress.**

Every design decision follows from that sentence. The app knows the framework, tracks your logs, and computes symptom differences — and then stops, deliberately, at the line where a clinical judgment would begin.

## Four things you can do

| Screen | What it does |
|---|---|
| **Today** | Your current stage, today's activity, one primary action. |
| **Symptom check** | Six symptoms on a 0–10 scale, before and after an activity. |
| **Recovery journey** | Six-stage vertical timeline showing what you've logged. |
| **Doctor conversation summary** | Your record, formatted to bring to an appointment. Copy to clipboard. |

Stage changes — forward and backward — are recorded through a separate confirmation flow.

## Where the six stages come from

Rebound follows the graduated return-to-sport strategy from the **Concussion in Sport Group 6th Consensus Statement** (Amsterdam 2022, published in BJSM June 2023), whose public version is the [CDC HEADS UP return-to-play progression](https://www.cdc.gov/heads-up/guidelines/returning-to-sports.html).

This attribution appears in the app itself, not just here. When a judge or a clinician asks *why six stages*, the answer is a citation rather than a design preference.

## Engineering decisions

**There is no `canAdvance()`.** No `isSafe()`, no `shouldStop()`, no `isCleared()`. Search the source — those functions do not exist. `recovery.js` exposes `calculateSymptomChanges()` and `hoursSinceLastStageChange()`: functions that return facts, never permission. Stage changes happen because a person chose to record one.

**The +2 threshold is never wired to the UI.** Published guidance describes mild, brief symptom exacerbation as potentially tolerable within stated limits. That number lives in `stages.js` as `GUIDANCE_NOTE_THRESHOLD` — and is imported by no logic module at all. It exists to be displayed as sourced reading material, not to evaluate anyone. The moment a threshold controls a button, the app has quietly become a decision engine.

**There is no field called `worsened`.** Naming a number "worsened" is already a clinical read. Rebound stores `symptomChanges` — a per-symptom delta, reported as-is. `Dizziness 4 → 10 (+6)` appears exactly that way, with no adjective attached.

**No status badges.** Earlier drafts had "Ready to advance", then "Looks good to discuss", then "Ready for review". Each euphemism was still the app issuing a verdict. The fix was structural: remove the badge and show the observation. The person draws the conclusion.

**The clearance gate is honest about what it is.** Stages 4 and above involve risk of head impact and, per published guidance, require clearance from a healthcare professional. Rebound asks the person to confirm they have it. This is self-attestation, not verification — the app says so, and this README says so.

**Moving backwards has equal visual weight.** Guidance describes returning to an earlier step when symptoms return. An app that only moves forward implies that moving back is failure. Rebound's stage screen offers both, and the activity log records both.

**No AI.** Not a limitation — a choice. Every threshold comes from published consensus guidance and runs locally as deterministic logic you can read in the source. A model making clinical judgments is precisely what this product is designed not to be.

**No database, no account, no server.** Recovery logs stay in `localStorage` on the device. Rebound does not require an account and does not upload recovery data anywhere.

## Interface language

An EN/ID toggle switches the entire interface, including the doctor summary. A person recovering in Indonesia can produce a summary in Indonesian to hand to an Indonesian clinician. The toggle persists across sessions.

Translation here is a safety surface, not decoration: *records* must not become *determines* in either language.

## Accessibility as a medical requirement

Light sensitivity is a concussion symptom, so the visual choices are constrained by the condition rather than by taste:

- Warm off-white and muted slate rather than clinical white and pure black
- Dark mode follows the system preference
- `prefers-reduced-motion` respected; no animation anywhere in the app
- One primary action per screen, generous type sizing for readers with brain fog

## Tech stack

React 19 · Vite · plain CSS · `localStorage`

No UI framework, no state library, no backend, no dependencies beyond React and Vite.

## Limitations

Rebound is a prototype built for a hackathon. It is a comprehension and record-keeping aid, not a medical device, and not a substitute for professional diagnosis, treatment, or clearance.

Known gaps:

- The clearance confirmation is self-reported and cannot be verified.
- Data lives in one browser on one device. Clearing browser storage deletes the record, and there is no export beyond copying the summary text.
- Symptom scores are self-reported and subjective; the same number can mean different things on different days.
- No automated test suite. Logic was verified through scripted simulation during development.
- Stage 1 completion is not inferred from logs — the person moves themselves, by design, but this means the app cannot tell whether a stage was genuinely completed.

## Running locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. No environment variables, no API keys.

## Project structure

```
src/
  data/stages.js        six stages, symptoms, framework attribution
  lib/storage.js        the only module that touches localStorage
  lib/symptoms.js       delta arithmetic — calculates, never judges
  lib/recovery.js       logs, stage changes, timeline; returns facts, not permission
  lib/summary.js        doctor conversation summary
  lib/i18n.js           EN/ID dictionaries
  components/           language toggle
  screens/              six screens
  index.css             design system
```

## License

MIT
