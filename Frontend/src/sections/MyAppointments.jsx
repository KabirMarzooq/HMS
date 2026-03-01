import React, { useEffect, useState } from "react";
// import axios from "axios";
import api from "../services/api";
import { Calendar, Clock, User, ChevronRight, X, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppt, setSelectedAppt] = useState(null); // For the Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRescheduleMode, setIsRescheduleMode] = useState(false);
  //   const [newSchedule, setNewSchedule] = useState({ date: "", time: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await api.get("/my-appointments");
      const sorted = res.data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      );
      setAppointments(sorted);
    } catch (err) {
      console.error("Error fetching appointments", err);
      toast.error("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?"))
      return;

    try {
      setLoading(true);
      const res = await api.patch(`/appointments/${id}/cancel`);
      toast.success("Appointment cancelled");
      fetchAppointments(); // Refresh the list
    } catch (err) {
      toast.error("Could not cancel appointment");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSchedule = async (id, newValues) => {
    try {
      await api.patch(`/appointments/${id}/reschedule`, {
        appointment_date: newValues.date,
        appointment_time: newValues.time,
      });
      toast.success("Appointment rescheduled!");
      setIsRescheduleMode(false);
      fetchAppointments(); // Refresh the list
    } catch (err) {
      toast.error("Failed to reschedule. Please try again.");
    }
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-teal-500/20 text-teal-500";
      case "pending":
        return "bg-amber-500/20 text-amber-500";
      case "cancelled":
        return "bg-red-500/20 text-red-500";
      default:
        return "bg-slate-500/20 text-slate-400";
    }
  };

  if (loading) {
    return (
      <div className="p-6 min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-slate-900 text-white rounded-2xl">
      <h2 className="text-2xl font-bold mb-6">My Appointments</h2>

      {appointments.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg">No appointments found</p>
          <p className="text-slate-500 text-sm mt-2">
            Book your first appointment to get started
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appt) => (
            <div
              key={appt.id}
              className="bg-slate-800 rounded-3xl p-5 border border-slate-700 relative overflow-hidden flex flex-col"
            >
              <div className="flex justify-between items-start mb-4 gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-teal-500/10 rounded-2xl flex-shrink-0 flex items-center justify-center text-teal-500">
                    <User size={24} />
                  </div>

                  {/* Name and Specialization */}
                  <div className="min-w-0">
                    <h3 className="font-semibold text-lg leading-tight break-words">
                      Dr. {appt.doctor?.name.replace("Dr. ", "")}
                    </h3>
                    <p className="text-slate-400 text-sm truncate">
                      {appt.doctor?.specialization}
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <span
                  className={`flex-shrink-0 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold ${getStatusStyle(appt.status)}`}
                >
                  ● {appt.status || "Pending"}
                </span>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <Calendar size={16} className="text-teal-500" />
                  {appt.appointment_date}
                </div>
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <Clock size={16} className="text-teal-500" />
                  {appt.appointment_time}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedAppt(appt);
                    setIsModalOpen(true);
                  }}
                  className="w-full py-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer mt-auto"
                >
                  View Details <ChevronRight size={16} />
                </button>

                {appt.status?.toLowerCase() !== "cancelled" && (
                  <button
                    onClick={() => handleCancel(appt.id)}
                    className="px-3 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-colors cursor-pointer"
                    title="Cancel Appointment"
                  >
                    <Trash2 size={16} />
                  </button>
                )}

                {/* Add this inside your card's action <div> */}
                {appt.status?.toLowerCase() === "pending" && (
                  <button
                    onClick={() => {
                      setSelectedAppt(appt);
                      setIsRescheduleMode(true);
                    }}
                    className="px-3 py-2.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 rounded-xl transition-colors cursor-pointer"
                    title="Reschedule"
                  >
                    <Calendar size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Slide-over Modal Component */}
      <AppointmentDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        appointment={selectedAppt}
      />

      <RescheduleModal
        isOpen={isRescheduleMode}
        onClose={() => setIsRescheduleMode(false)}
        appointment={selectedAppt}
        onConfirm={handleUpdateSchedule}
      />
    </div>
  );
};

const AppointmentDetailModal = ({ isOpen, onClose, appointment }) => {
  if (!appointment) return null;

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
    >
      {/* Dark Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Slide Panel */}
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-slate-800 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"} p-8`}
      >
        <button
          onClick={onClose}
          className="absolute top-6 left-6 text-slate-400 hover:text-white cursor-pointer"
        >
          <X size={24} />
        </button>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-2 text-teal-500">
            Appointment Details
          </h2>
          <p className="text-slate-400 text-sm mb-8 border-b border-slate-700 pb-4">
            Reference ID: #ONC-{appointment.id}
          </p>

          <section className="mb-8">
            <h4 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-4">
              Reason for Visit
            </h4>
            <div className="bg-slate-900/50 p-4 rounded-2xl text-slate-300 text-sm leading-relaxed italic">
              "{appointment.additional_notes || "No additional notes provided."}
              "
            </div>
          </section>

          <section>
            <h4 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-4">
              Doctor Information
            </h4>
            <div className="flex items-center gap-4 bg-slate-700/30 p-4 rounded-2xl">
              <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center font-bold text-white">
                {appointment.doctor?.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold">
                  Dr. {appointment.doctor?.name.replace("Dr. ", "")}
                </p>
                <p className="text-xs text-teal-500 uppercase">
                  {appointment.doctor?.specialization}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const RescheduleModal = ({ isOpen, onClose, appointment, onConfirm }) => {
  const [tempSchedule, setTempSchedule] = useState({ date: "", time: "" });

  if (!appointment || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-slate-800 border border-slate-700 w-full max-w-md rounded-3xl p-8 shadow-2xl">
        <h3 className="text-xl font-bold mb-2">Reschedule Appointment</h3>
        <p className="text-slate-400 text-sm mb-6">
          Pick a new date and time for your visit with Dr.{" "}
          {appointment.doctor?.name.replace("Dr. ", "")}
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase text-slate-500 mb-2 block">
              New Date
            </label>
            <input
              type="date"
              className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white focus:ring-2 focus:ring-teal-500 outline-none transition-all"
              onChange={(e) =>
                setTempSchedule({ ...tempSchedule, date: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-slate-500 mb-2 block">
              New Time
            </label>
            <input
              type="time"
              className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white focus:ring-2 focus:ring-teal-500 outline-none transition-all"
              onChange={(e) =>
                setTempSchedule({ ...tempSchedule, time: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-2xl bg-slate-700 hover:bg-slate-600 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(appointment.id, tempSchedule)}
            disabled={!tempSchedule.date || !tempSchedule.time}
            className="flex-1 py-3 rounded-2xl bg-teal-500 hover:bg-teal-600 text-slate-900 font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
