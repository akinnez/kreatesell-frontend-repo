import Link from 'next/link';
import {useRouter} from 'next/router';
import Image from 'next/image';
import {useEffect} from 'react';

import {Pagination, Input} from 'antd';
import {useSelector} from 'react-redux';
import {MdSearch} from 'react-icons/md';

import styles from '../../public/css/product-store.module.scss';
import {ArrowLeft, StoryTellingPNG, ExternalLink} from 'utils';
import {Button, Select} from 'components';
import Logo, {MobileLogo} from 'components/authlayout/logo';
import {currencyOptions} from 'components/account-dashboard/partials';
import {ProtectedStoreHeader} from 'components/store/storeHeader';
import {FetchSingleStoreProduct, SetCheckoutDetails} from 'redux/actions';
import {Logout} from 'redux/actions';
import {PoweredByKS} from 'components/PoweredByKs';

const StorePage = () => {
	const router = useRouter();
	const fetchSingleStoreProduct = FetchSingleStoreProduct();

	const {
		query: {storename},
	} = router;

	// console.log("storename = ", storename);
	const {
		singleStoreDetails,
		singleStoreProducts,
		singleStorePaginationDetails: pagination,
	} = useSelector((state) => state.product);

	const handlePaginationChange = (page) => {
		fetchSingleStoreProduct(storename, page);
	};

	const logout = Logout();
	useEffect(() => {
		if (storename !== undefined) {
			fetchSingleStoreProduct(storename);
		}
	}, [storename]);

	// console.log('singleStoreProducts = ', singleStoreProducts)

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

				<div className="w-4/5 flex justify-end">
					<div className="w-30 mr-4">
						<Input
							style={{borderRadius: '8px', height: '100%'}}
							prefix={<MdSearch />}
							placeholder="Click here to Search"
							onChange={() => {}}
						/>
					</div>
					<div className="w-20 mr-4">
						<Select options={currencyOptions} border="none" />
					</div>

					<div onClick={() => router.push('/login')} className="pr-5">
						<Button text="Login" bgColor="white" />
					</div>
					<div onClick={() => router.push('/signup')}>
						<Button text="Signup" bgColor="blue" />
					</div>
				</div>
			</nav>

			<nav className="bg-white lg:hidden flex items-center px-4">
				<div className="w-30">
					<Link href="/">
						<a className="">
							<MobileLogo />
						</a>
					</Link>
				</div>

				<div className="w-70 flex justify-end items-center mx-auto">
					<div className={styles.select}>
						<Select options={currencyOptions} border="none" />
					</div>

					<div onClick={() => logout()}>
						<Button text="logout" bgColor="blue" />
					</div>
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
									item?.currency_name === 'NGN' &&
									item?.price_indicator === 'Selling'
							);

						const sellingPrice = countrySale?.price;
						const originalSetting =
							productDetails?.check_out_details?.find(
								(item) =>
									item?.currency_name === 'NGN' &&
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
}) => {
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

	console.log('productDetails  = ', productDetails);

	const imageRendered =
		productDetails?.product_images?.[1]?.filename ||
		productDetails?.product_images?.[0]?.filename ||
		(productDetails?.product_images?.[1]?.filename?.includes(',') &&
			productDetails?.product_images?.[1]?.filename?.split(',')[0]) ||
		(productDetails?.product_images?.[0]?.filename?.includes(',') &&
			productDetails?.product_images?.[0]?.filename?.split(',')[0]);

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
			return `${itemsLeft} left`;
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
					// * works for taslim1 and PM but not taslim
					// src={imageRendered || StoryTellingPNG}
					// * works for taslim and taslim1 and shows default for PM
					// src={imageShown === undefined ? StoryTellingPNG : imageShown}
					//* works for ALL
					src={
						imageShown === undefined
							? imageRendered || StoryTellingPNG
							: imageShown
					}
					width="320"
					height="300"
					className="rounded-t-lg"
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
			<div className="w-full px-2 md:px-4">
				{/* <p className={`pt-2 text-sm md:text-base ${styles.productName}`}> */}
				<p className={`pt-2 mb-1 text-sm md:text-base `}>
					{productDetails?.product_details?.product_name}
				</p>

				<div className={`flex justify-between items-center pb-4`}>
					<div
						className={`flex justify-between items-center pb-4 column ${styles.main}`}
					>
						<p
							className={`text-base-gray text-sm md:text-base mb-0 ${styles.sellingPrice}`}
						>
							{productDetails?.default_currency}
							{new Intl.NumberFormat().format(sellingPrice) ??
								'0.00'}
						</p>
						<p
							className={`text-base-gray  text-sm md:text-base originalPrice ${styles.originalPrice}`}
						>
							{productDetails?.default_currency}
							{new Intl.NumberFormat().format(
								originalPrice ?? productDetails?.default_price
							) ?? '0.00'}
						</p>
					</div>

					{/* <Button
						text={
							productDetails?.product_details?.cta_button ??
							'Buy Now'
						}
						className={styles.productCardBtn}
						onClick={(e) => {
							e.stopPropagation();
							// router.push('/checkout')
							// console.log('CTA Clicked!');
							router.push(
								`/checkout/${productDetails?.product_details?.kreasell_product_id}`
							);
							setCheckoutDetails(productDetails);
						}}
					/> */}
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
