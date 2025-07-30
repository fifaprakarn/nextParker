"use client";
import Image from "next/image";
import { useEffect } from "react";
import { useAppRouter } from "../router";
import { useRegisterStore } from "../utils/registerStore";
import { text } from "../locales/text";
import type { RegisUser } from "../types";

export default function RegisterPage() {
  const {
    username, setUsername,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    error, setError,
    regisUserData, setRegisUserData,
  } = useRegisterStore();
  const router = useAppRouter();
  const language = useRegisterStore((s) => s.language);
  const t = text[language].regis;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const regisUserStr = localStorage.getItem("regis_user_list");
      if (regisUserStr) {
        setRegisUserData(JSON.parse(regisUserStr));
        console.log("regis_user_list from localStorage (on page load):", regisUserStr);
      } else {
        setRegisUserData([]);
        console.log("regis_user_list from localStorage (on page load): ไม่มีข้อมูล");
      }
    }
  }, [setRegisUserData]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      setError(t.fillAll);
      return;
    }
    if (password !== confirmPassword) {
      setError(t.passwordMismatch);
      return;
    }
    if (typeof window !== "undefined") {
      const regisUserStr = localStorage.getItem("regis_user_list");
      const regisUserList = regisUserStr ? JSON.parse(regisUserStr) : [];
      if (regisUserList.some((u: RegisUser) => u.username === username)) {
        setError(t.usernameUsed);
        return;
      }
      if (regisUserList.some((u: RegisUser) => u.email === email)) {
        setError(t.emailUsed);
        return;
      }
      regisUserList.push({ username, email, password });
      localStorage.setItem("regis_user_list", JSON.stringify(regisUserList));
      setRegisUserData(regisUserList);
      console.log("Registration successful, user data saved:", regisUserList);
    }
    setError("");
    router.goToHome();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f6e7c1] px-2 py-8">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-8 sm:p-12 flex flex-col items-center">
        <Image
          src="/login_icon.svg"
          alt="Register Icon"
          width={120}
          height={120}
          className="mb-8"
        />
        <div className="flex w-full justify-end mb-2">
          {/* Remove local language switcher UI, now global */}
        </div>
        <h2 className="text-2xl font-extrabold mb-6 text-orange-500 text-center tracking-tight">
          {t.register}
        </h2>
        <div className="mb-4 w-full">
          <h3 className="text-md font-semibold text-gray-700 mb-1">{t.regisList}</h3>
          <pre className="bg-gray-100 rounded p-2 text-xs text-gray-700 overflow-x-auto">{regisUserData.length > 0 ? JSON.stringify(regisUserData, null, 2) : t.noData}</pre>
        </div>
        <form className="w-full flex flex-col gap-6" onSubmit={handleRegister}>
          <input
            className="border-0 border-b border-gray-300 focus:border-orange-400 focus:ring-0 bg-transparent placeholder-gray-400 text-lg w-full outline-none"
            type="text"
            placeholder={t.username}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="border-0 border-b border-gray-300 focus:border-orange-400 focus:ring-0 bg-transparent placeholder-gray-400 text-lg w-full outline-none"
            type="email"
            placeholder={t.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border-0 border-b border-gray-300 focus:border-orange-400 focus:ring-0 bg-transparent placeholder-gray-400 text-lg w-full outline-none"
            type="password"
            placeholder={t.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="border-0 border-b border-gray-300 focus:border-orange-400 focus:ring-0 bg-transparent placeholder-gray-400 text-lg w-full outline-none"
            type="password"
            placeholder={t.confirmPassword}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <button
            type="submit"
            className="w-full py-3 rounded-full text-white text-lg font-semibold bg-gradient-to-r from-orange-400 to-orange-500 shadow-md hover:from-orange-500 hover:to-orange-400"
          >
            {t.submit}
          </button>
          <button
            type="button"
            className="w-full py-3 rounded-full text-orange-500 text-lg font-semibold border border-orange-400 hover:bg-orange-50 transition"
            onClick={() => router.goToHome()}
          >
            {t.back}
          </button>
        </form>
      </div>
    </div>
  );
}
