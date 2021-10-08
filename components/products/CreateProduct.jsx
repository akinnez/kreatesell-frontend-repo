import { useState } from "react";
import { DigitalDownload, Membership, OneTimeSubscription } from "components";
import styles from "./CreateProduct.module.scss";
import { OneTimeSubscriptionIcon } from "components/IconPack";
import Image from "next/image";
import OneTimeSub from "../../public/images/one-time-sub.svg";

export const CreateProductTab = () => {
	const [tab, setTab] = useState(1);
	return (
		<div className={`px-8 ${styles.container}`}>
			<h3 className="text-black-100 font-medium text-2xl">Add a New Product</h3>
			<p className="text-base text-black-100">Product Type</p>

			<div
				className={`${styles.productTypeTab} ${tab === 1 && styles.active}`}
				onClick={() => setTab(1)}
			>
				Digital Download <span>- Start selling immediately</span>
			</div>

			<div
				className={`${styles.productTypeTab} ${tab === 2 && styles.active}`}
				onClick={() => setTab(2)}
			>
				{/* <Image src={OneTimeSubscriptionIcon} /> */}
				<Image src={OneTimeSub} />
				One-Time Subscription <span>- Pay only once</span>
			</div>

			<div
				className={`${styles.productTypeTab} ${tab === 3 && styles.active}`}
				onClick={() => setTab(3)}
			>
				Membership - Charge on recurring basis
				<span> - Charge on recurring basis</span>
			</div>

			<div>
				{tab === 1 && <DigitalDownload />}
				{tab === 2 && <OneTimeSubscription />}
				{tab === 3 && <Membership />}
			</div>
		</div>
	);
};
