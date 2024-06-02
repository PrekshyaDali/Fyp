import React from "react";
const Upload = () => {
  return (
    <div className="text-[#1E2749] relative w-48">
      <button className=" btn_hover border-2 h-9 w-48 rounded-lg hover:bg-white hover:active:bg-gray-50 ">Upload</button>
      <img src="upload.png" className="h-5 w-5 absolute top-2 right-3  " />
    </div>
  );
};
export default Upload;
