import React from "react";
import { Link } from "react-router-dom";
import { useGetCoursesQuery } from "@/feature/userApiSlice";
import Button from "@/pages/component/Button";

const Coursesbox = (props) => {
  console.log(props, "props");
  return (
    <div className="flex flex-col  bg-white rounded-xl shadow-md justify-items-start gap-2 items-center p-1 max-w-64 sm:max-w-full  h-auto">
      <div className="h-48 w-full">
        <img
          className="rounded-t-xl  object-cover  w-full h-full"
          src={props.img}
          alt=""
        />
      </div>

      <div className="flex flex-col gap-2 sm:p-4 ">
        <div className="flex space-x-5">
          <h2 className="text-xl font-semibold text-[#273469]">{props.title}</h2>
          <span className="py-1 px-6 rounded-full text-blue-900 bg-blue-400   bg-opacity-50   shadow-md shadow-gray=500">
            {props.courseDuration}
          </span>
        </div>
        <p className="mb-4 text-sm text-gray-600 max-w-xs line-clamp-2">
          {props.description}
        </p>
      </div>

      <div className="flex justify-end w-full items-center gap-4 mb-2 mr-4">
        <Link to={`/user/courses/${props.id}`}>
          <button className="bg-blue-500 hover:bg-blue-400 active:bg-blue-500 text-white rounded-lg p-2">
            View Details
          </button>
        </Link>
        {!props?.enroll ? (
          <Link to={`/user/Enrollmentforms/${props.id}`}>
            <button className="bg-blue-500 hover:bg-blue-400 active:bg-blue-500 text-white rounded-lg p-2">
              Enroll Now
            </button>
          </Link>
        ) : (
          <button className="bg-pink-200  text-pink-900  rounded-full p-2 px-4">
            Already enrolled
          </button>
        )}
      </div>
    </div>
  );
};

export default Coursesbox;
