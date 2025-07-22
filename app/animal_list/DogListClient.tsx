"use client";
import { useEffect, useState } from "react";
import { useAppRouter } from "../router";
import type { Breed } from "../types";

export default function DogListClient({ dogs, isLoading }: { dogs: Breed[]; isLoading?: boolean }) {
  const [animals, setAnimals] = useState<Breed[]>(dogs);
  const [search, setSearch] = useState("");
  const [loginUser, setLoginUser] = useState<string | null>(null);
  const [favVersion, setFavVersion] = useState(0);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const router = useAppRouter();

  // Update animals if dogs prop changes (SSR hydration)
  useEffect(() => {
    setAnimals(dogs);
  }, [dogs]);

  // Sync login user from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("login_user");
      setLoginUser(user);
    }
  }, [favVersion]);

  // Filtered animal list (search & favorites)
  const filteredAnimals = animals.filter((animal) => {
    if (showFavoritesOnly) {
      const favKey = loginUser ? `favorite_dogs_${loginUser}` : '';
      const favStr = (typeof window !== 'undefined' && favKey) ? localStorage.getItem(favKey) : null;
      const favList: number[] = favStr ? JSON.parse(favStr) : [];
      return favList.includes(animal.id) && animal.name?.toLowerCase().includes(search.toLowerCase());
    }
    return animal.name?.toLowerCase().includes(search.toLowerCase());
  });

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
        <div className="flex w-full max-w-2xl mb-4">
          <button
            className={`flex-1 py-2 rounded-l-lg text-lg font-semibold border border-orange-400 ${!showFavoritesOnly ? 'bg-orange-400 text-white' : 'bg-white text-orange-500'}`}
            onClick={() => setShowFavoritesOnly(false)}
          >
            รายการสุนัขทั้งหมด
          </button>
          <button
            className={`flex-1 py-2 rounded-r-lg text-lg font-semibold border border-orange-400 border-l-0 ${showFavoritesOnly ? 'bg-orange-400 text-white' : 'bg-white text-orange-500'}`}
            onClick={() => setShowFavoritesOnly(true)}
          >
            เฉพาะรายการโปรด
          </button>
        </div>
        {isLoading && <div>Loading...</div>}
        <ul className="w-full flex flex-col gap-4">
          {filteredAnimals.map((animal, idx) => {
            const favKey = loginUser ? `favorite_dogs_${loginUser}` : '';
            const favStr = (typeof window !== 'undefined' && favKey) ? localStorage.getItem(favKey) : null;
            const favList: number[] = favStr ? JSON.parse(favStr) : [];
            const isFavorite = favList.includes(animal.id);
            return (
              <li key={animal.id || idx} className="border-b pb-4 flex gap-4 items-center">
                <input
                  type="checkbox"
                  checked={isFavorite}
                  onChange={e => {
                    if (!loginUser) return;
                    let newFavList = [...favList];
                    if (e.target.checked) {
                      if (!newFavList.includes(animal.id)) {
                        newFavList.push(animal.id);
                      }
                    } else {
                      newFavList = newFavList.filter(id => id !== animal.id);
                    }
                    localStorage.setItem(favKey, JSON.stringify(newFavList));
                    setFavVersion(v => v + 1);
                  }}
                  className="accent-orange-500 w-5 h-5 mr-2"
                />
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
            );
          })}
        </ul>
      </div>
    </div>
  );
}