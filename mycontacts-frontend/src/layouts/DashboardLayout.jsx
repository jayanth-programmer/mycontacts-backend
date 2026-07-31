import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import TopNav from "../components/layout/TopNav";
import styles from "./DashboardLayout.module.css";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className={styles.layout}>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <TopNav
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />
      <main className={styles.main}>
        <div className={styles.content}>
          <Outlet context={{ searchValue, setSearchValue }} />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
