import { Button } from "components";
import Image from "next/image";
import styles from "./Domain.module.scss";
import { EmptyDomain } from "./";
import { ClockCircle, DeleteOutline, Lock } from "utils";

export const AllDomains = () => {
	return (
		<div>
			<div className="flex justify-between items-center pt-2">
				<h3 className="text-black-100 font-medium text-2xl">Domains</h3>
				<div>
					<Button
						text="Connect a domain"
						bgColor="blue"
						className={styles.btnStyle}
					/>
				</div>
			</div>

			<div className="productBorder mt-4 bg-white rounded-lg">
				<a
					href="tech9ja.com"
					target="_blank"
					rel="noopener norefferer"
					className="text-primary-blue"
				>
					tech9ja.com
				</a>

				<div className="flex justify-between mt-3">
					<div className="flex items-center">
						<Image src={Lock} alt="Connected Domain" />
						<span className="pl-3 text-sm text-black-100">
							Connected and Secure
						</span>
					</div>
					<div className="cursor-pointer">
						<Image src={DeleteOutline} alt="Delete Domain" />
					</div>
				</div>
			</div>

			<div className="productBorder mt-4 bg-white rounded-lg">
				<div className="flex justify-between">
					<a
						href="www.salvo.hitech.com"
						target="_blank"
						rel="noopener norefferer"
						className="text-primary-blue"
					>
						www.salvo.hitech.com
					</a>

					<div className="cursor-pointer">
						<Image src={DeleteOutline} alt="Delete Domain" />
					</div>
				</div>

				<div className="flex items-center mt-3">
					<Image src={ClockCircle} alt="Connected Domain" />
					<span className="pl-3 text-sm text-black-100">
						Checking with domain provider
					</span>
				</div>

				<div className="text-black-100 pt-3">
					Last Checked:9/08/2021 at 4:15PM
				</div>

				<div className="pt-3">
					<p className="text-xs text-base-gray-200 m-0">
						This process can take up to 48 hours. Next, we’ll process your SSL
						to make sure your domain is secure. View Guide
					</p>
					<a
						href="www.salvo.hitech.com"
						target="_blank"
						rel="noopener norefferer"
						className="text-primary-blue text-xs"
					>
						View Guide
					</a>
				</div>
			</div>

			<EmptyDomain showHeader={false} />
		</div>
	);
};
