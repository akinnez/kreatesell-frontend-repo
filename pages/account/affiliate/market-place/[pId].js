import {useMemo} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {Tabs} from 'antd';
import ProfileLayout from 'components/ProfileLayout';
import ProfilePageError from 'components/ProfilePageError';
import ProfilePageLoading from 'components/ProfilePageLoading';
import AffiliateRequestContainer from 'components/affiliates/AffiliateRequestContainer';
import Request from 'components/affiliateProducts/components/Request';
import Overview from 'components/affiliates/Overview';
import useFetchData from 'hooks/useFetchData';
import productImageFn from 'utils/productImageFn';

const {TabPane} = Tabs;

const AffiliateProductRequest = () => {
	const router = useRouter();

	const {
		affiliateLink: product,
		setAffiliateLink: setData,
		error,
	} = useFetchData(
		router.query.pId
			? `${process.env.BASE_URL}affiliate/get-products-by-id/${router.query.pId}`
			: null
	);

	const productImages = useMemo(() => {
		if (!product) return null;
		return productImageFn(product.kreator_product_files);
	}, [product]);

	if (error) {
		return (
			<ProfilePageError
				errorMsg={error}
				title="Affiliate Product Request"
			/>
		);
	}

	if (!product)
		return <ProfilePageLoading title="Affiliate Product Request" />;

	const updateProduct = () => {
		setData((state) => ({
			...state,
			affiliate_kreator_product: {
				...state.affiliate_kreator_product,
				has_requested_access: true,
			},
		}));
	};

	// console.log('product', product.affiliate_kreator_product);
	return (
		<ProfileLayout>
			<Head>
				<title>KreateSell | Affiliate Product Request</title>
			</Head>
			<AffiliateRequestContainer
				productTypeId={
					product.affiliate_kreator_product.product_type_id
				}
				productName={product.affiliate_kreator_product.product_name}
			>
				<TabPane tab="Request" key="request">
					<Request
						hasRequestedAccess={
							product.affiliate_kreator_product
								.has_requested_access
						}
						isRevoked={
							product.affiliate_kreator_product
								?.request_status === 'Revoked'
						}
						productId={product.affiliate_kreator_product.id}
						updateProduct={updateProduct}
					/>
				</TabPane>
				<TabPane tab="Overview" key="overview">
					<Overview
						productImages={productImages}
						productName={
							product.affiliate_kreator_product.product_name
						}
						productDescription={
							product.affiliate_kreator_product
								.product_description
						}
						productPriceDetails={
							product.kreator_product_price_details
						}
						productAffiliateCommission={Math.abs(
							product.affiliate_kreator_product
								.affiliate_percentage_on_sales
						)}
						kreatorName={product.kreator_user_details.full_name}
						kreatorImage={
							product.kreator_user_details.profile_image
						}
						kreatorBio={
							product.kreator_user_details.store_description
						}
						storeName={product.kreator_user_details.store_name}
					/>
				</TabPane>
			</AffiliateRequestContainer>
		</ProfileLayout>
	);
};

export default AffiliateProductRequest;
