import React, { useState } from "react";
import { MdLogin } from "react-icons/md";
import clx from "clsx";
import bg from "../assets/mdvImage.jpg";
function LoginVerificaton() {
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
         Login Verification
        </h1>
        <div className="px-5 py-3 flex flex-col gap-2">
          <p
            className={clx(
              "text-red-500 text-center text-sm",
              error ? "" : "hidden"
            )}
          >
            Invalid code. Please try again.
          </p>

          <div className="flex flex-col">
            <label htmlFor="username" className="text-lg">
             Code sent to your email
            </label>
            <input
              type="number"
              name="username"
              placeholder="Enter verification code"
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white rounded-sm hover:bg-green-600 transition"
          >
            Verify
          </button>
           <a href="/" title="Back to login page" className="w-full text-center text-sm text-blue-500 hover:underline">Return to login page</a>
        </div>
      </form>
    </div>
  );
}

export default LoginVerificaton;
