import React from "react";
import Upload from "./Upload";
import DriveSyncLogo from "./DriveSyncLogo";
import Button from "./Button";

const InstructorForm = () => {
  return (
    <>
      <DriveSyncLogo />
      <div className="bg-[#FAFAFF] h-[#100vh] w-full p-5 text-[#1E2749] flex justify-center ">
        <form className=" sm:w-8/12 border-2 flex flex-col items-center py-2 px-8 relative">
          <h1 className="text-3xl font-bold mb-6">Instructor Information Details</h1>
          <div className="flex flex-col md:flex-row md:space-x-4 w-full mb-4">
            <div className="mb-4 md:w-1/2">
              <label htmlFor="FirstName" className="block mb-1">
                First Name
              </label>
              <input type="text" className="inputfields w-full" />
            </div>
            <div className="mb-4 md:w-1/2">
              <label htmlFor="LastName" className="block mb-1">
                Last Name
              </label>
              <input type="text" className="inputfields w-full" />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4 w-full mb-4">
            <div className="mb-4 md:w-1/2">
              <label htmlFor="ContactNumber" className="block mb-1">
                Contact Number
              </label>
              <input type="text" className="inputfields w-full" />
            </div>
            <div className="mb-4 md:w-1/2">
              <label htmlFor="Email" className="block mb-1">
                Email
              </label>
              <input type="text" className="inputfields w-full" />
            </div>
          </div>
          <div className="flex flex-col w-full mb-4">
            <span className="block mb-1">Date of Birth (BS)</span>
            <div className="flex flex-row w-full space-x-4">
              <div className="w-1/3">
                <label htmlFor="Year" className="block mb-1">
                  Year
                </label>
                <input type="text" className="inputfields w-full" id="Year" />
              </div>
              <div className="w-1/3">
                <label htmlFor="Month" className="block mb-1">
                  Month
                </label>
                <input type="text" className="inputfields w-full" />
              </div>
              <div className="w-1/3">
                <label htmlFor="Day" className="block mb-1">
                  Day
                </label>
                <input type="text" className="inputfields w-full" />
              </div>
            </div>
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="Address" className="block mb-1">
              Address
            </label>
            <input type="text" className="inputfields w-full" />
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="GuardianDetails" className="block mb-1">
              Guardian Details
            </label>
            <div id="GuardianDetails" className="flex flex-col md:flex-row md:space-x-4">
              <input
                placeholder="Guardian Name*"
                type="text"
                className="inputfields w-full mb-2 md:mb-0"
              />
              <input
                placeholder="Contact Number"
                type="text"
                className="inputfields w-full"
              />
            </div>
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="DrivingLicense" className="block mb-1">
              Driving License
            </label>
            <Upload />
          </div>
          <div className="absolute right-8 bottom-6cd">
            <Button name="Submit"></Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default InstructorForm;
