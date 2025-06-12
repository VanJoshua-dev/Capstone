import React, { useState } from "react";
import Sidebar from "../adminComponents/Sidebar";
import Header from "../adminComponents/Header";
import BreadCrumb from "../adminComponents/BreadCrumb";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const sampleReports = [
  {
    name: "Iam Van",
    eventsAssigned: 12,
    eventsAttended: 11,
    onTimePercent: 72,
    lateCount: 3,
    missedEvents: 1,
    punctualityScore: 3,
  },
  {
    name: "Jane Doe",
    eventsAssigned: 15,
    eventsAttended: 15,
    onTimePercent: 93,
    lateCount: 1,
    missedEvents: 0,
    punctualityScore: 4.5,
  },
  {
    name: "Alex Ray",
    eventsAssigned: 10,
    eventsAttended: 8,
    onTimePercent: 50,
    lateCount: 4,
    missedEvents: 2,
    punctualityScore: 2,
  },
  // Add more data for testing pagination
];
// CSV Export Utility
const exportToCSV = (data, filename = "Staff_reports.csv") => {
  const csvRows = [
    [
      "Name",
      "Events Assigned",
      "Events Attended",
      "On-Time %",
      "Late Count",
      "Missed Events",
      "Punctuality Score",
    ],
    ...data.map((r) => [
      r.name,
      r.eventsAssigned,
      r.eventsAttended,
      `${r.onTimePercent}%`,
      r.lateCount,
      r.missedEvents,
      r.punctualityScore,
    ]),
  ];

  const csvContent = csvRows.map((row) => row.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
function Reports() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 5;

  const filteredReports = sampleReports.filter((report) =>
    report.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * reportsPerPage;
  const indexOfFirst = indexOfLast - reportsPerPage;
  const currentReports = filteredReports.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);
  //export to pdf
  const exportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [
        [
          "Name",
          "Events Assigned",
          "Attended",
          "On-Time %",
          "Late",
          "Missed",
          "Score",
        ],
      ],
      body: filteredReports.map((r) => [
        r.name,
        r.eventsAssigned,
        r.eventsAttended,
        `${r.onTimePercent}%`,
        r.lateCount,
        r.missedEvents,
        r.punctualityScore,
      ]),
    });
    doc.save("staff_report.pdf");
  };
  //export to excel
  const [sortedBy, setSortedBy] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);

  const sortedReports = [...sampleReports].sort((a, b) => {
    if (!sortedBy) return 0;
    const valA = a[sortedBy];
    const valB = b[sortedBy];
    return sortAsc ? valA - valB : valB - valA;
  });

  const toggleSort = (key) => {
    if (sortedBy === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortedBy(key);
      setSortAsc(true);
    }
  };
  return (
    <div className="bg-[#E9EDF8] w-screen h-screen flex flex-row overflow-hidden">
      <Sidebar />
      <main className="w-full h-full p-2">
        <Header />
        <BreadCrumb text2="Reports" />

        <div className="">
          <div className="mb-1 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <div>
              <h1 className="text-2xl font-semibold">Reports</h1>
              <p className="text-gray-600">
                Staff Attendance and Performance Summary
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <input
                type="text"
                placeholder="Search by name"
                className="px-3 py-1 rounded border"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <input
                type="month"
                className="px-3 py-1 rounded border"
                title="Filter by Month (not yet functional)"
              />
              <button
                onClick={exportPDF}
                className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Export PDF
              </button>
              <button
                onClick={() => exportToCSV(sortedReports)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Export to CSV
              </button>
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-left border-gray-200">
                <thead className="bg-white">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-4 py-3 font-semibold">Events Assigned</th>
                    <th className="px-4 py-3 font-semibold">Events Attended</th>
                    <th className="px-4 py-3 font-semibold">On-Time %</th>
                    <th className="px-4 py-3 font-semibold">Late Count</th>
                    <th className="px-4 py-3 font-semibold">Missed Events</th>
                    <th className="px-4 py-3 font-semibold">
                      Punctuality Score (1–5)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentReports.map((report, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 font-medium">{report.name}</td>
                      <td className="px-4 py-3">{report.eventsAssigned}</td>
                      <td className="px-4 py-3">{report.eventsAttended}</td>
                      <td className="px-4 py-3">{report.onTimePercent}%</td>
                      <td className="px-4 py-3 text-yellow-600 font-semibold">
                        {report.lateCount}
                      </td>
                      <td className="px-4 py-3 text-red-500 font-semibold">
                        {report.missedEvents}
                      </td>
                      <td className="px-4 py-3 text-green-600 font-bold">
                        {report.punctualityScore}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-4 flex justify-center gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded border ${
                      currentPage === i + 1
                        ? "bg-blue-500 text-white"
                        : "bg-white"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Reports;
