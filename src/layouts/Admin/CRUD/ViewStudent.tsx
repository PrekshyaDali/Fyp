import Button from "@/pages/component/Button";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEditUsersQuery, useGetEnrollmentByIdQuery } from "@/feature/userApiSlice";
import { useParams } from "react-router-dom";
import BackButton from "@/pages/component/BackButton";
import { useEditDetailsMutation } from "@/feature/userApiSlice";

const ViewStudent = () => {
  const { id } = useParams<{ id: string }>();
  const { data: userData, isLoading: isUserDataLoading } = useEditUsersQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const { data: enrollmentData } = useGetEnrollmentByIdQuery(id);
  console.log(enrollmentData, "enrollmentData");
  console.log(userData, "data");
  console.log(typeof id, id);

  return (
    <div className="p-3">
      <div className="mb-3">
        <BackButton></BackButton>
      </div>
      <div className="h-auto md:h-auto border-2 bg-[#E6F0FB] rounded-md flex  md:flex-row">
        <div className="p-3 flex-1 space-y-3 md:mr-6">
          <div>
            <h1 className="text-2xl font-bold">
              {userData?.firstname} {userData?.lastname}
            </h1>
            <p className="text-sm text-gray-500">{userData?.email}</p>
            <p className="text-sm text-gray-500">{userData?.contactnumber}</p>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-5">
            <div className="w-full md:w-1/2 flex items-center">
              <label htmlFor="Category" className="mr-2 md:w-1/3 text-sm">
                {enrollmentData?.data?.category}
              </label>
              <input
                type="text"
                className="bg-white border-2 text-sm p-1 w-full"
                value="Scooter"
              />
            </div>
            <div className="w-full md:w-1/2 flex items-center">
              <label htmlFor="EnrollmentStatus" className="mr-2 md:w-1/3 text-sm">
                Enrollment Status
              </label>
              <input
                type="text"
                className="bg-white border-2 text-sm p-1 w-full"
                value="Enrolled"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-5">
            <div className="w-full md:w-1/2 flex items-center">
              <label htmlFor="PaymentMethod" className="mr-2 md:w-1/3 text-sm">
                Payment Method
              </label>
              <input
                type="text"
                className="bg-white border-2 text-sm p-1 w-full"
                value={enrollmentData?.data?.payment}
              />
            </div>
            <div className="w-full md:w-1/2 flex items-center">
              <label htmlFor="PaymentType" className="mr-2 md:w-1/3 text-sm">
                Payment Type
              </label>
              <select className="bg-white border-2 text-sm p-1 w-full" name="" id="">
                <option value="Unpaid">Unpaid</option>
                <option value="Half Payment">Half Payment</option>
                <option value="Full Payment">Full Payment</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-5 ">
            <div className="w-full md:w-1/2 flex items-center">
              <label htmlFor="Amount" className="mr-2 md:w-1/3 text-sm">
                Amount
              </label>
              <input
                type="text"
                className="bg-white border-2 text-sm p-1 w-full"
                value="Rs 5000"
              />
            </div>
          </div>

          <div className="flex justify-end mt-5 space-x-3">
            <button className="text-sm text-white bg-blue-400 hover:bg-blue-500 active:bg-blue-400 rounded-md px-6 py-2  ">
              Save
            </button>
          </div>
        </div>

        <div className="w-44 md:w-44 h-fit">
          <img className="object-cover" src="/img/Scooter1.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default ViewStudent;
