import { useState } from "react";
import Head from "next/head";
// import useSWR from "swr";
import { useSelector } from "react-redux";
import { Typography, Table } from "antd";
import AuthLayout from "components/authlayout";
import AffiliateFilters from "components/affiliates/AffiliateFilters";
// import Spinner from "components/Spinner";
import requestsColumns from "components/affiliateRequests/requestsColumns";
import { requestsData } from "components/affiliateRequests/data";
// import { showToast } from "utils";
// import axiosApi from "utils/axios";
import normalize from "utils/normalize";
import styles from "public/css/AffiliateRequests.module.scss";

const { Text } = Typography;
const rowKey = record => record.id;

const AffiliateRequests = () => {
  const [filtered, setFiltered] = useState(null);
  const { productTypes } = useSelector(state => state.product);
  // const dispatch = useDispatch();

  // const { data } = useSWR(
  //   () => {
  //     return user.is_affiliate
  //       ? `${process.env.BASE_URL}affiliate/get-products`
  //       : null;
  //   },
  //   url => {
  //     dispatch(affiliateProductsRequest());
  //     return axiosApi.request(
  //       "get",
  //       url,
  //       res => {
  //         dispatch(affiliateProductsSuccess(res.data));
  //         return res;
  //       },
  //       err => {
  //         showToast(err, "error");
  //         dispatch(affiliateProductsFailure());
  //       }
  //     );
  //   }
  // );

  const types = normalize(productTypes, "id");
  const columns = requestsColumns(types);

  return (
    <AuthLayout>
      <Head>
        <title>KreateSell | Affiliate Requests</title>
      </Head>

      <header className={styles.header}>
        <Text type="secondary" strong>
          Affiliate Offers
        </Text>
      </header>
      <AffiliateFilters data={requestsData} setFiltered={setFiltered} />
      <section className={styles.tableWrapper}>
        <Table
          dataSource={filtered || requestsData}
          columns={columns}
          pagination={{
            position: ["bottomLeft"],
            showSizeChanger: true,
            defaultPageSize: 5,
            responsive: true,
            showQuickJumper: true,
            pageSizeOptions: [5, 10, 20, 30, 40, 50, 100],
          }}
          rowKey={rowKey}
          loading={false}
        />
      </section>
    </AuthLayout>
  );
};

export default AffiliateRequests;
