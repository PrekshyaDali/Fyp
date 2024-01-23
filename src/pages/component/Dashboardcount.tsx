import React from "react";
const Dashboardcount = (props) => {
  return (
    <div className=" shadow-lg p-5  text-center flex flex-col items-center space-y-5 bg-white rounded-md">
      <h1 className="text-2xl font-bold text-center">{props.title}</h1>
      <img className="w-16" src={props.img} alt="" />
      <span className="text-6xl font-semibold">{props.count}</span>
    </div>
  );
};

export default Dashboardcount;
