import React from "react";

export default function Notifications() {
  return (
    <div className="w-full h-full m-3 ">
      <div className="flex flex-col w-full ">
        <h1 className="text-2xl font-bold ml-3 mt-3 mb-5">Notifications</h1>
        <div className="border-2 bg-[#CBE3EF] h-16 flex flex-col p-3 mb-3 rounded">
          <p className="font-semibold text-sm">
            <span className="mr-2">&#x2022;</span> Hello, this is Prekshya. What are you
            doing?
          </p>
          <p className="text-sm text-gray-400">2 March, 2024</p>
        </div>
        <div className="border-2 bg-[#CBE3EF] h-16 font-semibold flex items-center p-3 mb-3 rounded">
          <p className="text-sm">
            <span className="mr-2">&#x2022;</span> Hello, this is Prekshya. What are you
            doing?
          </p>
        </div>
      </div>
    </div>
  );
}
