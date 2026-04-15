"use client";

import { useEffect, useState, useRef } from "react";
import {
  Plus,
  Trash2,
  Edit,
  Save,
  X,
  Search,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Info,
  Users,
} from "lucide-react";

interface Jabatan {
  id: number;
  jabatan: string;
}

interface Karyawan {
  id: number;
  nik: string;
  nama: string;
  email: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  alamat: string;
  id_jabatan: number;
  status_aktif: boolean;
  jabatan?: Jabatan;
}

export default function KaryawanPage() {
  const [karyawanList, setKaryawanList] = useState<Karyawan[]>([]);
  const [jabatanList, setJabatanList] = useState<Jabatan[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedKaryawan, setSelectedKaryawan] = useState<Karyawan | null>(
    null,
  );

  // Search & Pagination states
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Form states
  const [nik, setNik] = useState("");
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [alamat, setAlamat] = useState("");
  const [idJabatan, setIdJabatan] = useState<string>("");
  const [statusAktif, setStatusAktif] = useState(true);

  // Searchable Select states
  const [searchJabatan, setSearchJabatan] = useState("");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  // Close select on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsSelectOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchJabatan = async () => {
    try {
      const res = await fetch(
        "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );
      const data = await res.json();
      if (res.ok) setJabatanList(data.data || data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchKaryawan = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/karyawan",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal mengambil data");
      setKaryawanList(data.data || data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchJabatan();
      fetchKaryawan();
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = editingId
      ? `https://payroll.politekniklp3i-tasikmalaya.ac.id/api/karyawan/${editingId}`
      : "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/karyawan";

    const method = editingId ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          nik,
          nama,
          email,
          tempat_lahir: tempatLahir,
          tanggal_lahir: tanggalLahir,
          alamat,
          id_jabatan: parseInt(idJabatan),
          status_aktif: statusAktif,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal menyimpan");

      alert(editingId ? "Karyawan diperbarui!" : "Karyawan ditambahkan!");
      resetForm();
      setShowForm(false);
      fetchKaryawan();
    } catch (err: any) {
      setError(err.message);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setNik("");
    setNama("");
    setEmail("");
    setTempatLahir("");
    setTanggalLahir("");
    setAlamat("");
    setIdJabatan("");
    setStatusAktif(true);
    setEditingId(null);
  };

  const handleEdit = (item: Karyawan) => {
    setEditingId(item.id);
    setNik(item.nik);
    setNama(item.nama);
    setEmail(item.email);
    setTempatLahir(item.tempat_lahir || "");
    setTanggalLahir(item.tanggal_lahir || "");
    setAlamat(item.alamat || "");
    setIdJabatan(item.id_jabatan.toString());
    setStatusAktif(item.status_aktif);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus data ini?")) return;
    try {
      const res = await fetch(
        `https://payroll.politekniklp3i-tasikmalaya.ac.id/api/karyawan/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );
      if (!res.ok) throw new Error("Gagal menghapus");
      fetchKaryawan();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Logic Filtering & Pagination
  const filteredKaryawan = karyawanList.filter(
    (k) =>
      k.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      k.nik.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredKaryawan.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredKaryawan.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const selectedJabatanLabel =
    jabatanList.find((j) => j.id.toString() === idJabatan)?.jabatan ||
    "Pilih Jabatan";

  return (
    <div className="space-y-6 p-2 text-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-xl font-bold tracking-tight">
            Manajemen Karyawan
          </h1>
          <p className="text-slate-500 font-medium text-xs mt-1">
            Kelola data informasi dan jabatan karyawan
          </p>
        </div>
        <button
          onClick={() => {
            if (showForm) resetForm();
            setShowForm(!showForm);
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold transition-all text-sm ${
            showForm
              ? "bg-slate-100 text-slate-600"
              : "bg-teal-500 text-white shadow-md shadow-teal-500/20 active:scale-95"
          }`}
        >
          {showForm ? (
            <>
              <X size={18} /> Batal
            </>
          ) : (
            <>
              <Plus size={18} /> Tambah Karyawan
            </>
          )}
        </button>
      </div>

      {/* Form Section */}
      {showForm && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2 mb-6 border-b pb-4">
            <Users size={20} className="text-teal-500" />
            <h2 className="text-md font-bold">
              {editingId ? "Edit Data Karyawan" : "Pendaftaran Karyawan Baru"}
            </h2>
          </div>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">
                NIK
              </label>
              <input
                type="text"
                value={nik}
                onChange={(e) => setNik(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-teal-500 text-sm bg-slate-50/50"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-teal-500 text-sm bg-slate-50/50"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-teal-500 text-sm bg-slate-50/50"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                Jabatan
              </label>
              <div className="relative">
                <select
                  value={idJabatan}
                  onChange={(e) => setIdJabatan(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all text-sm bg-slate-50 focus:bg-white appearance-none font-medium text-slate-700"
                  required
                >
                  <option value="">Pilih Jabatan</option>
                  {jabatanList.map((j) => (
                    <option key={j.id} value={j.id}>
                      {j.jabatan}
                    </option>
                  ))}
                </select>

                {/* Icon Panah Modern */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">
                Tempat Lahir
              </label>
              <input
                type="text"
                value={tempatLahir}
                onChange={(e) => setTempatLahir(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-teal-500 text-sm bg-slate-50/50"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">
                Tanggal Lahir
              </label>
              <input
                type="date"
                value={tanggalLahir}
                onChange={(e) => setTanggalLahir(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-teal-500 text-sm bg-slate-50/50"
              />
            </div>
            <div className="md:col-span-2 space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">
                Alamat Lengkap
              </label>
              <textarea
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-teal-500 text-sm bg-slate-50/50 min-h-[80px]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">
                Status Karyawan
              </label>
              <select
                value={statusAktif ? "true" : "false"}
                onChange={(e) => setStatusAktif(e.target.value === "true")}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-teal-500 text-sm bg-slate-50/50"
              >
                <option value="true">Aktif</option>
                <option value="false">Tidak Aktif</option>
              </select>
            </div>
            <div className="md:col-span-2 flex justify-end gap-2 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto bg-slate-800 text-white px-8 py-2.5 rounded-lg font-bold hover:bg-teal-600 transition-all flex items-center justify-center gap-2 text-sm shadow-sm"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <Save size={18} />
                )}
                {editingId ? "Perbarui Data" : "Simpan Karyawan"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="w-1 h-4 bg-teal-500 rounded-full"></div>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">
              Daftar Karyawan
            </span>
            <span className="ml-2 text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded font-bold uppercase">
              {filteredKaryawan.length} Total
            </span>
          </div>
          <div className="relative w-full md:w-72">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Cari NIK atau Nama..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:border-teal-500 text-xs shadow-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-[10px] uppercase tracking-wider font-bold bg-slate-50/30">
                <th className="px-6 py-4 w-16 text-center">No</th>
                <th className="px-6 py-4">Nama Karyawan</th>
                <th className="px-6 py-4">Jabatan</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-sm font-medium">
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    <td className="px-6 py-4 text-center text-slate-400 font-medium">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800 group-hover:text-teal-600 transition-colors">
                          {item.nama}
                        </span>
                        <span className="text-[10px] text-slate-400 tracking-tighter">
                          {item.nik}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs">
                      <span className="bg-slate-100 px-2 py-1 rounded text-slate-600 font-bold border border-slate-200">
                        {item.jabatan?.jabatan || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-md text-[10px] font-black uppercase border ${item.status_aktif ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100"}`}
                      >
                        {item.status_aktif ? "Aktif" : "Off"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-md transition-all"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-slate-400 text-xs font-bold uppercase tracking-widest opacity-40"
                  >
                    Data tidak ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Style Sesuai Permintaan */}
        <div className="p-4 border-t border-slate-100 bg-white flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            Showing{" "}
            <span className="text-slate-700">{indexOfFirstItem + 1}</span> -{" "}
            <span className="text-slate-700">
              {Math.min(indexOfLastItem, filteredKaryawan.length)}
            </span>{" "}
            of <span className="text-slate-700">{filteredKaryawan.length}</span>{" "}
            Karyawan
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-30 transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${
                    currentPage === i + 1
                      ? "bg-teal-500 text-white shadow-md shadow-teal-500/20 border-teal-500"
                      : "text-slate-500 hover:bg-slate-100 border border-transparent"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-30 transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedKaryawan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="bg-slate-800 p-8 text-white relative">
              <h3 className="text-2xl font-bold tracking-tight">
                {selectedKaryawan.nama}
              </h3>
              <p className="text-slate-400 text-sm mt-1 uppercase font-bold tracking-widest">
                {selectedKaryawan.jabatan?.jabatan || "No Position"}
              </p>
              <button
                onClick={() => setSelectedKaryawan(null)}
                className="absolute right-6 top-6 h-8 w-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all"
              >
                ✕
              </button>
            </div>
            <div className="p-8 space-y-4">
              <div className="grid grid-cols-2 border-b pb-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  NIK
                </span>
                <span className="text-sm font-bold text-slate-700">
                  {selectedKaryawan.nik}
                </span>
              </div>
              <div className="grid grid-cols-2 border-b pb-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  Email
                </span>
                <span className="text-sm font-bold text-slate-700">
                  {selectedKaryawan.email}
                </span>
              </div>
              <div className="grid grid-cols-2 border-b pb-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  TTL
                </span>
                <span className="text-sm font-bold text-slate-700">
                  {selectedKaryawan.tempat_lahir},{" "}
                  {selectedKaryawan.tanggal_lahir}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  Alamat
                </span>
                <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl italic leading-relaxed">
                  {selectedKaryawan.alamat || "Alamat tidak tersedia"}
                </p>
              </div>
            </div>
            <div className="p-4 bg-slate-50 flex justify-end">
              <button
                onClick={() => setSelectedKaryawan(null)}
                className="px-6 py-2 bg-white border rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
