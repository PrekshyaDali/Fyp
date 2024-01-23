import React from "react";
import Search from "./Search";

const StudentDetails = (props) => {
  
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
           <Search
            setInput = {props.setInput}
           ></Search>
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    S.no
                  </th>
                  <th scope="col" className="px-6 py-4">
                    FirstName
                  </th>
                  <th scope="col" className="px-6 py-4">
                    LastName
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Contact Number
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
               {
                props?.data?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.firstname}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.lastname}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.contactnumber}
                      </td>
                      <td className="flex gap-2">
                        <button className="bg-green-500 p-2 rounded-lg text-white">Edit</button>
                        <button className="bg-red-500 p-2 rounded-lg text-white">Delete</button>
                      </td>
                    </tr>
                  );
                }
                )
               }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
