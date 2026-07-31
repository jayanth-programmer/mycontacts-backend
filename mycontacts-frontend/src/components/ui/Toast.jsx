import { LuCheck, LuCircleAlert, LuTriangleAlert, LuInfo, LuX } from "react-icons/lu";
import styles from "./Toast.module.css";

const iconMap = {
  success: <LuCheck />,
  error: <LuCircleAlert />,
  warning: <LuTriangleAlert />,
  info: <LuInfo />,
};

const ToastItem = ({ toast, onRemove }) => {
  return (
    <div
      className={`${styles.toast} ${styles[toast.type]}`}
      role="alert"
    >
      <span className={styles.icon}>{iconMap[toast.type]}</span>
      <div className={styles.content}>
        <p className={styles.message}>{toast.message}</p>
      </div>
      <button
        className={styles.closeBtn}
        onClick={() => onRemove(toast.id)}
        aria-label="Dismiss"
      >
        <LuX />
      </button>
      <div
        className={styles.progressBar}
        style={{ animationDuration: `${toast.duration}ms` }}
      />
    </div>
  );
};

const ToastContainer = ({ toasts, onRemove }) => {
  if (toasts.length === 0) return null;

  return (
    <div className={styles.toastContainer}>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
};

export default ToastContainer;
