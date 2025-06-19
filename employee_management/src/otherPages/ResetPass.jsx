import React, { useState } from "react";
import { MdLogin } from "react-icons/md";
import clx from "clsx";
import bg from "../assets/mdvImage.jpg";
function ResetPass() {
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState(true);

  return (
    <div
      // style={{backgroundImage: `url(${bg})`}}
      className="min-h-screen bg-[#0A1727] w-full flex flex-col bg-center justify-center items-center p-3"
    >
      <form
        action=""
        className="w-full max-w-md bg-white rounded-sm shadow-[0px_0px_18px_0.5px_#D3D3D3]"
      >
        <h1 className="text-2xl rounded-t-sm text-white bg-[#0A1727] font-regular flex items-center gap-2 p-2 px-5">
          Reset Password
        </h1>
        <div className="px-5 py-3 flex flex-col gap-2">
          <p
            className={clx(
              "text-red-500 text-center text-sm",
              error ? "" : "hidden"
            )}
          >
            Password confirmation does not match.
          </p>
          {/* New Password */}
          <div className="flex flex-col">
            <label htmlFor="newpass" className="text-lg">
              New password
            </label>
            <input
              type={showPass ? "text" : "password"}
              name="newpass"
              placeholder="New password"
              className="p-2 border border-gray-300 rounded-md"
            />
            {/* Confirm Password */}
          </div>
          <div className="flex flex-col">
            <label htmlFor="confirmpass" className="text-lg">
              Confirm password
            </label>
            <input
              type={showPass ? "text" : "password"}
              name="confirmpass"
              placeholder="Confirm password"
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-row  justify-between items-start sm:items-center gap-2">
            <div className="flex items-center gap-2">
              <input
                onChange={() => setShowPass(!showPass)}
                checked={showPass}
                type="checkbox"
                className="w-5 h-5"
              />
              <label className="text-sm">Show password</label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Reset Password
          </button>
          <a
            href="/"
            title="Back to login page"
            className="w-full text-center text-sm text-blue-500 hover:underline"
          >
            Return to login page
          </a>
        </div>
      </form>
    </div>
  );
}

export default ResetPass;
