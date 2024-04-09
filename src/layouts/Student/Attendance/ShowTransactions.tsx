import { useGetPaymentDataQuery } from "@/feature/userApiSlice";
import React from "react";
import { useParams } from "react-router-dom";

export default function ShowTransactions() {
  const { enrollmentId } = useParams<{ enrollmentId: string }>(); // Destructure enrollmentId directly
  const { id } = useParams<{ id: string }>();
  const { data: paymentData } = useGetPaymentDataQuery(enrollmentId);
  console.log(paymentData);

  return (
    <div className="w-full h-full ">
      <div className="m-3 p-3 pr-3">
        <h1 className="text-2xl font-semibold mb-3">Transaction History</h1>
        {paymentData?.payments?.map((payment, index) => (
          <div key={index} className="h-20 rounded-md shadow-sm bg-white p-5 mb-3">
            <div className="flex justify-between">
              <p className="text-sm">{id}</p>
              <span className="text-sm text-gray-400">2024-09-5</span>
            </div>
            <div className="flex justify-between">
              <p className="text-red-500">
                NPR <span>{payment.paidAmount}</span>
              </p>
              <span className="text-sm text-purple-400">12:45</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
