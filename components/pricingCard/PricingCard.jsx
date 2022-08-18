import { ActivePrice } from "../../utils";
import Image from "next/image";
import styles from "./PricingCard.module.scss";
import { Button } from "../index";

export const PricingCard = ({
	title,
	subTitle,
	price,
	btnText,
	priceType,
	subPriceType = "",
	btnOnClick,
	currentPlan = false,
}) => {
	const Features = title === "basic" ? BasicFeatures : BusinessFeatures;

	return (
		<div className={styles.priceCard}>
			<div className={styles.header}>
				<h3 className={styles.title}>{title}</h3>
				<h5 className={styles.subTitle}>{subTitle}</h5>
				<hr />
			</div>

			<div className={styles.price}>
				<p className={styles.currency}>NGN</p> <p className={styles.price2}>{price}{" "}</p>
				<p className={styles.month}>/ Month</p>
			</div>

			<h5 className={styles.priceType}>
				{priceType}{" "}
				{subPriceType && (
					<span className={styles.subPriceType}>- Save {subPriceType}</span>
				)}
			</h5>

			{btnText && (
				<div className={styles.button}>
					<Button
						type="button"
						className={`${styles.btn} ${currentPlan && styles.selectedBtn}`}
						text={btnText}
						bgColor={currentPlan ?"" :"blue"}
						onClick={() => btnOnClick()}
					/>
				</div>
			)}

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

			{currentPlan && (
				<h3 className="text-primary-blue font-bold text-xl pb-8">
					Current Plan
				</h3>
			)}
		</div>
	);
};

const BasicFeatures = [
	"Unlimited Products",
	"Unlimited Army of Affiliates ",
	"Robust dashboard analytics.",
	"Multi-currency store - six currencies",
	"1 Abandoned Cart Follow up Email ",
	"PDF Stamping",
	"Pixel Tracking",
	"Instant Sales Notification",
	"Affiliate Instant Commission",
	"500MB Storage",
	"Limit Product Sales",
	"Custom Checkout Button ",
	"Branded Profile",
	// "Instant Sale Notification ",
	// "Affiliate Instant Commission",
	// "Storage 500MB",
	// "Limit downloads",
	// "Custom Checkout Button (CTA)",
	// "Branded Profile",
];

const BusinessFeatures = [
	"Everything in Basic Plan + ",
	"Full Email Service Provider Integration ",
	"Webinar Integration",
	"3 Abandoned Cart Follow up Emails",
	"Instalmental Payment",
	"Membership Course Creation",
	"Zapier Integration",
	"Paypal + Stripe for Verified Kreators",
	"Webinar Replays Online Streaming",
	"Social Proof",
	"Use Your Own Domain",
	"Set Pre-orders",
	"Offer Coupons",
	"Remove Default Stamps",
	"15 Gb Storage Space",
	"Advanced Reports",
	"Sell in Cryptocurrency",
	// "15GB Storage",
	// "Advanced reports",
];
