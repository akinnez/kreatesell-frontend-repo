import Image from 'next/image';
import {useRouter} from 'next/router';

import {Spin} from 'antd';

import styles from '../../../public/css/product-store.module.scss';
import {ExternalLink} from 'utils';

/**
 *
 * @param {*} CLink
 * @description - adds image transformations to the cloudinary link
 * @returns
 */
function formatCloudinaryImage(CLink) {
	if (CLink.includes('res.cloudinary.com')) {
		let linkarr = CLink.split('/');
		linkarr.splice(6, 0, 'q_auto:low');
		return linkarr.join('/');
	}
	return CLink;
}
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
			predefinedAmount = productDetails?.check_out_details?.find(
				(det) =>
					det?.price_indicator === priceType &&
					det?.currency_name === targetCurrency
			);
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
					src={formatCloudinaryImage(imageShown)}
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

export default ProductCard;
