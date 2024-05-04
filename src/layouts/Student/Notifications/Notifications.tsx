import React from "react";
import { useGetNotificationsQuery } from "@/feature/adminApiSlice";

export default function Notifications() {
  const { data: notificationData, isLoading } = useGetNotificationsQuery({});
  console.log(notificationData, "notificationData");

  // Function to format time as "HH:mm"
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;
    return formattedTime;
  };

  return (
    <div className="w-full h-full m-3">
      <div className="flex flex-col w-full">
        <h1 className="text-2xl font-bold ml-3 mt-3 mb-5">Notices</h1>

        {notificationData?.data?.map((notification, index) => (
          <div
            key={index}
            className="shadow-sm bg-white h-fit flex flex-col p-3 mb-5 space-y-3 rounded"
          >
            <p className="font-semibold text-sm">
              <span className="mr-2">&#x2022;</span> {notification.notification}
            </p>
            <p className="text-sm text-gray-400">
              {new Date(notification.date).toISOString().split("T")[0]}{" "}{"at"}{" "}
              <span className = "text-purple-400">{formatTime(notification.date)}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
