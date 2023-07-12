import Link from 'next/link';
import router, {useRouter} from 'next/router';
import Image from 'next/image';
import {useEffect, useState, useRef} from 'react';
import dynamic from 'next/dynamic';

import {Pagination, Input} from 'antd';
// import Modal from 'antd/es/modal'
// import {UserOutlined} from '@ant-design/icons';
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
	SearchIcon,
	Copy2,
	FacebookIcon,
	TwitterIcon2,
	GmailIcon,
	WhatsappIcon2,
	RenderIf,
} from 'utils';
import {hashTagsWithHash, hashTagsWithoutHash} from 'utils/socialShareHashtags';
import {Button, Select} from 'components';
import Logo, {MobileLogo} from 'components/authlayout/logo';
import {currencyOptions} from 'components/account-dashboard/partials';
import {ProtectedStoreHeader} from 'components/store/storeHeader';
import ProductCard from 'components/store/ProductCard';
import {FetchSingleStoreProduct} from 'redux/actions';
import {Logout, ConvertCurrency} from 'redux/actions';
import {PoweredByKS} from 'components/PoweredByKs';
import useLocation from 'hooks/useLocation';
import useCurrency from 'hooks/useCurrency';
import CloseIcon from 'components/affiliates/CloseIcon';
import {showToast} from 'utils';

const Modal = dynamic(() => import('antd/es/modal'), {ssr: false});
const StoreMobileDropView = dynamic(() =>
	import('components/store/storeMobileDropView')
);

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
		loading: singleStoreProductsLoading,
	} = useSelector((state) => state.product);

	// console.log(singleStoreDetails,'singleStoreDetailssingleStoreDetailssingleStoreDetails')

	const isPoweredByKreatesell = singleStoreDetails?.is_powered_by_kreatesell;
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
						<Link href="/" prefetch={false}>
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
								<Link href="/" prefetch={false}>
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
										options={formattedCurrencies}
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

					<div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8 pb-20 mt-6">
						<RenderIf condition={singleStoreProductsLoading}>
							{Array.from({length: 10}, (_) => null).map(
								(_, idx) => (
									<div
										key={idx}
										className={`bg-white w-full rounded-lg ${styles.productCardCtnShimmer} ${styles.shimmerBG}`}
									></div>
								)
							)}
						</RenderIf>
						{
							<RenderIf condition={!singleStoreProductsLoading}>
								{singleStoreProducts
									?.filter(
										(productDetails) =>
											productDetails?.product_images !==
											null
									)
									?.map((productDetails) => {
										const sellingPrice =
											productDetails?.default_price;
										const originalSetting =
											productDetails?.check_out_details?.find(
												(item) =>
													item?.currency_name ===
														defaultCurrency?.currency &&
													item?.price_indicator ===
														'Original'
											);

										const originalPrice =
											originalSetting?.price;
										return (
											<ProductCard
												productDetails={productDetails}
												key={productDetails?.id}
												sellingPrice={sellingPrice}
												originalPrice={originalPrice}
												convertedCurrency={
													convertedCurrency?.buy_rate
												}
												loading={
													currencyConverterLoading
												}
												targetCurrency={
													tempTargetCurrency
												}
												{...{
													storename,
													openShareModal,
													setOpenShareModal,
													handleModalOpen,
												}}
											/>
										);
									})}
							</RenderIf>
						}
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
				{isPoweredByKreatesell && (
					<PoweredByKS showDisclaimer={true} {...{storename}} />
				)}
			</div>
			{/* TODO: Make this a single reusable component and use dynamic import to lazy load */}
			{/* params to pass: openShareModal, handleModalClose, storeName, productName, origin */}
			<RenderIf condition={openShareModal}>
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
			</RenderIf>
		</>
	);
};

export default StorePage;
