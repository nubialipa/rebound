import { stageProgress } from '../lib/recovery.js';

const STATUS_LABEL = {
  current: 'Current',
  logged: 'Logged',
  'not-started': 'Not started',
};

export default function RecoveryJourney({ state, onBack }) {
  const stages = stageProgress(state);

  return (
    <div className="stack-lg">
      <header className="stack-sm">
        <p className="wordmark">Rebound</p>
        <p className="tagline">Recovery journey</p>
      </header>

      <hr className="rule" />

      <ol className="journey-list">
        {stages.map((stage) => (
          <li key={stage.number} className={`journey-item is-${stage.status}`}>
            <div className="stack-sm">
              <div>
                <p style={{ margin: 0, fontWeight: 500 }}>
                  Stage {stage.number} — {stage.name}
                </p>
                <p className="fine" style={{ margin: 0 }}>
                  {STATUS_LABEL[stage.status]}
                </p>
              </div>

              {stage.hasHeadImpactRisk && (
                <p className="fine" style={{ margin: 0, color: 'var(--ink-soft)' }}>
                  Requires clearance from your healthcare professional.
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>

      <p className="fine">Your timeline reflects your logs — not medical clearance.</p>

      <button type="button" className="button button-quiet" onClick={onBack}>
        Back to today
      </button>
    </div>
  );
}
