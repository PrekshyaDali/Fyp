import Button from "@/pages/component/Button";
import React from "react";
import { useGetCourseQuery } from "@/feature/userApiSlice";
import { useParams } from "react-router-dom";
import {useState} from "react";
export default function ViewCourses() {
  const {id} = useParams<{id:string}>();
  const {data} = useGetCourseQuery(id,{refetchOnMountOrArgChange:true});
  console.log(data);
  const[edit, setEdit] = useState(false)

  const clickEditHandler=()=>{
    setEdit(true);
  }
  return (
    

    <div className="p-3 bg-[#E6F0FB] flex flex-col space-y-5 border-2 m-3 rounded-md  shadow-md">
      <div>
        <h1 className="text-2xl font-bold">Course Details</h1>
      </div>

      <div className="flex justify-between relative">
        <div className="h-52 w-64  overflow-hidden ">
          <img className="object-contain h-52 w-64" src="/img/Car.png" alt="" />
        </div>

        <div className=" absolute bottom-3 right-3">
          <button onClick = {clickEditHandler} className="bg-red-800 h-10 px-6 text-white rounded-md hover:bg-red-700 active:bg-red-800">
            Edit Details
          </button>
        </div>
      </div>

      <div className="flex space-x-5 border-2 rounded-md">
        <div className="w-72 flex justify-center font-bold ">
          <label htmlFor="Category ">Category</label>
        </div>
        <select value = {data?.type} className = "w-full bg-white border-2" name="" id="">
          <option value="Car">Car</option>
          <option value="Car">Bike</option>
          <option value="Car">Scooter</option>
        </select>
      </div>

      <div className="flex space-x-5 border-2 rounded-md">
        <div className="w-72  flex justify-center font-bold">
          <label htmlFor="CourseOverview">Course Overview</label>
        </div>
        <textarea cols={10} rows={4} className="w-full bg-white border-2"></textarea>
      </div>

      <div className="flex space-x-5 border-2 rounded-md">
        <div className="w-72  flex justify-center font-bold">
          <label htmlFor="Category">Course Description</label>
        </div>
        <textarea cols={20} rows={8} className="w-full bg-white border-2 overflow-auto"></textarea>
      </div>

      <div className="flex space-x-5 border-2 rounded-md">
        <div className="w-72  flex justify-center font-bold">
          <label htmlFor="Category">Certification</label>
        </div>
        <textarea cols={10} rows={3} className="w-full bg-white border-2"></textarea>
      </div>

      <div className="flex space-x-5 border-2 rounded-md ">
        <div className="w-72  flex justify-center font-bold">
          <label htmlFor="Price">Price</label>
        </div>
        <input type="number" className="w-full bg-white border-2" />
      </div>

      <div className="flex justify-end">
        <Button name="Save Changes"></Button>
      </div>
    </div>
  );
}
