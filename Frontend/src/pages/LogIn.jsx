import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

function LogIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const payload = {
      email: data.email,
    };

    console.log(payload);
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-2">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl
        grid grid-cols-1 md:grid-cols-2 bg-white"
      >
        <div className="p-8 sm:p-10 flex flex-col justify-center">
          <Link to="/" className="flex items-center gap-3 mb-8">
            <div className="bg-cyprus w-12 h-12 rounded-full flex items-center justify-center">
              <i className="fa-regular fa-hospital text-cloud-white text-lg"></i>
            </div>
            <span className="text-xl font-semibold font-logo text-cyprus italic">
              Oncura
            </span>
          </Link>

          <h2 className="text-2xl font-bold mb-1">Welcome back</h2>
          <p className="text-sm text-gray-500 mb-6">
            Log in to continue to your dashboard.
          </p>

          <form
            action=""
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
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

            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-teal-700 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyprus to-teal-700
              text-white font-bold py-3 rounded-lg
              hover:opacity-90 transition-all duration-300 cursor-pointer"
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
                className="flex-1 border border-gray-300 py-2 rounded-lg
                flex items-center justify-center gap-2 hover:bg-gray-50 transition cursor-pointer"
              >
                <i className="fa-brands fa-google text-red-500"></i>
                <span className="text-sm font-medium">Google</span>
              </button>

              <button
                type="button"
                className="flex-1 border border-gray-300 py-2 rounded-lg
                flex items-center justify-center gap-2 hover:bg-gray-50 transition cursor-pointer"
              >
                <i className="fa-brands fa-facebook text-blue-600"></i>
                <span className="text-sm font-medium">Facebook</span>
              </button>
            </div>

            <Link
              to="/signup"
              className="block text-center text-sm text-slate-400 mt-4"
            >
              Need an account? Register
            </Link>
          </form>
        </div>

        <div
          className="hidden md:flex relative items-center justify-center text-white
          bg-[url('/Ui.jfif')] bg-cover bg-center"
        >
          <div
            className="absolute inset-0 bg-gradient-to-br
          from-cyprus/70 via-teal-900/85 to-black/90
          dark:from-black/70 dark:via-gray-900/85 dark:to-black/95"
          />

          <div className="relative z-10 text-center px-8 flex flex-col h-full justify-between py-12">
            <div className="animate-float">
              <i className="fa-regular fa-hospital text-5xl mb-4"></i>
              <h1 className="text-4xl font-bold tracking-wide">ONCURA</h1>
            </div>

            <div>
              <p className="text-sm opacity-90">
                Smart hospital management system
              </p>
              <p className="text-xs opacity-70 mt-2">
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
