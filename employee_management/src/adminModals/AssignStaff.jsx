import React, { useState } from "react";
import clx, { clsx } from "clsx";
function AssignStaff({ onClose, onSubmit }) {
  //handle show pass
  const [showPass, setShowPass] = useState(false);

  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [staffNeed, setStaffNeed] = useState("");
  const [error, setError] = useState(true);

  const sampleData = [
    { staffID: 1001, name: "John Doe 1", phone: "09xxxxxxxx1", assigned: true },
    {
      staffID: 1002,
      name: "John Doe 2",
      phone: "09xxxxxxxx2",
      assigned: false,
    },
  ];

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-30 z-50 flex items-center justify-center p-8">
      <main className="w-full h-full rounded-sm bg-blue-50 shadow-[0px_0px_18px_0.5px_#D3D3D3]">
        <h1 className="text-2xl rounded-t-sm text-white bg-[#0A1727] font-regular flex items-center gap-2 p-4">
          Assigning Staff to Event
        </h1>

        <div className="flex flex-col px-4 py-3">
          <div>
            <span className="flex gap-1 items-center">
              <b className="text-lg">Event:</b> {"Sample Event 1"}
            </span>
            <span className="flex gap-1 items-center">
              <b className="text-lg">Date:</b>
              {"07-06-25"}
            </span>
          </div>

          <form className="">
            <div className="flex justify-between items-center mb-1">
              <div className="flex gap-1">
                <input
                  type="text"
                  placeholder="Search by name..."
                  className="px-4 py-1 border rounded w-64 shadow-sm"
                />
                <button
                  title="Tap to search"
                  type="submit"
                  className="px-3 py-1 bg-blue-600 text-white rounded  hover:bg-blue-700 cursor-pointer"
                >
                  Search
                </button>
              </div>
              <div className="flex items-center gap-1">
                <select
                  name="status"
                  className="px-4 py-1 border rounded w-52 shadow-sm"
                >
                  <option value="">All Status</option>
                  <option value="assigned">Assigned</option>
                  <option value="unassigned">Unassigned</option>
                </select>

                <span className="px-4 py-1  rounded bg-red-300 shadow-sm">
                  {"1"} of {"12"} staff assigned
                </span>
              </div>
            </div>
            <div className="rounded overflow-y-auto h-full ">
              <table className="min-w-full border-collapse text-left border-gray-200">
                <thead className="bg-white">
                  <tr>
                    <th className="px-4 py-2 font-semibold">Select</th>
                    <th className="px-4 py-2 font-semibold">Staff ID</th>
                    <th className="px-4 py-2 font-semibold">Name</th>
                    <th className="px-4 py-2 font-semibold">Phone No.</th>
                    <th className="px-4 py-2 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleData.map((data, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2">
                        <input type="checkbox" className="w-4 h-4 border" />
                      </td>
                      <td className="px-4 py-2 text-black">{data.staffID}</td>
                      <td className="px-4 py-2 text-black">{data.name}</td>
                      <td className="px-4 py-2 text-black">{data.phone}</td>
                      <td className="px-4 py-2">
                        <span
                          className={clsx(
                            "px-4 py-1 inline-block rounded-sm",
                            data.assigned ? "bg-green-300" : "bg-red-300"
                          )}
                        >
                          {data.assigned ? "Assigned" : "Unassigned"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Submit and Cancel buttons */}
            <div className="flex gap-1 justify-end items-center">
              <button
                type="submit"
                className="px-3 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
              >
                Assign
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-3 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AssignStaff;
