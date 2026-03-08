"use client";
import { useState, useEffect } from "react";
import { FileDown, Search, Calendar, Filter, UserCheck, AlertCircle } from "lucide-react";

export default function ReportPresensiPage() {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua Status");
  
  const [allReports, setAllReports] = useState([
    {
      id: 1,
      name: "Esa Permana",
      divisi: "IT Support",
      tanggal: "2026-03-08",
      jam: "08:15 / 17:00",
      status: "Hadir",
      ket: "Terlambat 15 Menit",
    },
    {
      id: 2,
      name: "Admin HRD",
      divisi: "HRD",
      tanggal: "2026-03-08",
      jam: "07:50 / 17:00",
      status: "Hadir",
      ket: "Tepat Waktu",
    },
    {
      id: 3,
      name: "Budi Santoso",
      divisi: "Marketing",
      tanggal: "2026-03-08",
      jam: "- / -",
      status: "Tidak Hadir",
      ket: "Tanpa Keterangan",
    },
  ]);

  const filteredData = allReports.filter((item: any) => {
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchDate = filterDate === "" || item.tanggal === filterDate;
    const matchStatus = filterStatus === "Semua Status" || 
      (filterStatus === "Terlambat" ? item.ket.includes("Terlambat") : item.status === filterStatus);

    return matchSearch && matchDate && matchStatus;
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (user && user.role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center p-6">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-slate-800">Akses Ditolak</h2>
        <p className="text-slate-500 mt-1 font-medium">Halaman ini hanya dapat diakses oleh Administrator & HRD.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-2">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">Laporan Presensi</h1>
          <p className="text-slate-500 font-medium text-xs mt-1">Rekapitulasi kehadiran seluruh karyawan secara real-time</p>
        </div>
        <button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-lg font-bold transition-all duration-200 text-sm shadow-md active:scale-95">
          <FileDown size={18} />
          <span>Export Excel</span>
        </button>
      </div>

      {/* Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="group">
          <label className="text-[11px] font-bold text-slate-500 ml-1 mb-1.5 block uppercase tracking-wider">Cari Nama</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Masukkan nama karyawan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm font-medium"
            />
          </div>
        </div>

        <div className="group">
          <label className="text-[11px] font-bold text-slate-500 ml-1 mb-1.5 block uppercase tracking-wider">Pilih Tanggal</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm font-medium text-slate-600"
            />
          </div>
        </div>

        <div className="group">
          <label className="text-[11px] font-bold text-slate-500 ml-1 mb-1.5 block uppercase tracking-wider">Filter Status</label>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm font-medium text-slate-600 cursor-pointer appearance-none"
            >
              <option value="Semua Status">Semua Status Kehadiran</option>
              <option value="Hadir">Hadir</option>
              <option value="Terlambat">Terlambat</option>
              <option value="Izin/Sakit">Izin/Sakit</option>
              <option value="Tidak Hadir">Tidak Hadir (Alpa)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabel Data Dinamis */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-slate-50/50 p-4 border-b border-slate-100 flex items-center gap-2">
          <div className="w-1 h-4 bg-teal-500 rounded-full"></div>
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Data Kehadiran</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-[10px] uppercase tracking-wider font-bold bg-slate-50/30">
                <th className="px-6 py-4">Karyawan</th>
                <th className="px-6 py-4 text-center">Tanggal</th>
                <th className="px-6 py-4 text-center">Jam (Masuk/Pulang)</th>
                <th className="px-6 py-4">Status Kehadiran</th>
                <th className="px-6 py-4">Keterangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-sm font-medium">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-800 group-hover:text-teal-600 transition-colors">{item.name}</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-tight font-bold">{item.divisi}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-slate-500 font-medium">{item.tanggal}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-2.5 py-1 bg-slate-100 rounded text-[11px] font-bold text-slate-600 tracking-tight">
                        {item.jam}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          item.status === "Hadir" ? "bg-teal-500" : "bg-red-500"
                        }`}></span>
                        <span className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider border ${
                          item.status === "Hadir" 
                          ? "bg-teal-50 text-teal-700 border-teal-100" 
                          : "bg-red-50 text-red-700 border-red-100"
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[11px] font-bold ${
                        item.ket.includes("Terlambat") ? "text-orange-600 bg-orange-50 px-2 py-1 rounded border border-orange-100" : "text-teal-600"
                      }`}>
                        {item.ket}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center opacity-40">
                      <Search size={32} className="mb-2" />
                      <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Data tidak ditemukan</p>
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