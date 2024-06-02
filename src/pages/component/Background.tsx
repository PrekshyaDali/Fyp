import React from "react";

export default function Background() {
  return (
    <div className="flex h-screen justify-center items-center flex-col relative">
      <img
        className="w-full h-[50vh] bg-cover bg-center absolute inset-0 filter blur-md"
        src="/img/background.jpg"
        alt=""
      />
      <div className="w-full h-full flex justify-center items-center backdrop-filter backdrop-blur-md">
        {/* Your content goes here */}
      </div>
    </div>
  );
}
