import React from "react";
import { Link } from "react-router-dom";
import { FieldValues, set, useForm } from "react-hook-form";
import { IForgetPassword } from "@/index";
import { useForgetPasswordMutation } from "@/feature/userApiSlice";
import { toast } from "react-toastify";
const Forgetpassword = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForgetPassword>();
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  const SubmitHandler = async (data: IForgetPassword)=>{
    try{
    const res = await forgetPassword({
      email: data.email,
    }).unwrap();
    console.log(res, "res");
    toast.success("Email sent successfully");
    reset();

  }
  catch(error){
    console.log(error,"err");
    toast.error(error.message);

  }
}
  
  return (
    <div className="bg-[#FAFAFF] w-full h-[100vh] flex justify-center text-[#1E2749] ">
      <form
        onSubmit={handleSubmit(SubmitHandler)}
        className="mt-5 border-1 p-5 flex flex-col w-96 pt-5 h-96 justify-between shadow-md relative"
      >
        <h1 className="text-4xl font-bold">Forgot Password</h1>
        <p className="text-center">
          Enter your email address and we'll send you a link to reset your password
        </p>
        <div className="flex flex-col">
          <label htmlFor="Emailaddres">Email</label>
          <input
            type="text"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
            className="bg-white border-solid border-2 h-8 mt-3"
          />
          <span className="text-red-500">
            {errors.email && (errors.email as FieldValues).message}
          </span>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#1E2749] rounded-lg text-white w-40 h-10 mb-8 hover:bg-blue-800 hover:active:bg-[#1E2749]"
          >
            Send Email
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
export default Forgetpassword;
