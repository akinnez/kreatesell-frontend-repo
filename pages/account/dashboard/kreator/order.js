import { Table } from "../../../../components";
import { AuthLayout } from "../../../../components/authlayout";
import { DateHeader } from "../partials";

const KreatorOrder = () => {
	return (
		<AuthLayout>
			<DateHeader />
			<div>
				<Table header={table_header} data={data} />
			</div>
		</AuthLayout>
	);
};

export default KreatorOrder;

export const table_header = [
	{
		title: "Customer Name",
		key: "kreatorName",
	},
	{
		title: "Email Address",
		key: "email",
	},
	{
		title: "Phone Number",
		key: "phoneNumber",
	},
	{
		title: "Product",
		key: "product",
	},
	{
		title: "Price",
		key: "price",
	},
	{
		title: "Order ID",
		key: "orderId",
	},
	{
		title: "Date",
		key: "createdAt",
	},
	{
		title: "Transaction Status",
		key: "status",
	},
];

const data = [
	{
		kreatorName: "Gabi Gambit",
		email: "abc@xyz.com",
		phoneNumber: "08023456789",
		product: "Fundamental of Graphics",
		price: 5000,
		orderId: "#234456778",
		createdAt: "20-06-2021",
		status: "Successful",
	},
	{
		kreatorName: "Gabi Gambit",
		email: "abc@xyz.com",
		phoneNumber: "08023456789",
		product: "Fundamental of Graphics",
		price: 5000,
		orderId: "#234456778",
		createdAt: "20-06-2021",
		status: "Successful",
	},
	{
		kreatorName: "Gabi Gambit",
		email: "abc@xyz.com",
		phoneNumber: "08023456789",
		product: "Fundamental of Graphics",
		price: 5000,
		orderId: "#234456778",
		createdAt: "20-06-2021",
		status: "Successful",
	},
	{
		kreatorName: "Gabi Gambit",
		email: "abc@xyz.com",
		phoneNumber: "08023456789",
		product: "Fundamental of Graphics",
		price: 5000,
		orderId: "#234456778",
		createdAt: "20-06-2021",
		status: "Successful",
	},
	{
		kreatorName: "Gabi Gambit",
		email: "abc@xyz.com",
		phoneNumber: "08023456789",
		product: "Fundamental of Graphics",
		price: 5000,
		orderId: "#234456778",
		createdAt: "20-06-2021",
		status: "Successful",
	},
	{
		kreatorName: "Gabi Gambit",
		email: "abc@xyz.com",
		phoneNumber: "08023456789",
		product: "Fundamental of Graphics",
		price: 5000,
		orderId: "#234456778",
		createdAt: "20-06-2021",
		status: "Successful",
	},
];
