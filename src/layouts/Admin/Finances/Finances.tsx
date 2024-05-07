import React, { useState } from "react";

export default function Finances() {
  const data = [
    {
      id: 1,
      date: "2023-04-01",
      customerName: "John Doe",
      paymentSource: "Khalti",
      amountPaid: 5000,
      paymentStatus: "Paid",
    },
    {
      id: 2,
      date: "2023-04-03",
      customerName: "Jane Smith",
      paymentSource: "In House",
      amountPaid: 2500,
      paymentStatus: "Pending",
    },
    {
      id: 3,
      date: "2023-04-05",
      customerName: "Bob Johnson",
      paymentSource: "Regular Customer",
      amountPaid: 7000,
      paymentStatus: "Paid",
    },
    // Add more dummy data as needed
  ];

  const [filteredData, setFilteredData] = useState(data);
  const [dateFilter, setDateFilter] = useState("");
  const [paymentSourceFilter, setPaymentSourceFilter] = useState("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("");
  const [amountRange, setAmountRange] = useState({ min: "", max: "" });

  const handleFilter = () => {
    let filtered = data;

    // Filter by date
    if (dateFilter) {
      // Implement date filtering logic
    }

    // Filter by payment source
    if (paymentSourceFilter) {
      filtered = filtered.filter((item) =>
        item.paymentSource.toLowerCase().includes(paymentSourceFilter.toLowerCase()),
      );
    }

    // Filter by payment status
    if (paymentStatusFilter) {
      filtered = filtered.filter((item) =>
        item.paymentStatus.toLowerCase().includes(paymentStatusFilter.toLowerCase()),
      );
    }

    // Filter by amount range
    filtered = filtered.filter(
      (item) =>
        (amountRange.min === "" || item.amountPaid >= amountRange.min) &&
        (amountRange.max === "" || item.amountPaid <= amountRange.max),
    );

    setFilteredData(filtered);
  };

  const handleDateFilterChange = (e) => {
    setDateFilter(e.target.value);
    handleFilter();
  };

  const handlePaymentSourceFilterChange = (e) => {
    setPaymentSourceFilter(e.target.value);
    handleFilter();
  };

  const handlePaymentStatusFilterChange = (e) => {
    setPaymentStatusFilter(e.target.value);
    handleFilter();
  };

  const handleAmountRangeChange = (e) => {
    const { name, value } = e.target;
    setAmountRange((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    handleFilter();
  };

  return (
    <div className="p-3">
      <div className="mb-4 space-x-5 flex md:justify-between">
        <select
          className="bg-white p-2 focus-visible:outline-none border-2 text-gray-500"
          onChange={handleDateFilterChange}
        >
          <option value="">Today</option>
          <option value="">Last week</option>
          <option value="">This month</option>
          <option value="">Last 3 months</option>
          <option value="">Custom</option>
        </select>
        <select
          className="bg-white p-2 focus-visible:outline-none border-2 text-gray-500"
          onChange={handlePaymentSourceFilterChange}
        >
          <option value="">All Payment Sources</option>
          <option value="Khalti">Khalti</option>
          <option value="In House">In House</option>
          <option value="Regular Customer">Regular Customer</option>
        </select>
        <select
          className="bg-white p-2 focus-visible:outline-none border-2 text-gray-500"
          onChange={handlePaymentStatusFilterChange}
        >
          <option value="">All Payment Status</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
        </select>
        <div className="flex">
          <input
            type="number"
            name="min"
            placeholder="Min Amount"
            className="px-2 py-1 border border-gray-300 rounded bg-white"
            value={amountRange.min}
            onChange={handleAmountRangeChange}
          />
          <input
            type="number"
            name="max"
            placeholder="Max Amount"
            className="px-2 py-1 border border-gray-300 rounded bg-white ml-2"
            value={amountRange.max}
            onChange={handleAmountRangeChange}
          />
        </div>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Customer Name</th>
            <th className="px-4 py-2">Payment Source</th>
            <th className="px-4 py-2">Amount Paid</th>
            <th className="px-4 py-2">Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
              <td className="px-4 py-2 border">{item.id}</td>
              <td className="px-4 py-2 border">{item.date}</td>
              <td className="px-4 py-2 border">{item.customerName}</td>
              <td className="px-4 py-2 border">{item.paymentSource}</td>
              <td className="px-4 py-2 border">${item.amountPaid.toLocaleString()}</td>
              <td className="px-4 py-2 border">{item.paymentStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
