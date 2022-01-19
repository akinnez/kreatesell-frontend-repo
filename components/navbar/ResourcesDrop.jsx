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
      <Link href="/how-it-works">
        <div className={styles.resourceItem} onClick={handleMouseLeave}>
          How it works
        </div>
      </Link>
      {/* break */}
      <Link href="/">
        <div className={styles.resourceItem} onClick={handleMouseLeave}>
          Payments
        </div>
      </Link>
    </section>
  );
};

export default ResourceDrop;
