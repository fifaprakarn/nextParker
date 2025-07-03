"use client";
import { useEffect, useState } from "react";
import { useAppRouter } from "../router";
import type { Breed } from "../types";

// Example: Use the Zoo Animal API which provides images and content
const ANIMAL_API_URL = "https://api.thedogapi.com/v1/breeds";

export default function TheDogPagePage() {
  const [animals, setAnimals] = useState<Breed[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [loginUser, setLoginUser] = useState<string | null>(null);
  const router = useAppRouter();

  useEffect(() => {
    async function fetchTheDogs() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(ANIMAL_API_URL);
        if (!response.ok) throw new Error("Failed to fetch animal list");
        const data = await response.json();
        console.log("API response:", data); // Log the full API response
        // The Zoo Animal API returns an array of animal objects
        setAnimals(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchTheDogs();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("login_user");
      if (user) {
        setLoginUser(user);
      }
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f6e7c1] px-2 py-8">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-8 sm:p-12 flex flex-col items-center">
        <h2 className="text-2xl font-extrabold mb-6 text-orange-500 text-center tracking-tight">
          The Dog List
        </h2>
        <div className="mb-4 w-full text-right flex items-center justify-end gap-2">
          {loginUser && (
            <>
              <span className="text-orange-500 font-semibold">สวัสดี, {loginUser}</span>
              <button
                className="ml-4 px-3 py-1 rounded bg-orange-100 text-orange-600 border border-orange-300 hover:bg-orange-200 text-sm font-medium"
                onClick={() => {
                  localStorage.removeItem("login_user");
                  setLoginUser(null);
                  window.location.reload();
                  router.goToHome();
                }}
              >
                ออกจากระบบ
              </button>
            </>
          )}
        </div>
        <input
          type="text"
          placeholder="Search dog name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="mb-6 w-full max-w-md border-b border-orange-300 focus:border-orange-500 outline-none px-2 py-2 text-lg"
        />
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <ul className="w-full flex flex-col gap-4">
          {animals
            .filter((animal) =>
              animal.name?.toLowerCase().includes(search.toLowerCase())
            )
            .map((animal, idx) => (
              <li key={animal.id || idx} className="border-b pb-4 flex gap-4 items-center">
                <img
                  src={animal.reference_image_id ? `https://cdn2.thedogapi.com/images/${animal.reference_image_id}.jpg` : "/login_icon.svg"}
                  alt={animal.name}
                  className="w-24 h-24 object-cover rounded-lg border"
                />
                <div>
                  <div className="font-semibold text-gray-700 text-lg">id : {animal.id} {animal.name}</div>
                  <div className="text-gray-500 text-sm mb-1">{animal.bred_for}</div>
                  <div className="text-gray-600 text-sm">{animal.temperament}</div>
                  <div className="text-gray-400 text-xs mt-1">{animal.origin}</div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

