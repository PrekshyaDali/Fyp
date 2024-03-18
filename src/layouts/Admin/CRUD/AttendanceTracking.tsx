import React, { useState, useEffect } from "react";
import { useEditUsersQuery } from "@/feature/userApiSlice";
import { useParams } from "react-router-dom";
import { useGetEnrollmentByIdQuery } from "@/feature/userApiSlice";

export default function AttendanceTracking() {
  const { id } = useParams<{ id: string }>();

  // Fetch user data
  const { data: userData, isLoading: isUserDataLoading } = useEditUsersQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  // Fetch enrollment data
  const { data: enrollmentData } = useGetEnrollmentByIdQuery(id);

  // State to store the start date
  const [startDate, setStartDate] = useState<string>("");

  // State to store the present date
  const [presentDate, setPresentDate] = useState<string>("");

  // Function to format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Extract only the date part
  };

  // Set the start date and present date when enrollment data changes
  useEffect(() => {
    if (enrollmentData?.data?.startdate) {
      setStartDate(formatDate(enrollmentData.data.startdate));
      setPresentDate(formatDate(new Date().toISOString()));
    }
  }, [enrollmentData]);

  // Function to handle change in present date
  const handlePresentDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setPresentDate(selectedDate);
  };

  return (
    <div className="p-3 bg-[#E6F0FB]">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">Attendance Tracking</h1>
        <p className="text-sm text-gray-500">
          {userData?.firstname} {userData?.lastname}
        </p>
        <p className="text-sm text-gray-500">{enrollmentData?.data?.category}</p>
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
              min={startDate} // Set min attribute to start date
              value={presentDate}
              onChange={handlePresentDateChange}
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
              value="20" // You need to calculate the remaining days
            />
          </div>
        </div>

        <div className="mt-5">
          <button className="text-sm text-white bg-blue-400 hover:bg-blue-500 active:bg-blue-400 rounded-md px-6 py-2">
            Mark Attendance
          </button>
        </div>
      </div>
    </div>
  );
}
