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
  Box,
  CalendarDays,
} from "lucide-react";
import { useTheme } from "../layouts/ThemeContext";

// --- Role Configuration ---
const ROLE_NAV_ITEMS = {
  Patient: [
    {
      label: "My Appointments",
      path: "/dashboard/my-appointments",
      icon: Calendar,
      title: "View your appointments",
    },
    {
      label: "Pharmacy",
      path: "/dashboard/pharmacy",
      icon: Pill,
      title: "Access pharmacy services",
    },
    {
      label: "Billings",
      path: "/dashboard/billing",
      icon: CreditCard,
      title: "Manage billing and payments",
    },
    {
      label: "Medical Reports",
      path: "/dashboard/medical-reports",
      icon: Activity,
      title: "View medical reports",
    },
  ],
  Doctor: [
    {
      label: "Overview",
      path: "/dashboard/overview",
      icon: LayoutDashboard,
      title: "View dashboard overview",
    },
    {
      label: "Schedule",
      path: "/dashboard/schedule",
      icon: CalendarDays,
      title: "Manage appointments",
    },
    {
      label: "My Patients",
      path: "/dashboard/patients",
      icon: Users,
      title: "Manage patients",
    },
    {
      label: "Prescriptions",
      path: "/dashboard/prescriptions",
      icon: Pill,
      title: "View prescriptions",
    },
    {
      label: "Medical Records",
      path: "/dashboard/medical-records",
      icon: Activity,
      title: "View medical records",
    },
    {
      label: "My Appointments",
      path: "/dashboard/my-appointments",
      icon: Calendar,
      title: "View your personal appointments",
    },
  ],
  Admin: [
    {
      label: "All Users",
      path: "/dashboard/users",
      icon: Users,
      title: "Manage all users",
    },
    {
      label: "System Logs",
      path: "/dashboard/logs",
      icon: Monitor,
      title: "View system logs",
    },
    {
      label: "My Appointments",
      path: "/dashboard/my-appointments",
      icon: Calendar,
      title: "View your personal appointments",
    },
  ],
  Receptionist: [
    {
      label: "Schedule",
      path: "/dashboard/appointments",
      icon: Calendar,
      title: "Manage schedule",
    },
    {
      label: "Front Desk",
      path: "/dashboard/reception",
      icon: Users,
      title: "Manage front desk operations",
    },
    {
      label: "Prescriptions",
      path: "/dashboard/prescriptions",
      icon: Pill,
      title: "View prescriptions",
    },
    {
      label: "My Appointments",
      path: "/dashboard/my-appointments",
      icon: Calendar,
      title: "View your personal appointments",
    },
  ],
  Pharmacy: [
    {
      label: "Prescriptions",
      path: "/dashboard/prescriptions",
      icon: Pill,
      title: "View prescriptions",
    },
    {
      label: "Inventory",
      path: "/dashboard/inventory",
      icon: Box,
      title: "Manage inventory",
    },
    {
      label: "Sales Records",
      path: "/dashboard/billing",
      icon: CreditCard,
      title: "View sales records",
    },
    {
      label: "My Appointments",
      path: "/dashboard/my-appointments",
      icon: Calendar,
      title: "View your personal appointments",
    },
  ],
  // Add more roles here easily
};

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Grab the user string from localStorage we saved during login
    const savedUser = localStorage.getItem("oncura_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  if (!user) return null; // Or a loading spinner

  // Now use the real data!
  const userRole = user.role; // e.g., "Doctor" or "Patient"
  const userName = user.name || "User";

  const normalizedRole =
    userRole.charAt(0).toUpperCase() + userRole.slice(1).toLowerCase();

  // Dynamic Role Mapping (ensure your ROLE_NAV_ITEMS keys match DB roles)
  const navItems = ROLE_NAV_ITEMS[normalizedRole] || ROLE_NAV_ITEMS["Patient"];

  const handleLogout = () => {
    localStorage.removeItem("oncura_token");
    localStorage.removeItem("oncura_user");
    // Use window.location to force a full refresh and clear state
    window.location.href = "/login";
  };

  // Handle Initials - First and Last name with safety checks
  const getInitials = (name) => {
    if (!name || typeof name !== "string") return "?";

    const nameParts = name.trim().split(" ").filter(Boolean); // Remove empty strings

    if (nameParts.length === 0) return "?";
    if (nameParts.length === 1) return nameParts[0][0].toUpperCase();

    return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
  };

  const initials = getInitials(userName);

  return (
    <div className="font-sans transition-colors duration-300">
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 flex transition-colors duration-300">
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
  lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)]
`}
        >
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="bg-teal-500 p-2 rounded-lg">
              <Activity size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold italic">Oncura+</span>
          </div>

          <nav className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                  ${isActive ? "bg-white text-[#003333] shadow-lg" : "text-gray-300 hover:bg-white/10"}
                `}
                title={item.title}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Bottom Nav Section */}
          <div className="pt-10 mt-10 border-t border-white/10 space-y-2">
            {[
              {
                label: "Profile",
                path: "/dashboard/profile",
                icon: Users,
                title: "View your profile",
              },
              {
                label: "Settings",
                path: "/dashboard/settings",
                icon: Settings,
                title: "Manage settings",
              },
              {
                label: "Support",
                path: "/dashboard/support",
                icon: LifeBuoy,
                title: "Get support",
              },
            ].map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all
                  ${isActive ? "border border-white/50 bg-white/5" : "text-gray-400 hover:text-white"}
                `}
                title={item.title}
              >
                <item.icon size={18} />
                {item.label}
              </NavLink>
            ))}

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 w-full rounded-lg mt-4 transition-all cursor-pointer"
            >
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
                  className="pl-11 pr-4 py-2.5 w-80 text-gray-700 dark:text-gray-400 rounded-2xl bg-white dark:bg-slate-900 border-none shadow-sm focus:ring-2 focus:ring-teal-500 transition-all outline-none"
                />
              </div>

              <NavLink
                to="/dashboard/bookAppointment"
                title="Book Appointment"
                className={({ isActive }) => `
                  flex items-center gap-2 px-4 py-2.5 rounded-2xl font-medium transition-all duration-300 ease-in-out shadow-md active:scale-95 whitespace-nowrap bg-[#003333] border border-[#003333]
                  ${isActive ? "border border-white/50 text-white" : "text-gray-400 hover:text-white"}
                `}
              >
                <span className="text-xl font-bold">+</span>
                <span>Patients</span>
              </NavLink>
            </div>

            <div className="flex items-center gap-6">
              {/* Theme Toggle Button */}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="relative w-14 h-7 flex items-center bg-gray-200 dark:bg-teal-900 rounded-full p-1 transition-colors duration-500 shadow-inner cursor-pointer"
                aria-label="Toggle theme"
              >
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 700, damping: 30 }}
                  className={`bg-white dark:bg-teal-400 w-5 h-5 rounded-full flex items-center justify-center shadow-md ${
                    theme === "dark" ? "ml-auto" : ""
                  }`}
                >
                  {theme === "dark" ? (
                    <Moon size={12} className="text-teal-900" />
                  ) : (
                    <Sun size={12} className="text-yellow-500" />
                  )}
                </motion.div>
                <div className="absolute inset-0 flex justify-between items-center px-2 pointer-events-none">
                  {theme !== "dark" && (
                    <Moon size={10} className="ml-auto text-gray-400" />
                  )}
                  {theme === "dark" && <Sun size={10} className="text-teal-200" />}
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
