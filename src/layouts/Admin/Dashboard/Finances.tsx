import Button from "@/pages/component/Button";
import React from "react";
import useState from "react";

const Finances = () => {
    const [basePrice, setBasePrice] = React.useState("");
    const [discountPercentage, setDiscountPercentage] = React.useState("");
    const [discountThreshold, setDiscountThreshold] = React.useState("");
    const [maxDiscount, setMaxDiscount] = React.useState("");

    const handleSave = () => {
      // Logic to save/update the form data
    };
  return (
    <div className="max-w-md mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-4">Admin Settings</h2>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Base Price Per Day:</label>
        <input
          type="text"
          value={basePrice}
          onChange={(e) => setBasePrice(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Discount Percentage:</label>
        <input
          type="text"
          value={discountPercentage}
          onChange={(e) => setDiscountPercentage(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Discount Duration Threshold:</label>
        <input
          type="text"
          value={discountThreshold}
          onChange={(e) => setDiscountThreshold(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Maximum Discount Percentage:</label>
        <input
          type="text"
          value={maxDiscount}
          onChange={(e) => setMaxDiscount(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
      >
        Save Settings
      </button>
    </div>
  );
};

export default Finances;
