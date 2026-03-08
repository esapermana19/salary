"use client";
import { useState } from "react";
import { Search, Calculator, Edit3, X, CreditCard, Users, History, CalendarDays } from "lucide-react";

export default function ProsesGajiPage() {
  const [selectedKaryawan, setSelectedKaryawan] = useState<any>(null);
  
  // Format state default ke YYYY-MM untuk input type="month"
  const [selectedMonth, setSelectedMonth] = useState("2026-03");

  const [dataGaji] = useState([
    { id: "EMP001", nama: "Yamal Ramadhan", posisi: "Frontend Developer", pokok: 12000000, tambahan: 500000, potongan: 0, total: 12500000 },
    { id: "EMP002", nama: "Joao Cancelo", posisi: "UI/UX Designer", pokok: 10000000, tambahan: 200000, potongan: 100000, total: 10100000 },
    { id: "EMP003", nama: "Bernal", posisi: "Backend Developer", pokok: 11000000, tambahan: 0, potongan: 200000, total: 10800000 },
    { id: "EMP004", nama: "Fermin", posisi: "DevOps Engineer", pokok: 13000000, tambahan: 1000000, potongan: 0, total: 14000000 },
  ]);

  const formatIDR = (val: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10">
      {/* Header & Date-Style Month Picker */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Proses Gaji Bulanan</h1>
          <p className="text-sm text-slate-500 font-medium">Generate dan hitung gaji seluruh karyawan dalam satu klik.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Custom Month Picker Container */}
          <div className="relative group flex-1 md:flex-none">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors">
              <CalendarDays size={18} />
            </div>
            <input 
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full md:w-48 pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-teal-500 shadow-sm cursor-pointer uppercase"
            />
          </div>

          <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-teal-500 text-white rounded-lg text-sm font-bold hover:bg-teal-600 transition-all shadow-md shadow-teal-100 active:scale-95">
            <Calculator size={18} />
            Proses Gaji
          </button>
        </div>
      </div>

      {/* Ringkasan Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Pengeluaran Gaji", value: "Rp 47.400.000", icon: <CreditCard className="text-blue-600" />, bg: "bg-blue-50", border: "border-blue-100" },
          { label: "Total Karyawan", value: "4 Orang", icon: <Users className="text-purple-600" />, bg: "bg-purple-50", border: "border-purple-100" },
          { label: "Status Periode", value: "DRAFT", icon: <History className="text-amber-600" />, bg: "bg-amber-50", border: "border-amber-100" },
        ].map((stat, idx) => (
          <div key={idx} className={`bg-white p-5 rounded-xl border ${stat.border} shadow-sm flex items-center justify-between`}>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
              <span className="text-xl font-bold text-slate-800">{stat.value}</span>
            </div>
            <div className={`p-3 rounded-lg ${stat.bg}`}>{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* Sisanya tetap sama seperti sebelumnya (Tabel & Modal) */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="Cari nama karyawan..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-teal-500 transition-all"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto font-medium">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-bold text-slate-500 border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-4">Karyawan</th>
                <th className="px-6 py-4">Gaji Pokok</th>
                <th className="px-6 py-4">Uang Cuti</th>
                <th className="px-6 py-4 text-red-500">Potongan</th>
                <th className="px-6 py-4">Total Diterima</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {dataGaji.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-slate-800 font-bold">{item.nama}</p>
                    <p className="text-[10px] text-slate-400 font-semibold">{item.id} • {item.posisi}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{formatIDR(item.pokok)}</td>
                  <td className="px-6 py-4 text-emerald-600">+{formatIDR(item.tambahan)}</td>
                  <td className="px-6 py-4 text-red-500">-{formatIDR(item.potongan)}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">{formatIDR(item.total)}</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedKaryawan(item)}
                      className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all"
                    >
                      <Edit3 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Calculation Breakdown tetap konsisten dengan style rounded-xl */}
      {selectedKaryawan && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Isi modal sama seperti sebelumnya */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <p className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">Calculation Breakdown</p>
                <h3 className="text-xl font-bold text-slate-800">{selectedKaryawan.nama}</h3>
              </div>
              <button onClick={() => setSelectedKaryawan(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} className="text-slate-400" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="space-y-3 text-sm font-semibold">
                <div className="flex justify-between text-slate-500">
                  <span>Gaji Pokok</span>
                  <span className="text-slate-800">{formatIDR(selectedKaryawan.pokok)}</span>
                </div>
                <div className="flex justify-between text-emerald-600">
                  <span>Uang Cuti (Tambahan)</span>
                  <span>+{formatIDR(selectedKaryawan.tambahan)}</span>
                </div>
                <div className="flex justify-between text-red-500">
                  <span>Potongan</span>
                  <span>-{formatIDR(selectedKaryawan.potongan)}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg flex justify-between items-center border border-slate-100 font-bold">
                <span className="text-xs text-slate-400 uppercase">Total Gaji Netto</span>
                <span className="text-lg text-slate-900">{formatIDR(selectedKaryawan.total)}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button className="py-2.5 bg-teal-500 text-white rounded-lg text-xs font-bold hover:bg-teal-600 transition-all">Simpan</button>
                <button onClick={() => setSelectedKaryawan(null)} className="py-2.5 bg-white border border-slate-200 text-slate-500 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all">Tutup</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}