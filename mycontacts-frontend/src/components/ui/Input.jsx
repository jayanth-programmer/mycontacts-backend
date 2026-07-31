import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import styles from "./Input.module.css";

const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  helperText,
  required = false,
  disabled = false,
  icon,
  className = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`${styles.inputGroup} ${className}`}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={styles.inputWrapper}>
        {icon && <span className={styles.iconLeft}>{icon}</span>}
        <input
          id={name}
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={`${styles.input} ${icon ? styles.hasIcon : ""} ${
            error ? styles.hasError : ""
          }`}
          autoComplete={isPassword ? "current-password" : "off"}
          {...props}
        />
        {isPassword && (
          <span
            className={styles.iconRight}
            onClick={() => setShowPassword(!showPassword)}
            role="button"
            tabIndex={0}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <LuEyeOff /> : <LuEye />}
          </span>
        )}
      </div>
      {error && <span className={styles.error}>{error}</span>}
      {helperText && !error && (
        <span className={styles.helperText}>{helperText}</span>
      )}
    </div>
  );
};

export default Input;
