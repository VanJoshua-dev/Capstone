import React, { useState, useEffect } from "react";
import { MdLogin } from "react-icons/md";
import clx from "clsx";
import bg from "../assets/mdvImage.jpg";
import { useNavigate } from "react-router-dom";
function Login() {
  //navigation
  const navigate = useNavigate()

  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //Clear error 
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        
      }, 2000); // 5 seconds

      return () => clearTimeout(timer);
    }
  }, [error]);

  //handle submit
 const handleSubmit = (e) => {
    e.preventDefault();
    // your login logic here
    if(username === "test" && password === "testpass"){
      navigate('/admin-dashboard')
    }else{
      setError(true)
    }
  };
  return (
    <div
      // style={{backgroundImage: `url(${bg})`}}
      className="min-h-screen bg-[#0A1727] w-full flex flex-col bg-center justify-center items-center p-3"
    >
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
              error ? "" : "hidden"
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
              value={username} // ✅ value should be the actual state
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-lg">
              Password
            </label>
            <input
              type={showPass ? "text" : "password"}
              name="password"
              value={password} // ✅ value should be the actual state
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
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
            <a
              href="/forgot-password"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot password?
            </a>
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
