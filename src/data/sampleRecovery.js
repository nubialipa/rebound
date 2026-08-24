// A sample recovery record, so someone opening Rebound for the first time can
// see what the product looks like after a week of use rather than an empty
// screen.
//
// This is fictional. It is labelled as fictional everywhere it appears, it is
// never written to storage, and exiting sample mode leaves the person's own
// record untouched.

function daysAgo(n) {
  const date = new Date();
  date.setDate(date.getDate() - n);
  return date.toISOString().slice(0, 10);
}

function symptoms({ headache = 0, dizziness = 0, nausea = 0, lightSensitivity = 0, fatigue = 0, brainFog = 0 }) {
  return { headache, dizziness, nausea, lightSensitivity, fatigue, brainFog };
}

function delta(before, after) {
  return Object.keys(before).reduce((out, key) => {
    out[key] = after[key] - before[key];
    return out;
  }, {});
}

function activity({ day, stage, name, before, after, note = '' }) {
  const b = symptoms(before);
  const a = symptoms(after);
  return {
    id: `sample-activity-${day}`,
    type: 'activity',
    date: daysAgo(day),
    recordedAt: new Date(`${daysAgo(day)}T18:00:00`).toISOString(),
    stage,
    activity: name,
    note,
    symptomsBefore: b,
    symptomsAfter: a,
    symptomChanges: delta(b, a),
  };
}

function stageChange({ day, from, to, note = '' }) {
  return {
    id: `sample-stage-${day}`,
    type: 'stageChange',
    date: daysAgo(day),
    recordedAt: new Date(`${daysAgo(day)}T09:00:00`).toISOString(),
    from,
    to,
    direction: to > from ? 'forward' : 'back',
    note,
  };
}

// Eight days. Steady early progress, a bad day on the moderate stage, a move
// back, then settling. This is what recovery actually looks like — not a line
// going up.
export function createSampleState() {
  return {
    version: 1,
    language: 'en',
    isSample: true,
    recoveryStartDate: daysAgo(7),
    currentStage: 2,
    onboardingAcknowledged: true,
    contactClearanceConfirmed: false,
    activityLogs: [
      activity({
        day: 7,
        stage: 1,
        name: 'Household activity, short walk indoors',
        before: { headache: 5, dizziness: 4, fatigue: 6, brainFog: 5, lightSensitivity: 4 },
        after: { headache: 5, dizziness: 4, fatigue: 7, brainFog: 5, lightSensitivity: 4 },
      }),
      activity({
        day: 6,
        stage: 1,
        name: 'Half day at work, screen breaks every 20 min',
        before: { headache: 4, dizziness: 3, fatigue: 5, brainFog: 5, lightSensitivity: 4 },
        after: { headache: 5, dizziness: 3, fatigue: 6, brainFog: 6, lightSensitivity: 5 },
        note: 'Screens were harder than expected in the afternoon.',
      }),
      activity({
        day: 5,
        stage: 2,
        name: '15 min walking',
        before: { headache: 3, dizziness: 2, fatigue: 4, brainFog: 3, lightSensitivity: 3 },
        after: { headache: 3, dizziness: 2, fatigue: 4, brainFog: 3, lightSensitivity: 3 },
      }),
      activity({
        day: 4,
        stage: 2,
        name: '20 min walking',
        before: { headache: 2, dizziness: 2, fatigue: 3, brainFog: 3, lightSensitivity: 2 },
        after: { headache: 3, dizziness: 2, fatigue: 4, brainFog: 3, lightSensitivity: 2 },
      }),
      activity({
        day: 1,
        stage: 3,
        name: '10 min light jogging',
        before: { headache: 2, dizziness: 1, fatigue: 3, brainFog: 2, lightSensitivity: 2 },
        after: { headache: 5, dizziness: 7, fatigue: 6, brainFog: 5, lightSensitivity: 3 },
        note: 'Dizzy about four minutes in. Stopped and sat down for a while.',
      }),
      activity({
        day: 3,
        stage: 2,
        name: '15 min walking',
        before: { headache: 2, dizziness: 1, fatigue: 3, brainFog: 2, lightSensitivity: 2 },
        after: { headache: 2, dizziness: 1, fatigue: 3, brainFog: 2, lightSensitivity: 2 },
      }),
    ],
    stageChanges: [
      stageChange({ day: 6, from: 1, to: 2 }),
      stageChange({ day: 2, from: 2, to: 3 }),
      stageChange({ day: 1, from: 3, to: 2, note: 'Dizziness returned during jogging' }),
    ],
  };
}
