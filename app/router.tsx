// This file provides simple navigation helpers for the app.
import { useRouter } from "next/navigation";

export function useAppRouter() {
  const router = useRouter();

  return {
    goToHome: () => router.push("/"),
    goToLogin: () => router.push("/login_page"),
    goToSignup: () => router.push("/signup"),
    goToUserDetail: () => router.push("/user_detail"),
    goToEditUserDetail: () => router.push("/user_detail/edit_user_detail"),
    goToEditUserDetailWithParams: (userId: string) => router.push(`/user_detail/edit_user_detail?userId=${userId}`),
    goToUserDetailWithParams: (userId: string) => router.push(`/user_detail?userId=${userId}`),
    goToUserDetailWithQuery: (query: string) => router.push(`/user_detail?${query}`),
    goToLoginWithQuery: (query: string) => router.push(`/login?${query}`),
    goToSignupWithQuery: (query: string) => router.push(`/signup?${query}`),
    gotoregister: () => router.push("/regis_page"),
    goToAnimalList: () => router.push("/animal_list"),
    goToAnimalDetail: (animalId: string) => router.push(`/animal_detail?animalId=${animalId}`),
    goBack: () => router.back(),
    push: (path: string) => router.push(path),
    replace: (path: string) => router.replace(path),
    goToMainPage: () => router.push("/main_page"),
  };
}
