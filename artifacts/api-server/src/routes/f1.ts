import { Router, type IRouter } from "express";

const router: IRouter = Router();

const JOLPICA_BASE = "https://api.jolpi.ca/ergast/f1";

const cache = new Map<string, { data: unknown; ts: number }>();
const CACHE_TTL = 3600_000; // 1 hour

async function jolpicaFetch(path: string): Promise<unknown> {
  const cached = cache.get(path);
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return cached.data;
  }
  const url = `${JOLPICA_BASE}${path}`;
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) {
    throw new Error(`Jolpica API error ${res.status}: ${url}`);
  }
  const data = await res.json();
  cache.set(path, { data, ts: Date.now() });
  return data;
}

router.get("/f1/seasons/:year/races", async (req, res): Promise<void> => {
  const rawYear = Array.isArray(req.params.year) ? req.params.year[0] : req.params.year;
  const year = parseInt(rawYear, 10);
  if (isNaN(year) || year < 1950 || year > 2030) {
    res.status(400).json({ error: "Invalid year" });
    return;
  }

  const data = await jolpicaFetch(`/${year}/races.json?limit=50`) as {
    MRData: { RaceTable: { Races: Array<{ round: string; raceName: string; date: string }> } };
  };
  const races = data.MRData.RaceTable.Races.map((r) => ({
    round: parseInt(r.round, 10),
    name: r.raceName,
    date: r.date,
  }));
  res.json({ year, races });
});

router.get("/f1/seasons/:year/rounds/:round/standings", async (req, res): Promise<void> => {
  const rawYear = Array.isArray(req.params.year) ? req.params.year[0] : req.params.year;
  const rawRound = Array.isArray(req.params.round) ? req.params.round[0] : req.params.round;
  const year = parseInt(rawYear, 10);
  const round = parseInt(rawRound, 10);
  if (isNaN(year) || year < 1950 || year > 2030) {
    res.status(400).json({ error: "Invalid year" });
    return;
  }
  if (isNaN(round) || round < 1 || round > 50) {
    res.status(400).json({ error: "Invalid round" });
    return;
  }

  const data = await jolpicaFetch(`/${year}/${round}/driverStandings.json`) as {
    MRData: {
      StandingsTable: {
        StandingsLists: Array<{
          round: string;
          DriverStandings: Array<{
            position: string;
            points: string;
            Driver: { driverId: string; givenName: string; familyName: string; nationality: string };
            Constructors: Array<{ name: string; constructorId: string }>;
          }>;
        }>;
      };
    };
  };

  const lists = data.MRData.StandingsTable.StandingsLists;
  if (!lists || lists.length === 0) {
    res.json({ year, round, drivers: [] });
    return;
  }

  const standings = lists[0].DriverStandings.map((d) => ({
    position: parseInt(d.position, 10),
    points: parseFloat(d.points),
    driverId: d.Driver.driverId,
    name: `${d.Driver.givenName} ${d.Driver.familyName}`,
    nationality: d.Driver.nationality,
    team: d.Constructors[0]?.name ?? "Unknown",
    constructorId: d.Constructors[0]?.constructorId ?? "",
  }));

  res.json({ year, round, drivers: standings });
});

router.get("/f1/seasons/:year/total-rounds", async (req, res): Promise<void> => {
  const rawYear = Array.isArray(req.params.year) ? req.params.year[0] : req.params.year;
  const year = parseInt(rawYear, 10);
  if (isNaN(year) || year < 1950 || year > 2030) {
    res.status(400).json({ error: "Invalid year" });
    return;
  }

  const data = await jolpicaFetch(`/${year}/races.json?limit=50`) as {
    MRData: { total: string; RaceTable: { Races: Array<{ round: string; raceName: string; date: string }> } };
  };
  const total = parseInt(data.MRData.total, 10);
  const races = data.MRData.RaceTable.Races;
  res.json({ year, total, races: races.map((r) => ({ round: parseInt(r.round, 10), name: r.raceName, date: r.date })) });
});

export default router;
