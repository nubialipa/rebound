import { recoveryDay, getLatestActivityLog } from '../lib/recovery.js';
import { listChangedSymptoms, formatDelta } from '../lib/symptoms.js';
import LanguageToggle from '../components/LanguageToggle.jsx';

export default function Today({
  state,
  t,
  language,
  onLanguageChange,
  onLogActivity,
  onChangeStage,
  onOpenActivityLog,
  onOpenJourney,
  onOpenSummary,
}) {
  const stage = t.stages[state.currentStage];
  const day = recoveryDay(state.recoveryStartDate);
  const latest = getLatestActivityLog(state);
  const changed = latest ? listChangedSymptoms(latest.symptomChanges) : [];

  return (
    <div className="stack-lg">
      <div className="header-row">
        <div className="stack-sm">
          <p className="wordmark">{t.wordmark}</p>
          <p className="tagline">
            {t.today.stageOf(state.currentStage)} · {stage?.name}
          </p>
        </div>
        <LanguageToggle language={language} onChange={onLanguageChange} />
      </div>

      <hr className="rule" />

      <div className="card stack">
        <div>
          <h2>{stage?.name}</h2>
          <p className="muted" style={{ marginTop: '0.375rem' }}>
            {stage?.description}
          </p>
        </div>

        {stage?.examples?.length ? (
          <p className="fine">
            {t.today.examples}: {stage.examples.join(', ')}
          </p>
        ) : null}

        <button type="button" className="button button-full" onClick={onLogActivity}>
          {t.today.logActivity}
        </button>

        {day !== null && (
          <p className="fine" style={{ margin: 0 }}>
            {t.today.recoveryDay(day)}
          </p>
        )}
      </div>

      <div className="stack-sm">
        <h3 style={{ fontSize: 'var(--step-0)' }}>{t.today.lastLogged}</h3>
        {latest ? (
          <div className="card stack-sm">
            <p className="muted">
              {latest.date} · {latest.activity}
            </p>
            <p className="fine" style={{ margin: 0 }}>
              {changed.length === 0
                ? t.today.noChange
                : `${t.today.symptomChange}: ${changed
                    .map((item) => `${t.symptoms[item.key]} ${formatDelta(item.delta)}`)
                    .join(' · ')}`}
            </p>
          </div>
        ) : (
          <p className="muted">{t.today.noneYet}</p>
        )}
      </div>

      <div className="stack-sm">
        <button type="button" className="button button-quiet button-full" onClick={onChangeStage}>
          {t.today.changeStage}
        </button>
        <button type="button" className="button button-quiet button-full" onClick={onOpenActivityLog}>
          {t.today.viewLog}
        </button>
        <button type="button" className="button button-quiet button-full" onClick={onOpenJourney}>
          {t.today.viewJourney}
        </button>
        <button type="button" className="button button-quiet button-full" onClick={onOpenSummary}>
          {t.today.viewSummary}
        </button>
      </div>
    </div>
  );
}
