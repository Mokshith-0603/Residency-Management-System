import { Routes, Route, Navigate } from "react-router-dom";

/* ================= PAGES ================= */
import Home from "./pages/Home";
import Login from "./pages/Login";

/* -------- ADMIN PAGES -------- */
import AdminDashboard from "./pages/AdminDashboard";
import AdminResidents from "./pages/AdminResidents";
import AdminAnnouncements from "./pages/AdminAnnouncements";
import AdminStaff from "./pages/AdminStaff";
import AdminEvents from "./pages/AdminEvents";
import AdminListings from "./pages/AdminListings";
import AdminWishlist from "./pages/AdminWishlist";
import AdminMaintenance from "./pages/AdminMaintenance";

/* -------- RESIDENT PAGES -------- */
import ResidentDashboard from "./pages/ResidentDashboard";

/* ================= LAYOUT & GUARDS ================= */
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";

export default function App() {
  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* ================= ADMIN ROUTES ================= */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="ADMIN">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="residents" element={<AdminResidents />} />
        <Route path="announcements" element={<AdminAnnouncements />} />
        <Route path="staff" element={<AdminStaff />} />
        <Route path="events" element={<AdminEvents />} />
        <Route path="listings" element={<AdminListings />} />
        <Route path="wishlist" element={<AdminWishlist />} />
        <Route path="maintenance" element={<AdminMaintenance />} />
      </Route>

      {/* ================= RESIDENT ROUTES ================= */}
      <Route
        path="/resident"
        element={
          <ProtectedRoute allowedRole="RESIDENT">
            <ResidentDashboard />
          </ProtectedRoute>
        }
      />

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
