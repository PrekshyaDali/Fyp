import React from "react";
import Button from "@/pages/component/Button";
const CreateInstuctor = () => {
    return (
      <div className="h-full border-2 border-solid border-gray p-10 flex flex-col space-y-8 shadow-md">
        <div className="flex space-x-10">
          <div>
            <label htmlFor="FirstName">FirstName</label>
            <input type="text" id="FirstName" className="inputfields" />
          </div>

          <div>
            <label htmlFor="LastName">LastName</label>
            <input type="text" id="LastName" className="inputfields" />
          </div>
        </div>

        <div>
          <label htmlFor="Email">Email</label>
          <input type="text" id="Email" className="inputfields" />
        </div>
        <div>
          <label htmlFor="Password">Password</label>
          <input type="password" id="Password" className="inputfields" />
        </div>
        <div>
            <label htmlFor="ConfirmPassword">ConfirmPassword</label>
            <input
                type="password"
                id="ConfirmPassword"
                className="inputfields"
            />
        </div>
        <Button name="Create Instructor"></Button>
      </div>
    );
}
export default CreateInstuctor;