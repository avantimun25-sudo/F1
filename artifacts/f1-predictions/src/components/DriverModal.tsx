import { useEffect, useRef, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { X } from "lucide-react";
import type { DriverStanding } from "../hooks/useF1Data";
import { getTeamColor } from "../data/teamColors";
import { getDriverPhoto } from "../data/driverPhotos";

interface Props {
  driver: DriverStanding;
  leaderPoints: number;
  roundsDone: number;
  totalRounds: number;
  onClose: () => void;
}

const MAX_PER_RACE = 26;
const BAR_COLORS = ["#e94560", "#d4af37", "#4a9eed"];

function getWinProbability(
  driver: DriverStanding,
  leaderPoints: number,
  roundsDone: number,
  totalRounds: number
): number {
  const remaining = totalRounds - roundsDone;
  const maxPossible = driver.points + remaining * MAX_PER_RACE;
  if (maxPossible < leaderPoints) return 0;
  const gap = leaderPoints - driver.points;
  const maxCanGain = remaining * MAX_PER_RACE;
  if (maxCanGain === 0) return driver.points >= leaderPoints ? 100 : 0;
  return Math.round(Math.max(0, Math.min(100, (1 - gap / maxCanGain) * 100)) * 100) / 100;
}

export default function DriverModal({ driver, leaderPoints, roundsDone, totalRounds, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [photoErr, setPhotoErr] = useState(false);
  const probability = getWinProbability(driver, leaderPoints, roundsDone, totalRounds);
  const maxPossible = driver.points + (totalRounds - roundsDone) * MAX_PER_RACE;
  const teamColor = getTeamColor(driver.constructorId);
  const photo = getDriverPhoto(driver.driverId);
  const initials = driver.name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();

  const probColor =
    probability > 80 ? "#22c55e" : probability > 50 ? "#f59e0b" : probability > 10 ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.3)";

  const chartData = [
    { label: "Current", value: driver.points },
    { label: "Max Possible", value: maxPossible },
    { label: "Leader", value: leaderPoints },
  ];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      <div className="relative w-full max-w-md bg-[#111111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Team color top bar */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: teamColor }} />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Photo header */}
        <div className="relative flex items-end gap-4 px-6 pt-8 pb-4" style={{ background: teamColor + "15" }}>
          <div
            className="relative shrink-0 w-20 h-20 rounded-xl overflow-hidden"
            style={{ border: `2px solid ${teamColor}55` }}
          >
            {photo && !photoErr ? (
              <img
                src={photo}
                alt={driver.name}
                className="w-full h-full object-cover object-top"
                onError={() => setPhotoErr(true)}
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-2xl font-black text-white"
                style={{ background: teamColor + "44" }}
              >
                {initials}
              </div>
            )}
          </div>
          <div className="pb-1">
            <h2 className="text-xl font-bold text-white leading-tight">{driver.name}</h2>
            <p className="text-sm font-semibold mt-0.5" style={{ color: teamColor }}>
              {driver.team}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-white/40">Position:</span>
              <span className="text-xs font-bold text-white">P{driver.position}</span>
              <span className="text-xs text-white/40 ml-2">Nationality:</span>
              <span className="text-xs font-bold text-white">{driver.nationality}</span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="px-6 pt-3 pb-4 grid grid-cols-3 gap-3">
          {[
            { label: "CURRENT PTS", value: driver.points },
            { label: "MAX POSSIBLE", value: maxPossible },
            { label: "LEADER PTS", value: leaderPoints },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white/5 border border-white/10 rounded-lg px-2 py-3 text-center">
              <p className="text-[9px] text-white/40 font-semibold tracking-wider uppercase mb-1">{label}</p>
              <p className="text-xl font-bold text-white">{value}</p>
            </div>
          ))}
        </div>

        {/* Probability */}
        <div className="px-6 pb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-white text-sm">Winning Probability</h3>
            <span className="text-sm font-bold" style={{ color: probColor }}>
              {probability.toFixed(2)}%
            </span>
          </div>
          <div className="relative h-4 bg-white/10 rounded-full overflow-hidden">
            <div
              className="prob-bar h-full rounded-full transition-all duration-700"
              style={{ width: `${Math.max(probability, probability > 0 ? 3 : 0)}%`, background: probColor }}
            />
          </div>
        </div>

        {/* Bar chart */}
        <div className="px-6 pb-6">
          <p className="text-xs text-white/40 font-semibold uppercase tracking-wider mb-3">Points Comparison</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="label" tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.1)" }} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} axisLine={{ stroke: "rgba(255,255,255,0.1)" }} tickLine={false} />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.04)" }}
                contentStyle={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "white", fontSize: 12 }}
              />
              <Bar dataKey="value" name="Points" radius={[4, 4, 0, 0]}>
                {chartData.map((_, i) => (
                  <Cell key={i} fill={BAR_COLORS[i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
