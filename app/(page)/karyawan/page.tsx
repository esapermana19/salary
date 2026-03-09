"use client";

import React, { useState } from "react";
import { Plus, Trash2, Edit, Save, X, UserPlus, Search, ChevronLeft, ChevronRight } from "lucide-react";

export default function KaryawanPage() {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [formData, setFormData] = useState({
    nik: "", nama: "", email: "", tempatLahir: "", tanggalLahir: "", alamat: "", jabatan: "", status: ""
  });

  const [dataKaryawan, setDataKaryawan] = useState([
    { id: 1, nama: "Lamine Yamal", jabatan: "Software Engineer", status: "Tetap" },
    { id: 2, nama: "Robert Lewandowski", jabatan: "Manager", status: "Tetap" },
    { id: 3, nama: "Raphinha Belloli", jabatan: "Manager", status: "Tetap" },
    { id: 4, nama: "Pedri Gonzalez", jabatan: "Software Engineer", status: "Tetap" },
    { id: 5, nama: "Gavi Paez", jabatan: "Software Engineer", status: "Kontrak" },
    { id: 6, nama: "Frenkie de Jong", jabatan: "Staff Administrasi", status: "Tetap" },
    { id: 7, nama: "Ronald Araujo", jabatan: "Staff Administrasi", status: "Tetap" },
    { id: 8, nama: "Jules Kounde", jabatan: "Staff Administrasi", status: "Tetap" },
    { id: 9, nama: "Alejandro Balde", jabatan: "Software Engineer", status: "Kontrak" },
    { id: 10, nama: "Marc-Andre ter Stegen", jabatan: "Manager", status: "Tetap" },
    { id: 11, nama: "Pau Cubarsi", jabatan: "Software Engineer", status: "Magang" },
    { id: 12, nama: "Fermin Lopez", jabatan: "Software Engineer", status: "Kontrak" },
    { id: 13, nama: "Dani Olmo", jabatan: "Staff Administrasi", status: "Tetap" },
    { id: 14, nama: "Ferran Torres", jabatan: "Staff Administrasi", status: "Kontrak" },
    { id: 15, nama: "Inigo Martinez", jabatan: "Staff Administrasi", status: "Tetap" },
    { id: 16, nama: "Andreas Christensen", jabatan: "Software Engineer", status: "Tetap" },
    { id: 17, nama: "Marc Bernal", jabatan: "Software Engineer", status: "Magang" },
    { id: 18, nama: "Ansu Fati", jabatan: "Staff Administrasi", status: "Kontrak" },
    { id: 19, nama: "Eric Garcia", jabatan: "Staff Administrasi", status: "Tetap" },
    { id: 20, nama: "Gerard Martin", jabatan: "Software Engineer", status: "Magang" },
  ]);

  // Logic Filtering
  const filteredKaryawan = dataKaryawan.filter((item) =>
    item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.jabatan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Logic Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredKaryawan.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredKaryawan.length / itemsPerPage);

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
    setDataKaryawan([newData, ...dataKaryawan]);
    setFormData({ nik: "", nama: "", email: "", tempatLahir: "", tanggalLahir: "", alamat: "", jabatan: "", status: "" });
    setShowForm(false);
    setCurrentPage(1); // Balik ke hal 1 jika tambah data
  };

  return (
    <div className="space-y-6 p-2 text-slate-800">
      {/* Header Halaman Tetap Sama */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Data Karyawan</h1>
          <p className="text-slate-500 font-medium text-xs mt-1">Kelola informasi detail dan status kerja karyawan</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold transition-all duration-200 text-sm ${
            showForm ? "bg-slate-100 text-slate-600 hover:bg-slate-200" : "bg-teal-500 text-white hover:bg-teal-600 shadow-md shadow-teal-500/20 active:scale-95"
          }`}
        >
          {showForm ? <><X size={18} /> Batal</> : <><Plus size={18} /> Tambah Karyawan</>}
        </button>
      </div>

      {/* FORM TAMBAH (Hidden by default) */}
      {showForm && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2 mb-6 text-slate-800">
            <UserPlus size={20} className="text-teal-500" />
            <h2 className="text-md font-bold text-slate-800">Form Input Karyawan</h2>
          </div>
          <form onSubmit={handleTambahData} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
             {/* ... Input fields tetap sama seperti sebelumnya ... */}
             <div className="md:col-span-2 lg:col-span-4 flex justify-end">
                <button type="submit" className="w-full md:w-auto bg-slate-800 text-white px-8 py-3 rounded-lg font-bold hover:bg-teal-600 active:bg-teal-700 transition-all flex items-center justify-center gap-2 text-sm shadow-sm">
                  <Save size={18} /> Simpan Data Karyawan
                </button>
             </div>
          </form>
        </div>
      )}

      {/* VIEW DATA DENGAN PAGINATION */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="w-1 h-4 bg-teal-500 rounded-full"></div>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Daftar Karyawan</span>
          </div>

          <div className="relative w-full md:w-72 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500" size={16} />
            <input
              type="text"
              placeholder="Cari nama atau jabatan..."
              value={searchQuery}
              onChange={(e) => {setSearchQuery(e.target.value); setCurrentPage(1);}}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-teal-500/10 focus:border-teal-500 text-xs font-medium"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-[10px] uppercase tracking-wider font-bold bg-slate-50/30">
                <th className="px-6 py-4 w-16 text-center">No</th>
                <th className="px-6 py-4">Nama Lengkap</th>
                <th className="px-6 py-4">Jabatan</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-sm font-medium">
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4 text-center text-slate-400">{indexOfFirstItem + index + 1}</td>
                    <td className="px-6 py-4 font-bold text-slate-800">{item.nama}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-md text-[11px] font-bold uppercase tracking-tight">
                        {item.jabatan}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                        item.status === 'Tetap' ? 'bg-teal-100 text-teal-700' : 
                        item.status === 'Kontrak' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1">
                        <button className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-md transition-all"><Edit size={16} /></button>
                        <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={5} className="px-6 py-12 text-center opacity-40">Data tidak ditemukan</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION CONTROLS */}
        <div className="p-4 border-t border-slate-100 bg-white flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            Menampilkan <span className="text-slate-700">{indexOfFirstItem + 1}</span> - <span className="text-slate-700">{Math.min(indexOfLastItem, filteredKaryawan.length)}</span> dari <span className="text-slate-700">{filteredKaryawan.length}</span> Karyawan
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
  );
}