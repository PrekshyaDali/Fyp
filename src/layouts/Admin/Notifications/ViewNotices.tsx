import React, { useState } from "react";
import moment from "moment-timezone";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
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
  const [selectAll, setSelectAll] = useState(false);
  const [deleteNotifications] = useDeleteNotificationMutation();

  const handleToggleSelection = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleToggleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      const allIds = notificationData.data.map((notification) =>
        notification._id.toString(),
      );
      setSelectedIds(allIds);
    }
    setSelectAll(!selectAll);
  };

  const handleDeleteSelected = async () => {
    try {
      if (selectedIds.length === 0) {
        toast.warn("No notices selected for deletion");
        return;
      }

      const ids = selectedIds.map((id) => id.toString());
      console.log("Deleting notifications with IDs:", ids);
      const res = await deleteNotifications(ids).unwrap();
      console.log(res);
      setSelectedIds([]); // Clear selected IDs after deletion
      await refetch(); // Refresh notifications after deletion
      console.log("Notifications after deletion:", notificationData);
      toast.success("Notices deleted successfully");
    } catch (error) {
      console.error("Error deleting notifications:", error);
      toast.error("Error deleting notices");
    }
  };

  return (
    <div className="p-8 flex-col space-y-5 m-3 relative">
      <div>
        <div>
          <h1 className="text-2xl font-semibold">Notices</h1>
        </div>
        <div className="flex justify-end space-x-5">
          <Link to="/admin/addNotifications">
            <Button name="Add Notices" />
          </Link>
          {notificationData && notificationData.data.length > 0 && (
            <Button onClick={handleDeleteSelected} name="Delete Selected" />
          )}
        </div>
        {notificationData && notificationData.data.length > 0 && (
          <div className="flex items-center space-x-2 mt-2">
            <input type="checkbox" checked={selectAll} onChange={handleToggleSelectAll} />
            <label>Select All</label>
          </div>
        )}
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
            className="absolute left-3"
            type="checkbox"
            checked={selectedIds.includes(notification._id.toString())}
            onChange={() => handleToggleSelection(notification._id.toString())}
          />
        </div>
      ))}
      {(!notificationData || notificationData.data.length === 0) && (
        <p>No notices available</p>
      )}
    </div>
  );
}
