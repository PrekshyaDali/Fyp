import { useGetPaymentDataQuery } from "@/feature/userApiSlice";
import BackButton from "@/pages/component/BackButton";
import React from "react";
import { useParams } from "react-router-dom";

export default function ShowTransactions() {
  const { enrollmentId } = useParams<{ enrollmentId: string }>(); // Destructure enrollmentId directly
  const { id } = useParams<{ id: string }>();
  const { data: paymentData } = useGetPaymentDataQuery(enrollmentId);
  console.log(paymentData);

  return (
    <div className="w-full h-full ">
      <div className="m-3 p-3 ">
        <div className="mb-3">
          <BackButton></BackButton>
        </div>
        <h1 className="text-2xl font-semibold mb-3">Transaction History</h1>
        {paymentData && paymentData.payments && paymentData.payments.length > 0 ? (
          paymentData.payments.map((payment, index) => (
            <div key={index} className="h-20 rounded-md shadow-sm bg-white p-5 mb-3">
              <div className="flex justify-between">
                <p className="text-sm">{payment._id}</p> {/* Using payment ID */}
                <span className="text-sm text-gray-400">
                  {new Date(payment.date).toISOString().split("T")[0]} {/* Format date */}
                </span>
              </div>
              <div className="flex justify-between">
                <p className="text-red-500">
                  NPR <span>{payment.paidAmount}</span>
                </p>
                <span className="text-sm text-purple-400">
                  {new Date(payment.date).toTimeString().split(" ")[0]}{" "}
                  {/* Format time */}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center ">
            <p className=" text-2xl ">No transaction data available</p>
          </div>
        )}
      </div>
    </div>
  );
}
