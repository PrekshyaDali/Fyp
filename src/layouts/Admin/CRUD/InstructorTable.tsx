import { useGetInstructorsQuery } from "@/feature/userApiSlice";
import StudentDetails from "@/pages/component/StudentDetails";
import React, { useEffect, useState } from "react";

export default function InstructorTable() {
  const { data, isLoading } = useGetInstructorsQuery({});
  const [input, setInput] = useState<string>("");
  const [filteredData, setFilteredData] = useState([]);
  const filteredDatas = data?.filter((item) => {
    return (
      item.firstname.toLowerCase().includes(input.toLowerCase()) ||
      item.lastname.toLowerCase().includes(input.toLowerCase()) ||
      item.email.toLowerCase().includes(input.toLowerCase()) ||
      item.contactnumber.toString().toLowerCase().includes(input.toLowerCase())
    );
  });

  useEffect(() => {
    setFilteredData(filteredDatas);
  }, [input, data]);

  return (
    <>
    <div>
     
    </div>
      <StudentDetails
        data={filteredData}
        setInput={setInput}
        SN={"SN"}
        FirstName={"First Name"}
        LastName={"Last Name"}
        Email={"Email"}
        ContactNumber={"Contact Number"}
        Action={"Action"}
      />
    </>
  );
}
