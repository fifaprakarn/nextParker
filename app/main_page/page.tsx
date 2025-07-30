import React from "react";
import { useRegisterStore } from "../utils/registerStore";

export default function MainPage() {
  const language = useRegisterStore((s) => s.language);
  const langDict = {
    th: { welcome: "สวัสดี นี่คือหน้าหลัก!" },
    en: { welcome: "Hello, this is the main page!" }
  };
  const t = langDict[language] || langDict.th;

  return (
    <div>
      <h1>{t.welcome}</h1>
    </div>
  );
}