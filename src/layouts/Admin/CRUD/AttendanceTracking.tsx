import React from "react";
import { useEditUsersQuery } from "@/feature/userApiSlice";
import { useParams } from "react-router-dom";

export default function AttendanceTracking() {
 
  return (
    <div className="p-3 bg-[#E6F0FB]">
      <div className="flex flex-col ">
        <h1 className="text-2xl font-bold">Attendance Tracking</h1>
        <p className="text-sm text-gray-500">Prekshya Dali</p>
        <p className="text-sm text-gray-500">Bike</p>
        <div className="flex space-x-5 flex-1">
          <div>
            <label htmlFor="StartDate">StartDate</label>
            <input
              type="text"
              value="2022-01-05"
              className="bg-white border-2 text-sm p-1 w-full "
            />
          </div>

          <div>
            <label htmlFor="Date">Present Date</label>
            <input type="date" className="bg-white border-2 text-sm p-1 w-full" />
            <style>
              {`
                    input[type="date"]::-webkit-calendar-picker-indicator {
                    filter: invert(1);
                    }
                  `}
            </style>
          </div>
          <div>
            <label htmlFor="Days remaining">Days Remained</label>
            <input
              type="text"
              className="bg-white border-2 text-sm p-1 w-full"
              value="20"
            />
          </div>
        </div>

        <div className="mt-5">
          <button className="text-sm text-white bg-blue-400 hover:bg-blue-500 active:bg-blue-400 rounded-md px-6 py-2  ">
            Mark Attendance
          </button>
        </div>
      </div>
    </div>
  );
}
