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
import TelegramFloatingDiv from 'components/FloatingDivs/TelegramFloatingDiv';

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
				<TelegramFloatingDiv left="13%" top="50%" />
				<TabPane tab="Request" key="1">
					<Request
						hasRequestedAccess={
							product.affiliate_kreator_product
								.has_requested_access
						}
						productId={product.affiliate_kreator_product.id}
						updateProduct={updateProduct}
					/>
				</TabPane>
				<TabPane tab="Overview" key="2">
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
