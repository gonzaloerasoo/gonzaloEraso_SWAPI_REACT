import { useState, useEffect } from "react";
import { Character } from "../types";

interface UseSwapiDataReturn {
  characters: Character[];
  loading: boolean;
  totalPages: number;
  error: string | null;
}

const useSwapiData = (page: number, searchTerm: string): UseSwapiDataReturn => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (searchTerm.trim()) {
          // Fetch all characters at once and filter client-side by name
          const res = await fetch(
            `https://swapi.tech/api/people?page=1&limit=100`,
            { signal },
          );
          const data = await res.json();
          const term = searchTerm.trim().toLowerCase();
          const filtered = (data.results || []).filter((item: any) =>
            item.name.toLowerCase().includes(term),
          );

          const details = await Promise.all(
            filtered.map(async (item: any) => {
              const detailRes = await fetch(item.url, { signal });
              const detailData = await detailRes.json();
              return {
                uid: item.uid,
                ...detailData.result.properties,
              } as Character;
            }),
          );

          setCharacters(details);
          setTotalPages(1);
        } else {
          const res = await fetch(
            `https://swapi.tech/api/people?page=${page}&limit=10`,
            { signal },
          );
          const data = await res.json();

          const details = await Promise.all(
            (data.results || []).map(async (item: any) => {
              const detailRes = await fetch(item.url, { signal });
              const detailData = await detailRes.json();
              return {
                uid: item.uid,
                ...detailData.result.properties,
              } as Character;
            }),
          );

          setCharacters(details);
          setTotalPages(data.total_pages || 1);
        }
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError("Error al cargar los personajes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [page, searchTerm]);

  return { characters, loading, totalPages, error };
};

export default useSwapiData;
