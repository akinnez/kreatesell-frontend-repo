import Performance from 'components/affiliates/Performance';
import styles from './index.module.scss';

const ProductDetails = ({
	kreatorName,
	productType,
	currency,
	price,
	sold,
	visits,
	commission,
}) => (
	<ol>
		<li className={styles.product__detail}>
			<strong>Kreator</strong>
			<span>{kreatorName}</span>
		</li>
		<li className={styles.product__detail}>
			<strong>Product Type</strong>
			<span>{productType}</span>
		</li>
		<li className={styles.product__detail}>
			<strong>Price</strong>
			<span>
				{currency} {price}
			</span>
		</li>
		<li
			className={`${styles.product__detail} ${styles.product__performance}`}
		>
			<strong>Performance</strong>
			<span>
				<Performance sold={sold} visits={visits} />
			</span>
		</li>
		<li className={styles.product__detail}>
			<strong>Commission (%)</strong>
			<span>{commission}%</span>
		</li>
	</ol>
);

export default ProductDetails;
