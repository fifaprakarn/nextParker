"use client";
import Image from "next/image";
import { useState } from "react";
import { useAppRouter } from "../router";
import type { RegisUser } from "../types";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useAppRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("กรุณากรอกอีเมลและรหัสผ่าน");
      return;
    }
    // Check registration data from localStorage
    if (typeof window !== "undefined") {
      const regisUserListStr = localStorage.getItem("regis_user_list");
      console.log("regis_user_list from localStorage:", regisUserListStr); // Log the registration data
      if (regisUserListStr) {
        const regisUserList: RegisUser[] = JSON.parse(regisUserListStr);
        const foundUser = regisUserList.find((u) => u.email === username && u.password === password);
        if (!foundUser) {
          setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
          return;
        }
        // Save login username to localStorage
        localStorage.setItem("login_user", foundUser.username);
      } else {
        setError("ไม่พบข้อมูลผู้ใช้");
        return;
      }
    }
    setError("");
    router.push("/animal_list"); // Go to thedog page after login
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f6e7c1] px-2 py-8">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-8 sm:p-12 flex flex-col items-center">
        <Image
          src="/login_icon.svg"
          alt="Meow Meow Logo"
          width={320}
          height={220}
          className="mb-10"
        />
   
        <form className="w-full flex flex-col gap-6" onSubmit={handleLogin}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <svg
                className="w-6 h-6 text-orange-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 12A4 4 0 1 1 8 12a4 4 0 0 1 8 0ZM12 14v2m0 4h.01"
                />
              </svg>
              <input
                className="flex-1 border-0 border-b border-gray-300 focus:border-orange-400 focus:ring-0 bg-transparent placeholder-gray-400 text-lg w-full outline-none"
                type="email"
                placeholder="อีเมล"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <svg
                className="w-6 h-6 text-orange-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m0 4h.01M17 8V7a5 5 0 0 0-10 0v1a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2Z"
                />
              </svg>
              <input
                className="flex-1 border-0 border-b border-gray-300 focus:border-orange-400 focus:ring-0 bg-transparent placeholder-gray-400 text-lg w-full outline-none"
                type="password"
                placeholder="รหัสผ่าน"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <button
            type="submit"
            className="w-full py-3 rounded-full text-white text-lg font-semibold bg-gradient-to-r from-orange-400 to-orange-500 shadow-md hover:from-orange-500 hover:to-orange-400"
          >
            Login
          </button>
          <button
            type="button"
            className="w-full py-3 rounded-full text-orange-500 text-lg font-semibold border border-orange-400 hover:bg-orange-50 transition"
            onClick={() => router.push("/regis_page")}
          >
            สมัครสมาชิก
          </button>
        </form>
      </div>
    </div>
  );
}