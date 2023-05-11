import Head from 'next/head';
import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import AuthLayout from 'components/authlayout';
import KreatorDashboard from 'components/account-dashboard/KreatorDashboard';
import AffiliatePageLayout from 'components/affiliates/AffiliatePageLayout';
import BecomeAnAffiliate from 'components/affiliateProducts/components/BecomeAnAffiliate';
import RequestAccessLink from 'components/affiliateProducts/components/RequestAccessLink';
import productsColumns from 'components/affiliateProducts/productsColumns';
import useAffiliateFilters from 'components/affiliates/hooks/useAffiliateFilters';
import useFetcher from 'components/affiliates/hooks/useFetcher';
import {isAnEmpytyObject} from 'utils';
import dataLoading from 'utils/dataLoading';

const AffiliateProducts = () => {
	const {user} = useSelector((state) => state.auth);
	const {store} = useSelector((state) => state.store);
	const storeChanged = Object.keys(store).length;
	const {url, filters, setFilters} = useAffiliateFilters(
		'affiliate/get-products'
	);
	const {products, loading, setLoading, response, error, isValidating} =
		useFetcher(user, url);

	const isLoading = dataLoading({
		products: products.data,
		loading,
		response,
		error,
		isValidating,
	});

	/**
	 * @returns string - Price of the product
	 * @params - priceType(can be "Fixed Price" or "Pay what you want"), checkoutDetails
	 * @type - (priceType: string, checkoutDetails: []) => string;
	 */
	const returnPrice = (priceType = 'Fixed Price', checkoutDetails = []) => {
		let price;
		if (priceType?.toLowerCase() === 'fixed price') {
			price = checkoutDetails.find(
				(detail) => detail?.price_indicator === 'Selling'
			);
		} else if (priceType?.toLowerCase() === 'pay what you want') {
			price = checkoutDetails.find(
				(detail) => detail?.price_indicator === 'Minimum'
			);
		}
		return price?.price || 0;
	};

	const memoisedProducts = useMemo(() => {
		if (products?.data?.length > 0 && Object.keys(store).length > 0) {
			return {
				...products,
				data: products?.data?.map((product) => {
					return {
						...product,
						affiliateSales: product?.total_affiliate_sales,
						price: returnPrice(
							product.product_price_type,
							product?.check_out_details
						),
					};
				}),
			};
		}
		return [{data: [], total: 0}];
	}, [products, store]);

	return (
		<AuthLayout headerTitle={!user.is_affiliate ? 'Dashboard' : ''}>
			<Head>
				<title>KreateSell | Affiliate Market Place</title>
			</Head>
			{isAnEmpytyObject(user) ? null : !user.is_affiliate ? (
				<>
					<KreatorDashboard />
					<BecomeAnAffiliate />
				</>
			) : (
				<AffiliatePageLayout
					products={memoisedProducts}
					isLoading={isLoading}
					setLoading={setLoading}
					title="Market Place"
					totalSales={store.total_sales_till_date}
					filters={filters}
					setFilters={setFilters}
					columns={productsColumns}
					component={RequestAccessLink}
					statusKey="has_requested_access"
					productKey="id"
				/>
			)}
		</AuthLayout>
	);
};

export default AffiliateProducts;
