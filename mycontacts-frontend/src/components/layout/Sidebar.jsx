import { NavLink } from "react-router-dom";
import {
  LuLayoutDashboard,
  LuContact,
  LuUser,
  LuSettings,
  LuBookUser,
  LuLogOut,
} from "react-icons/lu";
import { useAuth } from "../../contexts/AuthContext";
import Avatar from "../ui/Avatar";
import { ROUTES } from "../../constants";
import styles from "./Sidebar.module.css";

const navItems = [
  { to: ROUTES.DASHBOARD, label: "Dashboard", icon: <LuLayoutDashboard /> },
  { to: ROUTES.CONTACTS, label: "Contacts", icon: <LuContact /> },
];

const bottomNavItems = [
  { to: ROUTES.PROFILE, label: "Profile", icon: <LuUser /> },
  { to: ROUTES.SETTINGS, label: "Settings", icon: <LuSettings /> },
];

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        {/* Logo */}
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <LuBookUser />
          </div>
          <span className={styles.logoText}>
            My<span className={styles.logoAccent}>Contacts</span>
          </span>
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          <div>
            <div className={styles.navSectionTitle}>Menu</div>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ""}`
                }
                onClick={onClose}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className={styles.navSection}>
            <div className={styles.navSectionTitle}>Account</div>
            {bottomNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ""}`
                }
                onClick={onClose}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
            <button className={styles.navLink} onClick={logout}>
              <span className={styles.navIcon}>
                <LuLogOut />
              </span>
              Logout
            </button>
          </div>
        </nav>

        {/* User Card */}
        <div className={styles.footer}>
          <div className={styles.userCard}>
            <Avatar name={user?.username} size="sm" />
            <div className={styles.userInfo}>
              <div className={styles.userName}>{user?.username || "User"}</div>
              <div className={styles.userEmail}>{user?.email || ""}</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
