import React from "react";

export default function ViewStudentTable(props) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-3 text-left font-medium">{props.SN}</th>
            <th className="px-4 py-3 text-left font-medium">{props.Date}</th>
            <th className="px-4 py-3 text-left font-medium">{props.field1}</th>
            <th className="px-4 py-3 text-left font-medium">{props.field2}</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b hover:bg-gray-100">
            <td className="px-4 py-3 text-gray-700">{props.data1}</td>
            <td className="px-4 py-3 text-gray-700">{props.data2}</td>
            <td className="px-4 py-3 text-gray-700">{props.data3}</td>
            <td className="px-4 py-3 font-medium text-green-500">{props.data4}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
