import React from "react";
import { useGetNotificationsQuery } from "@/feature/adminApiSlice";

export default function Notifications() {
  const { data: notificationData, isLoading } = useGetNotificationsQuery({});
  console.log(notificationData, "notificationData");

  return (
    <div className="w-full h-full m-3">
      <div className="flex flex-col w-full">
        <h1 className="text-2xl font-bold ml-3 mt-3 mb-5">Notifications</h1>

        {notificationData?.data?.map((notification, index) => (
          <div
            key={index}
            className="shadow-sm bg-white h-fit flex flex-col p-3 mb-5 space-y-3 rounded"
          >
            <p className="font-semibold text-sm">
              <span className="mr-2">&#x2022;</span> {notification.notification}
            </p>
            <p className="text-sm text-gray-400">
              {new Date(notification.date).toISOString().split("T")[0]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
