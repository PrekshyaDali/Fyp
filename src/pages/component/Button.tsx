import React from "react";
import {useState } from "react";

const Button = (props) => {

    
    return (
      <div>
        <button
          className={`bg-blue-400 rounded-lg text-white  p-5 px-12 h-10 flex items-center justify-center 
              ${
                props.isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#82C2E6] hover:active:bg-[#365486]"
              }`}
          type="submit"
          disabled={props.isLoading}
          onClick={props.onClick}
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