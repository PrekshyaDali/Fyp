import React from "react";
import Button from "@/pages/component/Button";
import { useGetProfileQuery, userApiSlice } from "@/feature/userApiSlice";

export default function StudentProfileDetails() {
  const { data } = useGetProfileQuery({}, { refetchOnMountOrArgChange: true ,
  
  
});
console.log(data)
  return (
    <div className="flex flex-col space-y-5 p-3 text-[#254E7A]">
      {/* Profile Card */}
      <div className="rounded-lg shadow-md bg-[#F6F7F2] relative">
        <div className="h-16 bg-[#5584B0] text-white flex items-center justify-center "></div>
        <div className="flex flex-col p-4">
          {/* Profile Image Container no*/}

          <div className="h-24 w-24 border-2 border-white rounded-full overflow-hidden absolute top-10">
            <img
              className="w-full h-full object-cover"
              src="/img/People.png"
              alt="Profile"
            />
          </div>

          {/* User Information */}
          <div className="mt-16">
            <div className="flex space-x-2">
              <h1 className="font-semibold text-lg ">{data?.user.firstname}</h1>
              <h1 className="font-semibold text-lg ">{data?.user.lastname}</h1>
            </div>
            <span className="text-sm text-gray-500">{data?.user.email}</span>
          </div>
          <div className="flex justify-end relative">
            <img
              className="h-4 absolute right-28 top-3 mr-2"
              src="/img/edit.png"
              alt=""
            />
            <button className="h-10 bg-[#254E7A] rounded-md text-white border-2 w-36 hover:bg-[#82C2E6] hover:active:bg-[#254E7A]">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Contact Information Card */}
      <div className="shadow-md p-4 rounded-md bg-[#F6F7F2] ">
        <div>
          <h1 className="font-bold text-lg mb-3">Contact Information</h1>
        </div>
        <div className="text-sm text-gray-500 space-y-3">
          {/* Contact Info Items */}
          <div className="flex items-center space-x-4">
            <img className="h-4" src="/img/number.png" alt="" />
            <span>{data?.user.contactnumber}</span>
          </div>
          <div className="flex items-center space-x-4">
            <img className="h-4" src="/img/location.png" alt="" />
            <span>Add location</span>
          </div>
          <div className="flex items-center space-x-4">
            <img className="h-4" src="/img/email.png" alt="" />
            <span>{data?.user.email}</span>
          </div>
          <div className="flex items-center space-x-4">
            <img className="h-4" src="/img/role.png" alt="" />
            <span>{data?.user.role}</span>
          </div>
        </div>
      </div>

      <div className="p-3 shadow-md bg-[#F6F7F2] h-12 flex items-center rounded-md justify-between">
        <h1 className="font-bold">Change Password</h1>
        {/* Add your button here */}
        <button className="h-10  rounded-md text-[#254E7A] border-2 w-36 hover:bg-[#82C2E6] hover:active:bg-[#254E7A]">
          Change
        </button>
      </div>
    </div>
  );
}
