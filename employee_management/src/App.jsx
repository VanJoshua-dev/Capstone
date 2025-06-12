import { useState } from 'react'
import './App.css'
import  {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
//pages
import Login from './otherPages/Login';
import AdminDashboard from './adminPages/AdminDashboard';
import ManageStaff from './adminPages/ManageStaff';
import Attendance from './adminPages/Attendance';
import ManageEvents from './adminPages/ManageEvents';
import Reports from './adminPages/GenerateReports';
import LeaveRequests from './adminPages/LeaveRequests';
import ActivityLogs from './adminPages/ActivityLogs';
import StaffDashboard from './staffPages/StaffDashboard';
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
          <Route path="/reports" element={<Reports />} />
          <Route path="/leave-requests" element={<LeaveRequests />} />
          <Route path="/activity-logs" element={<ActivityLogs />} />

          {/* staff-dashboard */}
          <Route path="/staff-dashboard" element={<StaffDashboard />} />
        </Routes>
    </>
  )
}

export default App
