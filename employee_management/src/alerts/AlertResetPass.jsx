import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CiCircleCheck } from "react-icons/ci";

function AlertPassReset({ message, color }) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setShow(true); // trigger enter animation
    const timer = setTimeout(() => {
       // start exit animation
      setTimeout(() => setShow(false), 300); // navigate after fade out
    }, 2000); // 2s visible, then fade out

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className={`fixed top-5 z-50 px-4 py-3 rounded border shadow-lg flex items-center gap-3
         ${color} text-gray-800 text-sm transition-all duration-300 ease-in-out
        ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
    >
     
      <p className="flex items-center gap-1">{message}</p>
    </div>
  );
}

export default AlertPassReset;
