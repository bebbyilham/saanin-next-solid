export interface IKMData {
  ikm: number;
  konversi_ikm: number;
  nilai_layanan: string;
  total_responden: number;
  laki_laki: number;
  perempuan: number;
}

export interface BudgetData {
  pagu: number;
  realisasi: number;
  persentase: number;
  sisa_pagu: number;
  tahun: number;
  last_updated: string;
}

export type PeriodType = "BULAN_INI" | "BULAN_LALU" | "SEMESTER_1" | "SEMESTER_2" | "TAHUN_INI" | "TAHUN_LALU";
