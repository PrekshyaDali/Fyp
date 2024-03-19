import React from "react";
import { useGetCoursesQuery } from "@/feature/userApiSlice";
import { Link } from "react-router-dom";
import Search from "@/pages/component/Search";

const CoursesTable = () => {
  const { data: coursesData } = useGetCoursesQuery({});

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <Search /> {/* Assuming this component is for search functionality */}
            <table className="min-w-full  text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    SN
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Duration
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {coursesData?.map((course, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {course.type.toUpperCase()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {course.courseDuration + " " + "days"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{"Rs" + " " + course.price}</td>
                    <td className="flex gap-2">
                      <Link to={`/admin/viewCourse/${course._id}`}>
                        <button className="bg-green-400 p-2 rounded-lg text-white">
                          View
                        </button>
                      </Link>
                      <Link to={`/admin/courseView/${course._id}`}>
                        <button className="bg-blue-400 p-2 rounded-lg text-white">
                          Edit
                        </button>
                      </Link>
                      <Link to={`/admin/courseView/${course._id}`}>
                        <button className="bg-red-400 p-2 rounded-lg text-white">
                          delete
                        </button>
                      </Link>
                      {/* Add more actions as needed */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesTable;
