import React from "react";
import Header from "./Header";
import BreadCrumb from "./BreadCrumb";
import Metrix from "./Metrix";
import DashboardGraph from "./DashboardGraph";
import AttendancePreview from "./AttendancePreview";

function Main() {
  return (
    <main className="w-full h-full p-2">
      <Header />
      <BreadCrumb  text2="Dashbboard" />
      <div className="h-95">
        <Metrix />
        <div className="w-full h-full flex flex-row gap-2">
          <DashboardGraph />
          <AttendancePreview
          />
        </div>
      </div>

      {/* Graph */}
    </main>
  );
}

export default Main;
