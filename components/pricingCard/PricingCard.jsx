import { ActivePrice, InActivePrice } from "../../utils";
import Image from "next/image";
import styles from "./PricingCard.module.scss";
// import { Button } from "../button/Button";
import { Button } from "../index";

const PriceFeatures = [
	{
		active: true,
		content: "Unlimited product updates",
	},
	{
		active: true,
		content: "Unlimited product updates",
	},
	{
		active: true,
		content: "Unlimited product updates",
	},
	{
		active: false,
		content: "1GB Cloud storage",
	},
	{
		active: false,
		content: "Email and community support",
	},
];

export const PricingCard = ({ title, subTitle, price, type }) => {
	return (
		<div
			className={`${styles.container} ${
				type === "standard" && styles.standard
			}`}
		>
			{/* <div className={styles.container}> */}
			<h3 className={styles.title}>free</h3>
			<h5 className={styles.subTitle}>
				Viverra eu placerat <br /> porttitor.
			</h5>

			<div className={styles.priceCont}>
				<div className={styles.price}>19.99</div>
				<div className={styles.currency}>
					<h3 className={styles.currencySign}>$</h3>
					<h5 className={styles.month}>Per Month</h5>
				</div>
			</div>

			<div className={styles.featuresContainer}>
				{PriceFeatures?.map((features, i) => (
					<div className={styles.features} key={i}>
						<div className={styles.featuresIcons}>
							<Image
								src={features.active ? ActivePrice : InActivePrice}
								height="23"
								width="23"
							/>
						</div>
						<h6 className={styles.featuresContent}>{features.content}</h6>
					</div>
				))}
			</div>

			<div className={styles.button}>
				<Button className={styles.btn} text="Try for free" bgColor="blue" />
			</div>
		</div>
	);
};
