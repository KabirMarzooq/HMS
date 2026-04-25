import React, { useState, useEffect } from "react";
import {
  User,
  AlertTriangle,
  Droplets,
  Activity,
  Thermometer,
  Heart,
  Wind,
  FileText,
  Pill,
  X,
  ChevronRight,
  Calendar,
  Stethoscope,
  ClipboardList,
  ArrowLeft,
  Search,
  ShieldAlert,
} from "lucide-react";
import api from "../services/api";
import { toast } from "react-hot-toast";

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function AllMedicalReports() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Shared endpoint — accessible by admin and receptionist
    api
      .get("/patients")
      .then((res) => setPatients(res.data))
      .catch(() => toast.error("Failed to load patients."))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="p-6 text-slate-400 animate-pulse">
        Loading Patient Records...
      </div>
    );

  if (selectedPatient) {
    return (
      <PatientRecord
        patient={selectedPatient}
        onBack={() => setSelectedPatient(null)}
      />
    );
  }

  const filtered = patients.filter((p) =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Patient Records
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Select a patient to view their health folder
        </p>
      </div>

      <div className="relative w-full max-w-xl mb-6">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Search patients..."
          className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl py-3 pl-12 pr-4 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500 transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((patient) => (
          <button
            key={patient.id}
            onClick={() => setSelectedPatient(patient)}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-5 flex items-center gap-4 hover:shadow-md hover:border-teal-300 dark:hover:border-teal-600 transition-all text-left group cursor-pointer"
          >
            <div className="w-12 h-12 bg-teal-500 rounded-2xl flex items-center justify-center font-bold text-white text-lg uppercase flex-shrink-0">
              {patient.name?.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-slate-900 dark:text-white truncate">
                {patient.name}
              </p>
              <p className="text-xs text-slate-500 truncate">{patient.email}</p>
            </div>
            <ChevronRight
              size={18}
              className="text-slate-300 group-hover:text-teal-500 transition-colors flex-shrink-0"
            />
          </button>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-3 text-center py-16 text-slate-400">
            No patients found.
          </div>
        )}
      </div>
    </div>
  );
}

// ─── PATIENT RECORD (read-only health folder) ─────────────────────────────────
function PatientRecord({ patient, onBack }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  const fetchRecord = () => {
    // Shared endpoint — no /doctor prefix
    api
      .get(`/patients/${patient.id}/medical-record`)
      .then((res) => setData(res.data))
      .catch(() => toast.error("Failed to load medical record."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchRecord();
  }, [patient.id]);

  if (loading)
    return (
      <div className="p-6 text-slate-400 animate-pulse">
        Opening health folder...
      </div>
    );

  const profile = data?.patient?.profile;
  const records = data?.records || [];
  const prescriptions = data?.prescriptions || [];

  const tabs = [
    { id: "overview", label: "Overview", icon: <ClipboardList size={15} /> },
    {
      id: "prescriptions",
      label: "Prescriptions",
      icon: <Pill size={15} />,
      count: prescriptions.length,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-teal-600 transition-colors text-sm font-medium cursor-pointer"
      >
        <ArrowLeft size={16} /> All Patients
      </button>

      {/* ── FOLDER COVER (Patient Header) — NO edit/add buttons ── */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center font-bold text-white text-2xl uppercase">
              {data?.patient?.name?.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {data?.patient?.name}
              </h2>
              <p className="text-slate-500 text-sm">{data?.patient?.email}</p>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Patient #{String(patient.id).padStart(4, "0")}
              </p>
            </div>
          </div>

          {/* Read-only badge instead of action buttons */}
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-2xl">
            <ShieldAlert size={14} className="text-slate-400" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Read Only
            </span>
          </div>
        </div>

        {/* Critical Alerts */}
        {(profile?.allergies || profile?.chronic_conditions) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {profile?.allergies && (
              <div className="flex items-start gap-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-2xl p-4">
                <ShieldAlert
                  size={18}
                  className="text-red-500 flex-shrink-0 mt-0.5"
                />
                <div>
                  <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
                    Allergies
                  </p>
                  <p className="text-sm text-red-700 dark:text-red-400">
                    {profile.allergies}
                  </p>
                </div>
              </div>
            )}
            {profile?.chronic_conditions && (
              <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-2xl p-4">
                <AlertTriangle
                  size={18}
                  className="text-amber-500 flex-shrink-0 mt-0.5"
                />
                <div>
                  <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
                    Chronic Conditions
                  </p>
                  <p className="text-sm text-amber-700 dark:text-amber-400">
                    {profile.chronic_conditions}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {!profile?.allergies && !profile?.chronic_conditions && (
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 mb-6 text-slate-400 text-sm">
            <ShieldAlert size={16} />
            No allergies or chronic conditions on record.
          </div>
        )}

        {/* Key Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <MetricChip
            icon={<Droplets size={14} />}
            label="Blood Type"
            value={profile?.blood_type || "—"}
            color="text-red-500"
          />
          <MetricChip
            icon={<User size={14} />}
            label="Gender"
            value={profile?.gender || "—"}
            color="text-blue-500"
          />
          <MetricChip
            icon={<Calendar size={14} />}
            label="Age"
            value={
              profile?.date_of_birth
                ? `${calcAge(profile.date_of_birth)} yrs`
                : "—"
            }
            color="text-purple-500"
          />
          <MetricChip
            icon={<Activity size={14} />}
            label="Height"
            value={profile?.height_cm ? `${profile.height_cm} cm` : "—"}
            color="text-teal-500"
          />
          <MetricChip
            icon={<Activity size={14} />}
            label="Weight"
            value={profile?.weight_kg ? `${profile.weight_kg} kg` : "—"}
            color="text-teal-500"
          />
        </div>
      </div>

      {/* ── TABS ── */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700 pb-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-bold rounded-t-xl transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-white dark:bg-slate-800 text-teal-600 border border-b-white dark:border-slate-700 dark:border-b-slate-800 -mb-px"
                : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            {tab.icon}
            {tab.label}
            {tab.count !== undefined && (
              <span className="bg-teal-100 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── TAB CONTENT ── */}
      {activeTab === "overview" && <VisitTimeline records={records} />}
      {activeTab === "prescriptions" && (
        <PrescriptionsList prescriptions={prescriptions} />
      )}
    </div>
  );
}

// ─── VISIT TIMELINE (read-only) ───────────────────────────────────────────────
function VisitTimeline({ records }) {
  if (records.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
          <FileText size={28} className="text-slate-300 dark:text-slate-600" />
        </div>
        <p className="text-slate-500 font-medium">No visit records yet</p>
      </div>
    );
  }

  return (
    <div className="relative space-y-0">
      <div className="absolute left-6 top-6 bottom-6 w-px bg-slate-200 dark:bg-slate-700" />

      {records.map((record) => (
        <div key={record.id} className="relative flex gap-6 pb-6">
          <div className="relative z-10 flex-shrink-0">
            <div className="w-12 h-12 bg-white dark:bg-slate-800 border-2 border-teal-500 rounded-2xl flex items-center justify-center shadow-sm">
              <Stethoscope size={18} className="text-teal-500" />
            </div>
          </div>

          <div className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-slate-400" />
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  {new Date(record.visit_date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                Dr. {record.doctor?.name}
              </span>
            </div>

            <div className="bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 rounded-2xl px-4 py-3 mb-4">
              <p className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-1">
                Chief Complaint
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                {record.chief_complaint}
              </p>
            </div>

            {(record.blood_pressure ||
              record.temperature_c ||
              record.heart_rate ||
              record.oxygen_saturation) && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                {record.blood_pressure && (
                  <VitalChip
                    icon={<Activity size={12} />}
                    label="BP"
                    value={record.blood_pressure}
                    color="text-red-500"
                  />
                )}
                {record.temperature_c && (
                  <VitalChip
                    icon={<Thermometer size={12} />}
                    label="Temp"
                    value={`${record.temperature_c}°C`}
                    color="text-orange-500"
                  />
                )}
                {record.heart_rate && (
                  <VitalChip
                    icon={<Heart size={12} />}
                    label="Heart Rate"
                    value={`${record.heart_rate} bpm`}
                    color="text-pink-500"
                  />
                )}
                {record.oxygen_saturation && (
                  <VitalChip
                    icon={<Wind size={12} />}
                    label="SpO2"
                    value={`${record.oxygen_saturation}%`}
                    color="text-blue-500"
                  />
                )}
              </div>
            )}

            <div className="space-y-3">
              {record.diagnosis && (
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Diagnosis
                  </p>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    {record.diagnosis}
                  </p>
                </div>
              )}
              {record.notes && (
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Notes
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                    {record.notes}
                  </p>
                </div>
              )}
              {record.action_taken && (
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900/40 rounded-xl px-3 py-2">
                  <ClipboardList size={13} className="text-teal-500" />
                  <span className="text-xs text-slate-600 dark:text-slate-300">
                    <span className="font-bold">Action:</span>{" "}
                    {record.action_taken}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── PRESCRIPTIONS TAB (read-only) ────────────────────────────────────────────
function PrescriptionsList({ prescriptions }) {
  if (prescriptions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
          <Pill size={28} className="text-slate-300 dark:text-slate-600" />
        </div>
        <p className="text-slate-500 font-medium">
          No prescriptions issued yet
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {prescriptions.map((p) => (
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
          <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-3">
            {p.medication}
          </h3>
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-4 space-y-2">
            {[
              { label: "Dosage", value: p.dosage },
              { label: "Frequency", value: p.frequency },
              { label: "Duration", value: p.duration },
            ].map((row) => (
              <div key={row.label} className="flex justify-between text-xs">
                <span className="text-slate-400 font-bold uppercase">
                  {row.label}
                </span>
                <span className="text-slate-700 dark:text-slate-300 font-medium">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
          {p.instructions && (
            <p className="text-xs text-slate-400 italic mt-3">
              {p.instructions}
            </p>
          )}
          <p className="text-xs text-slate-400 mt-3">
            Prescribed by Dr. {p.doctor?.name}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─── SMALL HELPERS ────────────────────────────────────────────────────────────
const MetricChip = ({ icon, label, value, color }) => (
  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-3 flex flex-col gap-1 border border-slate-100 dark:border-slate-700">
    <div
      className={`flex items-center gap-1 ${color} text-[10px] font-bold uppercase tracking-wider`}
    >
      {icon} {label}
    </div>
    <p className="text-sm font-bold text-slate-800 dark:text-white">{value}</p>
  </div>
);

const VitalChip = ({ icon, label, value, color }) => (
  <div className="bg-slate-50 dark:bg-slate-900/40 rounded-xl p-3 border border-slate-100 dark:border-slate-700">
    <div
      className={`flex items-center gap-1 ${color} text-[10px] font-bold uppercase tracking-wider mb-1`}
    >
      {icon} {label}
    </div>
    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
      {value}
    </p>
  </div>
);

const calcAge = (dob) => {
  const diff = Date.now() - new Date(dob).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
};
