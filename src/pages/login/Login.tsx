import { ILogin } from "@/index";
import React from "react";
// import Google from "../Icons/Google.png";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/feature/userApiSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/app/store";
import { setAuth } from "@/app/authSlice";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Button from "../component/Button";
import DriveSyncLogo from "../component/DriveSyncLogo";
import Background from "../component/Background";

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
      console.log(res, "res")
      dispatch(setAuth(res));
      localStorage.setItem("email", data.email);
      localStorage.setItem("role", res.role);
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("id", res.id);

      //role based routing to dashboard

      if (res.role === "admin") {
        navigate("/admin/adminDashboard");
      } else if (res.role === "user") {
        navigate("/user/StudentDashboard");
      } else if (res.role === "instructor" && res.isFirstLogin === false) {
        navigate("/Changepassword");
      } else if (res.isFirstLogin === true) {
        navigate("/instructor/InstructorDashboard");
      }

      localStorage.removeItem("email");
      // localStorage.removeItem("role");

      reset();
    } catch (error) {
      console.log(error, "err");
      localStorage.setItem("email", data2.email);

      const { data } = error as { data: { error: string } };
      toast.error(data.error);

      if (error.status === 404) {
        navigate("/otp");
      }
    }
  };

  return (
    <>
      <div className="w-full h-[100vh] bg-gray-200 flex justify-center items-center">
        <div className="max-w-6xl h-5/6 border-2 flex bg-white rounded-md shadow-lg">
          <div className="flex justify-center items-center">
            {" "}
            <form className="w-96" onSubmit={handleSubmit(SubmitHandler)}>
              <div className="text-[#1E2749]   flex flex-col py-5 px-10 md:px-11  space-y-5">
                <DriveSyncLogo></DriveSyncLogo>
                <h1 className="font-bold text-3xl my-5">Login</h1>
                <div className="">
                  <label htmlFor="Email">Email</label>
                  <input
                    className="inputfields"
                    id="Email"
                    type="text"
                    {...register("email", {
                      required: true,
                    })}
                  />
                  {errors.email && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
                <div className="mb-12 relative">
                  <label htmlFor="password">Password</label>
                  <input
                    className="inputfields relative"
                    id="password"
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
                      className="absolute right-3 top-8 cursor-pointer text-lg"
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    />
                  ) : (
                    <FaEye
                      className="absolute right-3 top-8 cursor-pointer text-lg"
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    />
                  )}

                  <Link
                    to="/Forgetpassword"
                    className="underline_sign text-sm text-gray-600 underline absolute right-1 top-16"
                  >
                    Forget Password?
                  </Link>
                </div>

                <div className="flex flex-col items-center justify-center ">
                  <div className="mt-5">
                    <Button isLoading={isLoading} name="Sign in"></Button>
                  </div>
                  <p className="text-[#c2c2c2] text-xs py-3">
                    Don't have an account?{" "}
                    <Link to="/Register" className="underline_sign">
                      Sign Up
                    </Link>
                  </p>
                  {/* <p className="mb-3">Or</p> */}
                </div>
              </div>
            </form>
          </div>

          {/* {left side div} */}
          <div className="h-full">
            <img
              className="h-full w-full object-cover"
              src="/img/backgroundimg.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
