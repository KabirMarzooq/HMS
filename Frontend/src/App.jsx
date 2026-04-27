import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { startTokenRefresh, stopTokenRefresh } from "./utils/tokenRefresh";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./components/Dashboard";
import { ScrollTop } from "./layouts/ScrollToTop";
import AdminSchedule from "./sections/Appointments";
import BillsReceipts from "./sections/Billings";
import Profile from "./sections/Profile";
import MedicalRecords from "./sections/MedicalRecords";
import Pharmacy from "./sections/Pharmacy";
import Settings from "./sections/Settings";
import Support from "./sections/Support";
import BookAppointment from "./sections/BookAppointment";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleHome from "./components/RoleHome";
import Prescriptions from "./sections/Prescriptions";
import MyPatients from "./sections/Patients";
import MyAppointments from "./sections/MyAppointments";
import Overview from "./sections/Overview";
import DoctorSchedule from "./sections/DoctorSchedule";
import MedicalReport from "./sections/MedicalReports";
import Users from "./sections/Users";
import AdminReportRequests from "./sections/AdminReportRequests";
import SystemLogs from "./sections/SystemLogs";
import AllMedicalReports from "./sections/AllReports";
import AllPrescriptions from "./sections/AllPrescriptions";
import ReceptionBills from "./sections/BillsandReceipts";
import Inventory from "./sections/Inventory";

export default function App() {
  useEffect(() => {
    const token = localStorage.getItem("oncura_token");

    if (token) {
      startTokenRefresh();
    }

    return () => {
      stopTokenRefresh();
    };
  }, []);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<RoleHome />} />
            <Route path="appointments" element={<AdminSchedule />} />
            <Route path="bills&receipts" element={<BillsReceipts />} />
            <Route path="medical-records" element={<MedicalRecords />} />
            <Route path="medical-reports" element={<MedicalReport />} />
            <Route path="profile" element={<Profile />} />
            <Route path="pharmacy" element={<Pharmacy />} />
            <Route path="settings" element={<Settings />} />
            <Route path="support" element={<Support />} />
            <Route path="bookAppointment" element={<BookAppointment />} />
            <Route path="prescriptions" element={<Prescriptions />} />
            <Route path="patients" element={<MyPatients />} />
            <Route path="my-appointments" element={<MyAppointments />} />
            <Route path="overview" element={<Overview />} />
            <Route path="schedule" element={<DoctorSchedule />} />
            <Route path="users" element={<Users />} />
            <Route path="report-requests" element={<AdminReportRequests />} />
            <Route path="logs" element={<SystemLogs />} />
            <Route path="patient-records" element={<AllMedicalReports />} />
            <Route path="all-prescriptions" element={<AllPrescriptions />} />
            <Route path="bills-and-receipts" element={<ReceptionBills />} />
            <Route path="Inventory" element={<Inventory />} />
            {/* ... other pages */}
          </Route>
        </Route>
      </Routes>

      <ScrollTop />
    </>
  );
}


// Card Number:  4084 0840 8408 4081
// Expiry:       any future date e.g. 12/26
// CVV:          408
// PIN:          0000
// OTP:          123456

// ngrok http 80 --host-header="backend.test"