import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

type SortMode = "points" | "name" | "probability";

interface Props {
  value: SortMode;
  onChange: (val: SortMode) => void;
}

const OPTIONS: { value: SortMode; label: string }[] = [
  { value: "points", label: "Sort: Points (High \u2192 Low)" },
  { value: "name", label: "Sort: Name (A \u2192 Z)" },
  { value: "probability", label: "Sort: Probability (High \u2192 Low)" },
];

export default function SortDropdown({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const current = OPTIONS.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 bg-[#111] border border-white/15 text-white/80 text-sm px-4 py-2 rounded-lg hover:border-[#e10600]/50 transition-colors whitespace-nowrap"
      >
        <span>{current?.label}</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-72 bg-[#111] border border-white/15 rounded-lg shadow-2xl z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          {OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-3 text-sm transition-colors ${
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
    </div>
  );
}
