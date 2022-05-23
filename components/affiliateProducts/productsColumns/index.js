import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
import Performance from "components/affiliates/Performance";
import { dateString } from "utils/dateFormat";
import formatNumber from "utils/formatNumber";
import styles from "./index.module.scss";

const productsColumns = types => [
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
    dataIndex: "product_type_id",
    render: typeId => types[typeId]?.product_type_name,
  },
  {
    title: "Launch Date",
    dataIndex: "date_created",
    render: dateStr => dateString(dateStr),
    sorter: (a, b) => new Date(a.date_created) - new Date(b.date_created),
    sortDirections: ["descend", "ascend", "descend"],
  },
  {
    title: "No of Sales",
    dataIndex: "total_affiliate_sales",
    render: sales => formatNumber(sales),
    sorter: (a, b) => a.number_of_sales - b.number_of_sales,
    sortDirections: ["descend", "ascend", "descend"],
  },
  {
    title: "Performance",
    dataIndex: "",
    render: (_, record) => (
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
    dataIndex: "",
    render: (_, record) => (
      <div className={styles.request__link}>
        {!record.has_requested_access ? (
          <Link
            href={{
              pathname: "/account/affiliate/market-place/[pId]",
              query: {
                pId: record.id,
                "product-name": record.product_name,
                "product-type": record.product_type_id,
              },
            }}
          >
            <a>
              Request Access&nbsp;
              <AiOutlineArrowRight />
            </a>
          </Link>
        ) : (
          <a disabled>
            Request Access&nbsp;
            <AiOutlineArrowRight />
          </a>
        )}
      </div>
    ),
    width: "130px",
  },
];

export default productsColumns;
