// app/animal_list/page.tsx (Server Component)
import { Suspense } from "react";
import { fetchDogsFromAPI } from "../utils/api";
import DogListClient from "./DogListClient";
import type { Breed } from "../types";

// ทำให้ AnimalListPage เป็น async server component
export default async function AnimalListPage() {
  // fetch ข้อมูลฝั่ง server
  let dogs: Breed[] = [];
  try {
    dogs = await fetchDogsFromAPI();
    console.log("[AnimalListPage] API response:", dogs);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // สามารถส่ง error message ไปเป็น prop ได้ถ้าต้องการ
    dogs = [];
  }
  // ใช้ Suspense ครอบ DogListClient เพื่อรองรับ fallback UI ระหว่างโหลด client component
  return (
    <Suspense fallback={<div>Loading dog list...</div>}>
      <DogListClient dogs={dogs} />
    </Suspense>
  );
}