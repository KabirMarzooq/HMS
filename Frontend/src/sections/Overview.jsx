import React, { useState, useEffect } from "react";
import {
  Users,
  Calendar,
  Clock,
  MessageSquare,
  Search,
  Filter,
  MoreVertical,
} from "lucide-react";
// import axios from "axios";
import api from "../services/api";
import { toast } from "react-hot-toast";

export default function Overview() {
  // 1. State for Data and Search
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPatients: 0,
    todayCount: 0,
    pendingCount: 0,
    messageCount: 0,
  });
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    let isMounted = true; // ✅ Prevent state updates if component unmounts

    const fetchDashboardData = async () => {
      try {
        const response = await api.get("/doctor/dashboard-overview");

        // ✅ Only update state if component is still mounted
        if (isMounted) {
          // ✅ Safely access nested data with optional chaining
          setStats(response.data?.stats || {});
          setPatients(response.data?.patients || []);
        }
      } catch (error) {
        console.error("Dashboard Fetch Error:", error);

        if (isMounted) {
          // ✅ More specific error messages based on status
          if (error.response?.status === 401) {
            toast.error("Session expired. Please login again.");
          } else if (error.response?.status === 403) {
            toast.error("Access denied. Check your permissions.");
          } else {
            toast.error(
              error.response?.data?.message || "Failed to load dashboard data",
            );
          }
        }
      } finally {
        // ✅ Only update loading state if still mounted
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDashboardData();

    // ✅ Cleanup function to prevent memory leaks
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading)
    return <div className="p-6 text-slate-400">Loading Dashboard...</div>;

  // 2. Logic to filter patients based on search input
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6">
      {/* 3. Hero Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          label="Total Patients"
          value={stats.totalPatients}
          icon={<Users size={24} />}
          color="text-teal-500"
          bg="bg-teal-500/10"
        />
        <StatCard
          label="Today's Appts"
          value={stats.todayCount}
          icon={<Calendar size={24} />}
          color="text-blue-500"
          bg="bg-blue-500/10"
        />
        <StatCard
          label="Pending Requests"
          value={stats.pendingCount}
          icon={<Clock size={24} />}
          color="text-amber-500"
          bg="bg-amber-500/10"
        />
        <StatCard
          label="New Messages"
          value={stats.messageCount}
          icon={<MessageSquare size={24} />}
          color="text-purple-500"
          bg="bg-purple-500/10"
        />
      </div>

      {/* 4. Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
        <div className="relative w-full md:max-w-md">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Search patients by name..."
            className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl py-3 pl-12 pr-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none transition-all shadow-sm dark:shadow-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer shadow-sm dark:shadow-none">
          <Filter size={18} /> Filter by Status
        </button>
      </div>

      {/* 5. Patient List Table */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm transition-colors duration-300">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="p-5 text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                Patient
              </th>
              <th className="p-5 text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                Last Visit
              </th>
              <th className="p-5 text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                Condition
              </th>
              <th className="p-5 text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-widest text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {filteredPatients.map((patient) => (
              <tr
                key={patient.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group"
              >
                <td className="p-5 flex items-center gap-4">
                  <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center font-bold text-white uppercase">
                    {patient.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {patient.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-500">
                      #{patient.id.toString().padStart(4, "0")}
                    </p>
                  </div>
                </td>
                <td className="p-5 text-slate-600 dark:text-slate-300 text-sm">
                  {patient.last_appointment_date || "New Patient"}
                </td>
                <td className="p-5">
                  <span className="px-3 py-1 bg-teal-50 dark:bg-slate-900 rounded-full text-xs text-teal-600 dark:text-teal-500 border border-teal-100 dark:border-teal-500/20">
                    {patient.latest_symptom || "General Checkup"}
                  </span>
                </td>
                <td className="p-5 text-right">
                  <button className="text-slate-400 hover:text-teal-600 dark:text-slate-500 dark:hover:text-teal-500 p-2 transition-colors cursor-pointer">
                    <MoreVertical size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Helper component for the Stats Cards to keep the main return clean
const StatCard = ({ label, value, icon, color, bg }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 flex items-center gap-5 transition-colors duration-300">
    <div
      className={`w-14 h-14 ${bg} ${color} rounded-2xl flex items-center justify-center`}
    >
      {icon}
    </div>
    <div>
      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
        {label}
      </p>
      <h4 className="text-2xl font-bold text-slate-900 dark:text-white">
        {value}
      </h4>
    </div>
  </div>
);
