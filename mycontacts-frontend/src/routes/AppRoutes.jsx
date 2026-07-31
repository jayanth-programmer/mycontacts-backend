import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Spinner from "../components/ui/Spinner";
import { ROUTES } from "../constants";

// Lazy load pages
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const ContactsList = lazy(() => import("../pages/contacts/ContactsList"));
const CreateContact = lazy(() => import("../pages/contacts/CreateContact"));
const EditContact = lazy(() => import("../pages/contacts/EditContact"));
const ContactDetails = lazy(() => import("../pages/contacts/ContactDetails"));
const Profile = lazy(() => import("../pages/profile/Profile"));
const Settings = lazy(() => import("../pages/settings/Settings"));
const NotFound = lazy(() => import("../pages/NotFound"));

const PageLoader = () => (
  <div
    style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--bg-primary)",
    }}
  >
    <Spinner size="lg" />
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public routes */}
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />

        {/* Protected routes */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.CONTACTS} element={<ContactsList />} />
          <Route path={ROUTES.CONTACT_NEW} element={<CreateContact />} />
          <Route path={ROUTES.CONTACT_DETAILS} element={<ContactDetails />} />
          <Route path={ROUTES.CONTACT_EDIT} element={<EditContact />} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route path={ROUTES.SETTINGS} element={<Settings />} />
        </Route>

        {/* Redirects & 404 */}
        <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.DASHBOARD} replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
