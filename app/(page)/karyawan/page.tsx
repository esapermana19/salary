"use client";

import React, { useState } from "react";
import { Plus, Trash2, Edit, List, Save, X, Users, UserPlus } from "lucide-react";

export default function KaryawanPage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nik: "",
    nama: "",
    email: "",
    tempatLahir: "",
    tanggalLahir: "",
    alamat: "",
    jabatan: "",
    status: ""
  });

  // Data dummy untuk Karyawan
  const [dataKaryawan, setDataKaryawan] = useState([
    { id: 1, nama: "Joko Wihh", jabatan: "Manager", status: "Tetap" },
    { id: 2, nama: "Siti Aminah", jabatan: "Staff Administrasi", status: "Kontrak" },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTambahData = (e: React.FormEvent) => {
    e.preventDefault();
    const newData = {
      id: dataKaryawan.length + 1,
      nama: formData.nama,
      jabatan: formData.jabatan,
      status: formData.status,
    };

    setDataKaryawan([...dataKaryawan, newData]);
    setFormData({ nik: "", nama: "", email: "", tempatLahir: "", tanggalLahir: "", alamat: "", jabatan: "", status: "" });
    setShowForm(false);
    alert("Karyawan baru berhasil ditambahkan!");
  };

  return (
    <div className="space-y-6">
      {/* Header Halaman */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Data Karyawan</h1>
          <p className="text-gray-500 text-sm">Kelola informasi detail dan status kerja karyawan</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
            showForm 
              ? "bg-gray-100 text-gray-600 hover:bg-gray-200" 
              : "bg-teal-500 text-white hover:bg-teal-600 shadow-lg shadow-teal-500/30"
          }`}
        >
          {showForm ? <><X size={18} /> Batal</> : <><Plus size={18} /> Tambah Karyawan</>}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* FORM TAMBAH KARYAWAN */}
        {showForm && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-teal-200 animate-in fade-in slide-in-from-top-4 duration-300">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <UserPlus className="text-teal-500" size={20} /> Form Input Karyawan
            </h2>
            <form onSubmit={handleTambahData} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="nik" type="text" placeholder="NIK" value={formData.nik} onChange={handleInputChange} className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:border-teal-500 transition-all" required />
              <input name="nama" type="text" placeholder="Nama Lengkap" value={formData.nama} onChange={handleInputChange} className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:border-teal-500 transition-all" required />
              <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleInputChange} className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:border-teal-500 transition-all" required />
              <input name="tempatLahir" type="text" placeholder="Tempat Lahir" value={formData.tempatLahir} onChange={handleInputChange} className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:border-teal-500 transition-all" required />
              <input name="tanggalLahir" type="date" value={formData.tanggalLahir} onChange={handleInputChange} className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:border-teal-500 transition-all text-gray-500" required />
              
              <select name="jabatan" value={formData.jabatan} onChange={handleInputChange} className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:border-teal-500 transition-all bg-white text-gray-500" required>
                <option value="">Pilih Jabatan</option>
                <option value="Manager">Manager</option>
                <option value="Staff Administrasi">Staff Administrasi</option>
                <option value="Software Engineer">Software Engineer</option>
              </select>

              <select name="status" value={formData.status} onChange={handleInputChange} className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:border-teal-500 transition-all bg-white text-gray-500" required>
                <option value="">Pilih Status</option>
                <option value="Tetap">Tetap</option>
                <option value="Kontrak">Kontrak</option>
                <option value="Magang">Magang</option>
              </select>

              <textarea name="alamat" placeholder="Alamat Lengkap" value={formData.alamat} onChange={handleInputChange} className="md:col-span-2 rounded-xl border border-gray-300 px-4 py-2 outline-none focus:border-teal-500 transition-all h-24" required />

              <button type="submit" className="md:col-span-2 bg-slate-800 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-700 flex items-center justify-center gap-2 shadow-lg transition-all mt-2">
                <Save size={18} /> Simpan Data Karyawan
              </button>
            </form>
          </div>
        )}

        {/* VIEW DATA KARYAWAN */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden text-gray-800">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
            <List size={18} className="text-gray-400" />
            <span className="text-sm font-semibold text-gray-600">Daftar Karyawan</span>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-sm uppercase tracking-wider border-b border-gray-100 font-bold">
                <th className="px-6 py-4">No</th>
                <th className="px-6 py-4">Nama</th>
                <th className="px-6 py-4">Jabatan</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dataKaryawan.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-semibold text-slate-700">{item.nama}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-medium">{item.jabatan}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      item.status === 'Tetap' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {item.status}
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