import {HiOutlineExternalLink} from 'react-icons/hi';
import formatNumber from 'utils/formatNumber';
import productPriceFn from 'utils/productPriceFn';
import styles from './index.module.scss';

const KreatorProductDetails = ({stock, sold, productName, checkoutDetails}) => {
	const priceDetails = productPriceFn(checkoutDetails);

	return (
		<div className={styles.product_details}>
			<div className={styles.product__stats}>
				{stock && (
					<span
						className={
							stock === 'In Stock'
								? styles['product--in-stock']
								: stock === 'Out of Stock'
								? styles['product--out-of-stock']
								: styles.product__stock
						}
					>
						{stock}
					</span>
				)}
				{stock && sold > 0 && (
					<>
						&nbsp;&nbsp;
						<span className={styles.product__stats__divider}>
							|
						</span>
						&nbsp;&nbsp;
					</>
				)}
				{sold > 0 && (
					<span className={styles.product__sold}>
						{formatNumber(sold)} Sold
					</span>
				)}
			</div>
			<div className={styles.product__name}>{productName}</div>
			<div className={styles.product__price}>
				<span>
					{priceDetails ? (
						<>
							{priceDetails.currency}{' '}
							{formatNumber(priceDetails.price)}
						</>
					) : (
						'0.00'
					)}
				</span>
				<HiOutlineExternalLink />
			</div>
		</div>
	);
};

export default KreatorProductDetails;
