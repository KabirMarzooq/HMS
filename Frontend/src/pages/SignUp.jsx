import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Configuration for ID lengths
const ID_CONFIG = {
  admin: { length: 8, label: "Admin Authorization Key", name: "adminKey" },
  doctor: { length: 10, label: "Medical License ID", name: "licenseId" },
  receptionist: { length: 6, label: "Staff ID", name: "staffId" },
};

function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showId, setShowId] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  const selectedRole = watch("role");

  const messages = [
    "Smart hospital management system",
    "AI-powered patient workflows",
    "Secure & compliant medical records",
    "Faster emergency response",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const payload = {
      name: data.username,
      email: data.email,
      phone: data.phone,
      role: data.role,
      ...(data.role === "admin" && { adminKey: data.adminKey }),
      ...(data.role === "doctor" && {
        licenseId: data.licenseId,
        specialization: data.specialization,
      }),
      ...(data.role === "receptionist" && { staffId: data.staffId }),
      password: data.password,
      password_confirmation: data.password,
    };

    try {
      const response = await api.post("/auth/register", payload);

      if (response.status === 201 || response.status === 200) {
        toast.success("Registration Successful! Please login.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Backend Error:", error.response?.data);
      const errorMsg = error.response?.data?.message || "Registration failed";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="auth-page-container min-h-screen flex justify-center items-center p-2">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2"
      >
        {/* Left Side: Branding */}
        <div className="hidden md:flex relative flex-col justify-between text-white bg-[url('/Ui.jfif')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-teal-200/60 to-white/80 dark:from-cyprus/80 dark:via-teal-900/85 dark:to-black/90 z-0"></div>

          <div className="z-10 text-center mt-40">
            <div className="mx-auto w-24 h-24 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl flex items-center justify-center animate-bounce">
              <i className="fa-regular fa-hospital text-4xl"></i>
            </div>
            <h1 className="text-4xl font-bold tracking-wide mt-4">ONCURA</h1>
            <motion.p
              key={messageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-cloud-white mt-3 px-10"
            >
              {messages[messageIndex]}
            </motion.p>
          </div>

          <div className="relative z-10 text-center pb-8">
            <p className="text-xs opacity-60">
              Free forever · Secure Encryption
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 sm:p-10 max-h-[90vh] overflow-y-auto">
          <Link to="/" className="flex items-center gap-3 mb-6">
            <div className="bg-cyprus w-10 h-10 rounded-full flex items-center justify-center">
              <i className="fa-regular fa-hospital text-white"></i>
            </div>
            <span className="text-xl font-bold text-cyprus italic">Oncura</span>
          </Link>

          <h2 className="text-2xl font-bold mb-1">Create account</h2>
          <p className="text-sm text-gray-500 mb-6">
            Get started absolutely free.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <div className="relative">
              <input
                type="text"
                id="username"
                name="name"
                {...register("username", { required: "Full name is required" })}
                placeholder=" "
                className="peer w-full p-4 pt-6 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all"
              />
              <label
                htmlFor="username"
                className="absolute left-4 top-2 text-gray-400 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 
               peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-xs peer-focus:text-teal-600 cursor-text"
              >
                Full Name
              </label>
              {errors.username && (
                <p className="text-red-500 text-[10px] mt-1 ml-2">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                })}
                placeholder=" "
                className="peer w-full p-4 pt-6 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all"
              />
              <label
                htmlFor="email"
                className="absolute left-4 top-2 text-gray-400 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 
               peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-xs peer-focus:text-teal-600 cursor-text"
              >
                Email Address
              </label>
              {errors.email && (
                <p className="text-red-500 text-[10px] mt-1 ml-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password with Eye and MinLength */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
                placeholder=" "
                className="peer w-full p-4 pt-6 pr-12 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all"
              />
              <label
                htmlFor="password"
                className="absolute left-4 top-2 text-gray-400 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 
               peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-xs peer-focus:text-teal-600 cursor-text"
              >
                Create Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-5 text-gray-400 hover:text-teal-600 transition-colors cursor-pointer"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-[10px] mt-1 ml-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password_confirmation"
                {...register("password_confirmation", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                placeholder=" "
                className="peer w-full p-4 pt-6 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all"
              />
              <label
                htmlFor="password_confirmation"
                className="absolute left-4 top-2 text-gray-400 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-teal-600 cursor-text"
              >
                Confirm Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-5 text-gray-400 hover:text-teal-600 transition-colors cursor-pointer"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
              {errors.password_confirmation && (
                <p className="text-red-500 text-[10px] mt-1 ml-2">
                  {errors.password_confirmation.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="relative">
              <input
                type="tel"
                id="phone"
                name="phone"
                {...register("phone", { required: "Phone number is required" })}
                placeholder=" "
                className="peer w-full p-4 pt-6 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all"
              />
              <label
                htmlFor="phone"
                className="absolute left-4 top-2 text-gray-400 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 
               peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-xs peer-focus:text-teal-600 cursor-text"
              >
                Phone Number
              </label>
              {errors.phone && (
                <p className="text-red-500 text-[10px] mt-1 ml-2">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Role Selection */}
            <div className="relative">
              <select
                {...register("role", { required: "Please select a role" })}
                name="role"
                className="w-full p-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 cursor-pointer"
              >
                <option value="">Select Role</option>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="receptionist">Receptionist</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-[10px] mt-1 ml-2">
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* Conditional Role Fields with Fixed Lengths and Eye Toggle */}
            {selectedRole && selectedRole !== "patient" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-4"
              >
                {/* ID Field (License, Staff, or Admin Key) */}
                <div className="relative">
                  <input
                    id="staffid"
                    name="staffid"
                    type={showId ? "text" : "password"}
                    {...register(ID_CONFIG[selectedRole].name, {
                      required: `${ID_CONFIG[selectedRole].label} is required`,
                      validate: (val) =>
                        val.length === ID_CONFIG[selectedRole].length ||
                        `ID must be exactly ${ID_CONFIG[selectedRole].length} characters long`,
                    })}
                    placeholder=" "
                    className="peer w-full p-4 pt-6 pr-12 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all"
                  />
                  <label
                    htmlFor="staffid"
                    className="absolute left-4 top-2 text-gray-400 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 
               peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-xs peer-focus:text-teal-600 cursor-text"
                  >
                    {ID_CONFIG[selectedRole].label}
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowId(!showId)}
                    className="absolute right-4 top-5 text-gray-400 hover:text-teal-600 cursor-pointer"
                  >
                    {showId ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                  {errors[ID_CONFIG[selectedRole].name] && (
                    <p className="text-red-500 text-[10px] mt-1 ml-2">
                      {errors[ID_CONFIG[selectedRole].name].message}
                    </p>
                  )}
                </div>

                {/* Specialization (Doctor Only) */}
                {selectedRole === "doctor" && (
                  <div className="relative">
                    <input
                      type="text"
                      id="speciality"
                      name="speciality"
                      {...register("specialization", {
                        required: "Specialization is required",
                      })}
                      placeholder=" "
                      className="peer w-full p-4 pt-6 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                    />
                    <label
                      htmlFor="speciality"
                      className="absolute left-4 top-2 text-gray-400 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 
               peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-xs peer-focus:text-teal-600 cursor-text"
                    >
                      Medical Specialization
                    </label>
                    {errors.specialization && (
                      <p className="text-red-500 text-[10px] mt-1 ml-2">
                        {errors.specialization.message}
                      </p>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyprus to-teal-800 text-white font-bold py-4 rounded-2xl hover:opacity-90 transition-all shadow-lg active:scale-95 cursor-pointer focus:outline-offset-2 focus:outline-teal-700 duration-300 ease-in-out"
            >
              Create Account
            </button>

            <div className="flex items-center gap-3 my-6">
              <span className="flex-1 h-px bg-gray-200"></span>

              <span className="text-xs text-gray-400">OR</span>

              <span className="flex-1 h-px bg-gray-200"></span>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                className="flex-1 border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-all ease-in-out duration-300 cursor-pointer"
              >
                <i className="fa-brands fa-google text-red-500"></i>

                <span className="text-sm font-medium">Google</span>
              </button>

              <button
                type="button"
                className="flex-1 border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-all ease-in-out duration-300 cursor-pointer"
              >
                <i className="fa-brands fa-facebook text-blue-600"></i>

                <span className="text-sm font-medium">Facebook</span>
              </button>
            </div>

            <div className="text-center text-sm text-gray-400 mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-teal-600 font-bold hover:underline"
              >
                Log In
              </Link>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default SignUp;
