import { useGetPaymentKhaltiQuery } from "@/feature/adminApiSlice";
import { useGetPaymentDataQuery } from "@/feature/userApiSlice";
import BackButton from "@/pages/component/BackButton";
import React from "react";
import { useParams } from "react-router-dom";

export default function ShowTransactions() {
  const { enrollmentId } = useParams<{ enrollmentId: string }>(); // Destructure enrollmentId directly
  const { id } = useParams<{ id: string }>();
  const { data: paymentData } = useGetPaymentDataQuery(enrollmentId);
  const { data: KhaltiData } = useGetPaymentKhaltiQuery(id);
  console.log(KhaltiData);
  console.log(paymentData);

  // Combine paymentData and KhaltiData into a single array
  const transactions = [
    ...(paymentData?.payments || []),
    ...(KhaltiData?.payment || []),
  ];

  return (
    <div className="w-full h-full ">
      <div className="m-3 p-3 ">
        <div className="mb-3">
          <BackButton></BackButton>
        </div>
        <h1 className="text-2xl font-semibold mb-3">Transaction History</h1>
        {transactions.length > 0 ? (
          transactions.map((transaction, index) => (
            <div key={index} className="h-20 rounded-md shadow-sm bg-white p-5 mb-3">
              <div className="flex justify-between">
                <p className="text-sm">{transaction._id}</p> {/* Using transaction ID */}
                <span className="text-sm text-gray-400">
                  {new Date(transaction.date).toISOString().split("T")[0]}{" "}
                  {/* Format date */}
                </span>
              </div>
              <div className="flex justify-between">
                <p className="text-red-500">
                  NPR <span>{transaction.amount} || {transaction.paidAmount}</span>
                </p>
                <span className="text-sm text-purple-400">
                  {new Date(transaction.date).toTimeString().split(" ")[0]}{" "}
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
