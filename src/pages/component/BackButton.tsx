import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigate back by one step
  };

  return (
    <button
      onClick={handleGoBack}
      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
    >
      Back
    </button>
  );
};

export default BackButton;
