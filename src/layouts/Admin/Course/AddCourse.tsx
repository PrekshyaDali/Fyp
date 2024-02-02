
import React, { useState } from "react";
import Button from "@/pages/component/Button";
import { useForm } from "react-hook-form";
import { useAddCourseMutation } from "@/feature/userApiSlice";
import { IAddCourse } from "@/index";
import { toast } from "react-toastify";

export default function AddCourse() {
  // const [selectedFile, setSelectedFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [addCourse, { isLoading }] = useAddCourseMutation();
  const SubmitHandler = async (data: IAddCourse) => {
    try {
      const data1 = {
        courseOverview: data.CourseOverview,
        courseDuration: data.CourseDuration,
        certification: data.certification,
        price: data.price,
       type: data.type,
      };
      const res = await addCourse(data1).unwrap();
      console.log(res, "res");
      toast.success("Course Added Successfully");
      reset();
    } catch (errors) {
      console.log(errors, "err");
      const { data } = errors as { data: { message: string } };
      toast.error(data.message);
    }
  };

  // const handleFileChange = (event) => {
  //   // Get the selected file
  //   const file = event.target.files[0];

  //   // Set the selected file to the state
  //   setSelectedFile(file);

  return (
    <form onSubmit={handleSubmit(SubmitHandler)}>
      <div className="m-5 flex flex-col space-y-5">
        <div>
          <label htmlFor="CourseOverview">Course Overview</label>
          <input
            {...register("CourseOverview", {
              required: "This field is required",
            })}
            type="text"
            id="CourseOverview"
            className="inputfields"
          />
          {errors.CourseOverview && (
            <span className="text-red-500">"This field is required</span>
          )}
        </div>
        <div>
          <label htmlFor="Course Duration">Course Duration</label>
          <input
            {...register("CourseDuration", {
              required: "This field is required",
            })}
            type="text"
            className="inputfields"
            id="Course Duration"
          />
          {errors.CourseDuration && (
            <span className="text-red-500">"This field is required</span>
          )}
        </div>
        <div>
          <label htmlFor="Certification">Certification </label>
          <input
            {...register("certification", {
              required: "This field is required",
            })}
            type="text"
            id="Certification"
            className="inputfields"
          />
          {errors.certification && (
            <span className="text-red-500">"This field is required</span>
          )}
        </div>
        <div>
          <label htmlFor="Price Details">Price Details</label>
          <input
            {...register("price", {
              required: "This field is required",
            })}
            type="text"
            id="Price Details"
            className="inputfields"
          />
          {errors.price && <span className="text-red-500">"This field is required</span>}
        </div>
        <div className="flex space-x-4">
          <select
            className="h-10 w-44 bg-white rounded-md border-2 border-gray-300"
            name=""
            id=""
            {...register("vehicleType", {
              required: "This field is required",
            })}
          >


            <option value="scooter">Scooter</option>
            <option value="bike">Bike</option>
            <option value="car">Car</option>
            {errors.type && <span className="text-red-500">"This field is required</span>}
          </select>
          <input
            type="file"
            accept="image/*" // Allow only image files
            // onChange={handleFileChange}
            className="inputfields w-64"
          />
          {/* {selectedFile && (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Selected Preview"
                className="w-20 h-20 object-cover rounded-md"
              />
            )} */}
        </div>
        <Button isLoading={isLoading} name="Submit"></Button>
      </div>
    </form>
  );
}
