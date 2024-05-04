import React from "react";

const VehiclesAvailability = () => {
  const products = [
    {
      name: "Yaris L",
      price: 16605,
      mpg: 35,
      leaseCost: 1174,
      monthlyPayment: 338,
      downPayment: 310,
    },
    {
      name: "Yaris LE",
      price: 17605,
      mpg: 35,
      leaseCost: 1174,
      monthlyPayment: 338,
      downPayment: 310,
    },
    {
      name: "Yaris Hatchback LE",
      price: 18605,
      mpg: 35,
      leaseCost: 1174,
      monthlyPayment: 338,
      downPayment: 310,
    },
    {
      name: "Yaris Hatchback XLI",
      price: 19605,
      mpg: 35,
      leaseCost: 1174,
      monthlyPayment: 338,
      downPayment: 310,
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
        {products.map((product, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4">
            <img
              src={`https://via.placeholder.com/300x200?text=${encodeURIComponent(
                product.name,
              )}`}
              alt={product.name}
              className="w-full h-48 object-cover mb-4"
            />
            <h3 className="text-lg font-bold mb-2">{product.name}</h3>
            <p className="text-gray-700 mb-2">Average price: ${product.price}</p>
            <div className="flex items-center mb-2">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                <span className="text-blue-500 font-bold">{product.mpg}</span>
              </div>
              <span className="text-gray-600">MPG</span>
            </div>
            <div className="flex justify-between">
              <div>
                <p className="text-gray-700 mb-1">Lease for:</p>
                <p className="text-lg font-bold">${product.leaseCost}/mo</p>
              </div>
              <div>
                <p className="text-gray-700 mb-1">Estimated payment:</p>
                <p className="text-lg font-bold">${product.monthlyPayment}/mo</p>
              </div>
              <div>
                <p className="text-gray-700 mb-1">Due at signing:</p>
                <p className="text-lg font-bold">${product.downPayment}</p>
              </div>
            </div>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600">
              Learn More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehiclesAvailability;
