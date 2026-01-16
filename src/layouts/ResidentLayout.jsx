import { Outlet } from "react-router-dom";
import ResidentSidebar from "../components/ResidentSidebar";

export default function ResidentLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ResidentSidebar />
      <main style={{ flex: 1, padding: "30px" }}>
        <Outlet />
      </main>
    </div>
  );
}
