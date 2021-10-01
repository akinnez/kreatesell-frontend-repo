import { MailClipboard, _copyToClipboard } from "utils";
import styles from "../../public/css/AllProducts.module.scss";
import Image from "next/image";

export const AllProductsTableHeader = [
	{
		title: "Product",
		key: "Product",
	},
	{
		title: "Product Link",
		key: "ProductLink",
		component: ({ item }) => (
			<div className="">
				<a
					href={item}
					target="_blank"
					rel="noopener noreferrer"
					className="productTooltip"
				>
					{item.slice(0, 30)}...
					<div className="tooltipText flex justify-between items-center">
						<span className="text-black-100">Go to link: </span>
						<a
							href={item}
							target="_blank"
							className="pl-2 pr-4"
							rel="noopener noreferrer"
						>
							{item}
						</a>
						<span
							className="bg-primary-blue h-10 w-12 flex justify-center rounded-r-lg ml-4"
							onClick={() => _copyToClipboard(item, "Product Link Copied")}
						>
							<Image src={MailClipboard} />
						</span>
					</div>
				</a>
			</div>
		),
	},
	{
		title: "Product Type",
		key: "ProductType",
	},
	{
		title: "Price",
		key: "Price",
		component: ({ item }) => <div>NGN {item}</div>,
	},
	{
		title: "Date Added",
		key: "createdAt",
	},
	{
		title: "Status",
		key: "status",
		component: ({ item }) => <div className={`status-${item}`}>{item}</div>,
	},
	{
		title: "Actions",
		key: "actions",
	},
];
