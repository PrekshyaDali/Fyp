import React from "react";
const Coursesbox = (props) => {
  return (
    <div className="bg-white  rounded-lg shadow-md relative ">
      <div className="flex items-center justify-center h-32">
        <img className="w-36" src={props.img} alt="" />
      </div>
      <h2 className="text-xl font-semibold mb-2 text-center text-[#273469]">
        {props.courseName}
      </h2>
      <p className=" mb-4 text-sm px-5 text-gray-600">{props.description}</p>

      <button className="w-full h-8 absolute bottom-0 bg-[#E4D9FF] text-[#273469] hover:bg-purple-300 hover:active:bg-[#E4D9FF]">
        {props.ViewDetails}
      </button>
      <div className= "flex justify-end">
        <img className="absolute bottom-2 right-4 h-5" src="/img/rightarrow.png" alt="" />
      </div>
    </div>
  );
};
export default Coursesbox;
