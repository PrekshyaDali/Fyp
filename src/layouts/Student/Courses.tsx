import React from "react";

import Coursesbox from "@/layouts/Student/Coursesbox";
import { Link } from "react-router-dom";
import { useGetCoursesQuery } from "@/feature/userApiSlice";

const Courses = () => {
  const { data } = useGetCoursesQuery({}, { refetchOnMountOrArgChange: true });
  console.log(data, "data");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-[#30343f] p-4">
      {data?.map((item, index) => {
        return (
          <Coursesbox
            id={item?._id}
            key={index}
            courseDuration={item.courseDuration + " DAYS"}
            title={item.type.toUpperCase() + " COURSE"}
            description={item.courseDescription}
            image={"/img/Car1.png"}
          />
        );
      })}
    </div>
  );
};

export default Courses;
