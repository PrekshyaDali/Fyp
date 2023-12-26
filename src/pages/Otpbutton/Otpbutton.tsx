import React from "react";
import { useOtpMutation } from "@/feature/userApiSlice";
import { Iotp } from "@/index";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Otpbutton = () => {

  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<Iotp>();
  const [send_otp, { isLoading }] = useOtpMutation();
  const storedEmail = localStorage.getItem("email");
  const SubmitHandler = async (data: Iotp) => {
  
    const data1 = {
      email: storedEmail,
      // otp: data.otp,
    };

    try {
      const res = await send_otp(data1).unwrap();
      console.log(res, "res");
      navigate("/otp");
      toast.success("Otp Verified Successfully");
      // localStorage.removeItem("email")

      reset();
    } catch (error: unknown) {
      console.log(error, "err");
      const { data } = error as { data: { message: string } };
      toast.error(data.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(SubmitHandler)}
      className="bg-[#FAFAFF] text-[#1E2749] w-full h-[100vh] flex flex-col  items-center p-5 text-center"
    >
      <p>Click here to send Otp to your registered Email.</p>
      <button
        type="submit"
        className="bg-blue-950 w-32 text-white rounded-lg px-4 py-2 mt-5 hover:bg-blue-800 hover:active:bg-blue-900"
      >
        Send otp
      </button>
    </form>
  );
};
export default Otpbutton;
