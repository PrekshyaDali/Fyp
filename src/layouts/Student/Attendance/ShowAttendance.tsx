import { useGetAttendanceQuery } from "@/feature/userApiSlice";
import BackButton from "@/pages/component/BackButton";
import React from "react";
import { useParams } from "react-router-dom";

export default function ShowAttendance() {
  const { enrollmentId } = useParams<{ enrollmentId: string }>();
  const { data: attendanceData, isLoading } = useGetAttendanceQuery(enrollmentId);

  return (
    <div className=" p-6 ">
      <div className="mb-3">
        <BackButton />
      </div>
      <h1 className="text-2xl font-bold mb-5">Attendance History</h1>
      <div className="">
        <div className="flex space-x-5 items-center mb-4">
          <h2 className="font-semibold">Remaining Days</h2>
          <div className="h-8 flex justify-center items-center bg-purple-300 rounded-md opacity-80 text-white font-bold b w-20">
            {attendanceData?.remainingDays}
          </div>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-900">
              No any Data available
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {attendanceData && attendanceData.attendance.length > 0 ? (
              attendanceData.attendance.map((attendance, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-md shadow-sm flex justify-between items-center"
                >
                  <div>
                    <p className="font-bold">{index + 1}</p>
                    <p className="text-gray-500">
                      {new Date(attendance.date).toISOString().split("T")[0]}
                    </p>
                  </div>
                  <div className="text-green-500">Present</div>
                </div>
              ))
            ) : (
              <div className = "flex justify-center ">
                <p className=" text-2xl ">No attendance data available</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
