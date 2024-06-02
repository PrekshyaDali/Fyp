import React from "react";
import Button from "@/pages/component/Button";
import { useAddNotificationMutation } from "@/feature/adminApiSlice";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import BackButton from "@/pages/component/BackButton";
import { createEditor } from "slate";

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";
export default function AddNotifications() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [AddNotifications, isLoading] = useAddNotificationMutation();

  const SubmitHandler = async (data) => {
    try {
      const res = await AddNotifications(data).unwrap();
      console.log(res);
      toast.success("Notification added successfully");
      reset();
    } catch (error) {
      console.log(error);
      toast.error("Error adding notification");
    }
  };

  return (
    <div className="w-full h-full p-3 border-2 m-3 rounded-md flex flex-col gap-5">
      <div>
        <BackButton></BackButton>
      </div>
      <h1 className="text-2xl font-bold flex flex-col ">
        <span className="mb-5">Notices</span>Your Hub For Keeping Users Informed!!
      </h1>
      <form onSubmit={handleSubmit(SubmitHandler)}>
        <div className="mb-5">
          <label htmlFor="">Expiry Date</label>
          <input
            {...register("expires_at", {
              required: { value: true, message: "This field is required" },
            })}
            className="inputfields"
            type="date"
            min = {new Date().toISOString().split("T")[0]}
          />
          <style>
            {`
                    input[type="date"]::-webkit-calendar-picker-indicator {
                    filter: invert(1);
                    }
                  `}
          </style>
          {errors.expires_at && (
            <span className="text-red-500">{String(errors.expires_at.message)}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="Add Notifications">Add Notices</label>
          <textarea
            {...register("notification", {
              required: "Notification is required",
            })}
            className="bg-[#FAFAFF] border-2 rounded-l-md focus-visible:outline-none p-3"
            name="notification" // Corrected the name attribute
            cols="30"
            rows="10"
          />

          {errors.notification && (
            <span className="text-red-500">{errors.notification.message}</span>
          )}
        </div>
        <div className="mt-5">
          <Button name="Save" />
        </div>

      </form>
    </div>
  );
}
