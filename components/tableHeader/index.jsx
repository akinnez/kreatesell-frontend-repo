import {
	MailClipboard,
	_copyToClipboard,
	DeactvateProduct,
	DeleteProduct,
	DuplicateProduct,
	EditProduct,
	ManageProduct,
	ViewSales,
} from "utils";
import styles from "../../public/css/AllProducts.module.scss";
import Image from "next/image";
import { useState } from "react";

const StatusComponent = ({ item }) => {
	return (
		<div>
			<div className={`status-${item} ${styles.tooltip}`}>
				{item}
				<span className={styles.tooltiptext}>
					Your product will go live and visible to audience for purchase once
					you complete creating the sales page.
				</span>
			</div>
		</div>
	);
};

const ActionComponent = ({ item }) => {
	const [menu, setMenu] = useState(false);

	return (
		<div className="relative" key={item.id}>
			<div
				className="cursor-pointer pl-4"
				onClick={() =>
					menu || typeof menu === "undefined" ? setMenu(false) : setMenu(true)
				}
			>
				...
			</div>

			<div className={` ${styles.action} ${menu ? "visible" : "hidden"}`}>
				<ul>
					<li>
						<span>
							<Image src={EditProduct} />
						</span>
						<p>Edit</p>
					</li>
					<li>
						<span>
							<Image src={ManageProduct} />
						</span>
						<p>Manage Product</p>
					</li>
					<li>
						<span>
							<Image src={ViewSales} />
						</span>
						<p>View Sales</p>
					</li>
					<li>
						<span>
							<Image src={DuplicateProduct} />
						</span>
						<p>Duplicate</p>
					</li>
					<li>
						<span>
							<Image src={DeactvateProduct} />
						</span>
						<p>Deactivate (Unpublish)</p>
					</li>
					<li>
						<span>
							<Image src={DeleteProduct} />
						</span>
						<p>Delete</p>
					</li>
				</ul>
			</div>
		</div>
	);
};

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
							className="bg-primary-blue h-10 w-12 flex justify-center rounded-r-lg ml-4 px-1"
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
		component: StatusComponent,
	},
	{
		title: "Actions",
		key: "actions",
		// component: ActionComponent,
		component: ActionComponent,
	},
];
