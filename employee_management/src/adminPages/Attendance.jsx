import React, { useState } from "react";
import Header from "../adminComponents/Header";
import BreadCrumb from "../adminComponents/BreadCrumb";
import Sidebar from "../adminComponents/Sidebar";
import clx from "clsx";
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

    // Trigger real-time filtering only for non-name filters
    if (name !== "name") {
      setShowFiltered(true);
    }
  };

  const handleNameSearch = () => {
    setShowFiltered(true);
  };

  const filteredRecords = allAttendance.filter((rec) => {
    const nameMatch = rec.name
      .toLowerCase()
      .includes(filters.name.toLowerCase());
    const statusMatch = filters.status ? rec.status === filters.status : true;
    const eventMatch = rec.event
      .toLowerCase()
      .includes(filters.event.toLowerCase());
    const dateMatch = filters.date ? rec.date === filters.date : true;
    return nameMatch && statusMatch && eventMatch && dateMatch;
  });

  const displayRecords = showFiltered ? filteredRecords : allAttendance;

  return (
    <div className="bg-[#E9EDF8] w-screen h-screen flex flex-row overflow-hidden">
      <Sidebar />
      <main className="w-full h-full p-2">
        <Header />
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
        <div className="rounded overflow-y-auto max-h-[490px]">
          <table className="min-w-full border-collapse text-left border-gray-200">
            <thead className="bg-white">
              <tr>
                <th className="px-4 py-2 font-semibold">Attd. Id</th>
                <th className="px-4 py-2 font-semibold">Avatar</th>
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
              {displayRecords.length > 0 ? (
                displayRecords.map((att, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{att.id}</td>
                    <td className="px-4 py-2">
                      <img
                        className="w-10 h-10 rounded-full border-1 border-gray-600"
                        src="https://scontent.fmnl17-3.fna.fbcdn.net/v/t39.30808-1/270149507_109076721648494_4282075989312972371_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=103&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeFmH5kBvP0PBFV67owYe7yFjwZd4hvNVLCPBl3iG81UsKFeeibudOpiRzzReFkF4-EA3o-ayhmgoaKlDp6zIhyD&_nc_ohc=vBHFUWTmzO8Q7kNvwFP-fjE&_nc_oc=AdmespsDy422oyT2J18MEHS3wwbutuOV2TY1FeTBrr8bD4orwHb5nbAE9KQn3u920ZY&_nc_zt=24&_nc_ht=scontent.fmnl17-3.fna&_nc_gid=OxebAImtmAlnXka6klyetw&oh=00_AfO5VTub_ypawTGHzrp_HlZ5pQtEK-9Z0BKbjDn3zlfJlw&oe=684DE0AA"
                        alt="Meinard"
                      />
                    </td>
                    <td className="px-4 py-2">{att.date}</td>
                    <td className="px-4 py-2">{att.name}</td>
                    <td className="px-4 py-2">{att.event}</td>
                    <td className="px-4 py-2">{att.timeIn || "—"}</td>
                    <td className="px-4 py-2">{att.timeOut || "—"}</td>
                    <td className="px-4 py-2">
                      {" "}
                      <span
                        className={clx(
                          "py-1 w-full inline-block px-4 rounded text-center",
                          att.status === "Present"
                            ? "bg-green-300"
                            : "bg-red-300"
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
                  <td colSpan="7" className="text-center py-4">
                    No attendance records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default AttendancePage;
