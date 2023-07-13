import {useRouter} from 'next/router';

import {Button} from 'antd';

import Performance from 'components/affiliates/Performance';
import styles from './index.module.scss';
import {RenderIf} from 'utils';

const ProductDetails = ({
	kreatorName,
	productType,
	currency,
	price,
	sold,
	visits,
	commission,
	productId = '',
}) => {
	const router = useRouter();
	return (
		<>
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
			<RenderIf condition={router.pathname.includes('market-place')}>
				<div className="my-5 text-center">
					<Button
						className={`${styles.viewProductBtn} px-5`}
						type="primary"
						htmlType="button"
						onClick={() =>
							router.push(
								`/account/affiliate/market-place/${productId}?activeTab=overview`
							)
						}
					>
						View Product
					</Button>
				</div>
			</RenderIf>
		</>
	);
};

export default ProductDetails;
