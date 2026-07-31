import styles from "./Skeleton.module.css";

const Skeleton = ({ width, height, borderRadius, className = "" }) => {
  return (
    <div
      className={`${styles.skeleton} ${className}`}
      style={{
        width: width || "100%",
        height: height || "16px",
        borderRadius: borderRadius || "var(--radius-md)",
      }}
    />
  );
};

export const SkeletonCard = () => (
  <div className={styles.card}>
    <div className={styles.cardHeader}>
      <Skeleton width="44px" height="44px" borderRadius="50%" />
      <div className={styles.cardHeaderText}>
        <Skeleton width="60%" height="14px" />
        <Skeleton width="40%" height="12px" />
      </div>
    </div>
    <div className={styles.cardBody}>
      <Skeleton width="80%" height="12px" />
      <Skeleton width="60%" height="12px" />
    </div>
  </div>
);

export const SkeletonRow = () => (
  <div className={styles.row}>
    <Skeleton width="36px" height="36px" borderRadius="50%" />
    <Skeleton width="25%" height="14px" />
    <Skeleton width="30%" height="14px" />
    <Skeleton width="20%" height="14px" />
    <Skeleton width="60px" height="14px" />
  </div>
);

export default Skeleton;
