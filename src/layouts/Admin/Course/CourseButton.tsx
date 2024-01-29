import React, { useState } from "react";
import Button from "@/pages/component/Button";
import AddCourse from "./AddCourse";

export default function CourseButton() {
  const [showAddCourse, setShowAddCourse] = useState(false);

  const handleScooterDetailClick = () => {
    setShowAddCourse(true);
  };

  return (
    <div className="flex space-x-5">
      <Button onClick={handleScooterDetailClick} name="Add Scooter Details"></Button>
      <Button name="Add Bike Details"></Button>
      <Button name="Add Car Details"></Button>

      {showAddCourse && <AddCourse />}
    </div>
  );
}
