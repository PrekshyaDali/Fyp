import React from "react";
import Coursesbox from "@/layouts/Student/StudentCourses/Coursesbox";
import { useGetProfileQuery } from "@/feature/userApiSlice";
import { useGetNotificationsQuery } from "@/feature/adminApiSlice";

const StudentDashboard = () => {
  const { data } = useGetProfileQuery({}, { refetchOnMountOrArgChange: true });
  const { data: notificationData } = useGetNotificationsQuery({});
  console.log(notificationData);
  console.log(data);
  return (
    <>
      <div className="container mx-auto my-8 p-5">
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-4">
            Welcome back, {data?.user.firstname}
          </h1>
          <p className="text-gray-700 mb-8">
            Check out your dashboard for personalized information and features.
          </p>
        </div>

        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Course Progress */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Course Progress</h2>
            <p>Your current course progress and upcoming lessons.</p>
            <a href="/user/courses" className="text-blue-500 hover:underline">
              View Courses
            </a>
          </div>

          {/* Finance Overview */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Finance Overview</h2>
            <p>View your transaction history and payment details.</p>
            <a href="/user/finance" className="text-blue-500 hover:underline">
              View Finances
            </a>
          </div>

          {/* Attendance Tracker */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Attendance Tracker</h2>
            <p>Keep track of your active days and attendance analytics.</p>
            <a href="/user/attendance" className="text-blue-500 hover:underline">
              View Attendance
            </a>
          </div>
        </div>

        {/* Notifications and Alerts */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Notices and Alerts</h2>
          <ul className="list-disc list-inside">
            {notificationData?.data?.map((notification) => (
              <li key={notification._id} className="text-gray-700 mb-2">
                {notification.notification}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
