"use client";
import React, { useState } from "react";
import { BudgetData } from "@/types/dashboard";

const budgetData2026: BudgetData = {
  pagu: 28905579238,
  realisasi: 4905397380,
  persentase: 16.97,
  sisa_pagu: 24000181858,
  tahun: 2026,
  last_updated: "2026-04-06 12:00:02",
};

const BudgetCard = () => {
  const [data] = useState<BudgetData>(budgetData2026);
  const [year, setYear] = useState(2026);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "decimal",
      minimumFractionDigits: 0,
    }).format(val);
  };

  // Pie chart calculation
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (data.persentase / 100) * circumference;

  return (
    <div className="rounded-xl border border-stroke bg-white p-6 shadow-solid-8 dark:border-strokedark dark:bg-blacksection">
      <div className="mb-6 flex items-center justify-between border-b border-stroke pb-4 dark:border-strokedark">
        <h3 className="text-xl font-bold text-black dark:text-white">
          Realisasi Belanja Tahun {year}
        </h3>
        <select
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          className="rounded-lg border border-stroke px-4 py-1 text-sm font-medium text-black outline-none focus:border-primary dark:border-strokedark dark:bg-black dark:text-white"
        >
          <option value={2026}>2026</option>
          <option value={2025}>2025</option>
          <option value={2024}>2024</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="rounded-lg border border-stroke bg-alabaster p-4 dark:border-strokedark dark:bg-black">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold uppercase text-waterloo">PAGU</span>
              <p className="text-lg font-bold text-black dark:text-white">: {formatCurrency(data.pagu)}</p>
            </div>
          </div>
          <div className="rounded-lg border border-stroke bg-alabaster p-4 dark:border-strokedark dark:bg-black">
            <div className="flex justify-between items-center text-primary">
              <span className="text-[10px] font-bold uppercase text-waterloo">REALISASI</span>
              <p className="text-lg font-bold">: {formatCurrency(data.realisasi)}</p>
            </div>
          </div>
          <div className="rounded-lg border border-stroke bg-alabaster p-4 dark:border-strokedark dark:bg-black">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold uppercase text-waterloo">PERSENTASE</span>
              <p className="text-lg font-bold text-black dark:text-white">: {data.persentase}%</p>
            </div>
          </div>
          <div className="mt-4 text-[10px] text-waterloo">
            <p>Terakhir diperbarui: {data.last_updated}</p>
            <p>*data diambil dari dashboard.sumbarprov.go.id</p>
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
              <p className="text-lg font-bold text-primary">{data.persentase}%</p>
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
    </div>
  );
};

export default BudgetCard;
