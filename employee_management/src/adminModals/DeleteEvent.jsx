import React, { useState } from "react";
import clx from "clsx";

//icons
import { MdDelete } from "react-icons/md";
import { PiWarningCircle } from "react-icons/pi";
function DeleteEvent({ onClose, onSubmit }) {
  //handle show pass
  const [showPass, setShowPass] = useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("")
  const [error, setError] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
 // call parent handler if provided
    onClose(); // close modal
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-30 z-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-md shadow-lg"
      >
        {/* Header */}
        <h1 className="text-2xl rounded-t-md text-white bg-[#0A1727] font-regular flex items-center gap-2 p-4">
          Delete Event <MdDelete />
        </h1>
        {/* Body */}
        <div className="px-5 py-4 flex flex-col gap-4">
          {/* Error message */}
         
          <p className="text-amber-600 flex font-light items-center gap-1"><PiWarningCircle size={20}/> Warning this action canno't be undone.</p>
            <span className="text-center text-lg font-medium">Are you sure you want to delete <b>{"Sample Event 1"}</b> in the event list?</span>

          {/* Submit and Cancel buttons */}
          <div className="flex gap-1 justify-end items-center">
            <button
              type="submit"
              className="px-3 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
            >
              Delete Event
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default DeleteEvent;
