import { useState } from "react";
import styles from "../Pages.module.css";

const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    darkMode: true,
    compactView: false,
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Settings</h1>

      <div className={styles.settingsSection}>
        <h3 className={styles.settingsSectionTitle}>Appearance</h3>

        <div className={styles.settingRow}>
          <div className={styles.settingInfo}>
            <div className={styles.settingLabel}>Dark Mode</div>
            <div className={styles.settingDesc}>
              Use dark theme for the application
            </div>
          </div>
          <button
            className={`${styles.toggle} ${settings.darkMode ? styles.active : ""}`}
            onClick={() => toggleSetting("darkMode")}
            aria-label="Toggle dark mode"
          />
        </div>

        <div className={styles.settingRow}>
          <div className={styles.settingInfo}>
            <div className={styles.settingLabel}>Compact View</div>
            <div className={styles.settingDesc}>
              Reduce spacing in contact lists
            </div>
          </div>
          <button
            className={`${styles.toggle} ${settings.compactView ? styles.active : ""}`}
            onClick={() => toggleSetting("compactView")}
            aria-label="Toggle compact view"
          />
        </div>
      </div>

      <div className={styles.settingsSection}>
        <h3 className={styles.settingsSectionTitle}>Notifications</h3>

        <div className={styles.settingRow}>
          <div className={styles.settingInfo}>
            <div className={styles.settingLabel}>Email Notifications</div>
            <div className={styles.settingDesc}>
              Receive email updates about your contacts
            </div>
          </div>
          <button
            className={`${styles.toggle} ${settings.emailNotifications ? styles.active : ""}`}
            onClick={() => toggleSetting("emailNotifications")}
            aria-label="Toggle email notifications"
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
