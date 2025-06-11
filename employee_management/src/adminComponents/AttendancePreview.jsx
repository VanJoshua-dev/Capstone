import React, { useState } from "react";

function AttendancePreview() {
  const attendanceData = [
    { name: "Iam Van", status: "Time In", time: "8:04:10 AM", isLate: true },
    { name: "Iam Van", status: "Time Out", time: "5:05:22 PM" },
    { name: "Jane Doe", status: "Time In", time: "7:55:32 AM", isLate: false },
    { name: "Jane Doe", status: "Time Out", time: "4:59:45 PM" },
    { name: "Alex Ray", status: "Time In", time: "8:30:00 AM", isLate: true },
    { name: "Alex Ray", status: "Time Out", time: "6:00:00 PM" },
    { name: "Alex Ray", status: "Time Out", time: "6:00:00 PM" },
    { name: "Alex Ray", status: "Time Out", time: "6:00:00 PM" },
  ];

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredData = attendanceData.filter((record) => {
    const matchesStatus =
      statusFilter === "All" || record.status === statusFilter;
    const matchesSearch = record.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="w-full h-full bg-blue-50 flex flex-col overflow-hidden">
      {/* Sticky Header with Filter */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
        <h1 className="text-2xl font-semibold mb-3">Attendance</h1>
        <div className="flex flex-col md:flex-row gap-3 md:items-center">
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

      {/* Table */}
      <div className="overflow-hidden">
        {filteredData.length === 0 ? (
          <p className="text-center text-gray-500">No records found.</p>
        ) : (
          <div className="border border-gray-300 shadow overflow-hidden">
            <table className="min-w-full table-fixed">
              <thead className="bg-gray-100 block w-full">
                <tr className="w-full flex">
                  <th className="w-1/4 px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Name
                  </th>
                  <th className="w-1/4 px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Status
                  </th>
                  <th className="w-1/4 px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Time
                  </th>
                  <th className="w-1/4 px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Remark
                  </th>
                </tr>
              </thead>

              <tbody
                className="block max-h-64 overflow-y-auto w-full"
                style={{ maxHeight: "300px" }}
              >
                {filteredData.map((record, index) => (
                  <tr
                    key={index}
                    className="flex w-full border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="w-1/4 px-4 py-2">{record.name}</td>
                    <td
                      className={`w-1/4 px-4 py-2 font-semibold ${
                        record.status === "Time Out"
                          ? "text-red-400"
                          : "text-green-500"
                      }`}
                    >
                      {record.status}
                    </td>
                    <td className="w-1/4 px-4 py-2">{record.time}</td>
                    <td className="w-1/4 px-4 py-2">
                      {record.status === "Time In" ? (
                        <span
                          className={
                            record.isLate
                              ? "text-yellow-500 font-medium"
                              : "text-green-600 font-medium"
                          }
                        >
                          {record.isLate ? "Late" : "On Time"}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AttendancePreview;
