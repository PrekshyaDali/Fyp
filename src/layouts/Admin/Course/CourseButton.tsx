import React, { useState } from "react";
import Button from "@/pages/component/Button";
import AddCourse from "./AddCourse";
import { Link } from "react-router-dom";

export default function CourseButton() {

  return (
    <div className="flex space-x-8">
      <div>
        <Link to="/admin/AddScooterCourse" >
          <Button name="Add Scooter Details"></Button>
          <img src="" alt="" />
        </Link>
      </div>
      <div>
        <Link to="/admin/AddBikeCourse">
          <Button name="Add Bike Details"></Button>
        </Link>
      </div>

      <div>
        <Link to="/admin/AddCarCourse">
          <Button name="Add Car Details"></Button>
        </Link>
      </div>
    </div>
  );
}
