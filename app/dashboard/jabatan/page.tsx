"use client";

import React, { useState } from "react";
import { Plus, Trash2, Edit, List, Save, X, Briefcase } from "lucide-react";

export default function JabatanPage() {
  const [showForm, setShowForm] = useState(false);
  const [namaJabatan, setNamaJabatan] = useState("");
  const [gajiPokok, setGajiPokok] = useState("");

  // Data dummy untuk Jabatan
  const [dataJabatan, setDataJabatan] = useState([
    { id: 1, nama: "Manager", gaji: "10.000.000" },
    { id: 2, nama: "Staff Administrasi", gaji: "5.000.000" },
    { id: 3, nama: "Software Engineer", gaji: "8.500.000" },
  ]);

  const handleTambahData = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaJabatan || !gajiPokok) return;

    const newData = {
      id: dataJabatan.length + 1,
      nama: namaJabatan,
      gaji: gajiPokok,
    };

    setDataJabatan([...dataJabatan, newData]);
    setNamaJabatan("");
    setGajiPokok("");
    setShowForm(false);
    alert("Jabatan baru berhasil ditambahkan!");
  };

  return (
    <div className="space-y-6">
      {/* Header Halaman */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Data Jabatan</h1>
          <p className="text-gray-500 text-sm">Kelola tingkatan posisi dan standar gaji pokok</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
            showForm 
              ? "bg-gray-100 text-gray-600 hover:bg-gray-200" 
              : "bg-teal-500 text-white hover:bg-teal-600 shadow-lg shadow-teal-500/30"
          }`}
        >
          {showForm ? <><X size={18} /> Batal</> : <><Plus size={18} /> Tambah Jabatan</>}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* FORM TAMBAH JABATAN */}
        {showForm && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-teal-200 animate-in fade-in slide-in-from-top-4 duration-300">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Briefcase className="text-teal-500" size={20} /> Tambah Jabatan Baru
            </h2>
            <form onSubmit={handleTambahData} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Nama Jabatan (ex: Senior Developer)"
                value={namaJabatan}
                onChange={(e) => setNamaJabatan(e.target.value)}
                className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:border-teal-500 transition-all"
                required
              />
              <input
                type="number"
                placeholder="Gaji Pokok (Nominal)"
                value={gajiPokok}
                onChange={(e) => setGajiPokok(e.target.value)}
                className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:border-teal-500 transition-all"
                required
              />
              <button
                type="submit"
                className="bg-slate-800 text-white px-6 py-2 rounded-xl font-bold hover:bg-slate-700 flex items-center justify-center gap-2"
              >
                <Save size={18} /> Simpan Jabatan
              </button>
            </form>
          </div>
        )}

        {/* VIEW DATA JABATAN */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden text-gray-800">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
            <List size={18} className="text-gray-400" />
            <span className="text-sm font-semibold text-gray-600">Daftar Posisi & Gaji</span>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-sm uppercase tracking-wider border-b border-gray-100">
                <th className="px-6 py-4 font-medium">No</th>
                <th className="px-6 py-4 font-medium">Nama Jabatan</th>
                <th className="px-6 py-4 font-medium">Gaji Pokok</th>
                <th className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dataJabatan.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-semibold text-slate-700">{item.nama}</td>
                  <td className="px-6 py-4">Rp {item.gaji}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={18} />
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
  );
}