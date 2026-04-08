import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  User,
  Lock,
  Clock,
  Bell,
  Palette,
  Smartphone,
  Monitor,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import { useTheme } from "../layouts/ThemeContext";
// import { useAuth } from "../context/AuthContext"; // Assuming you have an AuthContext

export default function Settings() {
  const [activeTab, setActiveTab] = useState("overview");
  const { theme, setTheme } = useTheme();

  // Mock Data (This would come from your global state/context)
  const [doctor, setDoctor] = useState({
    firstName: "John",
    lastName: "Smith",
    email: "dr.smith@oncura.com",
    specialty: "Cardiology",
    license: "MED-849201",
    profileImage: null, // Set to null to test the initials fallback
  });

  // Inside your Settings Component...
//   const { logout } = useAuth(); // To log user out after deletion

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    const newEmail = e.target.newEmail.value;
    try {
      await api.patch("/user/update-email", { email: newEmail });
      toast.success("Email updated successfully!");
      // Update local state if necessary
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update email");
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    const currentPassword = e.target.currentPassword.value;
    const newPassword = e.target.newPassword.value;
    try {
      await api.patch("/user/update-password", {
        currentPassword,
        newPassword,
      });
      toast.success("Password updated successfully!");
      e.target.reset();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update password");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you absolutely sure? This action is permanent and will delete all your clinical data.",
    );
    if (!confirmed) return;

    try {
      await api.delete("/user/delete-account");
      toast.success("Account deleted. We're sorry to see you go.");
      logout(); // Redirects to login and clears tokens
    } catch (err) {
      toast.error("Failed to delete account. Please contact support.");
    }
  };

  // Helper to get initials
  const getInitials = () => {
    const f = doctor.firstName ? doctor.firstName.charAt(0) : "";
    const l = doctor.lastName ? doctor.lastName.charAt(0) : "";
    return (f + l).toUpperCase() || "DR";
  };

  // Toggles State
  const [toggles, setToggles] = useState({
    twoFactor: false,
    notifAppt: true,
    notifCancel: true,
    notifMessage: false,
    dailyDigest: true,
  });

  const handleToggle = (key) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const tabs = [
    { id: "overview", label: "Profile Overview", icon: <User size={18} /> },
    { id: "security", label: "Account & Security", icon: <Lock size={18} /> },
    { id: "availability", label: "Availability", icon: <Clock size={18} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
    {
      id: "appearance",
      label: "Appearance & Preferences",
      icon: <Palette size={18} />,
    },
  ];

  return (
    <div className="p-6 transition-colors duration-300 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Settings
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Manage your account preferences and practice details.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column: Navigation Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <nav className="flex flex-col gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm font-medium transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 shadow-sm dark:shadow-none"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Column: Content Area */}
        <div className="flex-1 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden min-h-[500px]">
          {/* TAB 1: PROFILE OVERVIEW */}
          {activeTab === "overview" && (
            <div className="p-8 animate-in fade-in duration-300">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
                Profile Overview
              </h3>

              <div className="flex flex-col md:flex-row items-start gap-8 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-transparent">
                {/* Dynamic Avatar */}
                <div className="w-24 h-24 rounded-full flex-shrink-0 bg-teal-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-teal-500/20">
                  {doctor.profileImage ? (
                    <img
                      src={doctor.profileImage}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    getInitials()
                  )}
                </div>

                <div className="flex-1 space-y-4 w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">
                        Full Name
                      </p>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        Dr. {doctor.firstName || "-"} {doctor.lastName || "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">
                        Email Address
                      </p>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {doctor.email || "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">
                        Specialty
                      </p>
                      <span className="px-3 py-1 bg-teal-50 dark:bg-slate-800 border border-teal-100 dark:border-slate-700 text-teal-600 dark:text-teal-400 rounded-lg text-xs font-bold inline-block">
                        {doctor.specialty || "Unspecified"}
                      </span>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">
                        Medical License #
                      </p>
                      <p className="font-semibold text-slate-900 dark:text-slate-300 font-mono text-sm">
                        {doctor.license || "-"}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-2 border-t border-slate-200 dark:border-slate-700">
                    <NavLink
                      to="/dashboard/profile"
                      className="flex items-center gap-2 text-sm font-bold text-teal-600 dark:text-teal-500 hover:text-teal-700 dark:hover:text-teal-400 transition-colors cursor-pointer"
                    >
                      Edit details in Profile Tab <ExternalLink size={16} />
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SECURITY */}
          {activeTab === "security" && (
            <div className="p-8 animate-in fade-in duration-300 space-y-10">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
                Account & Security
              </h3>

              <div className="space-y-8">
                {/* CHANGE PASSWORD SECTION */}
                <form onSubmit={handleUpdatePassword} className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Change Password
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      name="currentPassword"
                      type="password"
                      placeholder="Current Password"
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                    <input
                      name="newPassword"
                      type="password"
                      placeholder="New Password"
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-slate-900 dark:bg-slate-700 text-white font-bold text-sm rounded-xl hover:opacity-90 transition-colors duration-300 ease-in-out cursor-pointer"
                  >
                    Update Password
                  </button>
                </form>

                <hr className="border-slate-100 dark:border-slate-700" />

                {/* CHANGE EMAIL SECTION */}
                <form onSubmit={handleUpdateEmail} className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Change Email Address
                  </h4>
                  <div className="flex flex-col md:flex-row gap-4">
                    <input
                      name="newEmail"
                      type="email"
                      placeholder="New Email Address"
                      className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-slate-900 dark:bg-slate-700 text-white font-bold text-sm rounded-xl hover:opacity-90 transition-colors duration-300 ease-in-out cursor-pointer"
                    >
                      Update Email
                    </button>
                  </div>
                </form>

                <hr className="border-slate-100 dark:border-slate-700" />

                {/* 2FA */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Two-Factor Authentication
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Add an extra layer of security to your account.
                    </p>
                  </div>
                  <Toggle
                    enabled={toggles.twoFactor}
                    onChange={() => handleToggle("twoFactor")}
                  />
                </div>

                <hr className="border-slate-100 dark:border-slate-700" />

                {/* Active Sessions */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
                    Active Sessions
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-transparent">
                      <div className="flex items-center gap-3">
                        <Monitor size={20} className="text-teal-500" />
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">
                            Windows PC - Chrome
                          </p>
                          <p className="text-xs text-teal-600 dark:text-teal-400 font-medium">
                            Current Session
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-3">
                        <Smartphone size={20} className="text-slate-400" />
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">
                            iPhone 14 - Safari
                          </p>
                          <p className="text-xs text-slate-500">
                            Last active: 2 hours ago
                          </p>
                        </div>
                      </div>
                      <button className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors cursor-pointer">
                        Revoke
                      </button>
                    </div>
                  </div>
                </div>

                {/* DANGER ZONE (ACCOUNT DELETION) */}
                <div className="bg-red-50 dark:bg-red-500/5 border border-red-100 dark:border-red-500/20 p-6 rounded-3xl">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-500 rounded-2xl">
                      <AlertTriangle size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-red-600 dark:text-red-500">
                        Danger Zone
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">
                        Deleting your account is permanent. All patient history,
                        schedules, and profile data will be removed from our
                        servers immediately.
                      </p>
                      <button
                        onClick={handleDeleteAccount}
                        className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-red-500/20 cursor-pointer"
                      >
                        Delete Oncura+ Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: AVAILABILITY */}
          {activeTab === "availability" && (
            <div className="p-8 animate-in fade-in duration-300">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
                Practice Availability
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                    Default Appointment Duration
                  </label>
                  <select className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer w-48">
                    <option value="15">15 Minutes</option>
                    <option value="30">30 Minutes</option>
                    <option value="45">45 Minutes</option>
                    <option value="60">60 Minutes</option>
                  </select>
                </div>

                <hr className="border-slate-100 dark:border-slate-700" />

                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
                    Weekly Working Hours
                  </h4>
                  <div className="space-y-3">
                    {[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                    ].map((day) => (
                      <div
                        key={day}
                        className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-transparent"
                      >
                        <span className="w-24 text-sm font-bold text-slate-700 dark:text-slate-300">
                          {day}
                        </span>
                        <div className="flex items-center gap-2">
                          <input
                            type="time"
                            defaultValue="09:00"
                            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-900 dark:text-white outline-none"
                          />
                          <span className="text-slate-400">-</span>
                          <input
                            type="time"
                            defaultValue="17:00"
                            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-900 dark:text-white outline-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: NOTIFICATIONS */}
          {activeTab === "notifications" && (
            <div className="p-8 animate-in fade-in duration-300">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
                Notification Preferences
              </h3>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-900/30 rounded-2xl transition-colors">
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      New Appointments
                    </p>
                    <p className="text-xs text-slate-500">
                      Get notified when a patient books a slot.
                    </p>
                  </div>
                  <Toggle
                    enabled={toggles.notifAppt}
                    onChange={() => handleToggle("notifAppt")}
                  />
                </div>
                <div className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-900/30 rounded-2xl transition-colors">
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      Cancellations
                    </p>
                    <p className="text-xs text-slate-500">
                      Alerts for dropped or rescheduled appointments.
                    </p>
                  </div>
                  <Toggle
                    enabled={toggles.notifCancel}
                    onChange={() => handleToggle("notifCancel")}
                  />
                </div>
                <div className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-900/30 rounded-2xl transition-colors">
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      Direct Messages
                    </p>
                    <p className="text-xs text-slate-500">
                      When a patient sends a chat message.
                    </p>
                  </div>
                  <Toggle
                    enabled={toggles.notifMessage}
                    onChange={() => handleToggle("notifMessage")}
                  />
                </div>
                <hr className="border-slate-100 dark:border-slate-700" />
                <div className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-900/30 rounded-2xl transition-colors">
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      Daily Digest
                    </p>
                    <p className="text-xs text-slate-500">
                      A morning email summarizing your day.
                    </p>
                  </div>
                  <Toggle
                    enabled={toggles.dailyDigest}
                    onChange={() => handleToggle("dailyDigest")}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: APPEARANCE */}
          {activeTab === "appearance" && (
            <div className="p-8 animate-in fade-in duration-300 space-y-10">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
                Appearance & Preferences
              </h3>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4">
                  Theme Interface
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* LIGHT MODE CARD */}
                  <button
                    onClick={() => setTheme("light")}
                    className={`relative flex flex-col items-center p-4 border-2 rounded-2xl transition-all cursor-pointer group ${
                      theme === "light"
                        ? "border-teal-500 bg-teal-50/30 dark:bg-teal-500/5"
                        : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                    }`}
                  >
                    <div className="w-16 h-12 bg-slate-100 rounded-lg mb-3 border border-slate-200" />
                    <span
                      className={`text-sm font-bold ${theme === "light" ? "text-teal-600" : "text-slate-700 dark:text-slate-300"}`}
                    >
                      Light Mode
                    </span>
                    {theme === "light" && (
                      <div className="absolute top-2 right-2 w-2 h-2 bg-teal-500 rounded-full" />
                    )}
                  </button>

                  {/* DARK MODE CARD */}
                  <button
                    onClick={() => setTheme("dark")}
                    className={`relative flex flex-col items-center p-4 border-2 rounded-2xl transition-all cursor-pointer group ${
                      theme === "dark"
                        ? "border-teal-500 bg-teal-500/5"
                        : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                    }`}
                  >
                    <div className="w-16 h-12 bg-slate-900 rounded-lg mb-3 border border-slate-700" />
                    <span
                      className={`text-sm font-bold ${theme === "dark" ? "text-teal-500" : "text-slate-700 dark:text-slate-300"}`}
                    >
                      Dark Mode
                    </span>
                    {theme === "dark" && (
                      <div className="absolute top-2 right-2 w-2 h-2 bg-teal-500 rounded-full" />
                    )}
                  </button>

                  {/* SYSTEM MODE CARD */}
                  <button
                    onClick={() => setTheme("system")}
                    className={`relative flex flex-col items-center p-4 border-2 rounded-2xl transition-all cursor-pointer group ${
                      theme === "system"
                        ? "border-teal-500 bg-teal-500/5"
                        : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                    }`}
                  >
                    <div className="w-16 h-12 bg-gradient-to-br from-slate-100 to-slate-900 rounded-lg mb-3 border border-slate-400/30" />
                    <span
                      className={`text-sm font-bold ${theme === "system" ? "text-teal-500" : "text-slate-700 dark:text-slate-300"}`}
                    >
                      System
                    </span>
                    {theme === "system" && (
                      <div className="absolute top-2 right-2 w-2 h-2 bg-teal-500 rounded-full" />
                    )}
                  </button>
                </div>

                <p className="mt-6 text-xs text-slate-500 dark:text-slate-400 italic">
                  * System mode will automatically switch themes based on your
                  device settings.
                </p>
              </div>

              <hr className="border-slate-100 dark:border-slate-700" />

              {/* 2. Language & Regional Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Language Dropdown */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                    Display Language
                  </label>
                  <div className="relative">
                    <select className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500 appearance-none cursor-pointer">
                      <option value="en">English (US)</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                      <option value="ar">العربية</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <svg
                        size={16}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <p className="mt-2 text-[11px] text-slate-500 italic">
                    Sets the language for your dashboard and patient
                    communications.
                  </p>
                </div>

                {/* Timezone Dropdown */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                    Local Timezone
                  </label>
                  <div className="relative">
                    <select className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500 appearance-none cursor-pointer">
                      <option value="UTC-5">(GMT-05:00) Eastern Time</option>
                      <option value="UTC-6">(GMT-06:00) Central Time</option>
                      <option value="UTC-7">(GMT-07:00) Mountain Time</option>
                      <option value="UTC-8">(GMT-08:00) Pacific Time</option>
                      <option value="UTC+0">(GMT+00:00) London / UTC</option>
                      <option value="UTC+1">
                        (GMT+01:00) West Central Africa
                      </option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <svg
                        size={16}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <p className="mt-2 text-[11px] text-slate-500 italic">
                    Ensures your schedule aligns with patient booking times.
                  </p>
                </div>
              </div>

              {/* Save Preference Button */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-700 flex justify-end">
                <button className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-teal-500/20 cursor-pointer">
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Reusable custom Toggle component to match the UI
const Toggle = ({ enabled, onChange }) => {
  return (
    <button
      onClick={onChange}
      type="button"
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${
        enabled ? "bg-teal-500" : "bg-slate-200 dark:bg-slate-600"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
};
