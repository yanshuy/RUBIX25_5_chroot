import { Outlet } from "react-router-dom";
import OrganizerSidebar from "../components/OrganizerSidebar";

const OrganizerDashboardLayout = () => {
  return (
    <>
    <>
      <div
        className={`grid min-h-screen grid-cols-[300px,1fr] bg-slate-100 overflow-clip rounded-md `}
      >
        <div className="mr-2">
          <OrganizerSidebar />
        </div>

        <Outlet />
      </div>
    </>
    </>
  );
};

export default OrganizerDashboardLayout;
