import { Layout, PricingCard } from "../components";
import styles from "../public/css/Pricing.module.scss";

const Pricing = () => {
	return (
		<Layout>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2>Pricing</h2>
					<p>
						Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit.
					</p>
				</div>

				<div className={styles.priceCards}>
					<PricingCard />
					<div className={styles.standard}>
						<PricingCard type="standard" />
					</div>
					<PricingCard />
				</div>
			</div>
		</Layout>
	);
};

export default Pricing;
