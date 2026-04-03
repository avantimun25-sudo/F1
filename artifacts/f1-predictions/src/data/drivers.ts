export interface Driver {
  id: number;
  name: string;
  team: string;
  teamColor: string;
  points: number;
  imageUrl: string;
}

const TOTAL_RACES = 24;
const RACES_DONE = 18;
const REMAINING_RACES = TOTAL_RACES - RACES_DONE;
const MAX_POINTS_PER_RACE = 26; // 25 + 1 fastest lap

export const drivers: Driver[] = [
  { id: 1, name: "Max Verstappen", team: "RED BULL", teamColor: "#3671C6", points: 255, imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/2col/image.png" },
  { id: 2, name: "Charles Leclerc", team: "FERRARI", teamColor: "#E8002D", points: 210, imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png.transform/2col/image.png" },
  { id: 3, name: "Carlos Sainz", team: "FERRARI", teamColor: "#E8002D", points: 198, imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carsai01.png.transform/2col/image.png" },
  { id: 4, name: "Sergio Perez", team: "RED BULL", teamColor: "#3671C6", points: 192, imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/S/SERPER01_Sergio_Perez/serper01.png.transform/2col/image.png" },
  { id: 5, name: "Lando Norris", team: "MCLAREN", teamColor: "#FF8000", points: 182, imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png.transform/2col/image.png" },
  { id: 6, name: "Lewis Hamilton", team: "MERCEDES", teamColor: "#27F4D2", points: 165, imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/2col/image.png" },
  { id: 7, name: "George Russell", team: "MERCEDES", teamColor: "#27F4D2", points: 150, imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png.transform/2col/image.png" },
  { id: 8, name: "Oscar Piastri", team: "MCLAREN", teamColor: "#FF8000", points: 140, imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/O/OSCPIA01_Oscar_Piastri/oscpia01.png.transform/2col/image.png" },
  { id: 9, name: "Fernando Alonso", team: "ASTON MARTIN", teamColor: "#358C75", points: 120, imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/F/FERALO01_Fernando_Alonso/feralo01.png.transform/2col/image.png" },
  { id: 10, name: "Esteban Ocon", team: "ALPINE", teamColor: "#0093CC", points: 82, imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/E/ESTOCO01_Esteban_Ocon/estoco01.png.transform/2col/image.png" },
  { id: 11, name: "Sebastian Vettel", team: "ASTON MARTIN", teamColor: "#358C75", points: 75, imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/S/SEBVET01_Sebastian_Vettel/sebvet01.png.transform/2col/image.png" },
  { id: 12, name: "Pierre Gasly", team: "ALPINE", teamColor: "#0093CC", points: 70, imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/P/PIEGAS01_Pierre_Gasly/piegas01.png.transform/2col/image.png" },
  { id: 13, name: "Yuki Tsunoda", team: "ALPHA TAURI", teamColor: "#5E8FAA", points: 55, imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/Y/YUKTSU01_Yuki_Tsunoda/yuktsu01.png.transform/2col/image.png" },
  { id: 14, name: "Daniel Ricciardo", team: "ALPHA TAURI", teamColor: "#5E8FAA", points: 44, imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/D/DANRIC01_Daniel_Ricciardo/danric01.png.transform/2col/image.png" },
  { id: 15, name: "Valtteri Bottas", team: "ALFA ROMEO", teamColor: "#C92D4B", points: 38, imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/V/VALBOT01_Valtteri_Bottas/valbot01.png.transform/2col/image.png" },
  { id: 16, name: "Nico Hulkenberg", team: "HAAS", teamColor: "#B6BABD", points: 30, imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/N/NICHUL01_Nico_Hulkenberg/nichul01.png.transform/2col/image.png" },
  { id: 17, name: "Lance Stroll", team: "ASTON MARTIN", teamColor: "#358C75", points: 28, imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/L/LANSTR01_Lance_Stroll/lanstr01.png.transform/2col/image.png" },
  { id: 18, name: "Zhou Guanyu", team: "ALFA ROMEO", teamColor: "#C92D4B", points: 22, imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/G/GUAZHO01_Guanyu_Zhou/guazho01.png.transform/2col/image.png" },
  { id: 19, name: "Kevin Magnussen", team: "HAAS", teamColor: "#B6BABD", points: 20, imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/K/KEVMAG01_Kevin_Magnussen/kevmag01.png.transform/2col/image.png" },
  { id: 20, name: "Logan Sargeant", team: "WILLIAMS", teamColor: "#64C4FF", points: 10, imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/L/LOGSAR01_Logan_Sargeant/logsar01.png.transform/2col/image.png" },
];

export function getLeaderPoints(driversList: Driver[]): number {
  return Math.max(...driversList.map((d) => d.points));
}

export function getMaxPossiblePoints(driver: Driver): number {
  return driver.points + REMAINING_RACES * MAX_POINTS_PER_RACE;
}

export function getWinProbability(driver: Driver, driversList: Driver[]): number {
  const leaderPts = getLeaderPoints(driversList);
  const maxPossible = getMaxPossiblePoints(driver);

  if (maxPossible < leaderPts) return 0;

  const pointsGap = leaderPts - driver.points;
  const maxGapToClose = REMAINING_RACES * MAX_POINTS_PER_RACE;

  if (maxGapToClose === 0) {
    return driver.points >= leaderPts ? 100 : 0;
  }

  const probability = Math.max(0, Math.min(100, (1 - pointsGap / maxGapToClose) * 100));
  return Math.round(probability * 100) / 100;
}

export const RACES_DONE_COUNT = RACES_DONE;
export const TOTAL_RACES_COUNT = TOTAL_RACES;
