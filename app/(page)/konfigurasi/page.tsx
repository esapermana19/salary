"use client";

import React, { useState } from "react";
import { Plus, Trash2, Edit, Save, X, Settings2, ChevronDown } from "lucide-react";

export default function KonfigurasiPage() {
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  
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

  // FUNGSI SIMPAN (TAMBAH & UPDATE)
  const handleSaveData = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing && editId !== null) {
      // Logika Update
      setDataKonfigurasi(dataKonfigurasi.map(item => 
        item.id === editId ? { ...formData, id: editId } : item
      ));
    } else {
      // Logika Tambah
      const newData = {
        id: Date.now(), // Gunakan timestamp untuk ID unik
        ...formData
      };
      setDataKonfigurasi([...dataKonfigurasi, newData]);
    }

    resetForm();
  };

  // FUNGSI TRIGGER EDIT
  const handleEdit = (config: any) => {
    setFormData({
      tahun: config.tahun,
      jatahCuti: config.jatahCuti,
      nilaiUang: config.nilaiUang,
      status: config.status
    });
    setEditId(config.id);
    setIsEditing(true);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // FUNGSI DELETE
  const handleDelete = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus konfigurasi ini?")) {
      setDataKonfigurasi(dataKonfigurasi.filter(item => item.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({ tahun: "", jatahCuti: "", nilaiUang: "", status: "" });
    setShowForm(false);
    setIsEditing(false);
    setEditId(null);
  };

  return (
    <div className="space-y-6 p-4 bg-slate-50/50 min-h-screen">
      {/* Header Halaman */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">Konfigurasi Sistem</h1>
          <p className="text-slate-500 font-medium text-xs mt-1 uppercase tracking-wider">Atur jatah cuti & kompensasi tahunan</p>
        </div>
        <button
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all duration-200 text-sm ${
            showForm 
              ? "bg-slate-100 text-slate-600 hover:bg-slate-200" 
              : "bg-teal-500 text-white hover:bg-teal-600 shadow-lg shadow-teal-500/20 active:scale-95"
          }`}
        >
          {showForm ? <><X size={18} /> Batal</> : <><Plus size={18} /> Tambah Konfigurasi</>}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* FORM KONFIGURASI */}
        {showForm && (
          <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-4">
              <div className="p-2 bg-teal-50 rounded-lg text-teal-600">
                <Settings2 size={20} />
              </div>
              <h2 className="text-md font-bold text-slate-800">
                {isEditing ? "Update Parameter" : "Pengaturan Parameter Baru"}
              </h2>
            </div>
            
            <form onSubmit={handleSaveData} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 ml-1 uppercase tracking-widest">Tahun Berlaku</label>
                <input
                  name="tahun"
                  type="number"
                  value={formData.tahun}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all text-sm font-medium bg-slate-50"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 ml-1 uppercase tracking-widest">Jatah Cuti (Hari)</label>
                <input
                  name="jatahCuti"
                  type="number"
                  value={formData.jatahCuti}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all text-sm font-medium bg-slate-50"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 ml-1 uppercase tracking-widest">Nilai Uang (Rp)</label>
                <input
                  name="nilaiUang"
                  type="number"
                  value={formData.nilaiUang}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all text-sm font-medium bg-slate-50"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 ml-1 uppercase tracking-widest">Status Parameter</label>
                <div className="relative">
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all text-sm font-medium bg-slate-50 appearance-none"
                    required
                  >
                    <option value="">Pilih Status</option>
                    <option value="aktif">Aktif</option>
                    <option value="nonaktif">Nonaktif</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="md:col-span-2 lg:col-span-4 flex justify-end pt-2">
                <button
                  type="submit"
                  className="w-full md:w-auto bg-slate-800 text-white px-10 py-3 rounded-xl font-bold hover:bg-teal-600 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-slate-200"
                >
                  <Save size={18} /> {isEditing ? "Update Konfigurasi" : "Simpan Konfigurasi"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* VIEW DATA KONFIGURASI */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-5 bg-teal-500 rounded-full"></div>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">Daftar Konfigurasi</span>
            </div>
            <span className="text-[10px] font-black bg-slate-200 text-slate-600 px-3 py-1 rounded-full uppercase tracking-tighter">
              {dataKonfigurasi.length} Data ditemukan
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-[11px] uppercase tracking-widest font-bold border-b border-slate-50">
                  <th className="px-8 py-5 text-center w-20">No</th>
                  <th className="px-8 py-5">Tahun</th>
                  <th className="px-8 py-5">Jatah Cuti</th>
                  <th className="px-8 py-5">Nilai Uang</th>
                  <th className="px-8 py-5 text-center">Status</th>
                  <th className="px-8 py-5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-600 text-sm">
                {dataKonfigurasi.map((config, index) => (
                  <tr key={config.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5 text-center text-slate-400 font-bold">{index + 1}</td>
                    <td className="px-8 py-5 font-black text-slate-800">{config.tahun}</td>
                    <td className="px-8 py-5">
                      <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg text-[10px] font-bold border border-slate-200 uppercase tracking-tight">
                        {config.jatahCuti} Hari
                      </span>
                    </td>
                    <td className="px-8 py-5 font-bold">
                      <span className="text-teal-600 mr-1 text-xs">Rp</span>
                      {Number(config.nilaiUang).toLocaleString('id-ID')}
                    </td>
                    <td className="px-8 py-5 text-center">
                      <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border shadow-sm ${
                        config.status === 'aktif' 
                        ? 'bg-teal-50 text-teal-700 border-teal-100' 
                        : 'bg-slate-50 text-slate-400 border-slate-200'
                      }`}>
                        {config.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleEdit(config)}
                          className="p-2.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all border border-transparent hover:border-teal-100 shadow-sm hover:shadow-teal-500/10"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(config.id)}
                          className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100 shadow-sm hover:shadow-red-500/10"
                        >
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