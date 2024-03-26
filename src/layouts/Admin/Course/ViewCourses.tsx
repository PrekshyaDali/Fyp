import React, { useEffect, useState } from "react";
import Button from "../../../pages/component/Button";
import { useGetCourseQuery, useEditCourseDetailMutation } from "@/feature/userApiSlice";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function ViewCourses() {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetCourseQuery(id, { refetchOnMountOrArgChange: true });

  const [edit, setEdit] = useState(false);
  const [editCourse] = useEditCourseDetailMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (data) {
      setValue("type", data?.type);
      setValue("courseOverview", data?.courseOverview);
      setValue("courseDescription", data?.courseDescription);
      setValue("certification", data?.certification);
      setValue("price", data?.price);
    }
  }, [data, setValue]);

  const clickEditHandler = () => {
    setEdit(true);
  };

  const onSubmit = async (formData) => {
    try {
      await editCourse({ courseId: id, ...formData });
      setEdit(false);
      toast.success("Course details updated successfully");
    } catch (error) {
      console.error("Error editing course:", error);
      toast.error("Failed to update course details");
    }
  };

  return (
    <div className="p-3 bg-[#E6F0FB] flex flex-col space-y-5 border-2 m-3 rounded-md shadow-md">
      <div>
        <h1 className="text-2xl font-bold">Course Details</h1>
      </div>

      <div className="flex justify-between relative">
        <div className="h-52 w-64 overflow-hidden">
          <img className="object-contain h-52 w-64" src={data?.image} alt="" />
        </div>

        <div className="absolute bottom-3 right-3">
          <button
            onClick={clickEditHandler}
            className="bg-red-800 h-10 px-6 text-white rounded-md hover:bg-red-700 active:bg-red-800"
          >
            Edit Details
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="flex space-x-5 border-2 rounded-md">
          <div className="w-72 flex justify-center font-bold">
            <label htmlFor="Category">Category</label>
          </div>
          <select
            {...register("type")}
            className="w-full bg-white border-2"
            name="type"
            id="type"
            disabled={!edit}
          >
            <option value="Car">Car</option>
            <option value="Bike">Bike</option>
            <option value="Scooter">Scooter</option>
          </select>
        </div>

        <div className="flex space-x-5 border-2 rounded-md">
          <div className="w-72 flex justify-center font-bold">
            <label htmlFor="CourseOverview">Course Overview</label>
          </div>
          <textarea
            {...register("courseOverview")}
            cols={10}
            rows={4}
            className="w-full bg-white border-2"
            disabled={!edit}
          ></textarea>
        </div>

        <div className="flex space-x-5 border-2 rounded-md">
          <div className="w-72 flex justify-center font-bold">
            <label htmlFor="Category">Course Description</label>
          </div>
          <textarea
            {...register("courseDescription")}
            cols={20}
            rows={8}
            className="w-full bg-white border-2 overflow-auto"
            disabled={!edit}
          ></textarea>
        </div>

        <div className="flex space-x-5 border-2 rounded-md">
          <div className="w-72 flex justify-center font-bold">
            <label htmlFor="Category">Certification</label>
          </div>
          <textarea
            {...register("certification")}
            cols={10}
            rows={3}
            className="w-full bg-white border-2"
            disabled={!edit}
          ></textarea>
        </div>

        <div className="flex space-x-5 border-2 rounded-md ">
          <div className="w-72 flex justify-center font-bold">
            <label htmlFor="Price">Price</label>
          </div>
          <input
            {...register("price")}
            type="number"
            className="w-full bg-white border-2"
            disabled={!edit}
          />
        </div>

        {edit && (
          <div className="flex justify-end">
            <Button name="Save Changes"></Button>
          </div>
        )}
      </form>
    </div>
  );
}
