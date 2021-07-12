import Image from "next/image";
import { Layout, InputButton } from "../components";
import styles from "../public/css/Features.module.scss";
import {
	RightArrow,
	AutomationIcon,
	InstantPayout,
	PayoutMethod,
} from "../utils";

const Features = () => {
	return (
		<Layout subFooter={true}>
			<div className={styles.container}>
				<div className={styles.hero}>
					<h2 className={styles.main}>
						The Fastest and Safest Way <br /> To Sell Digital Products <br />{" "}
						Beyond Borders
					</h2>

					<p className={styles.subtitle}>
						A Smarter and Better way of making money from your <br /> Digital
						Content.
					</p>

					<div className={styles.input}>
						<InputButton
							name="email"
							placeholder="Enter your email..."
							buttonText="Get Started Free"
							buttonIcon={<RightArrow />}
						/>
					</div>

					<div className={styles.benefits}>
						<span>Signup for free</span>
						<span>• Easy setup</span>
						<span>• Fast payout</span>
					</div>
				</div>

				<div className={styles.automation}>
					<div className={styles.image}>
						<Image src={AutomationIcon} height="420" width="417" />
					</div>
					<div className={styles.automationText}>
						<h3 className={styles.automationTitle}>Automation</h3>
						<p className={styles.automationSubTitle}>
							All the sales processes are being handled for you <br /> so you
							can focus on your most important work.
						</p>

						<div className={styles.linkText}>
							Learn more <RightArrow color="#0072ef" />
						</div>
					</div>
				</div>

				<div className={styles.automation}>
					<div className={styles.automationText}>
						<h3 className={styles.automationTitle}>
							Foreign payments <br /> barriers solved
						</h3>
						<div className={styles.automationSubTitle}>
							<p>1. Set Local Payment</p>
							<p>2. Payment made in buyers' local currency</p>
							<p>
								3. Get your payment instantly in your local bank <br />{" "}
								hassle-free.
							</p>
						</div>

						<div className={styles.linkText}>
							Learn more <RightArrow color="#0072ef" />
						</div>
					</div>
					<div className={styles.image}>
						<Image src={PayoutMethod} height="513" width="635" />
					</div>
				</div>

				<div className={styles.automation}>
					<div className={styles.image}>
						<Image src={InstantPayout} height="420" width="417" />
					</div>
					<div className={styles.automationText}>
						<h3 className={styles.automationTitle}>Instant Payout</h3>
						<p className={styles.automationSubTitle}>
							You have access to withdraw your payout to local <br /> banks in
							24 hours after successful order. Cool?
						</p>

						<div className={styles.linkText}>
							Learn more <RightArrow color="#0072ef" />
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Features;
