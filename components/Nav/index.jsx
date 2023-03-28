import styles from "./Navbar.module.scss";
import Logo, { MobileLogo } from "components/Logo";
import Link from "next/link";
import { useRouter } from "next/router";
import SocialIcons from "../SocialIcons";
import { motion } from "framer-motion";
import { useVariants } from "../variants";
export const Navbar = () => {
  const router = useRouter();
  const { pageVariant, variantProps } = useVariants();
  return (
    <>
      <motion.nav
        className={styles.navContainer}
        {...variantProps}
        variants={pageVariant(1, 0)}
      >
        <Link href="/earlybird">
          <a className={styles.imgCont}>
            <Logo />
          </a>
        </Link>
        <div className={styles.MobileLogo} onClick={() => router.push("/earlybird")}>
          <MobileLogo />
        </div>
        {/* <SocialIcons /> */}
      </motion.nav>
    </>
  );
};
