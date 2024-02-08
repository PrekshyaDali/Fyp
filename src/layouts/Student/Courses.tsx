import React from "react";

import Coursesbox from "@/pages/component/Coursesbox";
import { Link } from "react-router-dom";
import { useGetCoursesQuery } from "@/feature/userApiSlice";

const Courses = () => {
  const {data} = useGetCoursesQuery({},{refetchOnMountOrArgChange:true});

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-[#30343f] p-4">
      {data?.map((item, index) => {
        return (
            <Coursesbox
              title={item.courseOverview}
              description={item.courseDuration}
              image={'/img/Car1.png'}
            />
                     
        );
      })}
    </div>
  );
};

export default Courses;
