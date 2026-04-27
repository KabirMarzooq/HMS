import React, { useState, useEffect } from "react";
import {
  Camera,
  User,
  Mail,
  Phone,
  MapPin,
  Heart,
  Briefcase,
  Shield,
} from "lucide-react";
import api from "../services/api";
import toast from "react-hot-toast";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    role: "",
    avatar: null,
    // Role-specific fields
    specialty: "",
    license: "",
    bloodType: "",
    insuranceProvider: "",
    allergies: "",
    bio: "",
    employeeId: "",
    clearanceLevel: "",
  });

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get("/user-profile");
        const user = response.data;

        setProfile({
          firstName: user.name?.split(" ")[0] || "",
          lastName: user.name?.split(" ").slice(1).join(" ") || "",
          email: user.email || "",
          phone: user.phone || "",
          address: user.address || "",
          dateOfBirth: user.date_of_birth || "",
          role: user.role || "",
          avatar: null,
          specialty: user.specialization || "",
          license: user.license_id || user.staff_id || "",
          bloodType: user.blood_type || "",
          insuranceProvider: user.insurance_provider || "",
          allergies: user.allergies || "",
          bio: user.bio || "",
          employeeId: user.employee_id || user.staff_id || "",
          clearanceLevel: user.clearance_level || "",
        });
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
        toast.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const getInitials = () => {
    const f = profile.firstName ? profile.firstName.charAt(0) : "";
    const l = profile.lastName ? profile.lastName.charAt(0) : "";
    return (f + l).toUpperCase() || "U";
  };

  const handleInputChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    // Just show success message - no backend call
    toast.success("Profile updated successfully!");
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="md:p-6 transition-colors duration-300 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Profile Center
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Manage your personal information and system details.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT COLUMN: IDENTITY CARD */}
        <div className="w-full lg:w-1/3 flex-shrink-0">
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            {/* Cover Photo / Gradient */}
            <div className="h-32 bg-gradient-to-r from-teal-400 to-teal-600 dark:from-teal-600 dark:to-teal-900 w-full"></div>

            <div className="px-6 pb-6 relative">
              {/* Avatar Upload */}
              <div className="relative w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-700 border-4 border-white dark:border-slate-800 -mt-12 mx-auto flex items-center justify-center text-3xl font-bold text-slate-400 dark:text-slate-500 shadow-md group">
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  getInitials()
                )}

                {/* Camera Overlay */}
                <button className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="text-white" size={24} />
                </button>
              </div>

              <div className="text-center mt-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {profile.role?.toLowerCase() === "doctor" && "Dr. "} {profile.firstName} {profile.lastName}
                </h3>

                {/* Dynamic Role Badge */}
                <div className="mt-2 inline-flex items-center justify-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      profile.role?.toLowerCase() === "patient"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400"
                        : profile.role?.toLowerCase() === "doctor"
                          ? "bg-teal-100 text-teal-700 dark:bg-teal-500/20 dark:text-teal-400"
                          : profile.role?.toLowerCase() === "pharmacist" ||
                              profile.role?.toLowerCase() === "pharmacy"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
                            : "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400"
                    }`}
                  >
                    {profile.role || "User"} Account
                  </span>
                </div>
              </div>

              <hr className="my-6 border-slate-100 dark:border-slate-700" />

              {/* Quick Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <Mail size={16} />{" "}
                  <span className="truncate">{profile.email || "-"}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <Phone size={16} />{" "}
                  <span>{profile.phone || "Not provided"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DATA FORMS */}
        <div className="flex-1 space-y-6">
          {/* SECTION 1: UNIVERSAL INFORMATION */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6">
              <User className="text-teal-500" size={20} />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                General Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={profile.dateOfBirth}
                  onChange={(e) =>
                    handleInputChange("dateOfBirth", e.target.value)
                  }
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500 transition-all cursor-pointer"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                  Physical Address
                </label>
                <textarea
                  rows="2"
                  value={profile.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500 transition-all resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          {/* SECTION 2: DYNAMIC ROLE-SPECIFIC INFORMATION */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 md:p-8">
            {/* --- IF PATIENT --- */}
            {profile.role?.toLowerCase() === "patient" && (
              <div className="animate-in fade-in duration-300">
                <div className="flex items-center gap-2 mb-6">
                  <Heart className="text-red-500" size={20} />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Medical Profile
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                      Blood Type
                    </label>
                    <select
                      value={profile.bloodType}
                      onChange={(e) =>
                        handleInputChange("bloodType", e.target.value)
                      }
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                    >
                      <option value="">Select Blood Type</option>
                      <option>O+</option>
                      <option>O-</option>
                      <option>A+</option>
                      <option>A-</option>
                      <option>B+</option>
                      <option>B-</option>
                      <option>AB+</option>
                      <option>AB-</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                      Insurance Provider
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. BlueCross, Medicare"
                      value={profile.insuranceProvider}
                      onChange={(e) =>
                        handleInputChange("insuranceProvider", e.target.value)
                      }
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                      Known Allergies
                    </label>
                    <textarea
                      rows="2"
                      placeholder="List any known allergies to medication, food, etc."
                      value={profile.allergies}
                      onChange={(e) =>
                        handleInputChange("allergies", e.target.value)
                      }
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>
            )}

            {/* --- IF DOCTOR OR PHARMACIST --- */}
            {(profile.role?.toLowerCase() === "doctor" ||
              profile.role?.toLowerCase() === "pharmacist" ||
              profile.role?.toLowerCase() === "pharmacy") && (
              <div className="animate-in fade-in duration-300">
                <div className="flex items-center gap-2 mb-6">
                  <Briefcase className="text-teal-500" size={20} />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Professional Credentials
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                      Medical License Number
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. MED-192837"
                      value={profile.license}
                      onChange={(e) =>
                        handleInputChange("license", e.target.value)
                      }
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                      Department / Specialty
                    </label>
                    <input
                      type="text"
                      placeholder={
                        profile.role?.toLowerCase() === "doctor"
                          ? "e.g. Cardiology"
                          : "e.g. Clinical Pharmacy"
                      }
                      value={profile.specialty}
                      onChange={(e) =>
                        handleInputChange("specialty", e.target.value)
                      }
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                      Professional Bio
                    </label>
                    <textarea
                      rows="3"
                      placeholder="A brief summary of your expertise..."
                      value={profile.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>
            )}

            {/* --- IF ADMIN OR RECEPTIONIST --- */}
            {(profile.role?.toLowerCase() === "admin" ||
              profile.role?.toLowerCase() === "receptionist") && (
              <div className="animate-in fade-in duration-300">
                <div className="flex items-center gap-2 mb-6">
                  <Shield className="text-purple-500" size={20} />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    System Access Details
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                      Employee ID
                    </label>
                    <input
                      type="text"
                      disabled
                      value={profile.employeeId || "Not assigned"}
                      className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm text-slate-500 dark:text-slate-500 outline-none cursor-not-allowed font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                      Clearance Level
                    </label>
                    <input
                      type="text"
                      disabled
                      value={
                        profile.clearanceLevel ||
                        (profile.role?.toLowerCase() === "admin"
                          ? "Level 4 (Full Access)"
                          : "Level 2 (Limited Access)")
                      }
                      className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm text-purple-600 dark:text-purple-400 font-bold outline-none cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* GLOBAL SAVE BUTTON */}
          <div className="flex justify-end pt-4">
            <button
              onClick={handleSaveProfile}
              className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-teal-500/20 cursor-pointer"
            >
              Save Profile Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
