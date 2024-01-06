import React from "react";
import {useState } from "react";

const Button = (props) => {

    
    return (
      <div>
        <button
          className={`bg-[#1E2749] rounded-lg text-white w-40 h-10 flex items-center justify-center 
              ${
                props.isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-800 hover:active:bg-[#1E2749]"
              }`}
          type="submit"
          disabled={props.isLoading}
        >
          <span className={`flex items-center`}>
            {props.name}
            {props.isLoading && (
              <div className="ml-3 animate-spin h-5 w-5 border-t-2 border-white border-solid rounded-full"></div>
            )}
          </span>
        </button>
      </div>
    );
    }
    export default Button;