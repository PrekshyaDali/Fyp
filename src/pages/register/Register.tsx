import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
// import { useState, useEffect } from "react";
import { IRegister } from "@/index";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "@/feature/userApiSlice";
import { toast } from "react-toastify";
import DriveSyncLogo from "../component/DriveSyncLogo";
import Button from "../component/Button";
import { useOtpMutation } from "@/feature/userApiSlice";

const Register = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const currentWidth = window.innerWidth;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<IRegister>();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const [send_otp] = useOtpMutation();

  const SubmitHandler = async (data: IRegister) => {
    // event.preventDefault();
    const data1 = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      contactNumber: data.contactNumber,
      password: data.password,
    };

    try {
      const res = await registerUser(data1).unwrap();
      console.log(res, "res");
      const storedEmail = data.email;
      const otpResponse = await send_otp({ email: storedEmail }).unwrap();
      console.log(otpResponse, "otpResponse");
      localStorage.setItem("email", storedEmail);
      toast.success("Registered Successfully");

      navigate("/otp");

      reset();
    } catch (error: unknown) {
      console.log(error, "err");
      const { data } = error as { data: { message: string } };
      toast.error(data.message);
    }
  };

  return (
    <div className="flex justify-center items-center bg-[#FAFAFF] p-5 h-screen">
      <form className="max-w-lg" onSubmit={handleSubmit(SubmitHandler)}>
        <div className="  flex flex-col py-8 px-10 md:px-11 gap-3 shadow-md  ">
          <DriveSyncLogo></DriveSyncLogo>
          <h1 className="text-3xl font-bold text-[#0F1035] mb-5">Signup</h1>
          <input
            placeholder="FirstName*"
            className="inputfields"
            type="text"
            {...register("firstName", {
              required: { value: true, message: "Last Name is required" },
              pattern: {
                value: /^[a-zA-Z]+$/, // No whitespace or numbers
                message: "Only alphabets, no spaces or numbers",
              },

              validate: (value) => value !== "admin" || "Nice try!",
            })}
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
          <input
            placeholder="LastName*"
            className="inputfields"
            type="text"
            {...register("lastName", {
              pattern: {
                value: /^[a-zA-Z]+$/, // No whitespace or numbers
                message: "Only alphabets, no spaces or numbers",
              },
              required: { value: true, message: "Last Name is required" },
            })}
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
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
          {errors.email && (
            <span className="text-red-500 text-md">{errors.email.message}</span>
          )}
          <input
            placeholder="Contact Number"
            className="inputfields"
            type="number"
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
          <input
            placeholder="Password*"
            className="inputfields"
            type="password"
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
          <input
            placeholder="Confirm Password*"
            className="inputfields"
            type="password"
            {...register("password_confirmation", {
              required: true,
              validate: (value) =>
                value === getValues("password") || "Passwords do not match",
            })}
          />
          {errors.password_confirmation && (
            <span className="text-red-500">{errors.password_confirmation.message}</span>
          )}
          <div className="flex flex-col items-center justify-center mt-2">
            <Button name="Sign Up" isLoading={isLoading}></Button>
            <p className="text-xs">
              Already have an account?{" "}
              <Link to="/login" className="underline_sign">
                Sign In
              </Link>
            </p>
          </div>
          <p className="text-[#0F1035] text-xl font-bold text-center mt-2">
            "Empowering Journeys, One Lesson at a Time – Welcome to Your Driving Success!"
          </p>
        </div>
      </form>

      {/* {innerWidth > 768 && (
        <div className="w-full    ">
          <img
            className="  w-full h-full object-cover"
            src="/img/Car.png"
            alt=""
          />
        </div>
      )} */}
    </div>
  );
};
export default Register;
