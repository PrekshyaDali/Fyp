import React from "react";
import Button from "../component/Button";
import { useForm } from "react-hook-form";
import { useChangePasswordMutation } from "@/feature/userApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BackButton from "../component/BackButton";

export default function ChangePassword() {4
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const SubmitHandler = async (data) => {
    try {
      const data1 = {
        password: data.password,
      };
      console.log(data1, "data1");
      const res = await changePassword(data1).unwrap();
      console.log(res);
      toast.success("Password Changed Successfully");
      if(localStorage.getItem("role") === "instructor"){
        navigate("/instructor");
      }
    } catch (error) {
      console.log(error, "err");
      const { data } = error as { data: { error: string } };
      toast.error(data.error);
      reset();
    }
  };

  return (
    <div className="h-screen bg-[#FAFAFF]">
      {/* Set height to fill entire viewport */}

      <div className="flex justify-center w-full bg-[#FAFAFF] text-[#1E2749]">
        <div className="bg-[#FAFAFF] max-w-sm flex flex-col p-8 rounded-md shadow-lg">
          <div className = "flex justify-end mb-2">
            <BackButton></BackButton>
          </div>
          <h1 className="text-3xl font-semibold text-center mb-5">Change Password</h1>
          <span className="text-center text-sm text-gray-500">
            Please be informed that in order to access your dashboard or account, you are
            required to update your default password.
          </span>
          <form onSubmit={handleSubmit(SubmitHandler)} className="mt-6">
            <div className="mb-5">
              <label htmlFor="newPassword" className="block mb-2">
                New Password
              </label>
              <input
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
                <span className="text-red-500">{String(errors.password.message)}</span>
              )}
            </div>
            <div className="mb-5">
              <label htmlFor="confirmPassword" className="block mb-2">
                Confirm Password
              </label>
              <input
                className="inputfields"
                type="password"
                {...register("password_confirmation", {
                  required: true,
                  validate: (value) =>
                    value === getValues("password") || "Passwords do not match",
                })}
              />
              {errors.password_confirmation && (
                <span className="text-red-500">
                  {String(errors.password_confirmation.message)}
                </span>
              )}
            </div>
            <div className="flex justify-center">
              <Button isLoading={isLoading} name="Change" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
