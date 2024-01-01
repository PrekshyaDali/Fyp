import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import AdminLayout from "@/layouts/AdminLayout";
import ProtectedRoute from "@/layouts/ProtectedRoute";
import Register from "@/pages/register/Register";
import Otpverification from "@/pages/Otpverification/Otpverification";
import Otpbutton from "@/pages/Otpbutton/Otpbutton";
import Forgetpassword from "@/pages/login/Forgetpassword";
import Resetpassword from "@/pages/login/Resetpassword";
import UserLayout from "@/layouts/UserLayout";

// lazy import components
// const PostList = lazy(() => import("@/pages/posts/list"));
// const CreatePost = lazy(() => import("@/pages/posts/create"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <h1>Dashboard</h1>,
          },

          {
            path: "/posts",
            element: (
              <Suspense fallback={<div>Loading...</div>}>{/* <PostList /> */}</Suspense>
            ),
          },
          {
            path: "/posts/create",
            element: (
              <Suspense fallback={<div>Loading...</div>}>{/* <CreatePost /> */}</Suspense>
            ),
          },
        ],
      },
      {
        path: "/user",
        element: <UserLayout />,
      }
    ],
  },
  
  {
    path: "/register",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: "/otp",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Otpverification />
      </Suspense>
    ),
  },
  {
    path: "/otp_button",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Otpbutton />
      </Suspense>
    ),
  },
  {
    path: "/Forgetpassword",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Forgetpassword />
      </Suspense>
    ),
  },
  {
    path: "/Resetpassword",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Resetpassword />
      </Suspense>
    ),
  },
]);

export default router;
