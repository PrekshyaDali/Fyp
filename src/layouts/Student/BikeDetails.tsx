import React from "react";

import DetailComponent from "@/pages/component/DetailComponent";

const BikeDetails = () => {
  return (
    <DetailComponent
      DetailName="Bike Details"
      paragraph="Learn the basics of motorcycle riding, including how to operate the clutch and throttle, how to shift gears, how to stop, and how to turn. This course also covers motorcycle maintenance, safety tips, and city riding strategies."
      certification="Upon successful completion of the course, students will receive a certificate of completion."
      price="Rs 15000"
      customizationfee="Rs 1000"
    ></DetailComponent>
  );
};

export default BikeDetails;
