import { useQuery } from "@tanstack/react-query";

export interface Race {
  round: number;
  name: string;
  date: string;
}

export interface DriverStanding {
  position: number;
  points: number;
  driverId: string;
  name: string;
  nationality: string;
  team: string;
  constructorId: string;
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

export function useSeasonRaces(year: number | null) {
  return useQuery({
    queryKey: ["f1-races", year],
    queryFn: () =>
      fetchJson<{ year: number; total: number; races: Race[] }>(
        `/api/f1/seasons/${year}/total-rounds`
      ),
    enabled: year !== null,
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: 2,
  });
}

export function useRoundStandings(year: number | null, round: number | null) {
  return useQuery({
    queryKey: ["f1-standings", year, round],
    queryFn: () =>
      fetchJson<{ year: number; round: number; drivers: DriverStanding[] }>(
        `/api/f1/seasons/${year}/rounds/${round}/standings`
      ),
    enabled: year !== null && round !== null,
    staleTime: 1000 * 60 * 60,
    retry: 2,
  });
}
