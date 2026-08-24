import { getTimeline } from '../lib/recovery.js';
import { getStage } from '../data/stages.js';
import { listChangedSymptoms, formatDelta } from '../lib/symptoms.js';

export default function ActivityLog({ state, onBack }) {
  const timeline = getTimeline(state);

  return (
    <div className="stack-lg">
      <header className="stack-sm">
        <p className="wordmark">Rebound</p>
        <p className="tagline">Activity log</p>
      </header>

      <hr className="rule" />

      <p className="muted">
        A record of what you logged, most recent first. This is a record — it is not an
        assessment of your recovery.
      </p>

      {timeline.length === 0 ? (
        <p className="muted">Nothing logged yet.</p>
      ) : (
        <div className="card">
          {timeline.map((entry) =>
            entry.type === 'activity' ? (
              <ActivityEntry key={entry.id} entry={entry} />
            ) : (
              <StageChangeEntry key={entry.id} entry={entry} />
            ),
          )}
        </div>
      )}

      <button type="button" className="button button-quiet" onClick={onBack}>
        Back to today
      </button>
    </div>
  );
}

function ActivityEntry({ entry }) {
  const stage = getStage(entry.stage);
  const changed = listChangedSymptoms(entry.symptomChanges);

  return (
    <div className="timeline-item stack-sm">
      <div>
        <p style={{ margin: 0 }}>
          {entry.date} · Stage {entry.stage} — {stage?.name}
        </p>
        <p className="muted" style={{ margin: 0 }}>
          {entry.activity}
        </p>
      </div>

      {changed.length === 0 ? (
        <p className="fine" style={{ margin: 0 }}>
          No symptom scores changed after this activity.
        </p>
      ) : (
        <div className="symptom-delta-list">
          {changed.map((item) => (
            <p key={item.key} className="fine" style={{ margin: 0 }}>
              {item.label} {formatDelta(item.delta)}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

function StageChangeEntry({ entry }) {
  const fromStage = getStage(entry.from);
  const toStage = getStage(entry.to);
  const verb = entry.direction === 'forward' ? 'Moved to' : 'Moved back to';

  return (
    <div className="timeline-item">
      <p style={{ margin: 0 }}>
        {entry.date} · {verb} Stage {entry.to} — {toStage?.name}
      </p>
      <p className="fine" style={{ margin: 0 }}>
        From Stage {entry.from} — {fromStage?.name}
        {entry.note ? ` · ${entry.note}` : ''}
      </p>
    </div>
  );
}
