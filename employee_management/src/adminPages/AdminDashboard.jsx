import React from 'react'
import Sidebar from '../adminComponents/Sidebar'
import Main from '../adminComponents/Main'

function AdminDashboard() {
  return (
    <div className='bg-[#E9EDF8] w-screen h-screen flex flex-row'>
      <Sidebar />
      <Main />
    </div>
  )
}

export default AdminDashboard
