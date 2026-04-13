"use client";

import { useEffect, useState, useRef } from "react";
import {
  Plus,
  Trash2,
  Edit,
  Save,
  X,
  UserPlus,
  Search,
  ChevronLeft,
  ChevronRight,
  Mail,
  CreditCard,
  MapPin,
  Briefcase,
  Calendar,
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
  const [selectedKaryawan, setSelectedKaryawan] = useState<Karyawan | null>(
    null,
  );
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [formData, setFormData] = useState({
    nik: "",
    nama: "",
    email: "",
    tempatLahir: "",
    tanggalLahir: "",
    alamat: "",
    jabatan: "",
    status: "Tetap",
  });

  // Tambahkan di bawah state dataKaryawan
  const [error, setError] = useState<string | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

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
  // ===============================
  // GET DATA JABATAN DARI API
  // ===============================
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
      if (res.ok) {
        setJabatanList(data.data || data);
      }
    } catch (err: unknown) {
      console.error("Fetch Jabatan Error:", err);
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
      if (!res.ok)
        throw new Error(data.message || "Gagal mengambil data karyawan");
      setKaryawanList(data.data || data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
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

  // Logic Filtering
  const filteredKaryawan = karyawanList.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.jabatan?.jabatan.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};
  // Logic Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredKaryawan.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(filteredKaryawan.length / itemsPerPage);

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
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          nik: formData.nik,
          nama: formData.nama,
          email: formData.email,
          tempat_lahir: formData.tempatLahir,
          tanggal_lahir: formData.tanggalLahir,
          alamat: formData.alamat,
          id_jabatan: parseInt(formData.jabatan), // Pastikan ini ID, bukan nama
          status_aktif: formData.status === "Aktif",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message ||
            `Gagal ${editingId ? "mengupdate" : "menambahkan"} karyawan`,
        );
      }

      resetForm();
      fetchKaryawan();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
  setFormData({
    nik: "",
    nama: "",
    email: "",
    tempatLahir: "",
    tanggalLahir: "",
    alamat: "",
    jabatan: "",
    status: "Aktif",
  });
  setEditingId(null);
};

  return (
    <div className="space-y-6 p-2 text-slate-800">
      {/* Header Halaman */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Data Karyawan</h1>
          <p className="text-slate-500 font-medium text-xs mt-1 text-slate-400">
            Kelola informasi detail dan status kerja karyawan
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold transition-all duration-200 text-sm ${
            showForm
              ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
              : "bg-teal-500 text-white hover:bg-teal-600 shadow-md shadow-teal-500/20 active:scale-95"
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

      {/* FORM TAMBAH DATA (STRUKTUR SESUAI GAMBAR) */}
      {showForm && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2 mb-6 text-slate-800 border-b pb-4">
            <div className="p-2 bg-teal-500 rounded-lg text-white">
              <Plus size={20} />
            </div>
            <h2 className="text-md font-bold">Tambah Karyawan</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Baris 1: NIK & Nama */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                  NIK
                </label>
                <input
                  name="nik"
                  value={formData.nik}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="NIK"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-teal-500/10 focus:border-teal-500 transition-all font-semibold"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                  Nama
                </label>
                <input
                  name="nama"
                  value={formData.nama}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Nama Lengkap"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-teal-500/10 focus:border-teal-500 transition-all font-semibold"
                  required
                />
              </div>
            </div>

            {/* Baris 2: Email */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                Email
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                type="email"
                placeholder="email@company.com"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-teal-500/10 focus:border-teal-500 transition-all"
                required
              />
            </div>

            {/* Baris 3: Tempat Lahir & Tanggal Lahir */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                  Tempat Lahir
                </label>
                <input
                  name="tempatLahir"
                  value={formData.tempatLahir}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Kota"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-teal-500/10 focus:border-teal-500 transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                  Tanggal Lahir
                </label>
                <input
                  name="tanggalLahir"
                  value={formData.tanggalLahir}
                  onChange={handleInputChange}
                  type="date"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-teal-500/10 focus:border-teal-500 transition-all text-slate-600"
                />
              </div>
            </div>

            {/* Baris 4: Alamat */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                Alamat
              </label>
              <textarea
                name="alamat"
                value={formData.alamat}
                onChange={handleInputChange}
                rows={3}
                placeholder="Alamat Lengkap"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-teal-500/10 focus:border-teal-500 transition-all resize-none"
              ></textarea>
            </div>

            {/* Baris 5: Jabatan */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                Jabatan
              </label>
              <select
                name="jabatan"
                value={formData.jabatan}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-teal-500/10 focus:border-teal-500 transition-all cursor-pointer appearance-none"
                required
              >
                <option value="">Pilih Jabatan</option>
                {jabatanList.map((jbtn: any) => (
                  <option key={jbtn.id} value={jbtn.nama_jabatan || jbtn.nama}>
                    {jbtn.nama_jabatan || jbtn.nama}
                  </option>
                ))}
              </select>
            </div>

            {/* Baris 6: Status Aktif */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                Status Aktif
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-teal-500/10 focus:border-teal-500 transition-all cursor-pointer font-bold text-teal-600"
              >
                <option value="Aktif">Aktif</option>
                <option value="Non-Aktif">Non-Aktif</option>
              </select>
            </div>

            {/* Tombol Simpan */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-teal-500 text-white py-3 rounded-xl font-bold hover:bg-teal-600 active:scale-[0.98] transition-all shadow-md shadow-teal-500/20 text-sm"
              >
                Simpan
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
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
              Database Karyawan Aktif
            </span>
          </div>

          <div className="relative w-full md:w-72 group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500"
              size={16}
            />
            <input
              type="text"
              placeholder="Cari nama atau jabatan..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-teal-500/10 focus:border-teal-500 text-xs font-medium transition-all"
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
                    <td className="px-6 py-4 text-center text-slate-400 font-bold">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-800 group-hover:text-teal-600 transition-colors">
                        {item.nama}
                      </p>
                      <p className="text-[9px] text-slate-400 uppercase tracking-tighter">
                        ID: EMP-{item.id}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold uppercase tracking-tight">
                        {item.jabatan?.jabatan || jabatanList.find(j => j.id === item.id_jabatan)?.jabatan || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {item.status_aktif ? (
                          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-200">Aktif</span>
                        ) : (
                          <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-600 text-[10px] font-black uppercase tracking-widest border border-rose-200">Off</span>
                        )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1">
                        <button className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center opacity-30">
                      <Search size={32} className="mb-2" />
                      <p className="text-xs font-bold uppercase tracking-widest">
                        Karyawan tidak ditemukan
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION CONTROLS */}
        <div className="p-4 border-t border-slate-100 bg-white flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            Showing{" "}
            <span className="text-slate-700">{indexOfFirstItem + 1}</span> -{" "}
            <span className="text-slate-700">
              {Math.min(indexOfLastItem, filteredKaryawan.length)}
            </span>{" "}
            of <span className="text-slate-700">{filteredKaryawan.length}</span>{" "}
            Employees
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-30 transition-all"
            >
              <ChevronLeft size={18} />
            </button>

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

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-30 transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
