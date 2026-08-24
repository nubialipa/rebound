import { useState } from 'react';
import { load, save, isStorageAvailable } from './lib/storage.js';
import { createActivityLog, createStageChange } from './lib/recovery.js';
import { stageHasHeadImpactRisk } from './data/stages.js';
import { getDictionary } from './lib/i18n.js';
import { createSampleState } from './data/sampleRecovery.js';
import Onboarding from './screens/Onboarding.jsx';
import Today from './screens/Today.jsx';
import SymptomCheck from './screens/SymptomCheck.jsx';
import StageChange from './screens/StageChange.jsx';
import ActivityLog from './screens/ActivityLog.jsx';
import RecoveryJourney from './screens/RecoveryJourney.jsx';
import DoctorSummary from './screens/DoctorSummary.jsx';

const storageAvailable = isStorageAvailable();

export default function App() {
  const [state, setState] = useState(load);
  const [screen, setScreen] = useState('today');

  const language = state.language ?? 'en';
  const t = getDictionary(language);

  function update(changes) {
    setState((current) => {
      const next = typeof changes === 'function' ? changes(current) : { ...current, ...changes };
      // Sample data is never written to storage, so exploring it cannot
      // overwrite someone's real record.
      if (!next.isSample) save(next);
      return next;
    });
  }

  function enterSample() {
    setState({ ...createSampleState(), language });
    setScreen('today');
  }

  function exitSample() {
    setState(load());
    setScreen('today');
  }

  function handleLanguageChange(code) {
    update({ language: code });
  }

  function handleStart({ startDate }) {
    update({
      recoveryStartDate: startDate,
      onboardingAcknowledged: true,
      currentStage: 1,
    });
  }

  function handleSaveLog({ activity, symptomsBefore, symptomsAfter, note }) {
    const log = createActivityLog({
      stage: state.currentStage,
      activity,
      symptomsBefore,
      symptomsAfter,
      note,
    });
    update((current) => ({
      ...current,
      activityLogs: [...current.activityLogs, log],
    }));
    setScreen('today');
  }

  function handleStageChange({ from, to, note }) {
    const change = createStageChange({ from, to, note });
    update((current) => ({
      ...current,
      currentStage: to,
      contactClearanceConfirmed: stageHasHeadImpactRisk(to)
        ? true
        : current.contactClearanceConfirmed,
      stageChanges: [...current.stageChanges, change],
    }));
    setScreen('today');
  }

  const goToday = () => setScreen('today');

  if (!state.onboardingAcknowledged) {
    return (
      <main className="shell">
        <Onboarding
          t={t}
          language={language}
          onLanguageChange={handleLanguageChange}
          onStart={handleStart}
          onExploreSample={enterSample}
          storageAvailable={storageAvailable}
        />
      </main>
    );
  }

  return (
    <main className="shell">
      {state.isSample && (
        <div className="sample-banner">
          <span>{t.sample.banner}</span>
          <button type="button" className="sample-exit" onClick={exitSample}>
            {t.sample.exit}
          </button>
        </div>
      )}

      {screen === 'today' && (
        <Today
          state={state}
          t={t}
          language={language}
          onLanguageChange={handleLanguageChange}
          onLogActivity={() => setScreen('log')}
          onChangeStage={() => setScreen('stage')}
          onOpenActivityLog={() => setScreen('activityLog')}
          onOpenJourney={() => setScreen('journey')}
          onOpenSummary={() => setScreen('summary')}
        />
      )}

      {screen === 'log' && <SymptomCheck t={t} onComplete={handleSaveLog} onCancel={goToday} />}

      {screen === 'stage' && (
        <StageChange state={state} t={t} onConfirm={handleStageChange} onCancel={goToday} />
      )}

      {screen === 'activityLog' && <ActivityLog state={state} t={t} onBack={goToday} />}

      {screen === 'journey' && <RecoveryJourney state={state} t={t} onBack={goToday} />}

      {screen === 'summary' && (
        <DoctorSummary state={state} t={t} language={language} onBack={goToday} />
      )}
    </main>
  );
}
