// AddVehicles.js
import React from "react";
import Button from "@/pages/component/Button";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAddVehiclesMutation } from "@/feature/adminApiSlice";

export default function AddVehicles() {
  const [addVehicle] = useAddVehiclesMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const SubmitHandler = async (data) => {
    try {
      const res = await addVehicle(data).unwrap();
      console.log(res);
      toast.success("Vehicle added successfully");
    } catch (err) {
      console.error("Error adding vehicle:", err);
      toast.error("Failed to add vehicle");
    }
  };

  return (
    <div className="p-3">
      <form onSubmit={handleSubmit(SubmitHandler)}>
        <div className="m-3 p-3 border-2 rounded-md flex flex-col space-y-5">
          <div>
            <h1 className="text-2xl font-semibold">Add Vehicles</h1>
            <p>Add vehicles to your driving institute</p>
          </div>
          <div>
            <label htmlFor="unique_id">Unique Id</label>
            <input
              {...register("unique_id", {
                required: "Unique Id is required",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Unique Id should be a valid number",
                },
              })}
              type="text"
              className={`inputfields ${errors.unique_id ? "input-error" : ""}`}
            />
            {errors.unique_id && (
              <p className="text-red-500">{errors.unique_id.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <select
              {...register("category", { required: "Category is required" })}
              className={`inputfields ${errors.category ? "input-error" : ""}`}
            >
              <option value="">Select a Category</option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="scooter">Scooter</option>
            </select>
            {errors.category && <p className="text-red-500">{errors.category.message}</p>}
          </div>
          <Button name="Save" type="submit" />
        </div>
      </form>
    </div>
  );
}
