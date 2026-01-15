import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import "../styles/admin.css";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
