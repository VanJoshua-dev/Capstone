import React, { useState } from "react";
import clx from "clsx";

function AddStaff({ onClose, onSubmit }) {
  const [showPass, setShowPass] = useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !username || !password || !email || !phone) {
      setError("All fields are required.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, user: username, pass: password, email, phone }),
      });

      if (!res.ok) throw new Error("Failed to add staff");

      const data = await res.json();
      onSubmit?.(data); // send data to parent
      onClose(); // close modal
    } catch (err) {
      console.error(err);
      setError("Failed to add staff. Try again.");
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-30 z-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-md shadow-lg"
      >
        <h1 className="text-2xl rounded-t-md text-white bg-[#0A1727] font-regular flex items-center gap-2 p-4">
          Add Staff +
        </h1>

        <div className="px-5 py-4 flex flex-col gap-4">
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}

          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Staff name"
            className="p-2 border-2 border-gray-500 rounded-md"
            required
          />

          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="p-2 border-2 border-gray-500 rounded-md"
            required
          />

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

          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="p-2 border-2 border-gray-500 rounded-md"
            required
          />

          <input
            type="number"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone No."
            className="p-2 border-2 border-gray-500 rounded-md"
            required
          />

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
