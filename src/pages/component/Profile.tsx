import React from "react";
import { Link } from "react-router-dom";

export default function Profile(props) {
  return (
    <div className="w-64 mt-16 border-2 shadow-md">
      <ul>
        <Link to="/admin/profile">
          <li className="text-lg font-semibold p-2 h-12 border-b-2 hover:bg-gray-100 cursor-pointer transition-all duration-300">
            {" "}
            Profile
          </li>
        </Link>
        <li className="text-lg font-bold p-2 h-12 border-b-2 hover:bg-gray-100 cursor-pointer transition-all duration-300">
          <Link to="admin/settings">Settings</Link>
        </li>
      </ul>
    </div>
  );
}
