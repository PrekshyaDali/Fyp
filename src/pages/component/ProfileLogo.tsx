import React from "react";

import AdminProfile from "@/layouts/Admin/Profile/AdminProfile";
import StudentProfile from "@/layouts/Student/Profile/StudentProfile";
const ProfileLogo = () => {
  const [profileClick, setProfileClick] = React.useState(false);
  const profileClickHandler = () => {
  setProfileClick(prevProfileClick => !prevProfileClick);
  console.log(localStorage.getItem("role"));
};


  return (
    <>
      <div className="mr-2 flex flex-col absolute top-2 z-50">
        <img
          onClick={profileClickHandler}
          className="w-10 "
          src="/img/UserProfile.png"
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
