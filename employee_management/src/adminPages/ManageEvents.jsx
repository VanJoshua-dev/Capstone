import React, { useState } from "react";
import Header from "../adminComponents/Header";
import BreadCrumb from "../adminComponents/BreadCrumb";
import Sidebar from "../adminComponents/Sidebar";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import clx from "clsx";

function ManageEvents() {
  const allEvents = [
    {
      eventID: 1001,
      eventName: "Sample Event 1",
      eventDate: "Fri, March 28, 2025",
      eventTime: "9:00 am - 3:00 pm",
      staffNeed: 12,
      assignedStaff: 7,
    },
    {
      eventID: 1002,
      eventName: "Sample Event 2",
      eventDate: "Sat, March 29, 2025",
      eventTime: "9:00 am - 3:00 pm",
      staffNeed: 13,
      assignedStaff: 13,
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setFilter(searchTerm);
  };

  const filteredEvents = allEvents.filter((event) =>
    event.eventName.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="bg-[#E9EDF8] w-screen h-screen flex flex-row overflow-hidden">
      <Sidebar />
      <main className="w-full h-full p-2">
        <Header />
        <BreadCrumb text2="Manage Events" />

        {/* Filter Bar */}
        <div className="mb-1 flex justify-between items-center">
          <form onSubmit={handleSearch} className="flex gap-1">
            <input
              type="text"
              placeholder="Search by event name..."
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
          {/* Add event */}
          <button type="button" className="px-3 py-1 text-white bg-blue-600 hover:bg-blue-700 cursor-pointer rounded">+ Add Event</button>
        </div>

        {/* Events Table */}
        <div className="rounded overflow-y-auto max-h-[500px]">
          <table className="min-w-full border-collapse text-left border-gray-200">
            <thead className="bg-white">
              <tr>
                <th className="px-4 py-2 font-semibold">Event ID</th>
                <th className="px-4 py-2 font-semibold">Event Name</th>
                <th className="px-4 py-2 font-semibold">Date</th>
                <th className="px-4 py-2 font-semibold">Time</th>
                <th className="px-4 py-2 font-semibold">Assigned Staff</th>
                <th className="px-4 py-2 font-semibold text-center" colSpan={3}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <tr key={event.eventID} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{event.eventID}</td>
                    <td className="px-4 py-2">{event.eventName}</td>
                    <td className="px-4 py-2">{event.eventDate}</td>
                    <td className="px-4 py-2">{event.eventTime}</td>
                    <td className="px-4 py-2">
                      <span
                        title={
                          event.assignedStaff === event.staffNeed
                            ? "Complete"
                            : "Incomplete"
                        }
                        className={clx(
                          "py-1 w-full px-4 rounded inline-block text-center",
                          event.assignedStaff === event.staffNeed
                            ? "bg-green-300"
                            : "bg-red-300"
                        )}
                      >
                        {event.assignedStaff}/{event.staffNeed}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                        Assign Staff
                      </button>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        title="Edit event"
                        className="w-full h-full p-2 flex items-center cursor-pointer justify-center bg-green-500 text-white rounded-sm hover:bg-green-600"
                      >
                        <FaRegEdit size={20} />
                      </button>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        title="Delete event"
                        className="w-full h-full p-2 flex items-center justify-center bg-red-500 text-white rounded-sm hover:bg-red-600"
                      >
                        <MdDeleteOutline size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    No events found.
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

export default ManageEvents;
