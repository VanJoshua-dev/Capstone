import React, { useState } from "react";
import Header from "../adminComponents/Header";
import BreadCrumb from "../adminComponents/BreadCrumb";
import Sidebar from "../adminComponents/Sidebar";

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

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 8;

  const filteredStaff = allStaff.filter((staff) =>
    staff.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStaff.length / recordsPerPage);
  const paginatedData = filteredStaff.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  return (
    <div className="bg-[#E9EDF8] w-screen h-screen flex flex-row overflow-hidden">
      <Sidebar />
      <main className="w-full h-full p-4">
        <Header />
        <BreadCrumb text1="Home" text2="Manage Staff" />

        {/* Filter Bar */}
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search by name..."
            className="px-4 py-2 border rounded w-64 shadow-sm"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Staff Table */}
        <div className="bg-white shadow overflow-y-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-200 text-gray-600 uppercase tracking-wider">
              <tr>
                <th className="px-4 py-2">Staff ID</th>
                <th className="px-4 py-2">Avatar</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Password</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone No.</th>
                <th className="px-4 py-2" colSpan={2}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((staff, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 border-b last:border-none"
                  >
                    <td className="px-4 py-2">{staff.staffID}</td>
                    <td className="px-4 py-2">
                      <div className="w-10 h-10 bg-gray-300 rounded-full" />
                    </td>
                    <td className="px-4 py-2">{staff.name}</td>
                    <td className="px-4 py-2">{staff.user}</td>
                    <td className="px-4 py-2">{staff.pass}</td>
                    <td className="px-4 py-2">{staff.email}</td>
                    <td className="px-4 py-2">{staff.phone}</td>
                    <td className="px-4 py-2 text-blue-600 cursor-pointer">
                      Edit
                    </td>
                    <td className="px-4 py-2 text-red-600 cursor-pointer">
                      Delete
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
          {/* Pagination */}
          <div className="mt-1 flex justify-between items-center p-1">
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
                className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <button
                className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ManageStaff;
