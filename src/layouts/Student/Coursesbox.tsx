import React from "react";
import { Link } from "react-router-dom";
import { useGetCoursesQuery } from "@/feature/userApiSlice";

const Coursesbox = (props) => {
  return (
    <div className="flex flex-col bg-white rounded-xl shadow-md justify-items-start gap-2 items-center p-1 max-w-64 sm:max-w-full h-auto">
      <div className="h-48 w-full">
        <img
          className="rounded-t-xl object-cover w-full h-full"
          src={"/img/car.jpg"}
          alt=""
        />
      </div>

      <div className="flex flex-col gap-2 p-4">
        <div className = "flex space-x-5">
          <h2 className="text-xl font-semibold text-[#273469]">{props.title}</h2>
          <span className="py-1 px-6 rounded-md text-[#694DCA] font-semibold bg-opacity-10  bg-pink-500 shadow-md shadow-pink-500">
            {props.courseDuration}
          </span>
        </div>
        <p className="mb-4 text-sm text-gray-600 max-w-xs truncate overflow-hidden sm:max-w-xs sm:overflow-hidden sm:truncate sm:min-h-[2.5em]">
          {props.description}
        </p>
      </div>

      <div className="flex justify-end w-full items-center gap-4 mb-2 mr-4">
        <Link to={`/user/courses/${props.id}`}>
          <button className="bg-[#273469] text-white rounded-lg p-2">View Details</button>
        </Link>
        <Link to={`/user/Enrollmentforms/${props.id}`}>
          <button className="bg-[#273469] text-white rounded-lg p-2">Enroll Now</button>
        </Link>
      </div>
    </div>
  );
};

export default Coursesbox;
