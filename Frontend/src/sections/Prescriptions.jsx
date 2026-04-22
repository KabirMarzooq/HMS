import React, { useEffect, useState } from "react";
import {
  Pill,
  Search,
  Plus,
  X,
  Calendar,
  User,
  FileText,
  Clipboard,
  History,
  CheckCircle,
} from "lucide-react";
import api from "../services/api";
import { toast } from "react-hot-toast";

export default function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Sidebar State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    patient_id: "",
    medication: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [prescRes, patientsRes] = await Promise.all([
        api.get("/doctor/prescriptions"),
        api.get("/doctor/patients"), // Assuming this endpoint exists to populate the dropdown
      ]);
      setPrescriptions(prescRes.data);
      setPatients(patientsRes.data);
    } catch (err) {
      toast.error("Failed to load records.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.patient_id || !formData.medication) {
      return toast.error("Please fill in required fields.");
    }

    try {
      await api.post("/doctor/prescriptions", formData);
      toast.success("Prescription Issued!");
      setIsSidebarOpen(false);
      setFormData({
        patient_id: "",
        medication: "",
        dosage: "",
        frequency: "",
        duration: "",
        instructions: "",
      });
      fetchData(); // Refresh list
    } catch (err) {
      toast.error("Error issuing prescription.");
    }
  };

  const filteredPrescriptions = prescriptions.filter(
    (p) =>
      p.patient?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.medication?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading)
    return (
      <div className="p-6 text-slate-400 animate-pulse">
        Syncing Pharmacy Records...
      </div>
    );

  return (
    <div className="p-2 transition-colors duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Prescription Management
          </h2>
          <p className="text-slate-500 text-sm">
            Review history and issue new medication
          </p>
        </div>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-teal-500/20 transition-all active:scale-95 cursor-pointer"
        >
          <Plus size={20} /> New Prescription
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative w-full max-w-xl mb-8">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Search by patient or medication..."
          className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl py-3 pl-12 pr-4 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500 transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* History Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPrescriptions.map((p) => (
          <div
            key={p.id}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-5 hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 bg-teal-500/10 rounded-xl flex items-center justify-center text-teal-600">
                <Pill size={20} />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <Calendar size={12} /> {p.created_at?.split("T")[0]}
              </span>
            </div>

            <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">
              {p.medication}
            </h3>
            <p className="text-slate-500 text-xs font-medium mb-4 flex items-center gap-1">
              <User size={12} /> Patient:{" "}
              <span className="text-teal-600">{p.patient?.name}</span>
            </p>

            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-4 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-bold uppercase">
                  Dosage
                </span>
                <span className="text-slate-700 dark:text-slate-300 font-medium">
                  {p.dosage}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-bold uppercase">
                  Frequency
                </span>
                <span className="text-slate-700 dark:text-slate-300 font-medium">
                  {p.frequency}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide-over Form Sidebar */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-slate-800 p-8 transform transition-transform duration-300 border-l border-slate-200 dark:border-slate-700 ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              New Prescription
            </h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleCreate} className="space-y-5">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">
                Patient
              </label>
              <select
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-teal-500 dark:text-white"
                value={formData.patient_id}
                onChange={(e) =>
                  setFormData({ ...formData, patient_id: e.target.value })
                }
              >
                <option value="">Select a patient</option>
                {patients.map((pat) => (
                  <option key={pat.id} value={pat.id}>
                    {pat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">
                Medication Name
              </label>
              <input
                type="text"
                placeholder="e.g. Paracetamol"
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-teal-500 dark:text-white"
                value={formData.medication}
                onChange={(e) =>
                  setFormData({ ...formData, medication: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">
                  Dosage
                </label>
                <input
                  type="text"
                  placeholder="500mg"
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-teal-500 dark:text-white"
                  value={formData.dosage}
                  onChange={(e) =>
                    setFormData({ ...formData, dosage: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">
                  Frequency
                </label>
                <input
                  type="text"
                  placeholder="e.g. Twice daily"
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-teal-500 dark:text-white"
                  value={formData.frequency}
                  onChange={(e) =>
                    setFormData({ ...formData, frequency: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">
                  Duration
                </label>
                <input
                  type="text"
                  placeholder="7 Days"
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-teal-500 dark:text-white"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">
                Special Instructions
              </label>
              <textarea
                rows="3"
                placeholder="Take after meals..."
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-teal-500 dark:text-white resize-none"
                value={formData.instructions}
                onChange={(e) =>
                  setFormData({ ...formData, instructions: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-teal-500/25 mt-4 cursor-pointer"
            >
              Issue Prescription
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
