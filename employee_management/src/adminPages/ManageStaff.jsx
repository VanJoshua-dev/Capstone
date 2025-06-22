import React, { useState, useEffect } from "react";
import Header from "../adminComponents/Header";
import BreadCrumb from "../adminComponents/BreadCrumb";
import Sidebar from "../adminComponents/Sidebar";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import AddStaff from "../adminModals/AddStaff";
import EditStaff from "../adminModals/EditStaff";
import DeleteStaff from "../adminModals/DeleteStaff";
import AccountSettings from "../adminModals/AccountSettings";

function ManageStaff() {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);
  const [showSetting, setShowSetting] = useState(false);

  const [selectedStaff, setSelectedStaff] = useState(null);

  // Fetch staff data
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users");
        if (!res.ok) throw new Error("Failed to fetch staff data");
        const data = await res.json();
        setStaffList(data);
        setLoading(false);
      } catch (error) {
        setFetchError(error.message);
        setLoading(false);
      }
    };
    fetchStaff();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setCurrentPage(1);
  };

  const filteredStaff = staffList.filter((staff) =>
    staff.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStaff.length / recordsPerPage);
  const paginatedData = filteredStaff.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const handleAddStaff = (newStaff) => {
    setStaffList((prev) => [...prev, newStaff]);
  };

  const handleUpdateStaff = (updatedStaff) => {
    setStaffList((prev) =>
      prev.map((s) => (s.id === updatedStaff.id ? updatedStaff : s))
    );
  };

  return (
    <div className="bg-[#E9EDF8] w-screen h-screen flex flex-row overflow-hidden">
      <Sidebar />
      <main className="w-full h-full p-2">
        <Header onOpenAccountModal={() => setShowSetting(true)} />
        <BreadCrumb text2="Manage Staff" />

        {/* Filter Bar */}
        <form className="flex justify-between mb-1" onSubmit={handleSearch}>
          <div className="flex gap-1">
            <input
              type="text"
              placeholder="Search by name..."
              className="px-4 py-1 border rounded w-64 shadow-sm"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              type="submit"
              title="Tap to search"
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Search
            </button>
          </div>
          <button
            type="button"
            title="Add staff"
            className="px-3 py-1 rounded text-white bg-blue-600 hover:bg-blue-700"
            onClick={() => setShowAddModal(true)}
          >
            + Add Staff
          </button>
        </form>

        {/* Staff Table */}
        <div className="rounded overflow-y-auto max-h-[490px] h-full">
          {loading ? (
            <p className="p-4">Loading staff data...</p>
          ) : fetchError ? (
            <p className="p-4 text-red-600">{fetchError}</p>
          ) : (
            <table className="min-w-full border-collapse text-left border-gray-200">
              <thead className="bg-white">
                <tr>
                  <th className="px-4 py-2 font-semibold">Staff ID</th>
                  <th className="px-4 py-2 font-semibold">Name</th>
                  <th className="px-4 py-2 font-semibold">Username</th>
                  <th className="px-4 py-2 font-semibold">Password</th>
                  <th className="px-4 py-2 font-semibold">Email</th>
                  <th className="px-4 py-2 font-semibold">Phone No.</th>
                  <th className="px-4 py-2 text-center font-semibold" colSpan={2}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((staff, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2">{staff.staffID}</td>
                      <td className="px-4 py-2">{staff.name}</td>
                      <td className="px-4 py-2">{staff.username}</td>
                      <td className="px-4 py-2">{staff.password}</td>
                      <td className="px-4 py-2">{staff.email}</td>
                      <td className="px-4 py-2">{staff.phone}</td>
                      <td className="px-4 py-2">
                        <button
                          title="Edit staff"
                          className="w-full p-1 flex justify-center bg-green-500 text-white rounded-sm hover:bg-green-600"
                          onClick={() => {
                            setSelectedStaff(staff);
                            setShowEditModal(true);
                          }}
                        >
                          <FaRegEdit size={20} />
                        </button>
                      </td>
                      <td className="px-4 py-2">
                        <button
                          title="Delete staff"
                          className="w-full p-1 flex justify-center bg-red-500 text-white rounded-sm hover:bg-red-600"
                          onClick={() => {
                            setSelectedStaff(staff);
                            setShowDelModal(true);
                          }}
                        >
                          <MdDeleteOutline size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-4">
                      No matching staff found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-2 flex justify-between items-center p-1">
          <p className="text-sm">
            Showing{" "}
            {Math.min(
              (currentPage - 1) * recordsPerPage + 1,
              filteredStaff.length
            )}
            –
            {Math.min(currentPage * recordsPerPage, filteredStaff.length)} of{" "}
            {filteredStaff.length}
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
      {showAddModal && (
        <AddStaff onClose={() => setShowAddModal(false)} onSubmit={handleAddStaff} />
      )}
      {showEditModal && selectedStaff && (
        <EditStaff
          user={selectedStaff}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleUpdateStaff}
        />
      )}
      {showDelModal && selectedStaff && (
        <DeleteStaff
          user={selectedStaff}
          onClose={() => setShowDelModal(false)}
          onSubmit={(deletedUser) => {
            setStaffList((prev) => prev.filter((u) => u.id !== deletedUser.id));
            setShowDelModal(false);
          }}
        />
      )}
      {showSetting && <AccountSettings onClose={() => setShowSetting(false)} />}
    </div>
  );
}

export default ManageStaff;
