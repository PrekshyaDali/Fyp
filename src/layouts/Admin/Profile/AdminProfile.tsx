import React from "react";
import { Link } from "react-router-dom";

export default function AdminProfile(props) {
  return (
    <div className="absolute top-0 w-64 mt-16 border-2 bg-white shadow-md z-50">
      <ul>
        <Link to="/admin/profile">
          <li className="text-lg font-semibold p-2 h-12 border-b-2 hover:bg-gray-100 cursor-pointer transition-all duration-300 ">
            Profile
          </li>
        </Link>
        <Link to="/admin/profile">
          <li className="text-lg font-semibold p-2 h-12 border-b-2 hover:bg-gray-100 cursor-pointer transition-all duration-300 ">
            Settings
          </li>
        </Link>
      </ul>
    </div>
  );
}
