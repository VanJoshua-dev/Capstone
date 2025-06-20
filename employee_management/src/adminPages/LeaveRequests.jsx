import React, { useState } from "react";
import Sidebar from "../adminComponents/Sidebar";
import Header from "../adminComponents/Header";
import BreadCrumb from "../adminComponents/BreadCrumb";
import clx from "clsx";
import AccountSettings from "../adminModals/AccountSettings";

function LeaveRequests() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const leaveRequests = [
    {
      reqID: 1,
      staffAvatar: "https://i.pravatar.cc/150?img=1",
      staffName: "Alyssa Santos",
      startDate: "2025-06-10",
      endDate: "2025-06-12",
      leaveType: "Vacation Leave",
      reason: "Family trip to Baguio",
      dateRequested: "2025-06-01",
      status: "approved",
    },
    {
      reqID: 2,
      staffAvatar: "https://i.pravatar.cc/150?img=2",
      staffName: "Daniel Reyes",
      startDate: "2025-06-15",
      endDate: "2025-06-16",
      leaveType: "Sick Leave",
      reason: "Flu and fever",
      dateRequested: "2025-06-03",
      status: "pending",
    },
    {
      reqID: 3,
      staffAvatar: "https://i.pravatar.cc/150?img=3",
      staffName: "Kyla Mendoza",
      startDate: "2025-06-20",
      endDate: "2025-06-24",
      leaveType: "Vacation Leave",
      reason: "Travel with family",
      dateRequested: "2025-06-04",
      status: "approved",
    },
    {
      reqID: 4,
      staffAvatar: "https://i.pravatar.cc/150?img=4",
      staffName: "Miguel Dela Cruz",
      startDate: "2025-06-11",
      endDate: "2025-06-11",
      leaveType: "Emergency Leave",
      reason: "Power outage at home",
      dateRequested: "2025-06-05",
      status: "rejected",
    },
    {
      reqID: 5,
      staffAvatar: "https://i.pravatar.cc/150?img=5",
      staffName: "Jasmine Lee",
      startDate: "2025-06-18",
      endDate: "2025-06-19",
      leaveType: "Personal Leave",
      reason: "Mental health break",
      dateRequested: "2025-06-06",
      status: "pending",
    },
    {
      reqID: 6,
      staffAvatar: "https://i.pravatar.cc/150?img=6",
      staffName: "Enzo Garcia",
      startDate: "2025-06-22",
      endDate: "2025-06-25",
      leaveType: "Vacation Leave",
      reason: "Visit relatives in Cebu",
      dateRequested: "2025-06-07",
      status: "approved",
    },
    {
      reqID: 7,
      staffAvatar: "https://i.pravatar.cc/150?img=7",
      staffName: "Faith Navarro",
      startDate: "2025-06-09",
      endDate: "2025-06-09",
      leaveType: "Sick Leave",
      reason: "Migraine",
      dateRequested: "2025-06-02",
      status: "approved",
    },
    {
      reqID: 8,
      staffAvatar: "https://i.pravatar.cc/150?img=8",
      staffName: "Josh Lim",
      startDate: "2025-06-14",
      endDate: "2025-06-14",
      leaveType: "Emergency Leave",
      reason: "Car accident involving relative",
      dateRequested: "2025-06-08",
      status: "pending",
    },
    {
      reqID: 9,
      staffAvatar: "https://i.pravatar.cc/150?img=9",
      staffName: "Celine Ramos",
      startDate: "2025-06-13",
      endDate: "2025-06-14",
      leaveType: "Sick Leave",
      reason: "Dental surgery recovery",
      dateRequested: "2025-06-01",
      status: "approved",
    },
    {
      reqID: 10,
      staffAvatar: "https://i.pravatar.cc/150?img=10",
      staffName: "Leo Ferrer",
      startDate: "2025-06-27",
      endDate: "2025-06-30",
      leaveType: "Vacation Leave",
      reason: "Anniversary celebration",
      dateRequested: "2025-06-09",
      status: "pending",
    },
    {
      reqID: 11,
      staffAvatar: "https://i.pravatar.cc/150?img=11",
      staffName: "Nina Cruz",
      startDate: "2025-06-05",
      endDate: "2025-06-06",
      leaveType: "Maternity Check-up",
      reason: "Doctor’s appointment",
      dateRequested: "2025-06-01",
      status: "approved",
    },
    {
      reqID: 12,
      staffAvatar: "https://i.pravatar.cc/150?img=12",
      staffName: "Zach Uy",
      startDate: "2025-06-23",
      endDate: "2025-06-23",
      leaveType: "Sick Leave",
      reason: "Back pain treatment",
      dateRequested: "2025-06-10",
      status: "rejected",
    },
    {
      reqID: 13,
      staffAvatar: "https://i.pravatar.cc/150?img=13",
      staffName: "Joy Villanueva",
      startDate: "2025-06-26",
      endDate: "2025-06-27",
      leaveType: "Personal Leave",
      reason: "Moving house",
      dateRequested: "2025-06-11",
      status: "pending",
    },
    {
      reqID: 14,
      staffAvatar: "https://i.pravatar.cc/150?img=14",
      staffName: "Allan Go",
      startDate: "2025-06-17",
      endDate: "2025-06-18",
      leaveType: "Sick Leave",
      reason: "High fever and fatigue",
      dateRequested: "2025-06-12",
      status: "approved",
    },
    {
      reqID: 15,
      staffAvatar: "https://i.pravatar.cc/150?img=15",
      staffName: "Mira Delos Reyes",
      startDate: "2025-06-29",
      endDate: "2025-06-30",
      leaveType: "Vacation Leave",
      reason: "Beach trip with friends",
      dateRequested: "2025-06-13",
      status: "approved",
    },
    {
      reqID: 16,
      staffAvatar: "https://i.pravatar.cc/150?img=16",
      staffName: "Ivan Trinidad",
      startDate: "2025-06-08",
      endDate: "2025-06-08",
      leaveType: "Emergency Leave",
      reason: "Plumbing issue at home",
      dateRequested: "2025-06-07",
      status: "pending",
    },
    {
      reqID: 17,
      staffAvatar: "https://i.pravatar.cc/150?img=17",
      staffName: "Regine Palma",
      startDate: "2025-06-20",
      endDate: "2025-06-22",
      leaveType: "Vacation Leave",
      reason: "Attend cousin’s wedding",
      dateRequested: "2025-06-14",
      status: "approved",
    },
    {
      reqID: 18,
      staffAvatar: "https://i.pravatar.cc/150?img=18",
      staffName: "Caleb Domingo",
      startDate: "2025-06-12",
      endDate: "2025-06-13",
      leaveType: "Sick Leave",
      reason: "Food poisoning",
      dateRequested: "2025-06-10",
      status: "rejected",
    },
    {
      reqID: 19,
      staffAvatar: "https://i.pravatar.cc/150?img=19",
      staffName: "Angela Sison",
      startDate: "2025-06-15",
      endDate: "2025-06-17",
      leaveType: "Personal Leave",
      reason: "Attend leadership seminar",
      dateRequested: "2025-06-11",
      status: "pending",
    },
    {
      reqID: 20,
      staffAvatar: "https://i.pravatar.cc/150?img=20",
      staffName: "Jake Evangelista",
      startDate: "2025-06-19",
      endDate: "2025-06-20",
      leaveType: "Emergency Leave",
      reason: "Urgent family matter",
      dateRequested: "2025-06-15",
      status: "approved",
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setFilter(searchTerm.toLowerCase());
    setCurrentPage(1); // Reset to first page on new search
  };

  const filteredRequests = leaveRequests.filter((req) => {
    const matchesSearch = req.staffName.toLowerCase().includes(filter);
    const matchesStatus = statusFilter === "all" || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalItems = filteredRequests.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredRequests.slice(
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
        <BreadCrumb text2="Leave Requests" />

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
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Requests Table */}
        <div className="rounded overflow-y-auto max-h-[500px]">
          <table className="min-w-full border-collapse text-left border-gray-200">
            <thead className="bg-white">
              <tr>
                <th className="px-4 py-2 font-semibold w-30">Req. ID</th>
                {/* <th className="px-4 py-2 font-semibold">Avatar</th> */}
                <th className="px-4 py-2 font-semibold w-40">Staff Name</th>
                <th className="px-4 py-2 font-semibold w-40">Start Date</th>
                <th className="px-4 py-2 font-semibold w-40">End Date</th>
                <th className="px-4 py-2 font-semibold w-40">Leave Type</th>
                <th className="px-4 py-2 font-semibold w-40">Reason</th>
                <th className="px-4 py-2 font-semibold w-45">Date Requested</th>
                <th className="px-4 py-2 font-semibold">Status</th>
                <th className="px-4 py-2 font-semibold text-center" colSpan={2}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((req) => (
                <tr key={req.reqID} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{req.reqID}</td>
                  {/* <td className="px-4 py-2">
                    <img
                      src={req.staffAvatar}
                      alt={req.staffName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td> */}
                  <td className="px-4 py-2">{req.staffName}</td>
                  <td className="px-4 py-2">{req.startDate}</td>
                  <td className="px-4 py-2">{req.endDate}</td>
                  <td className="px-4 py-2">{req.leaveType}</td>
                  <td className="px-4 py-2">{req.reason}</td>
                  <td className="px-4 py-2">{req.dateRequested}</td>
                  <td className="px-4 py-2 capitalize">
                    <span
                      className={`px-2 w-full py-1 rounded text-white inline-block text-sm ${
                        req.status === "approved"
                          ? "bg-green-300"
                          : req.status === "pending"
                          ? "bg-yellow-300"
                          : "bg-red-300"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="px-2 py-2 text-center">
                    <select
                      name="statusSelect"
                      className={clx(
                        "px-3 py-1 rounded text-white",
                        req.status === "approved"
                          ? "bg-blue-600"
                          : req.status === "rejected"
                          ? "bg-red-600"
                          : "bg-gray-500"
                      )}
                      defaultValue={
                        req.status === "approved"
                          ? "approved"
                          : req.status === "rejected"
                          ? "rejected"
                          : ""
                      }
                    >
                      <option value="">Select</option>
                      <option
                        value="approved"
                        className="bg-blue-600 text-white"
                      >
                        Approved
                      </option>
                      <option
                        value="rejected"
                        className="bg-red-600 text-white"
                      >
                        Rejected
                      </option>
                    </select>
                  </td>
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

export default LeaveRequests;
