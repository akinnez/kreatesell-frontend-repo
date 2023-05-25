import Link from 'next/link';
import router, {useRouter} from 'next/router';
import Image from 'next/image';
import {useEffect, useState, useRef} from 'react';

import {Pagination, Input, Spin, Modal} from 'antd';
import {Avatar} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {useSelector} from 'react-redux';
import {
	FacebookShareButton,
	WhatsappShareButton,
	TwitterShareButton,
	EmailShareButton,
} from 'react-share';

import styles from '../../public/css/product-store.module.scss';
import {
	ArrowLeft,
	ExternalLink2,
	ExternalLink,
	SearchIcon,
	Copy2,
	FacebookIcon,
	InstagramIcon,
	TwitterIcon2,
	GmailIcon,
	WhatsappIcon2,
} from 'utils';
import {hashTagsWithHash, hashTagsWithoutHash} from 'utils/socialShareHashtags';
import {Button, Select} from 'components';
import Logo, {MobileLogo} from 'components/authlayout/logo';
import {currencyOptions} from 'components/account-dashboard/partials';
import {ProtectedStoreHeader} from 'components/store/storeHeader';
import {FetchSingleStoreProduct, SetCheckoutDetails} from 'redux/actions';
import {Logout, ConvertCurrency} from 'redux/actions';
import {PoweredByKS} from 'components/PoweredByKs';
import useLocation from 'hooks/useLocation';
import useCurrency from 'hooks/useCurrency';
import CloseIcon from 'components/affiliates/CloseIcon';
import {showToast} from 'utils';

const StorePage = () => {
	const router = useRouter();
	const linkElement = useRef();
	const [origin] = useState(() => {
		return typeof window !== 'undefined' && window.location.origin
			? window.location.origin
			: '';
	});
	const [productName, setProductName] = useState('');
	const {allowedCurrencies} = useCurrency();
	const convertCurrency = ConvertCurrency();
	const fetchSingleStoreProduct = FetchSingleStoreProduct();

	const {countryDetails, countryDetailsLoading: loading} = useLocation();
	const [openMobileNav, setOpenMobileNav] = useState(false);
	const [openShareModal, setOpenShareModal] = useState(false);
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
	const [formattedCurrencies, setFormattedCurrencies] = useState([]);

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

	const handleModalOpen = (name) => {
		setProductName(name);
		setOpenShareModal(true);
	};

	const handleModalClose = () => {
		setOpenShareModal(false);
		setProductName('');
	};

	const handleCopy = async () => {
		try {
			const link = linkElement.current.textContent;

			if ('clipboard' in navigator) {
				await navigator.clipboard.writeText(link);
				showToast('Link Copied', 'success');
			} else {
				showToast('Unable to copy link in this browser', 'info');
			}
		} catch (err) {
			showToast(
				'Something went wrong. Can not copy link at this time',
				'warn'
			);
		}
	};

	const formatCurrencies = () => {
		const currencies = allowedCurrencies.map((cur) => {
			return {
				...cur,
				value: cur.label,
			};
		});

		setFormattedCurrencies(currencies);
	};
	useEffect(() => {
		if (allowedCurrencies.length > 0) {
			formatCurrencies();
		}
	}, [allowedCurrencies.length]);

	return (
		<>
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
						<div className="w-10">
							<Image src={SearchIcon} alt="search" />
						</div>
						<div className="w-20 mr-4">
							<Select
								// options={currencyOptions}
								options={formattedCurrencies}
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
				</nav>

				<nav
					className={`bg-white lg:hidden flex items-center justify-between px-4 ${styles.mobileNav}`}
				>
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

				<div className="px-4 lg:px-40" style={{minHeight: '100vh'}}>
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

					<div className="w-full grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8 pb-20 mt-6">
						{singleStoreProducts
							?.filter(
								(productDetails) =>
									productDetails?.product_images !== null
							)
							?.map((productDetails) => {
								const countrySale =
									productDetails?.check_out_details?.find(
										(item) =>
											item?.currency_name ===
												defaultCurrency?.currency &&
											item?.price_indicator === 'Selling'
									);

								{
									/* const sellingPrice = countrySale?.price; */
								}
								const sellingPrice =
									productDetails?.default_price;
								const originalSetting =
									productDetails?.check_out_details?.find(
										(item) =>
											item?.currency_name ===
												defaultCurrency?.currency &&
											item?.price_indicator === 'Original'
									);

								const originalPrice = originalSetting?.price;
								return (
									<ProductCard
										productDetails={productDetails}
										key={productDetails?.id}
										sellingPrice={sellingPrice}
										originalPrice={originalPrice}
										convertedCurrency={
											convertedCurrency?.buy_rate
										}
										loading={currencyConverterLoading}
										targetCurrency={tempTargetCurrency}
										{...{
											storename,
											openShareModal,
											setOpenShareModal,
											handleModalOpen,
										}}
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
				<PoweredByKS showDisclaimer={true} {...{storename}} />
			</div>
			{/* TODO: Make this a single reusable component */}
			{/* params to pass: openShareModal, handleModalClose, storeName, productName, origin */}
			<Modal
				title={null}
				footer={null}
				visible={openShareModal}
				onCancel={handleModalClose}
				// maskClosable={true}
				closeIcon={<CloseIcon />}
				className={styles.modalContainer}
				width={700}
			>
				<div className={styles.modal}>
					<h1>Share this product</h1>
					<div
						className={`${styles.socialMediaContainer} flex justify-center gap-10`}
					>
						<FacebookShareButton
							url={`https://facebook.com`}
							quote={`Hiii🤗 This is exciting! I found an astounding digital product I'm sure you would love. Click this link to check it out: ${origin}/store/${storename}/product/${productName}`}
							hashtag={hashTagsWithHash[0]}
						>
							<Image alt="" src={FacebookIcon} />
						</FacebookShareButton>

						<TwitterShareButton
							url={`${origin}/store/${storename}/product/${productName}`}
							title={`Hiii🤗 This is exciting! I found an astounding digital product I'm sure you would love. Click this link to check it out: `}
							via={'kreatesell'}
							hashtags={hashTagsWithoutHash}
						>
							<Image alt="" src={TwitterIcon2} />
						</TwitterShareButton>
						<WhatsappShareButton
							url={`https://wa.me`}
							title={'title of the post'}
						>
							<Image alt="" src={WhatsappIcon2} />
						</WhatsappShareButton>
						<EmailShareButton
							url={``}
							subject={'title of the shared page'}
							body={`Hiii🤗 This is exciting! I found an astounding digital product I'm sure you would love. Click this link to check it out: ${origin}/store/${storename}/product/${productName}`}
						>
							<Image alt="" src={GmailIcon} />
						</EmailShareButton>
					</div>
					<p className={`mb-0`}>
						Click the copy icon to copy the product link
					</p>
					<div className={styles.link__container}>
						<div className={styles.link}>
							<span
								ref={linkElement}
							>{`${origin}/store/${storename}/product/${productName}`}</span>
						</div>
						<Button
							className={styles.link__btn}
							onClick={handleCopy}
							text={<Image src={Copy2} alt="copy icon" />}
						/>
					</div>
				</div>
			</Modal>
		</>
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
	handleModalOpen,
}) => {
	const pricingType =
		productDetails?.product_details?.pricing_type?.price_type;
	const router = useRouter();
	//=========================================================================//
	//==========================Images=========================================//
	//=========================================================================//

	// NOTE: get only the images
	const images = productDetails?.product_images?.filter(
		(img) =>
			img.file_type_name !== 'ContentZipFile' &&
			!['.rar', '.zip', '.pdf'].includes(img.filename)
	);

	// NOTE: for products with multiple images, it is a string seperated by a comma, so we are getting the first image
	const imageShown = images[0]?.filename?.split(',')[0];

	// NOTE: Not sure what was intended here
	// const imageRendered =
	// 	images?.[1]?.filename ||
	// 	images?.[0]?.filename ||
	// 	(images?.[1]?.filename?.includes(',') &&
	// 		images?.[1]?.filename?.split(',')[0]) ||
	// 	(images?.[0]?.filename?.includes(',') &&
	// 		images?.[0]?.filename?.split(',')[0]);

	// there are instances where imageshown does not exist and image rendered is in a bad format (.i.e. starts with ,)
	// let len = imageRendered?.split(',');
	//=========================================================================//
	//==========================Images ENDS====================================//
	//=========================================================================//
	const statusLabel = {
		'In Stock': {color: '#2DC071'},
		'Out of Stock': {color: '#FF4D4F'},
	};

	/**
	 *
	 * @param {*} type - can be Pay What You Want or 'Fixed Price'
	 * @returns the predefined price for a particular currency
	 */
	const getPredefinedPrice = (type, priceType = 'Selling') => {
		let predefinedAmount;
		if (type === 'Pay What You Want') {
			predefinedAmount = productDetails?.check_out_details?.find(
				(det) =>
					det?.price_indicator === 'Minimum' &&
					det?.currency_name === targetCurrency
			);
			// minimum
		} else if (type === 'Fixed Price') {
			//selling
			// if(priceType === "Selling"){
			predefinedAmount = productDetails?.check_out_details?.find(
				(det) =>
					det?.price_indicator === priceType &&
					det?.currency_name === targetCurrency
			);
			// }else if(priceType === "Original"){
			//   predefinedAmount = productDetails.check_out_details
			// }
		}
		return predefinedAmount?.price;
	};

	const outOfStock = () => {
		return (
			productDetails.number_sold >=
				productDetails.product_details?.number_of_product &&
			productDetails?.product_details?.is_limited_sales
		);
	};

	const showItemsLeftOrAmtSold = () => {
		let itemsLeft =
			productDetails?.number_of_product - productDetails?.number_sold;
		if (itemsLeft <= 10) {
			return `${itemsLeft} copies left!`;
		}
		if (productDetails.product_details?.is_show_number_of_sales) {
			return `${productDetails?.number_sold} sold`;
		}
	};
	if (!images[0]?.filename) return null;
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
			<div className={styles.imageContainer}>
				<Image
					// src={len?.length ? len[0] : imageShown}
					src={imageShown}
					width="320"
					height="300"
					className="rounded-t-lg object-cover"
					alt=""
					layout="responsive"
					quality={100}
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

				<div className={`flex justify-between items-center pb-4 pt-1`}>
					{productDetails?.product_price_type === 'Make it Free' ? (
						<p className={styles.makeItFreeText}>Free</p>
					) : productDetails?.product_price_type ===
					  'Pay What You Want' ? (
						<p
							className={`mb-0 text-base-gray ${styles.sellingPrice}`}
						>
							{targetCurrency ||
								productDetails?.default_currency?.currency}{' '}
							{getPredefinedPrice(
								productDetails?.product_price_type
							)
								? getPredefinedPrice(
										productDetails?.product_price_type
								  )
								: convertedCurrency
								? new Intl.NumberFormat().format(
										Number(
											convertedCurrency *
												productDetails.default_price
										).toFixed(2)
								  )
								: Number(productDetails.default_price).toFixed(
										2
								  )}
						</p>
					) : (
						<div
							className={`flex justify-between items-center column ${styles.main}`}
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
												?.currency}{' '}
										{getPredefinedPrice(
											productDetails?.product_price_type
										)
											? getPredefinedPrice(
													productDetails?.product_price_type
											  )
											: convertedCurrency
											? new Intl.NumberFormat().format(
													Number(
														convertedCurrency *
															sellingPrice
													).toFixed(2)
											  )
											: !convertedCurrency
											? new Intl.NumberFormat().format(
													Number(
														sellingPrice
													).toFixed(2)
											  )
											: '0.00'}
									</p>

									{pricingType === 'Fixed Price' &&
										originalPrice && (
											<p
												className={`text-base-gray  text-sm md:text-base originalPrice ${styles.originalPrice}`}
											>
												{targetCurrency ||
													productDetails
														?.default_currency
														?.currency}{' '}
												{getPredefinedPrice(
													productDetails?.product_price_type,
													'Original'
												)
													? getPredefinedPrice(
															productDetails?.product_price_type,
															'Original'
													  )
													: convertedCurrency
													? new Intl.NumberFormat().format(
															Number(
																convertedCurrency *
																	originalPrice
															).toFixed(2)
													  )
													: !convertedCurrency
													? new Intl.NumberFormat().format(
															Number(
																originalPrice
															).toFixed(2)
													  )
													: '0.00'}
											</p>
										)}
								</>
							)}
						</div>
					)}
					<Image
						alt=""
						src={ExternalLink}
						onClick={(e) => {
							// if (!outOfStock()) {
							e.stopPropagation();
							handleModalOpen(
								productDetails?.product_details
									?.kreasell_product_id
							);
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
				<div
					className={styles.mobileButton}
					onClick={() => router.push('/signup')}
				>
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
