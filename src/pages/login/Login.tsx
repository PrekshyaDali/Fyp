import { ILogin } from "@/index";
import React from "react";
// import Google from "../Icons/Google.png";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/feature/userApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/app/store";
import { setIsAuthenticated } from "@/app/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<ILogin>();
  const [loginUser, { isLoading }] = useLoginMutation();
  const SubmitHandler = async (data: ILogin) => {
    // event.preventDefault();
    const data2 = {
      email: data.email,
      password: data.password,
    };
    try {
      const res = await loginUser(data2).unwrap();
      toast.success("LoggedIn Successfully");
      dispatch(setIsAuthenticated(true));
      navigate("/");

      reset();
    } catch (error) {
      if (error instanceof Error && error.response) {
        // Handle errors with response (e.g., server error with a response)
        const { message } = error.message.response;
        toast.error(message);
      } else {
        // Handle other types of errors (e.g., network error, unexpected errors)
        toast.error("Invalid credentials");
      }
    }
  };

  return (
    <>
      <main className="bg-[#FAFAFF] h-[100vh] ">
        <div className="grid grid-cols-1 md:grid-cols-2 bg-[#FAFAFF] ">
          <form onSubmit={handleSubmit(SubmitHandler)}>
            <div className="text-[#1E2749] flex flex-col   px-10 md:px-11 ">
              <img className="w-60  pt-10 bg-[#FAFAFF]" src="./logo.png" alt="" />
              <h1 className="font-bold text-3xl my-5">Login</h1>
              <div className="">
                <h2 className="text-xl font-bold  my-4">Email</h2>
                <input className="inputfields" type="text" {...register("email", {})} />
              </div>
              <div className="mb-10 relative">
                <h2 className="text-xl font-bold my-4">Password</h2>
                <input
                  className="inputfields relative"
                  type="password"
                  {...register("password", {})}
                />
                <p className="underline_sign text-sm text-[#1E2749] underline absolute right-1 ">
                  Forget Password?
                </p>
              </div>

              <div className="flex flex-col items-center justify-center mt-2">
                <button className="btn">Sign in</button>
                <p className="text-[#c2c2c2] text-xs py-3">
                  Don't have an account? <span className="underline_sign">Sign up</span>
                </p>
                <p className="mb-3">Or</p>
              </div>

              <div className="flex items-center justify-center">
                <button className="btn relative">
                  <img
                    className="h-5 absolute left-3 sm:left-11"
                    src="./Google.png"
                    alt="Google Icon"
                  />
                  Sign in with Google
                </button>
              </div>
            </div>
          </form>
          {innerWidth > 768 && (
            <div className="w-full  max-h-[100vh]  ">
              <img
                className="  w-full h-full object-cover"
                src="./DrivingPic1.png"
                alt=""
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
};
export default Login;
