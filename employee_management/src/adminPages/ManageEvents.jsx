import React, { useState } from "react";
import Header from "../adminComponents/Header";
import BreadCrumb from "../adminComponents/BreadCrumb";
import Sidebar from "../adminComponents/Sidebar";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import clx from "clsx";
import AddEvent from "../adminModals/AddEvent";
import EditEvent from "../adminModals/EditEvent";
import DeleteEvent from "../adminModals/DeleteEvent";
import AccountSettings from "../adminModals/AccountSettings";
import AssignStaff from "../adminModals/AssignStaff";

// ... imports remain the same
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
    // Add more event objects if needed
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const handleSearch = (e) => {
    e.preventDefault();
    setFilter(searchTerm);
    setCurrentPage(1); // Reset to page 1 on new search
  };

  const filteredEvents = allEvents.filter((event) =>
    event.eventName.toLowerCase().includes(filter.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEvents.length / recordsPerPage);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  // Modal States
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showEditEvent, setShowEditEvent] = useState(false);
  const [showDelEvent, setShowDelEvent] = useState(false);
  const [showAssignStaff, setShowAssignStaff] = useState(false);
  const [showSetting, setShowSetting] = useState(false);

  return (
    <div className="bg-[#E9EDF8] w-screen h-screen flex flex-row overflow-hidden">
      <Sidebar />
      <main className="w-full h-full p-2">
        <Header onOpenAccountModal={() => setShowSetting(true)} />
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
          <button
            type="button"
            className="px-3 py-1 text-white bg-blue-600 hover:bg-blue-700 rounded"
            onClick={() => setShowAddEvent(true)}
          >
            + Add Event
          </button>
        </div>

        {/* Events Table */}
        <div className="rounded overflow-y-auto max-h-[500px] h-full">
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
              {paginatedEvents.length > 0 ? (
                paginatedEvents.map((event) => (
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
                      <button
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                        onClick={() => setShowAssignStaff(true)}
                      >
                        Assign Staff
                      </button>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        title="Edit event"
                        className="w-full p-1 flex justify-center bg-green-500 text-white rounded-sm hover:bg-green-600"
                        onClick={() => setShowEditEvent(true)}
                      >
                        <FaRegEdit size={20} />
                      </button>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        title="Delete event"
                        className="w-full p-1 flex justify-center bg-red-500 text-white rounded-sm hover:bg-red-600"
                        onClick={() => setShowDelEvent(true)}
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

        {/* Pagination Controls */}
        <div className="mt-2 flex justify-between items-center p-1">
          <p className="text-sm">
            Showing{" "}
            {Math.min(
              (currentPage - 1) * recordsPerPage + 1,
              filteredEvents.length
            )}
            –
            {Math.min(currentPage * recordsPerPage, filteredEvents.length)} of{" "}
            {filteredEvents.length}
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
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </main>

      {/* Modals */}
      {showAddEvent && <AddEvent onClose={() => setShowAddEvent(false)} />}
      {showEditEvent && <EditEvent onClose={() => setShowEditEvent(false)} />}
      {showDelEvent && <DeleteEvent onClose={() => setShowDelEvent(false)} />}
      {showAssignStaff && (
        <AssignStaff onClose={() => setShowAssignStaff(false)} />
      )}
      {showSetting && <AccountSettings onClose={() => setShowSetting(false)} />}
    </div>
  );
}

export default ManageEvents;
