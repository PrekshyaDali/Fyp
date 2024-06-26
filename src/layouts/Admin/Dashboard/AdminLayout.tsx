import { Link, Outlet, useNavigate } from "react-router-dom";
import { Route } from "react-router-dom";
import React from "react";
import { logout } from "@/app/authSlice";
import { useState } from "react";
import { useAppDispatch } from "@/app/store";
import CreateInstructor from "@/layouts/Admin/CRUD/CreateInstructor";
import DriveSyncLogo from "@/pages/component/DriveSyncLogo";
import Adminprofile from "../../../pages/component/ProfileLogo";
import AdminDashboard from "./AdminDashboard";
import Finances from "./RegularCustomers";
import Button from "@/pages/component/Button";
import ProfileLogo from "../../../pages/component/ProfileLogo";

const AdminLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showInstructorSubMenu, setShowInstructorSubMenu] = React.useState(false);
  const [showCoursesSubMenu, setShowCoursesSubMenu] = React.useState(false);

  const toggleInstructorSubMenu = () => {
    setShowInstructorSubMenu(!showInstructorSubMenu);
  };

  const toggleCoursesSubMenu = () => {
    setShowCoursesSubMenu(!showCoursesSubMenu);
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
          <ul className="menu p-4 w-52 sm:w-72  text-base-content bg-[#5584B0] ">
            <div className="fixed z-10 ">
              <DriveSyncLogo></DriveSyncLogo>
            </div>

            <li className="mt-16 text-sm sm:text-sm text-white space-y-2 font-bold">
              <Link className="" to="/admin/adminDashboard">
                <img className="h-6" src="/img/dashboard.png" alt="" />
                Dashboard
              </Link>
              <div className="relative" onClick={toggleInstructorSubMenu}>
                <img className="h-6" src="/img/Instructor.png" alt="" />
                Instructor
                <img
                  className="h-6 absolute top-3 right-3"
                  src="/img/submenu.png"
                  alt=""
                />
              </div>
              {showInstructorSubMenu && (
                <div className="flex flex-col">
                  <li>
                    <Link to="/admin/createInstructor">
                      <img className="h-6" src="/img/Instructor.png" alt="" />
                      Create Instructor
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/instructorDetails">
                      <img className="h-6" src="/img/Instructor.png" alt="" />
                      Instructor Details
                    </Link>
                  </li>
                </div>
              )}
              <div className="relative" onClick={toggleCoursesSubMenu}>
                <img className="h-6" src="/img/courses.png" alt="" />
                Courses
                <img
                  className="h-6 absolute top-3 right-3"
                  src="/img/submenu.png"
                  alt=""
                />
              </div>
              {showCoursesSubMenu && (
                <div className="flex flex-col">
                  <li>
                    <Link to="/admin/AddCourse">
                      <img className="h-6" src="/img/student.png" alt="" />
                      Adding Course Details
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/viewCourse">
                      <img className="h-6" src="/img/student.png" alt="" />
                      View Courses
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/customizeCourse">
                      <img className="h-6" src="/img/student.png" alt="" />
                      Customize Course
                    </Link>
                  </li>
                </div>
              )}
              <Link to="/admin/studentDetails">
                <img className="h-6" src="/img/student.png" alt="" />
                Student Details
              </Link>
              <Link to="/admin/regularCustomers">
                <img className="h-6 " src="/img/Finance.png" alt="" />
                Regular Customers
              </Link>
              <Link to="/admin/viewNotices">
                <img className="h-6 " src="/img/notice.png" alt="" />
                Notices
              </Link>
              <Link to="/admin/Vehicles">
                <img className="h-6 " src="/img/vehicles.png" alt="" />
                Vehicles
              </Link>
              <Link to="/admin/Finances">
                <img className="h-6 " src="/img/Finance.png" alt="" />
                Finances
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
