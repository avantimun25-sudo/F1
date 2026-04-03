import { useState } from "react";
import { Search } from "lucide-react";
import { drivers, RACES_DONE_COUNT, TOTAL_RACES_COUNT } from "../data/drivers";
import type { Driver } from "../data/drivers";
import Leaderboard from "../components/Leaderboard";
import DriverCard from "../components/DriverCard";
import DriverModal from "../components/DriverModal";
import SortDropdown from "../components/SortDropdown";

type SortMode = "points" | "name" | "probability";

export default function Home() {
  const [search, setSearch] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("points");
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  const filteredDrivers = search.trim()
    ? drivers.filter((d) =>
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.team.toLowerCase().includes(search.toLowerCase())
      )
    : drivers;

  const sortedCards = [...filteredDrivers].sort((a, b) => {
    if (sortMode === "points") return b.points - a.points;
    if (sortMode === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Background F1 logo watermark */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 opacity-5 select-none">
        <span className="text-[30vw] font-black text-white leading-none">F1</span>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="pt-8 pb-4 text-center px-4">
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight neon-red text-[#e10600]">
            F1 Championship Predictions
          </h1>
          <p className="mt-2 text-sm text-white/45">
            Win Probability Based On {RACES_DONE_COUNT} Race Out Of {TOTAL_RACES_COUNT}
          </p>
        </header>

        {/* Controls */}
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
            />
            <input
              type="search"
              placeholder="Search driver..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#111] border border-white/12 text-white placeholder-white/30 text-sm pl-9 pr-4 py-2.5 rounded-lg outline-none focus:border-[#e10600]/50 transition-colors"
            />
          </div>

          {/* Sort dropdown */}
          <SortDropdown value={sortMode} onChange={setSortMode} />
        </div>

        <div className="max-w-5xl mx-auto px-4 pb-10 space-y-8">
          {/* Leaderboard */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#e10600] animate-pulse" />
              <h2 className="text-white font-bold text-lg">Drivers Leaderboard</h2>
            </div>
            <Leaderboard
              drivers={filteredDrivers}
              sortMode={sortMode}
              onDriverClick={setSelectedDriver}
            />
          </section>

          {/* Driver grid */}
          <section>
            <h2 className="text-white font-bold text-lg mb-3">Driver Profiles</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {sortedCards.map((driver) => (
                <DriverCard
                  key={driver.id}
                  driver={driver}
                  allDrivers={drivers}
                  onClick={() => setSelectedDriver(driver)}
                />
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Modal */}
      {selectedDriver && (
        <DriverModal
          driver={selectedDriver}
          allDrivers={drivers}
          onClose={() => setSelectedDriver(null)}
        />
      )}
    </div>
  );
}
