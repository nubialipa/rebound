// Recovery record logic.
//
// Two rules govern this module:
//
// 1. Nothing here returns permission. There is no canAdvance(), no isCleared(),
//    no shouldStop(). Stage changes happen because the person chose to record
//    one, never because a calculation allowed it.
//
// 2. Activity logs and stage changes are separate lists. Mixing them makes the
//    activity log unreadable once someone moves back a stage, which published
//    guidance describes as a normal part of recovery.

import { MINIMUM_INTERVAL_HOURS, STAGES } from '../data/stages.js';
import { calculateSymptomChanges } from './symptoms.js';

const DAY_MS = 24 * 60 * 60 * 1000;

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function recoveryDay(recoveryStartDate, today = todayISO()) {
  if (!recoveryStartDate) return null;
  const start = new Date(`${recoveryStartDate}T00:00:00`);
  const now = new Date(`${today}T00:00:00`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(now.getTime())) return null;
  return Math.floor((now - start) / DAY_MS) + 1;
}

export function createActivityLog({ stage, activity, symptomsBefore, symptomsAfter, date = todayISO() }) {
  return {
    id: `activity-${Date.now()}`,
    type: 'activity',
    date,
    recordedAt: new Date().toISOString(),
    stage,
    activity,
    symptomsBefore,
    symptomsAfter,
    symptomChanges: calculateSymptomChanges(symptomsBefore, symptomsAfter),
  };
}

export function createStageChange({ from, to, note = '', date = todayISO() }) {
  return {
    id: `stage-${Date.now()}`,
    type: 'stageChange',
    date,
    recordedAt: new Date().toISOString(),
    from,
    to,
    direction: to > from ? 'forward' : 'back',
    note,
  };
}

export function getLatestActivityLog(state) {
  if (!state.activityLogs?.length) return null;
  return state.activityLogs[state.activityLogs.length - 1];
}

export function getLatestStageChange(state) {
  if (!state.stageChanges?.length) return null;
  return state.stageChanges[state.stageChanges.length - 1];
}

export function getLogsForStage(state, stage) {
  return (state.activityLogs ?? []).filter((log) => log.stage === stage);
}

// Merged, newest-first view for the activity log screen. Stage changes appear
// inline so the record reads as a continuous story, including the moves back.
export function getTimeline(state) {
  return [...(state.activityLogs ?? []), ...(state.stageChanges ?? [])]
    .sort((a, b) => new Date(b.recordedAt) - new Date(a.recordedAt));
}

// Reports elapsed time since the last stage change. This is context printed on
// a record — deliberately not wired to any button's disabled state.
export function hoursSinceLastStageChange(state, now = new Date()) {
  const last = getLatestStageChange(state);
  if (!last) return null;
  const then = new Date(last.recordedAt);
  if (Number.isNaN(then.getTime())) return null;
  return Math.floor((now - then) / (60 * 60 * 1000));
}

export function minimumIntervalObserved(state, now = new Date()) {
  const hours = hoursSinceLastStageChange(state, now);
  if (hours === null) return null;
  return hours >= MINIMUM_INTERVAL_HOURS;
}

export function stageProgress(state) {
  return STAGES.map((stage) => {
    let status = 'not-started';
    if (stage.number === state.currentStage) status = 'current';
    else if (getLogsForStage(state, stage.number).length > 0) status = 'logged';
    return { ...stage, status };
  });
}
