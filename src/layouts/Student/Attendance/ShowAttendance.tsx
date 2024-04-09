import { useGetAttendanceQuery } from "@/feature/userApiSlice";
import React from "react";
import { useParams } from "react-router-dom";

export default function ShowAttendance() {
  const { enrollmentId } = useParams<{ enrollmentId: string }>(); // Destructure enrollmentId directly
  console.log(enrollmentId);
  const { data: attendanceData, isLoading } = useGetAttendanceQuery(enrollmentId);
  console.log(attendanceData);
  return (
    <div className="w-full h-full m-3 p-3">
      <h1 className="text-2xl font-semi-bold mb-5">Transaction History</h1>
      <h2>Remaining Days <span></span></h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">SN</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Time</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData?.attendance.map((attendance, index) => (
              <tr key = {index} className="border-b bg-white">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  {new Date(attendance.date).toISOString().split("T")[0]}
                </td>
                <td className="px-4 py-2"></td>
                <td className="px-4 py-2 font-bold text-green-600">Present</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
