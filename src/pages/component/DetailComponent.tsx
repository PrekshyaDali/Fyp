import React from "react";

const DetailComponent = (props) => {
  return (
    <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold mb-6">{props.DetailName}</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Course Overview</h2>
        <p className="text-gray-700">{props.paragraph}</p>
      </div>

      <div className="mb-8 ">
        <h2 className="text-xl font-semibold mb-2">Course Description</h2>
        <p className="text-gray-700 ">{props.description}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Course Duration</h2>
        <p className="text-gray-700">
          Default Duration: 30 weeks
          <br />
          Customization Options: Up to 15 days or 1 week
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Certification</h2>
        <p className="text-gray-700">{props.certification}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Price Details</h2>
        <p className="text-gray-700">
          Standard Price: {props.price}
          <br />
          Customization Fee (per week): {props.customizationfee}
        </p>
      </div>
    </div>
  );
};

export default DetailComponent;
