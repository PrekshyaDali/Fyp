import React from "react";
import Button from "@/pages/component/Button";
import { useState } from "react";

export default function StudentEdit(props) {
  const [showModal, setShowModal] = useState(false);
  const [crossHandler, setCrossHandler] = useState(false);
 const closeHandler = () => {
    setShowModal(false);
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 text-[#254E7A]">
      <div className="bg-white h-80 p-8 rounded-lg ">
        <div className="flex justify-end">
          <img
            onClick={closeHandler}
            className="h-4"
            src="/img/Cross.png"
            alt=""
          />
        </div>
        <h2 className="text-xl font-semibold mb-4">Edit Student</h2>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-5">
            <div className="flex flex-col ">
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" className="inputfields" />
            </div>
            <div className="flex flex-col max-w-32">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" className="inputfields" />
            </div>
          </div>
          <div className="flex items-center space-x-5">
            <div className="flex flex-col max-w-32">
              <label htmlFor="email">Email</label>
              <input type="text" id="email" className="inputfields " />
            </div>
            <div className="flex flex-col max-w-32">
              <label htmlFor="contactNumber">Contact Number</label>
              <input type="text" id="contactNumber" className="inputfields" />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-center items-center">
          <Button name="Save">Save</Button>
        </div>
      </div>
    </div>
  );
}
