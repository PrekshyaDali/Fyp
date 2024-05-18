import React, { useState } from "react";
import moment from "moment-timezone";
import { Link } from "react-router-dom";
import {
  useShowNotificationToAdminQuery,
  useDeleteNotificationMutation,
} from "@/feature/adminApiSlice";
import Button from "@/pages/component/Button";

function formatTime(dateString) {
  const date = moment(dateString).tz("Asia/Kathmandu");
  return date.format("YYYY-MM-DD HH:mm A");
}

export default function ViewNotices() {
  const { data: notificationData, refetch } = useShowNotificationToAdminQuery({});
  const [selectedIds, setSelectedIds] = useState([]);
  const [deleteNotifications] = useDeleteNotificationMutation();

  const handleToggleSelection = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await deleteNotifications({ ids: selectedIds.map((id) => id.toString()) }).unwrap();
      setSelectedIds([]); // Clear selected IDs after deletion
      refetch(); // Refresh notifications after deletion
    } catch (error) {
      console.error("Error deleting notifications:", error);
    }
  };

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
          <Button onClick={handleDeleteSelected} name="Delete Selected"></Button>
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
          <input
            type="checkbox"
            checked={selectedIds.includes(notification._id.toString())}
            onChange={() => handleToggleSelection(notification._id.toString())}
          />
        </div>
      ))}
    </div>
  );
}
