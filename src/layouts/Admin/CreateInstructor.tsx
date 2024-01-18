import React from "react";
import Button from "@/pages/component/Button";
import { useForm } from "react-hook-form";
import { IRegisterInstructor } from "@/index";
import { useRegisterInstructorMutation } from "@/feature/userApiSlice";
import { useSendPasswordMutation } from "@/feature/userApiSlice";
import { toast } from "react-toastify";
const CreateInstuctor = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<IRegisterInstructor>();
  const [registerInstructor, { isLoading }] = useRegisterInstructorMutation();
  const [SendPassword, ] = useSendPasswordMutation();

  const SubmitHandler = async (data: IRegisterInstructor) => {
    const data1 = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      contactNumber: data.contactNumber,
      password: data.password,
    };

    try {
      const res = await registerInstructor(data1).unwrap();
      console.log(res, "res");
      const PasswordResponse = await SendPassword(data1).unwrap();
      console.log(PasswordResponse);
      toast.success("Registered Successfully");
      reset();
    } catch (error: unknown) {
      console.log(error, "err");
      const { data } = error as { data: { message: string } };
      toast.error(data.message);
    }
  };
  return (
    <div className="h-full  p-10 flex flex-col ">
      <form className="flex flex-col space-y-5" onSubmit={handleSubmit(SubmitHandler)}>
        <div className="flex space-x-10 ">
          <div>
            <label htmlFor="FirstName">FirstName</label>
            <input
              type="text"
              id="FirstName"
              className="inputfields"
              {...register("firstName", {
                required: true,
                validate: (value) => value !== "admin" || "Nice try!",
              })}
            />
            {errors.firstName?.type === "required" && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div>
            <label htmlFor="LastName">LastName</label>
            <input
              type="text"
              id="LastName"
              className="inputfields"
              {...register("lastName", {
                required: true,
              })}
            />
            {errors.lastName?.type === "required" && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="Email">Email</label>
          <input
            type="text"
            id="Email"
            className="inputfields"
            {...register("email", {
              required: { value: true, message: "Email is required" },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-500 text-md">{errors.email.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="ContactNumber">ContactNumber</label>
          <input
            type="text"
            id="ContactNumber"
            className="inputfields"
            {...register("contactNumber", {
              required: { value: true, message: "Contact Number is required" },
              pattern: {
                value: /^[0-9]{1,10}$/,
                message: "Number should be of 10 digits",
              },
            })}
          />
          {errors.contactNumber && (
            <span className="text-red-500">{errors.contactNumber.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            id="Password"
            className="inputfields"
            {...register("password", {
              required: "Password is required",

              pattern: {
                value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()-_+=]).{8,}$/,
                message:
                  "Password should contain at least one uppercase, one lowercase, one number, and one special character",
              },
            })}
          />

          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="ConfirmPassword">ConfirmPassword</label>
          <input
            type="password"
            id="ConfirmPassword"
            className="inputfields"
            {...register("password_confirmation", {
              required: true,
              validate: (value) =>
                value === getValues("password") || "Passwords do not match",
            })}
          />
          {errors.password_confirmation && (
            <span className="text-red-500">{errors.password_confirmation.message}</span>
          )}
        </div>
        <Button name="Create Instructor" isLoading={isLoading}></Button>
        <p>Use the address where the Instructor can receive email</p>
      </form>
    </div>
  );
};
export default CreateInstuctor;
