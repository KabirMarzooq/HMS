import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import React from "react";

function signUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const payload = {
      name: data.username,
      email: data.email,
      phone: data.phone,
      role: data.role,
      profile: {
        specialization: data.specialization || null,
        licenseId: data.licenseId || null,
        staffId: data.staffId || null,
      },
    };

    console.log(payload);
  };

  const ROLES = ["patient", "doctor", "receptionist", "admin"];

  const selectedRole = watch("role");

  const messages = [
    "Smart hospital management system",
    "AI-powered patient workflows",
    "Secure & compliant medical records",
    "Faster emergency response",
  ];

  const [messageIndex, setMessageIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % messages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center p-2">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2"
      >
        <div
          className="hidden md:flex relative flex-col justify-between text-white
             bg-[url('/Ui.jfif')] bg-cover bg-center"
        >
          <div
            className="
  absolute inset-0
  bg-gradient-to-br
  from-white/70 via-teal-200/60 to-white/80
  dark:from-cyprus/80 dark:via-teal-900/85 dark:to-black/90 z-0
"
          ></div>

          <div className="z-10">
            <div
              className="relative z-10 mx-18 rounded-full
                      bg-white/10 backdrop-blur-lg
                      border border-white/20
                      shadow-xl animate-float 
                      text-center mt-70"
            >
              <i className="fa-regular fa-hospital text-cloud-white text-5xl p-2 cursor-pointer hover:text-cyprus transition-all ease-in-out duration-300"></i>
              <h1 className="text-4xl font-bold tracking-wide mb-3">ONCURA</h1>
            </div>

            <motion.p
              key={messageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-sm text-cloud-white text-center mt-3"
            >
              .{messages[messageIndex]}.
            </motion.p>
          </div>

          <div className="relative z-10 text-center px-8 pb-8">
            <p className="text-sm opacity-80">
              Smart hospital management system
            </p>
            <p className="text-xs opacity-60 mt-2">
              Free forever · No credit card required
            </p>
          </div>
        </div>

        <div className="p-8 sm:p-10">
          <Link to="/" className="flex items-center gap-3 mb-8">
            <div className="bg-cyprus w-12 h-12 rounded-full flex items-center justify-center">
              <i className="fa-regular fa-hospital text-cloud-white text-lg"></i>
            </div>
            <span className="text-xl font-semibold font-logo text-cyprus italic">
              Oncura
            </span>
          </Link>

          <h2 className="text-2xl font-bold mb-1">Create account</h2>
          <p className="text-sm text-gray-500 mb-6">
            Get started absolutely free.
          </p>

          <form
            action=""
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className="relative my-4">
              <input
                type="text"
                {...register("username", {
                  required: "Username is required",
                })}
                id="username"
                name="username"
                placeholder="Enter Fullname"
                className="border border-gray-800/20 caret-teal-700
                w-full p-5 rounded-2xl focus:outline-offset-2 focus:outline-teal-800
                peer placeholder-transparent focus:shadow-md focus:shadow-teal-700/20"
              />
              <label
                htmlFor="username"
                className="absolute left-5 top-1 text-gray-600 
                text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                peer-placeholder-shown:top-5 transition-all peer-focus:top-1
                 peer-focus:text-gray-600 peer-focus:text-sm cursor-text"
              >
                Enter Fullname
              </label>
              {errors.username && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

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
                placeholder="Enter Email Address"
                className="border border-gray-800/20 caret-teal-700
                w-full p-5 rounded-2xl focus:outline-teal-800
                peer placeholder-transparent focus:shadow-md focus:shadow-teal-700/20 focus:outline-offset-2"
              />
              <label
                htmlFor="email"
                className="absolute left-5 top-1 text-gray-600 
                text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                peer-placeholder-shown:top-5 transition-all peer-focus:top-1
                 peer-focus:text-gray-600 peer-focus:text-sm cursor-text"
              >
                Enter Email Address
              </label>
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="relative my-4">
              <input
                type="tel"
                {...register("phone", {
                  required: "Phone Number is required",
                })}
                id="phone"
                name="phone"
                placeholder="Enter Phone Number"
                className="border border-gray-800/20 caret-teal-700
                w-full p-5 rounded-2xl focus:outline-teal-800
                peer placeholder-transparent focus:shadow-md focus:shadow-teal-700/20 focus:outline-offset-2"
              />
              <label
                htmlFor="phone"
                className="absolute left-5 top-1 text-gray-600 
                text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                peer-placeholder-shown:top-5 transition-all peer-focus:top-1
                 peer-focus:text-gray-600 peer-focus:text-sm cursor-text"
              >
                Enter Phone Number
              </label>
              {errors.phone && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="relative my-4">
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
                id="password"
                name="password"
                placeholder="Enter Password"
                className="border border-gray-800/20 caret-teal-700
                w-full p-5 rounded-2xl focus:outline-offset-2 focus:outline-teal-800
                peer placeholder-transparent focus:shadow-md focus:shadow-teal-700/20"
              />
              <label
                htmlFor="password"
                className="absolute left-5 top-1 text-gray-600 
                text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                peer-placeholder-shown:top-5 transition-all peer-focus:top-1
                 peer-focus:text-gray-600 peer-focus:text-sm cursor-text"
              >
                Enter Password
              </label>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="relative my-4">
              <select
                {...register("role", { required: "Role is required" })}
                className="border border-gray-800/20 caret-teal-700
                w-full p-5 rounded-2xl focus:outline-offset-2 focus:outline-teal-800
                peer placeholder-transparent focus:shadow-md focus:shadow-teal-700/20"
              >
                <option value="">Select role</option>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="receptionist">Receptionist</option>
                <option value="admin">Admin</option>
              </select>

              {errors.role && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>

            {selectedRole === "doctor" && (
              <>
                <div className="relative my-4">
                  <input
                    type="text"
                    {...register("licenseId", {
                      required: "Medical license is required",
                    })}
                    placeholder="Medical License ID"
                    name="licenseId"
                    id="licenseId"
                    className="input border border-gray-800/20 caret-teal-700
                w-full p-5 rounded-2xl focus:outline-offset-2 focus:outline-teal-800
                peer placeholder-transparent focus:shadow-md focus:shadow-teal-700/20"
                  />
                  <label
                    htmlFor="licenseId"
                    className="absolute left-5 top-1 text-gray-600 
                text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                peer-placeholder-shown:top-5 transition-all peer-focus:top-1
                 peer-focus:text-gray-600 peer-focus:text-sm cursor-text"
                  >
                    Medical License ID
                  </label>
                  {errors.licenseId && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.licenseId.message}
                    </p>
                  )}
                </div>

                <div className="relative my-4">
                  <input
                    type="text"
                    name="specialization"
                    id="specialization"
                    {...register("specialization", {
                      required: "Specialization is required",
                    })}
                    placeholder="Specialization"
                    className="input border border-gray-800/20 caret-teal-700
                w-full p-5 rounded-2xl focus:outline-offset-2 focus:outline-teal-800
                peer placeholder-transparent focus:shadow-md focus:shadow-teal-700/20"
                  />
                  <label
                    htmlFor="specialization"
                    className="absolute left-5 top-1 text-gray-600 
                text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                peer-placeholder-shown:top-5 transition-all peer-focus:top-1
                 peer-focus:text-gray-600 peer-focus:text-sm cursor-text"
                  >
                    Enter Your Specialization
                  </label>
                  {errors.specialization && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.specialization.message}
                    </p>
                  )}
                </div>
              </>
            )}

            {selectedRole === "receptionist" && (
              <div className="relative my-4">
                <input
                  type="text"
                  name="staffId"
                  id="staffId"
                  {...register("staffId", { required: "Staff ID required" })}
                  placeholder="Enter Your StaffID"
                  className="input border border-gray-800/20 caret-teal-700
                w-full p-5 rounded-2xl focus:outline-offset-2 focus:outline-teal-800
                peer placeholder-transparent focus:shadow-md focus:shadow-teal-700/20"
                />
                <label
                  htmlFor="staffId"
                  className="absolute left-5 top-1 text-gray-600 
                text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                peer-placeholder-shown:top-5 transition-all peer-focus:top-1
                 peer-focus:text-gray-600 peer-focus:text-sm cursor-text"
                >
                  Enter Your staffId
                </label>
                {errors.staffId && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.staffId.message}
                  </p>
                )}
              </div>
            )}

            {selectedRole === "admin" && (
              <div className="relative my-4">
                <input
                  type="password"
                  name="adminKey"
                  id="adminKey"
                  {...register("adminKey", {
                    required: "Admin key required",
                    validate: (v) =>
                      v === import.meta.env.VITE_ADMIN_SECRET ||
                      "Invalid admin key",
                  })}
                  placeholder="Admin Authorization Key"
                  className="input border border-gray-800/20 caret-teal-700
                w-full p-5 rounded-2xl focus:outline-offset-2 focus:outline-teal-800
                peer placeholder-transparent focus:shadow-md focus:shadow-teal-700/20"
                />
                <label
                  htmlFor="adminKey"
                  className="absolute left-5 top-1 text-gray-600 
                text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                peer-placeholder-shown:top-5 transition-all peer-focus:top-1
                 peer-focus:text-gray-600 peer-focus:text-sm cursor-text"
                >
                  Admin Authorization Key
                </label>
                {errors.adminKey && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.adminKey.message}
                  </p>
                )}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyprus to-teal-700  text-white font-bold py-3 rounded-lg hover:opacity-90 cursor-pointer focus:outline-offset-2 focus:outline-offset-indigo-700 transition-all ease-in-out duration-300"
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

            <Link
              to="/login"
              className="block w-full text-center mt-4 text-slate-400 text-sm cursor-pointer"
            >
              Have an account? Log In
            </Link>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default signUp;
