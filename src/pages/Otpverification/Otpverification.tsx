import React, { useState } from "react";
import { FieldValues, set, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useOtpMutation, useOtpVerifyMutation } from "@/feature/userApiSlice";
import { toast } from "react-toastify";
import { Iotp, IotpVerify } from "@/index";

const Otpverification = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [verifyOtp, { isLoading }] = useOtpVerifyMutation();

  const submitHandler = async (data: IotpVerify) => {
    if(!isLoading){
    try {
      const res = await verifyOtp({
        email: localStorage.getItem("email"),
        verificationCode: data.verificationCode,
        
      }).unwrap();
      console.log(res, "res");
      navigate("/");
      toast.success("Otp sent successfully");

      reset();
    } catch (error) {
      console.error("err", error);
      const errorMessage = error.response?.data?.message || "Invalid otp";
      toast.error(errorMessage);
    }
  }

  };

 

  return (
    <div className="bg-[#FAFAFF] w-full h-[100vh] flex justify-center text-[#1E2749]">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="mt-5 border-1 p-5 flex flex-col w-96 pt-5 h-96 justify-between shadow-md"
      >
        <h1 className="text-4xl font-bold">Verify email</h1>
        <p className="text-center">
          Check your email. The verification code has been sent to your email.
        </p>
        <span>Enter verification code</span>
        <input
          className="bg-white border-solid border-2 h-8 "
          type="text"
          {...register("verificationCode", {
            required: "Otp is required",
            minLength: {
              value: 6,
              message: "Otp must be at least 6 characters",
            },
            maxLength: {
              value: 6,
              message: "Otp must be at most 6 characters",
            },
          })}
        />

        <span className="text-red-500">
          {errors.verificationCode && (errors.verificationCode as FieldValues).message}
        </span>
        <span 
        
        className="underline_sign"
    
        
        
        >Resend Code</span>

        <div className="flex justify-center">
          <button
            className="bg-[#1E2749] rounded-lg text-white w-40 h-10  hover:bg-blue-800 hover:active:bg-[#1E2749]"
            type="submit"
            disabled={isLoading}
          >
            Verify
          </button>
        </div>
      </form>
    </div>
  );
};

export default Otpverification;
