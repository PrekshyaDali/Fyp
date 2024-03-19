import React, { useState, useEffect } from "react";

import AdminProfile from "@/layouts/Admin/Profile/AdminProfile";
import StudentProfile from "@/layouts/Student/StudentProfile/StudentProfile";
import { useGetProfileQuery } from "@/feature/userApiSlice";


const ProfileLogo = () => {
  const { data } = useGetProfileQuery({ refetchOnMountOrArgChange: true });
  console.log(data);
  const [profileClick, setProfileClick] = useState(false);

  const profileClickHandler = () => {
    setProfileClick((prevProfileClick) => !prevProfileClick);
    console.log(localStorage.getItem("role"));
  };

  useEffect(() => {
    const clickHandlerOutsideProfile = (event) => {
      if (event.target.closest(".mr-2") || event.target.closest(".w-10")) {
        return;
      }
      setProfileClick(false);
    };

    document.body.style.minHeight = "100vh";
    document.body.addEventListener("click", clickHandlerOutsideProfile);

    return () => {
      document.body.removeEventListener("click", clickHandlerOutsideProfile);
    };
  }, [profileClick]);

  return (
    <>
      <div className="mr-2 h-10 w-10 flex flex-col absolute top-2 z-50">
        <img
          onClick={profileClickHandler}
          className="h-10 w-10 object-cover rounded-full "
          src={data?.user?.image}
          alt=""
        />
      </div>
      {profileClick && localStorage.getItem("role") === "admin" && <AdminProfile />}
      {profileClick && localStorage.getItem("role") === "user" && <StudentProfile />}

      {/* {profileClick && <Profile></Profile>} */}
    </>
  );
};
export default ProfileLogo;
