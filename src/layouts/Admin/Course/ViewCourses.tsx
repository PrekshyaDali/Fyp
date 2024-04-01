import React, { useEffect, useState } from "react";
import Button from "../../../pages/component/Button";
import { useGetCourseQuery, useEditCourseDetailMutation } from "@/feature/userApiSlice";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { IAddCourse } from "@/index";

export default function ViewCourses() {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetCourseQuery(id, { refetchOnMountOrArgChange: true });
  const [img, setImg] = useState<any>(null);

  const [edit, setEdit] = useState(false);
  const [editCourse, { isLoading }] = useEditCourseDetailMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (data) {
      setValue("image", data?.image);
      setValue("type", data?.type);
      setValue("courseOverview", data?.courseOverview);
      setValue("courseDescription", data?.courseDescription);
      setValue("certification", data?.certification);
      setValue("price", data?.price);
    }
  }, [data, setValue]);

  const fileHandler = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  const clickEditHandler = () => {
    setEdit(true);
  };

  const SubmitHandler = async (data1) => {
    try {
      const formData = new FormData();
      formData.append("type", data1.type);
      formData.append("courseOverview", data1.courseOverview);
      formData.append("courseDescription", data1.courseDescription);
      formData.append("certification", data1.certification);
      formData.append("price", data1.price);
      if (img) {
        formData.append("image", img);
      }

      const res = await editCourse({ id, body: formData }).unwrap();
      console.log(res);
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
        <div className="relative w-80">
          <div className="h-52 w-64 overflow-hidden ">
            <img className="object-contain h-52 w-64" src={data?.image} alt="" />
          </div>
          <div className="h-12 w-12 absolute rounded-md bg-gray-300 hover:bg-gray-400 active:bg-gray-300 flex justify-center items-center right-0 bottom-4">
            <input
              onChange={(e: any) => {
                console.log(e.target.files[0], "files");
                setImg(e.target.files[0]);
              }}
              id="fileInput"
              onClick={fileHandler}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              type="file"
              accept="image/*"
            />
            <img className="h-8" src="/img/edit.png" alt="" />
          </div>
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

      <form onSubmit={handleSubmit(SubmitHandler)} encType="multipart/form-data">
        <div className="flex space-x-5 border-2 rounded-md">
          <div className="w-72 flex justify-center font-bold">
            <label htmlFor="Category">Category</label>
          </div>
          <select
            {...register("type")}
            className="w-full text-black bg-white border-2"
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
            <label htmlFor="CourseDescription">Course Description</label>
          </div>
          <textarea
            {...register("courseDescription")}
            cols={20}
            rows={8}
            className="w-full bg-white border-2 overflow-auto"
            disabled={!edit}
          ></textarea>
          {errors.courseDescription && (
            <span className="text-red-500">{errors.courseDescription.message}</span>
          )}
        </div>

        <div className="flex space-x-5 border-2 rounded-md">
          <div className="w-72 flex justify-center font-bold">
            <label htmlFor="Certification">Certification</label>
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
            <Button name="Save Changes" isLoading={isLoading}></Button>
          </div>
        )}
      </form>
    </div>
  );
}
