import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function AlertCodeLogin({ message, code }) {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate()
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      navigate("/verify-login")
      setTimeout(() => setCopied(false), 2000); // reset after 2 seconds
    } catch (err) {
      alert("Failed to copy text.");
    }
  };

  return (
    <div className="fixed top-5 bg-white border border-gray-300 shadow-lg px-4 py-3 rounded flex items-center gap-3 z-50">
      <p className="text-gray-800 text-sm">{message}{code}</p>
      <button
        onClick={handleCopy}
        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}

export default AlertCodeLogin;
