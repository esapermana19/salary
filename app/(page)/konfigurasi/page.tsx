"use client";

import React, { useState } from "react";
import { Plus, Trash2, Edit, List, Save, X, Settings2,} from "lucide-react";

export default function KonfigurasiPage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    tahun: "",
    jatahCuti: "",
    nilaiUang: "",
    status: ""
  });

  // Data dummy untuk Tabel Konfigurasi
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
    alert("Konfigurasi tahunan berhasil disimpan!");
  };

  return (
    <div className="space-y-6">
      {/* Header Halaman */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Konfigurasi Sistem</h1>
          <p className="text-gray-500 text-sm">Atur parameter jatah cuti tahunan</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
            showForm 
              ? "bg-gray-100 text-gray-600 hover:bg-gray-200" 
              : "bg-teal-500 text-white hover:bg-teal-600 shadow-lg shadow-teal-500/30"
          }`}
        >
          {showForm ? <><X size={18} /> Batal</> : <><Plus size={18} /> Tambah Konfigurasi</>}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* FORM TAMBAH KONFIGURASI */}
        {showForm && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-teal-200 animate-in fade-in slide-in-from-top-4 duration-300">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Settings2 className="text-teal-500" size={20} /> Pengaturan Parameter Baru
            </h2>
            <form onSubmit={handleTambahData} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600 ml-1">Tahun</label>
                <input name="tahun" type="number" placeholder="Contoh: 2024" value={formData.tahun} onChange={handleInputChange} className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:border-teal-500 transition-all" required />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600 ml-1">Jatah Cuti (Hari)</label>
                <input name="jatahCuti" type="number" placeholder="Contoh: 12" value={formData.jatahCuti} onChange={handleInputChange} className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:border-teal-500 transition-all" required />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600 ml-1">Nilai Uang Per Cuti (Rp)</label>
                <input name="nilaiUang" type="number" placeholder="Potongan per hari" value={formData.nilaiUang} onChange={handleInputChange} className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:border-teal-500 transition-all" required />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600 ml-1">Status</label>
                <select name="status" value={formData.status} onChange={handleInputChange} className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:border-teal-500 transition-all bg-white text-gray-600" required>
                  <option value="">Pilih Status</option>
                  <option value="aktif">Aktif</option>
                  <option value="nonaktif">Nonaktif</option>
                </select>
              </div>

              <button type="submit" className="lg:col-span-4 bg-slate-800 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-700 flex items-center justify-center gap-2 shadow-lg transition-all mt-2">
                <Save size={18} /> Simpan Konfigurasi
              </button>
            </form>
          </div>
        )}

        {/* VIEW DATA KONFIGURASI */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden text-gray-800">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
            <List size={18} className="text-gray-400" />
            <span className="text-sm font-semibold text-gray-600">Riwayat Pengaturan Tahunan</span>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-sm uppercase tracking-wider border-b border-gray-100 font-bold">
                <th className="px-6 py-4 text-center w-16">No</th>
                <th className="px-6 py-4">Tahun</th>
                <th className="px-6 py-4">Jatah Cuti</th>
                <th className="px-6 py-4">Nilai Uang</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dataKonfigurasi.map((config, index) => (
                <tr key={config.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-center text-gray-500">{index + 1}</td>
                  <td className="px-6 py-4 font-bold text-slate-700">{config.tahun}</td>
                  <td className="px-6 py-4 text-gray-600">{config.jatahCuti} Hari</td>
                  <td className="px-6 py-4 text-gray-600">Rp {Number(config.nilaiUang).toLocaleString('id-ID')}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      config.status === 'aktif' 
                        ? 'bg-emerald-100 text-emerald-600 border border-emerald-200' 
                        : 'bg-gray-100 text-gray-400 border border-gray-200'
                    }`}>
                      {config.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"><Edit size={18} /></button>
                      <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}