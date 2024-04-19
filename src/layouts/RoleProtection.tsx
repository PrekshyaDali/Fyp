import React from 'react'
import { Outlet } from 'react-router-dom'
import { useAppSelector } from '@/app/store'
import { selectUser } from '@/app/authSlice'
import NotFound from '@/pages/component/NotFound'


export default function RoleProtection({role}:{role:string}) {
    console.log(role)
    const user = useAppSelector(selectUser)
    if (user.role === role) {
      return <Outlet />
    }else{
  return (
    <NotFound />
  )
}
}
