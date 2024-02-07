import React from "react";
import Search from "./Search";
import { useState } from "react";
import { useDeleteUserMutation } from "@/feature/userApiSlice";
import { toast } from "react-toastify";
import StudentEdit from "@/layouts/Admin/StudentEdit";

const StudentDetails = (props) => {
  const [studentDetails, setStudentDetails] = useState([]);
    const [crossHandler, setCrossHandler] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [deleteUser] = useDeleteUserMutation();

  // const editHandler = async(id) => {

  //   <StudentEdit />;
  // };
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
            <Search setInput={props.setInput}></Search>
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
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
                      <td className="flex gap-2">
                        <button
                          onClick={() => {
                            setShowModal(!showModal);
                          }}
                          className="bg-green-500 p-2 rounded-lg text-white"
                        >
                          Edit
                        </button>
                        {showModal && <StudentEdit setShowModal ={setShowModal} />}
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
