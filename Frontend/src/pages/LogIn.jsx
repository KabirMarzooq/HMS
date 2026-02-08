import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function LogIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      const token = response.data.access_token;
      const user = response.data.user;

      localStorage.setItem("oncura_token", token);
      localStorage.setItem("oncura_user", JSON.stringify(user));

      toast.success("Welcome Back!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Invalid credentials. Please try again.");
    }
  };

  return (
    /* Added auth-page-container for the autofill fix */
    <div className="auth-page-container min-h-screen flex justify-center items-center p-2">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2 bg-white"
      >
        <div className="p-8 sm:p-10 flex flex-col justify-center">
          <Link to="/" className="flex items-center gap-3 mb-8">
            <div className="bg-cyprus w-12 h-12 rounded-full flex items-center justify-center">
              <i className="fa-regular fa-hospital text-white text-lg"></i>
            </div>
            <span className="text-xl font-semibold font-logo text-cyprus italic">
              Oncura
            </span>
          </Link>

          <h2 className="text-2xl font-bold mb-1">Welcome back</h2>
          <p className="text-sm text-gray-500 mb-6">
            Log in to continue to your dashboard.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field with Floating Label */}
            <div className="relative my-4">
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                id="email"
                name="email"
                placeholder=" " /* Required for floating label logic */
                className="peer w-full p-4 pt-6 border border-gray-200 rounded-2xl 
                           focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 
                           transition-all placeholder-transparent"
              />
              <label
                htmlFor="email"
                className="absolute left-4 text-gray-400 transition-all cursor-text
                           top-2 text-xs peer-placeholder-shown:top-5 peer-placeholder-shown:text-base 
                           peer-placeholder-shown:text-gray-400 peer-placeholder-shown:font-normal
                           peer-focus:top-2 peer-focus:text-xs peer-focus:text-teal-600"
              >
                Email Address
              </label>
              {errors.email && (
                <p className="text-[10px] text-red-500 mt-1 ml-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field with Floating Label and Eye Toggle */}
            <div className="relative my-4">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                })}
                id="password"
                name="password"
                placeholder=" "
                className="peer w-full p-4 pt-6 border border-gray-200 rounded-2xl 
                           focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 
                           transition-all placeholder-transparent"
              />
              <label
                htmlFor="password"
                className="absolute left-4 text-gray-400 transition-all cursor-text
                           top-2 text-xs peer-placeholder-shown:top-5 peer-placeholder-shown:text-base 
                           peer-placeholder-shown:text-gray-400 peer-placeholder-shown:font-normal
                           peer-focus:top-2 peer-focus:text-xs peer-focus:text-teal-600"
              >
                Password
              </label>
              <button
                type="button"
                className="absolute right-4 top-5 text-gray-400 hover:text-teal-600 transition-all cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
              {errors.password && (
                <p className="text-[10px] text-red-500 mt-1 ml-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-xs text-teal-700 hover:underline font-medium"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyprus to-teal-800 text-white font-bold py-4 rounded-2xl hover:opacity-90 transition-all shadow-lg active:scale-95 cursor-pointer focus:outline-offset-2 focus:outline-teal-700 duration-300 ease-in-out"
            >
              Log In
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

            <Link
              to="/signup"
              className="block text-center text-sm text-gray-400 mt-6"
            >
              Don't have an account?{" "}
              <span className="text-teal-600 font-bold hover:underline">
                Register
              </span>
            </Link>
          </form>
        </div>

        {/* Right Side Image/Branding */}
        <div className="hidden md:flex relative items-center justify-center text-white bg-[url('/Ui.jfif')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-br from-cyprus/70 via-teal-900/85 to-black/90" />
          <div className="relative z-10 text-center px-8 flex flex-col h-full justify-between py-12">
            <div className="animate-float mt-20">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
                <i className="fa-regular fa-hospital text-4xl"></i>
              </div>
              <h1 className="text-4xl font-bold tracking-wide">ONCURA</h1>
            </div>
            <div>
              <p className="text-sm opacity-90 font-light">
                Smart hospital management system
              </p>
              <p className="text-[10px] opacity-60 mt-2 uppercase tracking-tighter">
                Secure · Scalable · Life-critical
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default LogIn;
