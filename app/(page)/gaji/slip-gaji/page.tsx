"use client";
import { useState } from "react";
import { Eye, Download } from "lucide-react";
// IMPORT MODAL YANG BARU DIBUAT
import SlipGajiModal from "@/components/modals/SlipGajiModal"; 

export default function SlipGajiPage() {
  const [isModalOpen, setIsModalOpen] = useState    (false);
  const [selectedData, setSelectedData] = useState<any>(null);

  // Data Dummy
  const dataRiwayat = [
    { 
      id: "EMP001", nama: "Esa Permana", posisi: "IT Support", 
      periode: "Maret 2026", total: 15300000, pokok: 15000000, 
      cuti: 500000, potongan: 200000, tanggalBayar: "2026-03-25", status: "PAID" 
    },
    { 
      id: "EMP001", nama: "Esa Permana", posisi: "IT Support", 
      periode: "Februari 2026", total: 14800000, pokok: 15000000, 
      cuti: 0, potongan: 200000, tanggalBayar: "2026-02-25", status: "PAID" 
    },
  ];

  const handleOpenModal = (item: any) => {
    setSelectedData(item);
    setIsModalOpen(true);
  };

  const formatIDR = (val: number) => 
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Riwayat Slip Gaji</h1>
        <p className="text-sm text-slate-500 font-medium">Unduh slip gaji bulanan Anda dengan mudah.</p>
      </div>

      <div className="bg-white rounded-[20px] border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-4">Periode</th>
              <th className="px-6 py-4">Total Gaji Netto</th>
              <th className="px-6 py-4">Tanggal Pembayaran</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 font-medium">
            {dataRiwayat.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-5 font-bold text-slate-800">{item.periode}</td>
                <td className="px-6 py-5 font-black text-slate-900">{formatIDR(item.total)}</td>
                <td className="px-6 py-5 text-slate-500">{item.tanggalBayar}</td>
                <td className="px-6 py-5 text-center">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black">{item.status}</span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex justify-center gap-2">
                    {/* KLIK TOMBOL INI UNTUK BUKA MODAL */}
                    <button onClick={() => handleOpenModal(item)} className="p-2 text-slate-400 hover:text-teal-500 hover:bg-teal-50 rounded-lg">
                      <Eye size={18} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg">
                      <Download size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PANGGIL MODAL DI SINI */}
      <SlipGajiModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        data={selectedData} 
      />
    </div>
  );
}