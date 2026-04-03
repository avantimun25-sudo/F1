import { Driver, getWinProbability } from "../data/drivers";

type SortMode = "points" | "name" | "probability";

interface Props {
  drivers: Driver[];
  sortMode: SortMode;
  onDriverClick: (driver: Driver) => void;
}

function getSortedDrivers(drivers: Driver[], sortMode: SortMode): Driver[] {
  const copy = [...drivers];
  if (sortMode === "points") {
    copy.sort((a, b) => b.points - a.points);
  } else if (sortMode === "name") {
    copy.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    copy.sort(
      (a, b) =>
        getWinProbability(b, drivers) - getWinProbability(a, drivers)
    );
  }
  return copy;
}

export default function Leaderboard({ drivers, sortMode, onDriverClick }: Props) {
  const sorted = getSortedDrivers(drivers, sortMode);

  const topThreeIds = [...drivers]
    .sort((a, b) => b.points - a.points)
    .slice(0, 3)
    .map((d) => d.id);

  return (
    <div className="bg-[#0d0d0d] border border-white/8 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-[3rem_1fr_6rem_9rem] gap-2 px-4 py-3 border-b border-white/8">
        <span className="text-xs text-white/40 font-semibold uppercase tracking-wider">#</span>
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#e10600" }}>Driver</span>
        <span className="text-xs text-white/40 font-semibold uppercase tracking-wider text-right">Points</span>
        <span className="text-xs text-white/40 font-semibold uppercase tracking-wider text-right">Win Probability</span>
      </div>

      {/* Rows */}
      {sorted.map((driver, index) => {
        const prob = getWinProbability(driver, drivers);
        const rank = sorted.indexOf(driver) + 1;
        const isTop = topThreeIds.includes(driver.id);

        return (
          <div
            key={driver.id}
            className="leaderboard-row grid grid-cols-[3rem_1fr_6rem_9rem] gap-2 px-4 py-3 border-b border-white/5 last:border-0 items-center"
            onClick={() => onDriverClick(driver)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onDriverClick(driver)}
          >
            <span
              className={`text-sm font-bold ${
                rank === 1
                  ? "text-[#e10600]"
                  : rank === 2
                  ? "text-white/80"
                  : rank === 3
                  ? "text-[#cd7f32]"
                  : "text-white/30"
              }`}
            >
              {rank}
            </span>
            <span
              className={`text-sm font-medium truncate ${
                isTop ? "text-[#e10600]" : "text-white/85"
              }`}
            >
              {driver.name}
            </span>
            <span
              className={`text-sm font-semibold text-right ${
                isTop ? "text-[#f59e0b]" : "text-white/60"
              }`}
            >
              {driver.points}
            </span>
            <span
              className={`text-sm font-bold text-right ${
                prob > 80
                  ? "text-[#22c55e]"
                  : prob > 50
                  ? "text-[#f59e0b]"
                  : prob > 20
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
  );
}
