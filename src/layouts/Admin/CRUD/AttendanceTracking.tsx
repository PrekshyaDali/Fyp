import React from "react";
import { useParams } from "react-router-dom";
import { useOneEnrollmentUserQuery } from "@/feature/userApiSlice";
import BackButton from "@/pages/component/BackButton";
import { useState, useEffect } from "react";

export default function AttendanceTracking() {
  const { enrollmentId } = useParams<{ enrollmentId: string }>();

  // Fetch enrollment data using enrollmentId
  const { data: enrollmentData } = useOneEnrollmentUserQuery(enrollmentId);
  console.log(enrollmentData)
  console.log(enrollmentData?.data?.startdate);

  // State to store the start date
  const [startDate, setStartDate] = useState<string>("");

  // State to store the present date
  const [presentDate, setPresentDate] = useState<string>("");

  // Set the start date and present date when enrollment data changes
  useEffect(() => {
    if (enrollmentData?.data?.startdate) {
      setStartDate(enrollmentData.data.startdate);
      setPresentDate(new Date().toISOString().split("T")[0]); // Set present date to today
    }
  }, [enrollmentData]);

  // Function to calculate remaining days
  const calculateRemainingDays = () => {
    // Implement your logic to calculate remaining days here
    // For example:
    const remainingDays = 20; // Assuming 20 days for demonstration
    return remainingDays.toString();
  };

  return (
    <div className="p-3 bg-[#E6F0FB]">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">Attendance Tracking</h1>
        <p className="text-sm text-gray-500">
          {/* Display enrollment data if available */}
          {enrollmentData?.data?.firstname &&
            `${enrollmentData.data.firstname.toUpperCase()} ${enrollmentData.data.lastname.toUpperCase()}`}
        </p>
        <p className="text-sm text-gray-500">
          {enrollmentData?.data?.category?.toUpperCase()}
        </p>
        <div className="flex space-x-5 flex-1">
          <div>
            <label htmlFor="StartDate">Start Date</label>
            <input
              type="text"
              value={startDate}
              className="bg-white border-2 text-sm p-1 w-full"
              readOnly
            />
          </div>

          <div>
            <label htmlFor="Date">Present Date</label>
            <input
              type="date"
              className="bg-white border-2 text-sm p-1 w-full"
              min={startDate}
              value={presentDate}
              readOnly
            />
            <style>
              {`
                input[type="date"]::-webkit-calendar-picker-indicator {
                  filter: invert(1);
                }
              `}
            </style>
          </div>
          <div>
            <label htmlFor="Days remaining">Days Remaining</label>
            <input
              type="text"
              className="bg-white border-2 text-sm p-1 w-full"
              value={calculateRemainingDays()}
              readOnly
            />
          </div>
        </div>

        <div className="mt-5 space-x-3 flex justify-between">
          <button className="text-sm text-white bg-blue-400 hover:bg-blue-500 active:bg-blue-400 rounded-md px-6 py-2">
            Mark Attendance
          </button>
          <BackButton></BackButton>
        </div>
      </div>
    </div>
  );
}
