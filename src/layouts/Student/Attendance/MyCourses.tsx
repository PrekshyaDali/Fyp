import React from "react";
import { useGetEnrollmentByIdQuery } from "@/feature/userApiSlice";
import Button from "@/pages/component/Button";
import CalendarComponent from "@/pages/component/CalendarComponent";
import { Link, useParams } from "react-router-dom";

export default function MyCourses() {
  const { id } = useParams<{ id: string }>();

  const { data: enrollmentData } = useGetEnrollmentByIdQuery(id);

  console.log(enrollmentData);

  return (
    <>
      <h1 className="font-semibold text-2xl mb-5">My Courses</h1>
      {enrollmentData?.data?.map((enrollment, index) => (
        <div key={index} className="w-full h-full m-3 p-3 pr-3">
          <div className="flex justify-between space-x-5 pr-3">
            {/* Course Details */}
            <div className="p-3 flex space-x-5 h-56 flex-1  shadow-md rounded-md bg-white">
              <div className="w-1/3 h-full">
                {enrollment.category === "car" ? (
                  <img className="object-cover w-full h-full" src="/img/Car.png" alt="" />
                ) : enrollment.category === "Bike" ? (
                  <img
                    className="object-cover w-full h-full"
                    src="/img/Bike.jpg"
                    alt=""
                  />
                ) : (
                  enrollment.category === "scooter" && (
                    <img
                      className="object-cover w-full h-full"
                      src="/img/Scooter.jpg"
                      alt=""
                    />
                  )
                )}
              </div>
              <div className="pl-5 pr-5 pt-5 flex flex-col space-y-5">
                <h2 className="text-xl font-semibold text-blue-400">
                  {enrollment.category.toUpperCase() + " " + "CATEGORY"}
                </h2>
                <div className="flex space-x-3 text-gray-400 text-sm">
                  <p className="">Enrolled Date:</p>
                  <span className="text-purple-400">
                    {new Date(enrollment.startdate).toISOString().split("T")[0]}
                  </span>
                </div>
                <div className="flex space-x-3 text-gray-400 text-sm">
                  <p className="">Package Amount</p>
                  <span className="text-purple-400">{"Rs" + " " + enrollment.price}</span>
                </div>
                <div className="flex justify-end space-x-5 text-sm">
                  <Link to={`/user/attendances/${id}/${enrollment._id}`}>
                    <Button name="View Attendance" />
                  </Link>
                  <Link to={`/user/transactions/${id}/${enrollment._id}`}>
                    <Button name="View Transactions" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
