import React from "react";
import AuthLayout from "../../../../components/authlayout";
import { Card, Tabs } from "antd";
import styles from "../../../../public/css/About-domain.module.scss";

const AboutDomain = () => {
	return (
		<>
			<AuthLayout mobilePadding={true}>
				<Card className={styles.card}>
					<h4 className="text-base-gray font-medium text-sm md:text-base">
						Manually connect your domain name in a few steps
					</h4>

					<div>
						<div className="flex items-center">
							<h4 className={styles.number}>1</h4>
							<p className="text-base-gray">
								<span className="text-black">Log in</span> to your domain
								registering service
							</p>
						</div>

						<div className="flex items-center">
							<h4 className={styles.number}>2</h4>
							<p className="text-base-gray">
								Navigate to your{" "}
								<span className="text-black">domain management page</span> (Page
								where all your available domains are listed)
							</p>
						</div>

						<div className="flex items-center">
							<h4 className={styles.number}>3</h4>
							<p className="text-base-gray">
								Select a <span className="text-black">domain</span> your are
								looking to connect if available
							</p>
						</div>

						<div className="flex items-center">
							<h4 className={styles.number}>4</h4>
							<p className="text-base-gray">
								If you are choosing a new domain, create a new{" "}
								<span className="text-black">CNAME record</span> - The{" "}
								<span className="text-black">CNAME record</span> should target
								your desired subdomain to{" "}
								<span className="text-blue-400 cursor-pointer">
									yourusername.kreatesell.com
								</span>{" "}
								(replace yourusername with your kreatesell username)
							</p>
						</div>

						<p className="pl-8 text-base-gray">
							Here is what it looks like in the DNS record: "
							<span className="text-blue-400 cursor-pointer">
								yourdomain.com
							</span>{" "}
							" CNAME{" "}
							<span className="text-blue-400 cursor-pointer">
								yourstorename.kreatesell.com
							</span>{" "}
							Warning: If you are not conversant well with DNS thing, kindly
							contact your DNS/Hosting provider before altering your DNS.
						</p>

						<div className="flex items-center pt-4">
							<h4 className={styles.number}>5</h4>
							<p className="text-base-gray">
								Your custom link will be ready to use Once you create a{" "}
								<span className="text-black">CNAME record</span> on your custom
								domain with a value of “
								<span className="text-blue-400 cursor-pointer">
									yourstorename.kreatesell.com
								</span>
								”. Paste your custom domain in the ‘Custom Domain’ field of the
								account’s domain settings.
							</p>
						</div>

						<p className="pl-8 text-base-gray">
							Do not add https because it will automatically be added to the
							custom domain.
						</p>

						<div className="flex items-center pt-4">
							<h4 className={styles.number}>6</h4>
							<p className="text-base-gray">
								Click on the ‘<span className="text-black">Save</span>’ button
								at the bottom.
							</p>
						</div>

						<p className="pl-8 text-base-gray">
							Right after this custom domain setting, all your checkout pages,
							client portal, and affiliate signup page’s will reflect this
							custom domain in the URL.
						</p>

						<p className="pl-8 text-base-gray">
							Regular URL of Kreatesell Account:
							<span className="text-blue-400 cursor-pointer">
								https://yourstorename.kreatesell.com/
							</span>
						</p>

						<p className="pl-8 text-base-gray">
							Hooray, you will be able to load the store page with a customized
							domain:{" "}
							<span className="text-blue-400 cursor-pointer">
								http://yourdomain.com
							</span>
						</p>
					</div>
				</Card>
			</AuthLayout>
		</>
	);
};

export default AboutDomain;
