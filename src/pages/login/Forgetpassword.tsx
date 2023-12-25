import React from "react";
const Forgetpassword = () => {
  return (
    <div className="bg-[#FAFAFF] w-full h-[100vh] flex justify-center text-[#1E2749] ">
      <form className="mt-5 border-1 p-5 flex flex-col w-96 pt-5 h-96 justify-between shadow-md relative">
        <h1 className="text-4xl font-bold">Forgot Password</h1>
        <p className="text-center">
          Enter your email address and we'll send you a link to reset your password
        </p>
        <div className="flex flex-col">
          <label htmlFor="Emailaddres">Email</label>
          <input
            type="text"
            id="email"
            className="bg-white border-solid border-2 h-8 mt-3"
          />
        </div>
        <div className="flex justify-center">
          <button className="bg-[#1E2749] rounded-lg text-white w-40 h-10 mb-8 hover:bg-blue-800 hover:active:bg-[#1E2749]">
            Send Email
          </button>
        </div>
        <div className="flex justify-center items-center h-8 w-full  bg-[#F7F7F7] absolute bottom-0 left-0 font-semibold cursor-pointer hover:bg-gray-200 hover:active:bg-[#F7F7F7]">
          Back to Login
        </div>
      </form>
    </div>
  );
};
export default Forgetpassword;
