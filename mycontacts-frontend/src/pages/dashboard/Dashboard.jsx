import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LuUsers,
  LuUserPlus,
  LuClock,
  LuArrowRight,
  LuContact,
  LuPlus,
} from "react-icons/lu";
import { useAuth } from "../../contexts/AuthContext";
import { useContacts } from "../../contexts/ContactContext";
import Avatar from "../../components/ui/Avatar";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";
import { getRelativeTime } from "../../utils/formatDate";
import { ROUTES } from "../../constants";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const { user } = useAuth();
  const { contacts, loading, fetchContacts } = useContacts();

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const recentContacts = [...contacts]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const thisWeekContacts = contacts.filter((c) => {
    const created = new Date(c.createdAt);
    const now = new Date();
    const diff = (now - created) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  });

  const stats = [
    {
      label: "Total Contacts",
      value: contacts.length,
      icon: <LuUsers />,
      color: "var(--accent-primary)",
      bg: "var(--accent-light)",
    },
    {
      label: "Added This Week",
      value: thisWeekContacts.length,
      icon: <LuUserPlus />,
      color: "var(--color-success)",
      bg: "var(--color-success-light)",
    },
    {
      label: "Last Activity",
      value: contacts.length > 0 ? getRelativeTime(recentContacts[0]?.createdAt) : "N/A",
      icon: <LuClock />,
      color: "var(--color-info)",
      bg: "var(--color-info-light)",
      isText: true,
    },
  ];

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "4rem" }}>
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Greeting */}
      <div className={styles.header}>
        <h1 className={styles.greeting}>
          {getGreeting()},{" "}
          <span className={styles.greetingAccent}>{user?.username}!</span>
        </h1>
        <p className={styles.subtitle}>
          Here's what's happening with your contacts today.
        </p>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.statCard}>
            <div
              className={styles.statIcon}
              style={{ background: stat.bg, color: stat.color }}
            >
              {stat.icon}
            </div>
            <div className={styles.statInfo}>
              <div className={styles.statLabel}>{stat.label}</div>
              <div
                className={styles.statValue}
                style={stat.isText ? { fontSize: "var(--font-size-base)" } : {}}
              >
                {stat.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Contacts */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recent Contacts</h2>
          {contacts.length > 0 && (
            <Link to={ROUTES.CONTACTS}>
              <Button variant="ghost" size="sm" icon={<LuArrowRight />} iconPosition="right">
                View All
              </Button>
            </Link>
          )}
        </div>

        {contacts.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <LuContact />
            </div>
            <h3 className={styles.emptyTitle}>No contacts yet</h3>
            <p className={styles.emptyText}>
              Start building your contact list by adding your first contact.
            </p>
            <Link to={ROUTES.CONTACT_NEW}>
              <Button icon={<LuPlus />}>Add Your First Contact</Button>
            </Link>
          </div>
        ) : (
          <div className={styles.recentList}>
            {recentContacts.map((contact) => (
              <Link
                key={contact._id}
                to={`/contacts/${contact._id}`}
                className={styles.recentItem}
              >
                <Avatar name={contact.name} size="md" />
                <div className={styles.recentInfo}>
                  <div className={styles.recentName}>{contact.name}</div>
                  <div className={styles.recentEmail}>{contact.email}</div>
                </div>
                <span className={styles.recentTime}>
                  {getRelativeTime(contact.createdAt)}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
