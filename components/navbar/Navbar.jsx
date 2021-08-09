import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { KreateSellBrand } from "../../utils/assets";
import { Button, Input } from "../";
import styles from "./Navbar.module.scss";

export const Navbar = () => {
	const router = useRouter();
	const [navBg, setNavBg] = useState(false);
	const [openMobileNav, setOpenMobileNav] = useState(false);
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
		<nav className={`${styles.navContainer} ${navBg && styles.navBg}`}>
			<div
				className={`${styles.mobileMenuCont} ${openMobileNav && styles.open}`}
				onClick={() => setOpenMobileNav((value) => !value)}
			>
				<div className={styles.hamburger}></div>
			</div>
			<div className={styles.imgCont} onClick={() => router.push("/")}>
				<Image
					src={KreateSellBrand}
					width="120"
					height="42"
					alt="kreatesell brand logo"
				/>
			</div>

			<div className={styles.navLinks}>
				<ul className={styles.categoryLinks}>
					<li onClick={() => router.push("/how-it-works")}>How it works</li>
					<li onClick={() => router.push("/features")}>Features</li>
					<li onClick={() => router.push("/pricing")}>Pricing</li>
					<li onClick={() => router.push("/blog")}>Blog</li>
					<li onClick={() => router.push("/faq")}>FAQs</li>
				</ul>
			</div>

			<div className={`${openMobileNav ? styles.mobileNavLinks : `hidden`}`}>
				<ul className={styles.mobileCategoryLinks}>
					<li onClick={() => router.push("/how-it-works")}>How it works</li>
					<li onClick={() => router.push("/features")}>Features</li>
					<li onClick={() => router.push("/pricing")}>Pricing</li>
					<li onClick={() => router.push("/blog")}>Blog</li>
					<li onClick={() => router.push("/faq")}>FAQs</li>
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

			<div className={styles.btnLinks}>
				<div className={styles.loginBtn} onClick={() => router.push("/login")}>
					<Button text="Login" />
				</div>
				<div onClick={() => router.push("/signup")}>
					<Button text="Signup" bgColor="blue" />
				</div>
			</div>
		</nav>
	);
};
