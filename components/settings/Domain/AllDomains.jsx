import { useEffect } from "react";
import { Button } from "components";
import Image from "next/image";
import styles from "./Domain.module.scss";
import { EmptyDomain } from "./";
import { ClockCircle, DeleteOutline, Lock, _formatURL } from "utils";
import { useSelector } from "react-redux";
import { GetDomains, SetDomainScreen, DeleteDomain } from "redux/actions";
import Link from "next/link";

export const AllDomains = () => {
	const getDomains = GetDomains();
	const setDomainScreen = SetDomainScreen();
	const deleteDomain = DeleteDomain();

	const { domains } = useSelector((state) => state.domain);

	useEffect(() => {
		getDomains();
	}, []);

	const handleDeleteDomain = (id) => {
		deleteDomain(id, () => {
			getDomains();
			setDomainScreen(2);
		});
	};

	return (
		<div>
			<div className="flex justify-between items-center pt-2">
				<h3 className="text-black-100 font-medium text-2xl">Domains</h3>
				<div>
					<Button
						text="Connect a domain"
						bgColor="blue"
						className={styles.btnStyle}
						onClick={() => setDomainScreen(3)}
					/>
				</div>
			</div>

			{domains?.map((domain) => (
				<div key={domain.domain_id}>
					{domain.status === "verified" && (
						<div className="productBorder mt-4 bg-white rounded-lg">
							<a
								href={domain.domain_url}
								target="_blank"
								rel="noopener norefferer"
								className="text-primary-blue"
							>
								{_formatURL(domain.domain_url)}
							</a>
							<div className="flex justify-between mt-3">
								<div className="flex items-center">
									<Image src={Lock} alt="Connected Domain" />
									<span className="pl-3 text-sm text-black-100">
										Connected and Secure
									</span>
								</div>
								<div
									className="cursor-pointer"
									onClick={() => handleDeleteDomain(domain.domain_id)}
								>
									<Image src={DeleteOutline} alt="Delete Domain" />
								</div>
							</div>
						</div>
					)}

					{domain.status === "unverified" && (
						<div className="productBorder mt-4 bg-white rounded-lg">
							<div className="flex justify-between">
								<a
									href={domain.domain_url}
									target="_blank"
									rel="noopener norefferer"
									className="text-primary-blue"
								>
									{_formatURL(domain.domain_url)}
								</a>

								<div
									className="cursor-pointer"
									onClick={() => handleDeleteDomain(domain.domain_id)}
								>
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
									This process can take up to 48 hours. Next, we’ll process your
									SSL to make sure your domain is secure.
								</p>

								<Link href="/account/kreator/settings/about-domain">
									<a
										target="_blank"
										rel="noopener norefferer"
										className="text-primary-blue text-xs"
									>
										View Guide
									</a>
								</Link>
							</div>
						</div>
					)}
				</div>
			))}

			<EmptyDomain showHeader={false} />
		</div>
	);
};
