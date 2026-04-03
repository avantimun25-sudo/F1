import { Driver, getWinProbability } from "../data/drivers";

interface Props {
  driver: Driver;
  allDrivers: Driver[];
  onClick: () => void;
}

export default function DriverCard({ driver, allDrivers, onClick }: Props) {
  const probability = getWinProbability(driver, allDrivers);

  return (
    <div
      className="driver-card bg-[#111111] border border-white/8 rounded-xl overflow-hidden flex flex-col"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      {/* Photo */}
      <div className="relative h-44 bg-gradient-to-b from-white/5 to-transparent overflow-hidden">
        <img
          src={driver.imageUrl}
          alt={driver.name}
          className="w-full h-full object-cover object-top"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Team color stripe */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ backgroundColor: driver.teamColor }}
        />
      </div>

      {/* Info */}
      <div className="p-3 flex-1 flex flex-col gap-1">
        <h3 className="font-bold text-white text-sm leading-tight">{driver.name}</h3>
        <p className="text-xs font-semibold" style={{ color: driver.teamColor }}>
          {driver.team}
        </p>
        <p className="text-xs text-white/50 mt-auto">{driver.points} Points</p>
        {probability > 0 && (
          <p className="text-xs font-bold text-[#f59e0b]">{probability.toFixed(2)}% win chance</p>
        )}
      </div>
    </div>
  );
}
