import React from "react";
const Dashboardcount = (props) => {
  return (
    <div className=" shadow-lg p-5   flex flex-col space-y-5 relative bg-[#F6F7F2] bg- rounded-md">
      <span className="text-3xl  font-semibold">{props.count}</span>
      <img className="w-8 absolute right-5" src={props.img} alt="" />
      <h1 className="text-xl text-gray-500 font-bold ">{props.title}</h1>
    </div>
  );
};

export default Dashboardcount;
