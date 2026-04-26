
import { createBrowserRouter } from "react-router-dom";
import { RedirectPage } from "./pages/RedirectPage";
import LandingPage from "./pages/LandingPage";
import GenerateLinkPage from "./pages/GenerateLink";
import DashboardPage from "./pages/Dashboard";
import { LoginPage  } from "./pages/LoginPage"
import { ResetPassword } from "./pages/ResetPassword"
import { SignupPage } from "./pages/SignupPage"
import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/generate",
    element: <GenerateLinkPage />,
  },
  {
    path: "/dashboard",
    element: 
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>,
  },
  {
    path: "/r/:shortCode",
    element: <RedirectPage />,
  }
]);