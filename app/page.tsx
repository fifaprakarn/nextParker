"use client";

import { useState, useEffect } from "react";
import { useAppRouter } from "./router";
import type { RegisUser } from "./types";

export default function Home() {
  const appRouter = useAppRouter();

  useEffect(() => {
    //test push
    if (typeof window !== "undefined") {
      const loginUser: string | null = localStorage.getItem("login_user");
      if (loginUser) {
        appRouter.goToAnimalList();
      } 
      else {
        appRouter.goToLogin();
      }
    }
  }, []);

  // return <LoginPage />;
}
