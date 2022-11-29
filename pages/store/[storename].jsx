import Link from 'next/link';
import {useRouter} from 'next/router';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import {Button as NormalButton, Input as NormalInput} from '../../components';
import {Pagination, Input, Spin} from 'antd';
import {useSelector} from 'react-redux';
import {MdSearch} from 'react-icons/md';
import {Avatar} from 'antd';
import {UserOutlined} from '@ant-design/icons';

import styles from '../../public/css/product-store.module.scss';
import {
	ArrowLeft,
	StoryTellingPNG,
	ExternalLink2,
	ExternalLink,
	SearchIcon,
	DummyImage,
} from 'utils';
import {Button, Select} from 'components';
import Logo, {MobileLogo} from 'components/authlayout/logo';
import {currencyOptions} from 'components/account-dashboard/partials';
import {ProtectedStoreHeader} from 'components/store/storeHeader';
import {FetchSingleStoreProduct, SetCheckoutDetails} from 'redux/actions';
import {Logout, ConvertCurrency} from 'redux/actions';
import {PoweredByKS} from 'components/PoweredByKs';
import useLocation from 'hooks/useLocation';

const StorePage = () => {
	const router = useRouter();
	const convertCurrency = ConvertCurrency();
	const fetchSingleStoreProduct = FetchSingleStoreProduct();
	const {countryDetails, countryDetailsLoading: loading} = useLocation();
	const [openMobileNav, setOpenMobileNav] = useState(false);
	const handleNavbar = () => setOpenMobileNav((value) => !value);
	const {
		singleStoreDetails,
		singleStoreProducts,
		singleStorePaginationDetails: pagination,
		defaultCurrency,
	} = useSelector((state) => state.product);

	// const [defaultCurrency, setDefaultCurrency] = useState('NGN');
	const [targetCurrency, setTargetCurrency] = useState('');
	const [tempTargetCurrency, setTempTargetCurrency] = useState(
		defaultCurrency?.currency
	);

	const {convertedCurrency, loading: currencyConverterLoading} = useSelector(
		(state) => state.currencyConverter
	);

	const {
		query: {storename},
	} = router;

	const handlePaginationChange = (page) => {
		fetchSingleStoreProduct(storename, page);
	};

	const logout = Logout();

	const handleCurrencyConversion = (toCurrency) => {
		if (toCurrency) {
			const data = {
				amount: 1,
				from_currency_name: defaultCurrency?.currency,
				to_currency_name: toCurrency,
			};
			convertCurrency(
				data,
				() => {
					setTempTargetCurrency(targetCurrency);
				},
				() => {
					// reset currency to previous currency
					// setTempTargetCurrency();
				}
			);
		}
	};

	useEffect(() => {
		setTargetCurrency(currencyOptions[0].value);
	}, []);

	useEffect(() => {
		if (storename !== undefined) {
			fetchSingleStoreProduct(storename);
		}
	}, [storename]);

	useEffect(() => {
		if (defaultCurrency) {
			setTempTargetCurrency(defaultCurrency?.currency);
		}
	}, [defaultCurrency]);

	useEffect(() => {
		if (!!targetCurrency && defaultCurrency?.currency) {
			handleCurrencyConversion(targetCurrency);
		}
	}, [targetCurrency, defaultCurrency?.currency]);

	// to set currency based on user's location
	useEffect(() => {
		if (countryDetails?.currency) {
			setTargetCurrency(countryDetails?.currency);
		}
	}, [countryDetails?.currency]);

	return (
		<div className={styles.container}>
			<nav className="bg-white hidden lg:flex items-center px-4 lg:px-40">
				<div className="w-1/5 hidden lg:flex justify-start">
					<Link href="/">
						<a className="">
							<Logo />
						</a>
					</Link>
				</div>

				<div className="w-4/5 flex justify-end items-center">
					{/* <div className="w-30 mr-4">
						<Input
							style={{borderRadius: '8px', height: '100%'}}
							prefix={<MdSearch />}
							placeholder="Click here to Search"
							onChange={() => {}}
						/>
						
					</div> */}
					<div className="w-10">
						<Image src={SearchIcon} alt="search" />
					</div>
					<div className="w-20 mr-4">
						<Select
							options={currencyOptions}
							border="none"
							cb={(targetCurrency) =>
								setTargetCurrency(targetCurrency)
							}
							defaultValue={
								countryDetails?.currency
									? {
											value: countryDetails?.currency,
											label: countryDetails?.currency,
									  }
									: null
							}
							loading={loading}
						/>
					</div>

					<div onClick={() => router.push('/login')} className="pr-5">
						<Button text="Login" bgColor="white" />
					</div>
					<div onClick={() => router.push('/signup')}>
						<Button text="Signup" bgColor="blue" />
					</div>
				</div>
			</nav>

			<nav className="bg-white lg:hidden flex items-center justify-between px-4">
				<div className="items-center  flex ">
					<div
						className={`${styles.mobileMenuCont} ${
							openMobileNav && styles.open
						}`}
						onClick={() => handleNavbar()}
					>
						<div className={styles.hamburger}></div>
					</div>
					{!openMobileNav && (
						<div className="w-100">
							<Link href="/">
								<a className="">
									<MobileLogo />
								</a>
							</Link>
						</div>
					)}
				</div>

				<div className="w-100 flex justify-end items-center">
					{!openMobileNav ? (
						<div className={styles.select}>
							<Image src={SearchIcon} alt="search" />
							<div className="w-20 mr-4 ml-5">
								<Select
									options={currencyOptions}
									border="none"
									cb={(targetCurrency) =>
										setTargetCurrency(targetCurrency)
									}
									defaultValue={{
										value: countryDetails?.currency,
										label: countryDetails?.currency,
									}}
									loading={loading}
								/>
							</div>
						</div>
					) : (
						<div
							onClick={() => router.push('/login')}
							className="pr-5"
						>
							<Button text="Login" bgColor="white" />
						</div>
					)}

					{/* <div onClick={() => logout()}>
						<Button text="logout" bgColor="blue" />
					</div> */}
					{!openMobileNav && (
						<div className={styles.btnsContainer}>
							<div
								onClick={() => router.push('/login')}
								className="pr-5"
							>
								<Button text="Login" bgColor="white" />
							</div>
							<div onClick={() => router.push('/signup')}>
								<Button text="Signup" bgColor="blue" />
							</div>
						</div>
					)}
				</div>
			</nav>

			<div className="px-4 lg:px-40">
				<div className="flex items-center py-10">
					{false && (
						<div
							className="mr-auto cursor-pointer"
							onClick={() => router.back()}
						>
							<Image src={ArrowLeft} alt="go back" />{' '}
							<span className="pl-2 font-semibold text-primary-blue">
								BACK
							</span>
						</div>
					)}
				</div>

				{openMobileNav && <StoreMobileDropView />}

				<div>
					<ProtectedStoreHeader
						publicStore={true}
						publicStoreInfo={singleStoreDetails}
					/>

					<div className={styles.bioData}>
						<p className="px-2 md:px-6 lg:px-32 mt-4 md:mt-16 text-base-gray-200 text-sm text-center">
							{singleStoreDetails?.bio_data}
						</p>
					</div>
				</div>

				<div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8 pb-20 mt-6">
					{singleStoreProducts?.map((productDetails) => {
						{
							/* console.log('productDetails = ', productDetails) */
						}
						const countrySale =
							productDetails?.check_out_details?.find(
								(item) =>
									item?.currency_name ===
										defaultCurrency?.currency &&
									item?.price_indicator === 'Selling'
							);

						const sellingPrice = countrySale?.price;
						const originalSetting =
							productDetails?.check_out_details?.find(
								(item) =>
									item?.currency_name ===
										defaultCurrency?.currency &&
									item?.price_indicator === 'Original'
							);
						// console.log("countrySale = ", countrySale);
						// console.log("sellingPrice = ", sellingPrice);
						const originalPrice = originalSetting?.price;
						return (
							<ProductCard
								productDetails={productDetails}
								key={productDetails?.id}
								sellingPrice={sellingPrice}
								originalPrice={originalPrice}
								convertedCurrency={convertedCurrency?.buy_rate}
								loading={currencyConverterLoading}
								targetCurrency={tempTargetCurrency}
								{...{storename}}
							/>
						);
					})}
				</div>

				{pagination?.total_records > 12 && (
					<div className="py-8 lg:pt-0">
						<Pagination
							defaultCurrent={1}
							onChange={handlePaginationChange}
							current={pagination?.current_page_number}
							total={pagination?.total_records}
							defaultPageSize={12}
						/>
					</div>
				)}
			</div>
			<PoweredByKS />
		</div>
	);
};

const ProductCard = ({
	productDetails,
	sellingPrice,
	originalPrice,
	storename,
	convertedCurrency,
	targetCurrency,
	loading,
}) => {
	const pricingType =
		productDetails?.product_details?.pricing_type?.price_type;

	const router = useRouter();
	const setCheckoutDetails = SetCheckoutDetails();
	const imageShown = productDetails?.product_images?.[0]?.filename?.includes(
		','
	)
		? productDetails?.product_images?.[0]?.filename?.split(',')[0]
		: productDetails?.product_images?.[0]?.filename?.endsWith('.rar') ||
		  productDetails?.product_images?.[0]?.filename?.endsWith('.zip')
		? productDetails?.product_images?.[1]?.filename
		: productDetails?.product_images?.[1]?.filename?.includes(',')
		? productDetails?.product_images?.[1]?.filename?.split(',')[1]
		: productDetails?.product_images?.[1]?.filename;

	const initImage = productDetails?.product_images?.[0]?.filename?.includes(
		','
	)
		? // * show full array
		  productDetails?.product_images?.[0]?.filename?.split(',')
		: // * show first item
		  productDetails?.product_images?.[0]?.filename;

	const imageRendered =
		productDetails?.product_images?.[1]?.filename ||
		productDetails?.product_images?.[0]?.filename ||
		(productDetails?.product_images?.[1]?.filename?.includes(',') &&
			productDetails?.product_images?.[1]?.filename?.split(',')[0]) ||
		(productDetails?.product_images?.[0]?.filename?.includes(',') &&
			productDetails?.product_images?.[0]?.filename?.split(',')[0]);

	// there are instances where imageshown does not exist and image rendered is in a bad format (.i.e. starts with ,)
	let len = imageRendered?.split(',');

	const statusLabel = {
		'In Stock': {color: '#2DC071'},
		'Out of Stock': {color: '#FF4D4F'},
	};

	const outOfStock = () => {
		return productDetails.number_sold >= productDetails.total;
	};

	const showItemsLeftOrAmtSold = () => {
		let itemsLeft = productDetails?.total - productDetails?.number_sold;
		if (itemsLeft <= 10) {
			return `${itemsLeft} copies left!`;
		}
		if (productDetails.product_details?.is_show_number_of_sales) {
			return `${productDetails?.number_sold} sold`;
		}
	};
	return (
		<div
			className={`bg-white w-full rounded-lg ${styles.productCardCtn}`}
			style={{cursor: 'pointer'}}
			onClick={() => {
				router.push(
					`/store/${storename}/product/${productDetails?.product_details?.kreasell_product_id}`
				);
			}}
		>
			<div>
				<Image
					src={!imageShown ? len[len.length - 1] : imageShown}
					width="320"
					height="300"
					className="rounded-t-lg object-cover"
					alt=""
				/>
			</div>
			<div className={`flex justify-between p-2 ${styles.productStatus}`}>
				<p
					className={`mb-0 ${styles.status}`}
					style={{
						color: statusLabel[
							outOfStock()
								? 'Out of Stock'
								: productDetails.status
						].color,
					}}
				>
					{/* if productDetails.total >= productDetails.number_sold : "Out of stock"*/}
					{outOfStock() ? 'Out of Stock' : productDetails.status}
				</p>
				<p className={`mb-0 ${styles.amountSold}`}>
					{' '}
					{showItemsLeftOrAmtSold()}
				</p>
			</div>
			<div className={`w-full px-2 md:px-4 ${styles.cardBox}`}>
				{/* <p className={`pt-2 text-sm md:text-base ${styles.productName}`}> */}
				<p className={`pt-2 mb-1 text-sm md:text-base `}>
					{productDetails?.product_details?.product_name}
				</p>

				<div className={`flex justify-between items-center pb-4`}>
					<div
						className={`flex justify-between items-center pb-4 column ${styles.main}`}
					>
						{loading ? (
							<Spin size="small" />
						) : (
							<>
								<p
									className={`text-base-gray text-sm md:text-base mb-0 ${styles.sellingPrice}`}
								>
									{targetCurrency ||
										productDetails?.default_currency
											?.currency}
									{convertedCurrency
										? new Intl.NumberFormat().format(
												convertedCurrency * sellingPrice
										  )
										: !convertedCurrency
										? new Intl.NumberFormat().format(
												sellingPrice
										  )
										: '0.00'}
								</p>

								{pricingType === 'Fixed Price' && (
									<p
										className={`text-base-gray  text-sm md:text-base originalPrice ${styles.originalPrice}`}
									>
										{targetCurrency ||
											productDetails?.default_currency
												?.currency}

										{convertedCurrency
											? new Intl.NumberFormat().format(
													convertedCurrency *
														(originalPrice ??
															productDetails?.default_price)
											  )
											: !convertedCurrency
											? new Intl.NumberFormat().format(
													originalPrice ??
														productDetails?.default_price
											  )
											: '0.00'}
									</p>
								)}
							</>
						)}
					</div>
					<Image
						alt=""
						src={ExternalLink}
						onClick={(e) => {
							if (!outOfStock()) {
								e.stopPropagation();
								router.push(
									`/checkout/${productDetails?.product_details?.kreasell_product_id}`
								);
								setCheckoutDetails(productDetails);
							}
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default StorePage;

export const StoreMobileDropView = ({
	isVariant = false,
	nameOfStore = '',
	dp = '',
}) => {
	const {singleStoreDetails} = useSelector((state) => state.product);

	const displayPicture = singleStoreDetails?.display_picture;

	// console.log('details = ', singleStoreDetails);
	const storeName = singleStoreDetails?.store_name;
	return (
		<div
			className={`${styles.mobileDropView} ${
				isVariant ? styles.isVariant : ''
			}`}
		>
			<div
				className={`${styles.profile} ${
					!displayPicture || !dp ? styles.noDp : ''
				}`}
			>
				{displayPicture || dp ? (
					<Image
						src={displayPicture || dp}
						alt="dp"
						layout="fill"
						className={styles.image}
					/>
				) : (
					<div className={styles.image_intro_text}>
						<Avatar
							shape="square"
							className={styles.avatar}
							size={70}
							icon={<UserOutlined />}
						/>
					</div>
				)}
				<p>{storeName || nameOfStore}</p>
			</div>
			<div className={styles.storeLink}>
				<span>store link </span>
				<Image src={ExternalLink2} alt="external link" />
			</div>
			<div className={styles.text}>
				<h2>
					Host your <span>Digital Product</span> <br />
					online under minutes.
				</h2>
				<p>
					Seamlessly sell your content to audience without any
					marketing knowledge
				</p>
			</div>
			<div>
				<div className={styles.mobileInput}>
					<Input type="" placeholder="Enter your email.." />
				</div>
				<div className={styles.mobileButton}>
					<Button
						text="Get Started Free"
						bgColor="blue"
						className={styles.freeBtn}
					/>
				</div>
				<div className={styles.benefits}>
					<span className={styles.benefitSpan}>Signup for free</span>
					<span className={styles.benefitSpan}>• Easy setup</span>
					<span className={styles.benefitSpan}>• Fast payout</span>
				</div>
			</div>
		</div>
	);
};
