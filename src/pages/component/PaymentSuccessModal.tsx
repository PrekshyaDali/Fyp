import React from "react";
import BackButton from "./BackButton";
import { Link } from "react-router-dom";

export default function PaymentSuccessModal(props) {
  console.log(props);
  return (
    <div className="w-full h-fulll flex items-center justify-center p-5">
      <div className="h-72 w-80  rounded-md shadow-md bg-white mt-20 flex flex-col items-center justify-center space-y-5 ">
        <div className="flex justify-center">
          <div className="h-28 w-28 p-1 border-2 rounded-full ">
            <img className="object-cover" src={props.img} alt="" />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl text-gray-400 font-semibold">{props.message}</h1>
          <p className="text-gray-400">{props.description}</p>
          <span className="text-gray-400">{props.money}</span>
        </div>
        <div>
          <Link to="/user/courses">
            <button className="w-full bg-gray-400 h-10 px-6 rounded-md  text-white">
              Return
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
