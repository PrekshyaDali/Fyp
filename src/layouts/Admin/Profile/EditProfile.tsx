import React from "react";
import Button from "../../../pages/component/Button";
import { useGetProfileQuery, userApiSlice } from "@/feature/userApiSlice";
import { Link, useParams } from "react-router-dom";
import { useEditUsersQuery, useEditProfileDetailsMutation } from "@/feature/userApiSlice";
import BackButton from "@/pages/component/BackButton";
import { useForm } from "react-hook-form";

export default function EditProfile() {
  // const { data } = useGetProfileQuery({}, { refetchOnMountOrArgChange: true });
  const{
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  
  const { id } = useParams<{ id: string }>();
  const { data: userData, isLoading: isUserDataLoading } = useEditUsersQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const [editProfile] = useEditProfileDetailsMutation();

  console.log(userData, "userData");

  return (
    <div className="h-screen w-full mt-5  p-5 rouded-lg space-y-8 ">
      <div className="flex justify-center">
        <div className="h-32 w-32 sm:h-56 sm:w-56 flex flex-col justify-center items-center ">
          <img className=" object-contain rounded-full " src="/img/People.png" alt="" />
          <h1 className="text-lg font-semibold  ">
            {userData?.firstname} <span> {userData?.lastname} </span>
          </h1>
          <span className="text-sm text-gray-400"> {userData?.email}</span>
        </div>
      </div>

      <div className="flex flex-col space-x-0 space-y-5 sm:space-y-0 sm:flex-row sm:space-x-5 ">
        <div className="flex flex-col w-full">
          <label htmlFor="FirstName">First Name</label>
          <input
            defaultValue={userData?.firstname}
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
          <label htmlFor="LastName">Last Name</label>
          <input
            defaultValue={userData?.lastname}
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
            defaultValue={userData?.email}
            className="inputfields"
            id="Email"
            type="text"
            {...register("email", {
              required: { value: true, message: "Email is required" },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email",
              },
            })}
          />
          {errors.email && <p className="text-red-500">{String(errors.email.message)}</p>}
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="ContactNumber">Contact Number</label>
          <input
            defaultValue={userData?.contactnumber}
            className="inputfields"
            id="ContactNumber"
            type="text"
            {...register("contactNumber", {
              required: { value: true, message: "Contact Number is required" },
              pattern: {
                value: /^[0-9]{1,10}$/,
                message: "Number should be of 10 digits",
              },
            })}
          />
          {errors.contactNumber && (
            <p className="text-red-500">{String(errors.contactNumber.message)}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col space-x-0 space-y-5 sm:space-y-0 sm:flex-row sm:space-x-5 ">
        <div className="flex flex-col w-full">
          <label htmlFor="Gender">Gender</label>
          <input
          
          
          
          className="inputfields" id="Gender" type="text" />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="Address">Address</label>
          <input className="inputfields" id="Address" type="text" />
        </div>
      </div>

      <div className="flex flex-col space-x-0 space-y-5 sm:space-y-0 sm:flex-row sm:space-x-5 ">
        <div className="flex flex-col w-full">
          <label htmlFor="dob">Date of Birth</label>
          <input className="inputfields" id="dob" type="date" />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="FirstName">Emergency Contact Info</label>
          <input className="inputfields" id="FirstName" type="text" />
        </div>
      </div>

      <div className="flex justify-center">
        <Button name="Save Details"></Button>
      </div>
    </div>
  );
}
