import React, { useState, useEffect } from "react";
import {
  useExportFinanceDataCSVQuery,
  useExportFinanceDataPDFQuery,
  useGetFilteredFinanceDataQuery,
} from "@/feature/adminApiSlice";

const Finances = () => {
  const [filterType, setFilterType] = useState("all");
  const [paymentMethod, setPaymentMethod] = useState("all");
  const [customDate, setCustomDate] = useState({
    startDate: "",
    endDate: "",
  });
  const [queryParams, setQueryParams] = useState({
    filterType: "all",
    paymentMethod: "all",
  });

  useEffect(() => {
    let startDate = new Date();
    let endDate = new Date();

    switch (filterType) {
      case "thisWeek":
        startDate.setDate(startDate.getDate() - startDate.getDay());
        endDate.setDate(startDate.getDate() + 6);
        break;
      case "thisMonth":
        startDate.setDate(1);
        endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
        break;
      case "twoMonths":
        startDate.setMonth(startDate.getMonth() - 2);
        startDate.setDate(1);
        endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 2, 0);
        break;
      case "threeMonths":
        startDate.setMonth(startDate.getMonth() - 3);
        startDate.setDate(1);
        endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 3, 0);
        break;
      case "custom":
        startDate = new Date(customDate.startDate);
        endDate = new Date(customDate.endDate);
        break;
      default:
        startDate = null;
        endDate = null;
        break;
    }

    if (startDate && endDate) {
      setQueryParams((prevParams) => ({
        ...prevParams,
        filterType,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      }));
    } else {
      setQueryParams((prevParams) => ({ ...prevParams, filterType }));
    }
  }, [filterType, customDate]);

  useEffect(() => {
    setQueryParams((prevParams) => ({ ...prevParams, paymentMethod }));
  }, [paymentMethod]);

  const {
    data: financeData,
    isLoading,
    error,
    refetch: refetchFinanceData,
  } = useGetFilteredFinanceDataQuery(queryParams, {
    skip: false,
  });

  const {
    data: csvData,
    refetch: exportFinanceData,
    isFetching: isExportFetching,
  } = useExportFinanceDataPDFQuery({ ...queryParams, export: "csv" }, { skip: true });

const handleExport = async () => {
  try {
    // Fetch finance data for export
    const { data: pdfBlob } = await exportFinanceData();

    // Create a blob URL for the PDF data
    const url = window.URL.createObjectURL(pdfBlob);

    // Create an anchor element for download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "finance_data.pdf");

    // Simulate a click on the anchor element to trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up by revoking the blob URL
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error exporting data:", error);
    if (error instanceof Error) {
      console.log("Error message:", error.message);
      console.log("Error stack:", error.stack);
    } else if (error.data) {
      console.log("Response status:", error.status);
      console.log("Response data:", await error.data.text());
    } else {
      console.log("Unknown error:", error);
    }
  }
};
  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilterType(selectedFilter);
    setCustomDate({ startDate: "", endDate: "" });
    refetchFinanceData();
  };

  const handlePaymentMethodChange = (e) => {
    const selectedPaymentMethod = e.target.value;
    setPaymentMethod(selectedPaymentMethod);
    refetchFinanceData();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Finance Data</h2>
      <div className="relative flex justify-end">
        <img className="w-5 absolute right-2.5 top-2" src="/img/export.png" alt="" />
        <button
          onClick={handleExport}
          disabled={isLoading || isExportFetching}
          className="px-10 py-2 bg-red-700 text-white rounded-md hover:bg-red-600 active:bg-red-700"
        >
          Export
        </button>
      </div>
      <p className="mb-5">Check the finance data here.</p>
      <div className="mb-5 flex justify-between">
        <p>
          Currently Selected Filters: {filterType}, {paymentMethod}
        </p>
        <div className="flex flex-col">
          <label className="mr-3">Filter by Date:</label>
          <select
            value={filterType}
            onChange={handleFilterChange}
            className="border p-2 bg-white"
          >
            <option value="all">All</option>
            <option value="thisWeek">This Week</option>
            <option value="thisMonth">This Month</option>
            <option value="twoMonths">Two Months</option>
            <option value="threeMonths">Three Months</option>
            <option value="custom">Custom</option>
          </select>
          {filterType === "custom" && (
            <div className="mt-5">
              <label>Start Date:</label>
              <input
                type="date"
                value={customDate.startDate}
                onChange={(e) =>
                  setCustomDate({ ...customDate, startDate: e.target.value })
                }
                className="border p-2 mr-3 bg-white"
              />
              <label>End Date:</label>
              <input
                type="date"
                value={customDate.endDate}
                onChange={(e) =>
                  setCustomDate({ ...customDate, endDate: e.target.value })
                }
                className="border p-2 bg-white"
              />
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <label>Filter by Payment Method:</label>
          <select
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
            className="border p-2 bg-white"
          >
            <option value="all">All</option>
            <option value="Regular customer">Regular Customer</option>
            <option value="Khalti">Khalti</option>
            <option value="In House">In House</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm border-b border-gray-200">
                Source
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm border-b border-gray-200">
                Amount
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm border-b border-gray-200">
                Date
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm border-b border-gray-200">
                Customer Name
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm border-b border-gray-200">
                Payment Method
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm border-b border-gray-200">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {financeData?.data?.map((item) => (
              <tr key={item._id}>
                <td className="text-left py-4 px-6 border-b border-gray-200">
                  {item.source}
                </td>
                <td className="text-left py-4 px-6 border-b border-gray-200">
                  {item.amount}
                </td>
                <td className="text-left py-4 px-6 border-b border-gray-200">
                  {new Date(item.date).toLocaleDateString()}
                </td>
                <td className="text-left py-4 px-6 border-b border-gray-200">
                  {item.customerName}
                </td>
                <td className="text-left py-4 px-6 border-b border-gray-200">
                  {item.paymentMethod}
                </td>
                <td className="text-left py-4 px-6 border-b border-gray-200">
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading finance data: {error.message}</p>}
    </div>
  );
};

export default Finances;
