import Head from 'next/head';
import {useSelector} from 'react-redux';
import AuthLayout from 'components/authlayout';
import AffiliatePageLayout from 'components/affiliates/AffiliatePageLayout';
import GetLink from 'components/affiliateRequests/components/GetLink';
import useAffiliateFilters from 'components/affiliates/hooks/useAffiliateFilters';
import useFetcher from 'components/affiliates/hooks/useFetcher';
import requestsColumns from 'components/affiliateRequests/requestsColumns';
import dataLoading from 'utils/dataLoading';

const AffiliateRequests = () => {
	const {user} = useSelector((state) => state.auth);
	const {store} = useSelector((state) => state.store);

	const {url, filters, setFilters} = useAffiliateFilters(
		'affiliate/get-requested-products'
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

	return (
		<AuthLayout>
			<Head>
				<title>KreateSell | Affiliate Requests</title>
			</Head>
			<AffiliatePageLayout
				products={products}
				isLoading={isLoading}
				setLoading={setLoading}
				title="Affiliate Offers"
				totalSales={store.total_sales_till_date}
				filters={filters}
				setFilters={setFilters}
				component={GetLink}
				columns={requestsColumns}
				statusKey="request_status"
				productKey="product_id"
				showStatus
			/>
		</AuthLayout>
	);
};

export default AffiliateRequests;
