"use client";

import React, { useState } from "react";
import { Plus, Trash2, Edit, List, Save, X, UserPlus, Users } from "lucide-react";

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
  };

  return (
    <div className="space-y-6 p-2">
      {/* Header Halaman */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">Data Karyawan</h1>
          <p className="text-slate-500 font-medium text-xs mt-1">Kelola informasi detail dan status kerja karyawan</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold transition-all duration-200 text-sm ${
            showForm 
              ? "bg-slate-100 text-slate-600 hover:bg-slate-200" 
              : "bg-teal-500 text-white hover:bg-teal-600 shadow-md shadow-teal-500/20 active:scale-95"
          }`}
        >
          {showForm ? <><X size={18} /> Batal</> : <><Plus size={18} /> Tambah Karyawan</>}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* FORM TAMBAH KARYAWAN */}
        {showForm && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-top-2 duration-300 text-slate-800">
            <div className="flex items-center gap-2 mb-6">
              <UserPlus size={20} className="text-teal-500" />
              <h2 className="text-md font-bold">Form Input Karyawan</h2>
            </div>
            
            <form onSubmit={handleTambahData} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { label: "NIK", name: "nik", type: "text", placeholder: "12345678" },
                { label: "Nama Lengkap", name: "nama", type: "text", placeholder: "Esa ..." },
                { label: "Email", name: "email", type: "email", placeholder: "esa@example.com" },
                { label: "Tempat Lahir", name: "tempatLahir", type: "text", placeholder: "Ciamis" },
              ].map((input) => (
                <div key={input.name} className="group">
                  <label className="text-[11px] font-bold text-slate-500 ml-1 mb-1.5 block group-hover:text-teal-600 transition-colors uppercase tracking-wider">
                    {input.label}
                  </label>
                  <input
                    name={input.name}
                    type={input.type}
                    placeholder={input.placeholder}
                    value={(formData as any)[input.name]}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm font-medium bg-slate-50/50 focus:bg-white"
                    required
                  />
                </div>
              ))}

              <div className="group">
                <label className="text-[11px] font-bold text-slate-500 ml-1 mb-1.5 block group-hover:text-teal-600 transition-colors uppercase tracking-wider">
                  Tanggal Lahir
                </label>
                <input
                  name="tanggalLahir"
                  type="date"
                  value={formData.tanggalLahir}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm font-medium bg-slate-50/50 focus:bg-white text-slate-600"
                  required
                />
              </div>

              <div className="group">
                <label className="text-[11px] font-bold text-slate-500 ml-1 mb-1.5 block group-hover:text-teal-600 transition-colors uppercase tracking-wider">
                  Jabatan
                </label>
                <select
                  name="jabatan"
                  value={formData.jabatan}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm font-medium bg-slate-50/50 focus:bg-white text-slate-600"
                  required
                >
                  <option value="">Pilih Jabatan</option>
                  <option value="Manager">Manager</option>
                  <option value="Staff Administrasi">Staff Administrasi</option>
                  <option value="Software Engineer">Software Engineer</option>
                </select>
              </div>

              <div className="group lg:col-span-2">
                <label className="text-[11px] font-bold text-slate-500 ml-1 mb-1.5 block group-hover:text-teal-600 transition-colors uppercase tracking-wider">
                  Status Karyawan
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm font-medium bg-slate-50/50 focus:bg-white text-slate-600"
                  required
                >
                  <option value="">Pilih Status</option>
                  <option value="Tetap">Tetap</option>
                  <option value="Kontrak">Kontrak</option>
                  <option value="Magang">Magang</option>
                </select>
              </div>

              <div className="md:col-span-2 lg:col-span-4 group">
                <label className="text-[11px] font-bold text-slate-500 ml-1 mb-1.5 block group-hover:text-teal-600 transition-colors uppercase tracking-wider">
                  Alamat Lengkap
                </label>
                <textarea
                  name="alamat"
                  placeholder="Jl. Raya Ciamis No. ..."
                  value={formData.alamat}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm font-medium bg-slate-50/50 focus:bg-white h-24 resize-none"
                  required
                />
              </div>

              <div className="md:col-span-2 lg:col-span-4 flex justify-end">
                <button
                  type="submit"
                  className="w-full md:w-auto bg-slate-800 text-white px-8 py-3 rounded-lg font-bold hover:bg-teal-600 active:bg-teal-700 transition-all flex items-center justify-center gap-2 text-sm shadow-sm"
                >
                  <Save size={18} /> Simpan Data Karyawan
                </button>
              </div>
            </form>
          </div>
        )}

        {/* VIEW DATA KARYAWAN */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-teal-500 rounded-full"></div>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Daftar Karyawan</span>
            </div>
            <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded font-bold uppercase">
              {dataKaryawan.length} Orang
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-[10px] uppercase tracking-wider font-bold bg-slate-50/30">
                  <th className="px-6 py-4">No</th>
                  <th className="px-6 py-4">Nama Lengkap</th>
                  <th className="px-6 py-4">Jabatan</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 text-sm font-medium">
                {dataKaryawan.map((item, index) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4 text-slate-400 font-medium">{index + 1}</td>
                    <td className="px-6 py-4">
                      <span className="font-semibold group-hover:text-teal-600 transition-colors">{item.nama}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-md text-[11px] font-bold uppercase tracking-tight">
                        {item.jabatan}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                        item.status === 'Tetap' ? 'bg-teal-100 text-teal-700' : 
                        item.status === 'Kontrak' ? 'bg-amber-100 text-amber-700' : 
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {item.status}
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