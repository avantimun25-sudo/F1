import { useState, useEffect } from "react";
import { Search, ChevronDown, Loader2, AlertCircle, LayoutGrid, LayoutList } from "lucide-react";
import { useSeasonRaces, useRoundStandings, type DriverStanding } from "../hooks/useF1Data";
import { getTeamColor } from "../data/teamColors";
import { getDriverPhoto } from "../data/driverPhotos";
import DriverModal from "../components/DriverModal";

type SortMode = "position" | "name" | "probability";
type ViewMode = "list" | "grid";

const CURRENT_YEAR = 2026;
const YEARS = Array.from({ length: CURRENT_YEAR - 2010 + 1 }, (_, i) => CURRENT_YEAR - i);
const MAX_POINTS_PER_RACE = 26;

function getWinProbability(
  driver: DriverStanding,
  leaderPoints: number,
  roundsDone: number,
  totalRounds: number
): number {
  const remaining = totalRounds - roundsDone;
  const maxPossible = driver.points + remaining * MAX_POINTS_PER_RACE;
  if (maxPossible < leaderPoints) return 0;
  const gap = leaderPoints - driver.points;
  const maxCanGain = remaining * MAX_POINTS_PER_RACE;
  if (maxCanGain === 0) return driver.points >= leaderPoints ? 100 : 0;
  return Math.round(Math.max(0, Math.min(100, (1 - gap / maxCanGain) * 100)) * 100) / 100;
}

function DriverAvatar({
  driverId,
  name,
  teamColor,
  size = 40,
}: {
  driverId: string;
  name: string;
  teamColor: string;
  size?: number;
}) {
  const [errored, setErrored] = useState(false);
  const photo = getDriverPhoto(driverId);

  if (photo && !errored) {
    return (
      <img
        src={photo}
        alt={name}
        width={size}
        height={size}
        onError={() => setErrored(true)}
        className="rounded-full object-cover object-top shrink-0"
        style={{ width: size, height: size, border: `2px solid ${teamColor}33` }}
      />
    );
  }
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div
      className="rounded-full shrink-0 flex items-center justify-center text-white text-xs font-bold"
      style={{ width: size, height: size, background: teamColor + "33", border: `2px solid ${teamColor}55` }}
    >
      {initials}
    </div>
  );
}

function SelectBox({
  value,
  onChange,
  options,
  placeholder,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const current = options.find((o) => o.value === value);

  return (
    <div className="relative">
      <button
        onClick={() => !disabled && setOpen((o) => !o)}
        disabled={disabled}
        className={`flex items-center justify-between gap-2 w-full min-w-[180px] bg-[#111] border border-white/15 text-sm px-4 py-2.5 rounded-lg transition-colors ${
          disabled
            ? "opacity-40 cursor-not-allowed text-white/40"
            : "text-white/80 hover:border-[#e10600]/50 cursor-pointer"
        }`}
      >
        <span className="truncate">{current?.label ?? placeholder}</span>
        <ChevronDown size={14} className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && !disabled && (
        <div className="absolute left-0 top-full mt-1 w-full min-w-[240px] max-h-72 overflow-y-auto bg-[#111] border border-white/15 rounded-lg shadow-2xl z-30">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                opt.value === value
                  ? "bg-[#e10600]/20 text-[#e10600]"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
      {open && <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} />}
    </div>
  );
}

function SortDropdown({ value, onChange }: { value: SortMode; onChange: (v: SortMode) => void }) {
  const opts: { value: SortMode; label: string }[] = [
    { value: "position", label: "Sort: Championship" },
    { value: "name", label: "Sort: Name A–Z" },
    { value: "probability", label: "Sort: Win Prob." },
  ];
  return (
    <SelectBox
      value={value}
      onChange={(v) => onChange(v as SortMode)}
      options={opts}
      placeholder="Sort by..."
    />
  );
}

// ─── Driver Card (grid view) ────────────────────────────────────────────────
function DriverCard({
  driver,
  leaderPoints,
  roundsDone,
  totalRounds,
  onClick,
}: {
  driver: DriverStanding;
  leaderPoints: number;
  roundsDone: number;
  totalRounds: number;
  onClick: () => void;
}) {
  const prob = getWinProbability(driver, leaderPoints, roundsDone, totalRounds);
  const teamColor = getTeamColor(driver.constructorId);
  const photo = getDriverPhoto(driver.driverId);
  const [photoErr, setPhotoErr] = useState(false);
  const initials = driver.name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();

  const probColor =
    prob > 80 ? "#22c55e" : prob > 50 ? "#f59e0b" : prob > 10 ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)";

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      className="relative bg-[#0d0d0d] border border-white/8 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:border-white/20 hover:scale-[1.02] hover:shadow-2xl group"
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: teamColor }} />

      {/* Position badge */}
      <div
        className="absolute top-3 left-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold z-10"
        style={{
          background:
            driver.position === 1
              ? "#e10600"
              : driver.position === 2
              ? "#aaa"
              : driver.position === 3
              ? "#cd7f32"
              : "#222",
          color: "white",
        }}
      >
        {driver.position}
      </div>

      {/* Photo section */}
      <div className="relative h-48 flex items-center justify-center overflow-hidden" style={{ background: teamColor + "11" }}>
        {photo && !photoErr ? (
          <img
            src={photo}
            alt={driver.name}
            onError={() => setPhotoErr(true)}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-black text-white"
            style={{ background: teamColor + "44", border: `3px solid ${teamColor}` }}
          >
            {initials}
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
      </div>

      {/* Info section */}
      <div className="px-4 pb-4 -mt-1">
        <h3 className="text-white font-bold text-base leading-tight truncate">{driver.name}</h3>
        <p className="text-xs font-medium truncate mt-0.5" style={{ color: teamColor }}>
          {driver.team}
        </p>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="bg-white/5 rounded-lg px-2 py-2 text-center">
            <p className="text-[9px] text-white/40 uppercase tracking-wider font-semibold">Points</p>
            <p className="text-lg font-black text-[#f59e0b] leading-tight">{driver.points}</p>
          </div>
          <div className="bg-white/5 rounded-lg px-2 py-2 text-center">
            <p className="text-[9px] text-white/40 uppercase tracking-wider font-semibold">Win Prob.</p>
            <p className="text-lg font-black leading-tight" style={{ color: probColor }}>
              {prob.toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Probability bar */}
        <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.max(prob, prob > 0 ? 3 : 0)}%`, background: probColor }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function Home() {
  const [year, setYear] = useState<number>(2024);
  const [round, setRound] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("position");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedDriver, setSelectedDriver] = useState<{
    driver: DriverStanding;
    leaderPoints: number;
    roundsDone: number;
    totalRounds: number;
  } | null>(null);

  const { data: seasonData, isLoading: loadingRaces, error: racesError } = useSeasonRaces(year);
  const { data: standingsData, isLoading: loadingStandings, error: standingsError } =
    useRoundStandings(year, round);

  useEffect(() => {
    if (seasonData?.races?.length) {
      const today = new Date().toISOString().split("T")[0];
      const pastRaces = seasonData.races.filter((r) => r.date <= today);
      setRound(pastRaces.length > 0 ? pastRaces[pastRaces.length - 1].round : seasonData.races[0].round);
    } else {
      setRound(null);
    }
  }, [seasonData, year]);

  const totalRounds = seasonData?.total ?? seasonData?.races?.length ?? 0;
  const leaderPoints = standingsData?.drivers?.[0]?.points ?? 0;
  const roundsDone = round ?? 0;

  const filtered = (standingsData?.drivers ?? []).filter(
    (d) =>
      !search.trim() ||
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.team.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortMode === "position") return a.position - b.position;
    if (sortMode === "name") return a.name.localeCompare(b.name);
    return (
      getWinProbability(b, leaderPoints, roundsDone, totalRounds) -
      getWinProbability(a, leaderPoints, roundsDone, totalRounds)
    );
  });

  const raceOptions = (seasonData?.races ?? []).map((r) => ({
    value: String(r.round),
    label: `R${r.round}: ${r.name.replace(" Grand Prix", " GP")} (${r.date})`,
  }));

  const isLoading = loadingRaces || loadingStandings;
  const error = racesError || standingsError;

  const openModal = (driver: DriverStanding) =>
    setSelectedDriver({ driver, leaderPoints, roundsDone, totalRounds });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Background watermark */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.03] select-none">
        <span className="text-[30vw] font-black text-white leading-none">F1</span>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="pt-8 pb-4 text-center px-4">
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#e10600] neon-red">
            F1 Championship Predictions
          </h1>
          {round && totalRounds > 0 && (
            <p className="mt-2 text-sm text-white/45">
              Win Probability Based On {roundsDone} Race{roundsDone !== 1 ? "s" : ""} Out Of {totalRounds} &mdash;{" "}
              {year} Season
            </p>
          )}
        </header>

        {/* Controls */}
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center flex-wrap">
          <SelectBox
            value={String(year)}
            onChange={(v) => { setYear(Number(v)); setRound(null); }}
            options={YEARS.map((y) => ({ value: String(y), label: String(y) }))}
            placeholder="Year"
          />
          <div className="flex-1">
            <SelectBox
              value={round !== null ? String(round) : ""}
              onChange={(v) => setRound(Number(v))}
              options={raceOptions}
              placeholder={loadingRaces ? "Loading races…" : "Select Race"}
              disabled={loadingRaces || !seasonData}
            />
          </div>
          <div className="relative flex-1 min-w-[160px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="search"
              placeholder="Search driver..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#111] border border-white/12 text-white placeholder-white/30 text-sm pl-8 pr-4 py-2.5 rounded-lg outline-none focus:border-[#e10600]/50 transition-colors"
            />
          </div>
          <SortDropdown value={sortMode} onChange={setSortMode} />

          {/* View toggle */}
          <div className="flex gap-1 bg-[#111] border border-white/12 rounded-lg p-1 shrink-0">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "grid" ? "bg-[#e10600] text-white" : "text-white/40 hover:text-white"
              }`}
              title="Card view"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "list" ? "bg-[#e10600] text-white" : "text-white/40 hover:text-white"
              }`}
              title="List view"
            >
              <LayoutList size={16} />
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 pb-10">
          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3 mb-6">
              <AlertCircle size={16} />
              <span className="text-sm">Failed to load data. Please try another year or race.</span>
            </div>
          )}

          {/* Loading */}
          {isLoading && !error && (
            <div className="flex items-center justify-center py-20 gap-3 text-white/40">
              <Loader2 size={20} className="animate-spin text-[#e10600]" />
              <span className="text-sm">Loading championship data…</span>
            </div>
          )}

          {/* Content */}
          {!isLoading && !error && sorted.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#e10600] animate-pulse" />
                <h2 className="text-white font-bold text-lg">
                  {year} Drivers&apos; Championship — After Round {roundsDone}
                </h2>
                <span className="ml-auto text-xs text-white/30">{sorted.length} drivers</span>
              </div>

              {/* ── Grid View ── */}
              {viewMode === "grid" && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {sorted.map((driver) => (
                    <DriverCard
                      key={driver.driverId}
                      driver={driver}
                      leaderPoints={leaderPoints}
                      roundsDone={roundsDone}
                      totalRounds={totalRounds}
                      onClick={() => openModal(driver)}
                    />
                  ))}
                </div>
              )}

              {/* ── List View ── */}
              {viewMode === "list" && (
                <div className="bg-[#0d0d0d] border border-white/8 rounded-xl overflow-hidden">
                  <div className="grid grid-cols-[2.5rem_3rem_1fr_6rem_9rem] gap-2 px-4 py-3 border-b border-white/8">
                    <span />
                    <span className="text-xs text-white/40 font-semibold uppercase tracking-wider">#</span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#e10600]">Driver</span>
                    <span className="text-xs text-white/40 font-semibold uppercase tracking-wider text-right">Points</span>
                    <span className="text-xs text-white/40 font-semibold uppercase tracking-wider text-right">Win Prob.</span>
                  </div>

                  {sorted.map((driver) => {
                    const prob = getWinProbability(driver, leaderPoints, roundsDone, totalRounds);
                    const teamColor = getTeamColor(driver.constructorId);
                    const isTop3 = driver.position <= 3;
                    return (
                      <div
                        key={driver.driverId}
                        className="leaderboard-row grid grid-cols-[2.5rem_3rem_1fr_6rem_9rem] gap-2 px-4 py-3 border-b border-white/5 last:border-0 items-center"
                        onClick={() => openModal(driver)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === "Enter" && openModal(driver)}
                      >
                        {/* Photo */}
                        <DriverAvatar
                          driverId={driver.driverId}
                          name={driver.name}
                          teamColor={teamColor}
                          size={36}
                        />

                        <span
                          className={`text-sm font-bold ${
                            driver.position === 1
                              ? "text-[#e10600]"
                              : driver.position === 2
                              ? "text-white/80"
                              : driver.position === 3
                              ? "text-[#cd7f32]"
                              : "text-white/30"
                          }`}
                        >
                          {driver.position}
                        </span>
                        <div className="flex flex-col">
                          <span className={`text-sm font-medium truncate ${isTop3 ? "text-[#e10600]" : "text-white/85"}`}>
                            {driver.name}
                          </span>
                          <span className="text-xs truncate" style={{ color: teamColor }}>
                            {driver.team}
                          </span>
                        </div>
                        <span className={`text-sm font-semibold text-right ${isTop3 ? "text-[#f59e0b]" : "text-white/60"}`}>
                          {driver.points}
                        </span>
                        <span
                          className={`text-sm font-bold text-right ${
                            prob > 80
                              ? "text-[#22c55e]"
                              : prob > 50
                              ? "text-[#f59e0b]"
                              : prob > 10
                              ? "text-white/70"
                              : "text-white/30"
                          }`}
                        >
                          {prob.toFixed(2)}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          )}

          {/* Empty state */}
          {!isLoading && !error && !round && (
            <div className="text-center py-20 text-white/30 text-sm">
              Select a year and race to view championship predictions
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedDriver && (
        <DriverModal
          driver={selectedDriver.driver}
          leaderPoints={selectedDriver.leaderPoints}
          roundsDone={selectedDriver.roundsDone}
          totalRounds={selectedDriver.totalRounds}
          onClose={() => setSelectedDriver(null)}
        />
      )}
    </div>
  );
}
