// Symptom arithmetic. This module calculates differences. It does not decide
// whether a difference is acceptable, safe, or a reason to stop.
//
// There is deliberately no isSafe(), shouldStop(), or hasWorsened() here.
// Naming a number "worsened" is already a clinical read; Rebound reports the
// number and lets the person and their clinician read it.

import { SYMPTOMS, SYMPTOM_SCALE } from '../data/stages.js';

export function createEmptySymptomSet() {
  return SYMPTOMS.reduce((set, symptom) => {
    set[symptom.key] = 0;
    return set;
  }, {});
}

export function clampScore(value) {
  const number = Number(value);
  if (Number.isNaN(number)) return SYMPTOM_SCALE.min;
  return Math.min(SYMPTOM_SCALE.max, Math.max(SYMPTOM_SCALE.min, Math.round(number)));
}

export function calculateSymptomChanges(before, after) {
  if (!before || !after) return null;
  return SYMPTOMS.reduce((changes, symptom) => {
    changes[symptom.key] = clampScore(after[symptom.key]) - clampScore(before[symptom.key]);
    return changes;
  }, {});
}

// Returns only the symptoms that moved, so the UI can show
// "Headache +1 · Fatigue +1" instead of six lines of zeroes.
export function listChangedSymptoms(changes) {
  if (!changes) return [];
  return SYMPTOMS
    .filter((symptom) => changes[symptom.key] !== 0)
    .map((symptom) => ({
      key: symptom.key,
      label: symptom.label,
      delta: changes[symptom.key],
    }));
}

export function formatDelta(delta) {
  return delta > 0 ? `+${delta}` : String(delta);
}

export function largestIncrease(changes) {
  const increases = listChangedSymptoms(changes).filter((item) => item.delta > 0);
  if (increases.length === 0) return null;
  return increases.reduce((max, item) => (item.delta > max.delta ? item : max));
}
