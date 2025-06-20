import React, { useState } from "react";
import clx from "clsx";
function AddEvent({ onClose, onSubmit }) {
  //handle show pass
  const [showPass, setShowPass] = useState(false);

  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [staffNeed, setStaffNeed] = useState("");
  const [error, setError] = useState(true);

  //   const handleSubmit = (e) => {
  //     e.preventDefault();

  //     if (!name || !email || !position) {
  //       setError("All fields are required.");
  //       return;
  //     }

  //     // Optional: validate email or format
  //     setError("");
  //     onSubmit?.({ name, email, position }); // call parent handler if provided
  //     onClose(); // close modal
  //   };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-30 z-50 flex items-center justify-center">
      <form
        // onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-md shadow-lg"
      >
        {/* Header */}
        <h1 className="text-2xl rounded-t-md text-white bg-[#0A1727] font-regular flex items-center gap-2 p-4">
          Add Event +
        </h1>
        {/* Body */}
        <div className="px-5 py-4 flex flex-col gap-4">
          {/* Error message */}
          {/* <p
            className={clx(
              "text-red-500 text-center text-sm",
              error ? "" : "hidden"
            )}
          >
            Username already exist.
          </p> */}
          <div className="flex flex-col">
            <input
              type="text"
              name="eventName"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="Event name"
              className="p-2 border-2 border-gray-500 rounded-md"
              required
            />
          </div>

          {/* Username field */}
          <div className="flex flex-col">
            <input
              type="date"
              name="eventDate"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              placeholder="Event date"
              className="p-2 border-2 border-gray-500 rounded-md"
              required
            />
          </div>

          {/* Time field */}
          <div className="flex flex-row  gap-3">
            <div>
              <label htmlFor="startDate">Start Time</label>
              <input
                type="time"
                name="startTime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                placeholder="Start time"
                className="p-2 w-full border-2 border-gray-500 rounded-md"
                required
              />
            </div>

            <p className="flex items-center pt-5 text-lg">to</p>
            <div>
              <label htmlFor="startDate">End Time</label>
              <input
                type="time"
                name="endTime"
                className="p-2 w-full border-2 border-gray-500 rounded-md"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                placeholder="End time"
              />
            </div>
          </div>

          {/* Show password and forgot password */}

          <div className="flex flex-col">
            <input
              type="number"
              name="staffNeed"
              value={staffNeed}
              onChange={(e) => setStaffNeed(e.target.value)}
              placeholder="Staff need"
              className="p-2 border-2 border-gray-500 rounded-md"
              required
            />
          </div>

          {/* Submit and Cancel buttons */}
          <div className="flex gap-1 justify-end items-center">
            <button
              type="submit"
              className="px-3 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
            >
              Add Event
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddEvent;
