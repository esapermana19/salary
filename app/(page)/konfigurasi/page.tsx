"use client";

import React, { useState } from "react";
import { Plus, Trash2, Edit, List, Save, X, Settings2 } from "lucide-react";

export default function KonfigurasiPage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    tahun: "",
    jatahCuti: "",
    nilaiUang: "",
    status: ""
  });

  const [dataKonfigurasi, setDataKonfigurasi] = useState([
    { id: 1, tahun: "2024", jatahCuti: "12", nilaiUang: "150000", status: "aktif" },
    { id: 2, tahun: "2023", jatahCuti: "12", nilaiUang: "125000", status: "nonaktif" },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTambahData = (e: React.FormEvent) => {
    e.preventDefault();
    const newData = {
      id: dataKonfigurasi.length + 1,
      tahun: formData.tahun,
      jatahCuti: formData.jatahCuti,
      nilaiUang: formData.nilaiUang,
      status: formData.status,
    };

    setDataKonfigurasi([...dataKonfigurasi, newData]);
    setFormData({ tahun: "", jatahCuti: "", nilaiUang: "", status: "" });
    setShowForm(false);
  };

  return (
    <div className="space-y-6 p-2">
      {/* Header Halaman */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">Konfigurasi Sistem</h1>
          <p className="text-slate-500 font-medium text-xs mt-1">Atur parameter jatah cuti tahunan dan kompensasi</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold transition-all duration-200 text-sm ${
            showForm 
              ? "bg-slate-100 text-slate-600 hover:bg-slate-200" 
              : "bg-teal-500 text-white hover:bg-teal-600 shadow-md shadow-teal-500/20 active:scale-95"
          }`}
        >
          {showForm ? <><X size={18} /> Batal</> : <><Plus size={18} /> Tambah Konfigurasi</>}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* FORM TAMBAH KONFIGURASI */}
        {showForm && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-top-2 duration-300 text-slate-800">
            <div className="flex items-center gap-2 mb-6">
              <Settings2 size={20} className="text-teal-500" />
              <h2 className="text-md font-bold">Pengaturan Parameter Baru</h2>
            </div>
            
            <form onSubmit={handleTambahData} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="group">
                <label className="text-[11px] font-bold text-slate-500 ml-1 mb-1.5 block group-hover:text-teal-600 transition-colors uppercase tracking-wider">
                  Tahun Berlaku
                </label>
                <input
                  name="tahun"
                  type="number"
                  placeholder="2024"
                  value={formData.tahun}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm font-medium bg-slate-50/50 focus:bg-white"
                  required
                />
              </div>

              <div className="group">
                <label className="text-[11px] font-bold text-slate-500 ml-1 mb-1.5 block group-hover:text-teal-600 transition-colors uppercase tracking-wider">
                  Jatah Cuti (Hari)
                </label>
                <input
                  name="jatahCuti"
                  type="number"
                  placeholder="12"
                  value={formData.jatahCuti}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm font-medium bg-slate-50/50 focus:bg-white"
                  required
                />
              </div>

              <div className="group">
                <label className="text-[11px] font-bold text-slate-500 ml-1 mb-1.5 block group-hover:text-teal-600 transition-colors uppercase tracking-wider">
                  Nilai Uang (Rp)
                </label>
                <input
                  name="nilaiUang"
                  type="number"
                  placeholder="150000"
                  value={formData.nilaiUang}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm font-medium bg-slate-50/50 focus:bg-white"
                  required
                />
              </div>

              <div className="group">
                <label className="text-[11px] font-bold text-slate-500 ml-1 mb-1.5 block group-hover:text-teal-600 transition-colors uppercase tracking-wider">
                  Status Parameter
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm font-medium bg-slate-50/50 focus:bg-white text-slate-600"
                  required
                >
                  <option value="">Pilih Status</option>
                  <option value="aktif">Aktif</option>
                  <option value="nonaktif">Nonaktif</option>
                </select>
              </div>

              <div className="md:col-span-2 lg:col-span-4 flex justify-end">
                <button
                  type="submit"
                  className="w-full md:w-auto bg-slate-800 text-white px-8 py-3 rounded-lg font-bold hover:bg-teal-600 active:bg-teal-700 transition-all flex items-center justify-center gap-2 text-sm shadow-sm"
                >
                  <Save size={18} /> Simpan Konfigurasi
                </button>
              </div>
            </form>
          </div>
        )}

        {/* VIEW DATA KONFIGURASI */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-teal-500 rounded-full"></div>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Riwayat Pengaturan Tahunan</span>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-[10px] uppercase tracking-wider font-bold bg-slate-50/30">
                  <th className="px-6 py-4 text-center w-16">No</th>
                  <th className="px-6 py-4">Tahun</th>
                  <th className="px-6 py-4">Jatah Cuti</th>
                  <th className="px-6 py-4">Nilai Uang</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 text-sm font-medium">
                {dataKonfigurasi.map((config, index) => (
                  <tr key={config.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4 text-center text-slate-400 font-medium">{index + 1}</td>
                    <td className="px-6 py-4 font-bold text-slate-800">{config.tahun}</td>
                    <td className="px-6 py-4">
                      <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-bold">
                        {config.jatahCuti} HARI
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-teal-600 font-bold mr-1 text-xs">Rp</span>
                      {Number(config.nilaiUang).toLocaleString('id-ID')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider border ${
                        config.status === 'aktif' 
                        ? 'bg-teal-50 text-teal-700 border-teal-100' 
                        : 'bg-slate-50 text-slate-400 border-slate-100'
                      }`}>
                        {config.status}
                      </span>
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