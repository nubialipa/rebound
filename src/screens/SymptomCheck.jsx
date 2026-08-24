import { useState } from 'react';
import { SYMPTOMS, SYMPTOM_SCALE } from '../data/stages.js';
import { createEmptySymptomSet, clampScore } from '../lib/symptoms.js';

const STEPS = ['activity', 'before', 'after'];

export default function SymptomCheck({ onComplete, onCancel }) {
  const [step, setStep] = useState('activity');
  const [activity, setActivity] = useState('');
  const [symptomsBefore, setSymptomsBefore] = useState(createEmptySymptomSet);
  const [symptomsAfter, setSymptomsAfter] = useState(createEmptySymptomSet);
  const [error, setError] = useState('');

  const stepIndex = STEPS.indexOf(step);

  function goNext() {
    if (step === 'activity') {
      if (!activity.trim()) {
        setError('Describe what you did, even briefly.');
        return;
      }
      setError('');
      setStep('before');
      return;
    }
    if (step === 'before') {
      setStep('after');
      return;
    }
    onComplete({ activity: activity.trim(), symptomsBefore, symptomsAfter });
  }

  function goBack() {
    if (step === 'activity') {
      onCancel();
      return;
    }
    if (step === 'before') setStep('activity');
    else if (step === 'after') setStep('before');
  }

  return (
    <div className="stack-lg">
      <header className="stack-sm">
        <p className="wordmark">Rebound</p>
        <p className="tagline">
          Step {stepIndex + 1} of {STEPS.length}
        </p>
      </header>

      <hr className="rule" />

      {step === 'activity' && (
        <div className="card stack">
          <div>
            <label className="label" htmlFor="activity-input">
              What did you do today?
            </label>
            <input
              id="activity-input"
              className="field"
              type="text"
              placeholder="e.g. 15 min walking"
              value={activity}
              onChange={(event) => {
                setActivity(event.target.value);
                setError('');
              }}
            />
          </div>
          {error && <p className="error">{error}</p>}
        </div>
      )}

      {step === 'before' && (
        <SymptomSliders
          title="Before this activity"
          values={symptomsBefore}
          onChange={setSymptomsBefore}
        />
      )}

      {step === 'after' && (
        <SymptomSliders
          title="After this activity"
          values={symptomsAfter}
          onChange={setSymptomsAfter}
        />
      )}

      <div className="stack-sm">
        <button type="button" className="button button-full" onClick={goNext}>
          {step === 'after' ? 'Save log' : 'Continue'}
        </button>
        <button type="button" className="button button-quiet button-full" onClick={goBack}>
          {step === 'activity' ? 'Cancel' : 'Back'}
        </button>
      </div>
    </div>
  );
}

function SymptomSliders({ title, values, onChange }) {
  function setSymptom(key, value) {
    onChange({ ...values, [key]: clampScore(value) });
  }

  return (
    <div className="card stack">
      <h3>{title}</h3>
      <p className="fine" style={{ marginTop: '-0.5rem' }}>
        0 is none, 10 is the most severe you can imagine.
      </p>
      <div className="stack">
        {SYMPTOMS.map((symptom) => (
          <div key={symptom.key}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label className="label" htmlFor={`${symptom.key}-slider`} style={{ marginBottom: 0 }}>
                {symptom.label}
              </label>
              <span className="muted" style={{ fontVariantNumeric: 'tabular-nums' }}>
                {values[symptom.key]}
              </span>
            </div>
            <input
              id={`${symptom.key}-slider`}
              type="range"
              min={SYMPTOM_SCALE.min}
              max={SYMPTOM_SCALE.max}
              value={values[symptom.key]}
              onChange={(event) => setSymptom(symptom.key, event.target.value)}
              style={{ width: '100%', accentColor: 'var(--accent)' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
