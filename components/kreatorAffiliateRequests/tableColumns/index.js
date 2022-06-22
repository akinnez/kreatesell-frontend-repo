import Image from "next/image";
import { Button } from "antd";
import Tags from "components/Tags";
import DropDown from "../components/DropDown";
import PopOver from "../components/PopOver";
import { dateString } from "utils/dateFormat";
import formatNumber from "utils/formatNumber";
import ReadImg from "public/images/note_read.png";
import UnreadImg from "public/images/note_unread.png";
import styles from "./index.module.scss";

const tableColumns = (showReportModal, showActionModal, showNoteModal) => [
  {
    title: "Affiliate",
    dataIndex: "",
    render: (_, record) => (
      <PopOver record={record} showReportModal={showReportModal} />
    ),
  },
  {
    title: "Product",
    dataIndex: "product_name",
  },
  {
    title: "Product Type",
    dataIndex: "product_type",
  },
  {
    title: "Request Date",
    dataIndex: "request_date",
    render: dateStr => dateString(dateStr),
    sorter: (a, b) => new Date(a.request_date) - new Date(b.request_date),
    sortDirections: ["descend", "ascend", "descend"],
  },
  {
    title: "No of Sales",
    dataIndex: "number_of_sales",
    render: sales => formatNumber(sales),
    sorter: (a, b) => a.number_of_sales - b.number_of_sales,
    sortDirections: ["descend", "ascend", "descend"],
  },
  {
    title: "Notes",
    dataIndex: "notes",
    render: (_, record) => (
      <Button
        onClick={() => showNoteModal(record.notes)}
        shape="circle"
        className={styles.notes__btn}
      >
        {record.note_flag === "Unread" ? (
          <Image src={UnreadImg} alt="Unread Image" />
        ) : (
          <Image src={ReadImg} alt="Read Image" />
        )}
      </Button>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    render: status => (
      <>
        {status === "Approved" ? (
          <Tags color="green">{status}</Tags>
        ) : status === "Pending" ? (
          <Tags color="orange">{status}</Tags>
        ) : status === "Declined" ? (
          <Tags color="red">{status}</Tags>
        ) : (
          <Tags>{status}</Tags>
        )}
      </>
    ),
  },
  {
    title: "Request Action",
    dataIndex: "",
    render: (_, record) => (
      <DropDown record={record} showActionModal={showActionModal} />
    ),
    width: "140px",
  },
];

export default tableColumns;
