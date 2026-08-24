import { useState } from 'react';
import { load, save, isStorageAvailable } from './lib/storage.js';
import { createActivityLog } from './lib/recovery.js';
import Onboarding from './screens/Onboarding.jsx';
import Today from './screens/Today.jsx';
import SymptomCheck from './screens/SymptomCheck.jsx';

const storageAvailable = isStorageAvailable();

export default function App() {
  const [state, setState] = useState(load);
  const [screen, setScreen] = useState('today');

  function update(changes) {
    setState((current) => {
      const next = typeof changes === 'function' ? changes(current) : { ...current, ...changes };
      save(next);
      return next;
    });
  }

  function handleStart({ startDate }) {
    update({
      recoveryStartDate: startDate,
      onboardingAcknowledged: true,
      currentStage: 1,
    });
  }

  function handleSaveLog({ activity, symptomsBefore, symptomsAfter }) {
    const log = createActivityLog({
      stage: state.currentStage,
      activity,
      symptomsBefore,
      symptomsAfter,
    });
    update((current) => ({
      ...current,
      activityLogs: [...current.activityLogs, log],
    }));
    setScreen('today');
  }

  if (!state.onboardingAcknowledged) {
    return (
      <main className="shell">
        <Onboarding onStart={handleStart} storageAvailable={storageAvailable} />
      </main>
    );
  }

  return (
    <main className="shell">
      {screen === 'today' && (
        <Today
          state={state}
          onLogActivity={() => setScreen('log')}
          onOpenJourney={() => setScreen('journey')}
          onOpenSummary={() => setScreen('summary')}
        />
      )}

      {screen === 'log' && (
        <SymptomCheck onComplete={handleSaveLog} onCancel={() => setScreen('today')} />
      )}

      {screen === 'journey' && <Placeholder title="Recovery journey" onBack={() => setScreen('today')} />}

      {screen === 'summary' && <Placeholder title="Doctor conversation summary" onBack={() => setScreen('today')} />}
    </main>
  );
}

// Temporary stand-in for the two screens landing next.
function Placeholder({ title, onBack }) {
  return (
    <div className="stack-lg">
      <header className="stack-sm">
        <p className="wordmark">Rebound</p>
        <p className="tagline">{title}</p>
      </header>
      <hr className="rule" />
      <p className="muted">Coming next.</p>
      <button type="button" className="button button-quiet" onClick={onBack}>
        Back to today
      </button>
    </div>
  );
}
