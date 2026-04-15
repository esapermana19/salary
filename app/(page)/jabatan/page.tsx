"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit, Save, X, Briefcase, Search, Loader2 } from "lucide-react";

interface Divisi {
  id: number;
  divisi: string;
}

interface Jabatan {
  id: number;
  jabatan: string;
  id_divisi: number;
  gaji_pokok: number;
  divisi?: Divisi;
}

export default function JabatanPage() {
  const [showForm, setShowForm] = useState(false);
  const [jabatanList, setJabatanList] = useState<Jabatan[]>([]);
  const [divisiList, setDivisiList] = useState<Divisi[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Form State
  const [namaJabatan, setNamaJabatan] = useState("");
  const [idDivisi, setIdDivisi] = useState<string>("");
  const [gajiPokok, setGajiPokok] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const fetchDivisi = async () => {
    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/divisi", {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
      const data = await res.json();
      if (res.ok) setDivisiList(data.data || data);
    } catch (err) {
      console.error("Fetch Divisi Error:", err);
    }
  };

  const fetchJabatan = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan", {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal mengambil data jabatan");
      setJabatanList(data.data || data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDivisi();
      fetchJabatan();
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const url = editingId
      ? `https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan/${editingId}`
      : "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan";

    try {
      const res = await fetch(url, {
        method: editingId ? "PATCH" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          jabatan: namaJabatan,
          id_divisi: parseInt(idDivisi),
          gaji_pokok: parseInt(gajiPokok),
        }),
      });

      if (!res.ok) throw new Error("Gagal menyimpan data");

      resetForm();
      fetchJabatan();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: Jabatan) => {
    setEditingId(item.id);
    setNamaJabatan(item.jabatan);
    setIdDivisi(item.id_divisi.toString());
    setGajiPokok(item.gaji_pokok.toString());
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus jabatan ini?")) return;
    try {
      const res = await fetch(`https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
      if (!res.ok) throw new Error("Gagal menghapus");
      fetchJabatan();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const resetForm = () => {
    setNamaJabatan("");
    setIdDivisi("");
    setGajiPokok("");
    setEditingId(null);
    setShowForm(false);
  };

  // Filter Data
  const filteredJabatan = jabatanList.filter((item) =>
    item.jabatan.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.divisi?.divisi.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 p-4 md:p-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">Data Jabatan</h1>
          <p className="text-slate-500 font-medium text-xs mt-1 uppercase tracking-wider">
            Pengaturan Struktur & Standar Penggajian
          </p>
        </div>
        <button
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all duration-200 text-sm ${
            showForm
              ? "bg-rose-50 text-rose-600 hover:bg-rose-100"
              : "bg-teal-500 text-white hover:bg-teal-600 shadow-lg shadow-teal-500/25 active:scale-95"
          }`}
        >
          {showForm ? <><X size={18} /> Batal</> : <><Plus size={18} /> Tambah Jabatan</>}
        </button>
      </div>

      {/* Form Section */}
      {showForm && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
            <div className="p-2 bg-teal-50 rounded-lg text-teal-600">
              <Briefcase size={20} />
            </div>
            <h2 className="text-lg font-bold text-slate-800">
              {editingId ? "Edit Jabatan" : "Tambah Jabatan Baru"}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Nama Jabatan</label>
              <input
                type="text"
                value={namaJabatan}
                onChange={(e) => setNamaJabatan(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all text-sm bg-slate-50 focus:bg-white"
                placeholder="Manager"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Divisi</label>
              <select
                value={idDivisi}
                onChange={(e) => setIdDivisi(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all text-sm bg-slate-50 focus:bg-white appearance-none"
                required
              >
                <option value="">Pilih Divisi</option>
                {divisiList.map((div) => (
                  <option key={div.id} value={div.id}>{div.divisi}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Gaji Pokok (Rp)</label>
              <div className="relative">
                <input
                  type="number"
                  value={gajiPokok}
                  onChange={(e) => setGajiPokok(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 pl-12 pr-4 py-3 outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all text-sm bg-slate-50 focus:bg-white"
                  placeholder="5000000"
                  required
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">Rp</span>
              </div>
            </div>

            <div className="md:col-span-3 flex justify-end pt-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-teal-600 transition-all flex items-center gap-2 text-sm disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                {editingId ? "Update Jabatan" : "Simpan Jabatan"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/30">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-teal-500 rounded-full"></div>
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-widest">Daftar Jabatan</h3>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Cari posisi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-teal-500/10 transition-all text-xs font-medium"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                <th className="px-6 py-4 w-20 text-center">No</th>
                <th className="px-6 py-4">Jabatan</th>
                <th className="px-6 py-4">Divisi</th>
                <th className="px-6 py-4 text-right">Gaji Pokok</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredJabatan.length > 0 ? (
                filteredJabatan.map((item, index) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-all group">
                    <td className="px-6 py-4 text-center text-xs font-bold text-slate-400">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800 group-hover:text-teal-600 transition-colors">
                        {item.jabatan}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold uppercase tracking-tight">
                        {item.divisi?.divisi || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-xs font-bold text-slate-500 mr-1 italic">Rp</span>
                      <span className="font-bold text-slate-800 tracking-tight">
                        {Number(item.gaji_pokok).toLocaleString("id-ID")}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                          title="Hapus"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <div className="flex flex-col items-center justify-center opacity-30">
                      <Search size={48} className="mb-4 text-slate-300" />
                      <p className="text-xs font-bold uppercase tracking-widest">Tidak ada data ditemukan</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}