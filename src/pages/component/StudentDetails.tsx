import React from "react";
import Search from "./Search";
import { useState } from "react";
import { useDeleteUserMutation } from "@/feature/userApiSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import StudentEdit from "@/layouts/Admin/CRUD/StudentEdit";
import { useGetUsersQuery } from "@/feature/userApiSlice";

const StudentDetails = (props) => {
  const { data } = useGetUsersQuery({});
  const [studentDetails, setStudentDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async (id) => {
    try {
      const res = await deleteUser(id).unwrap();
      toast.success("User Deleted Successfully");
      setStudentDetails(res);
    } catch (error) {
      console.log(error, "err");
      const { data } = error as { data: { error: string } };
      toast.error(data.error);
    }
  };

 
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <div className = "mb-3 mt-3">
              <Search setInput={props.setInput}></Search>
            </div>
            <table className="min-w-full text-left text-sm font-light bg-white">
              <thead className="border-b font-medium bg-gray-200 ">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    {props.SN}
                  </th>
                  <th scope="col" className="px-6 py-4">
                    {props.FirstName}
                  </th>
                  <th scope="col" className="px-6 py-4">
                    {props.LastName}
                  </th>
                  <th scope="col" className="px-6 py-4">
                    {props.Email}
                  </th>
                  <th scope="col" className="px-6 py-4">
                    {props.ContactNumber}
                  </th>
                  <th scope="col" className="px-6 py-4">
                    {props.CourseEnrolled}
                  </th>

                  <th scope="col" className="px-6 py-4">
                    {props.Action}
                  </th>
                </tr>
              </thead>
              <tbody>
                {props?.data?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.firstname}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.lastname}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.contactnumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-green-400 flex items-center justify-center">
                          {item?.enrolled ? (
                            "Enrolled"
                          ) : (
                            <span className="text-red-500">Not Enrolled</span>
                          )}
                        </div>
                      </td>

                      <td className="flex gap-2">
                        <Link to={`/admin/studentView/${item._id}`}>
                          <button className="bg-green-400 p-2 rounded-lg text-white">
                            View
                          </button>
                        </Link>
                        <Link to={`/admin/studentDetails/${item._id}`}>
                          <button className="bg-blue-500 p-2 rounded-lg text-white">
                            Edit
                          </button>
                        </Link>
                        <button
                          className="bg-red-500 p-2 rounded-lg text-white"
                          onClick={() => {
                            handleDelete(item._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
