import React from "react";
import { Link } from "react-router-dom";

export default function StudentProfile(props) {
  return (
    <div className="w-64 mt-16 border-2 shadow-md z-50">
    
      <ul>
        <Link to="/user/profile">
          <li className="text-lg font-semibold p-2 h-12 border-b-2 hover:bg-gray-100 cursor-pointer transition-all duration-300 ">
            {" "}
            Profile
          </li>
        </Link>
        <Link to="/user/profile">
          <li className="text-lg font-semibold p-2 h-12 border-b-2 hover:bg-gray-100 cursor-pointer transition-all duration-300 ">
            {" "}
            Settings
          </li>
        </Link>
      </ul>
    </div>
  );
}
