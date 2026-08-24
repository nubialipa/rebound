import { getTimeline } from '../lib/recovery.js';
import { listChangedSymptoms, formatDelta } from '../lib/symptoms.js';

export default function ActivityLog({ state, t, onBack }) {
  const timeline = getTimeline(state);

  return (
    <div className="stack-lg">
      <header className="stack-sm">
        <p className="wordmark">{t.wordmark}</p>
        <p className="tagline">{t.activityLog.title}</p>
      </header>

      <hr className="rule" />

      <p className="muted">{t.activityLog.intro}</p>

      {timeline.length === 0 ? (
        <p className="muted">{t.activityLog.empty}</p>
      ) : (
        <div className="card">
          {timeline.map((entry) =>
            entry.type === 'activity' ? (
              <ActivityEntry key={entry.id} entry={entry} t={t} />
            ) : (
              <StageChangeEntry key={entry.id} entry={entry} t={t} />
            ),
          )}
        </div>
      )}

      <button type="button" className="button button-quiet" onClick={onBack}>
        {t.activityLog.back}
      </button>
    </div>
  );
}

function ActivityEntry({ entry, t }) {
  const stage = t.stages[entry.stage];
  const changed = listChangedSymptoms(entry.symptomChanges);

  return (
    <div className="timeline-item stack-sm">
      <div>
        <p style={{ margin: 0 }}>
          {entry.date} · {t.today.stageOf(entry.stage).split(' ').slice(0, 2).join(' ')} — {stage?.name}
        </p>
        <p className="muted" style={{ margin: 0 }}>
          {entry.activity}
        </p>
      </div>

      {entry.note ? (
        <p className="fine" style={{ margin: 0, fontStyle: 'italic' }}>
          {t.activityLog.note}: {entry.note}
        </p>
      ) : null}

      {changed.length === 0 ? (
        <p className="fine" style={{ margin: 0 }}>
          {t.activityLog.noChange}
        </p>
      ) : (
        <div className="symptom-delta-list">
          {changed.map((item) => (
            <p key={item.key} className="fine" style={{ margin: 0 }}>
              {t.symptoms[item.key]} {formatDelta(item.delta)}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

function StageChangeEntry({ entry, t }) {
  const fromStage = t.stages[entry.from];
  const toStage = t.stages[entry.to];
  const verb = entry.direction === 'forward' ? t.activityLog.movedTo : t.activityLog.movedBack;

  return (
    <div className="timeline-item">
      <p style={{ margin: 0 }}>
        {entry.date} · {verb} {entry.to} — {toStage?.name}
      </p>
      <p className="fine" style={{ margin: 0 }}>
        {t.activityLog.from} {entry.from} — {fromStage?.name}
        {entry.note ? ` · ${entry.note}` : ''}
      </p>
    </div>
  );
}
