"use client";
import { useState } from "react";
import { Search, FileSpreadsheet, Info, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function ReportCutiPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedKaryawan, setSelectedKaryawan] = useState<any>(null);
  
  // State untuk Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Data Dummy Karyawan (Ditambah agar pagination aktif)
  const [dataKaryawan] = useState([
    { id: "EMP001", nama: "Joko Wihh", divisi: "IT", total: 12, terpakai: 4, sisa: 8 },
    { id: "EMP002", nama: "Esa Permana", divisi: "HR", total: 12, terpakai: 2, sisa: 10 },
    { id: "EMP003", nama: "Yamal Ramadhan", divisi: "Marketing", total: 12, terpakai: 12, sisa: 0 },
    { id: "EMP004", nama: "Budi Santoso", divisi: "Finance", total: 15, terpakai: 5, sisa: 10 },
    { id: "EMP005", nama: "Robert Lewandowski", divisi: "Marketing", total: 12, terpakai: 3, sisa: 9 },
    { id: "EMP006", nama: "Pedri Gonzalez", divisi: "IT Support", total: 12, terpakai: 1, sisa: 11 },
    { id: "EMP007", nama: "Gavi Paez", divisi: "Creative", total: 12, terpakai: 0, sisa: 12 },
  ]);

  // Logic Filtering
  const filteredKaryawan = dataKaryawan.filter((item) =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.divisi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Logic Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredKaryawan.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredKaryawan.length / itemsPerPage);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-2 text-slate-800">
      {/* Header Halaman */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Report Saldo Cuti</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">Monitor saldo dan penggunaan cuti seluruh karyawan secara berkala.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 text-white rounded-lg text-sm font-bold hover:bg-teal-600 transition-all shadow-md active:scale-95">
          <FileSpreadsheet size={18} />
          Export Excel
        </button>
      </div>

      {/* Filter & Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-slate-800">
        <div className="relative group">
          <label className="text-[11px] font-bold text-slate-500 ml-1 mb-1.5 block uppercase tracking-wider">Cari Karyawan</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" size={18} />
            <input 
              type="text"
              placeholder="Nama, ID, atau Divisi..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-300 rounded-lg text-sm font-medium outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-slate-700"
            />
          </div>
        </div>
        <div className="flex bg-emerald-50 border border-emerald-100 px-5 py-3 rounded-xl items-center justify-between shadow-sm shadow-emerald-100/50">
          <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Total Saldo Keseluruhan</span>
          <span className="text-xl font-black text-emerald-700 tracking-tighter">450 <span className="text-xs">Hari</span></span>
        </div>
        <div className="flex bg-rose-50 border border-rose-100 px-5 py-3 rounded-xl items-center justify-between shadow-sm shadow-rose-100/50">
          <span className="text-[10px] font-black text-rose-700 uppercase tracking-widest">Total Cuti Terpakai</span>
          <span className="text-xl font-black text-rose-700 tracking-tighter">124 <span className="text-xs">Hari</span></span>
        </div>
      </div>

      {/* Tabel Data */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-slate-800">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
          <div className="w-1 h-4 bg-teal-500 rounded-full"></div>
          <h2 className="font-bold text-slate-600 text-[10px] uppercase tracking-widest">Data Penggunaan Cuti</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/30 border-b border-slate-100">
                <th className="px-6 py-4">Karyawan</th>
                <th className="px-6 py-4">Divisi</th>
                <th className="px-6 py-4 text-center">Total Jatah</th>
                <th className="px-6 py-4 text-center">Terpakai</th>
                <th className="px-6 py-4 text-center">Sisa Saldo</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm font-medium">
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-800 group-hover:text-teal-600 transition-colors">{item.nama}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{item.id}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs font-bold uppercase">{item.divisi}</td>
                    <td className="px-6 py-4 text-center font-bold text-slate-700">{item.total}</td>
                    <td className="px-6 py-4 text-center font-bold text-rose-600 bg-rose-50/30">{item.terpakai}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-md font-black text-xs ${item.sisa === 0 ? "text-slate-400 bg-slate-100" : "text-emerald-700 bg-emerald-50 border border-emerald-100"}`}>
                        {item.sisa}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedKaryawan(item)}
                        className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all"
                      >
                        <Info size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400 text-xs font-bold uppercase tracking-widest opacity-40">
                    Karyawan tidak ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION CONTROLS */}
        <div className="p-4 border-t border-slate-100 bg-white flex flex-col md:flex-row justify-between items-center gap-4 text-slate-800">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            Menampilkan <span className="text-slate-700">{indexOfFirstItem + 1}</span> - <span className="text-slate-700">{Math.min(indexOfLastItem, filteredKaryawan.length)}</span> dari <span className="text-slate-700">{filteredKaryawan.length}</span> Karyawan
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
                  ? "bg-teal-500 text-white shadow-md shadow-teal-500/20 border-teal-500" 
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

      {/* Modal Detail History (Same as before but with better colors) */}
      {selectedKaryawan && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200 text-slate-800">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
              <div>
                <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest">Riwayat Cuti Terperinci</p>
                <h3 className="text-xl font-black text-slate-800">{selectedKaryawan.nama}</h3>
              </div>
              <button onClick={() => setSelectedKaryawan(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
               <table className="w-full text-left text-xs">
                 <thead>
                   <tr className="text-slate-400 font-bold uppercase tracking-widest border-b border-slate-100">
                     <th className="pb-3 px-2">Tanggal Ambil</th>
                     <th className="pb-3">Jenis Cuti</th>
                     <th className="pb-3 text-center">Durasi</th>
                     <th className="pb-3 text-right">Status Akselerasi</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50 font-bold text-slate-600">
                   <tr className="hover:bg-slate-50/50">
                     <td className="py-4 px-2">15 Feb 2026</td>
                     <td className="py-4">Cuti Tahunan</td>
                     <td className="py-4 text-center">3 Hari</td>
                     <td className="py-4 text-right">
                        <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-md border border-emerald-100">APPROVED</span>
                     </td>
                   </tr>
                   <tr className="hover:bg-slate-50/50">
                     <td className="py-4 px-2">02 Jan 2026</td>
                     <td className="py-4">Cuti Tahunan</td>
                     <td className="py-4 text-center">1 Hari</td>
                     <td className="py-4 text-right text-emerald-500">
                        <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-md border border-emerald-100">APPROVED</span>
                     </td>
                   </tr>
                 </tbody>
               </table>
            </div>
            <div className="p-6 bg-slate-50 flex justify-end">
              <button 
                onClick={() => setSelectedKaryawan(null)} 
                className="px-6 py-2.5 bg-white border border-slate-300 rounded-lg text-xs font-black text-slate-600 hover:bg-slate-100 transition-all uppercase tracking-widest shadow-sm"
              >
                Tutup Riwayat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}