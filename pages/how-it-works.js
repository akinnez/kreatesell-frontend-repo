import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Layout, InputButton, Button } from "../components";
import styles from "../public/css/HowItWorks.module.scss";
import {
	AddProduct,
	CreateStore,
	Publish,
	HowItWorksHero,
	RightArrow,
	LeftSpiral,
	RightSpiral,
} from "../utils";

const HowItWorks = () => {
	const router = useRouter();
	const [email, setEmail] = useState("");

	return (
		<Layout subFooter={true} defaultMarginTop={true}>
			<div className={styles.container}>
				<div className={styles.hero}>
					<h2 className={styles.main}>Just Upload It. Make Money From It.</h2>
					<h2 className={styles.mobileHeader}>
						Just Upload It. Make <br /> Money From It.
					</h2>

					<p className={styles.subtitle}>
						A Smarter and Better way of making money from your <br /> Digital
						Content.
					</p>
					<p className={styles.mobileSubtitle}>
						A Smarter and Better way of making money from your Digital Content.
					</p>

					<div className={styles.input}>
						<InputButton
							name="email"
							placeholder="Enter your email..."
							buttonText="Get Started Free"
							buttonIcon={<RightArrow />}
							onChange={(e) => setEmail(e.target.value)}
							onSubmit={(e) => {
								e.preventDefault();
								router.push({
									pathname: "/signup",
									query: { email },
								});
							}}
						/>
					</div>

					<div className={styles.benefits}>
						<span>Signup for free</span>
						<span>• Easy setup</span>
						<span>• Fast payout</span>
					</div>
				</div>

				<div className={styles.bestOption}>
					<div className={styles.content}>
						<h3>Best Option for</h3>
						<div className={styles.pillContainer}>
							<div className={styles.pills}>
								<div className={styles.pill}>Ebook Author</div>
								<div className={styles.pill}>Information Seller</div>
								<div className={styles.pill}>Educators</div>
							</div>
							<div className={styles.pills}>
								<div className={styles.pill}>Membership Creator</div>
								<div className={styles.pill}>Webinar Hosts</div>
							</div>
							<div className={styles.pills}>
								<div className={styles.pill}>Online Course Creator</div>
							</div>
						</div>
						<p className={styles.pillContent}>
							KreateSell is an ease-to-use, cross-border ecommerce <br />{" "}
							platform that will enable you to upload your digital products for{" "}
							<br />
							fastest and easiest sales and conversion without having to <br />{" "}
							learn multiple complex sales funnel platforms and instantly get{" "}
							<br />
							paid from anywhere in the world conveniently.
						</p>
						<p className={styles.mobilePillContent}>
							KreateSell is an ease-to-use, cross-border ecommerce platform that
							will enable you to upload your digital products for fastest and
							easiest sales and conversion without having to learn multiple
							complex sales funnel platforms and instantly get paid from
							anywhere in the world conveniently.
						</p>
					</div>
					<div className={styles.image}>
						<Image src={HowItWorksHero} width="445" height="457" />
					</div>
				</div>

				<div className={styles.subCaption}>
					<h3>How it works</h3>
					<p>
						Amazing all-in-one tools that bring a winning customer experience
					</p>
				</div>

				<div className={styles.rowOne}>
					<div className={styles.image}>
						<Image
							src={CreateStore}
							width={280}
							height={297}
							alt="create-product"
						/>
					</div>
					<div className={styles.rowContent}>
						<div className={styles.rowNumber}>1</div>
						<div className={styles.content}>
							<h5 className={styles.webTitle}>
								Create your Store and setup Store details
							</h5>
							<h5 className={styles.mobileTitle}>
								Create your Store and <br /> setup Store details
							</h5>
							<div>
								<p className={styles.statement}>
									To get started, just navigate to the get started or sign up
									button <br /> and create a free account to have the all-in-one
									system in action <br /> for use.
								</p>
								<br />
								<p className={styles.statement}>
									Getting ready? Now add all your store details for easy <br />
									recognition. Details that compel, attract and intrigue
									potential <br /> buyers.
								</p>

								<p className={styles.mobileStatement}>
									To get started, just navigate to the get started or sign up
									button and create a free account to have the all-in-one system
									in action for use. Getting ready? Now add all your store
									details for easy recognition. Details that compel, attract and
									intrigue potential buyers.
								</p>
							</div>
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

				<div className={`${styles.rowOne} ${styles.evenRow}`}>
					<div className={styles.rowContent}>
						<div className={styles.rowNumber}>2</div>
						<div className={styles.content}>
							<h5 className={styles.webTitle}>Add Product</h5>
							<h5 className={styles.mobileTitle}>Add Product</h5>
							<div>
								<p className={styles.statement}>
									Ready to go global, create your products with awesome <br />
									descriptions and additional beneficial details that capture
									the <br /> attention of customers. After that, share your
									product link for <br /> the target audience.
								</p>

								<p className={styles.mobileStatement}>
									Ready to go global, create your products with awesome
									descriptions and additional beneficial details that capture
									the attention of customers. After that, share your product
									link for the target audience.
								</p>
							</div>
						</div>
					</div>
					<div className={styles.image}>
						<Image
							src={AddProduct}
							width={280}
							height={297}
							alt="create-product"
						/>
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

				<div className={`${styles.rowOne} ${styles.rowThree}`}>
					<div className={styles.image}>
						<Image
							src={Publish}
							width={280}
							height={297}
							alt="create-product"
						/>
					</div>
					<div className={styles.rowContent}>
						<div className={styles.rowNumber}>3</div>
						<div className={styles.content}>
							<h5 className={styles.webTitle}>
								Publish - Go live in a seconds
							</h5>
							<h5 className={styles.mobileTitle}>Publish</h5>
							<div>
								<p className={styles.statement}>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
									<br />
									Semper viverra posuere augue pretium. Egestas malesuada <br />{" "}
									urna, scelerisque non. Nunc pretium, amet in id duis
									sollicitudin <br /> eget. Et facilisi pretium pellentesque
									elit.
								</p>
								<p className={styles.mobileStatement}>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									Semper viverra posuere augue pretium. Egestas malesuada urna,
									scelerisque non. Nunc pretium, amet in id duis sollicitudin
									eget. Et facilisi pretium pellentesque elit.
								</p>
							</div>
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

				<div className={`${styles.rowOne} ${styles.evenRow}`}>
					<div className={styles.rowContent}>
						<div className={styles.rowNumber}>4</div>
						<div className={styles.content}>
							<h5 className={styles.webTitle}>
								Get paid instantly into your account
							</h5>
							<h5 className={styles.mobileTitle}>
								Get paid instantly into your account
							</h5>
							<div>
								<p className={styles.statement}>
									Enter your local bank account and start receiving your sales{" "}
									<br />
									payment instantly. No foreign currency barriers again, you'll{" "}
									<br />
									receive your payout directly and instantly into the local bank{" "}
									<br />
									provided.
								</p>
								<p className={styles.mobileStatement}>
									Enter your local bank account and start receiving your sales
									payment instantly. No foreign currency barriers again, you'll
									receive your payout directly and instantly into the local bank
									provided.
								</p>
							</div>
						</div>
					</div>
					<div className={styles.image}>
						<Image
							src={AddProduct}
							width={280}
							height={297}
							alt="create-product"
						/>
					</div>
				</div>

				<div className={styles.subFooter}>
					<h3 className={styles.subFooterTitle}>
						KreateSell solves your marketing <br /> and conversion hectic
						processes.
					</h3>
					<h3 className={styles.mobileSubFooterTitle}>
						KreateSell solves your marketing and conversion hectic processes.
					</h3>
					<p>
						Rid yourself of stress. Upload more content. Make money. Enjoy your
						choiced life to the fullest.
					</p>
					<Button
						text="Get Started Free"
						bgColor="blue"
						className={styles.btn}
						icon={<RightArrow />}
					/>
				</div>
			</div>
		</Layout>
	);
};

export default HowItWorks;
