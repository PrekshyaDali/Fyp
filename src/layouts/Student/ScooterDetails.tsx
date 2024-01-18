import React from "react";

import DetailComponent from "@/pages/component/DetailComponent";

const ScooterDetails = () => {
  return (
    <DetailComponent
      DetailName="Scooter Details"
      paragraph="Learn the basics of motorcycle riding, including how to operate the clutch and throttle, how to shift gears, how to stop, and how to turn. This course also covers motorcycle maintenance, safety tips, and city riding strategies."
      certification="Upon successful completion of the course, students will receive a certificate of completion."
      price="Rs 12000"
      customizationfee="Rs 1000"
    ></DetailComponent>
  );
};

export default ScooterDetails;
