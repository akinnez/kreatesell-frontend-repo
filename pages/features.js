import Image from "next/image";
import { Layout, InputButton } from "../components";
import styles from "../public/css/Features.module.scss";
import {
	RightArrow,
	AutomationIcon,
	InstantPayout,
	PayoutMethod,
	LeftSpiral,
	RightSpiral,
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

					<div className={styles.subHero}>
						<h3>More than an ecommerce platfrom</h3>
						<p>
							Amazing all-in-one tools that bring a winning customer experience
						</p>
					</div>
				</div>

				<div className={styles.automation}>
					<div className={styles.image}>
						<Image src={AutomationIcon} height="420" width="417" />
					</div>
					<div className={styles.automationText}>
						<h3 className={styles.automationTitle}>
							Enjoy Free, Beautiful, <br /> Unlimited Templates
						</h3>
						<p className={styles.automationSubTitle}>
							Wherever you are, you can create beautiful pages <br /> with
							Softlink right on your smartphone. Monitor <br /> your leads and
							payments. Be on top of your <br /> business online.
						</p>

						<div className={styles.linkText}>
							Learn more <RightArrow color="#0072ef" />
						</div>
					</div>
				</div>

				<div className={styles.spiral}>
					<Image
						src={RightSpiral}
						height="150"
						width="500"
						className={styles.img}
					/>
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

				<div className={styles.spiral}>
					<Image
						src={LeftSpiral}
						height="150"
						width="500"
						className={styles.img}
					/>
				</div>

				<div className={styles.automation}>
					<div className={styles.image}>
						<Image src={InstantPayout} height="420" width="417" />
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
			</div>
		</Layout>
	);
};

export default Features;
