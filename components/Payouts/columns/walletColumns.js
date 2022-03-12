import Tags from "components/Tags";
import dateFormat from "utils/dateFormat";

export const walletColumns = [
  { title: "Amount Withdrawn", dataIndex: "amount" },
  { title: "Description", dataIndex: "description" },
  {
    title: "Withdrawal Date",
    dataIndex: "date",
    render: date => dateFormat(date),
  },
  {
    title: "Status",
    dataIndex: "status",
    render: status => (
      <>
        {status === "Successful" ? (
          <Tags color="green">{status}</Tags>
        ) : status === "Failed" ? (
          <Tags color="red">{status}</Tags>
        ) : status === "Pending" ? (
          <Tags color="orange">{status}</Tags>
        ) : (
          <Tags>{status}</Tags>
        )}
      </>
    ),
  },
];
