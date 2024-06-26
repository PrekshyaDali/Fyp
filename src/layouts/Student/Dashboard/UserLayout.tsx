import { Link, Outlet } from "react-router-dom";
import React, { useState } from "react";
import { logout } from "@/app/authSlice";
import { useAppDispatch } from "@/app/store";
import DriveSyncLogo from "@/pages/component/DriveSyncLogo";
import ProfileLogo from "../../../pages/component/ProfileLogo";

const UserLayout = () => {
  const dispatch = useAppDispatch();
  const id = localStorage.getItem("id");
  const [settingsOpen, setSettingsOpen] = useState(false);

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };

  return (
    <div className="text-[#1E2749]">
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content bg-[#F7FAFC] ">
          <div className="h-16 bg-[#FAFAFF] border-b-2 relative flex justify-end">
            <ProfileLogo />
          </div>

          <div>
            <label
              htmlFor="my-drawer-2"
              className="bg-[#CBE3EF] h-10 rounded-lg lg:hidden w-14 absolute top-3 flex justify-center items-center"
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
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-2 sm:p-4 w-56 sm:w-72 text-sm bg-[#5584B0]">
            <div className="fixed z-10">
              <DriveSyncLogo />
            </div>

            <li className="mt-16 text-sm sm:text-sm text-white space-y-2 font-bold">
              <Link to="/user/StudentDashboard">
                <img className="h-5" src="/img/home.png" alt="" />
                Home
              </Link>
              <Link to="/user/courses">
                <img className="h-5" src="/img/Enrollment.png" alt="" />
                Courses/Enrollment
              </Link>
              <Link to={`/user/mycourses`}>
                <img className="h-5" src="/img/mycourses.png" alt="" />
                My Courses
              </Link>
              <Link to="/user/Notifications">
                <img className="h-5" src="/img/notification.png" alt="" />
                Notices
              </Link>
              <Link to="/user/vehiclesAvailability">
                <img className="h-5" src="/img/vehicles_availability.png" alt="" />
                Vehicles Availability
              </Link>

              <div className="relative" onClick={toggleSettings}>
                <img className="h-6" src="/img/settings.png" alt="" />
                Settings
                <img
                  className="h-6 absolute top-3 right-3"
                  src="/img/submenu.png"
                  alt=""
                />
              </div>
              {settingsOpen && (
                <div className="flex flex-col">
                  <li>
                    <Link to="/user/profile">
                      <img className="h-5" src="/img/profile.png" alt="" />
                      Profile
                    </Link>
                  </li>
                  <li className="">
                    <Link to="/user/termsandcondition">
                      <img className="h-5 " src="/img/TC.png" alt="" />
                      Terms and condition
                    </Link>
                  </li>
                  <li className="">
                    <Link to="/user/contactUs">
                      <img className="h-5 " src="/img/contactus.png" alt="" />
                      Contact Us
                    </Link>
                  </li>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
