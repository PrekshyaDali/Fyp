import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useAttendanceMutation,
  useGetAttendanceQuery,
  useOneEnrollmentUserQuery,
} from "@/feature/userApiSlice";
import BackButton from "@/pages/component/BackButton";
import ViewStudentTable from "@/pages/component/ViewStudentTable";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function AttendanceTracking() {
  const { enrollmentId } = useParams<{ enrollmentId: string }>();

  // Fetch enrollment data using enrollmentId
  const { data: enrollmentData, isLoading } = useOneEnrollmentUserQuery(enrollmentId);
  const { data: attendanceData } = useGetAttendanceQuery(enrollmentId );
  console.log(attendanceData, "attendanceData");

  const [attendance] = useAttendanceMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // State to store the start date
  const [startDate, setStartDate] = useState<string>("");

  // State to store the present date
  const [presentDate, setPresentDate] = useState<string>("");

  // Set the start date and present date when enrollment data changes
  const date = enrollmentData?.data?.startdate;
  useEffect(() => {
    if (date) {
      setStartDate(new Date(date).toISOString().split("T")[0]); // Set start date from enrollment data
      setPresentDate(new Date().toISOString().split("T")[0]); // Set present date to today
    }
  }, [enrollmentData]);

  const SubmitHandler = async (data) => {
    try {
      const formData = new FormData();
      // formData.append("startDate", startDate);
      formData.append("date", presentDate);
      formData.append("enrollmentId", enrollmentId);
      formData.append("userId", enrollmentData?.data?.user);
      const res = await attendance(formData).unwrap();
      console.log(res);
      toast.success("Attendance marked successfully");
    } catch (error) {
      toast.error("Error marking attendance");
    }
  };

  // Update the presentDate state when the date input changes
  const handleDateChange = (e) => {
    setPresentDate(e.target.value);
  };

  return (
    <div className="p-3 flex flex-col space-y-5">
      <div className=" flex flex-col md:flex-row bg-[#E6F0FB] p-5">
        <div className="flex-1 w-full">
          <h1 className="text-2xl font-semibold mb-3">Payment Details</h1>
          <div className="w-full md:w-1/2 flex items-center mb-3">
            <label htmlFor="Payment" className="mr-2 text-sm">
              Payment Type
            </label>
            <select className="bg-white border-2 text-sm p-1 w-full">
              <option value="Unpaid">Unpaid</option>
              <option value="Half Payment">Half Payment</option>
              <option value="Full Payment">Full Payment</option>
            </select>
          </div>

          {/* Paid amount */}
          <div className="w-full md:w-1/2 flex items-center mb-3">
            <label htmlFor="" className="mr-2 text-sm">
              Paid Amount
            </label>
            <input type="text" className="bg-white border-2 text-sm p-1 w-full" />
          </div>

          {/* Due amount */}
          <div className="w-full md:w-1/2 flex items-center">
            <label htmlFor="" className="mr-2 text-sm">
              Due Amount
            </label>
            <input type="text" className="bg-white border-2 text-sm p-1 w-full" />
          </div>
        </div>

        {/* right div */}
        <div>
          <ViewStudentTable
            SN="1"
            field1="Category"
            field2="Payment Method"
            data1="Primary"
            data2="Cash"
            data3="1000"
          />
        </div>
      </div>

      {/* Attendance tracking form */}
      <form
        action=""
        encType="multipart/form-data"
        onSubmit={handleSubmit(SubmitHandler)}
      >
        <div className="md:space-y-0 md:flex-row flex flex-col space-y-5">
          {/* Attendance tracking form */}
          <div className="bg-white p-5 mr-5 flex-1">
            <h1 className="text-2xl font-bold mb-3">Attendance Tracking</h1>
            <p className="text-sm text-gray-500 mb-1">
              {/* Display enrollment data if available */}
              {enrollmentData?.data?.firstname &&
                `${enrollmentData.data.firstname.toUpperCase()} ${enrollmentData.data.lastname.toUpperCase()}`}
            </p>
            <p className="text-sm text-gray-500 mb-3">
              {enrollmentData?.data?.category?.toUpperCase()}
            </p>
            <div className="flex space-x-5">
              <div>
                <label htmlFor="StartDate">Start Date</label>
                <input
                  {...register("startDate")}
                  type="text"
                  value={startDate}
                  className="bg-white border-2 text-sm p-1 w-full"
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="Date">Present Date</label>
                <input
                  {...register("date")}
                  type="date"
                  name="date"
                  className="bg-white border-2 text-sm p-1 w-full"
                  min={startDate}
                  value={presentDate}
                  onChange={handleDateChange}
                />
                <style>
                  {`
            input[type="date"]::-webkit-calendar-picker-indicator {
              filter: invert(1);
            }
          `}
                </style>
              </div>
              <div>
                <label htmlFor="Days remaining">Days Remaining</label>
                <input
                  type="text"
                  className="bg-white border-2 text-sm p-1 w-full"
                  readOnly
                />
              </div>
            </div>
            <div className="mt-5 space-x-3 flex justify-between">
              <button
                type="submit"
                className="text-sm text-white bg-blue-400 hover:bg-blue-500 active:bg-blue-400 rounded-md px-6 py-2"
                isLoading={isLoading}
              >
                Mark Attendance
              </button>
              <BackButton />
            </div>
          </div>

          {/* Attendance record */}
          <div className="bg-white p-5 flex-1">
            <ViewStudentTable
              SN="SN"
              field1="Date"
              field2="Status"
              data1="1"
              data2="2022-09-01"
              data3="Present"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
