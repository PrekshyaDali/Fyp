import React, { useState } from "react";
import { FieldValues, set, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useOtpMutation, useOtpVerifyMutation } from "@/feature/userApiSlice";
import { toast } from "react-toastify";
import { Iotp, IotpVerify } from "@/index";
import Button from "../component/Button";

const Otpverification = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [verifyOtp, { isLoading }] = useOtpVerifyMutation();
  const [send_otp] = useOtpMutation();

  const submitHandler = async (data: IotpVerify) => {
    if (!isLoading) {
      try {
        const res = await verifyOtp({
          email: localStorage.getItem("email"),
          verificationCode: data.verificationCode,
        }).unwrap();
        console.log(res, "res")
        

        navigate("/");
        toast.success("Otp verified successfully");

        reset();
      } catch (error) {
        console.error("err", error);
        const errorMessage = error.response?.data?.message || "Invalid otp";
        toast.error(errorMessage);
      }
    }
  };
  const ResendCodeHandler = async () => {
    try {
      const storedEmail = localStorage.getItem("email");
      const otpResponse = await send_otp({ email: storedEmail }).unwrap();
      console.log(otpResponse, "otpResponse");
      toast.success("Otp sent successfully");
  
    } catch {
      toast.error("Error in sending otp");
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
        <span onClick={ResendCodeHandler} className="underline_sign">
          Resend Code
        </span>

        <div className="flex justify-center">
          <Button name="Verify" isLoading={isLoading}>
            {" "}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Otpverification;
