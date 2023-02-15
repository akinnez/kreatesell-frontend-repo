import React, {useState, useEffect, useRef} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import router, {useRouter} from 'next/router';

import {Row, Col, Modal} from 'antd';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {
	FacebookShareButton,
	WhatsappShareButton,
	TwitterShareButton,
	EmailShareButton,
} from 'react-share';

import styles from 'public/css/checkoutSuccess.module.scss';
import {Button, Input} from 'components';
import {
	ZipFile,
	SuccessProduct,
	OtherProductsSuccess,
	ExternalLink2,
	SuccessCheck,
	DownloadIcon2,
	SuccessKreatesellLogo,
	UserPicture,
	CourseFileIcon,
	ErrorIcon,
	Copy2,
	FacebookIcon,
	TwitterIcon2,
	GmailIcon,
	ExternalLink,
	WhatsappIcon2,
	NoContentIcon,
} from 'utils';
import CloseIcon from 'components/affiliates/CloseIcon';
import Loader from 'components/loader';
import {PoweredByKS} from 'components/PoweredByKs';
import {CloudDownload} from 'utils/icons/CloudDownload';
import {FetchSingleStoreProduct, SetCheckoutDetails} from 'redux/actions';
import {showToast} from 'utils';
import {hashTagsWithHash, hashTagsWithoutHash} from 'utils/socialShareHashtags';

const AccessPageModal = ({
	showAccessPageModal,
	closeAccessPageModal,
	errorModal,
	product_id,
	setErrorModal,
	product,
}) => {
	const productLink = `${process.env.BASE_URL}v1/kreatesell/payment/access-product`;
	const [productDetails, setProductDetails] = useState({
		product_id,
		customer_email: '',
		customer_phone_number: '',
	});

	const handleDownload = (fileLink) => {
		// Split the file link to generate file name, extension
		let arr = fileLink.split('.');
		let extension = arr[arr.length - 1];
		fetch(fileLink, {
			method: 'GET',
			headers: {
				// TODO: set content file
				// 'Content-Type': 'image/pdf',
			},
		})
			.then((response) => response.blob())
			.then((blob) => {
				// Create blob link to download
				const url = window.URL.createObjectURL(new Blob([blob]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute(
					'download',
					`${product?.product_details?.product_name}.${extension}`
				);

				// Append to html link element page
				document.body.appendChild(link);

				// Start download
				link.click();

				// Clean up and remove the link
				link.parentNode.removeChild(link);
			});
	};

	const handleSubmit = async () => {
		// TODO: show toast or error message that there's no email
		setErrorModal(false);
		if (!productDetails?.customer_email) return;

		// TODO: validate email address
		try {
			const response = await axios.post(productLink, productDetails);
			const fileTobeDownloaded =
				response?.data?.product_dto?.product_images?.filter(
					(item) => item?.file_type_name === 'ContentZipFile'
				);
			handleDownload(fileTobeDownloaded[0]?.filename);
		} catch (error) {
			setErrorModal(true);
		} finally {
		}
	};

	const handleInputChange = (field, value) => {
		setProductDetails((prev) => ({...prev, [field]: value}));
	};

	return (
		<Modal
			title={null}
			footer={null}
			visible={showAccessPageModal}
			onCancel={() => closeAccessPageModal()}
			closeIcon={null}
			closable={true}
			width={595}
			onOk={() => {}}
			style={{top: 200}}
			// centered
		>
			<div className={styles.modal}>
				<header className={styles.header}>
					<h2 className="mb-3">
						Input your email address to get access.
					</h2>
					<p className="mb-3">
						Once you enter the email address used to purchase this
						product, you will be able to access it again.
					</p>
				</header>

				<div className={styles.modalBody}>
					<Input
						name="email"
						placeholder="Enter your email"
						label="Email address"
						height="small"
						onChange={(e) =>
							handleInputChange(
								'customer_email',
								e.currentTarget.value
							)
						}
						containerStyle={{width: '100%'}}
					/>

					{/* TODO: show for incorrect email */}
					{errorModal && (
						<div className={styles.preorder}>
							<h5 className="mb-2">
								This email address is incorrect
							</h5>
							<p className="mb-0">
								Check to make sure your email is correct before
								proceeding. You will only have access if you use
								the right email address.
							</p>
						</div>
					)}
					<Button
						type="button"
						text="Access Product"
						loading={false}
						disabled={false}
						bgColor="blue"
						style={{width: '100%'}}
						onClick={handleSubmit}
					/>
				</div>
			</div>
		</Modal>
	);
};

const Success = () => {
	const fetchSingleStoreProduct = FetchSingleStoreProduct();
	const [origin] = useState(() => {
		return typeof window !== 'undefined' && window.location.origin
			? window.location.origin
			: '';
	});
	const linkElement = useRef();
	// make call to get page details here
	const router = useRouter();

	const productId = router?.query?.productId;
	const storename = router?.query?.storename;

	const productLink = `${process.env.BASE_URL}v1/kreatesell/product/get/${productId}`;

	const [openShareModal, setOpenShareModal] = useState(false);
	const [productName, setProductName] = useState('');

	const [productDetailLoading, setProductDetailLoading] = useState(true);
	const [productsDetailLoading, setProductsDetailLoading] = useState(true);
	const [showAccessPageModal, setShowAccessPageModal] = useState(false);
	// store details
	const [storeDetails, setStoreDetails] = useState(null);
	// single product details
	const [product, setProduct] = useState(null);
	const [errorModal, setErrorModal] = useState(false);
	const {singleStoreProducts, defaultCurrency} = useSelector(
		(state) => state.product
	);

	useEffect(() => {
		if (storename !== undefined) {
			fetchSingleStoreProduct(
				storename,
				1,
				(response) => {
					setStoreDetails(response);
					// TODO: Start downloading
					setProductDetailLoading(false);
				},
				(err) => {
					setProductDetailLoading(false);
				}
			);
		}
	}, [storename]);

	const getProductDetails = async (productLink) => {
		try {
			const response = await axios.get(productLink);
			setProduct(response.data.data);
		} catch (error) {
			// console.log(error);
		} finally {
			setProductsDetailLoading(false);
		}
	};

	useEffect(() => {
		if (!!productId) {
			getProductDetails(productLink);
		}
	}, [productId]);

	const closeAccessPageModal = () => {
		setShowAccessPageModal(false);
		errorModal && setErrorModal(false);
	};

	const openAccessPageModal = () => {
		errorModal && setErrorModal(false);
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

	const handleModalOpen = (name) => {
		setProductName(name);
		setOpenShareModal(true);
	};

	const handleModalClose = () => {
		setOpenShareModal(false);
		setProductName('');
	};

	if (productDetailLoading || productsDetailLoading)
		return (
			<div
				style={{
					minHeight: '100vh',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Loader />
			</div>
		);
	return (
		<>
			{/* share page modal */}
			<Modal
				title={null}
				footer={null}
				visible={openShareModal}
				onCancel={handleModalClose}
				// maskClosable={false}
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
							subject={'You need to see this right away!'}
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
			{showAccessPageModal && (
				<AccessPageModal
					product_id={productId}
					{...{
						showAccessPageModal,
						closeAccessPageModal,
						errorModal,
						setErrorModal,
						product,
					}}
				/>
			)}
			<div className={styles.successContainer}>
				<nav>
					<div className={styles.emptyContainer}></div>
					<div className={styles.titleContainer}>
						<h3 className={`mb-0 ${styles.pageTitle}`}>
							{product?.product_details?.product_name}
						</h3>
					</div>
					<div className={styles.profileImageContainer}>
						<div className={styles.profileImage}>
							<Image
								src={
									product?.store_dto?.profile_pix ||
									UserPicture
								}
								width={'100%'}
								height={'100%'}
								alt="user profile picture"
							/>
						</div>
						<p className={'mb-0 ml-2'}>
							{storeDetails?.kreator_full_name}
						</p>
					</div>
				</nav>
				<div className={styles.body}>
					<section className={styles.successfulPurchase}>
						<div className={styles.successText}>
							<Image
								className={styles.icon}
								src={SuccessCheck}
								alt=""
							/>
							<h2 className={styles.header}>
								Thank you for your purchase!
							</h2>
							<p className={styles.description}>
								Your purchase was successful and a receipt will
								be sent to your mail.
							</p>
						</div>
						<div className={styles.item}>
							<Row gutter={[32, 32]} className={styles.hideCol}>
								<Col md={{span: 8}} span={8}>
									<ProductCard
										productDetails={product}
										kreatorDetails={
											storeDetails?.kreator_full_name
										}
									/>
								</Col>
								<Col md={{span: 16}} span={16}>
									<PurchaseSummaryCard
										handleClickAction={() =>
											setShowAccessPageModal(true)
										}
										productName={
											product?.product_details
												?.product_name
										}
										{...{product}}
									/>
								</Col>
							</Row>

							{/* mobiles */}
							<Row
								gutter={[32, 32]}
								className={styles.mobileItems}
							>
								<Col className={styles.mobileItemCol}>
									<ProductCard
										productDetails={product}
										kreatorDetails={
											storeDetails?.kreator_full_name
										}
									/>
								</Col>
							</Row>
							<Row
								gutter={[32, 32]}
								className={styles.mobileItems}
							>
								<Col className={styles.mobileItemCol}>
									<PurchaseSummaryCard
										handleClickAction={() =>
											setShowAccessPageModal(true)
										}
										productName={
											product?.product_details
												?.product_name
										}
										{...{product}}
									/>
								</Col>
							</Row>
							{/* mobiles */}
						</div>
					</section>
					{storeDetails?.store_details
						?.is_enable_product_cross_sell && (
						<section className={styles.otherProducts}>
							<h2 className={styles.headerText}>
								Other Products by the Kreator
							</h2>
							<div className="w-11/12 mx-auto lg:w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8 mb-8 pb-20 mt-6">
								{singleStoreProducts
									.filter(
										(productItem) =>
											productItem?.product_details
												?.product_name !==
											product?.product_details
												?.product_name
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
											<ProductCard2
												productDetails={productDetails}
												key={productDetails?.id}
												sellingPrice={sellingPrice}
												originalPrice={originalPrice}
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
						</section>
					)}
				</div>

				<PoweredByKS />
			</div>
		</>
	);
};

const ProductCard = ({productDetails, kreatorDetails}) => {
	const [productImage] = useState(() => {
		return productDetails?.product_images?.filter(
			(img) => img.file_type_name === 'Main'
		)[0];
	});

	return (
		<div className={styles.productCardContainer}>
			<Image
				className={`${styles.productImage} rounded-t-lg`}
				src={productImage?.filename}
				width="320"
				height="300"
				alt="product_image"
			/>
			<div className={styles.productDetails}>
				<p className={styles.productName}>
					{productDetails?.product_details?.product_name}
				</p>
				<div className={styles.profileImageContainer}>
					<div className={styles.profileImage}>
						<Image
							src={
								productDetails?.store_dto?.profile_pix ||
								UserPicture
							}
							width={'100%'}
							height={'100%'}
							alt="user profile picture"
						/>
					</div>
					<p className="mb-0 ml-2">{kreatorDetails}</p>
				</div>
			</div>
		</div>
	);
};

const ProductCard2 = ({
	productDetails,
	sellingPrice,
	originalPrice,
	storename,
	handleModalOpen,
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
			className={`bg-white w-full rounded-lg border ${styles.productCardCtn}`}
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

				<div className={`flex justify-between items-center pt-1`}>
					{productDetails?.product_price_type === 'Make it Free' ? (
						<p className={styles.makeItFreeText}>Free</p>
					) : productDetails?.product_price_type ===
					  'Pay What You Want' ? (
						<p
							className={`mb-0 text-base-gray ${styles.sellingPrice}`}
						>
							{productDetails?.default_currency?.currency}{' '}
							{productDetails.default_price}
						</p>
					) : (
						<div
							className={`flex justify-between items-center column ${styles.main}`}
						>
							<>
								<p
									className={`text-base-gray text-sm md:text-base mb-0 ${styles.sellingPrice}`}
								>
									{productDetails?.default_currency?.currency}
									{new Intl.NumberFormat().format(
										sellingPrice
									) || '0.00'}
								</p>

								{pricingType === 'Fixed Price' && (
									<p
										className={`text-base-gray  text-sm md:text-base originalPrice ${styles.originalPrice}`}
									>
										{
											productDetails?.default_currency
												?.currency
										}

										{new Intl.NumberFormat().format(
											originalPrice ??
												productDetails?.default_price
										) || '0.00'}
									</p>
								)}
							</>
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

const PurchaseSummaryCard = ({handleClickAction, productName, product}) => {
	const productId = router?.query?.productId;
	const productDetails = product?.product_details;
	const StoreDetails = product?.store_dto;
	const productSectionCount = product?.content_section_tracker;

	const handleClick = (action = 'download') => {
		if (action === 'download') {
			handleClickAction();
		} else if (action === 'viewCourse') {
			router.push(`/account/kreator/products/buyersPreview/${productId}`);
		}
	};

	const productType = product?.product_type_details;
	const contentZipFile = product?.product_images?.filter(
		(item) => item.file_type_name === 'ContentZipFile'
	);


	const getFileSize = () => {
		const numberSize = Number(
			product?.product_images[0]?.size.split('MB')[0]
		);
		if (numberSize < 1) {
			const kbSize = numberSize * 1000;
			return `${kbSize} KB`;
		}
		return `${product?.product_images[0]?.size}`;
	};

	return (
		<div className={styles.purchaseSummaryCardContainer}>
			<p className={styles.header}>Purchase Summary</p>
			{/* factor the condtion that equates to conetnt file existing and the product is digital download */}
			{contentZipFile.length > 0 &&
			product?.product_type_details === 'Digital Download' ? (
				<>
					<div className={`${styles.purchase} mb-2`}>
						<Image
							className={styles.purchaseIcon}
							src={ZipFile}
							// src={CourseFileIcon}
							height="80"
							width="80"
							alt=""
						/>
						<span className="">
							<div className={styles.top}>{productName}.zip</div>
							<div className={styles.bottom}>
								<div>
									<p className={styles.left}>
										{product?.product_images[0]?.size
											? getFileSize()
											: 'N/A'}
									</p>{' '}
									|
									{/* //TODO:
								Replace this with appropriate size */}
									<p className={styles.right}>
										{product?.default_currency?.currency}{' '}
										{product?.default_price}
									</p>
								</div>
								{/* TODO: don't show this button for preorder products */}
								{!productDetails?.enable_preorder && (
									<Button
										text="Download File"
										bgColor="blue"
										icon={<CloudDownload />}
										style={{padding: '1rem'}}
										className={styles.downloadBtn}
										disabled={!product?.product_images[1]}
										onClick={() => handleClick('download')}
									/>
								)}
							</div>
						</span>
					</div>

					{/* mobiles */}
					{!productDetails?.enable_preorder && (
						<Button
							text="Download File"
							bgColor="blue"
							icon={<CloudDownload />}
							style={{padding: '1rem'}}
							className={styles.downloadBtnMobile}
							disabled={!product?.product_images[1]}
							onClick={() => handleClick('download')}
						/>
					)}
					{/* mobiles */}
				</>
			) : product?.product_type_details === 'Membership' ? (
				<>
					<div className={`${styles.purchase} mb-2`}>
						<Image
							className={styles.purchaseIcon}
							src={CourseFileIcon}
							height="80"
							width="80"
							alt=""
						/>
						<span className="">
							<div className={styles.top}>{productName}</div>
							<div className={styles.bottom}>
								<div>
									<p
										className={styles.left}
									>{`${productSectionCount?.content_count} Sections, ${productSectionCount?.sub_section_count} Lectures`}</p>
									|
									<p className={styles.right}>
										{product?.default_currency?.currency}{' '}
										{product?.default_price}
									</p>
								</div>
								{/* TODO: don't show this button for preorder products */}
								{!productDetails?.enable_preorder && (
									<Button
										text="Access Course"
										bgColor="blue"
										icon={<CloudDownload />}
										style={{padding: '1rem'}}
										className={styles.downloadBtn}
										onClick={() =>
											handleClick('viewCourse')
										}
									/>
								)}
							</div>
						</span>
					</div>
					{/* mobiles */}
					{!productDetails?.enable_preorder && (
						<Button
							text="Access Course"
							bgColor="blue"
							icon={<CloudDownload />}
							style={{padding: '1rem'}}
							className={styles.downloadBtnMobile}
							onClick={() => handleClick('viewCourse')}
						/>
					)}
					{/* mobiles */}
				</>
			) : (
				<div className={styles.noContentPurchase}>
					<Image
						className={styles.purchaseIcon}
						src={NoContentIcon}
						height="120"
						width="120"
						alt=""
					/>
					<div className={styles.noContentText}>
						Content File is Unavailable
					</div>
				</div>
			)}
			<br />
			<hr />
			<br />

			{productDetails?.enable_preorder && (
				<div className={styles.preorder2}>
					Thank you for your preorder.{' '}
					<span>
						The expected release date is{' '}
						{productDetails?.preoder_date}
					</span>
				</div>
			)}

			{contentZipFile?.length === 0 &&
				productType === 'Digital Download' && (
					<div className={styles.error}>
						<Image src={ErrorIcon} alt="" />
						This content file is unavailable. Please reach out to
						the{' '}
						<Link href={`mailto:${StoreDetails?.store_email}`}>
							Kreator
						</Link>{' '}
						for more details.
					</div>
				)}
		</div>
	);
};
export default Success;
