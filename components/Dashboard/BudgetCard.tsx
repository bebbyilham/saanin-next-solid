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
    <div 
      className="rounded-2xl bg-blue-500/5 dark:bg-blue-950/20 border border-blue-200/30 dark:border-blue-800/20 shadow-lg shadow-blue-500/3 p-6 min-h-[350px]"
      style={{
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)"
      }}
    >
      <div className="mb-6 flex items-center justify-between border-b border-blue-200/30 dark:border-blue-800/30 pb-4">
        <h3 className="text-xl font-bold text-blue-950 dark:text-blue-100">
          Realisasi Belanja Tahun {year}
        </h3>
        <select
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          className="rounded-full bg-blue-500/8 dark:bg-blue-950/30 border border-blue-200/30 dark:border-blue-800/30 px-4 py-1.5 text-sm font-semibold text-blue-950 dark:text-blue-200 outline-none focus:ring-2 focus:ring-blue-400/40"
        >
          {/* Menghasilkan 5 tahun secara berurutan: +1 tahun ke depan sampai -3 tahun ke belakang */}
          {[currentYear + 1, currentYear, currentYear - 1, currentYear - 2, currentYear - 3].map((y) => (
            <option key={y} value={y} className="bg-white dark:bg-blue-950 text-blue-950 dark:text-blue-100">{y}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
        </div>
      ) : error ? (
        <div className="flex h-64 items-center justify-center text-center text-red-500">
          <p className="font-semibold">{error}</p>
        </div>
      ) : !data ? (
        <div className="flex h-64 items-center justify-center text-center text-blue-500 dark:text-blue-400">
          <p className="font-medium px-4">Data realisasi belanja untuk RSJ HB Saanin pada tahun {year} belum tersedia di SIMBANGDA.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="rounded-xl border border-blue-200/20 bg-blue-500/10 p-4 dark:border-blue-800/20 dark:bg-blue-950/30">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase text-blue-500 dark:text-blue-400">PAGU</span>
                <p className="text-lg font-extrabold text-blue-950 dark:text-blue-100">Rp {formatCurrency(data.pagu)}</p>
              </div>
            </div>
            <div className="rounded-xl border border-blue-200/20 bg-blue-500/10 p-4 dark:border-blue-800/20 dark:bg-blue-950/30">
              <div className="flex justify-between items-center text-blue-600 dark:text-blue-400">
                <span className="text-[10px] font-bold uppercase text-blue-500 dark:text-blue-400">REALISASI</span>
                <p className="text-lg font-extrabold">Rp {formatCurrency(data.realisasi)}</p>
              </div>
            </div>
            <div className="rounded-xl border border-blue-200/20 bg-blue-500/10 p-4 dark:border-blue-800/20 dark:bg-blue-950/30">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase text-blue-500 dark:text-blue-400">PERSENTASE</span>
                <p className="text-lg font-extrabold text-blue-950 dark:text-blue-100">{data.persentase.toFixed(2)}%</p>
              </div>
            </div>
            <div className="mt-4 text-[10px] text-blue-500/80 dark:text-blue-400/80 font-semibold space-y-1">
              <p>Terakhir diperbarui: {data.last_updated}</p>
              <p>*data otomatis sinkron dengan SIMBANGDA Sumbarprov</p>
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
                  className="stroke-blue-200/20 dark:stroke-blue-900/25"
                  strokeWidth="20"
                  fill="none"
                />
                {/* Foreground circle (Realisasi) */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="currentColor"
                  className="text-blue-500 dark:text-blue-400"
                  strokeWidth="24"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  fill="none"
                  style={{
                      filter: "drop-shadow(0px 4px 6px rgba(59, 130, 246, 0.15))",
                      transition: "stroke-dashoffset 1s ease-in-out"
                  }}
                />
              </svg>
              <div 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center bg-blue-500/10 dark:bg-blue-950/40 border border-blue-300/30 p-3 rounded-2xl shadow-md min-w-[90px]"
                style={{
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)"
                }}
              >
                <p className="text-lg font-extrabold text-blue-600 dark:text-blue-400">{data.persentase.toFixed(2)}%</p>
                <p className="text-[10px] font-bold uppercase text-blue-500 dark:text-blue-400">REALISASI</p>
              </div>
            </div>
            
            <div className="mt-4 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-6 rounded-full bg-blue-500 dark:bg-blue-400"></div>
                <span className="text-xs font-semibold text-blue-500 dark:text-blue-400">Realisasi</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-6 rounded-full bg-blue-200/20 dark:bg-blue-900/25 border border-blue-200/10"></div>
                <span className="text-xs font-semibold text-blue-500/60 dark:text-blue-400/60">Sisa Pagu</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetCard;
