"use client";
import React, { useEffect, useState } from "react";
import { IKMData, PeriodType } from "@/types/dashboard";

const periods = [
  { value: "SEMESTER_1", label: "Semester 1 (Jan-Jun)" },
  { value: "SEMESTER_2", label: "Semester 2 (Jul-Dec)" },
  { value: "TAHUN_INI", label: "Tahun Ini" },
  { value: "TAHUN_LALU", label: "Tahun Lalu" },
];

const IKMCard = () => {
  const [data, setData] = useState<IKMData | null>(null);
  const [period, setPeriod] = useState<PeriodType>("SEMESTER_1");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setMessage(null);
      try {
        const response = await fetch("https://sepakat.sumbarprov.go.id/api/v1/penilaian", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            unit_kerja: 3107,
            periode: period,
            tgl_awal: "",
            tgl_akhir: "",
          }),
        });
        
        if (!response.ok) throw new Error("Gagal mengambil data IKM");
        
        const result = await response.json();
        console.log(result);
        
        if (result.success === false && result.message) {
          setMessage(result.message);
          setData(null);
        } else if (result.status && result.data) {
          setData(result.data);
        } else {
          setMessage("Data tidak ditemukan");
          setData(null);
        }
      } catch (error) {
        console.error("IKM Fetch Error:", error);
        setMessage("Terjadi kesalahan saat memuat data");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [period]);

  return (
    <div className="rounded-xl border border-stroke bg-white p-6 shadow-solid-8 dark:border-strokedark dark:bg-blacksection">
      <div className="mb-6 flex items-center justify-between border-b border-stroke pb-4 dark:border-strokedark">
        <h3 className="text-xl font-bold text-black dark:text-white">
          Indeks Kepuasan Masyarakat
        </h3>
      </div>

      <div className="mb-6">
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value as PeriodType)}
          className="rounded-lg border border-stroke px-4 py-2 text-sm font-medium text-black outline-none focus:border-primary dark:border-strokedark dark:bg-black dark:text-white"
        >
          {periods.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex h-[200px] items-center justify-center">
             <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      ) : message ? (
        <div className="flex h-[200px] items-center justify-center">
          <p className="text-sm font-medium text-waterloo dark:text-manatee">{message}</p>
        </div>
      ) : data && (
        <>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg border border-stroke bg-alabaster p-4 text-center dark:border-strokedark dark:bg-black">
              <span className="text-[10px] font-bold uppercase text-waterloo">IKM</span>
              <p className="text-3xl font-bold text-primary">{data.ikm}</p>
            </div>
            <div className="rounded-lg border border-stroke bg-alabaster p-4 text-center dark:border-strokedark dark:bg-black">
              <span className="text-[10px] font-bold uppercase text-waterloo">KONVERSI IKM</span>
              <p className="text-3xl font-bold text-black dark:text-white">{data.konversi_ikm.toFixed(2)}</p>
            </div>
            <div className="rounded-lg border border-stroke bg-alabaster p-4 text-center dark:border-strokedark dark:bg-black">
              <span className="text-[10px] font-bold uppercase text-waterloo">NILAI LAYANAN</span>
              <p className="text-xl font-bold text-black dark:text-white leading-tight mt-1">{data.nilai_layanan}</p>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="mb-4 text-sm font-bold text-waterloo uppercase">
              Data Responden ({data.total_responden})
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-stroke bg-alabaster p-4 dark:border-strokedark dark:bg-black">
                <span className="text-[10px] font-bold uppercase text-waterloo">LAKI-LAKI</span>
                <p className="text-2xl font-bold text-black dark:text-white">{data.laki_laki}</p>
              </div>
              <div className="rounded-lg border border-stroke bg-alabaster p-4 dark:border-strokedark dark:bg-black">
                <span className="text-[10px] font-bold uppercase text-waterloo">PEREMPUAN</span>
                <p className="text-2xl font-bold text-black dark:text-white">{data.perempuan}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default IKMCard;
