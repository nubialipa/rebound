// Interface language.
//
// The safety boundary of this product lives in its wording. Every string that
// describes what Rebound does must survive translation without turning the app
// into something that decides. "Records" must never become "determines".

export const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'id', label: 'ID' },
];

const en = {
  wordmark: 'Rebound',
  tagline: 'Track what you feel. Bring it to the conversation.',

  onboarding: {
    headline: ['Track what you feel.', 'Bring it to the conversation.'],
    lede: 'Record your activity and symptoms before and after — so you have a clearer record to discuss with your healthcare professional.',
    disclaimer:
      'It does not diagnose, treat, or decide when it is safe to return to activity. Those decisions stay with you and your healthcare professional.',
    stagesTitle: 'The six stages',
    stagesBody: 'Rebound follows the graduated return-to-sport strategy published by the',
    stagesBoundary:
      'Rebound records your progress. It does not determine when you should progress.',
    sourceLink: '6-step return to play',
    storageTitle: 'Storage is unavailable',
    storageBody:
      'This browser is blocking local storage, so nothing you enter will be saved. Private browsing is the usual cause. You can still look around.',
    dateLabel: 'When did your recovery start?',
    dateHelp:
      'Used to count the days in your record. Days are tracked, not used to determine progression.',
    consent:
      'I understand Rebound is a self-tracking tool and does not provide medical clearance.',
    start: 'Start my record',
    privacy:
      'Your recovery logs stay on this device. Rebound has no account and does not upload your recovery data to a server.',
    errorDate: 'Choose the date your recovery started.',
    errorFuture: 'That date is in the future. Choose today or an earlier date.',
    errorConsent: 'Read and confirm the note above before starting.',
  },

  today: {
    stageOf: (n) => `Stage ${n} of 6`,
    examples: 'Examples',
    logActivity: "Log today's activity",
    recoveryDay: (n) =>
      `Recovery day ${n}. Days are tracked, not used to determine progression.`,
    lastLogged: 'Last logged',
    noneYet: 'Nothing logged yet. Your first entry starts the record.',
    noChange: 'No symptom scores changed after this activity.',
    symptomChange: 'Symptom change',
    changeStage: 'Change stage',
    viewLog: 'View activity log',
    viewJourney: 'View recovery journey',
    viewSummary: 'Doctor conversation summary',
  },

  symptomCheck: {
    step: (a, b) => `Step ${a} of ${b}`,
    activityLabel: 'What did you do today?',
    activityPlaceholder: 'e.g. 15 min walking',
    errorActivity: 'Describe what you did, even briefly.',
    before: 'Before this activity',
    after: 'After this activity',
    scaleHelp: '0 is none, 10 is the most severe you can imagine.',
    continue: 'Continue',
    save: 'Save log',
    cancel: 'Cancel',
    back: 'Back',
  },

  stageChange: {
    title: 'Change stage',
    intro: (n, name) =>
      `You are recording Stage ${n} — ${name}. Moving between stages is your decision, made with your healthcare professional. Rebound only records the change.`,
    interval: (hours, min) =>
      `${hours} hours since your last stage change. Published guidance describes a minimum of ${min} hours between steps.`,
    moveTo: 'Move to Stage',
    moveBack: 'Move back to Stage',
    backNote:
      'Published guidance describes returning to an earlier step if symptoms come back. Moving back is a normal part of recovery, not a failure.',
    riskTitle: 'This stage involves risk of head impact',
    riskBody:
      'Published guidance describes stages 4 and above as requiring clearance from a healthcare professional. Rebound cannot verify this — it records what you confirm.',
    riskConsent: 'I have clearance from my healthcare professional.',
    noteLabel: 'Note (optional)',
    notePlaceholder: 'e.g. symptoms returned',
    boundary:
      'Recording this does not determine medical clearance. Continue only according to guidance from your healthcare professional.',
    errorClearance: 'Confirm you have clearance before recording this stage.',
    confirm: 'Record move to Stage',
    chooseOther: 'Choose a different stage',
    cancel: 'Cancel',
  },

  activityLog: {
    title: 'Activity log',
    intro:
      'A record of what you logged, most recent first. This is a record — it is not an assessment of your recovery.',
    empty: 'Nothing logged yet.',
    noChange: 'No symptom scores changed after this activity.',
    movedTo: 'Moved to Stage',
    movedBack: 'Moved back to Stage',
    from: 'From Stage',
    back: 'Back to today',
  },

  journey: {
    title: 'Recovery journey',
    status: { current: 'Current', logged: 'Logged', 'not-started': 'Not started' },
    needsClearance: 'Requires clearance from your healthcare professional.',
    footer: 'Your timeline reflects your logs — not medical clearance.',
    back: 'Back to today',
  },

  summary: {
    title: 'Doctor conversation summary',
    intro:
      'A record of what you logged, formatted to bring into a conversation with your healthcare professional. It contains no assessment — only what you recorded.',
    recoveryDay: 'Recovery day',
    currentStage: 'Current stage',
    of6: 'of 6',
    framework: 'Framework',
    activityAtStage: 'Activity at this stage',
    noActivity: 'No activity recorded at this stage yet.',
    recentActivity: 'Most recent activity — Stage',
    scaleNote: 'scale 0–10, before → after.',
    questionsTitle: 'Questions to discuss',
    questions: [
      'How should I progress activity from here?',
      'When should I stop an activity?',
      'Which symptoms should I monitor most closely?',
    ],
    copy: 'Copy summary',
    copied: 'Copied',
    copyFailed: 'Could not copy — select the text manually',
    back: 'Back to today',
    plainHeading: 'CONCUSSION RECOVERY SUMMARY',
    plainActivityHeading: 'ACTIVITY AT THIS STAGE',
    plainRecentHeading: 'MOST RECENT ACTIVITY — STAGE',
    plainScaleLine: 'Symptom scores, scale 0–10, before → after',
    plainChanged: 'Changed',
    plainNoChange: 'No symptom scores changed after this activity.',
    plainQuestions: 'QUESTIONS TO DISCUSS',
    plainFooter: [
      'Recorded with Rebound, a self-tracking tool. This summary is a record of',
      'self-reported observations. It is not a clinical assessment.',
    ],
  },

  stages: {
    1: {
      name: 'Back to regular activities',
      description: 'Daily activities such as school or work.',
      examples: ['Household activity', 'Return to school or work'],
    },
    2: {
      name: 'Light aerobic activity',
      description: 'Gentle movement to raise your heart rate.',
      examples: ['Walking', 'Easy stationary cycling'],
    },
    3: {
      name: 'Moderate activity',
      description: 'Movement with more head and body motion.',
      examples: ['Moderate jogging', 'Brief running', 'Lighter weightlifting'],
    },
    4: {
      name: 'Heavy non-contact activity',
      description: 'Full-intensity training without contact.',
      examples: ['Sprinting', 'High-intensity cycling', 'Regular weightlifting'],
    },
    5: {
      name: 'Full contact practice',
      description: 'Normal training activities including contact.',
      examples: ['Regular team practice'],
    },
    6: {
      name: 'Return to play',
      description: 'Normal game play.',
      examples: ['Competition'],
    },
  },

  symptoms: {
    headache: 'Headache',
    dizziness: 'Dizziness',
    nausea: 'Nausea',
    lightSensitivity: 'Light sensitivity',
    fatigue: 'Fatigue',
    brainFog: 'Brain fog',
  },
};

const id = {
  wordmark: 'Rebound',
  tagline: 'Catat apa yang Anda rasakan. Bawa ke ruang konsultasi.',

  onboarding: {
    headline: ['Catat apa yang Anda rasakan.', 'Bawa ke ruang konsultasi.'],
    lede: 'Catat aktivitas dan gejala Anda sebelum dan sesudah — supaya Anda punya catatan yang lebih jelas untuk didiskusikan dengan tenaga kesehatan.',
    disclaimer:
      'Rebound tidak mendiagnosis, tidak mengobati, dan tidak menentukan kapan Anda aman kembali beraktivitas. Keputusan itu tetap milik Anda dan tenaga kesehatan Anda.',
    stagesTitle: 'Enam tahap',
    stagesBody: 'Rebound mengikuti strategi kembali beraktivitas bertahap yang diterbitkan',
    stagesBoundary:
      'Rebound mencatat perkembangan Anda. Rebound tidak menentukan kapan Anda boleh melanjutkan.',
    sourceLink: 'panduan 6 langkah kembali beraktivitas',
    storageTitle: 'Penyimpanan tidak tersedia',
    storageBody:
      'Peramban ini memblokir penyimpanan lokal, jadi apa pun yang Anda isi tidak akan tersimpan. Biasanya ini terjadi pada mode penyamaran. Anda tetap bisa melihat-lihat.',
    dateLabel: 'Kapan pemulihan Anda dimulai?',
    dateHelp:
      'Dipakai untuk menghitung hari dalam catatan Anda. Hari dicatat, bukan dipakai untuk menentukan tahap.',
    consent:
      'Saya paham Rebound adalah alat pencatatan mandiri dan tidak memberikan izin medis.',
    start: 'Mulai catatan saya',
    privacy:
      'Catatan pemulihan Anda tersimpan di perangkat ini. Rebound tidak memakai akun dan tidak mengunggah data pemulihan Anda ke server.',
    errorDate: 'Pilih tanggal saat pemulihan Anda dimulai.',
    errorFuture: 'Tanggal itu di masa depan. Pilih hari ini atau tanggal sebelumnya.',
    errorConsent: 'Baca dan setujui catatan di atas sebelum memulai.',
  },

  today: {
    stageOf: (n) => `Tahap ${n} dari 6`,
    examples: 'Contoh',
    logActivity: 'Catat aktivitas hari ini',
    recoveryDay: (n) =>
      `Hari pemulihan ke-${n}. Hari dicatat, bukan dipakai untuk menentukan tahap.`,
    lastLogged: 'Catatan terakhir',
    noneYet: 'Belum ada catatan. Entri pertama Anda memulai rekamannya.',
    noChange: 'Tidak ada skor gejala yang berubah setelah aktivitas ini.',
    symptomChange: 'Perubahan gejala',
    changeStage: 'Ubah tahap',
    viewLog: 'Lihat catatan aktivitas',
    viewJourney: 'Lihat perjalanan pemulihan',
    viewSummary: 'Ringkasan untuk dokter',
  },

  symptomCheck: {
    step: (a, b) => `Langkah ${a} dari ${b}`,
    activityLabel: 'Apa yang Anda lakukan hari ini?',
    activityPlaceholder: 'mis. jalan kaki 15 menit',
    errorActivity: 'Tuliskan apa yang Anda lakukan, singkat pun tidak apa-apa.',
    before: 'Sebelum aktivitas ini',
    after: 'Sesudah aktivitas ini',
    scaleHelp: '0 berarti tidak ada, 10 berarti separah yang bisa Anda bayangkan.',
    continue: 'Lanjut',
    save: 'Simpan catatan',
    cancel: 'Batal',
    back: 'Kembali',
  },

  stageChange: {
    title: 'Ubah tahap',
    intro: (n, name) =>
      `Anda sedang mencatat Tahap ${n} — ${name}. Perpindahan antar tahap adalah keputusan Anda bersama tenaga kesehatan Anda. Rebound hanya mencatat perubahannya.`,
    interval: (hours, min) =>
      `${hours} jam sejak perpindahan tahap terakhir Anda. Panduan yang diterbitkan menyebut jarak minimal ${min} jam antar langkah.`,
    moveTo: 'Pindah ke Tahap',
    moveBack: 'Kembali ke Tahap',
    backNote:
      'Panduan yang diterbitkan menyebut kembali ke langkah sebelumnya jika gejala muncul lagi. Mundur satu tahap adalah bagian normal dari pemulihan, bukan kegagalan.',
    riskTitle: 'Tahap ini melibatkan risiko benturan kepala',
    riskBody:
      'Panduan yang diterbitkan menyebut tahap 4 ke atas memerlukan izin dari tenaga kesehatan. Rebound tidak bisa memverifikasi ini — Rebound mencatat apa yang Anda konfirmasi.',
    riskConsent: 'Saya sudah mendapat izin dari tenaga kesehatan saya.',
    noteLabel: 'Catatan (opsional)',
    notePlaceholder: 'mis. gejala muncul lagi',
    boundary:
      'Mencatat ini bukan berarti Anda mendapat izin medis. Lanjutkan hanya sesuai arahan tenaga kesehatan Anda.',
    errorClearance: 'Konfirmasi bahwa Anda sudah punya izin sebelum mencatat tahap ini.',
    confirm: 'Catat perpindahan ke Tahap',
    chooseOther: 'Pilih tahap lain',
    cancel: 'Batal',
  },

  activityLog: {
    title: 'Catatan aktivitas',
    intro:
      'Rekaman apa yang Anda catat, terbaru di atas. Ini adalah catatan — bukan penilaian atas pemulihan Anda.',
    empty: 'Belum ada catatan.',
    noChange: 'Tidak ada skor gejala yang berubah setelah aktivitas ini.',
    movedTo: 'Pindah ke Tahap',
    movedBack: 'Kembali ke Tahap',
    from: 'Dari Tahap',
    back: 'Kembali ke hari ini',
  },

  journey: {
    title: 'Perjalanan pemulihan',
    status: { current: 'Saat ini', logged: 'Tercatat', 'not-started': 'Belum dimulai' },
    needsClearance: 'Memerlukan izin dari tenaga kesehatan Anda.',
    footer: 'Lini masa ini mencerminkan catatan Anda — bukan izin medis.',
    back: 'Kembali ke hari ini',
  },

  summary: {
    title: 'Ringkasan untuk dokter',
    intro:
      'Rekaman apa yang Anda catat, disusun untuk dibawa ke percakapan dengan tenaga kesehatan Anda. Tidak berisi penilaian — hanya apa yang Anda catat.',
    recoveryDay: 'Hari pemulihan ke',
    currentStage: 'Tahap saat ini',
    of6: 'dari 6',
    framework: 'Acuan',
    activityAtStage: 'Aktivitas pada tahap ini',
    noActivity: 'Belum ada aktivitas yang dicatat pada tahap ini.',
    recentActivity: 'Aktivitas terakhir — Tahap',
    scaleNote: 'skala 0–10, sebelum → sesudah.',
    questionsTitle: 'Pertanyaan untuk didiskusikan',
    questions: [
      'Bagaimana sebaiknya saya melanjutkan aktivitas dari sini?',
      'Kapan saya harus menghentikan suatu aktivitas?',
      'Gejala mana yang paling perlu saya perhatikan?',
    ],
    copy: 'Salin ringkasan',
    copied: 'Tersalin',
    copyFailed: 'Gagal menyalin — pilih teksnya secara manual',
    back: 'Kembali ke hari ini',
    plainHeading: 'RINGKASAN PEMULIHAN GEGAR OTAK',
    plainActivityHeading: 'AKTIVITAS PADA TAHAP INI',
    plainRecentHeading: 'AKTIVITAS TERAKHIR — TAHAP',
    plainScaleLine: 'Skor gejala, skala 0–10, sebelum → sesudah',
    plainChanged: 'Berubah',
    plainNoChange: 'Tidak ada skor gejala yang berubah setelah aktivitas ini.',
    plainQuestions: 'PERTANYAAN UNTUK DIDISKUSIKAN',
    plainFooter: [
      'Dicatat dengan Rebound, alat pencatatan mandiri. Ringkasan ini adalah rekaman',
      'observasi yang dilaporkan sendiri, bukan penilaian klinis.',
    ],
  },

  stages: {
    1: {
      name: 'Kembali ke aktivitas harian',
      description: 'Aktivitas sehari-hari seperti sekolah atau bekerja.',
      examples: ['Aktivitas rumah tangga', 'Kembali sekolah atau bekerja'],
    },
    2: {
      name: 'Aktivitas aerobik ringan',
      description: 'Gerakan ringan untuk menaikkan detak jantung.',
      examples: ['Jalan kaki', 'Sepeda statis santai'],
    },
    3: {
      name: 'Aktivitas sedang',
      description: 'Gerakan dengan lebih banyak gerak kepala dan badan.',
      examples: ['Jogging sedang', 'Lari singkat', 'Angkat beban ringan'],
    },
    4: {
      name: 'Aktivitas berat tanpa kontak',
      description: 'Latihan intensitas penuh tanpa kontak fisik.',
      examples: ['Lari cepat', 'Sepeda intensitas tinggi', 'Angkat beban seperti biasa'],
    },
    5: {
      name: 'Latihan kontak penuh',
      description: 'Latihan normal termasuk kontak fisik.',
      examples: ['Latihan tim seperti biasa'],
    },
    6: {
      name: 'Kembali bertanding',
      description: 'Pertandingan normal.',
      examples: ['Kompetisi'],
    },
  },

  symptoms: {
    headache: 'Sakit kepala',
    dizziness: 'Pusing',
    nausea: 'Mual',
    lightSensitivity: 'Sensitif terhadap cahaya',
    fatigue: 'Kelelahan',
    brainFog: 'Sulit berpikir jernih',
  },
};

const DICTIONARIES = { en, id };

export function getDictionary(language) {
  return DICTIONARIES[language] ?? en;
}
