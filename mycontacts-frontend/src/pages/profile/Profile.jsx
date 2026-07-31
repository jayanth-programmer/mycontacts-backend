import { LuUser, LuMail, LuCalendar, LuShield } from "react-icons/lu";
import { useAuth } from "../../contexts/AuthContext";
import Avatar from "../../components/ui/Avatar";
import Badge from "../../components/ui/Badge";
import { formatDate } from "../../utils/formatDate";
import styles from "../Pages.module.css";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Profile</h1>

      <div className={styles.profileCard}>
        <div className={styles.profileHeader}>
          <Avatar name={user?.username} size="xl" />
          <div className={styles.profileInfo}>
            <h2>{user?.username}</h2>
            <p>{user?.email}</p>
          </div>
        </div>

        <div className={styles.profileBody}>
          <div className={styles.profileRow}>
            <div className={styles.profileIcon}>
              <LuUser />
            </div>
            <div>
              <div className={styles.profileLabel}>Username</div>
              <div className={styles.profileValue}>{user?.username}</div>
            </div>
          </div>

          <div className={styles.profileRow}>
            <div className={styles.profileIcon}>
              <LuMail />
            </div>
            <div>
              <div className={styles.profileLabel}>Email</div>
              <div className={styles.profileValue}>{user?.email}</div>
            </div>
          </div>

          <div className={styles.profileRow}>
            <div className={styles.profileIcon}>
              <LuShield />
            </div>
            <div>
              <div className={styles.profileLabel}>Account Status</div>
              <div className={styles.profileValue}>
                <Badge variant="success">Active</Badge>
              </div>
            </div>
          </div>

          <div className={styles.profileRow}>
            <div className={styles.profileIcon}>
              <LuCalendar />
            </div>
            <div>
              <div className={styles.profileLabel}>Member Since</div>
              <div className={styles.profileValue}>
                {user?.createdAt ? formatDate(user.createdAt) : "N/A"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
