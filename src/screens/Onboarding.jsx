import { useState } from 'react';
import { FRAMEWORK } from '../data/stages.js';
import { todayISO } from '../lib/recovery.js';
import LanguageToggle from '../components/LanguageToggle.jsx';

export default function Onboarding({
  t,
  language,
  onLanguageChange,
  onStart,
  onExploreSample,
  storageAvailable,
}) {
  const [startDate, setStartDate] = useState(todayISO());
  const [acknowledged, setAcknowledged] = useState(false);
  const [error, setError] = useState('');

  function handleStart() {
    if (!startDate) {
      setError(t.onboarding.errorDate);
      return;
    }
    if (startDate > todayISO()) {
      setError(t.onboarding.errorFuture);
      return;
    }
    if (!acknowledged) {
      setError(t.onboarding.errorConsent);
      return;
    }
    onStart({ startDate });
  }

  return (
    <div className="stack-lg">
      <div className="header-row">
        <div className="stack-sm">
          <p className="wordmark">{t.wordmark}</p>
          <h1 style={{ fontSize: 'var(--step-2)', fontWeight: 500 }}>
            {t.onboarding.headline[0]}
            <br />
            {t.onboarding.headline[1]}
          </h1>
        </div>
        <LanguageToggle language={language} onChange={onLanguageChange} />
      </div>

      <hr className="rule" />

      <div className="stack">
        <p className="lede">{t.onboarding.lede}</p>
        <p className="muted">{t.onboarding.disclaimer}</p>
      </div>

      <div className="note stack-sm">
        <h3>{t.onboarding.stagesTitle}</h3>
        <p className="muted">
          {t.onboarding.stagesBody} {FRAMEWORK.name}.
        </p>
        <p className="muted" style={{ fontWeight: 500, color: 'var(--ink)' }}>
          {t.onboarding.stagesBoundary}
        </p>
        <p className="fine">
          <a href={FRAMEWORK.publicUrl} target="_blank" rel="noreferrer">
            {FRAMEWORK.publicSource} · {t.onboarding.sourceLink}
          </a>
        </p>
      </div>

      <div className="stack-sm">
        <h3 style={{ fontSize: 'var(--step-0)' }}>{t.onboarding.howTitle}</h3>
        <ol className="how-list">
          {t.onboarding.howSteps.map(([title, detail], index) => (
            <li key={title} className="how-item">
              <span className="how-number">{index + 1}</span>
              <span>
                <span className="how-title">{title}</span>
                <span className="how-detail">{detail}</span>
              </span>
            </li>
          ))}
        </ol>
        <p className="fine">{t.onboarding.howDaily}</p>
      </div>

      {!storageAvailable && (
        <div className="card stack-sm">
          <h3>{t.onboarding.storageTitle}</h3>
          <p className="muted">{t.onboarding.storageBody}</p>
        </div>
      )}

      <div className="card stack">
        <div>
          <label className="label" htmlFor="start-date">
            {t.onboarding.dateLabel}
          </label>
          <input
            id="start-date"
            className="field"
            type="date"
            value={startDate}
            max={todayISO()}
            onChange={(event) => {
              setStartDate(event.target.value);
              setError('');
            }}
          />
          <p className="fine" style={{ marginTop: '0.5rem' }}>
            {t.onboarding.dateHelp}
          </p>
        </div>

        <label className="check">
          <input
            type="checkbox"
            checked={acknowledged}
            onChange={(event) => {
              setAcknowledged(event.target.checked);
              setError('');
            }}
          />
          <span>{t.onboarding.consent}</span>
        </label>

        {error && <p className="error">{error}</p>}

        <button type="button" className="button button-full" onClick={handleStart}>
          {t.onboarding.start}
        </button>

        <p className="fine" style={{ textAlign: 'center', margin: 0 }}>
          <button type="button" className="link-button" onClick={onExploreSample}>
            {t.onboarding.exploreSample}
          </button>
        </p>
      </div>

      <p className="fine">{t.onboarding.privacy}</p>
    </div>
  );
}
