import React from "react";
import { useGetNotificationsQuery } from "@/feature/adminApiSlice";
import moment from "moment-timezone";

export default function Notifications() {
  const { data: notificationData, isLoading } = useGetNotificationsQuery({});
  console.log(notificationData, "notificationData");

  // Function to format time as "HH:mm"

  function formatTime(dateString) {
    // Parse the date with the correct time zone
    const date = moment(dateString).tz("Asia/Kathmandu");
    // Format it to a more readable format
    return date.format("YYYY-MM-DD HH:mm A"); // Adjust as needed
  }

  return (
    <div className="w-full h-full m-3">
      {isLoading && <p>Loading...</p>}

      <div className="flex flex-col w-full">
        <h1 className="text-2xl font-bold ml-3 mt-3 mb-5">Notices</h1>
        {notificationData?.data?.length === 0 && (
          <p className="text-center text-xl font-semibold">No notifications found</p>
        )}
        {notificationData?.data?.map((notification, index) => (
          <div
            key={index}
            className="shadow-sm bg-white h-fit flex flex-col p-3 mb-5 space-y-3 rounded"
          >
            <p className="font-semibold text-sm">
              <span className="mr-2">&#x2022;</span> {notification.notification}
            </p>
            <p className="text-sm text-gray-400">
              <span className="text-purple-400">
                {formatTime(notification.created_at)}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
