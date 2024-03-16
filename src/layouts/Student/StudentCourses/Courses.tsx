import React from "react";
import {useEffect, useState} from "react";


import Coursesbox from "@/layouts/Student/StudentCourses/Coursesbox";
import { Link } from "react-router-dom";
import { useGetCoursesQuery, useGetEnrollmentQuery } from "@/feature/userApiSlice";
import Button from "@/pages/component/Button";
import { FaRoad } from "react-icons/fa";

const Courses = () => {
  const { data } = useGetCoursesQuery({}, { refetchOnMountOrArgChange: true });
  const { data: enrollmentData } = useGetEnrollmentQuery({});
  const [daysDiff, setDaysDiff] = useState(false);
  // const { data: imgData } = useGetImageQuery({}, { refetchOnMountOrArgChange: true });
  useEffect(() => {
    const startDate = new Date(enrollmentData ? enrollmentData?.data?.startdate : "");

    // Get the current date
    const currentDate = new Date();

    // Calculate the difference in milliseconds between the two dates
    const timeDiff = currentDate.getTime() - startDate.getTime();

    // Calculate the number of days
    const daysDiff = timeDiff / (1000 * 3600 * 24) < 30;
    setDaysDiff(daysDiff);
  }, [enrollmentData]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 text-[#30343f] p-4">
        {data?.map((item, index) => {
          const enroll = daysDiff && enrollmentData?.data?.course == item?._id;

          return (
            <>
              <Coursesbox
                id={item?._id}
                key={index}
                img={item?.image}
                courseDuration={item.courseDuration + " DAYS"}
                title={item.type.toUpperCase() + " COURSE"}
                description={item.courseDescription}
                enroll={enroll}
                // image={"/img/Car1.png"}
              />
            </>
          );
        })}
      </div>
      <div className="flex relative justify-end items-center p-4">
        <Link to="/user/courses/customizeCourse">
          <button className="px-6 py-2 border-2 bg-red-900 rounded-md text-white hover:bg-blue-300 ">
            Customize Course
          </button>
        </Link>
        {/* <img className="absolute h-4 top-4 right-3 " src="/img/plus.png" alt="" /> */}
      </div>
    </>
  );
};

export default Courses;
