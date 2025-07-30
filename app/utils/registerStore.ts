import { create } from "zustand";
import type { RegisUser } from "../types";

interface RegisterState {
  username: string;
  setUsername: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  confirmPassword: string;
  setConfirmPassword: (v: string) => void;
  error: string;
  setError: (v: string) => void;
  regisUserData: RegisUser[];
  setRegisUserData: (v: RegisUser[]) => void;
  language: "th" | "en";
  setLanguage: (lang: "th" | "en") => void;
}

export const useRegisterStore = create<RegisterState>((set) => ({
  username: "",
  setUsername: (v) => set({ username: v }),
  email: "",
  setEmail: (v) => set({ email: v }),
  password: "",
  setPassword: (v) => set({ password: v }),
  confirmPassword: "",
  setConfirmPassword: (v) => set({ confirmPassword: v }),
  error: "",
  setError: (v) => set({ error: v }),
  regisUserData: [],
  setRegisUserData: (v) => set({ regisUserData: v }),
  language: "th",
  setLanguage: (lang) => set({ language: lang }),
}));
