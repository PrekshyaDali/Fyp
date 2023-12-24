import react from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useOtpMutation } from "@/feature/userApiSlice";
import { Iotp } from "@/index";
import { toast } from "react-toastify";
const Otpverification = () => {
  return (
    <div className="bg-[#FAFAFF] w-full h-[100vh] flex justify-center text-[#1E2749] ">
      <form className="mt-5 border-1 p-5 flex flex-col w-96 pt-5 h-96 justify-between shadow-md">
        <h1 className="text-4xl font-bold">Verify email</h1>
        <p className="text-center">
          Check your email.The verification code has been sent to your email.
        </p>
        <span>Enter verification code</span>
        <input className="bg-white border-solid border-2" type="text" />
        <span className="underline_sign">Resend code</span>
        <div className="flex justify-center">
          <button
            className=" bg-[#1E2749] rounded-lg text-white w-40 h-10 mt-5  hover:bg-blue-800 hover:active:bg-[#1E2749]"
            type="submit"
          >
            Verify
          </button>
        </div>
      </form>
    </div>
  );
};

export default Otpverification;
