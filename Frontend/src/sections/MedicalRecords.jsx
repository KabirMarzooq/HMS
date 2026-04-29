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
  Plus,
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

export default function MedicalRecords() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    api
      .get("/doctor/patients")
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

  // If a patient is selected, show their full record
  if (selectedPatient) {
    return (
      <PatientRecord
        patient={selectedPatient}
        onBack={() => setSelectedPatient(null)}
      />
    );
  }

  // Otherwise show the patient selection list
  const filtered = patients.filter((p) =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Medical Records
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

function PatientRecord({ patient, onBack }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isProfileFormOpen, setIsProfileFormOpen] = useState(false);

  const fetchRecord = () => {
    api
      .get(`/doctor/patients/${patient.id}/medical-record`)
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

      {/* FOLDER COVER (Patient Header) */}
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
          <div className="flex gap-3">
            <button
              onClick={() => setIsProfileFormOpen(true)}
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 px-5 py-3 rounded-2xl font-bold text-sm transition-all active:scale-95 cursor-pointer"
            >
              <User size={16} /> Edit Profile
            </button>
            <button
              onClick={() => setIsFormOpen(true)}
              className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-5 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-teal-500/20 transition-all active:scale-95 cursor-pointer"
            >
              <Plus size={16} /> Add Visit Record
            </button>
          </div>
        </div>

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

      {activeTab === "overview" && (
        <VisitTimeline records={records} patientName={data?.patient?.name} />
      )}
      {activeTab === "prescriptions" && (
        <PrescriptionsList prescriptions={prescriptions} />
      )}

      <AddVisitForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        patientId={patient.id}
        onSaved={() => {
          fetchRecord();
          setIsFormOpen(false);
        }}
      />

      <EditProfileForm
        isOpen={isProfileFormOpen}
        onClose={() => setIsProfileFormOpen(false)}
        patientId={patient.id}
        existingProfile={profile}
        onSaved={() => {
          fetchRecord();
          setIsProfileFormOpen(false);
        }}
      />
    </div>
  );
}

function VisitTimeline({ records, patientName }) {
  if (records.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
          <FileText size={28} className="text-slate-300 dark:text-slate-600" />
        </div>
        <p className="text-slate-500 font-medium">No visit records yet</p>
        <p className="text-slate-400 text-sm mt-1">
          Click "Add Visit Record" to log the first entry for {patientName}.
        </p>
      </div>
    );
  }

  return (
    <div className="relative space-y-0">
      <div className="absolute left-6 top-6 bottom-6 w-px bg-slate-200 dark:bg-slate-700" />

      {records.map((record, index) => (
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
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 font-bold uppercase">Dosage</span>
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
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 font-bold uppercase">
                Duration
              </span>
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                {p.duration}
              </span>
            </div>
          </div>
          {p.instructions && (
            <p className="text-xs text-slate-400 italic mt-3">
              {p.instructions}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function AddVisitForm({ isOpen, onClose, patientId, onSaved }) {
  const [form, setForm] = useState({
    visit_date: new Date().toISOString().split("T")[0],
    chief_complaint: "",
    blood_pressure: "",
    temperature_c: "",
    heart_rate: "",
    oxygen_saturation: "",
    diagnosis: "",
    notes: "",
    action_taken: "",
  });
  const [saving, setSaving] = useState(false);

  const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.chief_complaint)
      return toast.error("Chief complaint is required.");
    setSaving(true);
    try {
      await api.post("/doctor/medical-records", {
        ...form,
        patient_id: patientId,
      });
      toast.success("Visit record saved!");
      setForm({
        visit_date: new Date().toISOString().split("T")[0],
        chief_complaint: "",
        blood_pressure: "",
        temperature_c: "",
        heart_rate: "",
        oxygen_saturation: "",
        diagnosis: "",
        notes: "",
        action_taken: "",
      });
      onSaved();
    } catch {
      toast.error("Failed to save record.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-lg bg-white dark:bg-slate-800 p-8 transform transition-transform duration-300 border-l border-slate-200 dark:border-slate-700 overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              New Visit Record
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Log today's encounter details
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <FormField label="Visit Date">
            <input
              type="date"
              className={inputClass}
              value={form.visit_date}
              onChange={(e) => set("visit_date", e.target.value)}
            />
          </FormField>

          <FormField label="Chief Complaint *">
            <input
              type="text"
              placeholder="e.g. Severe headache for 3 days"
              className={inputClass}
              value={form.chief_complaint}
              onChange={(e) => set("chief_complaint", e.target.value)}
            />
          </FormField>

          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Vitals
            </p>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Blood Pressure">
                <input
                  type="text"
                  placeholder="120/80"
                  className={inputClass}
                  value={form.blood_pressure}
                  onChange={(e) => set("blood_pressure", e.target.value)}
                />
              </FormField>
              <FormField label="Temperature (°C)">
                <input
                  type="number"
                  step="0.1"
                  placeholder="37.0"
                  className={inputClass}
                  value={form.temperature_c}
                  onChange={(e) => set("temperature_c", e.target.value)}
                />
              </FormField>
              <FormField label="Heart Rate (bpm)">
                <input
                  type="number"
                  placeholder="72"
                  className={inputClass}
                  value={form.heart_rate}
                  onChange={(e) => set("heart_rate", e.target.value)}
                />
              </FormField>
              <FormField label="SpO2 (%)">
                <input
                  type="number"
                  placeholder="98"
                  className={inputClass}
                  value={form.oxygen_saturation}
                  onChange={(e) => set("oxygen_saturation", e.target.value)}
                />
              </FormField>
            </div>
          </div>

          <FormField label="Diagnosis">
            <textarea
              rows={3}
              placeholder="Doctor's clinical conclusion..."
              className={`${inputClass} resize-none`}
              value={form.diagnosis}
              onChange={(e) => set("diagnosis", e.target.value)}
            />
          </FormField>

          <FormField label="Notes">
            <textarea
              rows={2}
              placeholder="Additional observations..."
              className={`${inputClass} resize-none`}
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
            />
          </FormField>

          <FormField label="Action Taken">
            <input
              type="text"
              placeholder="e.g. Prescribed Paracetamol 500mg"
              className={inputClass}
              value={form.action_taken}
              onChange={(e) => set("action_taken", e.target.value)}
            />
          </FormField>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-4 bg-teal-500 hover:bg-teal-600 disabled:opacity-60 text-white font-bold rounded-2xl transition-all shadow-lg shadow-teal-500/25 mt-2 cursor-pointer"
          >
            {saving ? "Saving..." : "Save Visit Record"}
          </button>
        </form>
      </div>
    </div>
  );
}

function EditProfileForm({
  isOpen,
  onClose,
  patientId,
  existingProfile,
  onSaved,
}) {
  const [form, setForm] = useState({
    blood_type: existingProfile?.blood_type || "",
    gender: existingProfile?.gender || "",
    date_of_birth: existingProfile?.date_of_birth?.split("T")[0] || "",
    height_cm: existingProfile?.height_cm || "",
    weight_kg: existingProfile?.weight_kg || "",
    allergies: existingProfile?.allergies || "",
    chronic_conditions: existingProfile?.chronic_conditions || "",
    phone: existingProfile?.phone || "",
    emergency_contact: existingProfile?.emergency_contact || "",
  });
  const [saving, setSaving] = useState(false);

  // Sync form when existingProfile loads
  useEffect(() => {
    if (existingProfile) {
      setForm({
        blood_type: existingProfile.blood_type || "",
        gender: existingProfile.gender || "",
        date_of_birth: existingProfile.date_of_birth?.split("T")[0] || "",
        height_cm: existingProfile.height_cm || "",
        weight_kg: existingProfile.weight_kg || "",
        allergies: existingProfile.allergies || "",
        chronic_conditions: existingProfile.chronic_conditions || "",
        phone: existingProfile.phone || "",
        emergency_contact: existingProfile.emergency_contact || "",
      });
    }
  }, [existingProfile]);

  const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.patch(`/doctor/patients/${patientId}/profile`, form);
      toast.success("Patient profile updated!");
      onSaved();
    } catch {
      toast.error("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-lg bg-white dark:bg-slate-800 p-8 transform transition-transform duration-300 border-l border-slate-200 dark:border-slate-700 overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Edit Patient Profile
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Update the folder cover information
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <p className="text-xs font-bold text-red-500 uppercase tracking-wider mb-3 flex items-center gap-1">
              <ShieldAlert size={13} /> Critical Alerts
            </p>
            <div className="space-y-3">
              <FormField label="Allergies">
                <input
                  type="text"
                  placeholder="e.g. Penicillin, Peanuts"
                  className={inputClass}
                  value={form.allergies}
                  onChange={(e) => set("allergies", e.target.value)}
                />
              </FormField>
              <FormField label="Chronic Conditions">
                <input
                  type="text"
                  placeholder="e.g. Diabetes Type 2, Hypertension"
                  className={inputClass}
                  value={form.chronic_conditions}
                  onChange={(e) => set("chronic_conditions", e.target.value)}
                />
              </FormField>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Key Metrics
            </p>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Blood Type">
                <select
                  className={inputClass}
                  value={form.blood_type}
                  onChange={(e) => set("blood_type", e.target.value)}
                >
                  <option value="">Select</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                    (t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    )
                  )}
                </select>
              </FormField>
              <FormField label="Gender">
                <select
                  className={inputClass}
                  value={form.gender}
                  onChange={(e) => set("gender", e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </FormField>
              <FormField label="Date of Birth">
                <input
                  type="date"
                  className={inputClass}
                  value={form.date_of_birth}
                  onChange={(e) => set("date_of_birth", e.target.value)}
                />
              </FormField>
              <FormField label="Height (cm)">
                <input
                  type="number"
                  placeholder="175"
                  className={inputClass}
                  value={form.height_cm}
                  onChange={(e) => set("height_cm", e.target.value)}
                />
              </FormField>
              <FormField label="Weight (kg)">
                <input
                  type="number"
                  placeholder="70"
                  className={inputClass}
                  value={form.weight_kg}
                  onChange={(e) => set("weight_kg", e.target.value)}
                />
              </FormField>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Contact Info
            </p>
            <div className="space-y-3">
              <FormField label="Phone">
                <input
                  type="text"
                  placeholder="+234 800 000 0000"
                  className={inputClass}
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                />
              </FormField>
              <FormField label="Emergency Contact">
                <input
                  type="text"
                  placeholder="Name — +234 800 000 0000"
                  className={inputClass}
                  value={form.emergency_contact}
                  onChange={(e) => set("emergency_contact", e.target.value)}
                />
              </FormField>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-4 bg-teal-500 hover:bg-teal-600 disabled:opacity-60 text-white font-bold rounded-2xl transition-all shadow-lg shadow-teal-500/25 mt-2 cursor-pointer"
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}

const inputClass =
  "w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500 text-sm";

const FormField = ({ label, children }) => (
  <div>
    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
      {label}
    </label>
    {children}
  </div>
);

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

// calculating age from date string
const calcAge = (dob) => {
  const diff = Date.now() - new Date(dob).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
};
