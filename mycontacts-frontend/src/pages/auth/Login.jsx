import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { LuMail, LuLock, LuCircleAlert } from "react-icons/lu";
import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAuth } from "../../contexts/AuthContext";
import { validateLoginForm } from "../../utils/validators";
import { ROUTES } from "../../constants";
import styles from "./Auth.module.css";

const Login = () => {
  const { login, isAuthenticated, authError, clearError } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (authError) clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateLoginForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    await login(formData);
    setLoading(false);
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account to continue"
      footer={
        <p>
          Don't have an account?{" "}
          <Link to={ROUTES.REGISTER}>Create one</Link>
        </p>
      }
    >
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {authError && (
          <div className={styles.errorAlert}>
            <LuCircleAlert />
            {authError}
          </div>
        )}

        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          icon={<LuMail />}
          error={errors.email}
          required
        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          icon={<LuLock />}
          error={errors.password}
          required
        />

        <div className={styles.forgotLink}>
          <Link to={ROUTES.FORGOT_PASSWORD}>Forgot password?</Link>
        </div>

        <Button
          type="submit"
          fullWidth
          loading={loading}
          size="lg"
        >
          Sign In
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Login;
