import { useEffect, useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";
import { X } from "lucide-react";
import {
  Driver,
  getMaxPossiblePoints,
  getWinProbability,
  getLeaderPoints,
} from "../data/drivers";

interface Props {
  driver: Driver;
  allDrivers: Driver[];
  onClose: () => void;
}

const BAR_COLORS = ["#e94560", "#d4af37", "#4a9eed"];

export default function DriverModal({ driver, allDrivers, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const probability = getWinProbability(driver, allDrivers);
  const maxPossible = getMaxPossiblePoints(driver);
  const leaderPts = getLeaderPoints(allDrivers);

  const chartData = [
    { label: "Current", value: driver.points },
    { label: "Max Possible", value: maxPossible },
    { label: "Leader", value: leaderPts },
  ];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="relative w-full max-w-md bg-[#111111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-4 text-center">
          <h2 className="text-2xl font-bold text-white">{driver.name}</h2>
          <p className="text-sm text-white/50 mt-1">Total Points: {driver.points}</p>
        </div>

        {/* Stats row */}
        <div className="px-6 pb-4 grid grid-cols-3 gap-3">
          {[
            { label: "CURRENT PTS", value: driver.points },
            { label: "MAX POSSIBLE", value: maxPossible },
            { label: "LEADER PTS", value: leaderPts },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-3 text-center"
            >
              <p className="text-[10px] text-white/40 font-semibold tracking-wider uppercase mb-1">
                {label}
              </p>
              <p className="text-xl font-bold text-white">{value}</p>
            </div>
          ))}
        </div>

        {/* Probability */}
        <div className="px-6 pb-4">
          <h3 className="text-center font-bold text-white text-base mb-3">
            Winning Probability
          </h3>
          <div className="relative h-9 bg-white/10 rounded-full overflow-hidden">
            <div
              className="prob-bar h-full flex items-center justify-center"
              style={{ width: `${Math.max(probability, 4)}%` }}
            >
              <span className="text-sm font-bold text-white drop-shadow">
                {probability.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        {/* Bar chart */}
        <div className="px-6 pb-6">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={chartData}
              margin={{ top: 8, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis
                dataKey="label"
                tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 12 }}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.04)" }}
                contentStyle={{
                  background: "#1a1a1a",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 8,
                  color: "white",
                }}
              />
              <Legend
                wrapperStyle={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}
              />
              <Bar dataKey="value" name="Points" radius={[4, 4, 0, 0]}>
                {chartData.map((_, index) => (
                  <Cell key={index} fill={BAR_COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
