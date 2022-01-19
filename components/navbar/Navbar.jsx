import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Input } from "../";
import styles from "./Navbar.module.scss";
import Logo, { MobileLogo } from "../authlayout/logo";
import Link from "next/link";
import ResourcesDrop from "./ResourcesDrop";
import Image from "next/image";
import { ArrowDown } from "../../utils/assets";

export const Navbar = () => {
  const router = useRouter();
  const [navBg, setNavBg] = useState(false);
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const pathName = typeof window !== "undefined" && window;
  // const navDropIsInView = useSelector((state) => state.)

  // state for navDrop
  const [navDrop, setNavDrop] = useState({
    isVisible: false,
    leftOffset: 0,
  });

  const clickHandler = (e) => {
    // get coordinate info of the target element
    let temp = e.target.getBoundingClientRect();
    //   get its left offset
    const { left } = temp;

    setNavDrop({
      ...navDrop,
      isVisible: !navDrop.isVisible,
      leftOffset: parseInt(left ?? 0),
    });
  };

  const handleMouseLeave = () => {
    setNavDrop({
      ...navDrop,
      isVisible: false,
      leftOffset: 0,
    });
  };

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

  const handleNavbar = () => setOpenMobileNav((value) => !value);

  return (
    <>
      <nav className={`${styles.navContainer} ${navBg && styles.navBg}`}>
        <div
          className={`${styles.mobileMenuCont} ${openMobileNav && styles.open}`}
          onClick={() => handleNavbar()}
        >
          <div className={styles.hamburger}></div>
        </div>
        <Link href="/">
          <a className={styles.imgCont}>
            <Logo />
          </a>
        </Link>
        <div className={styles.MobileLogo} onClick={() => router.push("/")}>
          <MobileLogo />
        </div>

        <div className={styles.navLinks}>
          <ul className={styles.categoryLinks}>
            <li onClick={(e) => clickHandler(e)} className={styles.drop}>
              <span className={styles.navLinkDrop}>Resources</span>
              <Image src={ArrowDown} width="10" height="10" />
            </li>
            <li>
              <NavLink href="features" title="Features" />
            </li>
            <li>
              <NavLink href="pricing" title="Pricing" />
            </li>
            <li>
              <NavLink href="blog" title="Blog" />
            </li>
            <li>
              <NavLink href="faq" title="FAQS" />
            </li>
          </ul>
        </div>

        <div className={`${openMobileNav ? styles.mobileNavLinks : `hidden`}`}>
          <div className={styles.inner}>
            <ul className={styles.mobileCategoryLinks}>
              <li
                onClick={() => {
                  handleNavbar();
                  router.push("/how-it-works");
                }}
              >
                How it works
              </li>
              <li
                onClick={() => {
                  handleNavbar();
                  router.push("/features");
                }}
              > 
                Features
              </li>
              <li
                onClick={() => {
                  handleNavbar();

                  router.push("/pricing");
                }}
              >
                Pricing
              </li>
              <li
                onClick={() => {
                  handleNavbar();
                  router.push("/blog");
                }}
              >
                Blog
              </li>
              <li
                onClick={() => {
                  handleNavbar();

                  router.push("/faq");
                }}
              >
                FAQs
              </li>
            </ul>
            <div className={styles.mobileInput}>
              <Input type="" placeholder="Enter your email..." />
            </div>
            <div className={styles.mobileButton}>
              <Button
                text="Get Started Free"
                bgColor="blue"
                className={styles.freeBtn}
              />
            </div>
            <div className={styles.benefits}>
              <span className={styles.benefitSpan}>Signup for free</span>
              <span className={styles.benefitSpan}>• Easy setup</span>
              <span className={styles.benefitSpan}>• Fast payout</span>
            </div>
          </div>
        </div>

        <div className={styles.btnLinks}>
          <div
            className={styles.loginBtn}
            onClick={() => router.push("/login")}
          >
            <Button text="Login" className={styles.loginBtnStyle} />
          </div>
          <div
            className={styles.signUpBtn}
            onClick={() => router.push("/signup")}
          >
            <Button
              text="Signup"
              bgColor="blue"
              className={styles.signUpBtnStyle}
            />
          </div>
        </div>

        <div className={styles.mobileBtnLinks}>
          <div
            className={styles.loginBtn}
            onClick={() => router.push("/login")}
          >
            <Button text="Login" className={styles.loginBtnStyle} />
          </div>
          <div
            className={styles.signUpBtn}
            onClick={() => router.push("/signup")}
          >
            <Button
              text="Signup Free"
              bgColor="blue"
              className={styles.signUpBtnStyle}
            />
          </div>
        </div>
        {navDrop.isVisible && (
          <ResourcesDrop
            leftOffset={navDrop.leftOffset}
            handleMouseLeave={handleMouseLeave}
          />
        )}
      </nav>
    </>
  );
};

const NavLink = ({ href, title }) => {
  const currentPath = href.toLowerCase();
  const { pathname } = useRouter();
  const isActive = pathname == `/${currentPath}`;

  return (
    <Link href={`/${currentPath}`}>
      <a className={isActive ? styles.activePath : ""}>{title}</a>
    </Link>
  );
};
