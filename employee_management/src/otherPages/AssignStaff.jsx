import React, { useState } from "react";

function AccountSettings() {
  const [formData, setFormData] = useState({
    name: "Admin Name",
    email: "admin@example.com",
    username: "admin123",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle save/update logic here (API call or local storage)
    console.log("Updated Info:", formData);
    alert("Account info updated!");
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow space-y-4">
      <h2 className="text-xl font-semibold">Account Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            className="w-full border px-3 py-2 rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border px-3 py-2 rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Username</label>
          <input
            type="text"
            name="username"
            className="w-full border px-3 py-2 rounded"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="w-full border px-3 py-2 rounded pr-10"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-sm text-blue-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default AccountSettings;
