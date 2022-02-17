import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
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
    render: name => `${name || "Kreator Name"}`,
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
  },
  {
    title: "No of Sales",
    dataIndex: "number_of_sales",
    render: sales => formatNumber(sales || 10),
  },
  {
    title: "Performance",
    dataIndex: "",
    render: (_, record) => (
      <>
        <div>
          <span className={styles.sold}>Sold:</span> {record.sold || 200}
        </div>
        <div>
          <span className={styles.visit}>Visit:</span> {record.visit || 50}
        </div>
      </>
    ),
  },
  {
    title: "Commission",
    dataIndex: "affiliate_percentage_on_sales",
    render: percent => `${percent || 0}%`,
  },
  {
    title: "Action",
    dataIndex: "",
    render: (_, record) => (
      <div className={styles.request__link}>
        <Link href={`/account/affiliate/products/${record.id}`}>
          <a>
            Request Access&nbsp;
            <AiOutlineArrowRight />
          </a>
        </Link>
      </div>
    ),
  },
];

export default productsColumns;
