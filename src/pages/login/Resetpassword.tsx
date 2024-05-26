import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useResetPaswordMutation } from "@/feature/userApiSlice";

const Resetpassword = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm();

  const [resetPassword] = useResetPaswordMutation();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email") || ""; // Get the email from the URL params
  console.log(email);
  const onSubmit = async (data) => {
    console.log(data, "data");
    try {
      const res = await resetPassword({
        email: email,
        newPassword: data.newPassword,
      }).unwrap(); // Pass email along with newPassword
      console.log(res);
      toast.success("Password Reset Successfully");
    } catch (error) {
      console.log(error, "err");
      const { data } = error as { data: { error: string } };
      toast.error(data.error);
    }
  };

  return (
    <div className="bg-[#FAFAFF] w-full h-[100vh] flex justify-center text-[#1E2749] ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 border-1 p-5 flex flex-col w-96 pt-5 h-96 justify-between shadow-md relative"
      >
        <h1 className="text-4xl font-bold">Reset Password</h1>
        <p className="text-center font-semibold">Enter your New password</p>
        <div className="flex flex-col">
          <div className="flex flex-col mb-3">
            <label htmlFor="newPassword">New password</label>
            <input
              type="password"
              placeholder="New Password*"
              {...register("newPassword", {
                required: "New password is required",
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()-_+=]).{8,}$/,
                  message:
                    "Password should contain at least one uppercase, one lowercase, one number, and one special character, and be at least 8 characters long",
                },
              })}
              className="bg-white border-solid border-2 h-8 mt-3"
            />
            {errors.newPassword && (
              <span className="text-red-500">{errors.newPassword.message}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              type="password"
              placeholder="Confirm Password*"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === getValues("newPassword") || "Passwords do not match",
              })}
              className="bg-white border-solid border-2 h-8 mt-3"
            />
            {errors.confirmPassword && (
              <span className="text-red-500">{errors.confirmPassword.message}</span>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <button className="bg-[#1E2749] rounded-lg text-white w-40 h-10 mb-8 hover:bg-blue-800 hover:active:bg-[#1E2749]">
            Change password
          </button>
        </div>
        <Link
          to="/"
          className="flex justify-center items-center h-8 w-full  bg-[#F7F7F7] absolute bottom-0 left-0 font-semibold cursor-pointer hover:bg-gray-200 hover:active:bg-[#F7F7F7]"
        >
          Back to Login
        </Link>
      </form>
    </div>
  );
};

export default Resetpassword;
