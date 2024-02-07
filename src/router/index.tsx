import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import AdminLayout from "@/layouts/Admin/AdminLayout";
import ProtectedRoute from "@/layouts/ProtectedRoute";
import Register from "@/pages/register/Register";
import Otpverification from "@/pages/Otp/Otpverification";

import Forgetpassword from "@/pages/login/Forgetpassword";
import Resetpassword from "@/pages/login/Resetpassword";
import UserLayout from "@/layouts/Student/UserLayout";

import Login from "@/pages/login/Login";
import CreateInstuctor from "@/layouts/Admin/CreateInstructor";
import AdminDashboard from "@/layouts/Admin/AdminDashboard";
import StudentDetails from "@/pages/component/StudentDetails";
import StudentTable from "@/layouts/Admin/StudentTable";
import Finances from "@/layouts/Admin/Finances";
import Courses from "@/layouts/Student/Courses";
import StudentDashboard from "@/layouts/Student/StudentDashboard";
import AddCourse from "@/layouts/Admin/Course/AddCourse";

import EditCourse from "@/layouts/Admin/Course/AddCourse";
import CourseButton from "@/layouts/Admin/Course/CourseButton";
import Details from "@/layouts/Student/Detail";
import ProfileDetails from "@/layouts/Admin/Profile/ProfileDetails";
import StudentProfile from "@/layouts/Student/Profile/StudentProfile";
import StudentProfileDetails from "@/layouts/Student/Profile/StudentProfileDetails";
import InstructorLayout from "@/layouts/Instructor/Instructorlayout";
import InstructorDashboard from "@/layouts/Instructor/InstructorDashboard";
import ChangePassword from "@/pages/login/ChangePassword";


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
              <Route path="/admin/CourseButton" element={<CourseButton />}></Route>
              <Route path="/admin/AddCourse" element={<AddCourse />}></Route>
              <Route path="/admin/profile" element={<ProfileDetails />}></Route>
            </Route>

            <Route path="/user" element={<UserLayout />}>
              <Route path="/user/StudentDashboard" element={<StudentDashboard />} />
              <Route path="/user/courses" element={<Courses />} />
              <Route path="/user/courses/:id" element={<Details />} />
              <Route path="/user/profile" element={<StudentProfileDetails />} />
              <Route path="user/finances" element = {<Finances/>} />
              <Route path="userSettings" />

              <Route path="/user/BikeDetails" element={<Details></Details>} />
            </Route>

            <Route path="/instructor" element={<InstructorLayout />} >
            <Route path="/instructor/InstructorDashboard" element={<InstructorDashboard />} />

            
            
            
            
            </Route>

          </Route>
          <Route element={<Register />} path="/register"></Route>
          <Route element={<Login />} path="/login"></Route>
          <Route element={<Otpverification />} path="/otp"></Route>
          <Route element={<Forgetpassword />} path="/Forgetpassword"></Route>
          <Route element={<Resetpassword />} path="/Resetpassword"></Route>
          <Route element={<ChangePassword />} path="/Changepassword"></Route>

        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
