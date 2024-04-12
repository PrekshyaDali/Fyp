import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import AdminLayout from "@/layouts/Admin/Dashboard/AdminLayout";
import ProtectedRoute from "@/layouts/ProtectedRoute";
import Register from "@/pages/register/Register";
import Otpverification from "@/pages/Otp/Otpverification";

import Forgetpassword from "@/pages/login/Forgetpassword";
import Resetpassword from "@/pages/login/Resetpassword";
import UserLayout from "@/layouts/Student/Dashboard/UserLayout";

import Login from "@/pages/login/Login";
import CreateInstuctor from "@/layouts/Admin/CRUD/CreateInstructor";
import AdminDashboard from "@/layouts/Admin/Dashboard/AdminDashboard";
import StudentDetails from "@/pages/component/StudentDetails";
import StudentTable from "@/layouts/Admin/CRUD/StudentTable";
import Finances from "@/layouts/Admin/Dashboard/Finances";
import Courses from "@/layouts/Student/StudentCourses/Courses";
import StudentDashboard from "@/layouts/Student/Dashboard/StudentDashboard";
import AddCourse from "@/layouts/Admin/Course/AddCourse";

import EditCourse from "@/layouts/Admin/Course/AddCourse";
// import CourseButton from "@/layouts/Admin/Course/CourseButton";

import Details from "@/layouts/Student/StudentCourses/Detail";
import ProfileDetails from "@/layouts/Admin/Profile/ProfileDetails";
import StudentProfile from "@/layouts/Student/StudentProfile/StudentProfile";
import StudentProfileDetails from "@/layouts/Student/StudentProfile/StudentProfileDetails";
import InstructorLayout from "@/layouts/Instructor/Instructorlayout";
import InstructorDashboard from "@/layouts/Instructor/InstructorDashboard";
import ChangePassword from "@/pages/login/ChangePassword";
import EnrollmentForms from "@/layouts/Student/StudentCourses/EnrollmentForms";
import InstructorTable from "@/layouts/Admin/CRUD/InstructorTable";
import StudentEdit from "@/layouts/Admin/CRUD/StudentEdit";
import EditProfile from "@/layouts/Admin/Profile/EditProfile";
import CustomizeForm from "@/layouts/Student/StudentCourses/CustomizeForm";
import CustomizeCourse from "@/layouts/Admin/Course/CustomizeCourse";
import ViewStudent from "@/layouts/Admin/CRUD/ViewStudent";
import AttendanceTracking from "@/layouts/Admin/CRUD/AttendanceTracking";
import ViewCourses from "@/layouts/Admin/Course/ViewCourses";
import CoursesTable from "@/layouts/Admin/Course/CoursesTable";
import AddNotifications from "@/layouts/Admin/Notifications/AddNotifications";
import Notifications from "@/layouts/Student/Notifications/Notifications";
import MyCourses from "@/layouts/Student/StudentCourses/MyCourses";
import ViewPayment from "@/layouts/Admin/CRUD/ViewPayment";
import ShowTransactions from "@/layouts/Student/Attendance/ShowTransactions";
import ShowAttendance from "@/layouts/Student/Attendance/ShowAttendance";
import Esewa from "@/layouts/Student/StudentCourses/Esewa";

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
              <Route path="/admin/studentDetails/:id" element={<StudentEdit />}></Route>
              <Route path="/admin/studentView/:id" element={<ViewStudent />}></Route>
              <Route
                path="/admin/viewPayments/:id/:enrollmentId"
                element={<ViewPayment />}
              ></Route>

              <Route
                path="/admin/markAttendance/:id/:enrollmentId"
                element={<AttendanceTracking />}
              ></Route>
              <Route
                path="/admin/instructorDetails"
                element={<InstructorTable />}
              ></Route>
              <Route path="/admin/Finances" element={<Finances></Finances>}></Route>
              <Route path="/admin/Notifications" element={<AddNotifications />}></Route>

              <Route path="/admin/AddCourse" element={<AddCourse />}></Route>
              <Route path="/admin/viewCourse" element={<CoursesTable />}></Route>
              <Route path="/admin/viewCourse/:id" element={<ViewCourses />}></Route>
              <Route path="/admin/customizeCourse" element={<CustomizeCourse />}></Route>
              <Route path="/admin/profile" element={<ProfileDetails />}></Route>
              <Route path="/admin/profile/:id" element={<EditProfile />}></Route>
            </Route>

            <Route path="/user" element={<UserLayout />}>
              <Route path="/user/StudentDashboard" element={<StudentDashboard />} />
              <Route path="/user/courses" element={<Courses />} />
              <Route path="/user/courses/:id" element={<Details />} />
              <Route path="/user/courses/customizeCourse" element={<CustomizeForm />} />
              <Route path="/user/profile" element={<StudentProfileDetails />} />
              <Route path="/user/profile/:id" element={<EditProfile />} />

              <Route path="/user/enrollmentForms/:id" element={<EnrollmentForms />} />
              <Route path="/user/esewa" element={<Esewa />} />
              <Route path="/user/mycourses/:id" element={<MyCourses />} />
              <Route
                path="/user/transactions/:id/:enrollmentId"
                element={<ShowTransactions />}
              />
              <Route
                path="/user/attendances/:id/:enrollmentId"
                element={<ShowAttendance />}
              />
              <Route path="/user/BikeDetails" element={<Details></Details>} />
              <Route path="/user/Notifications" element={<Notifications />}></Route>
            </Route>

            <Route path="/instructor" element={<InstructorLayout />}>
              <Route
                path="/instructor/InstructorDashboard"
                element={<InstructorDashboard />}
              />
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
