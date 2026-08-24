import { LANGUAGES } from '../lib/i18n.js';

export default function LanguageToggle({ language, onChange }) {
  return (
    <div className="lang-toggle" role="group" aria-label="Interface language">
      {LANGUAGES.map((item) => (
        <button
          key={item.code}
          type="button"
          className={`lang-option${item.code === language ? ' is-active' : ''}`}
          aria-pressed={item.code === language}
          onClick={() => onChange(item.code)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
