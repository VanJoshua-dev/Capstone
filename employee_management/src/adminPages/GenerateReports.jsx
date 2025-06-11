import React from 'react'
import Header from "../adminComponents/Header";
import BreadCrumb from "../adminComponents/BreadCrumb";
import Sidebar from "../adminComponents/Sidebar";
function GenerateReports() {
  return (
    <div className="bg-[#E9EDF8] w-screen h-screen flex flex-row">
      <Sidebar />
      <main className="w-full h-full p-2">
        <Header />
        <BreadCrumb text1="Home" text2="Generate Reports" />
        <div className="h-95">
          <h1>This is generate reports</h1>
        </div>
      </main>
    </div>
  )
}

export default GenerateReports
