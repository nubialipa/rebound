import { stageProgress } from '../lib/recovery.js';

export default function RecoveryJourney({ state, t, onBack }) {
  const stages = stageProgress(state);

  return (
    <div className="stack-lg">
      <header className="stack-sm">
        <p className="wordmark">{t.wordmark}</p>
        <p className="tagline">{t.journey.title}</p>
      </header>

      <hr className="rule" />

      <ol className="journey-list">
        {stages.map((stage) => (
          <li key={stage.number} className={`journey-item is-${stage.status}`}>
            <div className="stack-sm">
              <div>
                <p style={{ margin: 0, fontWeight: 500 }}>
                  {t.today.stageOf(stage.number).split(' ').slice(0, 2).join(' ')} —{' '}
                  {t.stages[stage.number]?.name}
                </p>
                <p className="fine" style={{ margin: 0 }}>
                  {t.journey.status[stage.status]}
                </p>
              </div>

              {stage.hasHeadImpactRisk && (
                <p className="fine" style={{ margin: 0, color: 'var(--ink-soft)' }}>
                  {t.journey.needsClearance}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>

      <p className="fine">{t.journey.footer}</p>

      <button type="button" className="button button-quiet" onClick={onBack}>
        {t.journey.back}
      </button>
    </div>
  );
}
