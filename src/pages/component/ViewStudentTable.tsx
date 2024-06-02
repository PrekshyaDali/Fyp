import React from "react";


type ColumnType = {
  key: string;
  value: string;
  cell?: (data: any) => JSX.Element;
};

type Props = {
  column: ColumnType[];
  data: any[];
};



export default function ViewStudentTable(props: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr>
            {props?.column?.map((col, index) => (
              <th key={index} className="text-left p-3">
                {col.value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props?.data?.map((data, index) => (
            <tr key={index} className="border-b">
              {props.column.map((col, index) => (
                <td key={index} className="p-3">
                  {
                    col.cell ?
                    col.cell(data) :
                    data[col.key]
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
