"use client";
import { useState, useEffect } from "react";
import { History, LogIn, LogOut, ChevronDown, ChevronUp, FileText } from "lucide-react";

export default function KehadiranKaryawanPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [hasCheckedOut, setHasCheckedOut] = useState(false);
  const [isHistoryVisible, setIsHistoryVisible] = useState(true);
  const [izinType, setIzinType] = useState<"izin" | "sakit" | "">("");
  const [keteranganIzin, setKeteranganIzin] = useState("");
  
  // State Riwayat dengan Data Dummy Awal
  const [riwayat, setRiwayat] = useState([
    { tanggal: "07 Mar 2026", masuk: "08:00", pulang: "17:00", status: "HADIR", ket: "Tepat Waktu" },
    { tanggal: "06 Mar 2026", masuk: "-", pulang: "-", status: "IZIN", ket: "Urusan Keluarga" },
  ]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Logika Hitung Selisih Waktu
  const hitungSelisih = (targetHour: number, current: Date, tipe: "masuk" | "pulang") => {
    const target = new Date(current);
    target.setHours(targetHour, 0, 0);
    const selisihMilidetik = current.getTime() - target.getTime();
    const totalMenit = Math.floor(Math.abs(selisihMilidetik) / (1000 * 60));
    const jam = Math.floor(totalMenit / 60);
    const menit = totalMenit % 60;
    const waktuStr = `${jam > 0 ? jam + " Jam " : ""}${menit} Menit`;

    if (tipe === "masuk" && selisihMilidetik > 0) return `Terlambat ${waktuStr}`;
    if (tipe === "pulang" && selisihMilidetik < 0) return `Pulang Awal ${waktuStr}`;
    return "Tepat Waktu";
  };

  const handleCheckIn = () => {
    const jamSekarang = currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const ket = hitungSelisih(8, currentTime, "masuk");
    const dataBaru = {
      tanggal: currentTime.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      masuk: jamSekarang,
      pulang: "-",
      status: "HADIR",
      ket: ket
    };
    setRiwayat([dataBaru, ...riwayat]);
    setHasCheckedIn(true);
  };

  const handleCheckOut = () => {
    const jamSekarang = currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const ketPulang = hitungSelisih(17, currentTime, "pulang");
    const updateRiwayat = [...riwayat];
    updateRiwayat[0].pulang = jamSekarang;
    if (ketPulang !== "Tepat Waktu") updateRiwayat[0].ket += ` & ${ketPulang}`;
    setRiwayat(updateRiwayat);
    setHasCheckedOut(true);
  };

  const handleAjukanIzin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!izinType) return alert("Pilih Izin atau Sakit!");
    const dataIzin = {
      tanggal: currentTime.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      masuk: "-",
      pulang: "-",
      status: izinType.toUpperCase(),
      ket: keteranganIzin
    };
    setRiwayat([dataIzin, ...riwayat]);
    setIzinType("");
    setKeteranganIzin("");
    alert("Pengajuan Berhasil!");
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10">
      {/* Header Jam */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">Presensi Mandiri</h1>
        <div className="text-right">
          <span className="text-2xl font-mono font-bold text-teal-600 block leading-none">
            {currentTime.toLocaleTimeString('id-ID')}
          </span>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            {currentTime.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}
          </span>
        </div>
      </div>

      {/* Baris Atas Sejajar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Check In */}
        <div className={`p-5 rounded-2xl border-2 transition-all bg-white ${hasCheckedIn ? "border-emerald-500 bg-emerald-50/30" : "border-slate-100 shadow-sm"}`}>
          <div className="flex justify-between mb-4">
            <div className={`p-2 rounded-lg ${hasCheckedIn ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400"}`}><LogIn size={20} /></div>
            {hasCheckedIn && <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded">Selesai</span>}
          </div>
          <h3 className="font-bold text-slate-800 text-sm">Check In</h3>
          <p className="text-[10px] text-slate-400 mb-4">Masuk Kerja (08:00)</p>
          <button onClick={handleCheckIn} disabled={hasCheckedIn} className={`w-full py-2 rounded-lg font-bold text-xs transition-all ${hasCheckedIn ? "bg-slate-100 text-slate-400" : "bg-teal-600 text-white hover:bg-teal-700"}`}>Check In</button>
        </div>

        {/* Check Out */}
        <div className={`p-5 rounded-2xl border-2 transition-all bg-white ${hasCheckedOut ? "border-orange-500 bg-orange-50/30" : "border-slate-100 shadow-sm"}`}>
          <div className="flex justify-between mb-4">
            <div className={`p-2 rounded-lg ${hasCheckedOut ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-400"}`}><LogOut size={20} /></div>
            {hasCheckedOut && <span className="text-[10px] font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded">Selesai</span>}
          </div>
          <h3 className="font-bold text-slate-800 text-sm">Check Out</h3>
          <p className="text-[10px] text-slate-400 mb-4">Pulang Kerja (17:00)</p>
          <button onClick={handleCheckOut} disabled={!hasCheckedIn || hasCheckedOut} className={`w-full py-2 rounded-lg font-bold text-xs transition-all ${hasCheckedOut ? "bg-slate-100 text-slate-400" : !hasCheckedIn ? "bg-slate-50 text-slate-300" : "bg-orange-600 text-white hover:bg-orange-700"}`}>Check Out</button>
        </div>

        {/* Form Izin/Sakit */}
        <form onSubmit={handleAjukanIzin} className="p-5 rounded-2xl border-2 border-slate-100 bg-white shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-lg bg-slate-800 text-white"><FileText size={20} /></div>
            <h3 className="font-bold text-slate-800 text-sm">Izin / Sakit</h3>
          </div>
          <div className="flex gap-2 mb-2">
            {["izin", "sakit"].map((t) => (
              <button key={t} type="button" onClick={() => setIzinType(t as any)} className={`flex-1 py-1 rounded border text-[10px] font-bold capitalize ${izinType === t ? "bg-slate-800 text-white" : "text-slate-500"}`}>{t}</button>
            ))}
          </div>
          <input value={keteranganIzin} onChange={(e) => setKeteranganIzin(e.target.value)} placeholder="Alasan..." className="w-full p-2 border border-slate-200 rounded text-xs mb-2 outline-none focus:ring-1 focus:ring-slate-800" />
          <button type="submit" className="w-full py-2 bg-slate-100 text-slate-800 hover:bg-slate-200 rounded-lg font-bold text-xs transition-all tracking-wide">Kirim Pengajuan</button>
        </form>
      </div>

      {/* Tabel Riwayat Collapsible */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <button onClick={() => setIsHistoryVisible(!isHistoryVisible)} className="w-full p-4 flex justify-between items-center bg-slate-50/50 hover:bg-slate-50 transition-colors border-b border-slate-100">
          <div className="flex items-center gap-2">
            <History size={18} className="text-teal-600" />
            <span className="font-bold text-slate-700 text-sm">Riwayat Aktivitas</span>
          </div>
          {isHistoryVisible ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {isHistoryVisible && (
          <div className="overflow-x-auto animate-in fade-in slide-in-from-top-1">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <th className="px-6 py-3">Tanggal</th>
                  <th className="px-6 py-3 text-center">Masuk</th>
                  <th className="px-6 py-3 text-center">Pulang</th>
                  <th className="px-6 py-3 text-center">Status</th>
                  <th className="px-6 py-3">Keterangan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm font-medium">
                {riwayat.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-slate-700">{item.tanggal}</td>
                    <td className="px-6 py-4 text-center text-teal-600 font-mono">{item.masuk}</td>
                    <td className="px-6 py-4 text-center text-orange-600 font-mono">{item.pulang}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-[9px] font-black ${item.status === 'HADIR' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{item.status}</span>
                    </td>
                    <td className="px-6 py-4 text-xs italic text-slate-500">{item.ket}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}