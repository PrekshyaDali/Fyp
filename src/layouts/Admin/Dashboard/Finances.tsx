import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Attendance = () => {
  // Sample data for attendance records
  const [attendanceRecords, setAttendanceRecords] = useState([
    { id: 1, date: "2024-03-18", status: "Present" },
    { id: 2, date: "2024-03-17", status: "Absent" },
    { id: 3, date: "2024-03-16", status: "Present" },
    // Add more sample data as needed
  ]);

  const [selectedDate, setSelectedDate] = useState(new Date());

  // Function to handle date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Filter attendance records for the selected date
  const filteredAttendanceRecords = attendanceRecords.filter(
    (record) => record.date === selectedDate.toISOString().split("T")[0],
  );

  const attendanceStatus =
    filteredAttendanceRecords.length > 0
      ? filteredAttendanceRecords[0].status
      : "No record found";

  const notificationMessage =
    attendanceStatus === "Present"
      ? "You were present for the driving class today."
      : attendanceStatus === "Absent"
      ? "You missed the driving class today."
      : "No attendance record found for today.";

  return (
    <div className="container mx-auto mt-8 space-y-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg p-8">
      <h1 className="text-3xl font-bold mb-4 text-white">Driving School Attendance</h1>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-1 bg-white p-6 rounded-lg shadow-lg space-y-4">
          <h2 className="text-xl font-bold mb-4">Calendar</h2>
          <Calendar onChange={handleDateChange} value={selectedDate} />
        </div>
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-lg space-y-6">
          <h2 className="text-xl font-bold">Attendance Details</h2>
          <div>
            <p className="text-lg font-semibold mb-2">
              Attendance Record for {selectedDate.toDateString()}
            </p>
            <div className="grid grid-cols-3 gap-4">
              {filteredAttendanceRecords.map((record) => (
                <div
                  key={record.id}
                  className={`border px-4 py-2 rounded-md ${
                    record.status === "Present"
                      ? "bg-green-100 border-green-400 text-green-700"
                      : "bg-red-100 border-red-400 text-red-700"
                  }`}
                >
                  <p className="text-sm font-semibold">Date: {record.date}</p>
                  <p className="text-sm">Status: {record.status}</p>
                </div>
              ))}
            </div>
          </div>
          <div
            className={`border px-4 py-2 rounded-md ${
              attendanceStatus === "Present"
                ? "bg-green-100 border-green-400 text-green-700"
                : attendanceStatus === "Absent"
                ? "bg-red-100 border-red-400 text-red-700"
                : "bg-yellow-100 border-yellow-400 text-yellow-700"
            }`}
          >
            <p className="text-lg font-semibold">{notificationMessage}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
