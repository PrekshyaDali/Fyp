import React from "react";
import { set, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { IRegister } from "@/index";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "@/feature/userApiSlice";
import { toast } from "react-toastify";

const Register = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const [password_confirmation, setPassword_confirmation] = useState<string>("");

  const currentWidth = window.innerWidth;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<IRegister>();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const SubmitHandler = async (data: IRegister) => {
    // event.preventDefault();
    const data1 = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      contactNumber: data.contactNumber,
      password: data.password,
    };

    //   registerUser(data1).unwrap().then(response => {
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
    //   return response.json();
    // })
    // .then(data => {
    //   // Handle the data
    // })
    // .catch(error => {
    //   console.error('Error during fetch operation:', error);
    // });

    try {
      const res = await registerUser(data1).unwrap();
      console.log(res, "res");
      toast.success("Registered Successfully");
      navigate("/");
      reset();
    } catch (error: unknown) {
      console.log(error, "err");
      const { data } = error as { data: { message: string } };
      toast.error(data.message);
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 bg-[#FAFAFF]">
      <div className="p-1">
        <img className="w-60 ml-10  mt-10" src="./logo.png" alt="" />
        <form onSubmit={handleSubmit(SubmitHandler)}>
          <div className="flex flex-col py-8 px-10 md:px-11 gap-3 ">
            <h1 className="text-3xl font-bold text-blue-950 mb-5">Signup</h1>

            <input
              placeholder="FirstName*"
              className="inputfields"
              type="text"
              {...register("firstName", {
                required: true,
                validate: (value) => value !== "admin" || "Nice try!",
              })}
            />
            {errors.firstName?.type === "required" && (
              <span className="text-red-500">This field is required</span>
            )}
            <input
              placeholder="LastName*"
              className="inputfields"
              type="text"
              {...register("lastName", {
                required: true,
              })}
            />
            {errors.lastName?.type === "required" && (
              <span className="text-red-500">This field is required</span>
            )}
            <input
              placeholder="Email"
              className="inputfields"
              type="text"
              {...register("email", {
                required: { value: true, message: "Email is required" },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email",
                },
              })}
            />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            <input
              placeholder="Contact Number"
              className="inputfields"
              type="number"
              {...register("contactNumber", {
                required: true,
              })}
            />
            {errors.contactNumber?.type === "required" && (
              <span className="text-red-500">This field is required</span>
            )}
            <input
              placeholder="Password*"
              className="inputfields"
              type="password"
              {...register("password", {
                required: true,
              })}
            />
            {errors.contactNumber?.type === "required" && (
              <span className="text-red-500">This field is required</span>
            )}
            <input
              placeholder="Confirm Password*"
              className="inputfields"
              type="password"
              {...register("password_confirmation", {
                required: true,
              })}
            />
            {errors.contactNumber?.type === "required" && (
              <span className="text-red-500">This field is required</span>
            )}
            <div className="flex flex-col items-center justify-center mt-2">
              <button
                className="btn  mb-2 hover:bg-blue-800 hover:active:bg-blue-900"
                type="submit"
              >
                Signup
              </button>
              <p className="text-xs">
                Already have an account? <span className="underline_sign">Sign In</span>
              </p>
            </div>

            <p className="text-blue-900 text-xl font-bold text-center mt-2">
              "Empowering Journeys, One Lesson at a Time – Welcome to Your Driving
              Success!"
            </p>
          </div>
        </form>
      </div>
      {innerWidth > 768 && (
        <div className="w-full  max-h-[100vh]  ">
          <img className="  w-full h-full object-cover" src="DrivingPic1.png" alt="" />
        </div>
      )}
    </div>
  );
};
export default Register;
