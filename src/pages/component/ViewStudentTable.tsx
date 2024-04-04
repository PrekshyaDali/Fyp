import React from 'react'

export default function ViewStudentTable(props) {
  return (
    <div className="overflow-x-auto overflow-y-auto">
      <table className="table-auto overflow-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">{props.SN}</th>
            <th className="px-4 py-2">{props.field1}</th>
            <th className="px-4 py-2">{props.field2}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">{props.data1}</td>
            <td className="border px-4 py-2">{props.data2}</td>
            <td className="border px-4 py-2 text-green-400">{props.data3}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
