import React, { useState } from "react";
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
  const allStaff = Array.from({ length: 25 }, (_, i) => ({
    staffID: `${i + 1}`.padStart(3, "0"),
    avatar: "",
    name: `John Doe ${i + 1}`,
    user: `johndoe${i + 1}`,
    pass: `pass${i + 1}`,
    email: `johndoe${i + 1}@gmail.com`,
    phone: `091600000${i + 1}`,
  }));

  const [searchInput, setSearchInput] = useState(""); // Raw input
  const [search, setSearch] = useState(""); // Confirmed search term
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setCurrentPage(1);
  };

  const filteredStaff = allStaff.filter((staff) =>
    staff.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStaff.length / recordsPerPage);
  const paginatedData = filteredStaff.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );


  //handle Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);
  //account settings
  const [showSetting, setShowSetting] = useState(false)

  const handleAddStaff = (staffData) => {
    console.log("New Staff:", staffData);
    // Add logic to send to API or state
  };

  return (
    <div className="bg-[#E9EDF8] w-screen h-screen flex flex-row overflow-hidden">
      <Sidebar />
      <main className="w-full h-full p-2">
        <Header onOpenAccountModal={() => setShowSetting(true)}/>
        <BreadCrumb  text2="Manage Staff" />

        {/* Filter Bar */}
        <form
          className="flex justify-between items-cente mb-1"
          onSubmit={handleSearch}
        >
          <div className="flex gap-1">
            <input
              type="text"
              placeholder="Search by name..."
              className="px-4 py-1 border rounded w-64 shadow-sm"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
            title="Tap to search"
              type="submit"
              className="px-3 py-1 bg-blue-600 text-white rounded  hover:bg-blue-700 cursor-pointer"
            >
              Search
            </button>
          </div>
          <button title="Add staff" type="button" className="px-3 py-1 rounded text-white bg-blue-600 hover:bg-blue-700"  onClick={() => setShowAddModal(true)}>+ Add Staff</button>
        </form>

        {/* Staff Table */}
        <div className=" rounded overflow-y-auto max-h-[490px]">
          <table className="min-w-full border-collapse text-left border-gray-200">
            <thead className="bg-white ">
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
                    <td className="px-4 py-2">{staff.user}</td>
                    <td className="px-4 py-2">{staff.pass}</td>
                    <td className="px-4 py-2">{staff.email}</td>
                    <td className="px-4 py-2">{staff.phone}</td>
                    <td className="px-4 py-2">
                      <button
                        // onClick={() => openModal("edit", order)}
                        title="Edit staff"
                        className="w-full h-full p-1 flex items-center cursor-pointer justify-center bg-green-500 text-white rounded-sm hover:bg-green-600"
                        onClick={() => setShowEditModal(true)}
                      >
                        <FaRegEdit size={20} />
                      </button>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        // onClick={() => openModal("delete", order)}
                        title="Delete staff"
                        className="w-full h-full p-1 flex items-center justify-center bg-red-500 text-white rounded-sm hover:bg-red-600"
                        onClick={() => setShowDelModal(true)}
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
        </div>

        {/* Pagination */}
        <div className="mt-2 flex justify-between items-center p-1">
          <p className="text-sm">
            Showing{" "}
            {Math.min(
              (currentPage - 1) * recordsPerPage + 1,
              filteredStaff.length
            )}
            –{Math.min(currentPage * recordsPerPage, filteredStaff.length)} of{" "}
            {filteredStaff.length}
          </p>
          <div className="flex gap-2">
            <button
              title="Edit staff record."
              className="px-4 py-2 bg-blue-400  disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <button
              className="px-4 py-2 bg-blue-400  disabled:opacity-50"
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
      {showAddModal && (
        <AddStaff
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddStaff}
        />
      )}
      {showEditModal && (
        <EditStaff  onClose={() => setShowEditModal(false)}
          onSubmit={handleAddStaff}/>
      )}
      {showDelModal && (
        <DeleteStaff onClose={() => setShowDelModal(false)}
          onSubmit={handleAddStaff}/>
      )}
      {showSetting && (
        <AccountSettings onClose={() => setShowSetting(false)}/>
      )}

    </div>
  );
}

export default ManageStaff;
