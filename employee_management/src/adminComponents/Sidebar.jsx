import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import logo from "../assets/mdvLogo.png";

//icons
import { MdSpaceDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { FaCalendarCheck } from "react-icons/fa";
import { FaCalendarDay } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const defaultTab = [
    {
      icon: <MdSpaceDashboard size={20} />,
      label: "Dashboard",
      link: "/admin-dashboard",
    },
  ];
  const section1 = [
    {
      icon: <FaUsers size={20} />,
      label: "Manage Staff",
      link: "/manage-staff",
    },
    {
      icon: <FaCalendarDay size={20} />,
      label: "Manage Events",
      link: "/manage-events",
    },
  ];
  const section2 = [
    {
      icon: <FaCalendarCheck size={20} />,
      label: "Attendance Records",
      link: "/attendance",
    },
    {
      icon: <FaFileAlt size={20} /> ,
      label: "Leave Requests",
      link: "/leave-requests",
    },
  ];
  const section3 = [
    {
      icon: <FaClipboardList size={20} />,
      label: "Reports",
      link: "/reports",
    },
    {
      icon: <FaHistory size={20}/>,
      label: "Acivity Logs",
      link: "/activity-logs",
    },
  ];
  return (
    <aside className="h-full w-75 p-2 bg-[#0A1727]">
      <header className="py-2 px-2 flex flex-col mb-5 justify-center items-center border-b-2 border-gray-200">
        <img src={logo} alt="" className="rounded-full h-20" />
        <h1 className="text-md text-center font-semibold text-white">
          MDV Inflate-N-Play Rentals
        </h1>
      </header>
      <div className="w-full">
        <ul className="w-full h-128 flex flex-col gap-1 px-5 py-5">
          {defaultTab.map((tab, index) => (
            <li
              key={index}
              onClick={() => navigate(tab.link)}
              className={clsx(
                "text-white flex flex-row gap-2 items-center text-md py-2 px-2 cursor-pointer hover:bg-gray-800",
                location.pathname === tab.link && "bg-gray-800"
              )}
            >
              {tab.icon}
              {tab.label}
            </li>
          ))}
          <h1 className="text-white text-xl font-bold ">Management</h1>
          {section1.map((tab, index) => (
            <li
              key={index}
              onClick={() => navigate(tab.link)}
              className={clsx(
                "text-white flex flex-row gap-2 items-center text-md py-2 px-2 cursor-pointer hover:bg-gray-800",
                location.pathname === tab.link && "bg-gray-800"
              )}
            >
              {tab.icon}
              {tab.label}
            </li>
          ))}
          <h1 className="text-white text-xl font-bold ">Attendance</h1>
          {section2.map((tab, index) => (
            <li
              key={index}
              onClick={() => navigate(tab.link)}
              className={clsx(
                "text-white flex flex-row gap-2 items-center text-md py-2 px-2 cursor-pointer hover:bg-gray-800",
                location.pathname === tab.link && "bg-gray-800"
              )}
            >
              {tab.icon}
              {tab.label}
            </li>
          ))}
          <h1 className="text-white text-xl font-bold ">Reports</h1>
          {section3.map((tab, index) => (
            <li
              key={index}
              onClick={() => navigate(tab.link)}
              className={clsx(
                "text-white flex flex-row gap-2 items-center text-md py-2 px-2 cursor-pointer hover:bg-gray-800",
                location.pathname === tab.link && "bg-gray-800"
              )}
            >
              {tab.icon}
              {tab.label}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
