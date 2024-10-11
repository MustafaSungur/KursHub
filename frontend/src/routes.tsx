import { lazy, Suspense } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import StudentPrivateRoute from "./components/privateRoutes/StudentPrivateRoute ";
import HomeLayout from "./pages/home/HomeLayout";
import Dashboard from "./pages/home/dashboard/Dashboard";
import WatchHistory from "./pages/home/dashboard/WatchHistory";
import AuthLayout from "./pages/auth/AuthLayout";
import InstructorLayout from "./pages/instructorPanel/InstructorLayout";
import InstructorPrivateRoute from "./components/privateRoutes/InstructorPrivateRoute";
import InstructorEdit from "./pages/instructorPanel/InstructorDashboard";
import CoursesAnalysis from "./pages/instructorPanel/InstructorAnalysis/CoursesAnalysis";
import CourseAnalisisDetails from "./pages/instructorPanel/InstructorAnalysis/CourseAnalisisDetails";
import AdminPrivateRoute from "./components/privateRoutes/AdminPrivateRoute";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminCoursesManagement from "./pages/admin/AdminCoursesManagement";
import AdminUsersManagement from "./pages/admin/AdminUsersManagement";

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
    name: "Instructor Panel",
    path: "/instructor",
    element: (
      <InstructorPrivateRoute>
        <InstructorLayout />
      </InstructorPrivateRoute>
    ),
    children: [
      {
        path: "edit",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <InstructorEdit />
          </Suspense>
        ),
      },
      {
        path: "analisis",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <CoursesAnalysis />
          </Suspense>
        ),
      },
      {
        path: "analisis/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <CourseAnalisisDetails />
          </Suspense>
        ),
      },
    ],
  },

  {
    name: "Admin Panel",
    path: "/admin",
    element: (
      <AdminPrivateRoute>
        <AdminLayout />
      </AdminPrivateRoute>
    ),
    children: [
      {
        path: "/admin/courses",
        element: <AdminCoursesManagement />,
      },
      {
        path: "/admin/users",
        element: <AdminUsersManagement />,
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
];

export default routes;
