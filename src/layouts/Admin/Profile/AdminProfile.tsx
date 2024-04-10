import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/app/authSlice";

export default function AdminProfile(props) {
  const dispatch = useDispatch();
  return (
    <div className="absolute top-0 w-64 mt-16 border-2 bg-white shadow-md z-50">
      <ul>
        <Link to="/user/profile">
          <li className="text-md font-semibold p-2 h-12 border-b-2 hover:bg-gray-100 cursor-pointer transition-all duration-300 ">
            {" "}
            Profile
          </li>
        </Link>

        <div
          onClick={() => dispatch(logout())}
          className="flex justify-between pr-4 hover:bg-gray-100 cursor-pointer transition-all duration-300"
        >
          <li className="text-md font-semibold p-2 h-12 border-b-2  "> Logout</li>
          <img className="h-6 mt-2" src="/img/logout.png" alt="" />
        </div>
      </ul>
    </div>
  );
}
