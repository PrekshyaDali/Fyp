import React, { useState } from "react";

const CalendarComponent = () => {
  const [selectedDay, setSelectedDay] = useState(null);

  // Generate an array of days in a month
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  // Function to handle day click
  const handleDayClick = (day) => {
    setSelectedDay(day);
    // You can perform any action here when a day is clicked
    console.log("Clicked on day:", day);
  };

  return (
    <div className="max-w-md mx-auto ">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        {/* Calendar Header */}
        <div className="flex justify-between items-center px-6 py-3 bg-gray-200 dark:bg-gray-700">
          <button className="text-gray-600 dark:text-gray-400 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <span className="font-bold text-gray-800 dark:text-gray-200">October 2020</span>
          <button className="text-gray-600 dark:text-gray-400 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        {/* Calendar Body */}
        <div className="grid grid-cols-7 gap-1 p-4">
          {/* Render days of the week */}
          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
            <div
              key={day}
              className="text-center text-sm text-gray-600 dark:text-gray-400 font-medium"
            >
              {day}
            </div>
          ))}
          {/* Render days in the month */}
          {daysInMonth.map((day) => (
            <div
              key={day}
              onClick={() => handleDayClick(day)}
              className={`text-center text-sm font-medium py-2 rounded cursor-pointer ${
                selectedDay === day
                  ? "bg-blue-500 text-white"
                  : "text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
              }`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
