import React from "react";
import { useState, useEffect } from "react";
import {
  useGetPaymentDataQuery,
  useOneEnrollmentUserQuery,
  usePaymentTrackingMutation,
} from "@/feature/userApiSlice";
import ViewStudentTable from "@/pages/component/ViewStudentTable";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ViewPayment() {
  const { enrollmentId } = useParams<{ enrollmentId: string }>();
  const { data: enrollmentData } = useOneEnrollmentUserQuery(enrollmentId);
  const { data: paymentData } = useGetPaymentDataQuery(enrollmentId);
  console.log(paymentData, "paymentData");
  const [paymentTracking, isLoading] = usePaymentTrackingMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [dueAmount, setDueAmount] = useState<number>(1); // State to hold the due amount

  React.useEffect(() => {
    if (paymentData && paymentData.payments && paymentData.payments.length > 0) {
      // Find the latest payment object based on _id or any other criteria
      const latestPayment = paymentData.payments.reduce((latest, payment) =>
        latest._id > payment._id ? latest : payment,
      );
      setDueAmount(latestPayment.dueAmount);
    }
  }, [paymentData]);

  const SubmitHandler = async (data) => {
    try {
      const payload = {
        paymentType: data.paymentType,
        paidAmount: data.paidAmount,
        enrollmentId: enrollmentId,
      };

      const res = await paymentTracking(payload).unwrap();
      console.log(res);
      // Update the due amount after successful payment tracking
      toast.success("Payment tracked successfully");
    } catch (error) {
      toast.error("Error tracking payment");
    }
  };

  console.log(dueAmount, "dueAmount");

  const renderFullyPaidMessage = () => {
    if (dueAmount === 0) {
      return <p className="text-green-600 font-bold ">Payment Completed</p>;
    }
    return null;
  };

  const columns = [
    {
      key: "sn",
      value: "SN",
    },
    {
      key: "date",
      value: "Date",
    },
    {
      key: "paidAmount",
      value: "Paid Amount",
    },
    {
      key: "dueAmount",
      value: "Due Amount",
    },
  ]

  const data = paymentData?.payments.map((payment, index) => {
    return {
      sn: index + 1,
      date: new Date(payment.date).toDateString(),
      paidAmount: payment.paidAmount,
      dueAmount: payment.dueAmount,
    };
  });



  return (
    <form onSubmit={handleSubmit(SubmitHandler)} encType="multipart/form-data">
      <div className="flex flex-col md:flex-row bg-white p-5">
        <div className="flex-1 w-full flex flex-col space-y-3">
          <h1 className="text-2xl font-semibold mb-3">Payment Details</h1>
          <div>
            <p>
              Package Amount
              <span className=" ml-5 text-green-400">
                {"Rs" + " " + enrollmentData?.data?.price}
              </span>
            </p>
          </div>
          <div className="w-full md:w-1/2  items-center mb-3">
            <label htmlFor="Payment" className="mr-2 text-sm">
              Payment Type
            </label>
            <select
              {...register("paymentType")}
              className="bg-white border-2 text-sm p-1 w-full"
            >
              <option value="Unpaid">Unpaid</option>
              <option value="Half Payment">Half Payment</option>
              <option value="Full Payment">Full Payment</option>
            </select>
            {errors.paymentType && (
              <span className="text-red-500 text-sm">{String(errors.paymentType)}</span>
            )}
          </div>

          {/* Paid amount */}
          <div className="w-full md:w-1/2  items-center mb-3">
            <label htmlFor="" className="mr-2 text-sm">
              Paid Amount
            </label>
            <input
              {...register("paidAmount", { required: "This field is required" })}
              type="text"
              className="bg-white border-2 text-sm p-1 w-full"
            />
            {errors.paidAmount && (
              <span className="text-red-500 text-sm">{"This field is required"}</span>
            )}
          </div>

          {/* Due amount */}
          <div className="w-full md:w-1/2 flex items-center mb-3">
            <label htmlFor="" className="mr-2 text-sm">
              Due Amount
            </label>
            <span className="text-red-500">{"Rs" + " " + dueAmount}</span>
          </div>
          {renderFullyPaidMessage()}

          <div>
            <button
              type="submit"
              // disabled={isLoading}
              className="text-sm text-white bg-blue-400 hover:bg-blue-500 active:bg-blue-400 rounded-md px-6 py-2"
            >
              Save
            </button>
          </div>
        </div>

        {/* Right div */}
        <div>
          <ViewStudentTable
            column={columns}
           
            data={data}
                      />
        </div>
      </div>
    </form>
  );
}
