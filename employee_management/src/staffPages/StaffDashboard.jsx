import React, { useState, useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};
const StaffDashboard = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaveForm, setLeaveForm] = useState({ date: "", reason: "" });

  //Set first name
  const [firstName, setFirstName] = useState("");
  useEffect(() => {
    const storedName = sessionStorage.getItem("fname");
    if (storedName) {
      setFirstName(storedName);
    }
  }, []);
  const navigate = useNavigate();
  const assignedEvents = [
    {
      id: 1,
      name: "Birthday - Jessa's 18th",
      date: "2025-06-15",
      time: "4:00 PM",
    },
    {
      id: 2,
      name: "Wedding - Lucas & Claire",
      date: "2025-06-20",
      time: "3:00 PM",
    },
  ];

  const attendance = { event: 5, late: 1, absent: 0 };

  const activityLogs = [
    {
      id: 1,
      action: "Time-In",
      event: "Birthday - Jessa's 18th",
      date: "2025-06-10 09:00 AM",
    },
    {
      id: 2,
      action: "Time-Out",
      event: "Birthday - Jessa's 18th",
      date: "2025-06-10 5:00 PM",
    },
    {
      id: 3,
      action: "Requested Leave",
      event: "N/A",
      date: "2025-06-08 10:12 AM",
    },
  ];
  // Start QR scanner ;>
  useEffect(() => {
    let html5QrCode;

    if (showScanner) {
      const qrRegionId = "qr-reader";

      // Reset instance
      Html5Qrcode.getCameras()
        .then(() => {
          html5QrCode = new Html5Qrcode(qrRegionId);
          return html5QrCode.start(
            { facingMode: "environment" },
            { fps: 10, qrbox: 250 },
            (decodedText) => {
              alert(`Scanned: ${decodedText}`);
              html5QrCode.stop().then(() => {
                html5QrCode.clear();
              });
              setShowScanner(false);
            },
            (errorMessage) => {
              console.warn("QR scan error:", errorMessage);
            }
          );
        })
        .catch((err) => {
          console.error("QR scanner init failed", err);
        });
    }

    return () => {
      if (html5QrCode && html5QrCode.getState() === 2) {
        html5QrCode
          .stop()
          .then(() => html5QrCode.clear())
          .catch(() => {});
      }
    };
  }, [showScanner]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    alert(`Leave Requested: ${leaveForm.date} - ${leaveForm.reason}`);
    setLeaveForm({ date: "", reason: "" });
    setShowLeaveModal(false);
  };

  return (
    <div className="bg-[#E9EDF8] w-full h-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 bg-[#0A1727] px-4 py-3 rounded-md">
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold text-gray-200">
            {firstName ? <p>Logged in as {firstName}</p> : <p>Not logged in</p>}
          </span>
        </div>
        <div className="flex gap-2 justify-center sm:justify-end">
          <button
            onClick={() => setShowScanner(true)}
            className="bg-green-600 text-white hover:bg-green-700 px-4 py-1.5 text-sm rounded"
          >
            QR Scanner
          </button>
          <button
            onClick={() => setShowLeaveModal(true)}
            className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-1.5 text-sm rounded"
          >
            Request Leave
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white hover:bg-red-700 px-4 py-1.5 text-sm rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {showScanner && (
        <div className="fixed inset-0 w-full  h-full backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded p-4 w-full max-w-md relative shadow">
            <h2 className="text-lg font-semibold mb-2 text-center">
              Scan QR Code
            </h2>
            <div id="qr-reader" className="w-full" />
            <button
              className="mt-4 w-full bg-red-500 text-white py-2 rounded"
              onClick={() => setShowScanner(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {showLeaveModal && (
        <div className="fixed inset-0 backdrop-blur-md h-full w-full bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded p-4 w-full max-w-md shadow">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Leave Request
            </h2>
            <form onSubmit={handleLeaveSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Date</label>
                <input
                  type="date"
                  value={leaveForm.date}
                  onChange={(e) =>
                    setLeaveForm({ ...leaveForm, date: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Reason</label>
                <textarea
                  value={leaveForm.reason}
                  onChange={(e) =>
                    setLeaveForm({ ...leaveForm, reason: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded"
              >
                Submit Request
              </button>
              <button
                type="button"
                className="w-full bg-gray-300 text-black py-2 rounded"
                onClick={() => setShowLeaveModal(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold mb-2">Assigned Events</h2>
        <div className="space-y-3">
          {assignedEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white p-3 rounded shadow text-sm sm:text-base"
            >
              <div className="font-medium">{event.name}</div>
              <div className="text-gray-600">
                {event.date} at {event.time}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Attendance</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-sm sm:text-base">
          <div className="bg-green-100 p-3 rounded">
            Events: <strong>{attendance.event}</strong>
          </div>
          <div className="bg-yellow-100 p-3 rounded">
            Late: <strong>{attendance.late}</strong>
          </div>
          <div className="bg-red-100 p-3 rounded">
            Absent: <strong>{attendance.absent}</strong>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">My Activity Logs</h2>
        <div className="space-y-3">
          {activityLogs.map((log) => (
            <div
              key={log.id}
              className="bg-gray-100 p-3 rounded text-sm sm:text-base"
            >
              <div>
                <strong>{log.action}</strong>
              </div>
              <div className="text-gray-600">{log.event}</div>
              <div className="text-gray-500 text-xs">{log.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
