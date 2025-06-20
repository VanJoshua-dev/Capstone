import React, { useState } from "react";
import Sidebar from "../adminComponents/Sidebar";
import Header from "../adminComponents/Header";
import BreadCrumb from "../adminComponents/BreadCrumb";
import clx from "clsx";
import AccountSettings from "../adminModals/AccountSettings";
function ActivityLogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const activityLogs = [
    {
      id: 1,
      timestamp: "2025-06-12 09:01:23",
      user: "admin@site.com",
      role: "Admin",
      action: "Logged in",
      target: "N/A",
      status: "Success",
      ip: "192.168.1.2",
    },
    {
      id: 2,
      timestamp: "2025-06-12 09:03:45",
      user: "admin@site.com",
      role: "Admin",
      action: "Created event",
      target: "Event: Sample event",
      status: "Success",
      ip: "192.168.1.2",
    },
    {
      id: 3,
      timestamp: "2025-06-12 09:07:10",
      user: "staff1@site.com",
      role: "Staff",
      action: "Time-In",
      target: "Event: Sample event",
      status: "Success",
      ip: "192.168.1.10",
    },
    {
      id: 4,
      timestamp: "2025-06-12 09:09:02",
      user: "staff2@site.com",
      role: "Staff",
      action: "Time-In late",
      target: "Event: Sample event",
      status: "Warning",
      ip: "192.168.1.11",
    },
    {
      id: 5,
      timestamp: "2025-06-12 09:30:18",
      user: "admin@site.com",
      role: "Admin",
      action: "Edited event",
      target: "Event: Sample event",
      status: "Success",
      ip: "192.168.1.2",
    },
    {
      id: 6,
      timestamp: "2025-06-11 17:15:44",
      user: "user1@mail.com",
      role: "User",
      action: "Logged in",
      target: "N/A",
      status: "Success",
      ip: "172.16.5.24",
    },
    {
      id: 7,
      timestamp: "2025-06-11 17:17:00",
      user: "admin@site.com",
      role: "Admin",
      action: "Updated profile",
      target: "User: admin@site.com",
      status: "Success",
      ip: "172.16.5.24",
    },
    {
      id: 8,
      timestamp: "2025-06-11 17:25:39",
      user: "user2@mail.com",
      role: "User",
      action: "Login attempt",
      target: "N/A",
      status: "Failed",
      ip: "172.16.5.30",
    },
    {
      id: 9,
      timestamp: "2025-06-11 18:00:12",
      user: "admin@site.com",
      role: "Admin",
      action: "Deleted staff",
      target: "Staff: Robert Dela Cruz",
      status: "Success",
      ip: "192.168.1.2",
    },
    {
      id: 11,
      timestamp: "2025-06-10 14:30:03",
      user: "admin@site.com",
      role: "Admin",
      action: "Exported PDF",
      target: "Report: May Activities",
      status: "Success",
      ip: "192.168.1.2",
    },
    {
      id: 12,
      timestamp: "2025-06-10 15:00:00",
      user: "user3@mail.com",
      role: "User",
      action: "Logged out",
      target: "N/A",
      status: "Success",
      ip: "172.16.5.33",
    },
    {
      id: 14,
      timestamp: "2025-06-08 16:25:16",
      user: "admin@site.com",
      role: "Admin",
      action: "Assigned staff",
      target: "Event: Sample event",
      status: "Success",
      ip: "192.168.1.2",
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setFilter(searchTerm.toLowerCase());
    setCurrentPage(1); // Reset to first page on new search
  };

  const filteredLogs = activityLogs.filter((logs) => {
    const matchesSearch = logs.user.toLowerCase().includes(filter);
    const matchesStatus = statusFilter === "all" || logs.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const totalItems = filteredLogs.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredLogs.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

   //account settings
    const [showSetting, setShowSetting] = useState(false)
  return (
    <div className="bg-[#E9EDF8] w-screen h-screen flex flex-row overflow-hidden">
      <Sidebar />
      <main className="w-full h-full p-2">
        <Header onOpenAccountModal={() => setShowSetting(true)}/>
        <BreadCrumb text2="Activity Logs" />
        <div className="mb-1 flex justify-between items-center">
          <form onSubmit={handleSearch} className="flex gap-1">
            <input
              type="text"
              placeholder="Search by staff name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-1 border rounded w-64 shadow-sm"
            />
            <button
              type="submit"
              className="px-3 py-1 bg-blue-600 text-white hover:bg-blue-700 rounded"
            >
              Search
            </button>
          </form>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1); // Reset to first page on filter change
            }}
            className="px-3 py-1 border rounded shadow-sm"
          >
            <option value="all">All Statuses</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        {/* Requests Table */}
        <div className="rounded overflow-y-auto max-h-[500px]">
          <table className="min-w-full border-collapse text-left border-gray-200">
            <thead className="bg-white">
              <tr>
                <th className="px-4 py-2 font-semibold ">Time Stamp</th>
                {/* <th className="px-4 py-2 font-semibold">Avatar</th> */}
                <th className="px-4 py-2 font-semibold ">Username</th>
                <th className="px-4 py-2 font-semibold ">Role</th>
                <th className="px-4 py-2 font-semibold ">Action</th>
                <th className="px-4 py-2 font-semibold ">Target</th>
                <th className="px-4 py-2 font-semibold ">Status</th>
                <th className="px-4 py-2 font-semibold ">IP</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((logs) => (
                <tr key={logs.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{logs.timestamp}</td>
                  <td className="px-4 py-2">{logs.user}</td>
                  <td className="px-4 py-2">{logs.role}</td>
                  <td className="px-4 py-2">{logs.action}</td>
                  <td className="px-4 py-2">{logs.target}</td>
                  <td className="px-4 py-2">
                    <span
                      title={
                        logs.status === "Success"
                          ? "Success"
                          : "Failed"
                      }
                      className={clx(
                        "py-1 w-full px-4 rounded inline-block text-center",
                        logs.status === "Success"
                          ? "bg-green-300"
                          : logs.status === "Warning" ? "bg-yellow-300" : "bg-red-300"
                      )}
                    >
                      {logs.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{logs.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="mt-2 flex justify-between items-center p-1">
          <p className="text-sm text-gray-700">
            Showing {startIndex + 1}–
            {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems}
          </p>
          <div className="space-x-2">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${
                currentPage === 1
                  ? "bg-blue-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              Prev
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${
                currentPage === totalPages
                  ? "bg-blue-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </main>
      {showSetting && (
        <AccountSettings onClose={() => setShowSetting(false)}/>
      )}
    </div>
  );
}

export default ActivityLogs;
