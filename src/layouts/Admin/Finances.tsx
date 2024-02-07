import Button from "@/pages/component/Button";
import React from "react";

const Finances = () => {
  return (
    <div className="border-2 border-gray-300 m-3 rounded-md p-5 space-y-8 max-h-[80]">
      <div className="h-44 rounded-md bg-[#5584B0] border-2 relative p-5">
        <img className="h-36 absolute right-3 top-5" src="/img/FormCar.png" alt="" />
        <h1 className="text-3xl font-semibold text-white">Enroll Now</h1>
        <p className="text-white">
          Embark on an exhilarating journey into the world of automotive
        </p>
      </div>

      <div className="space-y-5">
        <div className="flex space-x-8">
          <div className="w-1/2">
            <label htmlFor="firstName1">First Name</label>
            <input type="text" id="firstName1" className="inputfields" />
          </div>
          <div className="w-1/2">
            <label htmlFor="lastName1">Last Name</label>
            <input type="text" id="lastName1" className="inputfields" />
          </div>
        </div>

        <div className="flex space-x-8">
          <div className="w-1/2">
            <label htmlFor="Contact Number">Contact Number</label>
            <input type="text" id="Contact Number" className="inputfields" />
          </div>
          <div className="w-1/2">
            <label htmlFor="Email">Email</label>
            <input type="text" id="Email" className="inputfields" />
          </div>
        </div>

        <div className="flex space-x-8">
          <div className="w-1/2">
            <label htmlFor="Category">Category</label>
            <input type="text" id="Category" className="inputfields" />
          </div>
          <div className="w-1/2">
            <label htmlFor="Address">Address</label>
            <input type="text" id="Address" className="inputfields" />
          </div>
        </div>

        <div className="flex space-x-8">
          <div className="w-1/2">
            <label htmlFor="Gender">Gender</label>
            <input type="text" id="Gender" className="inputfields" />
          </div>
          <div className="w-1/2">
            <label htmlFor="Emergency Contact Info">Emergency Contact Info</label>
            <input type="text" id="Emergency Contact Info" className="inputfields" />
          </div>
        </div>

        <div className="flex space-x-8">
          <div className="w-1/2">
            <label htmlFor="Duration">Duration</label>
            <input type="text" id="Duration" className="inputfields" />
          </div>
          <div className="w-1/2">
            <label htmlFor="Price">Price</label>
            <input type="text" id="Price" className="inputfields" />
          </div>
        </div>

        <div className="flex space-x-8">
          <div className="w-1/2">
            <label htmlFor="Category">Category</label>
            <input type="text" id="Category" className="inputfields" />
          </div>
          <div className="w-1/2">
            <label htmlFor="Address">Address</label>
            <input type="text" id="Address" className="inputfields" />
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="Category"
            className="w-5 h-5 mr-4 text-blue-white bg-[#FAFAFF] border-gray-300 rounded focus:ring-white dark:focus:ring-white "
          />
          <label htmlFor="Category" className="text-sm">
            I have read and agree to all the terms and conditions. Once submitted, it
            cannot be cancelled.
          </label>
        </div>

        <div className = "flex justify-center">
            <Button name = "Submit" ></Button>
        </div>
      </div>
    </div>
  );
};

export default Finances;
