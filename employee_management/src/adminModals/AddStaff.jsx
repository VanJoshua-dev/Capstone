import React, { useState } from "react";
import clx from "clsx";
function AddStaff({ onClose, onSubmit }) {
  //handle show pass
  const [showPass, setShowPass] = useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("")
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !position) {
      setError("All fields are required.");
      return;
    }

    // Optional: validate email or format
    setError("");
    onSubmit?.({ name, email, position }); // call parent handler if provided
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
          Add Staff +
        </h1>
        {/* Body */}
        <div className="px-5 py-4 flex flex-col gap-4">
          {/* Error message */}
          <p
            className={clx(
              "text-red-500 text-center text-sm",
              error ? "" : "hidden"
            )}
          >
            Username already exist.
          </p>
          <div className="flex flex-col">
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Staff name"
              className="p-2 border-2 border-gray-500 rounded-md"
              required
            />
          </div>

          {/* Username field */}
          <div className="flex flex-col">
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="p-2 border-2 border-gray-500 rounded-md"
              required
            />
          </div>

          {/* Password field */}
          <div className="flex flex-col gap-1">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="p-2 border-2 border-gray-500 rounded-md"
              required
            />
             <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-5 h-5"
                checked={showPass}
                onChange={() => setShowPass(!showPass)}
              />
              <label className="text-sm">Show password</label>
            </div>
          </div>
          </div>

          {/* Show password and forgot password */}
         
          <div className="flex flex-col">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="p-2 border-2 border-gray-500 rounded-md"
              required
            />
          </div>
          <div className="flex flex-col">
            <input
              type="number"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone No."
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
              Add Staff
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

export default AddStaff;