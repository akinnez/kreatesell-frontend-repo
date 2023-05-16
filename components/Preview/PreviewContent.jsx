import Image from 'next/image';
import Link from 'next/link';
import {useState, useEffect, useCallback} from 'react';
import {useRouter} from 'next/router';

import {useSelector} from 'react-redux';
import {Button} from 'antd';
import Cookies from 'js-cookie';

import styles from './PreviewHeader.module.scss';
import {Button as NormalButton} from 'components';
import {VerifiedModal, VerifiedDrawer} from 'components/VerifiedComponents';
import {
	RightPreviewArrow,
	LeftPreviewArrow,
	ExternalLink,
	ProductDeactivated,
	RenderIf,
	VerificationIcon,
	LargeVerificationIcon,
	MediumVerificationIcon,
} from 'utils';

import axios from 'axios';

var options = {
	weekday: 'long',
	year: 'numeric',
	month: 'short',
	day: 'numeric',
};
var timeOptions = {
	hour: 'numeric',
	minute: 'numeric',
	hour12: true,
};

export default function PreviewContent({
	alreadyDefinedPrice,
	alreadyDefinedOriginalPrice,
	productStatus,
}) {
	const [details, setDetails] = useState({});
	const [images, setImages] = useState([]);
	const [mainImage, setMainImage] = useState('');
	const [activeImage, setActiveImage] = useState(0);
	const [checkout, setCheckout] = useState(null);
	const [sellingPrice, setSellingPrice] = useState([]);
	const [originalPrice, setOriginalPrice] = useState([]);
	const [domainLink, setDomainLink] = useState('');
	const [uniqueKey, setUniqueKey] = useState('');
	const [affiliateRef, setAffiliateRef] = useState('');
	const [cookieExpiryTime, setCookieExpiryTime] = useState('');

	// const []

	// verification modal and drawers controls
	const [showModal, setShowModal] = useState(false);
	const [showDrawer, setShowDrawer] = useState(false);

	// function to close drawer for mobile
	const onClose = useCallback(() => {
		setShowDrawer(false);
	}, []);

	const router = useRouter();

	const {store} = useSelector((state) => state?.store);

	const {product, kycStatus, storePlan} = useSelector(
		(state) => state?.product
	);
	const {convertedCurrency, loading: currencyConverterLoading} = useSelector(
		(state) => state.currencyConverter
	);
	const productPriceType = product?.product_price_type;

	//get refs from router
	const ref = router.query.ref;
	const storename = router.query.storename;
	const productId = router.query?.id;

	//get cred from endpoint on load of the component
	const getAffliatekeys = async () => {
		if (!ref) return;
		const response = await axios.get(
			`${process.env.BASE_URL}/affiliate/confirm-short-link/${ref}`
		);
		setUniqueKey(response?.data?.unique_key);
		setAffiliateRef(response?.data?.affiliate_id);
	};

	//set cookie on load of the component
	useEffect(() => {
		const getAffiliateCookie = () => {
			getAffliatekeys();
			const affilateCookieObj = {
				affiliate_product_id: productId,
				affliate_uniquekey: uniqueKey,
				affliate_createdAt: new Date(),
			};

			Cookies.set(
				'affliate-cookie-storage',
				JSON.stringify(affilateCookieObj),
				{
					expires: 365 * 60,
				}
			);
		};

		getAffiliateCookie();
		return () => {};
	}, [productId, uniqueKey, ref]);

	useEffect(() => {
		// to prevent infinite loops in the product preview page without afilliate link
		if (!ref) return;

		//run check to see if exist
		const affiliteCookieOObject = Cookies.get('affliate-cookie-storage');
		const cookieObj = affiliteCookieOObject
			? JSON.parse(affiliteCookieOObject)
			: null;

		const cookieCreatedAt = cookieObj?.affliate_createdAt;
		const cookieUniqueKey = cookieObj?.affliate_uniquekey;
		const cookieProductId = cookieObj?.affiliate_product_id;

		cookieCreatedAt &&
			cookieUniqueKey === uniqueKey &&
			cookieProductId === productId &&
			setCookieExpiryTime(cookieCreatedAt);
	}, [ref]);

	const currentDate = new Date();
	const dateToCompare = new Date(cookieExpiryTime);
	const monthDifference =
		(currentDate.getFullYear() - dateToCompare.getFullYear()) * 12 +
		(currentDate.getMonth() - dateToCompare.getMonth());

	const getCheckoutLink = () => {
		if (affiliateRef && uniqueKey && monthDifference <= 6) {
			return router.push(
				`/checkout/payment/${productId}?${
					uniqueKey && `affiliateUniqueKey=${uniqueKey}`
				}&${affiliateRef && `affiliateRef=${affiliateRef}`}`
			);
		} else {
			return router.push(`/checkout/payment/${productId}`);
		}
	};

	// NOTE: This is for pay what you want
	const getMinimumPrice = () => {
		const minPrice = checkout?.find(
			(itemPrice) =>
				itemPrice.price_indicator === 'Minimum' &&
				itemPrice.currency_name === product?.default_currency?.currency
		);
		const minDefinedPrice = checkout?.find(
			(itemPrice) =>
				itemPrice.price_indicator === 'Minimum' &&
				itemPrice.currency_name === convertedCurrency?.to_currency_name
		);

		// console.log('minDefinedPrice', minDefinedPrice);
		// TODO:if there are already predefined prices, show them instead
		if (minDefinedPrice && Object.keys(minDefinedPrice).length > 0) {
			return minDefinedPrice?.price;
		}
		if (Object.keys(convertedCurrency).length > 0) {
			return convertedCurrency?.buy_rate * minPrice?.price;
		}
		return minPrice?.price;
	};

	// console.log('getMinimumPrice', getMinimumPrice());

	const getMinimumCurrency = () => {
		const minPrice = checkout?.find(
			(itemPrice) =>
				itemPrice.price_indicator === 'Minimum' &&
				itemPrice.currency_name === product?.default_currency?.currency
		);
		return minPrice?.currency_name;
	};

	// NOTE: Because this page can be both a preview(kreator's) and product page(buyer's)
	// user is not always enough
	const {user} = useSelector((state) => state?.auth);

	const formatPrice = (amount, decimalPlaces = 2) =>
		Number(amount).toFixed(decimalPlaces);
	const increase = () => {
		if (activeImage === images?.length - 1) {
			return setActiveImage(0);
		}
		return setActiveImage(activeImage + 1);
	};
	const decrease = () => {
		if (activeImage === 0) {
			return setActiveImage(images?.length - 1);
		}
		return setActiveImage(activeImage - 1);
	};
	useEffect(() => {
		if (Object.keys(product).length > 0) {
			setDetails(product?.product_details);
			setImages(
				...product?.product_images
					?.filter((images) => images?.file_type !== 4)
					?.map((item) => {
						const arr = item?.filename?.split(',');
						const truc = arr?.map((item) => {
							return {
								filename: item,
							};
						});
						return truc;
					})
			);
			setCheckout(product?.check_out_details);
		}
		if (checkout && checkout?.length > 0) {
			const defaultPrice = product?.default_currency?.currency;

			const prices = checkout?.filter(
				(item) => item?.currency_name === defaultPrice
			);
			setSellingPrice(
				prices?.filter((item) => item?.price_indicator === 'Selling')
			);
			setOriginalPrice(
				prices?.filter((item) => item?.price_indicator === 'Original')
			);
		}
	}, [product, checkout?.length]);
	useEffect(() => {
		if (images !== undefined && images?.length > 0) {
			setMainImage(images[activeImage]?.filename);
		}
	}, [images, activeImage]);
	useEffect(() => {
		if (Object.keys(store)?.length > 0) {
			const {domain_details} = store?.domain_details;
			setDomainLink(domain_details[0]?.domain_url);
		}
	}, [store]);

	const showBadge = () => {
		return (
			product?.kyc_status?.kyc_status === 'Approved' &&
			product?.user_plan === 'Business'
		);
		// return kycStatus?.kyc_status === 'Approved' && storePlan === 'Business';
	};

	const isProductOutOfStock = () => {
		if (product?.product_details) {
			const {is_limited_sales, number_of_product} =
				product?.product_details;
			return (
				is_limited_sales &&
				number_of_product - product?.number_sold <= 0
			);
		}
		return;
	};

	if (productStatus === 'idle')
		return <div style={{minHeight: '100vh'}}></div>;

	if (productStatus === 'deactivated') {
		return (
			<div className={styles.emptyContainerHolder}>
				<div
					className={
						styles.emptyContainer +
						' flex flex-col bg-white rounded-lg'
					}
				>
					<Image alt="" src={ProductDeactivated} />
					<h2>This product is currently unavailable</h2>
					<p>
						It might have been deactivated by the Kreator to improve
						it and give you the best value you deserve. Kindly check
						back later.
					</p>
					<NormalButton
						bgColor="blue"
						onClick={() =>
							storename
								? router.push(`/store/${storename}`)
								: router.push('/account/kreator/products/all')
						}
						text="Okay"
					/>
				</div>
			</div>
		);
	}

	return (
		<div
			className={
				styles.contentContainer + ' flex flex-col bg-white rounded-lg'
			}
		>
			<VerifiedDrawer {...{showDrawer, onClose}}>
				<VerifiedDrawerChildren {...{onClose}} />
			</VerifiedDrawer>
			<div className={`flex ${styles.previewContainer}`}>
				<div className={styles.imageGallery}>
					<div className={styles.mainImage}>
						{mainImage && (
							<Image
								src={mainImage}
								layout="fill"
								objectFit="cover"
								alt="cover_image"
							/>
						)}
					</div>
					{/* sub images */}
					<div className={styles.subImages}>
						{images !== undefined &&
							images.length > 0 &&
							images.map((item, index) => (
								<div
									className={`cursor-pointer ${
										activeImage === index && styles.active
									}`}
									onClick={() => setActiveImage(index)}
									key={index}
									style={{
										backgroundImage: `url("${item.filename}")`,
									}}
								></div>
							))}
						{images !== undefined && images.length > 1 && (
							<div className={styles.imageControl}>
								<span onClick={() => decrease()}>
									{' '}
									<Image
										src={RightPreviewArrow}
										alt="arrow"
									/>{' '}
								</span>
								<span onClick={() => increase()}>
									{' '}
									<Image src={LeftPreviewArrow} alt="arrow" />
								</span>
							</div>
						)}
					</div>
				</div>
				<div className={styles.description}>
					<div className="flex flex-col mb-5">
						{details !== undefined &&
							Object.keys(details).length > 0 && (
								<h2 className="mb-0 text-left text-xl md:text-3xl text-base-black-100 font-bold capitalize">
									{details?.product_name}
								</h2>
							)}
					</div>
					<div className={'flex items-center ' + styles.padBottom}>
						<div className={styles.dp}>
							{product?.store_dto?.profile_pix && (
								<Image
									// src={product?.store_dto?.profile_pix.split('')}
									src={product?.store_dto?.profile_pix}
									width="100"
									height={100}
									objectFit="cover"
									alt="cover_image"
								/>
							)}
						</div>
						<div className="flex  ml-6 flex-col">
							<div className={`flex flex-col`}>
								<h2
									className={`text-sm md:text-lg mb-0 font-medium capitalize ${styles.userName}`}
								>
									{product?.kreator_full_name ||
										user?.full_name}
									<RenderIf condition={showBadge()}>
										<div
											className={`${styles.mobileCheck} flex`}
										>
											<Image
												className={`cursor-pointer`}
												alt="blue verify checkmark"
												src={VerificationIcon}
												onClick={() =>
													setShowDrawer(true)
												}
											/>
										</div>
										<div
											className={`${styles.desktopCheck} flex`}
										>
											<Image
												className={`cursor-pointer`}
												alt="blue verify checkmark"
												src={VerificationIcon}
												onClick={() =>
													setShowModal(true)
												}
											/>
										</div>
									</RenderIf>
								</h2>
								<div className={styles.visitLink}>
									<Link
										href={domainLink}
										className="mb-0 font-medium"
									>
										<a>
											Visit Store&nbsp;
											<Image
												src={ExternalLink}
												alt="link"
											/>
										</a>
									</Link>
								</div>
							</div>
						</div>
					</div>
					<div
						className={`${styles.availabilityStatusContainer} mt-5`}
					>
						<p
							className={`${styles.availabilityStatus} ${
								isProductOutOfStock()
									? styles.outOfStock
									: styles.inStock
							} mb-0`}
						>
							{isProductOutOfStock()
								? 'Out Of Stock'
								: 'In Stock'}
						</p>
					</div>
					<div className={styles.desc}>
						<h2 className="mb-5 font-semibold text-lg">
							Product Description:
						</h2>
						{details !== undefined &&
							Object.keys(details).length > 0 && (
								<p className="text-left text-sm md:text-lg font-normal">
									{details.product_description}
								</p>
							)}
					</div>

					{product?.product_details?.enable_preorder && (
						<div className={styles.preorderInfo}>
							Please note that this product is to be preordered
							and{' '}
							<p style={{fontWeight: '700', color: '#000'}}>
								the expected release date is{' '}
								{new Date(
									product?.product_details?.preoder_date
								).toLocaleDateString('en-US', options)}{' '}
								{new Date(
									product?.product_details?.preoder_date
								).toLocaleString('en-US', timeOptions)}
							</p>
						</div>
					)}
					<div className={styles.padBottom1}></div>
					<div className={styles.priceSection}>
						<div className="flex flex-col">
							{/* FIXME: We need to refactor this properly */}
							{productPriceType === 'Make it Free' ? (
								<p
									style={{
										background: '#2DC071',
										padding: '.2rem 2.5rem',
										fontWeight: '700',
										fontSize: '1.125rem',
										color: '#fff',
									}}
									className={`mb-0`}
								>
									Free
								</p>
							) : (
								<>
									{/* {console.log(
										'productPriceType',
										productPriceType
									)} */}
									{/* Fixed price */}
									{/* {sellingPrice?.length > 0 && */}
									{productPriceType !==
										'Pay What You Want' && (
										<h1 className="text-xl md:text-3xl font-bold">
											{`${
												alreadyDefinedPrice?.currency_name ||
												convertedCurrency?.to_currency_name ||
												sellingPrice?.[0]?.currency_name
											} ${
												alreadyDefinedPrice?.price
													? alreadyDefinedPrice?.price
													: convertedCurrency?.buy_rate
													? formatPrice(
															convertedCurrency?.buy_rate *
																sellingPrice[0]
																	?.price
													  )
													: formatPrice(
															sellingPrice[0]
																?.price
													  )
											}  
                      `}
										</h1>
									)}

									{productPriceType ===
										'Pay What You Want' && (
										<h1 className="text-xl md:text-3xl font-bold">
											{`${
												alreadyDefinedPrice?.currency_name ||
												convertedCurrency?.to_currency_name ||
												getMinimumCurrency()
											} 
                  ${formatPrice(getMinimumPrice())}`}
										</h1>
									)}
									{originalPrice?.length > 0 &&
										productPriceType !==
											'Pay What You Want' && (
											<h2 className="text-xl line-through font-medium">{`${
												alreadyDefinedOriginalPrice?.currency_name ||
												convertedCurrency?.to_currency_name ||
												originalPrice[0]?.currency_name
											}  ${
												alreadyDefinedOriginalPrice?.price
													? alreadyDefinedOriginalPrice?.price
													: convertedCurrency?.buy_rate
													? formatPrice(
															convertedCurrency?.buy_rate *
																originalPrice[0]
																	?.price
													  )
													: originalPrice[0]?.price
											}`}</h2>
										)}
								</>
							)}
						</div>

						<Button
							onClick={getCheckoutLink}
							type="primary"
							disabled={isProductOutOfStock()}
							className={styles.preview_btn}
						>
							{product?.product_details?.enable_preorder
								? 'Preorder'
								: details !== undefined && details?.cta_button
								? details?.cta_button
								: 'Buy Now'}
						</Button>
					</div>
				</div>
			</div>

			<section className={styles.more}>
				<div className="mt-5 flex flex-col ">
					<h2 className="mb-7 pt-5 font-semibold text-lg md:text-lg lg:text-lg">
						More Details:
					</h2>
					{details !== undefined && Object.keys(details)?.length > 0 && (
						<div
							className={styles.moreDetails}
							dangerouslySetInnerHTML={{
								__html: details?.product_details,
							}}
						></div>
					)}
				</div>
			</section>
			<VerifiedModal {...{showModal, setShowModal}}>
				<VerifiedModalChildren />
			</VerifiedModal>

			<style>{`
        .ant-btn[disabled] {
            cursor: not-allowed;
            background: #bfbfbf !important;
            border: none;
            color: white;
        }
        .ant-btn[disabled]:hover{
          color: white;
        }
      `}</style>
		</div>
	);
}
const VerifiedModalChildren = () => {
	return (
		<div className={`${styles.modal} flex flex-col `}>
			<Image alt="" src={LargeVerificationIcon} />
			<h2 className={`text-center mt-3`}>Verified Account</h2>
			<h5 className={``}>
				This store is officially registered as a business on KreateSell.
				They have been verified and you can pay them using Paypal,
				Stripe, Cryptocurrency and other advanced payment options.{' '}
				<span role="link">Learn more...</span>
			</h5>
		</div>
	);
};

const VerifiedDrawerChildren = ({onClose}) => {
	return (
		<div className={`${styles.drawer} flex flex-col py-10`}>
			<Image alt="" src={MediumVerificationIcon} />
			<h2 className={`text-center mt-3`}>Verified Account</h2>
			<h5 className={``}>
				This store is officially registered as a business on KreateSell.
				They have been verified and you can pay them using Paypal,
				Stripe, Cryptocurrency and other advanced payment options.{' '}
				<span role="link">Learn more...</span>
			</h5>
			<div className={`${styles.buttonContainer} mt-5`} onClick={onClose}>
				<Button text="Got It" bgColor="white" />
			</div>
		</div>
	);
};

export function getServerSideProps({req, res}) {
	return {props: {token: req.cookies || ''}};
}
