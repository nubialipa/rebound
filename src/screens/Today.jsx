import { getStage } from '../data/stages.js';
import { recoveryDay, getLatestActivityLog } from '../lib/recovery.js';
import { listChangedSymptoms, formatDelta } from '../lib/symptoms.js';

export default function Today({ state, onLogActivity, onOpenJourney, onOpenSummary }) {
  const stage = getStage(state.currentStage);
  const day = recoveryDay(state.recoveryStartDate);
  const latest = getLatestActivityLog(state);
  const changed = latest ? listChangedSymptoms(latest.symptomChanges) : [];

  return (
    <div className="stack-lg">
      <header className="stack-sm">
        <p className="wordmark">Rebound</p>
        <p className="tagline">
          Stage {stage?.number} of 6 · {stage?.name}
        </p>
      </header>

      <hr className="rule" />

      <div className="card stack">
        <div>
          <h2>{stage?.name}</h2>
          <p className="muted" style={{ marginTop: '0.375rem' }}>
            {stage?.description}
          </p>
        </div>

        {stage?.examples?.length ? (
          <p className="fine">Examples: {stage.examples.join(', ')}</p>
        ) : null}

        <button type="button" className="button button-full" onClick={onLogActivity}>
          Log today's activity
        </button>

        {day !== null && (
          <p className="fine" style={{ margin: 0 }}>
            Recovery day {day}. Days are tracked, not used to determine progression.
          </p>
        )}
      </div>

      <div className="stack-sm">
        <h3 style={{ fontSize: 'var(--step-0)' }}>Last logged</h3>
        {latest ? (
          <div className="card stack-sm">
            <p className="muted">
              {latest.date} · {latest.activity}
            </p>
            <p className="fine" style={{ margin: 0 }}>
              {changed.length === 0
                ? 'No symptom scores changed after this activity.'
                : `Symptom change: ${changed
                    .map((item) => `${item.label} ${formatDelta(item.delta)}`)
                    .join(' · ')}`}
            </p>
          </div>
        ) : (
          <p className="muted">Nothing logged yet. Your first entry starts the record.</p>
        )}
      </div>

      <div className="stack-sm">
        <button type="button" className="button button-quiet button-full" onClick={onOpenJourney}>
          View recovery journey
        </button>
        <button type="button" className="button button-quiet button-full" onClick={onOpenSummary}>
          Doctor conversation summary
        </button>
      </div>
    </div>
  );
}
