import { InputButton, Layout, Button } from "../components";
import styles from "../public/css/Home.module.scss";
import {
	RightArrow,
	LandingPageHero,
	AirBnBLogo,
	MicrosoftLogo,
	AddProduct,
	CreateStore,
	Publish,
	AutomationIcon,
	LeftSpiral,
	RightSpiral,
	PayoutMethod,
	InstantPayout,
} from "../utils";
import Image from "next/image";

export default function Home() {
	return (
		<Layout subFooter={true} defaultMarginTop={true}>
			<div className={styles.container}>
				<div className={styles.body}>
					<div className={styles.header}>
						<h1>
							Kreate. Upload. And Sell <br /> your{" "}
							<span className={styles.digital}>Digital Product</span> <br />
							Online under Minutes. For Free
						</h1>
						<p className={styles.subHeader}>
							Upload your Ebooks, Online Courses, Video Courses, Subscription
							plans, <br /> and Memberships in an online all-in-one platform for
							free and accept payment from anywhere in the world.
						</p>

						<div className={styles.inputContainer}>
							<InputButton
								name="email"
								placeholder="Enter your email..."
								buttonText="Get Started Free"
								buttonIcon={<RightArrow />}
							/>
						</div>

						<div className={styles.benefits}>
							<span className={styles.benefitSpan}>Signup for free</span>
							<span className={styles.benefitSpan}>• Easy setup</span>
							<span className={styles.benefitSpan}>• Fast payout</span>
						</div>
					</div>
					<div className={styles.heroImage}>
						<Image src={LandingPageHero} alt="kreatesell hero" />
					</div>
					<div className={styles.featured}>
						<h5 className={styles.title}>As featured in</h5>
						<div className={styles.featuredImages}>
							<div className={styles.imageStyle}>
								<Image src={AirBnBLogo} />
							</div>
							<div className={styles.imageStyle}>
								<Image src={MicrosoftLogo} />
							</div>
							<div className={styles.imageStyle}>
								<Image src={AirBnBLogo} />
							</div>
							<div className={styles.imageStyle}>
								<Image src={MicrosoftLogo} />
							</div>
							<div className={styles.imageStyle}>
								<Image src={AirBnBLogo} />
							</div>
							<div className={styles.imageStyle}>
								<Image src={MicrosoftLogo} />
							</div>
						</div>
					</div>
				</div>

				<div className={styles.howItWorks}>
					<div className={styles.howItWorkstitleCont}>
						<h3 className={styles.howItWorksTitle}>How it works</h3>
						<p className={styles.howItWorksSubTitle}>
							Amazing all-in-one tools that bring a winning customer experience
						</p>
					</div>

					<div className={styles.howItWorksImgCont}>
						<div className={styles.howItWorksImgSingle}>
							<Image src={CreateStore} width="194" height="150" />
							<h5 className={styles.howItWorksImgTitle}>Create your Store</h5>
							<p className={styles.howItWorksImgSubTitle}>
								Create an account to get started.
							</p>
						</div>

						<div className={styles.howItWorksImgSingle}>
							<Image src={AddProduct} width="194" height="150" />
							<h5 className={styles.howItWorksImgTitle}>Add Product</h5>
							<p className={styles.howItWorksImgSubTitle}>
								Add products and setup your store.
							</p>
						</div>

						<div className={styles.howItWorksImgSingle}>
							<Image src={Publish} width="194" height="150" />
							<h5 className={styles.howItWorksImgTitle}>Publish</h5>
							<p className={styles.howItWorksImgSubTitle}>
								Now publish to make your store live!
							</p>
						</div>
					</div>

					<div className={styles.howItWorksBtnCont}>
						<Button
							text="More details"
							bgColor="blue"
							className={styles.howItWorksBtn}
						/>
					</div>
				</div>

				<div className={styles.featuresSection}>
					<div className={styles.subHero}>
						<h3>More than an ecommerce platfrom</h3>
						<p>
							Amazing all-in-one tools that bring a winning customer experience
						</p>
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

				<div className={styles.midSection}></div>
			</div>
		</Layout>
	);
}
