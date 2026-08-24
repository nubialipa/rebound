// Doctor conversation summary.
//
// This is the point of the product: it turns scattered self-tracking into
// something a person can actually bring into a clinical conversation.
//
// The summary reports what was recorded. It contains no assessment, no
// recommendation, and no statement about readiness.

import { FRAMEWORK, SYMPTOMS } from '../data/stages.js';
import { getDictionary } from './i18n.js';
import { formatDelta, listChangedSymptoms } from './symptoms.js';
import { getLatestActivityLog, getLogsForStage, recoveryDay } from './recovery.js';

// Column width comes from the longest label in the active language — an
// Indonesian label can be half again as long as its English counterpart.
function symptomColumnWidth(t) {
  return SYMPTOMS.reduce((width, symptom) => {
    const length = (t.symptoms[symptom.key] ?? symptom.label).length + 1;
    return Math.max(width, length);
  }, 0) + 2;
}

function formatSymptomLine(label, before, after, delta, width) {
  const padded = `${label}:`.padEnd(width, ' ');
  const scores = `${before} → ${after}`.padEnd(9, ' ');
  const change = delta === 0 ? '' : `(${formatDelta(delta)})`;
  return `${padded}${scores}${change}`.trimEnd();
}

export function buildSummary(state, language = 'en') {
  const t = getDictionary(language);
  const stageName = t.stages[state.currentStage]?.name ?? '';
  const day = recoveryDay(state.recoveryStartDate);
  const latest = getLatestActivityLog(state);
  const stageLogs = getLogsForStage(state, state.currentStage);

  const lines = [];

  lines.push(t.summary.plainHeading);
  lines.push('');
  if (day !== null) lines.push(`${t.summary.recoveryDay}: ${day}`);
  lines.push(
    `${t.summary.currentStage}: ${state.currentStage} ${t.summary.of6} — ${stageName}`,
  );
  lines.push(`${t.summary.framework}: ${FRAMEWORK.name}`);
  lines.push('');

  lines.push(t.summary.plainActivityHeading);
  if (stageLogs.length === 0) {
    lines.push(t.summary.noActivity);
  } else {
    stageLogs.slice(-5).forEach((log) => {
      lines.push(`${log.date} — ${log.activity}`);
    });
  }
  lines.push('');

  if (latest?.symptomsBefore && latest?.symptomsAfter) {
    lines.push(`${t.summary.plainRecentHeading} ${latest.stage}`);
    lines.push(`${latest.date} — ${latest.activity}`);
    lines.push(t.summary.plainScaleLine);
    const width = symptomColumnWidth(t);
    SYMPTOMS.forEach((symptom) => {
      lines.push(
        formatSymptomLine(
          t.symptoms[symptom.key],
          latest.symptomsBefore[symptom.key],
          latest.symptomsAfter[symptom.key],
          latest.symptomChanges?.[symptom.key] ?? 0,
          width,
        ),
      );
    });

    const changed = listChangedSymptoms(latest.symptomChanges);
    lines.push('');
    lines.push(
      changed.length === 0
        ? t.summary.plainNoChange
        : `${t.summary.plainChanged}: ${changed
            .map((c) => `${t.symptoms[c.key]} ${formatDelta(c.delta)}`)
            .join(', ')}`,
    );
    lines.push('');
  }

  lines.push(t.summary.plainQuestions);
  t.summary.questions.forEach((question) => lines.push(`- ${question}`));
  lines.push('');
  t.summary.plainFooter.forEach((line) => lines.push(line));

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
