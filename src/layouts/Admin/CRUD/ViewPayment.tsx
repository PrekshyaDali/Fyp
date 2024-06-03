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
import BackButton from "@/pages/component/BackButton";
import { useGetPaymentKhaltiQuery } from "@/feature/adminApiSlice";
import { ValueSetter } from "date-fns/parse/_lib/Setter";

export default function ViewPayment() {
  const { enrollmentId } = useParams<{ enrollmentId: string }>();
  const { id } = useParams<{ id: string }>();
  const { data: enrollmentData } = useOneEnrollmentUserQuery(enrollmentId);
  console.log(enrollmentData);
  const { data: paymentData } = useGetPaymentDataQuery(enrollmentId);
  console.log(paymentData, "paymentData");
  const [paymentTracking, isLoading] = usePaymentTrackingMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [dueAmount, setDueAmount] = useState<number>(1);
  const [paymentType, setPaymentType] = useState("");
  const { data: KhaltiData } = useGetPaymentKhaltiQuery(id);
  console.log(KhaltiData, "KhaltiData");

  // State to hold the due amount
  React.useEffect(() => {
    let totalDueAmount = 0;

    if (paymentData && paymentData.payments && KhaltiData && KhaltiData.payment) {
      const allPayments = [...paymentData.payments, ...KhaltiData.payment];

      // Find the latest payment with the highest _id
      const latestPayment = allPayments.reduce((latest, payment) =>
        latest._id > payment._id ? latest : payment,
      );

      totalDueAmount = latestPayment.dueAmount;
    }

    setDueAmount(totalDueAmount);

    const paymentType = totalDueAmount === 0 ? "complete" : "incomplete";
    setPaymentType(paymentType);
  }, [paymentData, KhaltiData]);

  const SubmitHandler = async (data) => {
    try {
      let paidAmount = data.paidAmount; // Default to the paid amount entered by the user

      // Check if the payment data is from Khalti
      if (paymentType === "Khalti") {
        // Use KhaltiData.amount as paid amount for Khalti payments
        paidAmount = KhaltiData?.amount;
      }

      const payload = {
        paymentType: data.paymentType,
        paidAmount: paidAmount,
        enrollmentId: enrollmentId,
      };

      const res = await paymentTracking(payload).unwrap();
      console.log(res);
      // Update the due amount after successful payment tracking
      reset();
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
    {
      key: "paymentMethod",
      value: "Payment Method", // <-- Use lowercase 'value' here
    },
  ];

  const data = [];
  // Add in-house payment data
  if (paymentData && paymentData.payments) {
    paymentData.payments.forEach((payment, index) => {
      data.push({
        sn: index + 1,
        date: new Date(payment.date).toDateString(),
        paidAmount: payment.paidAmount,
        dueAmount: payment.dueAmount,
        paymentMethod: "In-House", // Assuming paymentMethod for in-house payments is "In-House"
      });
    });
  }

  // Add Khalti payment data
  if (KhaltiData && KhaltiData.payment) {
    KhaltiData.payment.forEach((payment, index) => {
      if (payment.course === enrollmentData?.data?.course) {
        data.push({
          sn: index + 1,
          date: new Date(payment.date).toDateString(),
          paidAmount: payment.amount,
          dueAmount: payment.dueAmount,
          paymentMethod: "Khalti",
        });
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(SubmitHandler)} encType="multipart/form-data">
      <div className="m-3">
        <BackButton></BackButton>
      </div>
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
            {paymentType === "complete" ? (
              <span className="text-green-500"> {paymentType.toUpperCase()}</span>
            ) : (
              <span className="text-red-500"> {paymentType.toUpperCase()}</span>
            )}

            {console.log(paymentType)}
            {errors.paymentType && (
              <span className="text-red-500 text-sm">{String(errors.paymentType)}</span>
            )}
          </div>

          {/* Paid amount */}
          <div className="w-full md:w-1/2 items-center mb-3">
            <label htmlFor="paidAmount" className="mr-2 text-sm">
              Paid Amount <span className="text-sm text-pink-500">(in Rs)</span>
            </label>
            <input
              {...register("paidAmount", {
                required: "This field is required",
                validate: (value) =>
                  parseFloat(value) > 0 || "Amount must be greater than 0",
              })}
              type="text"
              className="bg-white border-2 text-sm p-1 w-full"
            />
            {errors.paidAmount && (
              <span className="text-red-500 text-sm">{errors.paidAmount.message}</span>
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
          <ViewStudentTable column={columns} data={data} />
        </div>
      </div>
    </form>
  );
}
