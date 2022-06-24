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
      <Link href="/about-us" passHref>
        <div
          className={`${styles.resourceItem} ${styles.hideDrop}`}
          onClick={handleMouseLeave}
        >
          About Us
        </div>
      </Link>
      <Link href="/how-it-works" passHref>
        <div className={styles.resourceItem} onClick={handleMouseLeave}>
          How it works
        </div>
      </Link>
      {/* break */}
      <Link href="/payouts" passHref>
        <div className={styles.resourceItem} onClick={handleMouseLeave}>
          Payments
        </div>
      </Link>
      <Link href="/faq" passHref>
        <div className={styles.resourceItem} onClick={handleMouseLeave}>
          FAQ
        </div>
      </Link>
    </section>
  );
};

export default ResourceDrop;
