import { useState } from "react";
import { Link } from "react-router-dom";
import { LuMail, LuArrowLeft } from "react-icons/lu";
import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { validateEmail } from "../../utils/validators";
import { ROUTES } from "../../constants";
import styles from "./Auth.module.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    // UI only — no backend integration
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <AuthLayout
        title="Check your email"
        subtitle={`We've sent a reset link to ${email}`}
        footer={
          <p>
            <Link to={ROUTES.LOGIN}>
              <LuArrowLeft style={{ verticalAlign: "middle", marginRight: 4 }} />
              Back to login
            </Link>
          </p>
        }
      >
        <div className={styles.successMessage}>
          <div className={styles.successIcon}>
            <LuMail />
          </div>
          <p className={styles.successText}>Reset link sent!</p>
          <p className={styles.successSubtext}>
            If an account with that email exists, you'll receive a password
            reset link shortly.
          </p>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot password?"
      subtitle="Enter your email and we'll send you a reset link"
      footer={
        <p>
          <Link to={ROUTES.LOGIN}>
            <LuArrowLeft style={{ verticalAlign: "middle", marginRight: 4 }} />
            Back to login
          </Link>
        </p>
      }
    >
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <Input
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          placeholder="Enter your email"
          icon={<LuMail />}
          error={error}
          required
        />

        <Button type="submit" fullWidth size="lg">
          Send Reset Link
        </Button>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
