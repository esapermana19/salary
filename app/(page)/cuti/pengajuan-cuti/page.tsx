"use client";
import { useState } from "react";
import { FileText, Calendar, Upload, Info, Asterisk, ChevronRight } from "lucide-react";

export default function PengajuanCutiPage() {
  const [tipeCuti, setTipeCuti] = useState("");
  const [formData, setFormData] = useState({
    mulai: "",
    berakhir: "",
    alasan: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Pengajuan cuti berhasil dikirim! Silakan cek menu Riwayat untuk memantau status.");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
            <Calendar size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">Formulir Pengajuan Cuti</h1>
            <p className="text-xs text-slate-500">Pastikan Anda telah membaca ketentuan sebelum mengajukan.</p>
          </div>
        </div>
      </div>

      {/* Bagian Atas: Ketentuan Cuti */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Info size={18} className="text-blue-500" />
          <h2 className="font-bold text-slate-800 text-sm tracking-wide uppercase">Ketentuan Cuti</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: 1, text: "Pengajuan cuti dilakukan minimal 3 hari sebelum tanggal mulai." },
            { id: 2, text: "Cuti sakit wajib melampirkan surat keterangan dokter." },
            { id: 3, text: "Persetujuan cuti bergantung pada kebijakan manajer divisi." }
          ].map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-xl border border-slate-100 flex gap-3 shadow-sm">
              <span className="flex-shrink-0 w-6 h-6 bg-teal-600 text-white flex items-center justify-center rounded-lg text-[10px] font-black">
                {item.id}
              </span>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bagian Bawah: Form Pengajuan */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Tipe Cuti */}
            <div className="md:col-span-2">
              <label className="flex items-center gap-1 text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">
                Jenis Cuti <Asterisk size={10} className="text-red-500" />
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["Tahunan", "Sakit", "Alasan Penting", "Cuti Bersama"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setTipeCuti(type)}
                    className={`py-3 px-2 rounded-xl border text-[11px] font-bold transition-all ${
                      tipeCuti === type 
                      ? "bg-teal-600 border-teal-600 text-white shadow-md shadow-teal-100" 
                      : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Tanggal Mulai */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block">Tanggal Mulai</label>
              <div className="relative">
                <input 
                  type="date" 
                  required
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all font-medium text-slate-700"
                />
              </div>
            </div>

            {/* Tanggal Berakhir */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block">Tanggal Berakhir</label>
              <div className="relative">
                <input 
                  type="date" 
                  required
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all font-medium text-slate-700"
                />
              </div>
            </div>

            {/* Alasan */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block">Alasan Detail</label>
              <textarea 
                required
                placeholder="Berikan alasan lengkap pengajuan cuti Anda..."
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm h-28 outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all resize-none"
              ></textarea>
            </div>

            {/* Upload Dokumen */}
            {(tipeCuti === "Sakit" || tipeCuti === "Alasan Penting") && (
              <div className="md:col-span-2 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block">
                  Dokumen Pendukung {tipeCuti === "Sakit" ? "(Surat Dokter)" : ""}
                </label>
                <div className="group border-2 border-dashed border-slate-200 p-8 rounded-2xl flex flex-col items-center bg-slate-50 hover:bg-slate-100 hover:border-teal-400 transition-all cursor-pointer">
                  <div className="p-3 bg-white rounded-full shadow-sm text-slate-400 group-hover:text-teal-500 transition-colors mb-3">
                    <Upload size={24} />
                  </div>
                  <p className="text-xs font-bold text-slate-600">Klik untuk unggah dokumen</p>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-tight font-medium">PDF, JPG, PNG • Maksimal 2MB</p>
                  <input type="file" className="hidden" />
                </div>
              </div>
            )}
          </div>

          <div className="pt-4">
            <button 
              type="submit" 
              className="group w-full py-4 bg-teal-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-teal-700 transition-all shadow-lg shadow-teal-100 flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              Kirim Pengajuan Cuti
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}