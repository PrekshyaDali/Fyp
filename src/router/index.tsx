import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import AdminLayout from "@/layouts/Admin/AdminLayout";
import ProtectedRoute from "@/layouts/ProtectedRoute";
import Register from "@/pages/register/Register";
import Otpverification from "@/pages/Otp/Otpverification";

import Forgetpassword from "@/pages/login/Forgetpassword";
import Resetpassword from "@/pages/login/Resetpassword";
import UserLayout from "@/layouts/UserLayout";
import InstructorForm from "@/pages/component/InstructorForm";
import Login from "@/pages/login/Login";

// lazy import components
// const PostList = lazy(() => import("@/pages/posts/list"));
// const CreatePost = lazy(() => import("@/pages/posts/create"));
const AppRouter = ()=>{
  return(
    <Router>
      <Routes>
        <Route>
          <Route element = {<ProtectedRoute/>} path = "/" >
                <Route element = {<AdminLayout/>} path = "/admin" ></Route>
                <Route element = {<UserLayout/>} path = "/user" ></Route>

          </Route>
          <Route element = {<Register/>} path = "/register" ></Route>
          <Route element = {<Login/>} path = "/login" ></Route>
          <Route element = {<Otpverification/>} path = "/otp" ></Route>
          <Route element = {<Forgetpassword/>} path = "/Forgetpassword" ></Route>
          <Route element = {<Resetpassword/>} path = "/Resetpassword" ></Route>
          <Route element = {<InstructorForm/>} path = "/InstructorForm" />


        </Route>
      </Routes>
    </Router>


  )
}




export default AppRouter;
























// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <ProtectedRoute />,
//     children: [
//       {
//         path: "/",
//         element: <AdminLayout />,
//         children: [
//           {
//             index: true,
//             element: <h1>Dashboard</h1>,
//           },

//           {
//             path: "/posts",
//             element: (
//               <Suspense fallback={<div>Loading...</div>}>{/* <PostList /> */}</Suspense>
//             ),
//           },
//           {
//             path: "/posts/create",
//             element: (
//               <Suspense fallback={<div>Loading...</div>}>{/* <CreatePost /> */}</Suspense>
//             ),
//           },
//         ],
//       },
//       {
//         path: "/user",
//         element: <UserLayout />,
//       },
//     ],
//   },

//   {
//     path: "/register",
//     element: (
//       <Suspense fallback={<div>Loading...</div>}>
//         <Register />
//       </Suspense>
//     ),
//   },
//   {
//     path: "/otp",
//     element: (
//       <Suspense fallback={<div>Loading...</div>}>
//         <Otpverification />
//       </Suspense>
//     ),
//   },
 
//   {
//     path: "/Forgetpassword",
//     element: (
//       <Suspense fallback={<div>Loading...</div>}>
//         <Forgetpassword />
//       </Suspense>
//     ),
//   },
//   {
//     path: "/Resetpassword",
//     element: (
//       <Suspense fallback={<div>Loading...</div>}>
//         <Resetpassword />
//       </Suspense>
//     ),
//   },
//   {
//     path: "/InstructorForm",
//     element: (
//       <Suspense fallback={<div>Loading...</div>}>
//         <InstructorForm />
//       </Suspense>
//     ),
//   },
// ]);

// export default router;
