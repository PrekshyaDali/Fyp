import { Link, Outlet, useNavigate } from "react-router-dom";
import { Route } from "react-router-dom";
import React from "react";
import { logout } from "@/app/authSlice";
import { useState } from "react";
import { useAppDispatch } from "@/app/store";
import CreateInstructor from "@/layouts/Admin/CreateInstructor";
import DriveSyncLogo from "@/pages/component/DriveSyncLogo";
import Adminprofile from "../../pages/component/ProfileLogo";
import AdminDashboard from "./AdminDashboard";
import Finances from "./Finances";
import Button from "@/pages/component/Button";
import ProfileLogo from "../../pages/component/ProfileLogo";
const AdminLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [ShowSubMenu, setShowSubMenu] = useState(false);

  const toggleSubMenu = () => {
    setShowSubMenu(!ShowSubMenu);
  };
  return (
    <div className="text-[#1E2749]">
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content bg-[#FAFAFF]">
          <div className="h-16 bg-[#FAFAFF] border-b-2 relative flex justify-end">
            <ProfileLogo></ProfileLogo>
          </div>

          <div>
            <label
              htmlFor="my-drawer-2"
              className="bg-[#CBE3EF] h-10 rounded-lg lg:hidden w-14  absolute top-3 flex justify-center items-center"
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
          <ul className="menu p-4 w-52 sm:w-80  text-base-content bg-[#5584B0] border-r-2">
            <div className="fixed z-10 ">
              <DriveSyncLogo></DriveSyncLogo>
            </div>

            <li className="mt-20 text-sm sm:text-base text-white space-y-3 font-bold">
              <Link className="" to="/admin/adminDashboard">
                <img className="h-6" src="/img/dashboard.png" alt="" />
                Dashboard
              </Link>
              <Link to="/admin/createInstructor">
                <img className="h-6" src="/img/Instructor.png" alt="" />
                Create Instructor
              </Link>
              <Link to="/admin/studentDetails">
                <img className="h-6" src="/img/student.png" alt="" />
                Student Details
              </Link>
              <Link to="/admin/instructorDetails">
                <img className="h-6" src="/img/student.png" alt="" />
                Instructor Details
              </Link>
              <div className="relative" onClick={toggleSubMenu}>
                <img className="h-6" src="/img/student.png" alt="" />
                Courses
                <img
                  className="h-6 absolute top-3 right-3"
                  src="/img/submenu.png"
                  alt=""
                />
              </div>
              {ShowSubMenu && (
                <div>
                  <li>
                    <Link to="/admin/AddCourse">
                      <img className="h-6" src="/img/student.png" alt="" />
                      Adding Course Details
                    </Link>
                  </li>
                </div>
              )}

              <Link to="/admin/Finances">
                <img className="h-6 " src="/img/Finance.png" alt="" />
                Finances
              </Link>
            </li>

            <div className="absolute bottom-0 w-full left-0 p-4">
              <Button
                name="Logout"
                onClick={() => {
                  navigate("/login");
                  dispatch(logout());
                }}
              >
                Logout
              </Button>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
