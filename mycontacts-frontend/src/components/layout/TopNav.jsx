import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LuMenu,
  LuSearch,
  LuBell,
  LuChevronRight,
  LuUser,
  LuSettings,
  LuLogOut,
} from "react-icons/lu";
import { useAuth } from "../../contexts/AuthContext";
import Avatar from "../ui/Avatar";
import { ROUTES } from "../../constants";
import styles from "./TopNav.module.css";

const routeLabels = {
  "/dashboard": "Dashboard",
  "/contacts": "Contacts",
  "/contacts/new": "New Contact",
  "/profile": "Profile",
  "/settings": "Settings",
};

const TopNav = ({ onMenuClick, searchValue, onSearchChange }) => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Build breadcrumbs
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const getBreadcrumbs = () => {
    const crumbs = [{ label: "Home", to: ROUTES.DASHBOARD }];
    let currentPath = "";
    for (const segment of pathSegments) {
      currentPath += `/${segment}`;
      const label = routeLabels[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1);
      crumbs.push({ label, to: currentPath });
    }
    return crumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className={styles.topnav}>
      <div className={styles.left}>
        <button
          className={styles.menuBtn}
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <LuMenu />
        </button>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.to} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {i > 0 && (
                <LuChevronRight className={styles.breadcrumbSeparator} />
              )}
              {i === breadcrumbs.length - 1 ? (
                <span className={styles.breadcrumbCurrent}>{crumb.label}</span>
              ) : (
                <Link to={crumb.to}>{crumb.label}</Link>
              )}
            </span>
          ))}
        </nav>
      </div>

      <div className={styles.right}>
        <div className={styles.searchWrapper}>
          <LuSearch className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search contacts..."
            value={searchValue || ""}
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
        </div>

        <button className={styles.iconBtn} aria-label="Notifications">
          <LuBell />
        </button>

        <div ref={dropdownRef} style={{ position: "relative" }}>
          <button
            className={styles.profileBtn}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <Avatar name={user?.username} size="sm" />
            <span className={styles.profileName}>{user?.username}</span>
          </button>

          {dropdownOpen && (
            <div className={styles.dropdown}>
              <Link
                to={ROUTES.PROFILE}
                className={styles.dropdownItem}
                onClick={() => setDropdownOpen(false)}
              >
                <LuUser /> Profile
              </Link>
              <Link
                to={ROUTES.SETTINGS}
                className={styles.dropdownItem}
                onClick={() => setDropdownOpen(false)}
              >
                <LuSettings /> Settings
              </Link>
              <div className={styles.dropdownDivider} />
              <button
                className={`${styles.dropdownItem} ${styles.danger}`}
                onClick={() => {
                  setDropdownOpen(false);
                  logout();
                }}
              >
                <LuLogOut /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNav;
