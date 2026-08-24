import { useState } from 'react';
import { STAGES, getStage, stageHasHeadImpactRisk, MINIMUM_INTERVAL_HOURS } from '../data/stages.js';
import { hoursSinceLastStageChange } from '../lib/recovery.js';

export default function StageChange({ state, onConfirm, onCancel }) {
  const [target, setTarget] = useState(null);
  const [clearanceConfirmed, setClearanceConfirmed] = useState(false);
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const current = state.currentStage;
  const hours = hoursSinceLastStageChange(state);

  const forward = current < STAGES.length ? current + 1 : null;
  const backward = current > 1 ? current - 1 : null;

  const targetStage = target ? getStage(target) : null;
  const needsClearance = target ? stageHasHeadImpactRisk(target) : false;

  function choose(stageNumber) {
    setTarget(stageNumber);
    setClearanceConfirmed(false);
    setNote('');
    setError('');
  }

  function handleConfirm() {
    if (needsClearance && !clearanceConfirmed) {
      setError('Confirm you have clearance before recording this stage.');
      return;
    }
    onConfirm({ from: current, to: target, note: note.trim() });
  }

  return (
    <div className="stack-lg">
      <header className="stack-sm">
        <p className="wordmark">Rebound</p>
        <p className="tagline">Change stage</p>
      </header>

      <hr className="rule" />

      <div className="stack">
        <p className="muted">
          You are recording Stage {current} — {getStage(current)?.name}. Moving between
          stages is your decision, made with your healthcare professional. Rebound only
          records the change.
        </p>
        {hours !== null && (
          <p className="fine">
            {hours} hours since your last stage change. Published guidance describes a
            minimum of {MINIMUM_INTERVAL_HOURS} hours between steps.
          </p>
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
              Move to Stage {forward} — {getStage(forward)?.name}
            </button>
          )}
          {backward && (
            <button
              type="button"
              className="button button-quiet button-full"
              onClick={() => choose(backward)}
            >
              Move back to Stage {backward} — {getStage(backward)?.name}
            </button>
          )}
          <p className="fine">
            Published guidance describes returning to an earlier step if symptoms come
            back. Moving back is a normal part of recovery, not a failure.
          </p>
        </div>
      ) : (
        <div className="card stack">
          <div>
            <h3>
              Stage {target} — {targetStage?.name}
            </h3>
            <p className="muted" style={{ marginTop: '0.375rem' }}>
              {targetStage?.description}
            </p>
          </div>

          {needsClearance && (
            <div className="note stack-sm">
              <p style={{ margin: 0, fontWeight: 500 }}>
                This stage involves risk of head impact
              </p>
              <p className="muted" style={{ margin: 0 }}>
                Published guidance describes stages 4 and above as requiring clearance
                from a healthcare professional. Rebound cannot verify this — it records
                what you confirm.
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
                <span>I have clearance from my healthcare professional.</span>
              </label>
            </div>
          )}

          {target < current && (
            <div>
              <label className="label" htmlFor="stage-note">
                Note (optional)
              </label>
              <input
                id="stage-note"
                className="field"
                type="text"
                placeholder="e.g. symptoms returned"
                value={note}
                onChange={(event) => setNote(event.target.value)}
              />
            </div>
          )}

          <p className="fine" style={{ margin: 0 }}>
            Recording this does not determine medical clearance. Continue only according
            to guidance from your healthcare professional.
          </p>

          {error && <p className="error">{error}</p>}

          <div className="stack-sm">
            <button type="button" className="button button-full" onClick={handleConfirm}>
              Record move to Stage {target}
            </button>
            <button
              type="button"
              className="button button-quiet button-full"
              onClick={() => setTarget(null)}
            >
              Choose a different stage
            </button>
          </div>
        </div>
      )}

      <button type="button" className="button button-quiet" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
}
