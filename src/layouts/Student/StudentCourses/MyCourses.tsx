import React from "react";
import { useEnrollmentMutation, useGetEnrollmentByIdQuery } from "@/feature/userApiSlice";
import Button from "@/pages/component/Button";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/app/store";
import { selectUser } from "@/app/authSlice";
import axios from "axios";
import { toast } from "react-toastify";

export default function MyCourses() {
  const id = useAppSelector(selectUser).id;
  const [isPayementRedirect, setIsPaymentRedirect] = React.useState(false);
  const { data: enrollmentData } = useGetEnrollmentByIdQuery(id);
  const [enroll] = useEnrollmentMutation();

  const handlelookUp = async () => {
    try {
      //get status from query url
      const urlParams = window.location.href;
      const pid = urlParams.split("=")[1].split("&")[0];
      const headers = {
        Authorization: "key 3def120726f04186b1c6f274700bd12f",
        "Content-Type": "application/json",
      };
      const url = "https://a.khalti.com/api/v2/epayment/lookup/";
      const data = {
        pidx: pid,
      };

      const response = await axios.post(
        url,
        {
          pidx: pid,
        },
        { headers: headers },
      );

      if (response.data.status === "Expired") {
        toast.error("Payment Expired");
      }
      if (response.data.status === "User canceled") {
        toast.error("Payment Canceled");
      }
      if (response.data.status === "Completed") {
        const payloadData = localStorage.getItem("formData")
          ? JSON.parse(localStorage.getItem("formData"))
          : null;

        if (payloadData === null) return;
        const startDate = localStorage.getItem("startDate");
        localStorage.removeItem("formData");
        localStorage.removeItem("startDate");
        const payload = {
          firstname: payloadData.firstname,
          lastname: payloadData.lastname,
          contactnumber: payloadData.contactnumber,
          email: payloadData.email,
          category: payloadData?.type,
          address: payloadData.address,
          price: payloadData?.price,
          duration: payloadData?.courseDuration,
          gender: payloadData.gender,
          emergencycontactnumber: payloadData.emergencycontactnumber,
          payment: "Esewa",
          startdate: startDate,
          courseId: payloadData.courseId,
          userId: id,
        };
        try {
          const response = await enroll(payload).unwrap();
          if (response) {
            toast.success("Enrollment Successfull");
          }
        } catch (error) {
          toast.error("Enrollment Failed");
        }
      }
    } catch (error) {
      toast.error("Payment Failed");
    }
  };

  React.useEffect(() => {
    const urlParams = window.location.href;
    const pid = urlParams?.split("=")[1]?.split("&")[0];
    const formData = localStorage.getItem("formData")
      ? JSON.parse(localStorage.getItem("formData"))
      : null;

    if (pid) {
      setIsPaymentRedirect(true);
      if (formData !== null) {
        handlelookUp();
      }
    }
  }, []);

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
                        src="/img/Car.jpg"
                        alt=""
                      />
                    ) : enrollment.category === "bike" ? (
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
          <div className="flex justify-center items-center">
            <h1 className="text-2xl text-gray-400">No Courses Enrolled</h1>
          </div>
        </div>
      )}
    </>
  );
}
