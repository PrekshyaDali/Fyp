import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useEditUsersQuery, useGetEnrollmentByIdQuery } from "@/feature/userApiSlice";
import { useParams } from "react-router-dom";
import BackButton from "@/pages/component/BackButton";

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
      <div className="bg-[#E6F0FB] mb-8 p-3 rounded-md">
        <h1 className="text-2xl font-bold">
          {userData?.firstname.toUpperCase()} {userData?.lastname.toUpperCase()}
        </h1>
        <p className="text-sm text-gray-500">{userData?.email}</p>
        <p className="text-sm text-gray-500">{userData?.contactnumber}</p>
      </div>


      <div></div>
      <div className="flex flex-col space-y-5 border-2">
        {enrollmentData &&
          enrollmentData.map((enrollment, index) => (
            <div
              key={index}
              className="h-auto md:h-auto bg-[#E6F0FB] rounded-md flex mb-4"
            >
              <div className="p-3 flex-1 space-y-3 md:mr-6 md:flex-1 border-2">
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

                  {/* Other details of enrollment */}
                  {/* Payment type */}
                  <div className="w-full md:w-1/2 flex items-center">
                    <label htmlFor={`PaymentType${index}`} className="mr-2 text-sm">
                      Payment Type {index + 1}:
                    </label>
                    <select className="bg-white border-2 text-sm p-1 w-full">
                      <option value="Unpaid">Unpaid</option>
                      <option value="Half Payment">Half Payment</option>
                      <option value="Full Payment">Full Payment</option>
                    </select>
                  </div>

                  {/* Paid amount */}
                  <div className="w-full md:w-1/2 flex items-center">
                    <label htmlFor={`PaidAmount${index}`} className="mr-2 text-sm">
                      Paid Amount {index + 1}:
                    </label>
                    <input type="text" className="bg-white border-2 text-sm p-1 w-full" />
                  </div>

                  {/* Due amount */}
                  <div className="w-full md:w-1/2 flex items-center">
                    <label htmlFor={`DueAmount${index}`} className="mr-2 text-sm">
                      Due Amount {index + 1}:
                    </label>
                    <input
                      type="text"
                      className="bg-white border-2 text-sm p-1 w-full"
                      default={enrollment.payment}
                    />
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex justify-end mt-5 space-x-3">
                  <Link to={`/admin/studentDetails/${id}/${enrollment._id}`}>
                    <button className="text-sm text-white bg-blue-400 hover:bg-blue-500 active:bg-blue-400 rounded-md px-6 py-2">
                      Mark Attendance
                    </button>
                  </Link>

                  <button className="text-sm text-white bg-blue-400 hover:bg-blue-500 active:bg-blue-400 rounded-md px-6 py-2">
                    Save
                  </button>
                </div>
              </div>

              {/* Image */}
              <div className="w-96  md:w-96 flex flex-col  p-2 md:pl-0">
                {/* <div className="w-44 h-fit flex justify-end">
                  {enrollment.category === "car" ? (
                    <img
                      className="object-cover w-full h-full"
                      src="/img/Car.png"
                      alt=""
                    />
                  ) : enrollment.category === "bike" ? (
                    <img
                      className="object-cover w-full h-full"
                      src="/img/Bike1.png"
                      alt=""
                    />
                  ) : (
                    enrollment.category === "scooter" && (
                      <img
                        className="object-cover w-full h-full"
                        src="/img/Scooter.png"
                        alt=""
                      />
                    )
                  )}
                </div> */}
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">
                    <thead>
                      <tr>
                        <th className="px-4 py-2">SN</th>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Amount</th>
                      </tr>
                    </thead>
                    <tbody >
                      <tr>
                        <td className="border px-4 py-2">1</td>
                        <td className="border px-4 py-2">2024-03-19</td>
                        <td className="border px-4 py-2">$100.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ViewStudent;
