import { Link } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import Button from "../components/ui/Button";
import { ROUTES } from "../constants";
import styles from "./Pages.module.css";

const NotFound = () => {
  return (
    <div className={styles.notFoundPage}>
      <div className={styles.notFound404}>404</div>
      <h1 className={styles.notFoundTitle}>Page not found</h1>
      <p className={styles.notFoundText}>
        The page you're looking for doesn't exist or has been moved. Let's get
        you back on track.
      </p>
      <Link to={ROUTES.DASHBOARD}>
        <Button icon={<LuLayoutDashboard />} size="lg">
          Go to Dashboard
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
