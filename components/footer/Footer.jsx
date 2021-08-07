import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FooterBrand, Location, Message, Mobile } from "../../utils";
import styles from "./Footer.module.scss";

export const Footer = () => {
	const router = useRouter();
	return (
		<footer className={styles.footer}>
			<div className={styles.brand}>
				<div className={styles.brandTitle} onClick={() => router.push("/")}>
					<Image src={FooterBrand} alt="kreatesell" />
				</div>

				<div className={styles.brandContact}>
					<div className={styles.brandContactIcon}>
						<Image src={Message} alt="kreatesell" />
					</div>
					<a
						rel="noopener noreferrer"
						className="text"
						target="blank"
						href="mailto:hello@kreatesell.com"
					>
						hello@kreatesell.com
					</a>
				</div>

				<div className={styles.brandContact}>
					<div className={styles.brandContactIcon}>
						<Image src={Mobile} alt="mobile" />
					</div>
					<a
						className="text"
						rel="noopener noreferrer"
						target="blank"
						href="tel:+2347019875432"
					>
						+2347019875432
					</a>
				</div>

				<div className={styles.brandContact}>
					<div className={styles.brandContactIcon}>
						<Image src={Location} alt="location" />
					</div>
					<a
						className="text"
						rel="noopener noreferrer"
						target="blank"
						href="https://www.google.com/maps/place/Cocoa+House+Ibadan/@7.3875478,3.8767496,17z/data=!3m1!4b1!4m5!3m4!1s0x10398d0e3452ea31:0x8da53949f2293130!8m2!3d7.3875425!4d3.8789383"
					>
						Cocoa house Dugbe, Ibadan
					</a>
				</div>
			</div>

			<div>
				<div className={styles.categoryTitle}>Product</div>
				<div className={styles.categoryLink}>
					<Link href="#">
						<a>Overview</a>
					</Link>
					<Link href="/features">
						<a>Features</a>
					</Link>
					<Link href="/how-it-works">
						<a>Tutorials</a>
					</Link>
					<Link href="/pricing">
						<a>Pricing</a>
					</Link>
					<Link href="#">
						<a>Releases</a>
					</Link>
				</div>
			</div>

			<div>
				<div className={styles.categoryTitle}>Company</div>
				<div className={styles.categoryLink}>
					<Link href="#">
						<a>About</a>
					</Link>
					<Link href="#">
						<a>Press</a>
					</Link>
					<Link href="#">
						<a>Careers</a>
					</Link>
					<Link href="#">
						<a>Contact</a>
					</Link>
					<Link href="#">
						<a>Partners</a>
					</Link>
				</div>
			</div>

			<div>
				<div className={styles.categoryTitle}>Support</div>
				<div className={styles.categoryLink}>
					<Link href="#">
						<a>Help center</a>
					</Link>
					<Link href="#">
						<a>Safety Center</a>
					</Link>
					<Link href="#">
						<a>Legal</a>
					</Link>
					<Link href="#">
						<a>Privacy Policy</a>
					</Link>
					<Link href="#">
						<a>Status</a>
					</Link>
				</div>
			</div>

			<div>
				<div className={styles.categoryTitle}>Legal</div>
				<div className={styles.categoryLink}>
					<Link href="#">
						<a>Cookies Policy</a>
					</Link>
					<Link href="#">
						<a>Privacy Policy</a>
					</Link>
					<Link href="#">
						<a>Terms of Service</a>
					</Link>
					<Link href="#">
						<a>Law Enforcement</a>
					</Link>
					<Link href="#">
						<a>Status</a>
					</Link>
				</div>
			</div>

			<div>
				<div className={styles.categoryTitle}>Follow us</div>
				<div className={styles.categoryLink}>
					<Link href="#">
						<a>Facebook</a>
					</Link>
					<Link href="#">
						<a>Twitter</a>
					</Link>
					<Link href="#">
						<a>Instagram</a>
					</Link>
					<Link href="#">
						<a>Linkedin</a>
					</Link>
				</div>
			</div>
		</footer>
	);
};
