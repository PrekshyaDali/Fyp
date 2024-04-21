import React from "react";
import { useEffect, useState } from "react";

import Coursesbox from "./Coursesbox";
import { Link, useParams } from "react-router-dom";
import {
  useGetCoursesQuery,
  useGetEnrollmentByIdQuery,
  useGetEnrollmentQuery,
} from "@/feature/userApiSlice";
import Button from "@/pages/component/Button";
import { FaRoad } from "react-icons/fa";

const Courses = () => {
  const id = localStorage.getItem("id").toString();

  const { data: enrollmentData } = useGetEnrollmentByIdQuery(id);
  const[enrollmentStatus, setEnrollmentStatus] = useState([] as any[]);

  const { data } = useGetCoursesQuery({}, { refetchOnMountOrArgChange: true });


  useEffect(() => {
    // Initialize an array to hold enrollment start dates
    const enrollmentStartDates = [];

    // Extract start dates from each enrollment entry
    enrollmentData?.data.forEach((enrollment) => {
      const startDate = new Date(enrollment.startdate);
      enrollmentStartDates.push(startDate);
    });

    // Get the current date
    const currentDate = new Date();


    const enrollmentStatus = data?.map((course) => {
      return {
        ...course,
        enroll: enrollmentStartDates.some((startDate) => {
          const timeDiff = currentDate.getTime() - startDate.getTime();
          const daysDiff = timeDiff / (1000 * 3600 * 24) < 30;
          return (
            daysDiff &&
            enrollmentData?.data.some((enrollment) =>
              enrollment.course.includes(course._id),
            )
          );
        }),
      };
    });

    // Set the enrollment status
    setEnrollmentStatus(enrollmentStatus);
  }, [enrollmentData, data]);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 text-[#30343f] p-4">
        {enrollmentStatus?.map((item, index) => (
          <Coursesbox
            key={index}
            id={item?._id}
            img={item?.image}
            courseDuration={item.courseDuration + " DAYS"}
            title={item.type.toUpperCase() + " COURSE"}
            description={item.courseDescription}
            enroll={item.enroll}
          />
        ))}
      </div>
      <div className="flex relative justify-end items-center p-4">
        <Link to="/user/courses/customizeCourse">
          <button className="px-6 py-2 border-2 bg-red-900 rounded-md text-white hover:bg-blue-300 ">
            Customize Course
          </button>
        </Link>
     
      </div>
    </>
  );
};

export default Courses;
