import { useGetUsersQuery } from '@/feature/userApiSlice'
import StudentDetails from '@/pages/component/StudentDetails'
import React from 'react'

export default function StudentTable() {
    const {data, isLoading} = useGetUsersQuery({})
  return (
    <StudentDetails
        data = {data}
    />
  )
}
