import React from "react";
const Coursesbox = (props) => {
  return (
    <div className="flex flex-col bg-white  rounded-xl shadow-md relative justify-items-start gap-2 items-center p-1 ">
      <div className="h-48 w-full">
        <img className="rounded-t-xl object-cover w-full h-full" src={props.img} alt="" />
      </div>
      <div className="flex flex-col gap-2 p-4 relative ">
        <h2 className="text-xl font-semibold text-[#273469]">{props.courseName}</h2>
        <p className=" mb-4 text-sm text-gray-600">{props.description}</p>
        <div className="flex  gap-2 justify-end items-center">
          <button className="bg-[#273469] text-white rounded-lg p-2">
            {props.ViewDetails}
          </button>
          <button className="bg-[#273469] text-white rounded-lg p-2">Enroll Now</button>
        </div>
      </div>
    </div>
  );
};
export default Coursesbox;
