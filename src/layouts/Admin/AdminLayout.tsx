import { Link, Outlet, useNavigate } from "react-router-dom";
import { Route } from "react-router-dom";
import { logout } from "@/app/authSlice";
import { useState } from "react";
import { useAppDispatch } from "@/app/store";
import CreateInstructor from "@/layouts/Admin/CreateInstructor";
import DriveSyncLogo from "@/pages/component/DriveSyncLogo";
import Adminprofile from "./Adminprofile";
import AdminDashboard from "./AdminDashboard";
import Finances from "./Finances";
const AdminLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="text-[#1E2749]">
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content bg-[#F7FAFC]">
          <div className="h-16 bg-[#FAFAFF] border-b-2 relative flex justify-end">
            <Adminprofile></Adminprofile>
          </div>

          <div>
            <label
              htmlFor="my-drawer-2"
              className="bg-[#E4D9FF] h-10 rounded-lg lg:hidden w-14  absolute top-3 flex justify-center items-center"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </label>
          </div>

          <main>
            <Outlet />
          </main>
        </div>
        <div className="drawer-side ">
          <label htmlFor="my-drawer-2" className="drawer-overlay "></label>
          <ul className="menu p-4 w-52 sm:w-80  text-base-content bg-[#FAFAFF] border-r-2">
            <div className="fixed z-10 ">
              <DriveSyncLogo></DriveSyncLogo>
            </div>

            <li className="mt-16 text-sm sm:text-base text-[#273469] space-y-3 font-bold">
              <Link to="/admin/adminDashboard">
                <img src="" alt="" />
                Dashboard
              
              </Link>
              <Link to="/admin/createInstructor">Create Instructor</Link>
              <Link to="/admin/studentDetails">Student Details</Link>
              <Link to="/admin/Finances">Finances</Link>
            </li>

            <div className="absolute bottom-0 w-full left-0 p-4">
              <button
                className="btn w-full text-center text-white"
                onClick={() => {
                  navigate("/login");
                  dispatch(logout());
                }}
              >
                Logout
              </button>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
