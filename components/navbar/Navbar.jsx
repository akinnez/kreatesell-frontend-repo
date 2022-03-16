import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import { Button, Input } from "../";
import styles from "./Navbar.module.scss";
import Logo, { MobileLogo } from "../authlayout/logo";
import Link from "next/link";
// import ResourcesDrop from "./ResourcesDrop";
// import Image from "next/image";
// import { ArrowDown } from "../../utils/assets";

export const Navbar = () => {
  const router = useRouter();
  const [navBg, setNavBg] = useState(false);
  // const [openMobileNav, setOpenMobileNav] = useState(false);
  const pathName = typeof window !== "undefined" && window;

  /** This useEffect is used to set the navbar "light border-bottom color" when the page is scrolled */
  useEffect(() => {
    const handleNavbarChange = () => {
      if (pathName.scrollY >= 80) {
        setNavBg(true);
      } else {
        setNavBg(false);
      }
    };

    pathName?.addEventListener("scroll", handleNavbarChange);

    return () => {
      pathName.removeEventListener("scroll", handleNavbarChange);
    };
  }, [pathName]);

  return (
    <>
      <nav className={`${styles.navContainer} ${navBg && styles.navBg}`}>
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
