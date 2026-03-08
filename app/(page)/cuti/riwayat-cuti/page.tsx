"use client";
import { useState } from "react";
import { Calendar, Clock, CheckCircle2, XCircle } from "lucide-react";

export default function RiwayatCutiPage() {
  // State untuk menyimpan status filter aktif
  const [filterStatus, setFilterStatus] = useState("Semua");

  // Data Dummy Riwayat sesuai referensi
  const riwayatData = [
    { id: 1, jenis: "Tahunan", tanggal: "15 Feb - 17 Feb 2024", durasi: "3 Hari", alasan: "Acara Keluarga", status: "APPROVED" },
    { id: 2, jenis: "Sakit", tanggal: "10 Jan - 11 Jan 2024", durasi: "1 Hari", alasan: "Flu & Demam", status: "APPROVED" },
    { id: 3, jenis: "Tahunan", tanggal: "10 Mar - 12 Mar 2024", durasi: "3 Hari", alasan: "Liburan Akhir Pekan", status: "PENDING" },
    { id: 4, jenis: "Alasan Penting", tanggal: "01 Feb 2024", durasi: "1 Hari", alasan: "Urusan Dokumen", status: "REJECTED" },
  ];

  // Logika Filter: Menyaring data berdasarkan status yang dipilih
  const dataTerfilter = riwayatData.filter((item) => {
    if (filterStatus === "Semua") return true;
    return item.status === filterStatus.toUpperCase();
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header Halaman */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight text-[22px]">Riwayat Pengajuan Cuti</h1>
          <p className="text-sm text-slate-500 font-medium">Pantau status dan sisa kuota cuti Anda.</p>
        </div>
        <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-100">
          <button className="px-4 py-2 bg-white shadow-sm border border-slate-200 rounded-lg text-[11px] font-black text-slate-700 uppercase tracking-wider">Tahun 2026</button>
        </div>
      </div>

      {/* Grid Statistik Cuti */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Cuti", value: "12", unit: "Hari / Tahun", icon: <Calendar className="text-blue-500" />, bg: "bg-blue-50" },
          { label: "Cuti Diambil", value: "4", unit: "Hari", icon: <Calendar className="text-red-500" />, bg: "bg-red-50" },
          { label: "Sisa Cuti", value: "8", unit: "Hari Tersisa", icon: <Clock className="text-teal-500" />, bg: "bg-teal-50" },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-7 rounded-[2rem] border border-slate-200 shadow-sm flex items-center justify-between group hover:border-teal-500 transition-all cursor-default">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-slate-800 tracking-tighter">{stat.value}</span>
                <span className="text-[11px] font-bold text-slate-400">{stat.unit}</span>
              </div>
            </div>
            <div className={`p-4 rounded-2xl ${stat.bg} group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Tabel Riwayat dengan Filter Aktif */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <h2 className="text-lg font-black text-slate-800 tracking-tight">Riwayat Pengajuan</h2>
          
          {/* Sistem Filter Interaktif */}
          <div className="flex items-center bg-slate-100/80 p-1.5 rounded-2xl gap-1">
            {["Semua", "Pending", "Approved", "Rejected"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-5 py-2 rounded-xl text-[11px] font-black transition-all duration-300 ${
                  filterStatus === status 
                  ? "bg-teal-600 text-white shadow-lg shadow-teal-100" // Style Teal saat Aktif
                  : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] border-y border-slate-100">
                <th className="px-8 py-5">Jenis Cuti</th>
                <th className="px-8 py-5">Tanggal</th>
                <th className="px-8 py-5 text-center">Durasi</th>
                <th className="px-8 py-5">Alasan</th>
                <th className="px-8 py-5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {dataTerfilter.length > 0 ? (
                dataTerfilter.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group animate-in fade-in duration-500">
                    <td className="px-8 py-6">
                      <span className="px-4 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-[11px] font-black uppercase tracking-wide">
                        {item.jenis}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-sm font-bold text-slate-600 tracking-tight">{item.tanggal}</td>
                    <td className="px-8 py-6 text-center text-sm font-black text-slate-800">{item.durasi}</td>
                    <td className="px-8 py-6 text-xs italic text-slate-400 font-medium group-hover:text-slate-600 transition-colors">"{item.alasan}"</td>
                    <td className="px-8 py-6">
                      <div className="flex justify-center">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black flex items-center gap-1.5 shadow-sm border ${
                          item.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                          item.status === 'PENDING' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-red-50 text-red-600 border-red-100'
                        }`}>
                          {item.status === 'APPROVED' && <CheckCircle2 size={12} />}
                          {item.status === 'PENDING' && <Clock size={12} />}
                          {item.status === 'REJECTED' && <XCircle size={12} />}
                          {item.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-slate-400 text-sm font-medium italic">
                    Tidak ada data pengajuan dengan status "{filterStatus}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Footer Tabel */}
        <div className="p-6 bg-slate-50/50 border-t border-slate-100 text-center">
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
            Menampilkan {dataTerfilter.length} dari {riwayatData.length} Total Pengajuan
          </p>
        </div>
      </div>
    </div>
  );
}