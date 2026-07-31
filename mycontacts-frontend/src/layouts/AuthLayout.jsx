import { LuBookUser } from "react-icons/lu";
import styles from "./AuthLayout.module.css";

const AuthLayout = ({ title, subtitle, children, footer }) => {
  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.logoRow}>
              <div className={styles.logoIcon}>
                <LuBookUser />
              </div>
              <span className={styles.logoText}>
                My<span className={styles.logoAccent}>Contacts</span>
              </span>
            </div>
            <h1 className={styles.title}>{title}</h1>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          {children}
        </div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  );
};

export default AuthLayout;
