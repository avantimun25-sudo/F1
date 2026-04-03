export const TEAM_COLORS: Record<string, string> = {
  "red_bull": "#3671C6",
  "ferrari": "#E8002D",
  "mercedes": "#27F4D2",
  "mclaren": "#FF8000",
  "aston_martin": "#358C75",
  "alpine": "#0093CC",
  "rb": "#5E8FAA",
  "alpha_tauri": "#5E8FAA",
  "haas": "#B6BABD",
  "williams": "#64C4FF",
  "alfa": "#C92D4B",
  "alfa_romeo": "#C92D4B",
  "alphatauri": "#5E8FAA",
  "sauber": "#00CF46",
  "kick_sauber": "#00CF46",
  "renault": "#FFD800",
  "racing_point": "#F596C8",
  "force_india": "#F596C8",
  "toro_rosso": "#B6BABD",
  "manor": "#A8001C",
  "lotus_f1": "#FFB800",
  "lotus": "#FFB800",
  "caterham": "#00574B",
  "marussia": "#A8001C",
  "hrt": "#999999",
  "virgin": "#C20000",
  "bmw_sauber": "#6B8CC5",
  "toyota": "#CE1121",
  "brawn": "#B5CF0B",
  "honda": "#AAAAAA",
  "super_aguri": "#E40008",
  "spyker": "#FF6A10",
  "red_bull_junior": "#3671C6",
};

export function getTeamColor(constructorId: string): string {
  const normalized = constructorId.toLowerCase().replace(/[^a-z0-9]/g, "_");
  for (const [key, val] of Object.entries(TEAM_COLORS)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return val;
    }
  }
  return "#888888";
}
