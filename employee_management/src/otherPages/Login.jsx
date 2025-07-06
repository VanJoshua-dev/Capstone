import React, { useState, useEffect } from "react";
import { MdLogin } from "react-icons/md";
import clx from "clsx";
import bg from "../assets/mdvImage.jpg";
import { useNavigate } from "react-router-dom";
import AlertCodeLogin from "../alerts/AlertCodeLogin";
function Login() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [myerror, setError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (myerror) {
      const timer = setTimeout(() => setError(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [myerror]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:5003/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include"
      });

      const result = await response.json();

      // const fullName = result.employee.fullName
      // const nameParts = fullName.trim().split(" ");

      // let firstName;
      // if (nameParts.length >= 2) {
      //   firstName = nameParts[0] + " " + nameParts[1]; // "Van Joshua"
      // } else {
      //   firstName = nameParts[0]; // fallback for single-word name
      // }

      // console.log(firstName);

      if (!response.ok) {
        setError(true);
      } else {
        navigate("/verify-login");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1727] w-full flex flex-col justify-center items-center p-3">
      <h1 className="text-2xl text-white text-center font-bold mb-10 lg:text-3xl">
        Welcome to Click&Bounce
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-sm shadow-[0px_0px_18px_0.5px_#D3D3D3]"
      >
        <h1 className="text-2xl rounded-t-sm text-white bg-[#0A1727] font-regular flex items-center gap-2 p-2 px-5">
          Login <MdLogin />
        </h1>
        <div className="px-5 py-3 flex flex-col gap-2">
          <p
            className={clx(
              "text-red-500 text-center text-sm",
              myerror ? "" : "hidden"
            )}
          >
            Incorrect username or password
          </p>

          <div className="flex flex-col">
            <label htmlFor="username" className="text-lg">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-lg">
              Password
            </label>
            <input
              type={showPass ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="flex flex-row justify-between items-start sm:items-center gap-2">
            <div className="flex items-center gap-2">
              <input
                onChange={() => setShowPass(!showPass)}
                checked={showPass}
                type="checkbox"
                className="w-5 h-5"
              />
              <label className="text-sm">Show password</label>
            </div>
            <button
              className="text-sm text-blue-500 hover:underline"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
