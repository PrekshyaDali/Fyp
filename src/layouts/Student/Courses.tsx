import React from "react";

import Coursesbox from "@/pages/component/Coursesbox";
import { Link } from "react-router-dom";

const Courses = () => {
      
return (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-[#30343f]">
    <Coursesbox
      courseName="Scooter Course"
      description="Dive into the world of scooters and learn everything from basic riding skills to advanced maneuvering techniques. This course covers scooter maintenance, safety tips, and city riding strategies."
      img="/img/Scooter1.png"
      ViewDetails={<Link to="/user/ScooterDetails">View Details</Link>}
    />
    <Coursesbox
      courseName="Motorcycle Course"
      description="Learn the basics of motorcycle riding, including how to operate the clutch and throttle, how to shift gears, how to stop, and how to turn. This course also covers motorcycle maintenance, safety tips, and city riding strategies."
      img="/img/Bike1.png"
      ViewDetails={<Link to="/user/BikeDetails">View Details</Link>}
    />
    <Coursesbox
      courseName="Car Course"
      description="Learn the basics of motorcycle riding, including how to operate the clutch and throttle, how to shift gears, how to stop, and how to turn. This course also covers motorcycle maintenance, safety tips, and city riding strategies."
      img="/img/Car1.png"
      ViewDetails={<Link to="/user/CarDetails">View Details</Link>}
    />
  </div>
);
};

export default Courses;
