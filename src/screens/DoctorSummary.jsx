import { useState } from 'react';
import { FRAMEWORK, SYMPTOMS, getStage } from '../data/stages.js';
import { getLatestActivityLog, getLogsForStage, recoveryDay } from '../lib/recovery.js';
import { formatDelta } from '../lib/symptoms.js';
import { buildSummary, copySummary, QUESTIONS } from '../lib/summary.js';

export default function DoctorSummary({ state, onBack }) {
  const [copyState, setCopyState] = useState('idle');

  const stage = getStage(state.currentStage);
  const day = recoveryDay(state.recoveryStartDate);
  const latest = getLatestActivityLog(state);
  const stageLogs = getLogsForStage(state, state.currentStage);

  async function handleCopy() {
    const text = buildSummary(state);
    const ok = await copySummary(text);
    setCopyState(ok ? 'copied' : 'failed');
    setTimeout(() => setCopyState('idle'), 2000);
  }

  return (
    <div className="stack-lg">
      <header className="stack-sm">
        <p className="wordmark">Rebound</p>
        <p className="tagline">Doctor conversation summary</p>
      </header>

      <hr className="rule" />

      <p className="muted">
        A record of what you logged, formatted to bring into a conversation with your
        healthcare professional. It contains no assessment — only what you recorded.
      </p>

      <div className="card stack">
        <div>
          {day !== null && <p style={{ margin: 0 }}>Recovery day {day}</p>}
          <p style={{ margin: 0 }}>
            Current stage: {state.currentStage} of 6 — {stage?.name}
          </p>
          <p className="fine" style={{ margin: 0 }}>
            Framework: {FRAMEWORK.name}
          </p>
        </div>

        <hr className="rule" />

        <div>
          <h3 style={{ fontSize: 'var(--step-0)' }}>Activity at this stage</h3>
          {stageLogs.length === 0 ? (
            <p className="fine">No activity recorded at this stage yet.</p>
          ) : (
            <div className="stack-sm" style={{ marginTop: '0.5rem' }}>
              {stageLogs.slice(-5).map((log) => (
                <p key={log.id} className="fine" style={{ margin: 0 }}>
                  {log.date} — {log.activity}
                </p>
              ))}
            </div>
          )}
        </div>

        {latest?.symptomsBefore && latest?.symptomsAfter && (
          <>
            <hr className="rule" />
            <div>
              <h3 style={{ fontSize: 'var(--step-0)' }}>
                Most recent activity — Stage {latest.stage}
              </h3>
              <p className="fine" style={{ marginTop: '0.25rem' }}>
                {latest.date} · {latest.activity} · scale 0–10, before → after.
              </p>
              <div className="stack-sm" style={{ marginTop: '0.5rem' }}>
                {SYMPTOMS.map((symptom) => {
                  const before = latest.symptomsBefore[symptom.key];
                  const after = latest.symptomsAfter[symptom.key];
                  const delta = latest.symptomChanges?.[symptom.key] ?? 0;
                  return (
                    <div
                      key={symptom.key}
                      style={{ display: 'flex', justifyContent: 'space-between' }}
                    >
                      <span className="muted">{symptom.label}</span>
                      <span style={{ fontVariantNumeric: 'tabular-nums' }}>
                        {before} → {after}
                        {delta !== 0 ? ` (${formatDelta(delta)})` : ''}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        <hr className="rule" />

        <div>
          <h3 style={{ fontSize: 'var(--step-0)' }}>Questions to discuss</h3>
          <ul className="stack-sm" style={{ margin: '0.5rem 0 0', paddingLeft: '1.1rem' }}>
            {QUESTIONS.map((question) => (
              <li key={question} className="muted">
                {question}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="stack-sm">
        <button type="button" className="button button-full" onClick={handleCopy}>
          {copyState === 'copied'
            ? 'Copied'
            : copyState === 'failed'
              ? 'Could not copy — select the text manually'
              : 'Copy summary'}
        </button>
        <button type="button" className="button button-quiet button-full" onClick={onBack}>
          Back to today
        </button>
      </div>
    </div>
  );
}
