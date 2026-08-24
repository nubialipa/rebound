<h1>Rebound</h1>

**Track what you feel. Bring it to the conversation.**

[**Live demo**](https://rebound-nu.vercel.app) · Open it and choose *"Or explore a sample recovery"* to see eight days of data without entering anything.

![Rebound](screenshot.PNG)

Rebound is a recovery companion for people recovering from concussion. It records what you did each day and how you felt before and after — then turns those records into a structured summary you can bring to your healthcare professional.

| | |
|---|---|
| **Status** | Hackathon prototype |
| **Event** | Hack for Humanity Summer 2026 · Best Tech for Concussion Recovery |
| **Framework** | CISG Amsterdam 2022 / CDC HEADS UP |
| **Stack** | React 19 · Vite · plain CSS · localStorage |
| **Storage** | Local only — no account, no server |
| **AI** | None, by design |
| **Languages** | English · Indonesian |

---

## The problem

Concussion recovery is long, invisible, and hard to describe. A person is asked how they've been feeling since the last appointment, and answers from memory: *better, I think. Some days worse.*

That answer is honest and nearly useless. What activity was attempted, what symptoms preceded it, what changed afterwards — all of it happened weeks ago and none of it was written down.

Meanwhile the framework that guides recovery is public, well-documented, and almost never in the patient's hands. It lives in clinical guidance, not on the phone of the person actually doing the recovering.

## How it works

```
   Log an activity          What did you do today?
          ↓
   Symptoms before          Six symptoms, 0–10
          ↓
   Symptoms after           The same six, plus a note in your own words
          ↓
   Your record grows        Dated, ordered, including the days you moved back
          ↓
   Bring it                 One copyable summary for your appointment
```

A minute a day. The value shows up after a week.

## What makes it different

The obvious product here is an app that tells you when you're ready for the next stage. That app would be easier to build and far more dangerous.

> ### Rebound records your progress. It does not determine when you should progress.

Every decision follows from that sentence.

| The problem | Rebound's decision |
|---|---|
| People forget what happened between appointments | A dated record, ordered by the day it happened |
| Symptoms fluctuate through the day | Before and after each activity, not once daily |
| Progression is a clinical judgment | No auto-advance; the person records their own moves |
| Recovery is not linear | Moving back a stage has the same weight as moving forward |
| Numbers lose the story | An optional note in the person's own words |
| Health data is sensitive | Nothing leaves the device |

## The six stages

Rebound follows the graduated return-to-sport strategy from the **Concussion in Sport Group 6th Consensus Statement** (Amsterdam 2022, BJSM June 2023), published for the public as the [CDC HEADS UP return-to-play progression](https://www.cdc.gov/heads-up/guidelines/returning-to-sports.html).

The attribution appears in the app itself, not only here. *Why six stages* has a citation as its answer, not a design preference.

Stages 4 and above involve risk of head impact and require clearance from a healthcare professional. Rebound asks the person to confirm they have it — self-attestation, not verification, and the app says so.

## Designed for cognitive recovery

Concussion recovery involves fatigue, brain fog, and light sensitivity. Those constraints shaped the interface more than aesthetic preference did.

- Guidance is a permanent part of the screen, never a modal. A dismissible popup is the wrong format for a reader who may need it again tomorrow.
- The empty Today screen teaches the daily loop instead of saying "nothing here yet" — including the part that matters most, *come back tomorrow*.
- Warm off-white and muted slate rather than clinical white and pure black.
- Dark mode follows the system preference; `prefers-reduced-motion` is respected. There is no animation anywhere in the app.
- One primary action per screen, generous type sizing.

The EN/ID toggle switches the whole interface including the summary, so someone recovering in Indonesia can hand an Indonesian clinician an Indonesian record. Translation here is a safety surface, not decoration: *records* must not become *determines* in either language.

## Safety, in the architecture

Claims about medical safety are cheap. These are verifiable in the source.

**There is no `canAdvance()`.** No `isSafe()`, no `shouldStop()`, no `isCleared()`. Search the source — those functions do not exist. `recovery.js` exposes `calculateSymptomChanges()` and `hoursSinceLastStageChange()`: functions that return facts, never permission.

**The +2 threshold is never wired to the UI.** Guidance describes mild, brief symptom exacerbation as potentially tolerable within stated limits. That number lives in `stages.js` as `GUIDANCE_NOTE_THRESHOLD` and is imported by no logic module at all. It exists to be read, not to evaluate anyone. The moment a threshold controls a button, the app has quietly become a decision engine.

**The 24-hour interval is context, not a gate.** `minimumIntervalObserved()` reports elapsed hours beside what the guidance says. It disables nothing.

**There is no field called `worsened`.** Naming a number "worsened" is already a clinical read. Rebound stores `symptomChanges` — a per-symptom delta, reported as-is. `Dizziness 4 → 10 (+6)` appears exactly that way, with no adjective attached.

**No status badges.** Earlier drafts had "Ready to advance", then "Looks good to discuss", then "Ready for review". Each euphemism was still a verdict. The fix was structural: remove the badge, show the observation, let the person conclude.

**No AI.** Every threshold comes from published guidance and runs locally as deterministic logic you can read. A model making clinical judgments is precisely what this product is designed not to be.

**Sample data never touches storage.** It lives in React state only; `save()` is skipped whenever `isSample` is set. Exploring the sample cannot overwrite a real record.

## Why 0–10

Rebound records symptom change during activity rather than reproducing a validated clinical instrument. The Amsterdam guidance describes exertion-related exacerbation on a 0–10 scale, so Rebound uses 0–10.

It deliberately does not reproduce SCAT6, which may be copied freely in its original form but requires written permission from BMJ for digital reformatting or translation. Rebound uses its own six-symptom set with generic anchors — none, mild, moderate, severe — defined by function rather than sensation: mild means you notice it but carry on, moderate means it interferes, severe means you have to stop.

What carries meaning is the change from before to after, not the absolute number. Rebound never compares one person's 5 to another person's 5.

## Limitations

Rebound is a prototype. It is a record-keeping aid, not a medical device, and not a substitute for professional diagnosis, treatment, or clearance.

- The clearance confirmation is self-reported and cannot be verified.
- The symptom set is Rebound's own. It is not a validated instrument and its scores are not comparable to SCAT, PCSS, or RPQ results.
- Symptom scores are subjective and can mean different things on different days. Only within-person change is meant to carry weight.
- Data lives in one browser on one device. Clearing browser storage deletes the record; there is no export beyond copying the summary.
- No automated test suite. Logic was verified through scripted simulation, including a regression case checking that a large symptom increase renders as a number with no verdict language attached.
- Stage completion is not inferred from logs, so the app cannot tell whether a stage was genuinely completed.

## Running locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. No environment variables, no API keys.

```
src/
  data/stages.js           six stages, symptoms, framework attribution
  data/sampleRecovery.js   eight days of fictional data, never persisted
  lib/storage.js           the only module that touches localStorage
  lib/symptoms.js          delta arithmetic — calculates, never judges
  lib/recovery.js          logs, stage changes, timeline; facts, not permission
  lib/summary.js           doctor conversation summary
  lib/i18n.js              EN/ID dictionaries
  screens/                 seven screens
  index.css                design system
```

## License

MIT
