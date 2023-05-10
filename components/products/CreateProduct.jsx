import {useState, useEffect} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';

import {useSelector} from 'react-redux';
import {Row, Col} from 'antd';

import {CreateProductForm} from 'components';
import styles from './CreateProduct.module.scss';
import {
	OneTimeSubscriptionIcon,
	MembershipSubscriptionIcon,
	DigitalDownloadIcon,
} from 'components/IconPack';
import {GetProductTypes} from 'redux/actions';
import {Popover} from 'components/popover/Popover';
import {AddBankModal} from 'components/bank';
import {showToast} from 'utils';

export const CreateProductTab = ({
	setTitles,
	titles,
	setSelectedTab,
	selectedTab,
	productId,
}) => {
	const router = useRouter();
	const getProductTypes = GetProductTypes();

	const [tab, setTab] = useState(1);
	const [iconHover, setIconHover] = useState({
		tab1: tab === 1 || false,
		tab2: tab == 2 || false,
		tab3: tab == 3 || false,
	});

	const {tab1, tab2, tab3} = iconHover;
	const {productTypes, product} = useSelector((state) => state.product);
	const {store} = useSelector((state) => state.store);
	const filterProductType = (id) =>
		productTypes?.filter((item) => item.id === id);

	const digitalDownloadMenu = filterProductType(1);
	const oneTimeSubMenu = filterProductType(2);
	const membershipMenu = filterProductType(3);
	const [isBank, setIsBank] = useState(false);
	const [hasSetupStore, setHasSetupStore] = useState(false);
	const [isTypeEditable, setIsTypeEditable] = useState(false);
	const [isBasic, setIsBasic] = useState(true);
	const [productsMounted, setProductMounted] = useState(false);
	const [mountedCount, setMountedCount] = useState(0);

	useEffect(() => {
		if (Object.keys(store).length > 0) {
			const {bank_details, user, store_details} = store;
			if (user?.user_plan === 'Business') setIsBasic(false);
			if (!bank_details) {
				setIsBank(true);
			} else {
				setIsBank(false);
			}

			// check for if store has been setup
			// we will use bio data to check here because, bio data is
			// a compulsory field on the store page
			if (!store_details?.bio_data) {
				setTimeout(() => {
					router.push(
						'/account/kreator/store/edit?returnTo=/account/kreator/products/create',
						'/account/kreator/store/edit'
					);
				}, 2000);
				showToast(
					'Redirecting!!! You have to setup store details before you create a product.',
					'info',
					{hideAfter: 2}
				);
			}
			return () => {
				setIsBank(false);
				setIsBasic(true);
			};
		}
	}, [store]);

	// console.log("tab is", tab);
	// console.log("isTypeEditable is", isTypeEditable);
	// console.log("productsMounted is", productsMounted);
	// console.log("mountedCount is", mountedCount);

	useEffect(() => {
		if (
			Object.keys(product).length > 0 &&
			!!productsMounted &&
			mountedCount === 1
		) {
			const {product_type_details} = product;
			switch (product_type_details) {
				case 'Digital Download':
					setTab(1);
					setIsTypeEditable(true);
					break;
				case 'One-Time Subscription':
					setTab(2);
					setIsTypeEditable(true);
					break;
				case 'Membership':
					setTab(3);
					setIsTypeEditable(true);
					break;
			}
		}
	}, [product, mountedCount, productsMounted]);

	useEffect(() => {
		setProductMounted(true);
		setMountedCount((prev) => prev + 1);
		return () => {
			setProductMounted(false);
		};
	}, [product]);

	useEffect(() => {
		if (selectedTab) {
			setTab(selectedTab);
		}
	}, []);
	useEffect(() => {
		getProductTypes();
	}, []);
	useEffect(() => {
		setSelectedTab(tab);
	}, [tab]);
	useEffect(() => {
		if (tab === 1) {
			const newTitles = [titles[0], titles[1]];
			setTitles(newTitles);
			return;
		}
		if (tab === 2) {
			const newTitles = [titles[0], titles[1], 'One-Time-Subscription'];
			setTitles(newTitles);
			return;
		}
		if (tab === 3) {
			const newTitles = [titles[0], titles[1], 'Membership'];
			setTitles(newTitles);
			return;
		}
	}, [tab]);

	function isPlanBusiness() {
		return store?.user?.user_plan.toLowerCase() === 'business';
	}

	return (
		<div className={`px-0 lg:px-8 ${styles.container}`}>
			<h3 className="text-black-100 font-bold text-2xl">
				Add a New Product
			</h3>
			<p className="text-base font-semibold text-black-100 mt-5">
				Product Type
			</p>

			<Row gutter={24}>
				<Col xs={24} md={8}>
					<div
						className={`${styles.productTypeTab} ${
							tab === 1 && styles.active
						} w-full`}
						key={digitalDownloadMenu[0]?.id ?? 1}
						onClick={() => {
							// TODO: Investigate what this line below doing
							// if(isTypeEditable && tab !==1){
							//   return
							// }
							setSelectedTab(digitalDownloadMenu[0]?.id ?? 1);
							setTab(digitalDownloadMenu[0]?.id ?? 1);
						}}
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
							<DigitalDownloadIcon
								active={tab === 1}
								onHover={tab1}
							/>
						</span>
						<div className="hidden lg:block">
							<h2 className="text-lg font-bold">
								Digital Download
							</h2>
							<span>Start selling immediately</span>
						</div>
						<div
							className={`lg:hidden font-semibold ${styles.mobileContainer}`}
						>
							Digital Download
							<span
								className={`font-medium ${styles.mobileSubTitle}`}
							>
								Start selling immediately
							</span>
						</div>
					</div>
				</Col>

				<Col xs={24} md={8}>
					<Popover
						content="This action can only be performed by a business plan"
						trigger="hover"
						popoverActive={!isPlanBusiness()}
					>
						<div
							className={`${
								isBasic
									? styles.productTypeTabDisabled
									: styles.productTypeTab
							} ${tab === 2 && styles.active} w-full`}
							key={oneTimeSubMenu[0]?.id ?? 2}
							onClick={() => {
								// if(isTypeEditable && tab !==2){
								//   return
								// }
								if (!isBasic) {
									setSelectedTab(oneTimeSubMenu[0]?.id ?? 2);
									setTab(oneTimeSubMenu[0]?.id ?? 2);
								}
							}}
							onMouseEnter={
								!isBasic
									? () => {
											return setIconHover({
												...iconHover,
												tab1: false,
												tab2: true,
												tab3: false,
											});
									  }
									: null
							}
							onMouseLeave={
								!isBasic
									? () => {
											return setIconHover({
												...iconHover,
												tab1: false,
												tab2: false,
												tab3: false,
											});
									  }
									: null
							}
						>
							<h3>BUSINESS</h3>
							<span>
								<OneTimeSubscriptionIcon
									active={tab === 2}
									onHover={tab2}
								/>
							</span>
							<div className="hidden lg:block">
								<h2 className="text-lg font-bold">
									One-Time Subscription
								</h2>
								<span>Pay only once</span>
							</div>
							<div
								className={`lg:hidden font-semibold ${styles.mobileContainer}`}
							>
								One-Time Subscription
								<span
									className={`font-medium ${styles.mobileSubTitle}`}
								>
									{' '}
									Pay only once
								</span>
							</div>
						</div>
					</Popover>
				</Col>

				<Col xs={24} md={8}>
					<Popover
						content="This action can only be performed by a business plan"
						trigger="hover"
						popoverActive={!isPlanBusiness()}
					>
						<div
							className={`${
								isBasic
									? styles.productTypeTabDisabled
									: styles.productTypeTab
							} ${tab === 3 && styles.active} w-full`}
							key={membershipMenu[0]?.id ?? 3}
							onClick={() => {
								// if(isTypeEditable && tab !==3){
								//   return
								// }
								if (!isBasic) {
									setSelectedTab(membershipMenu[0]?.id ?? 3);
									setTab(membershipMenu[0]?.id ?? 3);
								}
							}}
							onMouseEnter={() => {
								if (!isBasic) {
									return setIconHover({
										...iconHover,
										tab1: false,
										tab2: false,
										tab3: true,
									});
								}
							}}
							onMouseLeave={() => {
								if (!isBasic) {
									return setIconHover({
										...iconHover,
										tab1: false,
										tab2: false,
										tab3: false,
									});
								}
							}}
						>
							<h3>BUSINESS</h3>
							<span>
								<MembershipSubscriptionIcon
									active={tab === 3}
									onHover={tab3}
								/>
							</span>

							<div className="hidden lg:block">
								<h2 className="text-lg font-bold">
									Membership
								</h2>
								<span>Charge on recurring basis</span>
							</div>
							<div
								className={`lg:hidden font-semibold ${styles.mobileContainer}`}
							>
								Membership
								<span
									className={`font-medium ${styles.mobileSubTitle}`}
								>
									{' '}
									Charge on recurring basis
								</span>
							</div>
						</div>
					</Popover>
				</Col>
			</Row>
			{/* {(tab === 2 || tab === 3) && } */}
			{tab !== 1 && store?.user?.user_plan !== 'Business' ? (
				<div className={styles.businessPlan}>
					<h2 className="text-base w-full font-normal">
						This action requires a business plan, click{' '}
						<Link href="/account/kreator/settings?activeTab=billing">
							here
						</Link>{' '}
						to subscribe
					</h2>
				</div>
			) : (
				<></>
			)}
			<div className="mt-8 mb-4">
				<div className="divider"></div>
			</div>

			<div>
				{tab === 1 && (
					<CreateProductForm
						productType="digitalDownload"
						productTypeId={tab}
						{...{productId}}
					/>
				)}

				{tab === 2 && (
					<CreateProductForm
						productType="oneTimeSubscription"
						productTypeId={tab}
						{...{productId}}
					/>
				)}

				{tab === 3 && (
					<CreateProductForm
						productType="membership"
						productTypeId={tab}
						{...{productId}}
					/>
				)}
				{isBank && <AddBankModal {...{isBank, setIsBank}} />}
			</div>
		</div>
	);
};
