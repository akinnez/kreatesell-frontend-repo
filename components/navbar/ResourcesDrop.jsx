import Link from "next/link";
import styles from "./Navbar.module.scss";
const ResourceDrop = ({ leftOffset, handleMouseLeave }) => {
  return (
    <section
      onMouseLeave={handleMouseLeave}
      className={styles.navResourceContainer}
      style={{
        left: leftOffset,
      }}
    >
      <Link href="/">
        <div className={styles.resourceItem}>How it works</div>
      </Link>
      <Link href="/">
        <div className={styles.resourceItem}>Payments</div>
      </Link>
    </section>
  );
};

export default ResourceDrop;
