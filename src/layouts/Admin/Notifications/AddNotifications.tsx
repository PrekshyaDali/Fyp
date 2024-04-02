import React from "react";
import Button from "@/pages/component/Button";

export default function AddNotifications() {
  return (
    <div className="w-full h-full p-3 border-2 m-3 rounded-md flex flex-col gap-5">
        <h1 className = "text-2xl font-bold flex flex-col "><span classname = "mb-5">Notifications</span>Your Hub For Keeping Users Informed!!</h1>
      <form action="">
        <div className="flex flex-col">
          <label htmlFor="Add Notifications">Add Notification</label>
          <textarea
            className="bg-[#FAFAFF] border-2 rounded-l-md"
            name=""
            id=""
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <div className = "mt-5">
          <Button name="Save notification"></Button>
        </div>
      </form>
    </div>
  );
}
