// Doctor conversation summary.
//
// This is the point of the product: it turns scattered self-tracking into
// something a person can actually bring into a clinical conversation.
//
// The summary reports what was recorded. It contains no assessment, no
// recommendation, and no statement about readiness.

import { FRAMEWORK, SYMPTOMS, getStage } from '../data/stages.js';
import { formatDelta, listChangedSymptoms } from './symptoms.js';
import { getLatestActivityLog, getLogsForStage, recoveryDay } from './recovery.js';

const QUESTIONS = [
  'How should I progress activity from here?',
  'When should I stop an activity?',
  'Which symptoms should I monitor most closely?',
];

export { QUESTIONS };

function formatSymptomLine(label, before, after, delta) {
  const padded = `${label}:`.padEnd(20, ' ');
  const change = delta === 0 ? '' : `   (${formatDelta(delta)})`;
  return `${padded}${before} → ${after}${change}`;
}

export function buildSummary(state) {
  const stage = getStage(state.currentStage);
  const day = recoveryDay(state.recoveryStartDate);
  const latest = getLatestActivityLog(state);
  const stageLogs = getLogsForStage(state, state.currentStage);

  const lines = [];

  lines.push('CONCUSSION RECOVERY SUMMARY');
  lines.push('');
  if (day !== null) lines.push(`Recovery day: ${day}`);
  lines.push(`Current stage: ${state.currentStage} of 6 — ${stage ? stage.name.toLowerCase() : 'unknown'}`);
  lines.push(`Framework: ${FRAMEWORK.name}`);
  lines.push('');

  lines.push('ACTIVITY AT THIS STAGE');
  if (stageLogs.length === 0) {
    lines.push('No activity recorded at this stage yet.');
  } else {
    stageLogs.slice(-5).forEach((log) => {
      lines.push(`${log.date} — ${log.activity}`);
    });
  }
  lines.push('');

  if (latest?.symptomsBefore && latest?.symptomsAfter) {
    lines.push(`MOST RECENT ACTIVITY — STAGE ${latest.stage}`);
    lines.push(`${latest.date} — ${latest.activity}`);
    lines.push('Symptom scores, scale 0–10, before → after');
    SYMPTOMS.forEach((symptom) => {
      lines.push(
        formatSymptomLine(
          symptom.label,
          latest.symptomsBefore[symptom.key],
          latest.symptomsAfter[symptom.key],
          latest.symptomChanges?.[symptom.key] ?? 0,
        ),
      );
    });

    const changed = listChangedSymptoms(latest.symptomChanges);
    lines.push('');
    lines.push(
      changed.length === 0
        ? 'No symptom scores changed after this activity.'
        : `Changed: ${changed.map((c) => `${c.label} ${formatDelta(c.delta)}`).join(', ')}`,
    );
    lines.push('');
  }

  lines.push('QUESTIONS TO DISCUSS');
  QUESTIONS.forEach((question) => lines.push(`- ${question}`));
  lines.push('');
  lines.push('Recorded with Rebound, a self-tracking tool. This summary is a record of');
  lines.push('self-reported observations. It is not a clinical assessment.');

  return lines.join('\n');
}

export async function copySummary(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
