"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAppRouter } from "../router";
import type { RegisUser } from "../types";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [regisUserData, setRegisUserData] = useState<RegisUser[]>([]);
  const router = useAppRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const regisUserStr = localStorage.getItem("regis_user_list");
      // let regisUserList = regisUserStr ? JSON.parse(regisUserStr) : [];
      // regisUserList = regisUserList.filter((u: { username: string; }) => u.username !== "fifaa");
      // localStorage.setItem("regis_user_list", JSON.stringify(regisUserList));
      if (regisUserStr) {
        setRegisUserData(JSON.parse(regisUserStr));
        console.log("regis_user_list from localStorage (on page load):", regisUserStr);
      } else {
        setRegisUserData([]);
        console.log("regis_user_list from localStorage (on page load): ไม่มีข้อมูล");
      }
    }
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      setError("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    if (password !== confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน");
      return;
    }
    if (typeof window !== "undefined") {
      const regisUserStr = localStorage.getItem("regis_user_list");
      const regisUserList: RegisUser[] = regisUserStr ? JSON.parse(regisUserStr) : [];
      if (regisUserList.some((u: RegisUser) => u.username === username)) {
        setError("ชื่อผู้ใช้นี้ถูกใช้ไปแล้ว");
        return;
      }
      if (regisUserList.some((u: RegisUser) => u.email === email)) {
        setError("อีเมลนี้ถูกใช้ไปแล้ว");
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
        <h2 className="text-2xl font-extrabold mb-6 text-orange-500 text-center tracking-tight">
          สมัครสมาชิก
        </h2>
        <div className="mb-4 w-full">
          <h3 className="text-md font-semibold text-gray-700 mb-1">regis_user_list (localStorage):</h3>
          <pre className="bg-gray-100 rounded p-2 text-xs text-gray-700 overflow-x-auto">{regisUserData.length > 0 ? JSON.stringify(regisUserData, null, 2) : "ไม่มีข้อมูล"}</pre>
        </div>
        <form className="w-full flex flex-col gap-6" onSubmit={handleRegister}>
          <input
            className="border-0 border-b border-gray-300 focus:border-orange-400 focus:ring-0 bg-transparent placeholder-gray-400 text-lg w-full outline-none"
            type="text"
            placeholder="ชื่อผู้ใช้"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="border-0 border-b border-gray-300 focus:border-orange-400 focus:ring-0 bg-transparent placeholder-gray-400 text-lg w-full outline-none"
            type="email"
            placeholder="อีเมล"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border-0 border-b border-gray-300 focus:border-orange-400 focus:ring-0 bg-transparent placeholder-gray-400 text-lg w-full outline-none"
            type="password"
            placeholder="รหัสผ่าน"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="border-0 border-b border-gray-300 focus:border-orange-400 focus:ring-0 bg-transparent placeholder-gray-400 text-lg w-full outline-none"
            type="password"
            placeholder="ยืนยันรหัสผ่าน"
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
            สมัครสมาชิก
          </button>
          <button
            type="button"
            className="w-full py-3 rounded-full text-orange-500 text-lg font-semibold border border-orange-400 hover:bg-orange-50 transition"
            onClick={() => router.goToHome()}
          >
            กลับไปหน้าเข้าสู่ระบบ
          </button>
        </form>
      </div>
    </div>
  );
}
