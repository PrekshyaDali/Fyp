import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';

import AdminLayout from "@/layouts/Admin/AdminLayout";
import ProtectedRoute from "@/layouts/ProtectedRoute";
import Register from "@/pages/register/Register";
import Otpverification from "@/pages/Otp/Otpverification";

import Forgetpassword from "@/pages/login/Forgetpassword";
import Resetpassword from "@/pages/login/Resetpassword";
import UserLayout from "@/layouts/Student/UserLayout";
import InstructorForm from "@/pages/component/InstructorForm";
import Login from "@/pages/login/Login";
import CreateInstuctor from "@/layouts/Admin/CreateInstructor";
import AdminDashboard from "@/layouts/Admin/AdminDashboard";
import StudentDetails from "@/pages/component/StudentDetails";
import StudentTable from "@/layouts/Admin/StudentTable";
import Finances from "@/layouts/Admin/Finances";
import Courses from "@/layouts/Student/Courses";
import StudentDashboard from "@/layouts/Student/StudentDashboard";
import ScooterDetails from "@/layouts/Student/ScooterDetails";
import BikeDetails from "@/layouts/Student/BikeDetails";
import CarDetails from "@/layouts/Student/CarDetails";
import AddCourse from "@/layouts/Admin/Course/AddCourse";
import EditCourse from "@/layouts/Admin/Course/EditCourse";


// lazy import components
// const PostList = lazy(() => import("@/pages/posts/list"));
// const CreatePost = lazy(() => import("@/pages/posts/create"));
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route>
          <Route element={<ProtectedRoute />} path="/">
            <Route element={<AdminLayout />} path="/admin">
              <Route path="/admin/CreateInstructor" element={<CreateInstuctor />}></Route>
              <Route path="/admin/adminDashboard" element={<AdminDashboard />}></Route>
              <Route path="/admin/studentDetails" element={<StudentTable />}></Route>
              <Route path="/admin/Finances" element={<Finances></Finances>}></Route>
              <Route path="/admin/AddCourse" element={<AddCourse/>}></Route>
              <Route path="/admin/EditCourse" element={<EditCourse/>}></Route>
              <Route path="/admin/AddCourse" element={<AddCourse></AddCourse>}></Route>
            </Route>
            <Route path="/user" element={<UserLayout />}>
              <Route path="/user/StudentDashboard" element={<StudentDashboard />} />
              <Route path="/user/courses" element={<Courses />} />
              <Route path="userPayments" />
              <Route path="userSettings" />
              <Route
                path="/user/ScooterDetails"
                element={<ScooterDetails></ScooterDetails>}
              />
              <Route path="/user/BikeDetails" element={<BikeDetails></BikeDetails>} />
              <Route path="/user/CarDetails" element={<CarDetails></CarDetails>} />
            </Route>
          </Route>
          <Route element={<Register />} path="/register"></Route>
          <Route element={<Login />} path="/login"></Route>
          <Route element={<Otpverification />} path="/otp"></Route>
          <Route element={<Forgetpassword />} path="/Forgetpassword"></Route>
          <Route element={<Resetpassword />} path="/Resetpassword"></Route>
          <Route element={<InstructorForm />} path="/InstructorForm" />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
