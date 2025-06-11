import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import logo from '../assets/mdvLogo.png'

//icons
import { MdSpaceDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { FaCalendarCheck } from "react-icons/fa";
import { FaCalendarDay } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
function Sidebar() {
    const location = useLocation()
    const navigate = useNavigate()
    const tabs = [
        {icon: <MdSpaceDashboard /> ,label: "Dashboard", link: "/admin-dashboard"},
        {icon: <FaUsers /> ,label: "Manage Staff", link: "/manage-staff"},
        {icon: <FaCalendarCheck /> ,label: "Attendance", link: "/attendance"},
        {icon: <FaCalendarDay />,label: "Manage Events", link: "/manage-events"},
        {icon: <FaClipboardList /> ,label: "Generate Reports", link: "/generate-reports"},
    ]
  return (
    <aside className='h-full w-75 p-2 bg-[#0A1727]'>
        <header className='py-2 px-2 flex flex-col mb-5 justify-center items-center border-b-2 border-gray-200'>
            <img src={logo} alt="" className='rounded-full h-20' />
           <h1 className='text-md text-center font-semibold text-white'>MDV Inflate-N-Play Rentals</h1>
        </header>
       <div className='w-full'>
            <ul className='w-full h-128 flex flex-col gap-1 px-5 py-5'>
                {tabs.map((tab, index) => (
                    <li
                    key={index}
                    onClick={() => navigate(tab.link)}
                    className={clsx('text-white flex flex-row gap-2 items-center text-lg py-2 px-2 cursor-pointer hover:bg-gray-800', location.pathname === tab.link && "bg-gray-800")} 
                    >
                        {tab.icon} 
                        {tab.label}
                    </li>
                ))}
                
            </ul>
      </div>
    </aside>
  )
}

export default Sidebar
