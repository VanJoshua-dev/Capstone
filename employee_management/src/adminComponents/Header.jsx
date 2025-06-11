import React, { useState, useRef, useEffect } from "react";
import Clock from "./Clock";
import { IoMdArrowDropdown } from "react-icons/io";



const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          className="w-12 rounded-full border-2 border-gray-600"
          src="https://scontent.fmnl17-3.fna.fbcdn.net/v/t39.30808-1/270149507_109076721648494_4282075989312972371_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=103&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeFmH5kBvP0PBFV67owYe7yFjwZd4hvNVLCPBl3iG81UsKFeeibudOpiRzzReFkF4-EA3o-ayhmgoaKlDp6zIhyD&_nc_ohc=vBHFUWTmzO8Q7kNvwFP-fjE&_nc_oc=AdmespsDy422oyT2J18MEHS3wwbutuOV2TY1FeTBrr8bD4orwHb5nbAE9KQn3u920ZY&_nc_zt=24&_nc_ht=scontent.fmnl17-3.fna&_nc_gid=OxebAImtmAlnXka6klyetw&oh=00_AfO5VTub_ypawTGHzrp_HlZ5pQtEK-9Z0BKbjDn3zlfJlw&oe=684DE0AA"
          alt="Meinard"
        />
        <span className="text-lg font-semibold">ImVan</span>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg  z-10">
          <ul className="text-sm text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">My Account</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
};

function Header() {
  return (
    <header className="bg-white py-2 px-5 mb-2 flex flex-row justify-between items-center">
      <div>
        <h1 className="text-2xl">Admin Panel</h1>
          <Clock />
      </div>

        <ProfileDropdown />
      
    </header>
  );
}

export default Header;
