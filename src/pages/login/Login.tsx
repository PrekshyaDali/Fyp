import { ILogin } from "@/index";
import React from "react";
// import Google from "../Icons/Google.png";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/feature/userApiSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/app/store";
import { setIsAuthenticated } from "@/app/authSlice";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
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
      role: data.role,
    };
    try {
      const res = await loginUser(data2).unwrap();
      toast.success("LoggedIn Successfully");
      dispatch(setIsAuthenticated(true));
      localStorage.setItem("email", data.email);
      localStorage.setItem("role", res.role);

      navigate("/")

      localStorage.removeItem("email");
      // localStorage.removeItem("role");

      reset();
    } catch (error) {
      console.log(error, "err");
      localStorage.setItem("email", data2.email);
      const { data } = error as { data: { error: string } };
      toast.error(data.error);
      if(error.status === 404){
        navigate("/otp")
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
                <input
                  className="inputfields"
                  type="text"
                  {...register("email", {
                    required: true,
                  })}
                />
                {errors.email  && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="mb-10 relative">
                <h2 className="text-xl font-bold my-4">Password</h2>
                <input
                  className="inputfields relative"
                  type={isPasswordVisible ? "text" : "password"}
                  {...register(
                    "password",

                    {
                      required: true,
                    },
                  )}
                />
                {errors.password && (
                  <span className="text-red-500">This field is required</span>
                )}
                {isPasswordVisible ? (
                  <FaEyeSlash
                    className="absolute right-3 top-[70px] cursor-pointer text-lg"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  />
                ) : (
                  <FaEye
                    className="absolute right-3 top-[70px] cursor-pointer text-lg"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  />
                )}

                <Link
                  to="/Forgetpassword"
                  className="underline_sign text-sm text-[#1E2749] underline absolute right-1 top-28"
                >
                  Forget Password?
                </Link>
              </div>

              <div className="flex flex-col items-center justify-center mt-2">
                <button className="btn hover:bg-blue-800 hover:active:bg-[#1E2749]">
                  Sign in
                </button>
                <p className="text-[#c2c2c2] text-xs py-3">
                  Don't have an account?{" "}
                  <Link to="/Register" className="underline_sign">
                    Sign Up
                  </Link>
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
