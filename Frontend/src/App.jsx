import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./components/Dashboard";
import { ScrollTop } from "./layouts/ScrollToTop";
import Appointments from "./sections/Appointments";
import Billing from "./sections/Billings";
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
import Patients from "./sections/Patients";
import MyAppointments from "./sections/MyAppointments";

export default function App() {
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

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<RoleHome />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="billing" element={<Billing />} />
            <Route path="medical-records" element={<MedicalRecords />} />
            <Route path="profile" element={<Profile />} />
            <Route path="pharmacy" element={<Pharmacy />} />
            <Route path="settings" element={<Settings />} />
            <Route path="support" element={<Support />} />
            <Route path="bookAppointment" element={<BookAppointment />} />
            <Route path="prescriptions" element={<Prescriptions />} />
            <Route path="patients" element={<Patients />} />
            <Route path="my-appointments" element={<MyAppointments />} />
            {/* ... other pages */}
          </Route>
        </Route>
      </Routes>

      <ScrollTop />
    </>
  );
}
