import React, { useState } from "react";
import clx from "clsx";
import { IoSettingsSharp } from "react-icons/io5";

function AccountSettings({ onClose }) {
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // your login logic here
    console.log("Form submitted");
  };

  return (
    // Fullscreen overlay
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-opacity-30">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-md shadow-lg"
      >
        {/* Header */}
        <h1 className="text-2xl rounded-t-md text-white bg-[#0A1727] font-regular flex items-center gap-2 p-4">
          My Account Setting <IoSettingsSharp />
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
            Incorrect username or password
          </p>
          <div className="flex flex-col">
            <label htmlFor="name" className="text-lg">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={"Jhon Doe"}
              className="p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-lg">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={"admin.example@gmail.com"}
              className="p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          {/* Username field */}
          <div className="flex flex-col">
            <label htmlFor="username" className="text-lg">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Your username"
              value={"admin123"}
              className="p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Password field */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-lg">
              Password
            </label>
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Enter new password"
              className="p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Show password and forgot password */}
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

          {/* Submit and Cancel buttons */}
          <div className="flex gap-1 justify-end items-center">
            <button
              type="submit"
              className="px-3 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
            >
              Save Changes
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

export default AccountSettings;
