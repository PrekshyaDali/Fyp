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
    reset,
    formState: { errors },
  } = useForm();

  const SubmitHandler = async (data) => {
    try {
      const res = await addVehicle(data).unwrap();
      console.log(res)
      toast.success("Vehicle added successfully");
      reset(); // Reset form after successful submission
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
            <label htmlFor="category">Category</label>
            <select
              {...register("category", {
                required: "Category is required ", // Corrected error message handling
              })}
              className="inputfields"
              name="category"
              id="category"
            >
              <option value="">Select a Category</option> {/* Default empty value */}
              <option value="car">Car</option> {/* Corrected unique value */}
              <option value="bike">Bike</option>
              <option value="scooter">Scooter</option>
            </select>
            {errors.category && <p className="text-red-500">{errors.category.message}</p>}
          </div>
          <div>
            <label htmlFor="quantity">Quantity</label>
            <input
              {...register("quantity", {
                required: "Quantity is required and should be a number",
                min: { value: 1, message: "Quantity should be at least 1" }, // Corrected min value
              })}
              type="number"
              className="inputfields"
              placeholder="Enter quantity"
            />
            {errors.quantity && <p className="text-red-500">{errors.quantity.message}</p>}
          </div>
          <Button name="Save" type="submit" /> {/* Corrected button to submit */}
        </div>
      </form>
    </div>
  );
}
