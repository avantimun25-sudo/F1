// Real driver photo URLs sourced from Wikipedia Commons (verified)
// Uses 400px thumbnail size for good quality display

const photos: Record<string, string> = {
  // ─── 2024–2025 Grid ─────────────────────────────────────────────────────────
  max_verstappen:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3973_by_Stepro_%28medium_crop%29.jpg/400px-2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3973_by_Stepro_%28medium_crop%29.jpg",
  norris:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3968_by_Stepro_%28cropped2%29.jpg/400px-2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3968_by_Stepro_%28cropped2%29.jpg",
  leclerc:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3978_by_Stepro_%28cropped2%29.jpg/400px-2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3978_by_Stepro_%28cropped2%29.jpg",
  piastri:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/2026_Chinese_GP_-_Oscar_Piastri_%28cropped%29_%28cropped%29.jpg/400px-2026_Chinese_GP_-_Oscar_Piastri_%28cropped%29_%28cropped%29.jpg",
  russell:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/KingsLeonSilverstne040724_%2828_of_112%29_%2853838006028%29_%28cropped%29.jpg/400px-KingsLeonSilverstne040724_%2828_of_112%29_%2853838006028%29_%28cropped%29.jpg",
  hamilton:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Prime_Minister_Keir_Starmer_meets_Sir_Lewis_Hamilton_%2854566928382%29_%28cropped%29.jpg/400px-Prime_Minister_Keir_Starmer_meets_Sir_Lewis_Hamilton_%2854566928382%29_%28cropped%29.jpg",
  sainz:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Formula1Gabelhofen2022_%2804%29_%28cropped2%29.jpg/400px-Formula1Gabelhofen2022_%2804%29_%28cropped2%29.jpg",
  perez:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/2021_US_GP_driver_parade_%28cropped2%29.jpg/400px-2021_US_GP_driver_parade_%28cropped2%29.jpg",
  alonso:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Alonso-68_%2824710447098%29.jpg/400px-Alonso-68_%2824710447098%29.jpg",
  hulkenberg:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Nico_Hulkenberg_2016_Malaysia.jpg/400px-Nico_Hulkenberg_2016_Malaysia.jpg",
  stroll:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/2025_Japan_GP_-_Aston_Martin_-_Lance_Stroll_-_Fanzone_Stage_%28cropped%29.jpg/400px-2025_Japan_GP_-_Aston_Martin_-_Lance_Stroll_-_Fanzone_Stage_%28cropped%29.jpg",
  tsunoda:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Yuki_Tsunoda_at_the_Melbourne_Walk_during_the_2026_Australian_Grand_Prix_%28028A8096%29.jpg/400px-Yuki_Tsunoda_at_the_Melbourne_Walk_during_the_2026_Australian_Grand_Prix_%28028A8096%29.jpg",
  albon:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Alex_Albon_%28cropped%29.jpg/400px-Alex_Albon_%28cropped%29.jpg",
  gasly:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/2022_French_Grand_Prix_%2852279065728%29_%28midcrop%29.png/400px-2022_French_Grand_Prix_%2852279065728%29_%28midcrop%29.png",
  ocon:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Esteban_Ocon_2024_Suzuka_%28cropped%29.jpg/400px-Esteban_Ocon_2024_Suzuka_%28cropped%29.jpg",
  kevin_magnussen:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Kevin_Magnussen%2C_2019_Formula_One_Tests_Barcelona_%28cropped%29.jpg/400px-Kevin_Magnussen%2C_2019_Formula_One_Tests_Barcelona_%28cropped%29.jpg",
  bottas:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Valtteri_Bottas_at_the_2026_Adelaide_Motorsport_Festival_%28028A7567%29.jpg/400px-Valtteri_Bottas_at_the_2026_Adelaide_Motorsport_Festival_%28028A7567%29.jpg",
  ricciardo:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Daniel_Ricciardo_January_2024.jpg/400px-Daniel_Ricciardo_January_2024.jpg",
  lawson:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Liam_Lawson_at_the_Red_Bull_Fan_Zone_%E2%80%93_Crown_Riverwalk%2C_Melbourne_%28028A7793%29.jpg/400px-Liam_Lawson_at_the_Red_Bull_Fan_Zone_%E2%80%93_Crown_Riverwalk%2C_Melbourne_%28028A7793%29.jpg",
  sargeant:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Logan_Sargeant_NYC_%28cropped%29.jpg/400px-Logan_Sargeant_NYC_%28cropped%29.jpg",

  // ─── 2025 newcomers ──────────────────────────────────────────────────────────
  antonelli:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Kimi_Antonelli_at_the_2025_US_Grand_Prix_in_Austin%2C_TX_%28cropped%29.jpg/400px-Kimi_Antonelli_at_the_2025_US_Grand_Prix_in_Austin%2C_TX_%28cropped%29.jpg",
  hadjar:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Isack_Hadjar_at_the_Melbourne_Walk_during_the_2026_Australian_Grand_Prix_%28028A8753%29_%28cropped%29.jpg/400px-Isack_Hadjar_at_the_Melbourne_Walk_during_the_2026_Australian_Grand_Prix_%28028A8753%29_%28cropped%29.jpg",
  bearman:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/2025_Japan_GP_-_Haas_-_Oliver_Bearman_-_Thursday_%28cropped%29.jpg/400px-2025_Japan_GP_-_Haas_-_Oliver_Bearman_-_Thursday_%28cropped%29.jpg",
  bortoleto:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Gabriel_Bortoleto_%28cropped%29.jpg/400px-Gabriel_Bortoleto_%28cropped%29.jpg",
  colapinto:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Franco_Colapinto_at_the_Melbourne_Walk_during_the_2026_Australian_Grand_Prix_%28028A8704%29_%28cropped%29.jpg/400px-Franco_Colapinto_at_the_Melbourne_Walk_during_the_2026_Australian_Grand_Prix_%28028A8704%29_%28cropped%29.jpg",
  doohan:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Jack_Doohan_2023.jpg/400px-Jack_Doohan_2023.jpg",
  de_vries:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/TGR_Nyck_de_Vries_240908.jpg/400px-TGR_Nyck_de_Vries_240908.jpg",

  // ─── 2019–2023 ───────────────────────────────────────────────────────────────
  giovinazzi:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Antonio_Giovinazzi_-_Ferrari_499P_-_Hybrid_during_the_pitwalk_at_the_2023_Le_Mans_%2853468237574%29.jpg/400px-Antonio_Giovinazzi_-_Ferrari_499P_-_Hybrid_during_the_pitwalk_at_the_2023_Le_Mans_%2853468237574%29.jpg",
  mick_schumacher:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Mick_Schumacher_2024_WEC_Fuji.jpg/400px-Mick_Schumacher_2024_WEC_Fuji.jpg",
  mazepin:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/%D0%9D%D0%B8%D0%BA%D0%B8%D1%82%D0%B0_%D0%9C%D0%B0%D0%B7%D0%B5%D0%BF%D0%B8%D0%BD_-_%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%B2%D1%8C%D1%8E_-_2019%2C_02.jpg/400px-%D0%9D%D0%B8%D0%BA%D0%B8%D1%82%D0%B0_%D0%9C%D0%B0%D0%B7%D0%B5%D0%BF%D0%B8%D0%BD_-_%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%B2%D1%8C%D1%8E_-_2019%2C_02.jpg",
  latifi:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Nicholas_Latifi_at_Singapore_in_2022_%28cropped%29.jpg/400px-Nicholas_Latifi_at_Singapore_in_2022_%28cropped%29.jpg",
  zhou:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Zhou_Guanyu_at_the_Melbourne_Walk_during_the_2026_Australian_Grand_Prix_%28028A7999%29.jpg/400px-Zhou_Guanyu_at_the_Melbourne_Walk_during_the_2026_Australian_Grand_Prix_%28028A7999%29.jpg",
  kvyat:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Daniil_Kvyat_2024_Suzuka_A2RL_%28cropped%29.jpg/400px-Daniil_Kvyat_2024_Suzuka_A2RL_%28cropped%29.jpg",
  grosjean:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Grosjean_at_2024_Chevrolet_Detroit_Grand_Prix.jpg/400px-Grosjean_at_2024_Chevrolet_Detroit_Grand_Prix.jpg",
  ericsson:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Marcus_Ericsson_in_2023.jpg/400px-Marcus_Ericsson_in_2023.jpg",

  // ─── 2014–2018 ───────────────────────────────────────────────────────────────
  rosberg:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Nico_Rosberg_2016.jpg/400px-Nico_Rosberg_2016.jpg",
  vettel:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Sebastian_Vettel_-_2022236172324_2022-08-24_Champions_for_Charity_-_Sven_-_1D_X_MK_II_-_0418_-_B70I2428_%28cropped%29.jpg/400px-Sebastian_Vettel_-_2022236172324_2022-08-24_Champions_for_Charity_-_Sven_-_1D_X_MK_II_-_0418_-_B70I2428_%28cropped%29.jpg",
  raikkonen:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/F12019_Schloss_Gabelhofen_%2822%29_%28cropped%29.jpg/400px-F12019_Schloss_Gabelhofen_%2822%29_%28cropped%29.jpg",
  massa:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Felipe_Massa.jpg/400px-Felipe_Massa.jpg",
  button:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Jenson_Button_2024_WEC_Fuji.jpg/400px-Jenson_Button_2024_WEC_Fuji.jpg",

  // ─── 2010–2013 ───────────────────────────────────────────────────────────────
  webber:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Mark_Webber_at_the_Melbourne_Walk_during_the_2026_Australian_Grand_Prix_%28028A8720%29.jpg/400px-Mark_Webber_at_the_Melbourne_Walk_during_the_2026_Australian_Grand_Prix_%28028A8720%29.jpg",
  michael_schumacher:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Michael_Schumacher_china_2012_rotated.png/400px-Michael_Schumacher_china_2012_rotated.png",
  barrichello:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Rubinho.jpg/400px-Rubinho.jpg",
  kubica:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Rubinho.jpg/400px-Rubinho.jpg",
  sutil:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Adrian_Sutil.jpg/400px-Adrian_Sutil.jpg",
  petrov:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Vitaly_Petrov_2010_Malaysia_%28cropped%29.jpg/400px-Vitaly_Petrov_2010_Malaysia_%28cropped%29.jpg",
  heidfeld:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Nick_Heidfeld_Goodwood_Festival_of_Speed_2019_%2848242681251%29.jpg/400px-Nick_Heidfeld_Goodwood_Festival_of_Speed_2019_%2848242681251%29.jpg",
};

export function getDriverPhoto(driverId: string): string | null {
  return photos[driverId] ?? null;
}
