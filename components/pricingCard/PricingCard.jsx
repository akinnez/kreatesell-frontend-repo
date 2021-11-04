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
				<sup className={styles.currency}>NGN</sup> {price}{" "}
				<sub className={styles.month}>/ Month</sub>
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
						className={styles.btn}
						text={btnText}
						bgColor="blue"
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
	"Robust dashboard analytics.",
	"Drag and Drop Sales Page Builder",
	"Multi-currency store - six currencies",
	"Cryptocurrency payment Method",
	"Landing Page watermark",
	"Tracking and Pixel",
	"Instant Sale Notification ",
	"Affiliate Instant Commission",
	"Storage 500MB",
	"Limit downloads",
	"Custom Checkout Button (CTA)",
	"Branded Profile",
];

const BusinessFeatures = [
	"Everything on Free Plan",
	"Unlimited Army of Affiliates",
	"Highest Converting beautiful Templates",
	"Full Email Service Provider Integration",
	"Webinar integration",
	"Automated Abandoned Cart Emails",
	"Installmental Payment",
	"Membership Course Creation",
	"Zapier Integration",
	"Paypal + Stripe for verified merchants",
	"Webinar replays (Stream online only)",
	"Social Proof ",
	"Exit intent Pop up on sales Page ",
	"Use your own Domain",
	"Pre order",
	"Offer coupons",
	"Remove default Watermark",
	"15GB Storage",
	"Advanced reports",
];
