// Six-step graduated return-to-sport strategy.
// Source: Concussion in Sport Group, 6th Consensus Statement (Amsterdam 2022),
// published in BJSM June 2023. Public version: CDC HEADS UP return-to-play progression.
//
// Rebound records a person's own progress against this published framework.
// It does not decide when a person moves between stages.

export const FRAMEWORK = {
  name: 'CISG Amsterdam 2022 Consensus Statement',
  publicSource: 'CDC HEADS UP',
  publicUrl: 'https://www.cdc.gov/heads-up/guidelines/returning-to-sports.html',
};

// Published guidance describes a minimum interval between steps. Rebound shows
// this as context on a record. It never gates a button on it.
export const MINIMUM_INTERVAL_HOURS = 24;

// Published guidance describes mild, brief symptom exacerbation during early
// activity as potentially tolerable within stated limits. Rebound surfaces this
// as sourced reading material next to a record. It is not a threshold the app
// evaluates a person against.
export const GUIDANCE_NOTE_THRESHOLD = 2;

// Stages 4 and above involve activity with risk of head impact. Published
// guidance describes these as requiring clearance from a healthcare
// professional. Rebound asks the person to confirm this themselves; it cannot
// and does not verify it.
export const FIRST_CONTACT_RISK_STAGE = 4;

export const STAGES = [
  {
    number: 1,
    name: 'Back to regular activities',
    description: 'Daily activities such as school or work.',
    examples: ['Household activity', 'Return to school or work'],
  },
  {
    number: 2,
    name: 'Light aerobic activity',
    description: 'Gentle movement to raise your heart rate.',
    examples: ['Walking', 'Easy stationary cycling'],
  },
  {
    number: 3,
    name: 'Moderate activity',
    description: 'Movement with more head and body motion.',
    examples: ['Moderate jogging', 'Brief running', 'Lighter weightlifting'],
  },
  {
    number: 4,
    name: 'Heavy non-contact activity',
    description: 'Full-intensity training without contact.',
    examples: ['Sprinting', 'High-intensity cycling', 'Regular weightlifting'],
    hasHeadImpactRisk: true,
  },
  {
    number: 5,
    name: 'Full contact practice',
    description: 'Normal training activities including contact.',
    examples: ['Regular team practice'],
    hasHeadImpactRisk: true,
  },
  {
    number: 6,
    name: 'Return to play',
    description: 'Normal game play.',
    examples: ['Competition'],
    hasHeadImpactRisk: true,
  },
];

export const SYMPTOMS = [
  { key: 'headache', label: 'Headache' },
  { key: 'dizziness', label: 'Dizziness' },
  { key: 'nausea', label: 'Nausea' },
  { key: 'lightSensitivity', label: 'Light sensitivity' },
  { key: 'fatigue', label: 'Fatigue' },
  { key: 'brainFog', label: 'Brain fog' },
];

export const SYMPTOM_SCALE = { min: 0, max: 10 };

export function getStage(number) {
  return STAGES.find((stage) => stage.number === number) ?? null;
}

export function stageHasHeadImpactRisk(number) {
  return number >= FIRST_CONTACT_RISK_STAGE;
}
