export const getSpecialtyName = (code: string): string => {
  const specialties: Record<string, string> = {
    GIG: "Gigi",
    UMU: "Umum/NAPZA",
    ANA: "Anak",
    IRM: "Rehabilitasi Medik",
    SAR: "Saraf",
    JIW: "Jiwa",
    INT: "Penyakit Dalam",
    BED: "Bedah",
    OBG: "Kebidanan & Kandungan",
    MAT: "Mata",
    THT: "THT",
    KUL: "Kulit & Kelamin",
    JAN: "Jantung",
    PAR: "Paru",
    RAD: "Radiologi",
  };

  return specialties[code] || code;
};

export const getInitials = (name: string): string => {
  const parts = name.split(" ");
  let initials = "";
  for (let i = 0; i < Math.min(2, parts.length); i++) {
    initials += parts[i].charAt(0);
  }
  return initials.toUpperCase();
};
