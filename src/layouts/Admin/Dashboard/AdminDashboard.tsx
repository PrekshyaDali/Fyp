import Dashboardcount from "@/pages/component/Dashboardcount";
import React, { useEffect, useState } from "react";
import {
  useGetDashboardCountQuery,
  useGetEnrollmentCountQuery,
} from "@/feature/userApiSlice";
import { useGetNotificationByWeekQuery } from "@/feature/adminApiSlice";

const AdminDashboard = () => {
  const { data } = useGetDashboardCountQuery({}, { refetchOnMountOrArgChange: true });
  const [dashboardData, setDashboardData] = useState(null);
  const { data: enrollmentCount } = useGetEnrollmentCountQuery(
    {},
    { refetchOnMountOrArgChange: true },
  );
  const { data: notificationData } = useGetNotificationByWeekQuery({});

  useEffect(() => {
    setDashboardData((prevData) => ({
      user: data?.user || 0,
      instructor: data?.instructor || 0,
      data: enrollmentCount?.data || 0,
    }));
  }, [data, enrollmentCount]);

  return (
    <>
      <div className="grid gap-10 m-10 lg:grid-cols-3 sm:grid-cols-2 text-[#1E2749]">
        <Dashboardcount
          title="Total Students"
          img="/img/TotalStudents.png"
          count={dashboardData?.user || 0}
        />
        <Dashboardcount
          title="Total Instructors"
          img="/img/TotalInstructor.png"
          count={dashboardData?.instructor || 0}
        />
        <Dashboardcount
          title="Courses Enrolled"
          img="/img/CoursesEnrolled.png"
          count={enrollmentCount?.data || 0}
        />
      </div>
      <div className="m-8">
        <h1 className="text-2xl font-semibold mb-4 text-indigo-400">Notices this week</h1>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-indigo-400 text-white">
                <th className="px-4 py-2">Notification</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {notificationData?.data?.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                  <td className="px-4 py-2 border">{item.notification}</td>
                  <td className="px-4 py-2 border">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
