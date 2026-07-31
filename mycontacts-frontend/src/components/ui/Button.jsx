import styles from "./Button.module.css";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  fullWidth = false,
  loading = false,
  disabled = false,
  icon,
  iconPosition = "left",
  onClick,
  className = "",
  ...props
}) => {
  const classes = [
    styles.btn,
    styles[variant],
    size !== "md" && styles[size],
    fullWidth && styles.fullWidth,
    loading && styles.loading,
    !children && icon && styles.iconOnly,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <span className={styles.spinner} />}
      <span className={styles.btnContent}>
        {icon && iconPosition === "left" && (
          <span className={styles.icon}>{icon}</span>
        )}
        {children}
        {icon && iconPosition === "right" && (
          <span className={styles.icon}>{icon}</span>
        )}
      </span>
    </button>
  );
};

export default Button;
