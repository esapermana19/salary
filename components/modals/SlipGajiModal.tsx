"use client";
import { Printer, X } from "lucide-react";

interface SlipGajiProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    nama: string;
    id: string;
    posisi: string;
    periode: string;
    pokok: number;
    cuti: number;
    potongan: number;
    total: number;
    tanggalBayar: string;
  } | null;
}

export default function SlipGajiModal({ isOpen, onClose, data }: SlipGajiProps) {
  // Proteksi agar tidak blank jika data belum terpilih
  if (!isOpen || !data) return null;

  const formatIDR = (val: number) => 
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val || 0);

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-[24px] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* Header - Dark Theme */}
        <div className="bg-[#0f172a] p-8 text-white relative">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-black italic tracking-tighter">SALARY<span className="text-teal-400">APP</span></h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Official Payslip</p>
            </div>
            <button onClick={onClose} className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
              <X size={20} />
            </button>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Periode</p>
              <h3 className="text-lg font-bold">{data.periode}</h3>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Pay Date</p>
              <h3 className="text-base font-bold text-slate-200">{data.tanggalBayar}</h3>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Employee</p>
            <h4 className="text-lg font-bold text-slate-800">{data.nama}</h4>
            <p className="text-xs font-medium text-slate-500">{data.id} • {data.posisi}</p>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex justify-between text-sm font-bold">
              <span className="text-slate-500">Gaji Pokok</span>
              <span className="text-slate-800">{formatIDR(data.pokok)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold">
              <span className="text-slate-500">Uang Cuti</span>
              <span className="text-emerald-500">+{formatIDR(data.cuti)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold pt-2 border-t border-dashed">
              <span className="text-slate-500">Potongan</span>
              <span className="text-red-500">-{formatIDR(data.potongan)}</span>
            </div>
          </div>

          {/* Total Netto */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex justify-between items-center">
            <span className="text-[11px] font-black text-slate-500 uppercase">Total Netto</span>
            <span className="text-xl font-black text-[#0f172a]">{formatIDR(data.total)}</span>
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={() => window.print()} className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#0f172a] text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all">
              <Printer size={18} /> Print
            </button>
            <button onClick={onClose} className="px-6 py-3.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50">
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}