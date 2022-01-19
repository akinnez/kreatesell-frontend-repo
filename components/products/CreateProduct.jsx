import { useState, useEffect } from "react";
import { CreateProductForm } from "components";
import styles from "./CreateProduct.module.scss";
import {
	OneTimeSubscriptionIcon,
	MembershipSubscriptionIcon,
	DigitalDownloadIcon,
} from "components/IconPack";
import { useSelector } from "react-redux";
import { GetProductTypes } from "redux/actions";

export const CreateProductTab = () => {
	const getProductTypes = GetProductTypes();

	const [tab, setTab] = useState(1);
	const [iconHover, setIconHover] = useState({
		tab1: tab === 1 || false,
		tab2: tab == 2 || false,
		tab3: tab == 3 || false,
	});

	const { tab1, tab2, tab3 } = iconHover;

	const { productTypes } = useSelector((state) => state.product);

	const filterProductType = (id) =>
		productTypes?.filter((item) => item.id === id);

	const digitalDownloadMenu = filterProductType(1);
	const oneTimeSubMenu = filterProductType(2);
	const membershipMenu = filterProductType(3);

	useEffect(() => {
		getProductTypes();
	}, []);

	return (
		<div className={`px-0 lg:px-8 ${styles.container}`}>
			<h3 className="text-black-100 font-medium text-2xl">Add a New Product</h3>
			<p className="text-base text-black-100">Product Type</p>

			<div
				className={`${styles.productTypeTab} ${
					tab === 1 && styles.active
				} w-full lg:w-3/4`}
				key={digitalDownloadMenu[0]?.id ?? 1}
				onClick={() => setTab(digitalDownloadMenu[0]?.id) ?? 1}
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
					Digital Download
					<span className={`font-medium ${styles.mobileSubTitle}`}>
						- Start selling immediately
					</span>
				</div>
			</div>

			<div
				className={`${styles.productTypeTab} ${
					tab === 2 && styles.active
				} w-full lg:w-3/4`}
				key={oneTimeSubMenu[0]?.id ?? 2}
				onClick={() => setTab(oneTimeSubMenu[0]?.id) ?? 2}
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
						- Pay only once
					</span>
				</div>
			</div>

			<div
				className={`${styles.productTypeTab} ${
					tab === 3 && styles.active
				} w-full lg:w-3/4`}
				key={membershipMenu[0]?.id ?? 3}
				onClick={() => setTab(membershipMenu[0]?.id) ?? 3}
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
				{tab === 1 && (
					<CreateProductForm
						productType="digitalDownload"
						productTypeId={tab}
					/>
				)}

				{tab === 2 && (
					<CreateProductForm
						productType="oneTimeSubscription"
						productTypeId={tab}
					/>
				)}

				{tab === 3 && (
					<CreateProductForm productType="membership" productTypeId={tab} />
				)}
			</div>
		</div>
	);
};
