import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0A1727] w-screen h-screen flex flex-col justify-center items-center gap-4 text-white">
      <h1 className="text-3xl font-semibold">404 - Page Not Found :(</h1>
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
      >
        Back to previous page
      </button>
    </div>
  );
}

export default NotFound;
