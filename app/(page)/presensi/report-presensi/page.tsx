"use client";
import { useState, useEffect } from "react";
import { FileDown, Search, Calendar, Filter, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";

export default function ReportPresensiPage() {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua Status");
  
  // State untuk Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [allReports, setAllReports] = useState([
    { id: 1, name: "Esa Permana", divisi: "IT Support", tanggal: "2026-03-08", jam: "08:15 / 17:00", status: "Hadir", ket: "Terlambat 15 Menit" },
    { id: 2, name: "Hansi Flick", divisi: "Manager", tanggal: "2026-03-08", jam: "07:50 / 17:00", status: "Hadir", ket: "Tepat Waktu" },
    { id: 3, name: "Lamine Yamal", divisi: "Creative", tanggal: "2026-03-08", jam: "- / -", status: "Tidak Hadir", ket: "Tanpa Keterangan" },
    { id: 4, name: "Robert Lewandowski", divisi: "Marketing", tanggal: "2026-03-08", jam: "07:55 / 17:00", status: "Hadir", ket: "Tepat Waktu" },
    { id: 5, name: "Pedri Gonzalez", divisi: "IT Support", tanggal: "2026-03-08", jam: "08:30 / 17:00", status: "Hadir", ket: "Terlambat 30 Menit" },
    { id: 6, name: "Gavi Paez", divisi: "Creative", tanggal: "2026-03-08", jam: "07:45 / 17:00", status: "Hadir", ket: "Tepat Waktu" },
    { id: 7, name: "Frenkie de Jong", divisi: "Finance", tanggal: "2026-03-08", jam: "08:05 / 17:00", status: "Hadir", ket: "Terlambat 5 Menit" },
    { id: 8, name: "Raphinha Belloli", divisi: "Marketing", tanggal: "2026-03-08", jam: "07:50 / 17:00", status: "Hadir", ket: "Tepat Waktu" },
  ]);

  // Logic Filtering
  const filteredData = allReports.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchDate = filterDate === "" || item.tanggal === filterDate;
    const matchStatus = filterStatus === "Semua Status" || 
      (filterStatus === "Terlambat" ? item.ket.includes("Terlambat") : item.status === filterStatus);

    return matchSearch && matchDate && matchStatus;
  });

  // Logic Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Reset ke halaman 1 saat filter berubah
  const handleFilterChange = (type: string, value: string) => {
    if (type === "search") setSearchQuery(value);
    if (type === "date") setFilterDate(value);
    if (type === "status") setFilterStatus(value);
    setCurrentPage(1);
  };

  if (user && user.role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center p-6 text-slate-800">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h2 className="text-xl font-bold">Akses Ditolak</h2>
        <p className="text-slate-500 mt-1 font-medium">Halaman ini hanya dapat diakses oleh Administrator & HRD.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-2 text-slate-800">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Laporan Presensi</h1>
          <p className="text-slate-500 font-medium text-xs mt-1 text-slate-400">Rekapitulasi kehadiran seluruh karyawan secara real-time</p>
        </div>
        <button className="flex items-center gap-2 bg-slate-800 hover:bg-teal-600 text-white px-5 py-2.5 rounded-lg font-bold transition-all duration-200 text-sm shadow-md active:scale-95">
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
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm font-medium text-slate-700"
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
              onChange={(e) => handleFilterChange("date", e.target.value)}
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
              onChange={(e) => handleFilterChange("status", e.target.value)}
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
        <div className="bg-slate-50/50 p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-teal-500 rounded-full"></div>
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Rekap Data Kehadiran</span>
          </div>
          <span className="text-[10px] font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded uppercase tracking-tighter">
            {filteredData.length} Total Records
          </span>
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
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
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

        {/* PAGINATION CONTROLS */}
        <div className="p-4 border-t border-slate-100 bg-white flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            Menampilkan <span className="text-slate-700">{indexOfFirstItem + 1}</span> - <span className="text-slate-700">{Math.min(indexOfLastItem, filteredData.length)}</span> dari <span className="text-slate-700">{filteredData.length}</span> Data
          </p>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-30 transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${
                  currentPage === i + 1 
                  ? "bg-teal-500 text-white shadow-md shadow-teal-500/20" 
                  : "text-slate-500 hover:bg-slate-100 border border-transparent"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-30 transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}