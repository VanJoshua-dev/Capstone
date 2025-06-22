import React, { useState, useEffect } from "react";
import { MdLogin } from "react-icons/md";
import clx from "clsx";
import bg from "../assets/mdvImage.jpg";
import { useNavigate } from "react-router-dom";
import AlertPassReset from "../alerts/AlertResetPass";
function ResetPass() {
  const [showPass, setShowPass] = useState(false);
  // const [error, setError] = useState("false");
  const [alertShow, setAlertShow] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (alertShow === "failed") {
      const timer = setTimeout(() => setAlertShow(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [alertShow]);

  useEffect(() => {
    if (alertShow === "success") {
      const timer = setTimeout(() => navigate("/"), 2000);
      return () => clearTimeout(timer);
    }
  }, [alertShow, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirmPass != newPass) {
      setAlertShow("failed")
    } else {
      setAlertShow("success");
    }
  };

  return (
    <div
      // style={{backgroundImage: `url(${bg})`}}
      className="min-h-screen bg-[#0A1727] w-full flex flex-col bg-center justify-center items-center p-3"
    >
      {alertShow === "success" && (
        <AlertPassReset
          message={"Your password has been successfully reset."}
          color={"bg-green-200"}
        />
      )}
      {alertShow === "failed" && (
        <AlertPassReset
          message={"Password confirmation does not match."}
          color={"bg-red-200"}
        />
      )}

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-sm shadow-[0px_0px_18px_0.5px_#D3D3D3]"
      >
        <h1 className="text-2xl rounded-t-sm text-white bg-[#0A1727] font-regular flex items-center gap-2 p-2 px-5">
          Reset Password
        </h1>
        <div className="px-5 py-3 flex flex-col gap-2">
          {/* <p
            className={clx(
              "text-red-500 text-center text-sm",
              error ? "" : "hidden"
            )}
          >
            Password confirmation does not match.
          </p> */}
          {/* New Password */}
          <div className="flex flex-col">
            <label htmlFor="newpass" className="text-lg">
              New password
            </label>
            <input
              type={showPass ? "text" : "password"}
              name="newpass"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
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
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
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
