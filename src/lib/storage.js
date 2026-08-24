// The only module that touches localStorage. Screens never read or write
// storage directly — they call these functions.
//
// Recovery logs stay on this device. Rebound has no account and no server.

const KEY = 'rebound:v1';

export function createEmptyState() {
  return {
    version: 1,
    language: 'en',
    recoveryStartDate: null,
    currentStage: 1,
    onboardingAcknowledged: false,
    contactClearanceConfirmed: false,
    activityLogs: [],
    stageChanges: [],
  };
}

export function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return createEmptyState();
    const parsed = JSON.parse(raw);
    return { ...createEmptyState(), ...parsed };
  } catch {
    // Corrupt or unreadable storage should not blank the screen.
    return createEmptyState();
  }
}

export function save(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
    return true;
  } catch {
    // Quota exceeded or storage disabled. The caller decides what to tell
    // the person; this module does not guess.
    return false;
  }
}

export function clearAll() {
  try {
    localStorage.removeItem(KEY);
    return true;
  } catch {
    return false;
  }
}

export function isStorageAvailable() {
  try {
    const probe = '__rebound_probe__';
    localStorage.setItem(probe, '1');
    localStorage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}
