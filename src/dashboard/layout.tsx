import { Outlet } from "react-router-dom";
import DashboardNav from "./nav";

const DashboardLayout = () => {
  return (
    <main>
      <DashboardNav />
      <Outlet />
    </main>
  );
};

export default DashboardLayout;
