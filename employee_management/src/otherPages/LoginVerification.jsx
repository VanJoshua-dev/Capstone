import React, { useState, useEffect } from "react";
import { MdLogin } from "react-icons/md";
import clx from "clsx";
import bg from "../assets/mdvImage.jpg";
import { useNavigate } from "react-router-dom";
function LoginVerificaton() {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code) {
      setError(true);
    }
    try {
      const response = await fetch("http://localhost:5003/api/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ code }),
        
      });

      const result = await response.json();

      if (!response.ok) {
        setError(true);
        setErrorMessage("Invalid code. Check your email.")
      } else {
        navigate("/staff-dashboard");
      }
    } catch (error) {
      setError(true);
      setErrorMessage("Something went wrong please try again.");
    }
  };
  return (
    <div
      // style={{backgroundImage: `url(${bg})`}}
      className="min-h-screen bg-[#0A1727] w-full flex flex-col bg-center justify-center items-center p-3"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-sm shadow-[0px_0px_18px_0.5px_#D3D3D3]"
      >
        <h1 className="text-2xl rounded-t-sm text-white bg-[#0A1727] font-regular flex items-center gap-2 p-2 px-5">
          Login Verification
        </h1>
        <div className="px-5 py-3 flex flex-col gap-2">
          <p
            className={clx(
              'text-red-500 text-center text-sm bg-red-200 py-2 rounded-sm outline-1',
              error ? "" : "hidden"
            )}
          >
            {errorMessage}
          </p>

          <div className="flex flex-col">
            <label htmlFor="code" className="text-lg">
              Code sent to your email
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              name="code"
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

export default LoginVerificaton;
