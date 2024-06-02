import { useGetSearchQuery } from "@/feature/userApiSlice";
import { useIsomorphicLayoutEffect } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import React, { useState } from "react";

import { toast } from "react-toastify";
const Search = (props) => {
  


  return (
    <div className="px-5 relative">
      <input
       
        onChange={(e) => props.setInput(e.target.value)}
        placeholder="Search"
        type="text"
        className=" p-3 w-full bg-white h-10 rounded-md shadow-sm hover:bg-slate-50  "
      />
      <img className="h-6 absolute right-10 top-2" src="/img/search.png" alt="" />
    </div>
  );
};

export default Search;
