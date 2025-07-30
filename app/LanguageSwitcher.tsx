// A global language switcher for the app, using zustand store
"use client";
import { useRegisterStore } from "./utils/registerStore";

export default function LanguageSwitcher() {
  const language = useRegisterStore((s) => s.language);
  const setLanguage = useRegisterStore((s) => s.setLanguage);
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">🌐</span>
      <select
        className="border border-gray-300 rounded px-2 py-1 text-sm"
        value={language}
        onChange={e => setLanguage(e.target.value as 'th' | 'en')}
        aria-label="Language switcher"
      >
        <option value="th">ไทย</option>
        <option value="en">English</option>
      </select>
    </div>
  );
}
