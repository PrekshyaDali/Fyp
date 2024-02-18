import React from "react";
import Button from "@/pages/component/Button";
import { useGetProfileQuery, userApiSlice } from "@/feature/userApiSlice";
import { useParams } from "react-router-dom";
import { useGetCourseQuery } from "@/feature/userApiSlice";
import {useForm} from "react-hook-form";
import { IEnrollment } from "@/index";
import { useEnrollmentMutation } from "@/feature/userApiSlice";
import { toast } from "react-toastify";
export default function EnrollmentForms() {
  const { data } = useGetProfileQuery({});
   const { id } = useParams<{ id: string }>();
   const { data: courseData } = useGetCourseQuery(id, { refetchOnMountOrArgChange: true });
   const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm();
  const [enrollmentData, ] = useEnrollmentMutation();

   const SubmitHandler = async(data1: IEnrollment)=>{
    try{
    const data2= {
      firstname : data1.firstname,
      lastname : data1.lastname,
      contactnumber : data1.contactnumber,
      email : data1.email,
      category : courseData?.type,
      address : data1.address,
      price: courseData?.price,
      duration: courseData?.courseDuration,
      gender: data1.gender,
      emergencycontact: data1.emergencycontact

    }

    console.log(data2);
    const res = await enrollmentData(data2).unwrap();
    console.log(res, "res");
    toast.success("You have enrolled successfully");
    reset();
    }
    catch(errors){
      console.log(errors, "err");
      const { data } = errors as { data: { message: string } };
      toast.error(data.message);
    }

   }
   
  console.log(data, "data");
  console.log(courseData, "courseData")
  return (
    <form  onSubmit={handleSubmit(SubmitHandler)}>
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
                defaultValue={data?.user.firstname}
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
              
                defaultValue={data?.user.lastname}
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
                defaultValue={data?.user.contactnumber}
                type="text"
                id="Contact Number"
                className="inputfields"
                {...register("contactnumber", {
                  required: "This field is required",
                  pattern: { value: /^[1-9]+$/, message: "Please enter a valid number" },
                })
                }
              />
              {errors.contactnumber && (
                <span className="text-red-500">{String(errors.contactnumber.message)}</span>
              )}
            </div>
            <div className="w-full sm:w-1/2">
              <label htmlFor="Email">Email</label>

              <input
                defaultValue={data?.user.email}
                type="text"
                id="Email"
                className="inputfields"
                {
                  ...register("email", {
                    required: "This field is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address"
                    }
                  })
                }
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
                value={courseData?.type } 
                type="text"
                id="Category"
                className="inputfields"
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label htmlFor="Address">Address</label>
              <input type="text" id="Address" className="inputfields"
              {...register("address", {
                required: "This field is required",
              })
              }
              />
              {errors.address && (
                <span className="text-red-500">This field is required</span>
              )}

            </div>
          </div>

          <div className="sm:flex space-y-5 sm:space-y-0 sm:space-x-8">
            <div className="w-full sm:w-1/2">
              <label htmlFor="Gender">Gender</label>
              <select id="Gender" className="inputfields"
              {
                ...register("gender",{
                  required: "This field is required",
                
                })
              }
              
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                {
                  errors.gender && ( <span className="text-red-500">This field is required</span>)
                }

              </select>
            </div>

            <div className="w-full sm:w-1/2">
              <label htmlFor="Emergency Contact Info">Emergency Contact Info</label>
              <input type="text" id="Emergency Contact Info" className="inputfields" 
              {...register("emergencycontact", {
                required: "This field is required",
              })
              }
              
              />
              {errors.emergencycontact && (
                <span className="text-red-500">This field is required</span>
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
            />
            <label htmlFor="Category" className="text-sm">
              I have read and agree to all the terms and conditions. Once submitted, it
              cannot be cancelled.
            </label>
          </div>

          <div className="flex justify-center">
            <Button name="Submit"></Button>
          </div>
        </div>
      </div>
    </form>
  );
}