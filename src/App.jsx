import { Routes, Route, Navigate } from "react-router-dom";

/* ================= PUBLIC PAGES ================= */
import Home from "./pages/Home";
import Login from "./pages/Login";

/* ================= ADMIN PAGES ================= */
import AdminDashboard from "./pages/AdminDashboard";
import AdminResidents from "./pages/AdminResidents";
import AdminAnnouncements from "./pages/AdminAnnouncements";
import AdminStaff from "./pages/AdminStaff";
import AdminEvents from "./pages/AdminEvents";
import AdminListings from "./pages/AdminListings";
import AdminWishlist from "./pages/AdminWishlist";
import AdminMaintenance from "./pages/AdminMaintenance";

/* ================= RESIDENT PAGES ================= */
import ResidentDashboard from "./pages/resident/ResidentDashboard";
import ResidentsDirectory from "./pages/resident/ResidentsDirectory";
import ResidentAnnouncements from "./pages/resident/ResidentAnnouncements";
import ResidentEvents from "./pages/resident/ResidentEvents";
import ResidentListings from "./pages/resident/ResidentListings";
import ResidentWishlist from "./pages/resident/ResidentWishlist";
import ResidentComplaints from "./pages/resident/ResidentComplaints";

/* ================= LAYOUTS & GUARDS ================= */
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import ResidentLayout from "./layouts/ResidentLayout";

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
            <ResidentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ResidentDashboard />} />
        <Route path="residents" element={<ResidentsDirectory />} />
        <Route path="announcements" element={<ResidentAnnouncements />} />
        <Route path="events" element={<ResidentEvents />} />
        <Route path="listings" element={<ResidentListings />} />
        <Route path="wishlist" element={<ResidentWishlist />} />
        <Route path="complaints" element={<ResidentComplaints />} />
      </Route>

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}