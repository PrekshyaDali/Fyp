import React from "react";
import { Link } from "react-router-dom";
const Coursesbox = (props) => {
  return (
    <div className="flex flex-col bg-white  rounded-xl shadow-md relative justify-items-start gap-2 items-center p-1 max-w-64 h-96">
      <div className="h-48 w-full">
        <img
          className="rounded-t-xl object-cover w-full h-full"
          src={"/img/car.jpg"}
          alt=""
        />
      </div>
      <div className="flex flex-col gap-2 p-4  ">
        <h2 className="text-xl font-semibold text-[#273469]">{props.title}</h2>
        <p className=" mb-4 text-sm text-gray-600">{props.description}</p>
        <div className="flex gap-2 justify-end  absolute bottom-3 right-3">
          <button className="bg-[#273469] text-white rounded-lg p-2 ">View Detail</button>
          <button className="bg-[#273469] text-white rounded-lg p-2">Enroll Now</button>
        </div>
      </div>
    </div>
  );
};
export default Coursesbox;
