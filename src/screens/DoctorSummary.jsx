import { useState } from 'react';
import { FRAMEWORK, SYMPTOMS } from '../data/stages.js';
import { getLatestActivityLog, getLogsForStage, recoveryDay } from '../lib/recovery.js';
import { formatDelta } from '../lib/symptoms.js';
import { buildSummary, copySummary } from '../lib/summary.js';

export default function DoctorSummary({ state, t, language, onBack }) {
  const [copyState, setCopyState] = useState('idle');

  const stage = t.stages[state.currentStage];
  const day = recoveryDay(state.recoveryStartDate);
  const latest = getLatestActivityLog(state);
  const stageLogs = getLogsForStage(state, state.currentStage);

  async function handleCopy() {
    const text = buildSummary(state, language);
    const ok = await copySummary(text);
    setCopyState(ok ? 'copied' : 'failed');
    setTimeout(() => setCopyState('idle'), 2000);
  }

  return (
    <div className="stack-lg">
      <header className="stack-sm">
        <p className="wordmark">{t.wordmark}</p>
        <p className="tagline">{t.summary.title}</p>
      </header>

      <hr className="rule" />

      <p className="muted">{t.summary.intro}</p>

      <div className="card stack">
        <div>
          {day !== null && (
            <p style={{ margin: 0 }}>
              {t.summary.recoveryDay} {day}
            </p>
          )}
          <p style={{ margin: 0 }}>
            {t.summary.currentStage}: {state.currentStage} {t.summary.of6} — {stage?.name}
          </p>
          <p className="fine" style={{ margin: 0 }}>
            {t.summary.framework}: {FRAMEWORK.name}
          </p>
        </div>

        <hr className="rule" />

        <div>
          <h3 style={{ fontSize: 'var(--step-0)' }}>{t.summary.activityAtStage}</h3>
          {stageLogs.length === 0 ? (
            <p className="fine">{t.summary.noActivity}</p>
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
                {t.summary.recentActivity} {latest.stage}
              </h3>
              <p className="fine" style={{ marginTop: '0.25rem' }}>
                {latest.date} · {latest.activity} · {t.summary.scaleNote}
              </p>
              <div className="stack-sm" style={{ marginTop: '0.5rem' }}>
                {SYMPTOMS.map((symptom) => {
                  const before = latest.symptomsBefore[symptom.key];
                  const after = latest.symptomsAfter[symptom.key];
                  const delta = latest.symptomChanges?.[symptom.key] ?? 0;
                  return (
                    <div
                      key={symptom.key}
                      style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}
                    >
                      <span className="muted">{t.symptoms[symptom.key]}</span>
                      <span style={{ fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
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
          <h3 style={{ fontSize: 'var(--step-0)' }}>{t.summary.questionsTitle}</h3>
          <ul className="stack-sm" style={{ margin: '0.5rem 0 0', paddingLeft: '1.1rem' }}>
            {t.summary.questions.map((question) => (
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
            ? t.summary.copied
            : copyState === 'failed'
              ? t.summary.copyFailed
              : t.summary.copy}
        </button>
        <button type="button" className="button button-quiet button-full" onClick={onBack}>
          {t.summary.back}
        </button>
      </div>
    </div>
  );
}
