import {useMemo} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {Tabs} from 'antd';
import ProfileLayout from 'components/ProfileLayout';
import ProfilePageError from 'components/ProfilePageError';
import ProfilePageLoading from 'components/ProfilePageLoading';
import AffiliateRequestContainer from 'components/affiliates/AffiliateRequestContainer';
import AffiliateLink from 'components/affiliateRequests/components/AffiliateLink';
import Overview from 'components/affiliates/Overview';
import PromotionalMaterials from 'components/affiliateRequests/components/PromotionalMaterials';
import useFetchData from 'hooks/useFetchData';
import TelegramFloatingDiv from 'components/FloatingDivs/TelegramFloatingDiv';
import Loader from 'components/loader';

const {TabPane} = Tabs;

const AffiliateRequestLinK = () => {
	const router = useRouter();

	const {
		affiliateLink: product,
		salesPage,
		error,
	} = useFetchData(
		router.query.pId && router?.query?.requiresApproval
			? `${process.env.BASE_URL}affiliate/get-products-by-id/${router.query.pId}?requiresApproval=${router.query?.requiresApproval}`
			: null
	);

	const productFiles = useMemo(() => {
		if (!product || product.kreator_product_files.length === 0) return null;

		const files = product.kreator_product_files.reduce((fileObj, file) => {
			if (file.file_type === 4) {
				fileObj.promotionalMaterial = file.filename;
			} else if (file.file_type === 1) {
				fileObj.images = file.filename;
			}

			return fileObj;
		}, {});

		const promotionalMaterial = files.promotionalMaterial || null;
		const images = files.images ? files.images.split(',') : null;

		return {images, promotionalMaterial};
	}, [product]);

	if (error) {
		return (
			<ProfilePageError
				errorMsg={error}
				title="Affiliate Request Overview"
			/>
		);
	}

	if (!product) {
		return <ProfilePageLoading title="Affiliate Request Overview" />;
	}

	return (
		<ProfileLayout>
			<Head>
				<title>KreateSell | Affiliate Request Overview</title>
			</Head>
			<AffiliateRequestContainer
				productTypeId={
					product.affiliate_kreator_product.product_type_id
				}
				productName={product.affiliate_kreator_product.product_name}
			>
				<TelegramFloatingDiv left="13%" top="50%" />
				<TabPane tab="Affiliate Link" key="1">
					<>
						{salesPage === undefined ? (
							<>
								<Loader />{' '}
							</>
						) : (
							<AffiliateLink
								affiliateLink={product.affiliate_link}
								{...{salesPage, product}}
							/>
						)}
					</>
				</TabPane>
				<TabPane tab="Overview" key="2">
					<Overview
						productImages={productFiles?.images}
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
				<TabPane tab="Promotional Materials/Bonus" key="3">
					<PromotionalMaterials
						productFile={productFiles?.promotionalMaterial}
					/>
				</TabPane>
			</AffiliateRequestContainer>
		</ProfileLayout>
	);
};

export default AffiliateRequestLinK;
