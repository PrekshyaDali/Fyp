import React, { useEffect, useState } from "react";
import Button from "@/pages/component/Button";
import {
  useGetProfileQuery,
  useGetCourseQuery,
  useEnrollmentMutation,
  useGetEnrollmentQuery,
  useUpdateEnrollmentMutation,
} from "@/feature/userApiSlice";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function EnrollmentForms() {
  const navigate = useNavigate();

  const { data: profileData } = useGetProfileQuery({});
  const { id } = useParams<{ id: string }>();
  const { data: courseData } = useGetCourseQuery(id, { refetchOnMountOrArgChange: true });
  const { data: enrollment } = useGetEnrollmentQuery({});
  console.log(courseData, "courseData");

  const { data } = useGetProfileQuery({});
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm();
  const [enrollmentData] = useEnrollmentMutation();
  const [updateEnrollment] = useUpdateEnrollmentMutation();
  const [selectedPayment, setSelectedPayment] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const esewaClickHandler = () => {
    setSelectedPayment("esewa");
    navigate("/user/esewa");
  };
  const step = parseInt(`${searchParams.get("step")}`) || 1;

  useEffect(() => {
    const storedFormData = localStorage.getItem("formData");

    if (storedFormData) {
      console.log(storedFormData);
      const parsedFormData = JSON.parse(storedFormData);
      Object.entries(parsedFormData).forEach(([key, value]) => {
        setValue(key, value);
      });
    } else {
      setValue("firstname", data?.user?.firstname);
      setValue("lastname", data?.user?.lastname);
      setValue("email", data?.user?.email);
      setValue("contactnumber", data?.user?.contactnumber);
      setValue("address", data?.user?.address);
      setValue("emergencycontactnumber", data?.user?.emergencycontactnumber);
      setValue("gender", data?.user?.gender);
         setValue("type", courseData?.type);
         setValue("price", courseData?.price);
         setValue("courseDuration", courseData?.courseDuration);
         setValue("courseId", id);
      
    }
  }, [setValue, data,courseData]);
  console.log(data, "data");
  const formData = getValues();

  const onSubmitStep1 = (data) => {
     const localStartItem = localStorage.getItem("startDate");
     if (localStartItem) {
       localStorage.removeItem("startDate");
     }
     localStorage.setItem("startDate", data.startdate);
    setSearchParams({ step: `2` });
    const formData = getValues();
    localStorage.setItem("formData", JSON.stringify(formData));
    if (courseData) {
      localStorage.setItem("course", JSON.stringify(courseData._id));
    }
  };

  const onSubmitStep2 = async (data1) => {
    if (!selectedPayment) {
      toast.error("Please select a payment option");
      return;
    } else {
      try {
       
        const data2 = {
          firstname: data1.firstname,
          lastname: data1.lastname,
          contactnumber: data1.contactnumber,
          email: data1.email,
          category: courseData?.type,
          address: data1.address,
          price: courseData?.price,
          duration: courseData?.courseDuration,
          gender: data1.gender,
          emergencycontactnumber: data1.emergencycontactnumber,
          payment: selectedPayment,
          startdate: data1.startdate,
          courseId: id,
          userId: data?.user?._id,
        };
        console.log(data?.user?._id);

        if (enrollment?.data?.course && enrollment?.data?.course === id) {
          const res = await updateEnrollment({
            id: enrollment?.data?._id,
            body: data2,
          }).unwrap();
        } else {
          const res = await enrollmentData(data2).unwrap();
        }
        toast.success("You have enrolled successfully");
        localStorage.removeItem("formData");
        if (selectedPayment === "esewa") {
          navigate("/user/esewa");
        } else {
          navigate("/user/courses");
        }
      } catch (errors) {
        console.log(errors, "err");
        const { data } = errors as { data: { message: string } };
        toast.error(data.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(step === 1 ? onSubmitStep1 : onSubmitStep2)}>
      {step === 1 && (
        <>
          <div className="border-2 border-gray-300 m-3 rounded-md p-5 space-y-8 max-h-[80]">
            <div className="h-44 rounded-md bg-[#5584B0] border-2 relative p-5">
              <img
                className="invisible sm:visible h-36 absolute right-3 top-5"
                src="/img/FormCar.png"
                alt=""
              />
              <h1 className="text-3xl font-semibold text-white">Enroll Now</h1>
              <p className="text-white">
                Embark on an exhilarating journey into the world of automotive
              </p>
            </div>

            <div className="space-y-5">
              <div className="space-y-5 sm:flex sm:space-y-0 sm:space-x-8">
                <div className="w-full sm:w-1/2">
                  <label htmlFor="firstName1">First Name</label>
                  <input
                    type="text"
                    id="firstName1"
                    className="inputfields"
                    {...register("firstname", {
                      required: "This field is required",
                    })}
                  />
                  {errors.firstname && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
                <div className="w-full sm:w-1/2">
                  <label htmlFor="lastName1">Last Name</label>
                  <input
                    type="text"
                    id="lastName1"
                    className="inputfields"
                    {...register("lastname", {
                      required: "This field is required",
                    })}
                  />
                  {errors.lastname && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
              </div>

              <div className="sm:flex space-y-5 sm:space-y-0 sm:space-x-8">
                <div className="w-full sm:w-1/2">
                  <label htmlFor="Contact Number">Contact Number</label>
                  <input
                    type="text"
                    id="Contact Number"
                    className="inputfields"
                    {...register("contactnumber", {
                      required: "This field is required",
                      pattern: {
                        value: /^(98|96|97)[1-9]\d{7}$/,
                        message: "Please enter a valid number",
                      },
                    })}
                  />
                  {errors.contactnumber && (
                    <span className="text-red-500">
                      {String(errors.contactnumber.message)}
                    </span>
                  )}
                </div>
                <div className="w-full sm:w-1/2">
                  <label htmlFor="Email">Email</label>

                  <input
                    type="text"
                    id="Email"
                    value={profileData?.user?.email}
                    className="inputfields"
                    {...register("email", {
                      required: "This field is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <span className="text-red-500">{String(errors.email.message)}</span>
                  )}
                </div>
              </div>

              <div className="sm:flex space-y-5 sm:space-y-0 sm:space-x-8">
                <div className="w-full sm:w-1/2">
                  <label htmlFor="Category">Category</label>
                  <input
                    value={courseData?.type}
                    type="text"
                    id="Category"
                    className="inputfields"
                  />
                </div>
                <div className="w-full sm:w-1/2">
                  <label htmlFor="Address">Address</label>
                  <input
                    type="text"
                    id="Address"
                    className="inputfields"
                    {...register("address", {
                      required: "This field is required",
                    })}
                  />
                  {errors.address && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
              </div>

              <div className="sm:flex space-y-5 sm:space-y-0 sm:space-x-8">
                <div className="w-full sm:w-1/2">
                  <label htmlFor="Gender">Gender</label>
                  <select
                    id="Gender"
                    className="inputfields"
                    {...register("gender", {
                      required: "This field is required",
                    })}
                  >
                    <option className="" value="male">
                      Male
                    </option>
                    <option className="" value="female">
                      Female
                    </option>
                    <option className="" value="other">
                      Other
                    </option>
                    {errors.gender && (
                      <span className="text-red-500">This field is required</span>
                    )}
                  </select>
                </div>

                <div className="w-full sm:w-1/2">
                  <label htmlFor="Emergency Contact Info">Emergency Contact Info</label>
                  <input
                    type="text"
                    id="Emergency Contact Info"
                    className="inputfields"
                    {...register("emergencycontactnumber", {
                      pattern: {
                        value: /^(98|96|97)[1-9]\d{7}$/,
                        message: "Please enter a valid number",
                      },
                    })}
                  />
                  {errors.emergencycontactnumber && (
                    <span className="text-red-500">
                      {String(errors.emergencycontactnumber.message)}
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:flex space-y-5 sm:space-y-0 sm:space-x-8">
                <div className="w-full sm:w-1/2">
                  <label htmlFor="Duration">Duration</label>
                  <input
                    value={courseData?.courseDuration + " " + "days"}
                    type="text"
                    id="Duration"
                    className="inputfields"
                  />
                </div>

                <div className="w-full sm:w-1/2">
                  <label htmlFor="startdate">Start Date</label>
                  <input
                    {...register("startdate", {
                      required: "This field is required",
                    })}
                    className="inputfields"
                    id="startdate"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                  />
                  {errors.startdate && (
                    <p className="text-red-500">{String(errors.startdate.message)}</p>
                  )}
                  <style>
                    {`
                    input[type="date"]::-webkit-calendar-picker-indicator {
                    filter: invert(1);
                    }
                  `}
                  </style>
                </div>

                <div className="w-full sm:w-1/2">
                  <label htmlFor="Price">Price</label>
                  <input
                    value={"Rs" + " " + courseData?.price}
                    type="text"
                    id="Price"
                    className="inputfields"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="Category"
                  className="w-5 h-5 mr-4 text-blue-white bg-white border-gray-300 rounded focus:ring-white dark:focus:ring-white "
                  {...register("termsandcondition", {
                    required: "This field is required",
                  })}
                />

                <label htmlFor="Category" className="text-sm">
                  I have read and agree to all the terms and conditions. Once submitted,
                  it cannot be cancelled.
                </label>
                {errors && errors?.termsandcondition && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      {step === 2 && (
        <div className="border-2 border-gray-300 m-3 rounded-md p-5 space-y-8 max-h-[80] ">
          <h1 className="text-xl font-bold ">Choose your payment option</h1>
          <div className="flex justify-center">
            <div className="flex space-x-8 ">
              <div
                className={`flex flex-col justify-center items-center w-44 relative ${
                  selectedPayment === "esewa" ? "active:border-green-400" : ""
                }`}
                onClick={esewaClickHandler}
                onFocus={() => setSelectedPayment("esewa")}
                tabIndex={0}
              >
                {" "}
                <div
                  className={`w-44 h-28 border-2  flex justify-center items-center rounded-r-lg ${
                    selectedPayment === "esewa" && "border-green-400"
                  } `}
                >
                  {selectedPayment === "esewa" && (
                    <span className="flex justify-center bg-[#CBE3EF] items-center absolute top-0 right-0 border-2 border-green-400 shadow-md shadow-pink-200 w-6 h-6 rounded-full ">
                      ✔
                    </span>
                  )}
                  <img src="/img/esewa.png" alt="" />
                </div>
                <p className="text-sm text-gray-500">Pay via esewa</p>
              </div>

              <div
                className={`flex flex-col justify-center items-center w-44 relative ${
                  selectedPayment === "institute" ? "active:border-green-400" : ""
                }`}
                onClick={() => setSelectedPayment("institute")}
                onFocus={() => setSelectedPayment("institute")}
                tabIndex={0}
              >
                <div
                  className={`w-44 h-28 border-2 flex justify-center items-center rounded-r-lg ${
                    selectedPayment === "institute" && "border-green-400"
                  } `}
                >
                  {" "}
                  {selectedPayment === "institute" && (
                    <span className="flex bg-[#CBE3EF] justify-center items-center absolute top-0 right-0 border-2 border-green-400 shadow-md shadow-pink-200 w-6 h-6 rounded-full ">
                      ✔
                    </span>
                  )}
                  <img src="/img/institute.png" alt="" />
                </div>
                <p className="text-sm text-gray-500">Pay at institute</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between m-3">
        {step > 1 && (
          <Button
            name="Previous"
            type="button"
            onClick={() => setSearchParams({ step: `${parseInt(`${step}`) - 1}` })}
          />
        )}
        {step < 2 ? (
          <Button name="Next" type="submit" />
        ) : (
          <Button name="Submit" type="submit" />
        )}
      </div>
    </form>
  );
}
