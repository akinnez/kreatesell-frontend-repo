import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./index.module.scss";
// links
const links = [
  { label: "Both", value: "both", url: "/account/dashboard" },
  { label: "Kreator", value: "kreator", url: "/account/dashboard/kreator" },
  {
    label: "Affiliate",
    value: "affiliate",
    url: "/account/dashboard/affiliate",
  },
];

const DashboardLinks = () => {
  const router = useRouter();

  return (
    <div className={styles.links}>
      {links.map((link) => (
        <Link key={link.label} href={link.url}>
          <a
            className={`${styles.link} ${
              router.pathname.endsWith(link.value) && styles.active
            }`}
          >
            {link.label}
          </a>
        </Link>
      ))}
    </div>
  );
};

export default DashboardLinks;
