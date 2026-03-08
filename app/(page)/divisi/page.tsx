"use client";

import React, { useState } from "react";
import { Plus, Trash2, Edit, List, Save, X, Building2 } from "lucide-react";

export default function DivisiPage() {
  const [showForm, setShowForm] = useState(false);
  const [namaDivisi, setNamaDivisi] = useState("");

  const [dataDivisi, setDataDivisi] = useState([
    { id: 1, nama: "Teknologi Informasi" },
    { id: 2, nama: "Sumber Daya Manusia" },
    { id: 3, nama: "Keuangan" },
  ]);

  const handleTambahData = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaDivisi) return;

    const newData = {
      id: dataDivisi.length + 1,
      nama: namaDivisi,
    };

    setDataDivisi([...dataDivisi, newData]);
    setNamaDivisi("");
    setShowForm(false);
  };

  return (
    <div className="space-y-6 p-2">
      {/* Header Halaman */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">Data Divisi</h1>
          <p className="text-slate-500 font-medium text-xs mt-1">Kelola dan organisir daftar divisi perusahaan</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold transition-all duration-200 text-sm ${
            showForm 
              ? "bg-slate-100 text-slate-600 hover:bg-slate-200" 
              : "bg-teal-500 text-white hover:bg-teal-600 shadow-md shadow-teal-500/20 active:scale-95"
          }`}
        >
          {showForm ? <><X size={18} /> Batal</> : <><Plus size={18} /> Tambah Divisi</>}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* FORM TAMBAH DATA */}
        {showForm && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-2 mb-5 text-slate-800">
              <Building2 size={20} className="text-teal-500" />
              <h2 className="text-md font-bold">Tambah Divisi Baru</h2>
            </div>
            
            <form onSubmit={handleTambahData} className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 group">
                <label className="text-[11px] font-bold text-slate-500 ml-1 mb-1.5 block group-hover:text-teal-600 transition-colors uppercase tracking-wider">
                  Nama Divisi
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Pemasaran"
                  value={namaDivisi}
                  onChange={(e) => setNamaDivisi(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm font-medium bg-slate-50/50 focus:bg-white"
                  required
                />
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full md:w-auto bg-slate-800 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-teal-600 active:bg-teal-700 transition-all flex items-center justify-center gap-2 text-sm shadow-sm"
                >
                  <Save size={18} /> Simpan
                </button>
              </div>
            </form>
          </div>
        )}

        {/* VIEW DATA (Tabel) */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-teal-500 rounded-full"></div>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Daftar Divisi</span>
            </div>
            <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded font-bold">
              {dataDivisi.length} TOTAL
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-[10px] uppercase tracking-wider font-bold bg-slate-50/30">
                  <th className="px-6 py-4">No</th>
                  <th className="px-6 py-4">Nama Divisi</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 text-sm">
                {dataDivisi.map((item, index) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4 text-slate-400 font-medium">{index + 1}</td>
                    <td className="px-6 py-4">
                      <span className="font-semibold group-hover:text-teal-600 transition-colors">{item.nama}</span>
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}