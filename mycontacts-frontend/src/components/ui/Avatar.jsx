import { getInitials, getAvatarColor } from "../../utils/formatDate";
import styles from "./Avatar.module.css";

const Avatar = ({ name, size = "md", className = "" }) => {
  const initials = getInitials(name);
  const bgColor = getAvatarColor(name);

  return (
    <div
      className={`${styles.avatar} ${styles[size]} ${className}`}
      style={{ backgroundColor: bgColor }}
      title={name}
    >
      <span className={styles.initials}>{initials}</span>
    </div>
  );
};

export default Avatar;
