import { useState } from 'react';
import { FRAMEWORK } from '../data/stages.js';
import { todayISO } from '../lib/recovery.js';

export default function Onboarding({ onStart, storageAvailable }) {
  const [startDate, setStartDate] = useState(todayISO());
  const [acknowledged, setAcknowledged] = useState(false);
  const [error, setError] = useState('');

  function handleStart() {
    if (!startDate) {
      setError('Choose the date your recovery started.');
      return;
    }
    if (startDate > todayISO()) {
      setError('That date is in the future. Choose today or an earlier date.');
      return;
    }
    if (!acknowledged) {
      setError('Read and confirm the note above before starting.');
      return;
    }
    onStart({ startDate });
  }

  return (
    <div className="stack-lg">
      <header className="stack-sm">
        <p className="wordmark">Rebound</p>
        <h1 style={{ fontSize: 'var(--step-2)', fontWeight: 500 }}>
          Track what you feel.
          <br />
          Bring it to the conversation.
        </h1>
      </header>

      <hr className="rule" />

      <div className="stack">
        <p className="lede">
          Record your activity and symptoms before and after — so you have a clearer
          record to discuss with your healthcare professional.
        </p>
        <p className="muted">
          It does not diagnose, treat, or decide when it is safe to return to activity.
          Those decisions stay with you and your healthcare professional.
        </p>
      </div>

      <div className="note stack-sm">
        <h3>The six stages</h3>
        <p className="muted">
          Rebound follows the graduated return-to-sport strategy published by the{' '}
          {FRAMEWORK.name}.
        </p>
        <p className="muted" style={{ fontWeight: 500, color: 'var(--ink)' }}>
          Rebound records your progress. It does not determine when you should
          progress.
        </p>
        <p className="fine">
          <a href={FRAMEWORK.publicUrl} target="_blank" rel="noreferrer">
            {FRAMEWORK.publicSource} · 6-step return to play
          </a>
        </p>
      </div>

      {!storageAvailable && (
        <div className="card stack-sm">
          <h3>Storage is unavailable</h3>
          <p className="muted">
            This browser is blocking local storage, so nothing you enter will be saved.
            Private browsing is the usual cause. You can still look around.
          </p>
        </div>
      )}

      <div className="card stack">
        <div>
          <label className="label" htmlFor="start-date">
            When did your recovery start?
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
            Used to count the days in your record. Days are tracked, not used to
            determine progression.
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
          <span>
            I understand Rebound is a self-tracking tool and does not provide medical
            clearance.
          </span>
        </label>

        {error && <p className="error">{error}</p>}

        <button type="button" className="button button-full" onClick={handleStart}>
          Start my record
        </button>
      </div>

      <p className="fine">
        Your recovery logs stay on this device. Rebound has no account and does not
        upload your recovery data to a server.
      </p>
    </div>
  );
}
