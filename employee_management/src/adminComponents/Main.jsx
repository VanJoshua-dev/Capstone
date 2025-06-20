import React, {useState} from "react";
import Header from "./Header";
import BreadCrumb from "./BreadCrumb";
import Metrix from "./Metrix";
import DashboardGraph from "./DashboardGraph";
import AttendancePreview from "./AttendancePreview";
import AccountSettings from "../adminModals/AccountSettings";

function Main() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <main className="w-full h-full p-2">
      <Header onOpenAccountModal={() => setIsModalOpen(true)}/>
      <BreadCrumb  text2="Dashbboard" />
      <div className="h-95">
        <Metrix />
        <div className="w-full h-full flex flex-row gap-2">
          <DashboardGraph />
          <AttendancePreview
          />
        </div>
      </div>
      {isModalOpen && (
        <AccountSettings onClose={() => setIsModalOpen(false)} />
      )}
    </main>
  );
}

export default Main;
