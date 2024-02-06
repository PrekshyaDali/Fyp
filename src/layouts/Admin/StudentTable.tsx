import { useGetUsersQuery } from '@/feature/userApiSlice'
import StudentDetails from '@/pages/component/StudentDetails'
import React, { useEffect, useState } from 'react'
import StudentEdit from './StudentEdit'

export default function StudentTable() {
    const {data, isLoading} = useGetUsersQuery({})
    const [input, setInput] = useState<string>("")
    const [filteredData, setFilteredData] = useState([])
    const filteredDatas = data?.filter((item) => {
        return item.firstname.toLowerCase().includes(input.toLowerCase()) 
        || item.lastname.toLowerCase().includes(input.toLowerCase())
        || item.email.toLowerCase().includes(input.toLowerCase()) || item.contactnumber.toString().toLowerCase().includes(input.toLowerCase())  
    }
    )


    useEffect(() => {
        setFilteredData(filteredDatas)
    }, [input, data])

  return (
    <>
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
