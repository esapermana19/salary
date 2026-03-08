"use client";
import { useState, useMemo } from "react";
import { Search, FileSpreadsheet, CreditCard, Wallet, BadgePercent, Users, CalendarDays } from "lucide-react";

export default function ReportGajiPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // 1. Pastikan default state menggunakan format YYYY-MM agar sinkron dengan input type="month"
  const [selectedMonth, setSelectedMonth] = useState("2026-03");

  // 2. Pastikan properti 'periode' di data dummy juga menggunakan format YYYY-MM
  const [dataGaji] = useState([
    { id: "EMP001", nama: "Yamal Ramadhan", posisi: "Frontend Developer", pokok: 12000000, cuti: 500000, potongan: 0, total: 12500000, status: "PAID", periode: "2026-03" },
    { id: "EMP002", nama: "Joao Cancelo", posisi: "UI/UX Designer", pokok: 10000000, cuti: 200000, potongan: 100000, total: 10100000, status: "PAID", periode: "2026-03" },
    { id: "EMP003", nama: "Bernal", posisi: "Backend Developer", pokok: 11000000, cuti: 0, potongan: 200000, total: 10800000, status: "PAID", periode: "2026-03" },
    { id: "EMP004", nama: "Fermin", posisi: "DevOps Engineer", pokok: 13000000, cuti: 1000000, potongan: 0, total: 14000000, status: "PAID", periode: "2026-03" },
    // Contoh data bulan berbeda untuk tes filter
    { id: "EMP005", nama: "Ahmad Fauzi", posisi: "Manager IT", pokok: 15000000, cuti: 500000, potongan: 200000, total: 15300000, status: "PAID", periode: "2026-02" },
  ]);

  // 3. Logika Filter yang membandingkan string YYYY-MM
  const filteredData = useMemo(() => {
    return dataGaji.filter(item => {
      const matchMonth = item.periode === selectedMonth;
      const matchSearch = item.nama.toLowerCase().includes(searchTerm.toLowerCase());
      return matchMonth && matchSearch;
    });
  }, [selectedMonth, searchTerm, dataGaji]);

  const formatIDR = (val: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Laporan Gaji Karyawan</h1>
          <p className="text-sm text-slate-500 font-medium">Monitoring rekapitulasi penggajian seluruh divisi.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative group">
            <CalendarDays size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
            <input 
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-teal-500 shadow-sm cursor-pointer transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-teal-500 text-white rounded-lg text-sm font-bold hover:bg-teal-600 transition-all shadow-sm">
            <FileSpreadsheet size={18} />
            Export Excel
          </button>
        </div>
      </div>

      {/* Kartu Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Payroll", value: formatIDR(filteredData.reduce((a, b) => a + b.total, 0)), icon: <CreditCard className="text-blue-600" />, bg: "bg-blue-50" },
          { label: "Total Potongan", value: formatIDR(filteredData.reduce((a, b) => a + b.potongan, 0)), icon: <BadgePercent className="text-red-600" />, bg: "bg-red-50" },
          { label: "Uang Cuti Dibayar", value: formatIDR(filteredData.reduce((a, b) => a + b.cuti, 0)), icon: <Wallet className="text-emerald-600" />, bg: "bg-emerald-50" },
          { label: "Jumlah Karyawan", value: `${filteredData.length} Orang`, icon: <Users className="text-purple-600" />, bg: "bg-purple-50" },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
              <span className="text-lg font-bold text-slate-800">{stat.value}</span>
            </div>
            <div className={`p-3 rounded-lg ${stat.bg}`}>{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* Tabel dengan Style Report Cuti (Rounded-XL) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-sm">
        <div className="p-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
          <h2 className="font-bold text-slate-700">Rincian Laporan Gaji</h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text"
              placeholder="Cari karyawan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-4">Karyawan</th>
                <th className="px-6 py-4">Gaji Pokok</th>
                <th className="px-6 py-4">Uang Cuti</th>
                <th className="px-6 py-4 text-red-500">Potongan</th>
                <th className="px-6 py-4 font-bold">Total Netto</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-medium">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-5">
                      <p className="text-slate-800 font-bold">{item.nama}</p>
                      <p className="text-[10px] text-slate-400 font-semibold uppercase">{item.id} • {item.posisi}</p>
                    </td>
                    <td className="px-6 py-5 text-slate-600">{formatIDR(item.pokok)}</td>
                    <td className="px-6 py-5 text-emerald-600">+{formatIDR(item.cuti)}</td>
                    <td className="px-6 py-5 text-red-400">-{formatIDR(item.potongan)}</td>
                    <td className="px-6 py-5 font-bold text-slate-900">{formatIDR(item.total)}</td>
                    <td className="px-6 py-5 text-center">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black tracking-tight">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Search size={32} className="text-slate-200" />
                      <p className="text-slate-400 font-bold italic">Tidak ada data gaji untuk bulan {selectedMonth}</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}