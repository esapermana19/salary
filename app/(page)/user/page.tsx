"use client";

import React, { useState } from "react";
import { Plus, Trash2, Edit, List, Save, X, UserCog, UserPlus } from "lucide-react";

export default function UserPage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    role: ""
  });

  // Data dummy untuk Tabel User
  const [dataUser, setDataUser] = useState([
    { id: 1, nama: "Admin Utama", email: "admin@gmail.com", role: "admin" },
    { id: 2, nama: "Joko Wihh", email: "budi@gmail.com", role: "karyawan" },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTambahData = (e: React.FormEvent) => {
    e.preventDefault();
    const newData = {
      id: dataUser.length + 1,
      nama: formData.nama,
      email: formData.email,
      role: formData.role,
    };

    setDataUser([...dataUser, newData]);
    // Reset form
    setFormData({ nama: "", email: "", password: "", role: "" });
    setShowForm(false);
    alert("User baru berhasil ditambahkan!");
  };

  return (
    <div className="space-y-6">
      {/* Header Halaman */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manajemen User</h1>
          <p className="text-gray-500 text-sm">Kelola akun akses sistem dan hak akses user</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
            showForm 
              ? "bg-gray-100 text-gray-600 hover:bg-gray-200" 
              : "bg-teal-500 text-white hover:bg-teal-600 shadow-lg shadow-teal-500/30"
          }`}
        >
          {showForm ? <><X size={18} /> Batal</> : <><Plus size={18} /> Tambah User</>}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* FORM TAMBAH USER */}
        {showForm && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-teal-200 animate-in fade-in slide-in-from-top-4 duration-300">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <UserPlus className="text-teal-500" size={20} /> Tambah User Baru
            </h2>
            <form onSubmit={handleTambahData} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600 ml-1">Nama Lengkap</label>
                <input name="nama" type="text" placeholder="Masukkan nama" value={formData.nama} onChange={handleInputChange} className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:border-teal-500 transition-all" required />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600 ml-1">Email</label>
                <input name="email" type="email" placeholder="contoh@mail.com" value={formData.email} onChange={handleInputChange} className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:border-teal-500 transition-all" required />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600 ml-1">Password</label>
                <input name="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleInputChange} className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:border-teal-500 transition-all" required />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600 ml-1">Role Akses</label>
                <select name="role" value={formData.role} onChange={handleInputChange} className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:border-teal-500 transition-all bg-white text-gray-600" required>
                  <option value="">Pilih Role</option>
                  <option value="admin">Admin</option>
                  <option value="karyawan">Karyawan</option>
                </select>
              </div>

              <button type="submit" className="md:col-span-2 bg-slate-800 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-700 flex items-center justify-center gap-2 shadow-lg transition-all mt-2">
                <Save size={18} /> Simpan Akun User
              </button>
            </form>
          </div>
        )}

        {/* VIEW DATA USER */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden text-gray-800">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
            <List size={18} className="text-gray-400" />
            <span className="text-sm font-semibold text-gray-600">Daftar Pengguna Sistem</span>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-sm uppercase tracking-wider border-b border-gray-100 font-bold">
                <th className="px-6 py-4 text-center w-16">No</th>
                <th className="px-6 py-4">Nama User</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dataUser.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-center text-gray-500">{index + 1}</td>
                  <td className="px-6 py-4 font-semibold text-slate-700">{user.nama}</td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-600 border border-purple-200' : 'bg-blue-100 text-blue-600 border border-blue-200'
                    }`}>
                      {user.role}
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