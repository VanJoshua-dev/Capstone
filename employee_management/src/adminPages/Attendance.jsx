import React, { useState } from "react";
import Header from "../adminComponents/Header";
import BreadCrumb from "../adminComponents/BreadCrumb";
import Sidebar from "../adminComponents/Sidebar";
import clx from "clsx";
import AccountSettings from "../adminModals/AccountSettings";

function AttendancePage() {
  const allAttendance = [
    {
      id: "001",
      date: "June 10",
      name: "Jane Doe",
      event: "Birthday",
      timeIn: "7:55 AM",
      timeOut: "5:00 PM",
      status: "Present",
      remark: "On Time",
    },
    {
      id: "002",
      date: "June 10",
      name: "Alex Ray",
      event: "Sample Event1",
      timeIn: "8:30 AM",
      timeOut: "6:00 PM",
      status: "Present",
      remark: "Late",
    },
    {
      id: "003",
      date: "June 9",
      name: "Jane Doe",
      event: "Sample event2",
      timeIn: "",
      timeOut: "",
      status: "Absent",
      remark: "",
    },
  ];

  const [filters, setFilters] = useState({
    name: "",
    status: "",
    event: "",
    date: "",
  });
  const [showFiltered, setShowFiltered] = useState(false);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    setShowFiltered(true);
    setCurrentPage(1);
  };

  const handleNameSearch = () => {
    setShowFiltered(true);
    setCurrentPage(1);
  };

  const displayRecords = showFiltered
    ? allAttendance.filter((rec) => {
        const nameMatch = rec.name.toLowerCase().includes(filters.name.toLowerCase());
        const statusMatch = filters.status ? rec.status === filters.status : true;
        const eventMatch = rec.event.toLowerCase().includes(filters.event.toLowerCase());
        const dateMatch = filters.date ? rec.date === filters.date : true;
        return nameMatch && statusMatch && eventMatch && dateMatch;
      })
    : allAttendance;

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const paginatedRecords = displayRecords.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );
  const totalPages = Math.ceil(displayRecords.length / recordsPerPage);

  const [showSetting, setShowSetting] = useState(false);

  return (
    <div className="bg-[#E9EDF8] w-screen h-screen flex flex-row overflow-hidden">
      <Sidebar />
      <main className="w-full h-full p-2">
        <Header onOpenAccountModal={() => setShowSetting(true)} />
        <BreadCrumb text2="Attendance Records" />

        {/* Filters */}
        <form className="flex flex-wrap justify-between items-center mb-1 gap-2">
          <div className="flex gap-1">
            <input
              name="name"
              type="text"
              placeholder="Search by name..."
              value={filters.name}
              onChange={handleFilterChange}
              className="px-4 py-1 border rounded w-64 shadow-sm"
            />
            <button
              type="button"
              title="Search by name"
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={handleNameSearch}
            >
              Search
            </button>
          </div>
          <div className="flex flex-row gap-1">
            <input
              name="date"
              type="text"
              placeholder="Filter by date (e.g. June 10)"
              value={filters.date}
              onChange={handleFilterChange}
              className="px-4 py-1 border rounded w-52 shadow-sm"
            />
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="px-4 py-1 border rounded w-52 shadow-sm"
            >
              <option value="">All Status</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
            <input
              name="event"
              type="text"
              placeholder="Filter by event"
              value={filters.event}
              onChange={handleFilterChange}
              className="px-4 py-1 border rounded w-52 shadow-sm"
            />
          </div>
        </form>

        {/* Table */}
        <div className="rounded overflow-y-auto max-h-[490px] h-full">
          <table className="min-w-full border-collapse text-left border-gray-200">
            <thead className="bg-white">
              <tr>
                <th className="px-4 py-2 font-semibold">Attd. ID</th>
                <th className="px-4 py-2 font-semibold">Date</th>
                <th className="px-4 py-2 font-semibold">Staff Name</th>
                <th className="px-4 py-2 font-semibold">Event</th>
                <th className="px-4 py-2 font-semibold">Time In</th>
                <th className="px-4 py-2 font-semibold">Time Out</th>
                <th className="px-4 py-2 font-semibold">Status</th>
                <th className="px-4 py-2 font-semibold">Remark</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRecords.length > 0 ? (
                paginatedRecords.map((att, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{att.id}</td>
                    <td className="px-4 py-2">{att.date}</td>
                    <td className="px-4 py-2">{att.name}</td>
                    <td className="px-4 py-2">{att.event}</td>
                    <td className="px-4 py-2">{att.timeIn || "—"}</td>
                    <td className="px-4 py-2">{att.timeOut || "—"}</td>
                    <td className="px-4 py-2">
                      <span
                        className={clx(
                          "py-1 w-full inline-block px-4 rounded text-center",
                          att.status === "Present" ? "bg-green-300" : "bg-red-300"
                        )}
                      >
                        {att.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={clx(
                          "py-1 px-4 w-full inline-block text-center rounded",
                          att.remark === "On Time"
                            ? "bg-green-300"
                            : att.remark === "Late"
                            ? "bg-amber-300"
                            : ""
                        )}
                      >
                        {att.remark || "—"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-4">
                    No attendance records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="mt-2 flex justify-between items-center p-1">
          <p className="text-sm">
            Showing{" "}
            {Math.min((currentPage - 1) * recordsPerPage + 1, displayRecords.length)}
            –
            {Math.min(currentPage * recordsPerPage, displayRecords.length)} of{" "}
            {displayRecords.length}
          </p>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-blue-400 disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <button
              className="px-4 py-2 bg-blue-400 disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </main>
      {showSetting && <AccountSettings onClose={() => setShowSetting(false)} />}
    </div>
  );
}

export default AttendancePage;
