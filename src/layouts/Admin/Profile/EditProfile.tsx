import React, { useEffect, useState } from "react";
import Button from "../../../pages/component/Button";
import { useGetImgQuery, useGetProfileQuery, userApiSlice } from "@/feature/userApiSlice";
import { Link, useParams } from "react-router-dom";
import { useEditUsersQuery, useEditProfileDetailsMutation } from "@/feature/userApiSlice";
import BackButton from "@/pages/component/BackButton";
import { set, useForm } from "react-hook-form";
import { IEditProfile } from "@/index";
import { toast } from "react-toastify";

export default function EditProfile() {
  const [img, setImg] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const { id } = useParams<{ id: string }>();
  const { data: userData, isLoading: isUserDataLoading } = useEditUsersQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  const [editProfile] = useEditProfileDetailsMutation();

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayFormatted = yesterday.toISOString().split("T")[0];

  React.useEffect(() => {
    if (userData) {
      setValue("firstname", userData?.firstname);
      setValue("lastname", userData?.lastname);
      setValue("email", userData?.email);
      setValue("contactnumber", userData?.contactnumber);
      if (userData?.dob) {
        setValue("dob", new Date(userData.dob).toISOString().split("T")[0]);
      }
      setValue("emergencycontactnumber", userData?.emergencycontactnumber);
      setValue("gender", userData?.gender);
      setValue("address", userData?.address);
      setImg(userData?.image ? new Blob([userData?.image]) : null);
    
    }
  }, [userData, setValue]);
  console.log(userData?.image)


  const SubmitHandler = async (data1: IEditProfile) => {
    try {
      console.log(data1, "data1");
      const formData = new FormData();
      formData.append("id", id);
      formData.append("firstname", data1.firstname);
      formData.append("lastname", data1.lastname);
      formData.append("email", data1.email);
      formData.append("contactnumber", data1.contactnumber.toString());
      formData.append("dob", data1.dob.toString());
      formData.append("emergencycontactnumber", data1.emergencycontactnumber.toString());
      formData.append("gender", data1.gender);
      formData.append("address", data1.address);
       if (img) {
         formData.append("image", img);
       }
      const res = await editProfile({ formData, id }).unwrap();
      console.log(data1.dob);
      console.log(res);
      toast.success("User details updated successfully!");
    } catch (error) {
      console.log(error, "err");
      toast.error("Failed to update user details");
    }
  };
  console.log(img, "img");

  return (
    <>
      {id && (
        <form
          onSubmit={handleSubmit(SubmitHandler)}
          action={`/editProfile/${id}`}
          method="POST"
          encType="multipart/form-data"
        >
          <p className="ml-5 text-2xl font-bold">Profile Details</p>
          <span className="ml-5 text-sm text-gray-500">
            Fill in the details to update your profile
          </span>

          <div className="h-screen w-full mt-5  p-5 rouded-lg space-y-8 ">
            <div className="flex justify-between relative">
              <div className="h-32 w-32 sm:h-52 sm:w-52 flex flex-col justify-center items-center ">
                <div className="h-32 w-32 sm:h-52 sm:w-52 rounded-full border-gray-400 border-2">
                  <img
                    className="object-cover rounded-full h-32 w-32 sm:h-52 sm:w-52"
                    src={img instanceof Blob ? URL.createObjectURL(img) : img}
                    alt=""
                  />
                  {console.log(img)}
                </div>

                <h1 className="text-lg font-semibold  ">
                  {userData?.firstname} <span> {userData?.lastname} </span>
                </h1>
                <span className="text-sm text-gray-400"> {userData?.email}</span>
              </div>

              <div className="absolute right-2 bottom-2">
                <div className="flex relative ">
                  <label
                    id="uploadButton"
                    className="flex justify-end bg-red-900 text-xs sm:text-base text-white pl-2 pr-6 py-2 sm:pl-5 sm:pr-12  sm:py-2 rounded-md hover:bg-blue-300 hover:active:bg-red-800"
                    // Triggering click event
                    onClick={() => {
                      // document.getElementById("fileInput").click();
                    }}
                    htmlFor="fileInput"
                  >
                    Change Profile
                  </label>
                  <input
                    {...register("image")}
                    name="image"
                    id="fileInput"
                    onChange={(e: any) => {
                      console.log(e.target.files[0], "files");
                      setImg(e.target.files[0]);
                    }}
                    className="hidden" // Hide the file input
                    type="file"
                  />
                  <img
                    className=" h-3 sm:h-5 absolute top-2.5 right-1 sm:right-2 sm:top-2 "
                    src="/img/edit.png"
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col space-x-0 space-y-5 sm:space-y-0 sm:flex-row sm:space-x-5 ">
              <div className="flex flex-col w-full">
                <label htmlFor="FirstName">First Name</label>
                <input
                  // defaultValue={userData?.firstname}
                  {...register("firstname", {
                    required: "First Name is required",
                  })}
                  className="inputfields"
                  id="FirstName"
                  type="text"
                />
                {errors.firstname && (
                  <p className="text-red-500">{String(errors.firstname.message)}</p>
                )}
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="lastname">Last Name</label>
                <input
                  // defaultValue={userData?.lastname}
                  className="inputfields"
                  id="LastName"
                  type="text"
                  {...register("lastname", {
                    required: "Last Name is required",
                  })}
                />
                {errors.lastname && (
                  <p className="text-red-500">{String(errors.lastname.message)}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col space-x-0 space-y-5 sm:space-y-0 sm:flex-row sm:space-x-5 ">
              <div className="flex flex-col w-full">
                <label htmlFor="Email">Email</label>
                <input
                  // defaultValue={userData?.email}
                  className="inputfields"
                  id="Email"
                  type="text"
                  {...register("email", {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500">{String(errors.email.message)}</p>
                )}
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="ContactNumber">Contact Number</label>
                <input
                  className="inputfields"
                  id="contactnumber"
                  type="text"
                  {...register("contactnumber", {
                    pattern: {
                      value: /^[0-9]{1,10}$/,
                      message: "Number should be of 10 digits",
                    },
                  })}
                />
                {errors.contactnumber && (
                  <p className="text-red-500">{String(errors.contactnumber.message)}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col space-x-0 space-y-5 sm:space-y-0 sm:flex-row sm:space-x-5 ">
              <div className="flex flex-col w-full">
                <label htmlFor="Gender">Gender</label>
                <select
                  {...register("gender")}
                  className="inputfields"
                  name="gender"
                  id="Gender"
                >
                  <option value="male"> Male</option>
                  <option value="female"> Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500">{String(errors.gender.message)}</p>
                )}
              </div>

              <div className="flex flex-col w-full">
                <label htmlFor="Address">Address</label>
                <input
                  {...register("address")}
                  className="inputfields"
                  id="Address"
                  type="text"
                />
                {errors.address && <p className="text-red-500">This field is required</p>}
              </div>
            </div>

            <div className="flex flex-col space-x-0 space-y-5 sm:space-y-0 sm:flex-row sm:space-x-5 ">
              <div className="flex flex-col w-full">
                <label htmlFor="dob">Date of Birth</label>
                <input
                  className="inputfields"
                  id="dob"
                  type="date"
                  max={yesterdayFormatted} // Make sure yesterdayFormatted is in the correct format
                  {...register("dob", {
                    pattern: /^\d{4}-\d{2}-\d{2}$/,
                  })}
                />
                <style>
                  {`
                    input[type="date"]::-webkit-calendar-picker-indicator {
                    filter: invert(1);
                    }
                  `}
                </style>
              </div>

              <div className="flex flex-col w-full">
                <label htmlFor="emergencycontactnumber">Emergency Contact Info</label>
                <input
                  {...register("emergencycontactnumber")}
                  className="inputfields"
                  id="FirstName"
                  type="text"
                />
                {errors.emergencyContact && (
                  <p className="text-red-500">This field is required</p>
                )}
              </div>
            </div>

            <div className="flex justify-center">
              <Button name="Save Details"></Button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
