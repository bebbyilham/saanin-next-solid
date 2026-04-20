"use client";
import React, { useState, useEffect } from "react";
import { BudgetData } from "@/types/dashboard";
import { fetchBudgetAction } from "./budgetAction";

const BudgetCard = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState<number>(currentYear); // Menggunakan tahun sistem saat ini
  const [data, setData] = useState<BudgetData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBudgetData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchBudgetAction(year);
        if (!result.success) {
          throw new Error(result.error);
        }
        
        const apiData = result.data?.result?.data;
        
        if (apiData && Array.isArray(apiData)) {
          // Cari instansi RSJ HB SAANIN (id_instansi === "8" di dalam "detail")
          const rsj = apiData.find((item: any) => item.detail?.id_instansi === "8");
          if (rsj) {
            const pagu = Number(rsj.pagu || 0);
            const realisasi = Number(rsj.rp_realisasi_keuangan || 0);
            const persentase = Number(rsj.persen_realisasi_keuangan || 0);
            
            // Dapatkan waktu saat ini untuk last_updated
            const now = new Date();
            const dateStr = now.toISOString().split('T')[0];
            const timeStr = now.toTimeString().split(' ')[0];
            
            setData({
              pagu: pagu,
              realisasi: realisasi,
              persentase: persentase,
              sisa_pagu: pagu - realisasi,
              tahun: year,
              last_updated: `${dateStr} ${timeStr}`,
            });
          } else {
            setData(null); // Data RSJ tidak ditemukan untuk tahun ini
          }
        } else {
          setData(null);
        }
      } catch (err: any) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBudgetData();
  }, [year]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "decimal",
      minimumFractionDigits: 0,
    }).format(val);
  };

  // Pie chart calculation
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const persentase = data ? data.persentase : 0;
  const offset = circumference - (persentase / 100) * circumference;

  return (
    <div className="rounded-xl border border-stroke bg-white p-6 shadow-solid-8 dark:border-strokedark dark:bg-blacksection min-h-[350px]">
      <div className="mb-6 flex items-center justify-between border-b border-stroke pb-4 dark:border-strokedark">
        <h3 className="text-xl font-bold text-black dark:text-white">
          Realisasi Belanja Tahun {year}
        </h3>
        <select
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          className="rounded-lg border border-stroke px-4 py-1 text-sm font-medium text-black outline-none focus:border-primary dark:border-strokedark dark:bg-black dark:text-white"
        >
          {/* Menghasilkan 5 tahun secara berurutan: +1 tahun ke depan sampai -3 tahun ke belakang */}
          {[currentYear + 1, currentYear, currentYear - 1, currentYear - 2, currentYear - 3].map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
        </div>
      ) : error ? (
        <div className="flex h-64 items-center justify-center text-center text-red-500">
          <p>{error}</p>
        </div>
      ) : !data ? (
        <div className="flex h-64 items-center justify-center text-center text-gray-500">
          <p>Data realisasi belanja untuk RSJ HB Saanin pada tahun {year} belum tersedia di SIMBANGDA.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="rounded-lg border border-stroke bg-alabaster p-4 dark:border-strokedark dark:bg-black">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase text-waterloo">PAGU</span>
                <p className="text-lg font-bold text-black dark:text-white">Rp {formatCurrency(data.pagu)}</p>
              </div>
            </div>
            <div className="rounded-lg border border-stroke bg-alabaster p-4 dark:border-strokedark dark:bg-black">
              <div className="flex justify-between items-center text-primary">
                <span className="text-[10px] font-bold uppercase text-waterloo">REALISASI</span>
                <p className="text-lg font-bold">Rp {formatCurrency(data.realisasi)}</p>
              </div>
            </div>
            <div className="rounded-lg border border-stroke bg-alabaster p-4 dark:border-strokedark dark:bg-black">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase text-waterloo">PERSENTASE</span>
                <p className="text-lg font-bold text-black dark:text-white">{data.persentase.toFixed(2)}%</p>
              </div>
            </div>
            <div className="mt-4 text-[10px] text-waterloo">
              <p>Terakhir diperbarui: {data.last_updated}</p>
              <p>*data otomatis ditarik dari SIMBANGDA Sumbarprov</p>
            </div>
          </div>

          <div className="relative flex flex-col items-center justify-center">
            <div className="mt-[-20px] relative h-[180px] w-[180px]">
              {/* SVG 3D-ish Pie Chart */}
              <svg viewBox="0 0 160 160" className="h-full w-full rotate-[-90deg]">
                {/* Background circle (Sisa Pagu) */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  className="stroke-alabaster dark:stroke-strokedark"
                  strokeWidth="20"
                  fill="none"
                />
                {/* Foreground circle (Realisasi) */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="currentColor"
                  className="text-primary"
                  strokeWidth="24"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  fill="none"
                  style={{
                      filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.1))",
                      transition: "stroke-dashoffset 1s ease-in-out"
                  }}
                />
              </svg>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center bg-white dark:bg-black shadow-lg p-3 rounded-xl border border-stroke dark:border-strokedark">
                <p className="text-lg font-bold text-primary">{data.persentase.toFixed(2)}%</p>
                <p className="text-[10px] font-bold uppercase text-waterloo">REALISASI</p>
              </div>
            </div>
            
            <div className="mt-4 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-6 rounded-full bg-primary"></div>
                <span className="text-xs text-waterloo">Realisasi</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-6 rounded-full bg-alabaster dark:bg-strokedark"></div>
                <span className="text-xs text-waterloo">Sisa Pagu</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetCard;
