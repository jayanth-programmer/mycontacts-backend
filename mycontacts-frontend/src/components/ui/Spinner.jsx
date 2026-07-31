import styles from "./Spinner.module.css";

const Spinner = ({ size = "md", className = "" }) => {
  return (
    <div className={`${styles.spinner} ${styles[size]} ${className}`}>
      <div className={styles.ring} />
    </div>
  );
};

export default Spinner;
