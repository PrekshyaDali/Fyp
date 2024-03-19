import Dashboardcount from "@/pages/component/Dashboardcount";
import React from "react";
import { useEffect, useState } from "react";
import { useGetDashboardCountQuery, useGetEnrollmentCountQuery } from "@/feature/userApiSlice";

const AdminDashboard = () => {
  const { data } = useGetDashboardCountQuery({},{refetchOnMountOrArgChange:true});
  const [dashboardData, setDashboardData] = useState(null);
  const{data: enrollmentCount} = useGetEnrollmentCountQuery({},{refetchOnMountOrArgChange:true});

  useEffect(() => {
    // Update state with the fetched data using a functional update
    setDashboardData((prevData) => ({
      user: data?.user || 0,
      instructor: data?.instructor || 0,
      data: enrollmentCount?.data || 0,
    }));

    // Log the updated data to the console
    // console.log(enrollmentCount, "enrollmentCount");
    // console.log(dashboardData, "dashboardData");
  }, [data, enrollmentCount]);

  return (
    <>
      <div className="grid gap-10 m-10 lg:grid-cols-3 sm:grid-cols-2 text-[#1E2749]">
        <Dashboardcount
          title="Total Students"
          img="/img/TotalStudents.png "
          count={dashboardData?.user || 0}
        />
        <Dashboardcount
          title="Total Instructors"
          img="/img/TotalInstructor.png"
          count={dashboardData?.instructor || 0}
        />
        <Dashboardcount title="Courses Enrolled" img= "/img/CoursesEnrolled.png" count={enrollmentCount?.data} />
      </div>
    </>
  );
};

export default AdminDashboard;
