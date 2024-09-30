import { lazy, Suspense } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import StudentPrivateRoute from "./components/privateRoutes/StudentPrivateRoute ";
import AuthLayout from "./components/layouts/AuthLayout";
import HomeLayout from "./pages/home/HomeLayout";
import Dashboard from "./pages/home/dashboard/Dashboard";
import WatchHistory from "./pages/home/dashboard/WatchHistory";

// Lazy load components
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Home = lazy(() => import("./pages/home/Home"));
const Courses = lazy(() => import("./pages/home/Courses"));
const CourseDetail = lazy(() => import("./pages/home/CourseDetail"));
const Page404 = lazy(() => import("./pages/Page404"));

const routes = [
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Register />
          </Suspense>
        ),
      },
    ],
  },
  {
    name: "Home",
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "courses",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Courses />
          </Suspense>
        ),
      },
      {
        path: "courses/:id",
        element: (
          <StudentPrivateRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <CourseDetail />
            </Suspense>
          </StudentPrivateRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <StudentPrivateRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <Dashboard />
            </Suspense>
          </StudentPrivateRoute>
        ),
      },
      {
        path: "dashboard/history",
        element: (
          <StudentPrivateRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <WatchHistory />
            </Suspense>
          </StudentPrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Page404 />
      </Suspense>
    ),
  },

  // {
  //   name: "Instructor Panel",
  //   path: "/instructor",
  //   element: (
  //     <PrivateRoute auth={true}>
  //       <InstructorLayout />
  //     </PrivateRoute>
  //   ),
  //   children: [],
  // },

  // {
  //   name: "Admin Panel",
  //   path: "/admin",
  //   element: (
  //     <PrivateRoute auth={true}>
  //       <AdminLayout />
  //     </PrivateRoute>
  //   ),
  //   children: [],
  // },
];

export default routes;
