import React from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
function BreadCrumb(props) {
    const navigate = useNavigate()
  return (
    <div className='flex flex-row gap-1 items-center '>
     <p
     onClick={() => navigate("/admin-dashboard")}
     className='hover:underline hover:text-blue-500 cursor-pointer text-md'>Dashboard</p>
     <p className='text-xl'>»</p>
     <p className='text-md'>{props.text2}</p>
    </div>
  )
}

export default BreadCrumb
