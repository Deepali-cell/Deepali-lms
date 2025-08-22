import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HeroSection from "./pages/students/HeroSection";
import MainLayout from "./layout/MainLayout";
import Cources from "./pages/students/Cources";
import MyLearning from "./pages/students/MyLearning";
import Profile from "./pages/students/Profile";
import AddCource from "./pages/admin/cource/AddCource";
import Dashboard from "./pages/admin/Dashboard";
import Sidebar from "./pages/admin/Sidebar";
import CourcesList from "./pages/admin/cource/CourcesList";
import EditCource from "./pages/admin/cource/EditCource";
import AddLecture from "./pages/admin/cource/AddLecture";
import ShowCourseById from "./pages/admin/cource/ShowCourseById";
import EditLecture from "./pages/admin/cource/EditLecture";
import CourseDetailPage from "./pages/students/CourseDetailPage";
import TransactionPage from "./pages/students/TransactionPage";
import ContinuCourse from "./components/ContinuCourse";
import SearchPage from "./pages/students/SearchPage";
import {
  AdminRoute,
  AuthenticatedRoute,
  NonAuthenticatedRoute,
} from "./components/ProtectedRoute/ProtectedRoute";

import { ThemeProvider } from "./components/Themeprovider";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            <Cources />
          </>
        ),
      },
      {
        path: "/register",
        element: (
          <AuthenticatedRoute>
            <LoginPage />
          </AuthenticatedRoute>
        ),
      },
      {
        path: "/mylearning",
        element: (
          <NonAuthenticatedRoute>
            <MyLearning />
          </NonAuthenticatedRoute>
        ),
      },
      {
        path: "/profile", // Relative path
        element: (
          <NonAuthenticatedRoute>
            <Profile />
          </NonAuthenticatedRoute>
        ),
      },
      {
        path: "/coursedetailpage/:courseId",
        element: <CourseDetailPage />,
      },
      {
        path: "/transactionpage/:paymentId/course/:courseId",
        element: <TransactionPage />,
      },
      {
        path: "/continuecourse/:courseId",
        element: (
          <NonAuthenticatedRoute>
            <ContinuCourse />
          </NonAuthenticatedRoute>
        ),
      },
      {
        path: "/course/search/:searchQuery?",
        element: (
          <NonAuthenticatedRoute>
            <SearchPage />
          </NonAuthenticatedRoute>
        ),
      },
      // Admin routes
      {
        path: "/admin",
        element: (
          <AdminRoute>
            <Sidebar />
          </AdminRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "cources/addcources",
            element: <AddCource />,
          },
          {
            path: "cources",
            element: <CourcesList />,
          },
          {
            path: "cources/editcource/:courseId",
            element: <EditCource />,
          },
          {
            path: "cources/editcource/addlecture/:courseId",
            element: <AddLecture />,
          },
          {
            path: "cources/showcourcebyid/:courseId",
            element: <ShowCourseById />,
          },
          {
            path: "cources/editcource/addlecture/:courseId/editlecture/:lectureId",
            element: <EditLecture />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <ThemeProvider>
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </>
  );
}

export default App;
