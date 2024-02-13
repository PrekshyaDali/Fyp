import React from "react";
import Button from "@/pages/component/Button";
import { useState } from "react";
import { useEditDetailsMutation, useGetUsersQuery } from "@/feature/userApiSlice";
import BackButton from "@/pages/component/BackButton";
import { useEditUsersQuery } from "@/feature/userApiSlice";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function StudentEdit() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useEditUsersQuery(id, { refetchOnMountOrArgChange: true });
  console.log(data, "data");
    const [editUser, setEditUser] = useState({
      firstname: data?.firstname,
      lastname: data?.lastname,
      email: data?.email,
      contactnumber: data?.contactnumber,
    });
  // const{
  //   handleSubmit,
  //   register,
  //   formState: { errors },
  //   reset,
  // } = useForm();
  // const [editDetails] = useEditDetailsMutation();
  // const SubmitHandler = async(data1: any) => {
  // const res = await editDetails(data1).unwrap();
  // console.log(res, "res");

  // };

  
 



  

  return (
    <div className="space-y-5 p-3">
      <form >
        <div className="max-w-xs">
          <label htmlFor="FirstName">First Name</label>
          <input
            value={editUser.firstname}
            type="text"
            name="FirstName"
            id="FirstName"
            className="inputfields"
            // {...register("firstname", {
            //   required: "This field is required",
            // })}
          />
        </div>
        <div className="max-w-xs">
          <label htmlFor="LastName"> Last Name</label>
          <input
            value={editUser?.lastname}
            type="text"
            name="LastName"
            id="FirstName"
            className="inputfields"
          
          />
        </div>
        <div className="max-w-xs">
          <label htmlFor="Email">Email</label>
          <input
            value={editUser.email}
            type="text"
            name="Email"
            id="FirstName"
            className="inputfields"
          />
        </div>
        <div className="max-w-xs">
          <label htmlFor="ContactNumber"> Contact Number</label>
          <input
            value={editUser.contactnumber}
            type="text"
            name="ContactNumber"
            id="FirstName"
            className="inputfields"
          />
        </div>
        <div className="flex space-x-2">
          <Button isLoading={isLoading} name="Save Details"></Button>
          <BackButton></BackButton>
        </div>
      </form>
    </div>
  );
}
