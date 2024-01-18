import DashboardCount from "@/pages/component/Dashboardcount";
import { useEffect, useState } from "react";
import { useGetDashboardCountQuery } from "@/feature/userApiSlice";

const AdminDashboard = () => {
  const { data } = useGetDashboardCountQuery();
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    // Update state with the fetched data using a functional update
    setDashboardData((prevData) => ({
      user: data?.user || 0,
      instructor: data?.instructor || 0,
    }));

    // Log the updated data to the console
    console.log(dashboardData, "dashboardData");
  }, [data]);

  return (
    <>
      <div className="grid gap-10 m-10 lg:grid-cols-3 sm:grid-cols-2 text-[#1E2749]">
        <DashboardCount title="Total Students" count={dashboardData?.user || 0} />
        <DashboardCount
          title="Total Instructors"
          count={dashboardData?.instructor || 0}
        />
        <DashboardCount title="Courses Enrolled" count={10} />
      </div>
    </>
  );
};

export default AdminDashboard;
