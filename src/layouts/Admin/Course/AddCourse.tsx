import Button from "@/pages/component/Button";
import React, { useState } from "react";

export default function AddCourse() {
  const [courseFields, setCourseFields] = useState([
    { id: 1, title: "", description: "" },
  ]);

  const addCourseField = () => {
    setCourseFields((prevFields) => [
      ...prevFields,
      { id: Date.now(), title: "", description: "" },
    ]);
  };

  const removeCourseField = () => {
    if (courseFields.length > 1) {
      setCourseFields((prevFields) => prevFields.slice(0, -1));
    }
  };

  const handleFieldChange = (index, field, value) => {
    setCourseFields((prevFields) => {
      const newFields = [...prevFields];
      newFields[index][field] = value;
      return newFields;
    });
  };

  return (
    <div className="relative">
      {courseFields.map((field, index) => (
        <div
          key={field.id}
          className="relative border p-4 shadow-md m-4 space-y-5 rounded-md"
        >
          <div className="p-2">
            <input
              className="bg-white p-4 w-full h-12 border border-gray-300 shadow-sm rounded-md"
              placeholder="Enter Title"
              type="text"
              value={field.title}
              onChange={(e) => handleFieldChange(index, "title", e.target.value)}
            />
          </div>
          <div className="mb-8">
            <input
              placeholder="Enter Description"
              className="bg-white p-4 w-full h-56 border border-gray-300 shadow-sm rounded-md"
              type="text"
              value={field.description}
              onChange={(e) => handleFieldChange(index, "description", e.target.value)}
            />
          </div>
          {index === courseFields.length - 1 && (
            <div className="flex space-x-2">
              <div className="h-10 w-10 rounded-3xl bg-gray-200 hover:bg-gray-300 hover:active:bg-gray-200 flex items-center justify-center">
                <img
                  className="h-6 cursor-pointer"
                  src="/img/plus-button.png"
                  alt=""
                  onClick={addCourseField}
                />
              </div>
              {courseFields.length > 1 && (
                <div className="h-10 w-10 rounded-3xl bg-gray-200 hover:bg-gray-300 hover:active:bg-gray-200 flex items-center justify-center">
                  <img
                    className="h-6 cursor-pointer"
                    src="/img/minus-button.png" // Replace with your minus button image
                    alt=""
                    onClick={removeCourseField}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      ))}
      <div className="absolute right-5">
        <Button name="Save" />
      </div>
    </div>
  );
}
