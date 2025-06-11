import React, { useState } from "react";

function AttendancePreview() {
  const attendanceData = [
    { name: "Iam Van", status: "Time In", time: "8:04:10 AM", isLate: true },
    { name: "Iam Van", status: "Time Out", time: "5:05:22 PM" },
    { name: "Jane Doe", status: "Time In", time: "7:55:32 AM", isLate: false },
    { name: "Jane Doe", status: "Time Out", time: "4:59:45 PM" },
    { name: "Alex Ray", status: "Time In", time: "8:30:00 AM", isLate: true },
    { name: "Alex Ray", status: "Time Out", time: "6:00:00 PM" },
  ];

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredData = attendanceData.filter((record) => {
    const matchesStatus = statusFilter === "All" || record.status === statusFilter;
    const matchesSearch = record.name.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="w-full h-full shadow bg-blue-50 flex flex-col overflow-hidden">
      {/* Sticky Header */}
      <header className="sticky flex items-center top-0 z-10 bg-white border-b border-gray-200">
        <div className="p-4">
          <h1 className="text-2xl font-semibold">Attendance</h1>
        </div>
        {/* Filter Bar */}
        <div className=" flex flex-col md:flex-row items-center gap-2 md:gap-4">
          <input
            type="text"
            placeholder="Search name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm w-full md:w-1/2"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm w-full md:w-1/2"
          >
            <option value="All">All Status</option>
            <option value="Time In">Time In</option>
            <option value="Time Out">Time Out</option>
          </select>
        </div>
      </header>

      {/* Scrollable List */}
      <div className="overflow-y-auto flex-1">
        {filteredData.length === 0 ? (
          <p className="text-center p-6 text-gray-500">No records found.</p>
        ) : (
          filteredData.map((record, index) => (
            <div
              key={index}
              className="w-full flex flex-col md:flex-row md:items-center justify-between gap-2 px-4 py-3 border-b border-gray-100 bg-white hover:bg-gray-50 transition"
            >
              <div>
                <p className="text-sm text-gray-400">Name:</p>
                <h1 className="font-medium">{record.name}</h1>
              </div>

              <div>
                <p className="text-sm text-gray-400">Status:</p>
                <span
                  className={`font-semibold ${
                    record.status === "Time Out" ? "text-red-400" : "text-green-500"
                  }`}
                >
                  {record.status}
                </span>
              </div>

              <div>
                <p className="text-sm text-gray-400">Time:</p>
                <span>{record.time}</span>
              </div>

              {record.status === "Time In" && (
                <div>
                  <p className="text-sm text-gray-400">Remark:</p>
                  <span
                    className={
                      record.isLate
                        ? "text-yellow-500 font-medium"
                        : "text-green-600 font-medium"
                    }
                  >
                    {record.isLate ? "Late" : "On Time"}
                  </span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AttendancePreview;
