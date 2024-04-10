import React from "react";
import { useGetEnrollmentByIdQuery } from "@/feature/userApiSlice";
import Button from "@/pages/component/Button";
import { Link, useParams } from "react-router-dom";

export default function MyCourses() {
  const { id } = useParams<{ id: string }>();

  const { data: enrollmentData } = useGetEnrollmentByIdQuery(id);

  return (
    <>
      {enrollmentData !== undefined && enrollmentData?.data?.length !== 0 ? (
        <div className="w-full h-full">
          <div className="p-3 m-3">
            <h1 className="font-semibold text-2xl mb-5">My Courses</h1>
            {enrollmentData?.data?.map((enrollment, index) => (
              <div key={index} className="w-full md:w-auto m-3">
                {/* Course Details */}
                <div className="flex flex-col md:flex-row md:space-x-5">
                  <div className="md:w-1/3 h-56">
                    {enrollment.category === "car" ? (
                      <img
                        className="object-cover w-full h-full"
                        src="/img/Car.png"
                        alt=""
                      />
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
                  <div className="flex-1 ">
                    <div className="p-5 shadow-md rounded-md bg-white h-56 space-y-5">
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
                        <span className="text-purple-400">
                          {"Rs" + " " + enrollment.price}
                        </span>
                      </div>
                      <div className="flex justify-end space-x-5 text-sm mt-3">
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
          </div>
        </div>
      ) : (
        <div className="w-full h-full ">
          <div className = "flex justify-center items-center">
            <h1 className="text-2xl text-gray-400">No Courses Enrolled</h1>
          </div>
        </div>
      )}
    </>
  );
}
