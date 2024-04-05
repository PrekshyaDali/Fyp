import Button from "@/pages/component/Button";
import CalendarComponent from "@/pages/component/CalendarComponent";
import React from "react";
import Calendar from "react-calendar";

export default function MyCourses() {
  return (
    <div className="w-full h-full m-3 p-3 pr-3">
      <h1 className="font-semibold text-2xl mb-5">My Courses</h1>
      <div className="flex justify-between space-x-5 pr-3">
        {/* Course Details */}
        <div className="flex space-x-5 h-56 flex-1  shadow-md rounded-md bg-[#F4F4FE]">
          <div className="w-1/3 h-full  ">
            <img className="object-contain w-full h-full" src="/img/Car.png" alt="" />
          </div>
          <div className="pl-5 pr-5 pt-5 flex flex-col space-y-5">
            <h2 className="text-xl font-semibold text-blue-400">Car Course</h2>
            <div className="flex space-x-3 text-gray-400 text-sm">
              <p className="">Enrolled Date:</p>
              <span className="text-purple-400">2024-04-05</span>
            </div>
            <div className="flex space-x-3 text-gray-400 text-sm">
              <p className="">Package Amount</p>
              <span className="text-purple-400">Rs 30000</span>
            </div>
            <div className="flex justify-end text-sm ">
              <Button name="View Details" />
            </div>
          </div>
        </div>

        {/* Calendar Component */}
        <div className="w-96">
          <CalendarComponent />
        </div>
      </div>
    </div>
  );
}
