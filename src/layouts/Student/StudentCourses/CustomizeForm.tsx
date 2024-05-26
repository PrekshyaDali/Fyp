import React, { useEffect, useState } from "react";
import Button from "@/pages/component/Button";
import {
  useGetProfileQuery,
  useGetCourseQuery,
  useEnrollmentMutation,
  useGetEnrollmentQuery,
  useUpdateEnrollmentMutation,
  useGetCoursesQuery,
} from "@/feature/userApiSlice";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  useGetCustomizeDataMutation,
  useGetCustomizeDetailQuery,
} from "@/feature/adminApiSlice";

export default function CustomizeForm() {
  const { data: courses } = useGetCoursesQuery({});
  console.log(courses);
  const { data: customizedData } = useGetCustomizeDetailQuery({});
  console.log(customizedData);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: profileData } = useGetProfileQuery({});
  const { data: courseData } = useGetCourseQuery(id, {
    refetchOnMountOrArgChange: true,
    skip: !id,
  });
  const { data: enrollment } = useGetEnrollmentQuery({});
  const [enrollmentData] = useEnrollmentMutation();
  const [updateEnrollment] = useUpdateEnrollmentMutation();
  const [selectedPayment, setSelectedPayment] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [price, setPrice] = useState(0);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
    watch,
    getValues,
  } = useForm();

  const esewaClickHandler = () => {
    setSelectedPayment("esewa");
    navigate("/user/esewa");
  };

  const step = parseInt(`${searchParams.get("step")}`) || 1;

  useEffect(() => {
    const storedFormData = localStorage.getItem("formData");
    if (storedFormData) {
      const parsedFormData = JSON.parse(storedFormData);
      Object.entries(parsedFormData).forEach(([key, value]) => {
        setValue(key, value);
      });
    } else {
      setValue("firstname", profileData?.user?.firstname);
      setValue("lastname", profileData?.user?.lastname);
      setValue("email", profileData?.user?.email);
      setValue("contactnumber", profileData?.user?.contactnumber);
    }
  }, [setValue, profileData]);

  const [getCustomizeData] = useGetCustomizeDataMutation({});

  // useEffect(() => {
  //   if (courseData) {
  //     setValue("type", courseData.type);
  //     setValue("courseDuration", courseData.courseDuration);
  //     setValue("price", courseData.price);
  //     setValue("courseId", id);
  //   }
  // }, [setValue, courseData, id]);

  // Inside your component function...
  const onSubmitStep1 = async (data) => {
    console.log(data);
    try {
      // const res = await getCustomizeData({
      //   category: data.category,
      //   duration: data.duration,
      // }).unwrap();
      // console.log(res);

      getCalculatedPrice(data.category, data.duration);
      // Set the price state

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
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  const calculatePrice = (
    basePricePerDay,
    duration,
    discountPercent,
    maxDiscount,
    thresholdDays,
  ) => {
    console.log(basePricePerDay, duration, discountPercent, maxDiscount, thresholdDays);
    let applicableDiscountPercent = 0;
    if (duration >= thresholdDays) {
      applicableDiscountPercent = Math.min(discountPercent, maxDiscount);
    }

    const totalPrice = basePricePerDay * duration * (1 - applicableDiscountPercent / 100);
    setPrice(totalPrice);
    console.log(price);
    return { totalPrice, applicableDiscountPercent };
  };

  const getCalculatedPrice = (category, duration) => {
    console.log(category, duration);
    console.log(customizedData?.customizeCourse);
    {
      customizedData && customizedData?.customizeCourse[0]?.category === category
        ? calculatePrice(
            duration,
            customizedData?.customizeCourse[0]?.basePricePerDay,
            customizedData?.customizeCourse[0]?.maxDiscount,
            customizedData?.customizeCourse[0]?.discountPercent,
            customizedData?.customizeCourse[0]?.thresholdDays,
          )
        : calculatePrice(
            customizedData?.customizeCourse[0]?.basePricePerDay,
            duration,
            customizedData?.customizeCourse[0]?.discountPercent,
            customizedData?.customizeCourse[0]?.maxDiscount,
            customizedData?.customizeCourse[0]?.thresholdDays,
          );
    }
  };

  useEffect(() => {
    const category = watch("category");
    const duration = watch("duration");

    if (category && duration) {
      getCalculatedPrice(category, duration);
    }
  }, [watch("category"), watch("duration")]);

  const onSubmitStep2 = async (data1) => {
    if (!selectedPayment) {
      toast.error("Please select a payment option");
      return;
    } else {
      try {
          const category = data1.category;
          // Find the course that matches the category
          const matchedCourse = courses?.find((course) => course.type === category);
          if (!matchedCourse) {
            toast.error("No course found for the selected category");
            return;
          }
        const data2 = {
          firstname: profileData?.user?.firstname,
          lastname: profileData?.user?.lastname,
          contactnumber: profileData?.user?.contactnumber,
          email: profileData?.user?.email,
          category: data1.category,
          address: data1.address,
          price,
          duration: data1.duration,
          gender: data1.gender,
          emergencycontactnumber: data1.emergencycontactnumber,
          payment: selectedPayment,
          startdate: data1.startdate,

          courseId: matchedCourse._id,
          userId: profileData?.user?._id,
        };
        console.log(price);
        if (enrollment?.data?.course && enrollment?.data?.course === id) {
          await updateEnrollment({
            id: enrollment?.data?._id,
            body: data2,
          }).unwrap();
        } else {
          await enrollmentData(data2).unwrap();
        }
        toast.success("You have enrolled successfully");
        localStorage.removeItem("formData");
        if (selectedPayment === "esewa") {
          navigate("/user/esewa");
        } else {
          navigate("/user/courses");
        }
      } catch (errors) {
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
                    {...register("firstname")}
                    readOnly
                  />
                </div>
                <div className="w-full sm:w-1/2">
                  <label htmlFor="lastName1">Last Name</label>
                  <input
                    type="text"
                    id="lastName1"
                    className="inputfields"
                    {...register("lastname")}
                    readOnly
                  />
                </div>
              </div>

              <div className="sm:flex space-y-5 sm:space-y-0 sm:space-x-8">
                <div className="w-full sm:w-1/2">
                  <label htmlFor="Contact Number">Contact Number</label>
                  <input
                    type="text"
                    id="Contact Number"
                    className="inputfields"
                    {...register("contactnumber")}
                    readOnly
                  />
                </div>
                <div className="w-full sm:w-1/2">
                  <label htmlFor="Email">Email</label>
                  <input
                    type="text"
                    id="Email"
                    className="inputfields"
                    {...register("email")}
                    readOnly
                  />
                </div>
              </div>

              <div className="sm:flex space-y-5 sm:space-y-0 sm:space-x-8">
                <div className="w-full sm:w-1/2">
                  <label htmlFor="Category">Category</label>
                  <select
                    className="inputfields"
                    {...register("category", {
                      required: "This field is required",
                    })}
                    name="category"
                    id="category"
                  >
                    <option value="car">Car</option>
                    <option value="bike">Bike</option>
                    <option value="scooter">Scooter</option>
                  </select>
                  {errors.category && (
                    <span className="text-red-500">This field is required</span>
                  )}
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
                  </select>
                  {errors.gender && (
                    <span className="text-red-500">This field is required</span>
                  )}
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
                  <label htmlFor="StartDate">Start Date</label>
                  <input
                    type="date"
                    id="StartDate"
                    className="inputfields"
                    {...register("startdate", {
                      required: "This field is required",
                    })}
                  />
                  {errors.startdate && (
                    <span className="text-red-500">{errors.startdate.message}</span>
                  )}
                </div>

                <div className="w-full sm:w-1/2">
                  <label htmlFor="Duration">Duration</label>
                  <input
                    {...register("duration", {
                      required: "This field is required",
                    })}
                    type="text"
                    id="Duration"
                    className="inputfields"
                  />
                </div>
              </div>

              <div className="w-full sm:w-1/2">
                <label htmlFor="price">Price</label>
                <input
                  value={"Rs" + " " + price}
                  type="text"
                  id="price"
                  className="inputfields"
                />
              </div>

              <div>
                {customizedData?.customizeCourse?.map((item, index) => (
                  <ul key={index}>
                    <li>Threshold Days: {item.thresholdDays}</li>
                    <li>Discount Percent: {item.discountPercent}</li>
                    <li>Category: {item.category}</li>
                    <li>Base Price Per Day: {item.basePricePerDay}</li>
                    <li>Max Discount: {item.maxDiscount}</li>
                  </ul>
                ))}
              </div>
            </div>

            <div className="text-right">
              <Button type="submit" text="Next" />
            </div>
          </div>
        </>
      )}

      {step === 2 && (
        <div className="border-2 border-gray-300 m-3 rounded-md p-5 space-y-8 max-h-[80]">
          <h1 className="text-xl font-bold">Choose your payment option</h1>
          <div className="flex justify-center">
            <div className="flex flex-col space-y-8 sm:flex-row sm:space-y-0 sm:space-x-8">
              <div
                className={`flex flex-col justify-center items-center w-44 relative ${
                  selectedPayment === "esewa" ? "active:border-green-400" : ""
                }`}
                onClick={esewaClickHandler}
                onFocus={() => setSelectedPayment("esewa")}
                tabIndex={0}
              >
                <div
                  className={`w-44 h-28 border-2 flex justify-center items-center rounded-r-lg ${
                    selectedPayment === "esewa" && "border-green-400"
                  }`}
                >
                  {selectedPayment === "esewa" && (
                    <span className="flex justify-center bg-[#CBE3EF] items-center absolute top-0 right-0 border-2 border-green-400 shadow-md shadow-pink-200 w-6 h-6 rounded-full">
                      ✔
                    </span>
                  )}
                  <img src="/img/khalti.png" alt="" />
                </div>
                <p className="text-sm text-gray-500">Pay via Khalti</p>
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
                  }`}
                >
                  {selectedPayment === "institute" && (
                    <span className="flex bg-[#CBE3EF] justify-center items-center absolute top-0 right-0 border-2 border-green-400 shadow-md shadow-pink-200 w-6 h-6 rounded-full">
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

      <div className="flex flex-col space-y-5 sm:flex-row sm:space-y-0  sm:justify-between m-3">
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
