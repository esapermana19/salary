"use client";

import React, { useState } from "react";
import { Plus, Trash2, Edit, Save, X, UserPlus, ShieldCheck, Search, ChevronLeft, ChevronRight } from "lucide-react";

export default function UserPage() {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Sesuai permintaan sebelumnya, diatur 5 baris

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    role: ""
  });

  // Data Dummy 20 User (Pemain & Staff Barcelona)
  const [dataUser, setDataUser] = useState([
    { id: 1, nama: "Hansi Flick", email: "flick@fcb.com", role: "admin" },
    { id: 2, nama: "Lamine Yamal", email: "lamine@fcb.com", role: "karyawan" },
    { id: 3, nama: "Robert Lewandowski", email: "lewy@fcb.com", role: "karyawan" },
    { id: 4, nama: "Raphinha Belloli", email: "rapha@fcb.com", role: "admin" },
    { id: 5, nama: "Pedri Gonzalez", email: "pedri@fcb.com", role: "karyawan" },
    { id: 6, nama: "Gavi Paez", email: "gavi@fcb.com", role: "karyawan" },
    { id: 7, nama: "Frenkie de Jong", email: "frenkie@fcb.com", role: "karyawan" },
    { id: 8, nama: "Ronald Araujo", email: "araujo@fcb.com", role: "admin" },
    { id: 9, nama: "Jules Kounde", email: "kounde@fcb.com", role: "karyawan" },
    { id: 10, nama: "Marc-Andre ter Stegen", email: "stegen@fcb.com", role: "admin" },
    { id: 11, nama: "Dani Olmo", email: "olmo@fcb.com", role: "karyawan" },
    { id: 12, nama: "Pau Cubarsi", email: "cubarsi@fcb.com", role: "karyawan" },
    { id: 13, nama: "Fermin Lopez", email: "fermin@fcb.com", role: "karyawan" },
    { id: 14, nama: "Alejandro Balde", email: "balde@fcb.com", role: "karyawan" },
    { id: 15, nama: "Inigo Martinez", email: "martinez@fcb.com", role: "karyawan" },
    { id: 16, nama: "Ferran Torres", email: "ferran@fcb.com", role: "karyawan" },
    { id: 17, nama: "Andreas Christensen", email: "andreas@fcb.com", role: "karyawan" },
    { id: 18, nama: "Marc Casado", email: "casado@fcb.com", role: "karyawan" },
    { id: 19, nama: "Ansu Fati", email: "ansufati@fcb.com", role: "karyawan" },
    { id: 20, nama: "Deco Souza", email: "deco@fcb.com", role: "admin" },
  ]);

  // Logic Filtering
  const filteredUser = dataUser.filter((user) =>
    user.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Logic Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUser.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUser.length / itemsPerPage);

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

    setDataUser([newData, ...dataUser]);
    setFormData({ nama: "", email: "", password: "", role: "" });
    setShowForm(false);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6 p-2">
      {/* Header Halaman */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">Manajemen User</h1>
          <p className="text-slate-500 font-medium text-xs mt-1">Kelola akun akses sistem dan hak akses pengguna</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold transition-all duration-200 text-sm ${
            showForm 
              ? "bg-slate-100 text-slate-600 hover:bg-slate-200" 
              : "bg-teal-500 text-white hover:bg-teal-600 shadow-md shadow-teal-500/20 active:scale-95"
          }`}
        >
          {showForm ? <><X size={18} /> Batal</> : <><Plus size={18} /> Tambah User</>}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* FORM TAMBAH USER */}
        {showForm && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-top-2 duration-300 text-slate-800">
            <div className="flex items-center gap-2 mb-6">
              <UserPlus size={20} className="text-teal-500" />
              <h2 className="text-md font-bold text-slate-800">Tambah User Baru</h2>
            </div>
            
            <form onSubmit={handleTambahData} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="group">
                <label className="text-[11px] font-bold text-slate-500 ml-1 mb-1.5 block group-hover:text-teal-600 transition-colors uppercase tracking-wider">
                  Nama Lengkap
                </label>
                <input
                  name="nama"
                  type="text"
                  placeholder="Masukkan nama user"
                  value={formData.nama}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm font-medium bg-slate-50/50 focus:bg-white text-slate-700"
                  required
                />
              </div>

              <div className="group">
                <label className="text-[11px] font-bold text-slate-500 ml-1 mb-1.5 block group-hover:text-teal-600 transition-colors uppercase tracking-wider">
                  Alamat Email
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="user@fcb.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm font-medium bg-slate-50/50 focus:bg-white text-slate-700"
                  required
                />
              </div>

              <div className="group">
                <label className="text-[11px] font-bold text-slate-500 ml-1 mb-1.5 block group-hover:text-teal-600 transition-colors uppercase tracking-wider">
                  Kata Sandi
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm font-medium bg-slate-50/50 focus:bg-white text-slate-700"
                  required
                />
              </div>

              <div className="group">
                <label className="text-[11px] font-bold text-slate-500 ml-1 mb-1.5 block group-hover:text-teal-600 transition-colors uppercase tracking-wider">
                  Role Akses
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm font-medium bg-slate-50/50 focus:bg-white text-slate-600"
                  required
                >
                  <option value="">Pilih Role</option>
                  <option value="admin">Administrator</option>
                  <option value="karyawan">Karyawan</option>
                </select>
              </div>

              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="w-full md:w-auto bg-slate-800 text-white px-8 py-3 rounded-lg font-bold hover:bg-teal-600 active:bg-teal-700 transition-all flex items-center justify-center gap-2 text-sm shadow-sm"
                >
                  <Save size={18} /> Simpan Akun
                </button>
              </div>
            </form>
          </div>
        )}

        {/* VIEW DATA USER */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="w-1 h-4 bg-teal-500 rounded-full"></div>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Daftar Pengguna Sistem</span>
              <span className="ml-2 text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded font-bold uppercase">
                {filteredUser.length} Akun
              </span>
            </div>

            <div className="relative w-full md:w-72 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500" size={16} />
              <input
                type="text"
                placeholder="Cari nama, email atau role..."
                value={searchQuery}
                onChange={(e) => {setSearchQuery(e.target.value); setCurrentPage(1);}}
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-teal-500/10 focus:border-teal-500 text-xs font-medium text-slate-700 shadow-sm"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-[10px] uppercase tracking-wider font-bold bg-slate-50/30">
                  <th className="px-6 py-4 w-16 text-center">No</th>
                  <th className="px-6 py-4">Nama User</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Status Role</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 text-sm font-medium">
                {currentItems.length > 0 ? (
                  currentItems.map((user, index) => (
                    <tr key={user.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-6 py-4 text-center text-slate-400 font-medium">{indexOfFirstItem + index + 1}</td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-slate-800 group-hover:text-teal-600 transition-colors">{user.nama}</span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-xs">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider border ${
                          user.role === 'admin' 
                          ? 'bg-purple-50 text-purple-600 border-purple-100' 
                          : 'bg-blue-50 text-blue-600 border-blue-100'
                        }`}>
                          {user.role}
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
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400 text-xs font-bold uppercase tracking-widest opacity-40">
                      User tidak ditemukan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION CONTROLS */}
          <div className="p-4 border-t border-slate-100 bg-white flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Menampilkan <span className="text-slate-700">{indexOfFirstItem + 1}</span> - <span className="text-slate-700">{Math.min(indexOfLastItem, filteredUser.length)}</span> dari <span className="text-slate-700">{filteredUser.length}</span> User
            </p>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-white transition-all"
              >
                <ChevronLeft size={18} />
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${
                    currentPage === i + 1 
                    ? "bg-teal-500 text-white shadow-md shadow-teal-500/20" 
                    : "text-slate-500 hover:bg-slate-100 border border-transparent"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-white transition-all"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}