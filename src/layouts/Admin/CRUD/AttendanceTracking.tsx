import React from "react";
import { useParams } from "react-router-dom";
import { useOneEnrollmentUserQuery } from "@/feature/userApiSlice";
import BackButton from "@/pages/component/BackButton";
import { useState, useEffect } from "react";

export default function AttendanceTracking() {
  const { enrollmentId } = useParams<{ enrollmentId: string }>();

  // Fetch enrollment data using enrollmentId
  const { data: enrollmentData, isLoading } = useOneEnrollmentUserQuery(enrollmentId);

  // State to store the start date
  const [startDate, setStartDate] = useState<string>("");

  // State to store the present date
  const [presentDate, setPresentDate] = useState<string>("");

  // Set the start date and present date when enrollment data changes
  useEffect(() => {
    if (enrollmentData?.data?.startdate) {
      setStartDate(enrollmentData?.data?.startdate);
      setPresentDate(new Date().toISOString().split("T")[0]); // Set present date to today
    }
  }, [enrollmentData]);

  // Function to calculate remaining days
  const calculateRemainingDays = () => {
    const remainingDays = 20; // Assuming 20 days for demonstration
    return remainingDays.toString();
  };

  return (
    <div className="p-3 flex flex-col space-y-5">
      <div className=" flex flex-col md:flex-row bg-[#E6F0FB] p-5">
        <div className="flex-1 w-full">
          <h1 className="text-2xl font-semibold mb-3">Payment Details</h1>
          <div className="w-full md:w-1/2 flex items-center mb-3">
            <label htmlFor="Payment" className="mr-2 text-sm">
              Payment Type
            </label>
            <select className="bg-white border-2 text-sm p-1 w-full">
              <option value="Unpaid">Unpaid</option>
              <option value="Half Payment">Half Payment</option>
              <option value="Full Payment">Full Payment</option>
            </select>
          </div>

          {/* Paid amount */}
          <div className="w-full md:w-1/2 flex items-center mb-3">
            <label htmlFor="" className="mr-2 text-sm">
              Paid Amount
            </label>
            <input type="text" className="bg-white border-2 text-sm p-1 w-full" />
          </div>

          {/* Due amount */}
          <div className="w-full md:w-1/2 flex items-center">
            <label htmlFor="" className="mr-2 text-sm">
              Due Amount
            </label>
            <input type="text" className="bg-white border-2 text-sm p-1 w-full" />
          </div>
        </div>

        {/* right div */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">SN</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">1</td>
                <td className="border px-4 py-2">2024-03-19</td>
                <td className="border px-4 py-2">$100.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-5">
        <h1 className="text-2xl font-bold mb-3">Attendance Tracking</h1>
        <p className="text-sm text-gray-500 mb-1">
          {/* Display enrollment data if available */}
          {enrollmentData?.data?.firstname &&
            `${enrollmentData.data.firstname.toUpperCase()} ${enrollmentData.data.lastname.toUpperCase()}`}
        </p>
        <p className="text-sm text-gray-500 mb-3">
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
          <button
            className="text-sm text-white bg-blue-400 hover:bg-blue-500 active:bg-blue-400 rounded-md px-6 py-2 "
            isLoading={isLoading}
          >
            Mark Attendance
          </button>
          <BackButton />
        </div>
      </div>
    </div>
  );
}
