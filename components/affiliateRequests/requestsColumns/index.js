import Link from "next/link";
import { Tag } from "antd";
import { MdOutlineLink } from "react-icons/md";
import Performance from "components/affiliates/Performance";
import { dateString } from "utils/dateFormat";
import formatNumber from "utils/formatNumber";
import styles from "./index.module.scss";

const requestsColumns = types => [
  {
    title: "Product",
    dataIndex: "product_name",
  },
  {
    title: "Product Type",
    dataIndex: "product_type",
    render: productTypeId => types[productTypeId]?.product_type_name,
  },
  {
    title: "Launch Date",
    dataIndex: "date_created",
    render: dateStr => dateString(dateStr),
    sorter: (a, b) => new Date(a.date_created) - new Date(b.date_created),
    sortDirections: ["descend", "ascend", "descend"],
  },
  {
    title: "Sales Price",
    dataIndex: "sales_price",
    render: (_, record) => {
      return `${record.currency} ${formatNumber(record.sales_price)}`;
    },
  },
  {
    title: "Performance",
    dataIndex: "performance",
    render: performance => (
      <Performance sold={performance.sold} visit={performance.visit} />
    ),
  },
  {
    title: "Commission (%)",
    dataIndex: "commission",
    render: commission => `${commission}%`,
  },
  {
    title: "Request Status",
    dataIndex: "status",
    render: status => (
      <>
        {status === "Approved" ? (
          <Tag color="green">{status}</Tag>
        ) : status === "Declined" ? (
          <Tag color="red">{status}</Tag>
        ) : status === "Pending" ? (
          <Tag color="orange">{status}</Tag>
        ) : (
          <Tag>{status}</Tag>
        )}
      </>
    ),
  },
  {
    title: "Actions",
    render: (_, record) => (
      <>
        {record.status === "Approved" ? (
          <Link href={`/account/affiliate/requests/${record.id}`}>
            <a className={styles.link}>
              Get Link&nbsp; <MdOutlineLink />
            </a>
          </Link>
        ) : (
          <a className={styles.link} disabled>
            Get Link&nbsp; <MdOutlineLink />
          </a>
        )}
      </>
    ),
  },
];

export default requestsColumns;
