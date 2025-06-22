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
import AssignStaff from './otherPages/AssignStaff';
import AssignStaffUI from './otherPages/AssignStaff';
import ForgotPass from './otherPages/ForgotPass';
import VerifyCode from './otherPages/VerifyCode';
import ResetPass from './otherPages/ResetPass';
import LoginVerificaton from './otherPages/LoginVerification';
import NotFound from './pageError/NotFound';
function App() {
 

  return (
    <>
     <Routes>
          {/* Login page */}
          <Route path="/" element={<Login />} />
          {/* Forgot Password page */}
          <Route path="/forgot-password" element={<ForgotPass />} />
           {/* Verify Code page */}
          <Route path="/verify-code" element={<VerifyCode />} />
          {/* Reset Password page */}
          <Route path="/reset-password" element={<ResetPass />} />
           {/* Login Verification page */}
          <Route path="/verify-login" element={<LoginVerificaton />} />


          {/* admin-dashboard */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/manage-staff" element={<ManageStaff />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/manage-events" element={<ManageEvents />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/leave-requests" element={<LeaveRequests />} />
          <Route path="/activity-logs" element={<ActivityLogs />} />
          <Route path="/assign-staff" element={<AssignStaffUI />} />
          {/* staff-dashboard */}
          <Route path="/staff-dashboard" element={<StaffDashboard />} />

          <Route path="*" element={<NotFound />} />
          
        </Routes>
    </>
  )
}

export default App
