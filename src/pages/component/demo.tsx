import React from "react";

export default function Demo() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="bg-gray-800 w-64">
          <div className="text-white text-lg font-semibold p-4 flex items-center">
            Dashboard
          </div>
          <ul className="text-white">
            <li className="p-4 hover:bg-gray-700 cursor-pointer">Dashboard</li>
            <li className="p-4 hover:bg-gray-700 cursor-pointer">Analytics</li>
            <li className="p-4 hover:bg-gray-700 cursor-pointer">Reports</li>
            <li className="p-4 hover:bg-gray-700 cursor-pointer">Settings</li>
          </ul>
        </div>
        {/* Main Content */}
        <div className="flex-1 p-10">
          <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
          <div className="bg-white shadow-md rounded-lg p-6">
            {/* Content Goes Here */}
            <p>This is your dashboard content.</p>
            <p>You can customize and add more content here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
