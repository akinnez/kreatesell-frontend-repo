import Image from "next/image";
import { KreateSellBrand } from "assets";
import { Button } from "components";
import styles from "./Navbar.module.scss";

export const Navbar = () => {
	return (
		<nav className={styles.navContainer}>
			<div className={styles.imgCont}>
				<Image src={KreateSellBrand} alt="kreatesell brand logo" />
			</div>

			<div className={styles.navLinks}>
				<ul className="category-links">
					<li>How it works</li>
					<li>Features</li>
					<li>Pricing</li>
					<li>Blog</li>
					<li>FAQs</li>
				</ul>

				<div className={styles.btnLinks}>
					<div className={styles.loginBtn}>
						<Button text="Login" />
					</div>
					<div>
						<Button text="Signup" bgColor="blue" />
					</div>
				</div>
			</div>
		</nav>
	);
};
