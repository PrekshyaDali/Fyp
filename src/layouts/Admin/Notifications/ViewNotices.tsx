import { useShowNotificationToAdminQuery } from "@/feature/adminApiSlice";
import Button from "@/pages/component/Button";
import React from "react";
import moment from "moment-timezone";
import { Link } from "react-router-dom";

function formatTime(dateString) {
  // Parse the date with the correct time zone
  const date = moment(dateString).tz("Asia/Kathmandu");
  // Format it to a more readable format
  return date.format("YYYY-MM-DD HH:mm A"); // Adjust as needed
}

export default function ViewNotices() {
  const { data: notificationData } = useShowNotificationToAdminQuery({});
  console.log(notificationData);
  return (
    <div className="p-3 flex-col space-y-5 m-3">
      <div>
        <div>
          <h1 className="text-2xl font-semibold">Notices</h1>
        </div>
        <div className="flex justify-end">
          <Link to="/admin/addNotifications">
            <Button name="Add Notices"></Button>
          </Link>
        </div>
      </div>
      {notificationData?.data?.map((notification, index) => (
        <div
          key={index}
          className="shadow-sm bg-white h-fit flex flex-col p-3 mb-5 space-y-3 rounded"
        >
          <p className="font-semibold text-sm">
            <span className="mr-2">&#x2022;</span> {notification.notification}
          </p>
          <p className="text-sm text-gray-400">
            <span className="text-purple-400">{formatTime(notification.created_at)}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
