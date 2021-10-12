import { useState } from "react";
import { CreateProductForm } from "components";
import styles from "./CreateProduct.module.scss";
import {
	OneTimeSubscriptionIcon,
	MembershipSubscriptionIcon,
	DigitalDownloadIcon,
} from "components/IconPack";

export const CreateProductTab = () => {
	const [tab, setTab] = useState(1);
	const [iconHover, setIconHover] = useState({
		tab1: tab === 1 || false,
		tab2: tab == 2 || false,
		tab3: tab == 3 || false,
	});

	const { tab1, tab2, tab3 } = iconHover;

	return (
		<div className={`px-0 lg:px-8 ${styles.container}`}>
			<h3 className="text-black-100 font-medium text-2xl">Add a New Product</h3>
			<p className="text-base text-black-100">Product Type</p>

			<div
				className={`${styles.productTypeTab} ${
					tab === 1 && styles.active
				} w-full lg:w-3/4`}
				onClick={() => setTab(1)}
				onMouseEnter={() =>
					setIconHover({
						...iconHover,
						tab1: true,
						tab2: false,
						tab3: false,
					})
				}
				onMouseLeave={() =>
					setIconHover({
						...iconHover,
						tab1: false,
						tab2: false,
						tab3: false,
					})
				}
			>
				<span>
					<DigitalDownloadIcon active={tab === 1} onHover={tab1} />
				</span>
				<div className="hidden lg:block">
					Digital Download <span>- Start selling immediately</span>
				</div>
				<div className="lg:hidden font-semibold">
					Classic Digital Product{" "}
					<span className={`font-medium ${styles.mobileSubTitle}`}>
						- Start selling today
					</span>
				</div>
			</div>

			<div
				className={`${styles.productTypeTab} ${
					tab === 2 && styles.active
				} w-full lg:w-3/4`}
				onClick={() => setTab(2)}
				onMouseEnter={() =>
					setIconHover({
						...iconHover,
						tab1: false,
						tab2: true,
						tab3: false,
					})
				}
				onMouseLeave={() =>
					setIconHover({
						...iconHover,
						tab1: false,
						tab2: false,
						tab3: false,
					})
				}
			>
				<span>
					<OneTimeSubscriptionIcon active={tab === 2} onHover={tab2} />
				</span>
				<div className="hidden lg:block">
					One-Time Subscription <span>- Pay only once</span>
				</div>
				<div className="lg:hidden font-semibold">
					One-Time Subscription
					<span className={`font-medium ${styles.mobileSubTitle}`}>
						{" "}
						- Charge one time
					</span>
				</div>
			</div>

			<div
				className={`${styles.productTypeTab} ${
					tab === 3 && styles.active
				} w-full lg:w-3/4`}
				onClick={() => setTab(3)}
				onMouseEnter={() =>
					setIconHover({
						...iconHover,
						tab1: false,
						tab2: false,
						tab3: true,
					})
				}
				onMouseLeave={() =>
					setIconHover({
						...iconHover,
						tab1: false,
						tab2: false,
						tab3: false,
					})
				}
			>
				<span>
					<MembershipSubscriptionIcon active={tab === 3} onHover={tab3} />
				</span>

				<div className="hidden lg:block">
					Membership <span> - Charge on recurring basis</span>
				</div>
				<div className="lg:hidden font-semibold">
					Membership
					<span className={`font-medium ${styles.mobileSubTitle}`}>
						{" "}
						- Charge on recurring basis
					</span>
				</div>
			</div>

			<div className="mt-8 mb-4">
				<div className="divider"></div>
			</div>

			<div>
				{tab === 1 && <CreateProductForm productType="digitalDownload" />}
				{tab === 2 && <CreateProductForm productType="oneTimeSubscription" />}
				{tab === 3 && <CreateProductForm productType="membership" />}
			</div>
		</div>
	);
};
