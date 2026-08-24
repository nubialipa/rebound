import { useState } from 'react';
import { STAGES, stageHasHeadImpactRisk, MINIMUM_INTERVAL_HOURS } from '../data/stages.js';
import { hoursSinceLastStageChange } from '../lib/recovery.js';

export default function StageChange({ state, t, onConfirm, onCancel }) {
  const [target, setTarget] = useState(null);
  const [clearanceConfirmed, setClearanceConfirmed] = useState(false);
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const current = state.currentStage;
  const hours = hoursSinceLastStageChange(state);

  const forward = current < STAGES.length ? current + 1 : null;
  const backward = current > 1 ? current - 1 : null;

  const targetStage = target ? t.stages[target] : null;
  const needsClearance = target ? stageHasHeadImpactRisk(target) : false;

  function choose(stageNumber) {
    setTarget(stageNumber);
    setClearanceConfirmed(false);
    setNote('');
    setError('');
  }

  function handleConfirm() {
    if (needsClearance && !clearanceConfirmed) {
      setError(t.stageChange.errorClearance);
      return;
    }
    onConfirm({ from: current, to: target, note: note.trim() });
  }

  return (
    <div className="stack-lg">
      <header className="stack-sm">
        <p className="wordmark">{t.wordmark}</p>
        <p className="tagline">{t.stageChange.title}</p>
      </header>

      <hr className="rule" />

      <div className="stack">
        <p className="muted">{t.stageChange.intro(current, t.stages[current]?.name)}</p>
        {hours !== null && (
          <p className="fine">{t.stageChange.interval(hours, MINIMUM_INTERVAL_HOURS)}</p>
        )}
      </div>

      {target === null ? (
        <div className="stack-sm">
          {forward && (
            <button
              type="button"
              className="button button-quiet button-full"
              onClick={() => choose(forward)}
            >
              {t.stageChange.moveTo} {forward} — {t.stages[forward]?.name}
            </button>
          )}
          {backward && (
            <button
              type="button"
              className="button button-quiet button-full"
              onClick={() => choose(backward)}
            >
              {t.stageChange.moveBack} {backward} — {t.stages[backward]?.name}
            </button>
          )}
          <p className="fine">{t.stageChange.backNote}</p>
        </div>
      ) : (
        <div className="card stack">
          <div>
            <h3>
              {t.stageChange.moveTo} {target} — {targetStage?.name}
            </h3>
            <p className="muted" style={{ marginTop: '0.375rem' }}>
              {targetStage?.description}
            </p>
          </div>

          {needsClearance && (
            <div className="note stack-sm">
              <p style={{ margin: 0, fontWeight: 500 }}>{t.stageChange.riskTitle}</p>
              <p className="muted" style={{ margin: 0 }}>
                {t.stageChange.riskBody}
              </p>
              <label className="check">
                <input
                  type="checkbox"
                  checked={clearanceConfirmed}
                  onChange={(event) => {
                    setClearanceConfirmed(event.target.checked);
                    setError('');
                  }}
                />
                <span>{t.stageChange.riskConsent}</span>
              </label>
            </div>
          )}

          {target < current && (
            <div>
              <label className="label" htmlFor="stage-note">
                {t.stageChange.noteLabel}
              </label>
              <input
                id="stage-note"
                className="field"
                type="text"
                placeholder={t.stageChange.notePlaceholder}
                value={note}
                onChange={(event) => setNote(event.target.value)}
              />
            </div>
          )}

          <p className="fine" style={{ margin: 0 }}>
            {t.stageChange.boundary}
          </p>

          {error && <p className="error">{error}</p>}

          <div className="stack-sm">
            <button type="button" className="button button-full" onClick={handleConfirm}>
              {t.stageChange.confirm} {target}
            </button>
            <button
              type="button"
              className="button button-quiet button-full"
              onClick={() => setTarget(null)}
            >
              {t.stageChange.chooseOther}
            </button>
          </div>
        </div>
      )}

      <button type="button" className="button button-quiet" onClick={onCancel}>
        {t.stageChange.cancel}
      </button>
    </div>
  );
}
