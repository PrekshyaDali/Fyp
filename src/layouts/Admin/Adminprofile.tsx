import React from "react";
import Profile from "../../pages/component/Profile";
const Adminprofile = () => {
  const [profileClick, setProfileClick] = React.useState(false);
  const profileClickHandler = () => {
    setProfileClick(!profileClick);
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
      {profileClick && <Profile></Profile>}
    </>
  );
};
export default Adminprofile;
