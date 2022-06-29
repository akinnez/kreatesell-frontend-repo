import Head from "next/head";
import { useSelector } from "react-redux";
import AuthLayout from "components/authlayout";
import AffiliatePageLayout from "components/affiliates/AffiliatePageLayout";
import GetLink from "components/affiliateRequests/components/GetLink";
import useAffiliateFilters from "components/affiliates/hooks/useAffiliateFilters";
import useFetcher from "components/affiliates/hooks/useFetcher";
import requestsColumns from "components/affiliateRequests/requestsColumns";

const AffiliateRequests = () => {
  const { user } = useSelector(state => state.auth);

  const { url, filters, setFilters } = useAffiliateFilters(
    "affiliate/get-requested-products"
  );

  const [requests, error] = useFetcher(user, url);

  return (
    <AuthLayout>
      <Head>
        <title>KreateSell | Affiliate Requests</title>
      </Head>
      <AffiliatePageLayout
        products={requests}
        error={error}
        title="Affiliate Offers"
        filters={filters}
        setFilters={setFilters}
        component={GetLink}
        columns={requestsColumns}
        dataKey="request_status"
      />
    </AuthLayout>
  );
};

export default AffiliateRequests;
