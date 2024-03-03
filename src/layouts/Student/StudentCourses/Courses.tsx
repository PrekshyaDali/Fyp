import React from "react";

import Coursesbox from "@/layouts/Student/StudentCourses/Coursesbox";
import { Link } from "react-router-dom";
import { useGetCoursesQuery,  } from "@/feature/userApiSlice";
import Button from "@/pages/component/Button";

const Courses = () => {
  const { data } = useGetCoursesQuery({}, { refetchOnMountOrArgChange: true });
  // const { data: imgData } = useGetImageQuery({}, { refetchOnMountOrArgChange: true });

  console.log(data, "data");

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 text-[#30343f] p-4">
        {data?.map((item, index) => {
          return (
            <>
              <Coursesbox
                id={item?._id}
                key={index}
                img={item?.image}
                courseDuration={item.courseDuration + " DAYS"}
                title={item.type.toUpperCase() + " COURSE"}
                description={item.courseDescription}
                // image={"/img/Car1.png"}
              />
            </>
          );
        })}
      </div>
      <div className="flex relative justify-end items-center p-4">
        <button className="px-6 py-2 border-2 bg-red-900 rounded-md text-white hover:bg-blue-300 ">
          Customize Course
        </button>
        {/* <img className="absolute h-4 top-4 right-3 " src="/img/plus.png" alt="" /> */}
      </div>
    </>
  );
};

export default Courses;
