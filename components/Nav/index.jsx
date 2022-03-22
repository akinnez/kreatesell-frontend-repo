import styles from "./Navbar.module.scss";
import Logo, { MobileLogo } from "components/Logo";
import Link from "next/link";
import { useRouter } from "next/router";

export const Navbar = () => {
  const router = useRouter();
  return (
    <>
      <nav className={`${styles.navContainer}`}>
        <Link href="/">
          <a className={styles.imgCont}>
            <Logo />
          </a>
        </Link>
        <div className={styles.MobileLogo} onClick={() => router.push("/")}>
          <MobileLogo />
        </div>
      </nav>
    </>
  );
};
