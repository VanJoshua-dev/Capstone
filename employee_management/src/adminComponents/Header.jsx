import React, { useState, useRef, useEffect } from "react";
import Clock from "./Clock";
import { IoMdArrowDropdown } from "react-icons/io";
import {useNavigate} from "react-router-dom"


const ProfileDropdown = ({ openModal }) => {//open is for the modal component
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

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

  //handle logout
  const handleLogout = () => {
    navigate("")
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          className="w-11 rounded-full border-2 border-gray-600"
          src="https://scontent.fmnl17-4.fna.fbcdn.net/v/t39.30808-1/480141013_1303731504235485_4806800328640235397_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=105&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeFvtvRC20KXp_ygz9OeAUGE5sE_rsIdLMfmwT-uwh0sx2dKm0u909IO9nwyqKrhF3mg9TSPl3-DxMJAWw2dR-49&_nc_ohc=Ih6AL-DZKpgQ7kNvwFyRRKU&_nc_oc=Adk6Ww0ne3ByP0vTV0xxwViRiFtn25rnhXFDuTFfAJPdZfPQ9RuqsOPsSfKxtQPViqI&_nc_zt=24&_nc_ht=scontent.fmnl17-4.fna&_nc_gid=8TRfcslsP_GuW-HzCAx_ZQ&oh=00_AfOdDzMKsJ6AYwJrv0UVpJ4DyMIbcHL10VevfM7umcvvfA&oe=685D9216"
          alt="Meinard"
        />
        <span className="text-lg font-semibold">ImVan</span>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg  z-10">
          <ul className="text-sm text-gray-700">
             <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                openModal(); // This triggers modal from parent
                setIsOpen(false);
              }}
            >
              My Account
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
};

function Header({ onOpenAccountModal }) {
  return (
    <header className="bg-white py-2 px-5 mb-2 flex flex-row justify-between items-center">
      <div>
        <h1 className="text-2xl">Admin Panel</h1>
          <Clock />
      </div>

        <ProfileDropdown openModal={onOpenAccountModal}/>
      
    </header>
  );
}

export default Header;
