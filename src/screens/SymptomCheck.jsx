import { useState } from 'react';
import { SYMPTOMS, SYMPTOM_SCALE } from '../data/stages.js';
import { createEmptySymptomSet, clampScore } from '../lib/symptoms.js';

const STEPS = ['activity', 'before', 'after'];

export default function SymptomCheck({ t, onComplete, onCancel }) {
  const [step, setStep] = useState('activity');
  const [activity, setActivity] = useState('');
  const [symptomsBefore, setSymptomsBefore] = useState(createEmptySymptomSet);
  const [symptomsAfter, setSymptomsAfter] = useState(createEmptySymptomSet);
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const stepIndex = STEPS.indexOf(step);

  function goNext() {
    if (step === 'activity') {
      if (!activity.trim()) {
        setError(t.symptomCheck.errorActivity);
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
    onComplete({ activity: activity.trim(), symptomsBefore, symptomsAfter, note: note.trim() });
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
        <p className="wordmark">{t.wordmark}</p>
        <p className="tagline">{t.symptomCheck.step(stepIndex + 1, STEPS.length)}</p>
      </header>

      <hr className="rule" />

      {step === 'activity' && (
        <div className="card stack">
          <div>
            <label className="label" htmlFor="activity-input">
              {t.symptomCheck.activityLabel}
            </label>
            <input
              id="activity-input"
              className="field"
              type="text"
              placeholder={t.symptomCheck.activityPlaceholder}
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
          t={t}
          title={t.symptomCheck.before}
          values={symptomsBefore}
          onChange={setSymptomsBefore}
        />
      )}

      {step === 'after' && (
        <>
          <SymptomSliders
            t={t}
            title={t.symptomCheck.after}
            values={symptomsAfter}
            onChange={setSymptomsAfter}
          />

          <div className="card stack-sm">
            <label className="label" htmlFor="activity-note">
              {t.symptomCheck.noteLabel}
            </label>
            <input
              id="activity-note"
              className="field"
              type="text"
              placeholder={t.symptomCheck.notePlaceholder}
              value={note}
              onChange={(event) => setNote(event.target.value)}
            />
            <p className="fine" style={{ margin: 0 }}>
              {t.symptomCheck.noteHelp}
            </p>
          </div>
        </>
      )}

      <div className="stack-sm">
        <button type="button" className="button button-full" onClick={goNext}>
          {step === 'after' ? t.symptomCheck.save : t.symptomCheck.continue}
        </button>
        <button type="button" className="button button-quiet button-full" onClick={goBack}>
          {step === 'activity' ? t.symptomCheck.cancel : t.symptomCheck.back}
        </button>
      </div>
    </div>
  );
}

function SymptomSliders({ t, title, values, onChange }) {
  function setSymptom(key, value) {
    onChange({ ...values, [key]: clampScore(value) });
  }

  return (
    <div className="card stack">
      <h3>{title}</h3>
      <p className="fine" style={{ marginTop: '-0.5rem' }}>
        {t.symptomCheck.scaleHelp}
      </p>
      <div className="scale-anchors">
        {t.symptomCheck.scaleAnchors.map((anchor) => (
          <span key={anchor}>{anchor}</span>
        ))}
      </div>
      <p className="fine" style={{ marginTop: 0 }}>
        {t.symptomCheck.scaleGuide}
      </p>
      <div className="stack">
        {SYMPTOMS.map((symptom) => (
          <div key={symptom.key}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label className="label" htmlFor={`${symptom.key}-slider`} style={{ marginBottom: 0 }}>
                {t.symptoms[symptom.key]}
              </label>
              <span className="muted" style={{ fontVariantNumeric: 'tabular-nums' }}>
                {values[symptom.key]}
                <span className="fine" style={{ marginLeft: '0.5rem' }}>
                  {t.symptomCheck.scaleValue(values[symptom.key])}
                </span>
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
