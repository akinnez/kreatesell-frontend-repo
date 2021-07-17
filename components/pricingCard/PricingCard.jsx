import { ActivePrice } from "../../utils";
import Image from "next/image";
import styles from "./PricingCard.module.scss";
import { Button } from "../index";

export const PricingCard = ({ title, subTitle, price, btnText }) => {
	const Features =
		title === "free"
			? FreeFeatures
			: title === "premium"
			? PremiumFeatures
			: StandardFeatures;

	return (
		<div
			className={`${styles.priceCard} ${
				title === "standard" && styles.standardPriceCard
			}`}
		>
			<div className={styles.header}>
				<h3 className={styles.title}>{title}</h3>
				<h5 className={styles.subTitle}>{subTitle}</h5>
				<hr />
			</div>

			<div className={styles.price}>
				<sup className={styles.currency}>NGN</sup> {price}{" "}
				<sub className={styles.month}>/ Month</sub>
			</div>

			<div className={styles.featuresCont}>
				{Features?.map((features, i) => (
					<div className={styles.features} key={i}>
						<div className={styles.featuresIcons}>
							<Image src={ActivePrice} height="15" width="15" />
						</div>
						<h6 className={styles.featuresContent}>{features}</h6>
					</div>
				))}
			</div>

			<div className={styles.button}>
				<Button
					className={`${styles.btn} ${title === "standard" && styles.greenBg}`}
					text={btnText}
					bgColor="blue"
				/>
			</div>
		</div>
	);
};

const FreeFeatures = [
	"Ebooks",
	"Tickets",
	"Limited Email Marketing",
	"1GB Storage",
	"Coaching",
	"1GB Storage",
];

const StandardFeatures = [
	"Everything on FREE plus",
	"Membership Site",
	"Video Courses",
	"1GB Storage",
	"Up to 20GB Storage",
	"Full Email Marketing",
	"Pre-order",
	"1GB Storage",
	"Social Proof (10x Conversion Rate)",
];

const PremiumFeatures = [
	"Everything on FREE plus",
	"Membership Site",
	"Video Courses",
	"1GB Storage",
	"Up to 20GB Storage",
	"Full Email Marketing",
	"1GB Storage",
	"1GB Storage",
	"1GB Storage",
];
