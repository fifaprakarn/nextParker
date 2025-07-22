import axios from "axios";
import type { Breed } from "../types";

export async function fetchDogsFromAPI(): Promise<Breed[]> {
  try {
    const { data } = await axios.get<Breed[]>("https://api.thedogapi.com/v1/breeds");
    return Array.isArray(data) ? data : [];
  } catch (err) {
    if (err && typeof err === "object" && err !== null) {
      const errorObj = err as { message?: string; response?: { status: number; statusText: string } };
      if (errorObj.response) {
        throw new Error(`API Error: ${errorObj.response.status} ${errorObj.response.statusText}`);
      } else if (errorObj.message) {
        throw new Error(errorObj.message);
      }
    }
    throw new Error("Unknown error");
  }
}
