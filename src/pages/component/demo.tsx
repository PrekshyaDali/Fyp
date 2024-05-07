import React, { useState } from "react";

const PaymentDashboard = () => {
  const [filterSource, setFilterSource] = useState("");
  const [filterPaymentMethod, setFilterPaymentMethod] = useState("");

  const payments = [
    {
      id: 1,
      source: "Regular Customer",
      amount: 150,
      date: "2024-05-01",
      paymentMethod: "Cash",
    },
    {
      id: 2,
      source: "Enrollment",
      amount: 300,
      date: "2024-05-02",
      paymentMethod: "Credit Card",
    },
    { id: 3, source: "Khalti", amount: 200, date: "2024-05-03", paymentMethod: "Khalti" },
    // Add more payment data as needed
  ];

  const totalPayments = payments.reduce((sum, payment) => sum + payment.amount, 0);

  const filteredPayments = payments.filter(
    (payment) =>
      (filterSource === "" || payment.source === filterSource) &&
      (filterPaymentMethod === "" || payment.paymentMethod === filterPaymentMethod),
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="text-3xl font-bold text-gray-800 mb-6">Driving School Finances</div>

      {/* Filters */}
      <div className="mb-6 flex justify-between">
        <div>
          <label htmlFor="filterSource" className="block font-semibold text-gray-700">
            Filter by Source
          </label>
          <select
            id="filterSource"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={filterSource}
            onChange={(e) => setFilterSource(e.target.value)}
          >
            <option value="">All Sources</option>
            <option value="Regular Customer">Regular Customer</option>
            <option value="Enrollment">Enrollment</option>
            <option value="Khalti">Khalti</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="filterPaymentMethod"
            className="block font-semibold text-gray-700"
          >
            Filter by Payment Method
          </label>
          <select
            id="filterPaymentMethod"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={filterPaymentMethod}
            onChange={(e) => setFilterPaymentMethod(e.target.value)}
          >
            <option value="">All Payment Methods</option>
            <option value="Cash">Cash</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Khalti">Khalti</option>
          </select>
        </div>
      </div>

      {/* Summary Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <p className="text-xl font-semibold text-gray-700">
          Total Payments: NPR {totalPayments}
        </p>
        <p className="text-gray-600">Payments overview for the current period.</p>
      </div>

      {/* Payment Details */}
      <div className="space-y-4">
        {filteredPayments.map((payment) => (
          <div
            key={payment.id}
            className="bg-white p-4 rounded-lg shadow-md flex justify-between"
          >
            <div>
              <p className="font-semibold text-gray-700">{payment.source}</p>
              <p className="text-gray-500">{payment.date}</p>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-red-500 font-bold">NPR {payment.amount}</p>
              <p className="text-gray-500 text-sm">{payment.paymentMethod}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentDashboard;
