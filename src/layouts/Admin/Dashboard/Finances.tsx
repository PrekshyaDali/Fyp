import Button from "@/pages/component/Button";
import ViewStudentTable from "@/pages/component/ViewStudentTable";
import React from "react";

export default function Finances() {
  const column = [{
    key: "sn",
    value: "S.N"
  },
{
  key: "category",
  value: "Category"
},
{
  key: "duration",
  value: "Value"
},
{
  amount: "amount",
  value: "Amount"
},

]
  return (
    <div className="w-full h-full p-3">
      <div className="flex space-x-5 ">
        <div className="">
          <label htmlFor="">Category</label>
          <select className="inputfields" name="" id="">
            <option value=""> Car</option>
            <option value=""> Bike</option>
            <option value=""> Scooter</option>
          </select>
        </div>
        <div>
          <label htmlFor="">Duration</label>
          <input className="inputfields" type="text" />
        </div>
        <div>
          <label htmlFor="">Amount</label>
          <input className="inputfields" type="text" />
        </div>
        <div className="mt-6">
          <Button name="Submit"></Button>
        </div>
      </div>

      {/* table */}
      <div className="bg-white p-5 flex-1 h-96 overflow-auto">
        <ViewStudentTable />
      </div>
    </div>
  );
}
