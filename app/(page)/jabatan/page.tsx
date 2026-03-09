"use client";

import React, { useState } from "react";
import { Plus, Trash2, Edit, Save, X, Briefcase, Search } from "lucide-react";

export default function JabatanPage() {
  const [showForm, setShowForm] = useState(false);
  const [namaJabatan, setNamaJabatan] = useState("");
  const [Divisi, setDivisi] = useState("");
  const [gajiPokok, setGajiPokok] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [dataJabatan, setDataJabatan] = useState([
    { id: 1, nama: "Manager", divisi: "Teknologi Informasi", gaji: "10.000.000" },
    { id: 2, nama: "Staff Administrasi", divisi: "Keuangan", gaji: "5.000.000" },
    { id: 3, nama: "Software Engineer", divisi: "Teknologi Informasi", gaji: "8.500.000" },
    { id: 4, nama: "HR Specialist", divisi: "Sumber Daya Manusia", gaji: "7.000.000" },
  ]);

  // Fungsi Filter Dinamis
  const filteredJabatan = dataJabatan.filter((item) =>
    item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.divisi.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTambahData = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaJabatan || !gajiPokok) return;

    const newData = {
      id: dataJabatan.length + 1,
      nama: namaJabatan,
      divisi: Divisi,
      gaji: parseInt(gajiPokok).toLocaleString("id-ID"),
    };

    setDataJabatan([...dataJabatan, newData]);
    setNamaJabatan("");
    setDivisi("");
    setGajiPokok("");
    setShowForm(false);
  };

  return (
    <div className="space-y-6 p-2">
      {/* Header Halaman */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">Data Jabatan</h1>
          <p className="text-slate-500 font-medium text-xs mt-1">Kelola tingkatan posisi dan standar gaji pokok karyawan</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold transition-all duration-200 text-sm ${
            showForm 
              ? "bg-slate-100 text-slate-600 hover:bg-slate-200" 
              : "bg-teal-500 text-white hover:bg-teal-600 shadow-md shadow-teal-500/20 active:scale-95"
          }`}
        >
          {showForm ? <><X size={18} /> Batal</> : <><Plus size={18} /> Tambah Jabatan</>}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* FORM TAMBAH JABATAN */}
        {showForm && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-top-2 duration-300 text-slate-800">
            <div className="flex items-center gap-2 mb-6">
              <Briefcase size={20} className="text-teal-500" />
              <h2 className="text-md font-bold">Tambah Jabatan Baru</h2>
            </div>
            
            <form onSubmit={handleTambahData} className="grid grid-cols-1 md:grid-cols-4 gap-5 items-end">
              <div className="group">
                <label className="text-[11px] font-bold text-slate-500 ml-1 mb-1.5 block group-hover:text-teal-600 transition-colors uppercase tracking-wider">
                  Nama Jabatan
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Manager"
                  value={namaJabatan}
                  onChange={(e) => setNamaJabatan(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm font-medium bg-slate-50/50 focus:bg-white"
                  required
                />
              </div>

              <div className="group">
                <label className="text-[11px] font-bold text-slate-500 ml-1 mb-1.5 block group-hover:text-teal-600 transition-colors uppercase tracking-wider">
                  Divisi
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Teknologi Informasi"
                  value={Divisi}
                  onChange={(e) => setDivisi(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm font-medium bg-slate-50/50 focus:bg-white text-slate-700"
                  required
                />
              </div>

              <div className="group">
                <label className="text-[11px] font-bold text-slate-500 ml-1 mb-1.5 block group-hover:text-teal-600 transition-colors uppercase tracking-wider">
                  Gaji Pokok (Rp)
                </label>
                <input
                  type="number"
                  placeholder="8500000"
                  value={gajiPokok}
                  onChange={(e) => setGajiPokok(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm font-medium bg-slate-50/50 focus:bg-white"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-slate-800 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-teal-600 active:bg-teal-700 transition-all flex items-center justify-center gap-2 text-sm shadow-sm h-[44px]"
              >
                <Save size={18} /> Simpan Jabatan
              </button>
            </form>
          </div>
        )}

        {/* SEARCH & VIEW DATA JABATAN */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Header Tabel & Search */}
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="w-1 h-4 bg-teal-500 rounded-full"></div>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Riwayat Posisi & Gaji</span>
              <span className="ml-2 text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded font-bold uppercase">
                {filteredJabatan.length} Total
              </span>
            </div>

            {/* Input Pencarian */}
            <div className="relative w-full md:w-64 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" size={16} />
              <input
                type="text"
                placeholder="Cari jabatan atau divisi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-teal-500/10 focus:border-teal-500 transition-all text-xs font-medium text-slate-700 shadow-sm"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-[10px] uppercase tracking-wider font-bold bg-slate-50/30">
                  <th className="px-6 py-4 w-16 text-center">No</th>
                  <th className="px-6 py-4">Nama Jabatan</th>
                  <th className="px-6 py-4">Divisi Terkait</th>
                  <th className="px-6 py-4">Gaji Pokok</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 text-sm font-medium">
                {filteredJabatan.length > 0 ? (
                  filteredJabatan.map((item, index) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-6 py-4 text-center text-slate-400 font-medium">{index + 1}</td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-slate-800 group-hover:text-teal-600 transition-colors tracking-tight">{item.nama}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-500 rounded text-[10px] font-bold uppercase">
                          {item.divisi}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <span className="text-teal-600 font-bold mr-1.5 text-xs italic">Rp</span>
                          <span className="font-bold text-slate-800 tracking-tighter">{item.gaji}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-1">
                          <button className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-md transition-all">
                            <Edit size={16} />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center opacity-40">
                        <Search size={32} className="mb-2 text-slate-400" />
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Jabatan tidak ditemukan</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}