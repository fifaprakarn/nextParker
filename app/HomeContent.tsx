"use client";
import { useEffect } from "react";
import { useAppRouter } from "./router";

export default function HomeContent() {
    
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
    }, [appRouter]);
    return null;
}