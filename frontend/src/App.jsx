import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Contacts from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Admin/Dashboard";
import CourseDetail from "./components/CourseDetail";
import Success from "./components/Success";
import Failure from "./components/Failure";
import PaymentForm from "./components/PaymentForm";
import MyPayment from "./pages/MyPayment";
import PaidUserDashboard from "./pages/paiduser/PaidDashboard";

import useGetCurrentUser from "./hooks/useGetCurrentUser";
import useGetCurrentPaidUser from "./hooks/useGetCurrentPaidUser";

function App() {
  // Fetch logged-in user and paid status
  useGetCurrentUser();
  useGetCurrentPaidUser();

  // Redux states
  const { userData, loading } = useSelector((state) => state.user);
  const { isPaid } = useSelector((state) => state.paidUser);


  // Loading fallback
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <Routes>
      {/* ---------------- Public Routes ---------------- */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/contact" element={<Contacts />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />

      {/* ---------------- Admin Routes ---------------- */}
      <Route path="/dp/admin/login" element={<AdminLogin />} />
      <Route
        path="/dp/admin/dashboard"
        element={
          userData?.user?.role === "admin" ? <Dashboard /> : <NotFound />
        }
      />

      {/* ---------------- Paid User Route ---------------- */}
      <Route
        path="/paiduser/portal"
        element={isPaid ? <PaidUserDashboard /> : <NotFound />}
      />

      {/* ---------------- Course & Payment Routes ---------------- */}
      <Route path="/courses/:id" element={<CourseDetail />} />
      <Route path="/payment" element={<PaymentForm />} />
      <Route path="/payment-success" element={<Success />} />
      <Route path="/payment-failure" element={<Failure />} />
      <Route path="/my-payments" element={<MyPayment />} />
    </Routes>
  );
}

export default App;
