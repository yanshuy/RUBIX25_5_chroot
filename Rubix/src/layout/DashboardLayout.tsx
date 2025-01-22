import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
  return (
    <>
      <div
        className={`grid min-h-screen grid-cols-[240px,1fr] overflow-clip rounded-md bg-slate-100`}
      >
        <div className="mr-2">
          <Sidebar />
        </div>

        <Outlet />
      </div>
    </>
  );
};

export default DashboardLayout;
