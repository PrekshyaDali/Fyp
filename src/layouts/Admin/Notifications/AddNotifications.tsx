import React from "react";
import Button from "@/pages/component/Button";
import { useAddNotificationMutation } from "@/feature/adminApiSlice";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

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
      <h1 className="text-2xl font-bold flex flex-col ">
        <span className="mb-5">Notifications</span>Your Hub For Keeping Users Informed!!
      </h1>
      <form onSubmit={handleSubmit(SubmitHandler)}>
        <div className="flex flex-col">
          <label htmlFor="Add Notifications">Add Notification</label>
          <textarea
            {...register("notification", {
              required: "Notification is required",
            })}
            className="bg-[#FAFAFF] border-2 rounded-l-md"
            name="notification" // Corrected the name attribute
            cols="30"
            rows="10"
          />

          {errors.notification && (
            <span className="text-red-500">{errors.notification.message}</span>
          )}
        </div>
        <div className="mt-5">
          <Button name="Save notification" />
        </div>
      </form>
    </div>
  );
}
