import React from "react";
import Button from "@/pages/component/Button";
import BackButton from "@/pages/component/BackButton";
import { useEditDetailsMutation, useEditUsersQuery, useGetUsersQuery } from "@/feature/userApiSlice";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function StudentEdit() {
  const { id } = useParams<{ id: string }>();
  const { data: userData, isLoading: isUserDataLoading } = useEditUsersQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm();

  const [editDetails, { isLoading: isEditing }] = useEditDetailsMutation();

 const onSubmit = async (formData) => {
   // Check if the form data is different from the initial user data
   const isDataChanged = Object.keys(formData).some(
     (key) => formData[key] !== userData[key],
   );

   if (!isDataChanged) {
     console.log("No changes detected. User details not updated.");
     return;
   }

   try {
     await editDetails({ id, ...formData }).unwrap();
     console.log("User details updated successfully!");
     toast.success("User details updated successfully!");
   } catch (error) {
     console.error("Failed to update user details:", error);
   }
 };


  React.useEffect(() => {
    if (userData) {
      // Set default values for form fields when data is fetched
      setValue("firstname", userData.firstname);
      setValue("lastname", userData.lastname);
      setValue("email", userData.email);
      setValue("contactnumber", userData.contactnumber);
    }
  }, [userData, setValue]);

  return (
    <div className="space-y-5 p-3">
      {isUserDataLoading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="max-w-xs">
            <label htmlFor="FirstName">First Name</label>
            <input
              type="text"
              name="firstname"
              id="FirstName"
              className="inputfields"
              {...register("firstname", { required: "First name is required" })}
            />
            {errors.firstname && (
              <span className="text-red-600 text-sm">
                {String(errors.firstname.message)}
              </span>
            )}
          </div>
          <div className="max-w-xs">
            <label htmlFor="LastName">Last Name</label>
            <input
              type="text"
              name="lastname"
              id="LastName"
              className="inputfields"
              {...register("lastname", { required: "Last name is required" })}
            />
            {errors.lastname && (
              <span className="text-red-600 text-sm">
                {String(errors.lastname.message)}
              </span>
            )}
          </div>
          <div className="max-w-xs">
            <label htmlFor="Email">Email</label>
            <input
              type="text"
              name="email"
              id="Email"
              className="inputfields"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="text-red-600 text-sm">{String(errors.email.message)}</span>
            )}
          </div>
          <div className="max-w-xs mb-5">
            <label htmlFor="ContactNumber">Contact Number</label>
            <input
              type="text"
              name="contactnumber"
              id="ContactNumber"
              className="inputfields"
              {...register("contactnumber", { required: "Contact number is required" })}
            />
            {errors.contactnumber && (
              <span className="text-red-600 text-sm">
                {String(errors.contactnumber.message)}
              </span>
            )}
          </div>
          <div className="flex space-x-2">
            <Button isLoading={isEditing} name="Save Details" type="submit" />
            <BackButton />
          </div>
        </form>
      )}
    </div>
  );
}
