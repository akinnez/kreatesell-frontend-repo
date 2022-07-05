import HistoryTag from "../components/HistoryTag";
import formatAccountNumber from "../utils/formatAccountNumber";
import dateFormat from "utils/dateFormat";

export const walletColumns = [
  {
    title: "Amount Withdrawn",
    render: record => `${record.currency} ${record.amount}`,
  },
  {
    title: "Description",
    render: record =>
      `${record.bank_name} (${formatAccountNumber(record.bank_account)})`,
  },
  {
    title: "Withdrawal Date",
    dataIndex: "withdrawal_date",
    render: date => dateFormat(date),
  },
  {
    title: "Status",
    dataIndex: "status",
    render: status => <HistoryTag status={status} />,
  },
];
