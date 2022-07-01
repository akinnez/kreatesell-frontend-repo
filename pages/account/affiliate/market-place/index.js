import Head from "next/head";
import { useSelector } from "react-redux";
import AuthLayout from "components/authlayout";
import KreatorDashboard from "components/account-dashboard/KreatorDashboard";
import AffiliatePageLayout from "components/affiliates/AffiliatePageLayout";
import BecomeAnAffiliate from "components/affiliateProducts/components/BecomeAnAffiliate";
import RequestAccessLink from "components/affiliateProducts/components/RequestAccessLink";
import productsColumns from "components/affiliateProducts/productsColumns";
import useAffiliateFilters from "components/affiliates/hooks/useAffiliateFilters";
import useFetcher from "components/affiliates/hooks/useFetcher";
import { isAnEmpytyObject } from "utils";
import dataLoading from "utils/dataLoading";

const AffiliateProducts = () => {
  const { user } = useSelector(state => state.auth);
  const { store } = useSelector(state => state.store);
  const { url, filters, setFilters } = useAffiliateFilters(
    "affiliate/get-products"
  );
  const { products, loading, setLoading, response, error, isValidating } =
    useFetcher(user, url);

  const isLoading = dataLoading({
    products: products.data,
    loading,
    response,
    error,
    isValidating,
  });

  return (
    <AuthLayout headerTitle={!user.is_affiliate ? "Dashboard" : ""}>
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
          products={products}
          isLoading={isLoading}
          setLoading={setLoading}
          title="Market Place"
          totalSales={store.total_sales_till_date}
          filters={filters}
          setFilters={setFilters}
          columns={productsColumns}
          component={RequestAccessLink}
          dataKey="has_requested_access"
        />
      )}
    </AuthLayout>
  );
};

export default AffiliateProducts;
