import { useState } from 'react'
import './App.css'
import  {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
//pages
import Login from './otherPages/Login';
import AdminDashboard from './adminPages/AdminDashboard';
import ManageStaff from './adminPages/ManageStaff';
import Attendance from './adminPages/Attendance';
import ManageEvents from './adminPages/ManageEvents';
import GenerateReports from './adminPages/GenerateReports';
function App() {
 

  return (
    <>
     <Routes>
          {/* Login page */}
          <Route path="/" element={<Login />} />

          {/* admin-dashboard */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/manage-staff" element={<ManageStaff />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/manage-events" element={<ManageEvents />} />
          <Route path="/generate-reports" element={<GenerateReports />} />
        </Routes>
    </>
  )
}

export default App
