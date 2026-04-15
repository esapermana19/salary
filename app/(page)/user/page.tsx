"use client";

import { useEffect, useState } from "react";
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
  Loader2,
} from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function UserPage() {
  const [userList, setUserList] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Search & Pagination states
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  // 1. Ambil Data User
  const fetchUser = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/master-user", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal mengambil data user");
      setUserList(data.data || data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // 2. Logika Edit - Mengisi form dan scroll ke atas
  const handleEdit = (item: User) => {
    setEditingId(item.id);
    setName(item.name);
    setEmail(item.email);
    setRole(item.role);
    setPassword(""); // Kosongkan password saat edit
    setShowForm(true); // Penting: Buka form otomatis
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 3. Simpan Data (Create & Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = editingId
      ? `https://payroll.politekniklp3i-tasikmalaya.ac.id/api/master-user/${editingId}`
      : "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/master-user";

    const method = editingId ? "PATCH" : "POST";

    const body: any = { name, email, role };
    // Password hanya dikirim jika diisi (untuk update) atau wajib jika create
    if (password) body.password = password;

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal memproses data");

      alert(editingId ? "User berhasil diperbarui!" : "User berhasil ditambahkan!");
      resetForm();
      setShowForm(false);
      fetchUser();
    } catch (err: any) {
      setError(err.message);
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // 4. Hapus Data
  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus user ini?")) return;
    try {
      const res = await fetch(`https://payroll.politekniklp3i-tasikmalaya.ac.id/api/master-user/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      if (!res.ok) throw new Error("Gagal menghapus user");
      alert("User berhasil dihapus");
      fetchUser();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setRole("user");
    setEditingId(null);
  };

  // Logic Filtering & Pagination
  const filteredUser = userList.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUser.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUser.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="space-y-6 p-2 text-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Manajemen User</h1>
          <p className="text-slate-500 font-medium text-xs mt-1">Kelola akun akses sistem pengguna</p>
        </div>
        <button
          onClick={() => {
            if (showForm) resetForm();
            setShowForm(!showForm);
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold transition-all text-sm ${
            showForm ? "bg-slate-100 text-slate-600" : "bg-teal-500 text-white shadow-md shadow-teal-500/20 active:scale-95"
          }`}
        >
          {showForm ? <><X size={18} /> Batal</> : <><Plus size={18} /> Tambah User</>}
        </button>
      </div>

      {/* Form Section */}
      {showForm && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2 mb-6 border-b pb-4">
            <UserPlus size={20} className="text-teal-500" />
            <h2 className="text-md font-bold">{editingId ? "Edit Akun User" : "Tambah User Baru"}</h2>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Nama Lengkap</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm bg-slate-50/50" required />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm bg-slate-50/50" required />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Password {editingId && "(Kosongkan jika tetap)"}</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm bg-slate-50/50" required={!editingId} />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Role Akses</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm bg-slate-50/50">
                <option value="admin">Administrator</option>
                <option value="karyawan">Karyawan</option>
              </select>
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button type="submit" disabled={loading} className="w-full md:w-auto bg-slate-800 text-white px-8 py-3 rounded-lg font-bold hover:bg-teal-600 transition-all flex items-center justify-center gap-2 text-sm shadow-sm">
                {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                {editingId ? "Perbarui Akun" : "Simpan Akun"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table Section - GAYA TIDAK BERUBAH */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="w-1 h-4 bg-teal-500 rounded-full"></div>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Daftar Pengguna Sistem</span>
            <span className="ml-2 text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded font-bold uppercase">{filteredUser.length} Akun</span>
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Cari user..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-teal-500/10 focus:border-teal-500 text-xs font-medium text-slate-700 shadow-sm" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-[10px] uppercase tracking-wider font-bold bg-slate-50/30">
                <th className="px-6 py-4 w-16 text-center">No</th>
                <th className="px-6 py-4">Nama User</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4 text-center">Status Role</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-sm font-medium">
              {currentItems.length > 0 ? (
                currentItems.map((user, index) => (
                  <tr key={user.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4 text-center text-slate-400 font-medium">{indexOfFirstItem + index + 1}</td>
                    <td className="px-6 py-4"><span className="font-bold text-slate-800 group-hover:text-teal-600 transition-colors">{user.name}</span></td>
                    <td className="px-6 py-4 text-slate-500 text-xs">{user.email}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider border ${user.role === "admin" ? "bg-purple-50 text-purple-600 border-purple-100" : "bg-blue-50 text-blue-600 border-blue-100"}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1">
                        <button onClick={() => handleEdit(user)} className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-md transition-all"><Edit size={16} /></button>
                        <button onClick={() => handleDelete(user.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 text-xs font-bold uppercase tracking-widest opacity-40">User tidak ditemukan</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Style Permintaan Kamu */}
        <div className="p-4 border-t border-slate-100 bg-white flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            Showing <span className="text-slate-700">{indexOfFirstItem + 1}</span> - <span className="text-slate-700">{Math.min(indexOfLastItem, filteredUser.length)}</span> of <span className="text-slate-700">{filteredUser.length}</span> Users
          </p>
          <div className="flex items-center gap-2">
            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-30 transition-all"><ChevronLeft size={18} /></button>
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
            <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages || totalPages === 0} className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-30 transition-all"><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}