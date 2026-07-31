import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { LuUser, LuMail, LuLock, LuCircleAlert, LuCheck } from "react-icons/lu";
import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAuth } from "../../contexts/AuthContext";
import { validateRegisterForm } from "../../utils/validators";
import { ROUTES } from "../../constants";
import styles from "./Auth.module.css";

const Register = () => {
  const { register, isAuthenticated, authError, clearError } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
    const validationErrors = validateRegisterForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    const result = await register({
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });
    setLoading(false);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => navigate(ROUTES.LOGIN), 2000);
    }
  };

  if (success) {
    return (
      <AuthLayout
        title="Account Created!"
        subtitle="Redirecting you to login..."
      >
        <div className={styles.successMessage}>
          <div className={styles.successIcon}>
            <LuCheck />
          </div>
          <p className={styles.successText}>Registration successful!</p>
          <p className={styles.successSubtext}>
            You can now sign in with your credentials.
          </p>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Create an account"
      subtitle="Get started with MyContacts"
      footer={
        <p>
          Already have an account?{" "}
          <Link to={ROUTES.LOGIN}>Sign in</Link>
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
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Choose a username"
          icon={<LuUser />}
          error={errors.username}
          required
        />

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
          placeholder="Create a password"
          icon={<LuLock />}
          error={errors.password}
          helperText="Must be at least 6 characters"
          required
        />

        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          icon={<LuLock />}
          error={errors.confirmPassword}
          required
        />

        <Button
          type="submit"
          fullWidth
          loading={loading}
          size="lg"
        >
          Create Account
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Register;
