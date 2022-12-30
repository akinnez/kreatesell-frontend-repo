import Link from 'next/link';
import {useRouter} from 'next/router';
import {Card, Typography, Divider} from 'antd';
import RenderQuillHTML from 'components/RenderQuillHTML';
import ProfilePageError from 'components/ProfilePageError';
import ProfilePageLoading from 'components/ProfilePageLoading';
import PageWrapper from 'components/affiliates/PageWrapper';
import ProductImages from 'components/affiliateProductPreview/ProductImages';
import ProductKreator from 'components/affiliateProductPreview/ProductKreator';
import AffiliatePageFooter from 'components/affiliates/AffiliatePageFooter';
import useFetchData from 'hooks/useFetchData';
import formatNumber from 'utils/formatNumber';
import productPriceFn from 'utils/productPriceFn';
import styles from 'public/css/AffiliateProductPreview.module.scss';

const {Title} = Typography;

const ProductPreview = () => {
	const router = useRouter();

	const {data: product, error} = useFetchData(
		router.query.id
			? `${process.env.BASE_URL}affiliate/get-products-by-id/${router.query.id}`
			: null
	);

	if (error) {
		return <ProfilePageError errorMsg={error} title="Product Preview" />;
	}

	if (!product) return <ProfilePageLoading title="Product Preview" />;

	const productPrice = productPriceFn(product.kreator_product_price_details);

	return (
		<PageWrapper title="Product Preview">
			<article className={styles.product}>
				<Card className={styles.product__card}>
					<section className={styles.product__header}>
						<div className={styles.product__images}>
							<ProductImages
								productName={
									product.affiliate_kreator_product
										.product_name
								}
								productFiles={product.kreator_product_files}
							/>
						</div>
						<div className={styles.product__info}>
							<Title level={1}>
								{product.affiliate_kreator_product.product_name}
							</Title>
							<ProductKreator
								kreatorImage={
									product.kreator_user_details.profile_image 
								}
								kreatorName={
									product.kreator_user_details.full_name
								}
								storeName={
									product.kreator_user_details.store_name
								}
							/>
							<Divider className={styles.divider} />
							<div className={styles.product__description}>
								<Title level={2}>Product Description</Title>
								<p>
									{
										product.affiliate_kreator_product
											.product_description
									}
								</p>
							</div>
							<Divider />
							{productPrice && (
								<div className={styles.product__checkout}>
									<strong>
										{productPrice.currency}{' '}
										{formatNumber(productPrice.price)}
									</strong>
									<Link href="/checkout">
										<a>Buy Now</a>
									</Link>
								</div>
							)}
						</div>
					</section>
					<section className={styles.product__details}>
						<Title level={2}>More Details:</Title>
						<RenderQuillHTML
							html={
								product.affiliate_kreator_product
									.product_details
							}
						/>
					</section>
				</Card>
			</article>
			<AffiliatePageFooter />
		</PageWrapper>
	);
};

export default ProductPreview;
