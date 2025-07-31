
import React from "react";
import { useRegisterStore } from "../utils/registerStore";
import { text } from "../locales/text";

export default function MainPage() {
  const language = useRegisterStore((s) => s.language);
  const t = text[language]?.main || text.th.main;

  return (
    <div>
      <h1>{t.welcome}</h1>
    </div>
  );
}