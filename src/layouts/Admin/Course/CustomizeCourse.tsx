import { useAddCustomizeCourseMutation } from "@/feature/adminApiSlice";
import Button from "@/pages/component/Button";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CustomizeCourse() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [customizeCourse] = useAddCustomizeCourseMutation();
  const SubmitHandler = async (data) => {
    try {
      await customizeCourse(data).unwrap();
      reset();
      toast.success("Course customized successfully")
    } catch (error) {
      console.log(error);
      toast.error("Failed to customize course")
    }
  };
  return (
    <form
      onSubmit={handleSubmit(SubmitHandler)}
      action="
    "
    >
      <div className="p-5 flex flex-col space-y-5 ">
        <p className="text-lg font-bold ">
          Customize the pricing of your institute's services
        </p>
        <div>
          <label htmlFor="category"> Category</label>
          <select
            {...register("category", {
              required: "This field is required",
            })}
            className="inputfields"
            name=""
            id=""
          >
            <option value="car">Car</option>
            <option value="car">Bike</option>
            <option value="car">Scooter</option>
          </select>
        </div>

        <div>
          <label htmlFor="basePrice">Price per day (Rs)</label>
          <input
            {...register("basePricePerDay", {
              required: "This field is required",
            })}
            type="number"
            className="inputfields"
          />
        </div>

        <div className="flex flex-col space-x-0 space-y-5 sm:flex-row sm:space-y-0 sm:space-x-5 ">
          <div className="w-full">
            <label htmlFor="Discount_threshold">Discount Threshold (days)</label>
            <input
              {...register("thresholdDays", {
                required: "This field is required",
              })}
              type="number"
              className="inputfields"
            />
          </div>

          <div className="w-full">
            <label htmlFor="basePrice">Discount (%)</label>
            <input
            {...register("discountPercent", {
              required: "This field is required",
            })}
            type="number" className="inputfields" />
          </div>
        </div>

        <div>
          <label htmlFor="basePrice">Maximum discount (Rs)</label>
          <input
          {...register("maxDiscount",{
            required: "This field is required",
          })}
          type="number" className="inputfields" />
        </div>
        <Button name="Submit"></Button>
        <div className="space-y-5 text-gray-500">
          <p>
            Package Duration: This is where you'll input the number of days for the
            driving course package. For example, if a package lasts for 10 days, you'll
            enter "10" in this field.
          </p>
          <p>
            Calculate Discount Button: After entering the package duration, you'll click
            on this button to calculate the discount rate. Think of it like pressing a
            button to see how much discount you can offer for that particular package
            duration. Discount
          </p>
          <p>
            Rate Display: Once you've clicked the button, the system will show you the
            discount rate applicable for the entered package duration. This is important
            as it helps you understand how much discount you can provide to customers,
            making pricing decisions easier.
          </p>
        </div>
      </div>
    </form>
  );
}
