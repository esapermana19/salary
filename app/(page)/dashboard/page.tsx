"use client";

import { useEffect, useState } from "react";
import { 
  Users, 
  Building2, 
  Wallet, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  Activity
} from "lucide-react"; // Pastikan sudah install lucide-react

export default function Dashboard() {
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    // Mengambil data user dari localStorage yang disimpan saat login
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUserName(userData.name || "Admin HRD");
    }
  }, []);

  const stats = [
    { 
      label: "Total Karyawan", 
      value: "124", 
      trend: "+12%", 
      icon: <Users className="w-6 h-6 text-teal-600" />,
      trendUp: true 
    },
    { 
      label: "Divisi", 
      value: "8", 
      trend: "Stable", 
      icon: <Building2 className="w-6 h-6 text-teal-600" />,
      trendUp: null 
    },
    { 
      label: "Payroll Bulan Ini", 
      value: "Rp 450M", 
      trend: "+5%", 
      icon: <Wallet className="w-6 h-6 text-teal-600" />,
      trendUp: true 
    },
    { 
      label: "Pending Approval", 
      value: "12", 
      trend: "-2", 
      icon: <Clock className="w-6 h-6 text-teal-600" />,
      trendUp: false 
    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Welcome back, <span className="text-teal-600">{userName}!</span>
        </h1>
        <p className="text-slate-500 font-medium mt-1">
          Here's what's happening with your payroll system today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100 hover:border-teal-500/50 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-teal-50 transition-colors">
                {stat.icon}
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                stat.trendUp === true ? "bg-teal-50 text-teal-600" : 
                stat.trendUp === false ? "bg-red-50 text-red-600" : 
                "bg-slate-50 text-slate-500"
              }`}>
                {stat.trend}
              </span>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-800 mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-6 bg-teal-500 rounded-full"></div>
            <h2 className="text-xl font-bold text-slate-800">Recent Activities</h2>
          </div>
          
          <div className="space-y-6">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-teal-50 transition-colors">
                  <Activity className="w-5 h-5 text-slate-400 group-hover:text-teal-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 group-hover:text-teal-600 transition-colors">
                    Updated Divisi "IT Support"
                  </h4>
                  <p className="text-xs text-slate-400 font-medium">{i + 2 * (i + 1)} hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Reports Section (Placeholder) */}
        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[32px] flex flex-col items-center justify-center p-8 text-center">
          <div className="w-16 h-16 bg-white rounded-3xl shadow-sm flex items-center justify-center mb-4">
            <span className="text-2xl">🚀</span>
          </div>
          <h2 className="text-xl font-bold text-slate-800">New Reports Coming Soon</h2>
          <p className="text-sm text-slate-500 max-w-[250px] mt-2">
            We're building advanced analytics for your payroll.
          </p>
        </div>
      </div>
    </div>
  );
}