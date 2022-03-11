import dateFormat from "utils/dateFormat";
import formatNumber from "utils/formatNumber";

export const payoutsColumns = [
  { title: "Product", dataIndex: "product_name" },
  { title: "Customer Name", dataIndex: "customer_name" },
  { title: "Customer Email", dataIndex: "customer_email" },
  {
    title: "Amount",
    dataIndex: "amount",
    render: (_, record) => `${record.currency} ${formatNumber(record.amount)}`,
  },
  {
    title: "Transaction Date",
    dataIndex: "transaction_date",
    render: transactionDate => dateFormat(transactionDate),
  },
  {
    title: "Settlement Date",
    dataIndex: "settlement_date",
    render: settlementDate => dateFormat(settlementDate),
  },
];
