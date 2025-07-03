"use client";

import { useState, useEffect } from "react";
import { useAppRouter } from "./router";

export default function Home() {
  const appRouter = useAppRouter();

  useEffect(() => {
    //test push
    if (typeof window !== "undefined") {
      const loginUser = localStorage.getItem("login_user");
      if (loginUser) {
        // window.location.href = "/animal_list";
        appRouter.goToAnimalList();
      } 
      else {
        appRouter.goToLogin();
      }
    }
  }, []);

  // return <LoginPage />;
}
