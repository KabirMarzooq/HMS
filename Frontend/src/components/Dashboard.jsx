import { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  Users,
  Calendar,
  Activity,
  Pill,
  LayoutDashboard,
  CreditCard,
  Settings,
  LifeBuoy,
  LogOut,
  Search,
  ChevronRight,
  Bell,
  Monitor,
} from "lucide-react";

// --- Role Configuration ---
const ROLE_NAV_ITEMS = {
  Patient: [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Appointments", path: "/appointments", icon: Calendar },
    { label: "Pharmacy", path: "/pharmacy", icon: Pill },
    { label: "Billings", path: "/billing", icon: CreditCard },
  ],
  Doctor: [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Patients", path: "/patients", icon: Users },
    { label: "Appointments", path: "/appointments", icon: Calendar },
  ],
  // Add more roles here easily
};

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [userRole, setUserRole] = useState("Patient"); // This will come from your DB later
  const userName = "Kabir Marzooq";
  const location = useLocation();

  // Handle Initials
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={`${dark ? "dark" : ""} font-sans transition-colors duration-300`}
    >
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 flex">
        {/* Mobile Toggle Button - Only visible on small screens */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden fixed left-0 top-1/4 -translate-y-1/2 z-[60] bg-[#003333] text-white p-2 rounded-r-xl shadow-lg border border-l-0 border-white/20 transition-all hover:bg-teal-700"
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <ChevronRight size={24} />
          </motion.div>
        </button>

        {/* Sidebar Container */}
        <aside
          className={`
  fixed inset-y-0 left-0 z-50 w-64 bg-[#003333] text-white flex flex-col p-6 m-0 lg:m-4 
  lg:rounded-3xl shadow-2xl transition-transform duration-500 ease-in-out
  ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
  lg:static lg:block
`}
        >
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="bg-teal-500 p-2 rounded-lg">
              <Activity size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold italic">Oncura+</span>
          </div>

          <nav className="flex-1 space-y-3">
            {ROLE_NAV_ITEMS[userRole].map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                  ${isActive ? "bg-white text-[#003333] shadow-lg" : "text-gray-300 hover:bg-white/10"}
                `}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Bottom Nav Section */}
          <div className="pt-6 mt-6 border-t border-white/10 space-y-2">
            {[
              { label: "Profile", path: "/profile", icon: Users },
              { label: "Settings", path: "/settings", icon: Settings },
              { label: "Support", path: "/support", icon: LifeBuoy },
            ].map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all
                  ${isActive ? "border border-white/50 bg-white/5" : "text-gray-400 hover:text-white"}
                `}
              >
                <item.icon size={18} />
                {item.label}
              </NavLink>
            ))}
            <button className="flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 w-full rounded-lg mt-4 transition-all">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </aside>
        {/* Overlay to close sidebar when clicking outside on mobile */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* --- Main Content Area --- */}
        <main className="flex-1 flex flex-col">
          {/* Top Header */}
          <header className="flex items-center justify-between p-8">
            <div className="flex items-center gap-4">
              {/* Search Bar is here... */}
              <div className="relative group">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-600 transition-colors"
                  size={20}
                />
                <input
                  type="search"
                  placeholder="Search anything..."
                  className="pl-11 pr-4 py-2.5 w-80 text-white rounded-2xl bg-white dark:bg-slate-900 border-none shadow-sm focus:ring-2 focus:ring-teal-500 transition-all outline-none"
                />
              </div>

              <NavLink
                to="/bookAppointment"
                className={({ isActive }) => `
                  flex items-center gap-2 px-4 py-2.5 rounded-2xl font-medium transition-all duration-300 ease-in-out shadow-md active:scale-95 whitespace-nowrap
                  ${isActive ? "border border-white/50 bg-white/5 text-white" : "text-gray-400 hover:text-white bg-[#003333]"}
                `}
              >
                <span className="text-xl font-bold">+</span>
                <span>Patients</span>
              </NavLink>
            </div>

            <div className="flex items-center gap-6">
              {/* Theme Toggle Button */}
              <button
                onClick={() => setDark(!dark)}
                className="relative w-14 h-7 flex items-center bg-gray-200 dark:bg-teal-900 rounded-full p-1 transition-colors duration-500 shadow-inner"
              >
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 700, damping: 30 }}
                  className="bg-white dark:bg-teal-400 w-5 h-5 rounded-full flex items-center justify-center shadow-md"
                >
                  {dark ? (
                    <Moon size={12} className="text-teal-900" />
                  ) : (
                    <Sun size={12} className="text-yellow-500" />
                  )}
                </motion.div>
                <div className="absolute inset-0 flex justify-between items-center px-2 pointer-events-none">
                  {!dark && (
                    <Moon size={10} className="ml-auto text-gray-400" />
                  )}
                  {dark && <Sun size={10} className="text-teal-200" />}
                </div>
              </button>

              <div className="flex items-center gap-4 border-l pl-6 border-gray-200 dark:border-slate-800">
                <div className="text-right">
                  <p className="text-sm font-bold dark:text-white">
                    {userName}
                  </p>
                  <p className="text-xs text-gray-500">{userRole}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white">
                  {initials}
                </div>
              </div>
            </div>
          </header>

          {/* Page Content with Animation */}
          <div className="px-8 pb-8 flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
