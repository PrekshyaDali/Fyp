import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  useEditUsersQuery,
  useGetEnrollmentByIdQuery,
  useViewStudentPaymentMutation,
} from "@/feature/userApiSlice";
import { useParams } from "react-router-dom";
import BackButton from "@/pages/component/BackButton";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ViewStudentTable from "@/pages/component/ViewStudentTable";

const ViewStudent = () => {
  const { id } = useParams<{ id: string }>();

  // Fetch user data
  const { data: userData, isLoading: isUserDataLoading } = useEditUsersQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  // Fetch enrollment data
  const {
    data: responseData,
    isLoading: isDataLoading,
    isError: isDataError,
  } = useGetEnrollmentByIdQuery(id);

  // State for due amount
  const [dueAmount, setDueAmount] = useState(0);

  useEffect(() => {
    // Calculate due amount or any other initialization logic
    // This can be based on the enrollment data
  }, [responseData]);

  // Render loading state while data is being fetched
  if (isDataLoading) {
    return <div>Loading...</div>;
  }

  // Render error message if data fetching fails
  if (isDataError) {
    return <div>Error fetching enrollment data</div>;
  }

  // Extract enrollment data from response
  const enrollmentData = responseData?.data;

  return (
    <div className="p-3">
      <div className="mb-3">
        <BackButton />
      </div>
      <div className="bg-white mb-8 p-3 rounded-md">
        <h1 className="text-2xl font-bold">
          {userData?.firstname.toUpperCase()} {userData?.lastname.toUpperCase()}
        </h1>
        <p className="text-sm text-gray-500">{userData?.email}</p>
        <p className="text-sm text-gray-500">{userData?.contactnumber}</p>
      </div>

      <div className="flex flex-col space-y-5 ">
        {enrollmentData &&
          enrollmentData.map((enrollment, index) => (
            <div
              key={index}
              className="h-auto md:h-auto bg-white rounded-md flex flex-col md:flex-row   mb-4"
            >
              <div className="p-3 flex-1 space-y-3 md:mr-6 md:flex-1">
                <div className="flex flex-col space-y-5">
                  {/* Enrollment details */}
                  <div className="w-full md:w-1/2 flex items-center">
                    <label htmlFor={`Category${index}`} className="mr-2 text-sm">
                      Category :
                    </label>
                    <span className="text-green-500">
                      {enrollment.category.toUpperCase()}
                    </span>
                  </div>

                  {/* Other details of enrollment */}
                  {/* Payment method */}
                  <div className="w-full md:w-1/2 flex items-center">
                    <label htmlFor={`Payment${index}`} className="mr-2 text-sm">
                      Payment Method :
                    </label>
                    <span className="text-green-500">
                      {enrollment.payment.toUpperCase()}
                    </span>
                  </div>

                  {/* Package amount */}
                  <div className="w-full md:w-1/2 flex items-center">
                    <label htmlFor={`Price${index}`} className="mr-2 text-sm">
                      Package Amount :
                    </label>
                    <span className="text-green-500">{enrollment.price}</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex justify-end mt-5 space-x-3">
                  <Link to={`/admin/studentDetails/${id}/${enrollment._id}`}>
                    <button className="text-sm text-white bg-blue-400 hover:bg-blue-500 active:bg-blue-400 rounded-md px-6 py-2">
                      Mark Attendance
                    </button>
                  </Link>
                </div>
              </div>

              {/* Image */}

              <div>
                {/* attendance data mapping */}

                <ViewStudentTable
                  SN="SN"
                  field1="Date"
                  field2="Present"
                  data1="1"
                  data2="2021-08-01"
                  data3="Yes"
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ViewStudent;
