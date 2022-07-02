import Tags from "components/Tags";
import Performance from "components/affiliates/Performance";
import { dateString } from "utils/dateFormat";
import formatNumber from "utils/formatNumber";
import productPriceFn from "utils/productPriceFn";
import GetLink from "./components/GetLink";

const requestsColumns = [
  {
    title: "Product",
    dataIndex: "product_name",
  },
  {
    title: "Product Type",
    dataIndex: "product_type_name",
  },
  {
    title: "Launch Date",
    dataIndex: "launch_date",
    render: dateStr => dateString(dateStr),
  },
  {
    title: "Sales Price",
    render: record => {
      const priceDetails = productPriceFn(record.kreator_product_price_details);
      return !priceDetails
        ? 0
        : `${priceDetails.currency} ${formatNumber(priceDetails.price)}`;
    },
  },
  {
    title: "Performance",
    render: record => (
      <Performance
        sold={record.total_sold}
        visits={record.total_product_visits}
      />
    ),
  },
  {
    title: "Commission (%)",
    dataIndex: "affiliate_percentage_on_sales",
    render: commission => `${commission}%`,
  },
  {
    title: "Request Status",
    dataIndex: "request_status",
    render: status => (
      <>
        {status === "Approved" ? (
          <Tags color="green">{status}</Tags>
        ) : status === "Declined" ? (
          <Tags color="red">{status}</Tags>
        ) : status === "Pending" ? (
          <Tags color="orange">{status}</Tags>
        ) : (
          <Tags>{status}</Tags>
        )}
      </>
    ),
  },
  {
    title: "Actions",
    render: record => (
      <GetLink status={record.request_status} productId={record.product_id} />
    ),
    width: "97px",
  },
];

export default requestsColumns;