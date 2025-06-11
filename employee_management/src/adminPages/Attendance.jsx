import React from "react";
import Header from "../adminComponents/Header";
import BreadCrumb from "../adminComponents/BreadCrumb";
import Sidebar from "../adminComponents/Sidebar";
function Attendance() {
  return (
    <div className="bg-[#E9EDF8] w-screen h-screen flex flex-row">
      <Sidebar />
      <main className="w-full h-full p-2">
        <Header />
        <BreadCrumb text1="Home" text2="Attendance" />
        <div className="h-95">
          <h1>This is Attendance</h1>
        </div>
      </main>
    </div>
  );
}

export default Attendance;
