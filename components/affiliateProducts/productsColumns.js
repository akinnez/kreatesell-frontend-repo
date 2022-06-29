import Performance from "components/affiliates/Performance";
import RequestAccessLink from "./components/RequestAccessLink";
import { dateString } from "utils/dateFormat";
import formatNumber from "utils/formatNumber";

const productsColumns = [
  {
    title: "Product",
    dataIndex: "product_name",
  },
  {
    title: "Kreator",
    dataIndex: "kreator_name",
    render: name => `${name || ""}`,
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
    title: "No of Sales",
    dataIndex: "total_affiliate_sales",
    render: sales => formatNumber(sales),
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
    render: percent => `${percent}%`,
  },
  {
    title: "Action",
    render: record => (
      <RequestAccessLink
        id={record.id}
        hasRequested={record.has_requested_access}
      />
    ),
    width: "130px",
  },
];

export default productsColumns;