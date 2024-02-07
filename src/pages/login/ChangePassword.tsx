import React from "react";
import Button from "../component/Button";

export default function ChangePassword() {
  return (
    <div className="h-screen bg-[#FAFAFF]">
      {" "}
      {/* Set height to fill entire viewport */}
      <div className="flex justify-center w-full bg-[#FAFAFF] text-[#1E2749]">
        <div className="bg-[#FAFAFF] max-w-sm flex flex-col p-8 rounded-md shadow-lg">
          <h1 className="text-3xl font-semibold text-center mb-5">Change Password</h1>
          <span className="text-center text-sm text-gray-500">
            Please be informed that in order to access your dashboard or account, you are
            required to update your default password.
          </span>
          <form action="" className="mt-6">
            <div className="mb-5">
              <label htmlFor="newPassword" className="block mb-2">
                New Password
              </label>
              <input type="password" id="newPassword" className="inputfields" />
            </div>
            <div className="mb-5">
              <label htmlFor="confirmPassword" className="block mb-2">
                Confirm Password
              </label>
              <input type="password" id="confirmPassword" className="inputfields" />
            </div>
            <div className="flex justify-center">
              <Button name="Change" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
