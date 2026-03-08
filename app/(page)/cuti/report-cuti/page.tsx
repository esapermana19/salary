"use client";
import { useState } from "react";
import { Search, FileSpreadsheet, Info, Calendar, X } from "lucide-react";

export default function ReportCutiPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedKaryawan, setSelectedKaryawan] = useState<any>(null);

  // Data Dummy Karyawan
  const [dataKaryawan] = useState([
    { id: "EMP001", nama: "Joko Wihh", divisi: "IT", total: 12, terpakai: 4, sisa: 8 },
    { id: "EMP002", nama: "Esa Permana", divisi: "HR", total: 12, terpakai: 2, sisa: 10 },
    { id: "EMP003", nama: "Yamal Ramadhan", divisi: "Marketing", total: 12, terpakai: 12, sisa: 0 },
    { id: "EMP004", nama: "Budi Santoso", divisi: "Finance", total: 15, terpakai: 5, sisa: 10 },
  ]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Halaman */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Report Saldo Cuti</h1>
          <p className="text-sm text-slate-500">Monitor saldo dan penggunaan cuti seluruh karyawan.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg text-sm font-semibold hover:bg-teal-600 transition-all shadow-sm">
          <FileSpreadsheet size={18} />
          Export Excel
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="Cari Karyawan..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-teal-500 transition-all"
          />
        </div>
        <div className="flex bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-lg items-center justify-between">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Total Saldo</span>
          <span className="text-lg font-bold text-emerald-700">450 Hari</span>
        </div>
        <div className="flex bg-red-50 border border-red-100 px-4 py-2 rounded-lg items-center justify-between">
          <span className="text-xs font-bold text-red-700 uppercase tracking-wider">Total Terpakai</span>
          <span className="text-lg font-bold text-red-700">124 Hari</span>
        </div>
      </div>

      {/* Tabel Data */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-700 text-sm">Data Penggunaan Cuti</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs font-bold text-slate-500 border-b border-slate-100">
                <th className="px-6 py-4">Karyawan</th>
                <th className="px-6 py-4">Divisi</th>
                <th className="px-6 py-4 text-center">Total</th>
                <th className="px-6 py-4 text-center">Terpakai</th>
                <th className="px-6 py-4 text-center">Sisa Saldo</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {dataKaryawan.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-700">{item.nama}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{item.id}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-medium">{item.divisi}</td>
                  <td className="px-6 py-4 text-center font-bold text-slate-700">{item.total}</td>
                  <td className="px-6 py-4 text-center font-bold text-red-500">{item.terpakai}</td>
                  <td className="px-6 py-4 text-center font-bold text-emerald-600">{item.sisa}</td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => setSelectedKaryawan(item)}
                      className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all"
                    >
                      <Info size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Detail History */}
      {selectedKaryawan && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <p className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">Detailed History</p>
                <h3 className="text-xl font-bold text-slate-800">{selectedKaryawan.nama}</h3>
              </div>
              <button onClick={() => setSelectedKaryawan(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} className="text-slate-400" />
              </button>
            </div>
            <div className="p-6">
               <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-slate-400 font-bold uppercase tracking-tighter border-b border-slate-50">
                      <th className="pb-3">Tanggal</th>
                      <th className="pb-3">Jenis</th>
                      <th className="pb-3 text-center">Durasi</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 font-semibold text-slate-600">
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-4">15 Feb 2024</td>
                      <td className="py-4">Tahunan</td>
                      <td className="py-4 text-center">3 Hari</td>
                      <td className="py-4 text-right text-emerald-500">APPROVED</td>
                    </tr>
                  </tbody>
               </table>
            </div>
            <div className="p-6 bg-slate-50 flex justify-end">
              <button onClick={() => setSelectedKaryawan(null)} className="px-6 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-100">Close History</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}