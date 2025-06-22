import React, { useState } from "react";
import { MdLogin } from "react-icons/md";
import clx from "clsx";
import bg from "../assets/mdvImage.jpg";
import { useNavigate } from "react-router-dom";

import AlertCode from "../alerts/AlertCode";
function ForgotPass() {
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState(false);
  const [code, setCode] = useState(null);

  const navigate = useNavigate();
  const handleSubmit = (e) => {
  e.preventDefault();
  const generatedCode = Math.floor(1000000000 + Math.random() * 9000000000);
  localStorage.setItem("fp_code", generatedCode);
  setCode(generatedCode); // show in alert

};

  return (
    <div
      // style={{backgroundImage: `url(${bg})`}}
      className="min-h-screen bg-[#0A1727] w-full flex flex-col bg-center justify-center items-center p-3"
    >
      {code && <AlertCode message={`Your verification code: `} code={code}/>}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-sm shadow-[0px_0px_18px_0.5px_#D3D3D3]"
      >
        <h1 className="text-2xl rounded-t-sm text-white bg-[#0A1727] font-regular flex items-center gap-2 p-2 px-5">
         Forgot Password
        </h1>
        <div className="px-5 py-3 flex flex-col gap-2">
          <p
            className={clx(
              "text-red-500 text-center text-sm",
              error ? "" : "hidden"
            )}
          >
            Email not found. Please check and try again.
          </p>

          <div className="flex flex-col">
            <label htmlFor="username" className="text-lg">
              Enter your email
            </label>
            <input
              type="email"
              name="username"
              placeholder="E.g. JuanDelacruz@gmail.com"
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Send Verification Code
          </button>
          <a href="/" title="Back to login page" className="w-full text-center text-sm text-blue-500 hover:underline">Return to login page</a>
        </div>
      </form>
    </div>
  );
}

export default ForgotPass;
