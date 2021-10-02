import {
	MailClipboard,
	_copyToClipboard,
	DeactvateProduct,
	DeleteProduct,
	DuplicateProduct,
	EditProduct,
	ManageProduct,
	ViewSales,
	MobileIcon,
} from "utils";
import styles from "../../public/css/AllProducts.module.scss";
import Image from "next/image";
import { useState } from "react";

export const MobileProductCard = ({ item }) => {
	// console.log("mobile card item -->", item);

	const [showAction, setShowAction] = useState(false);
	return (
		<div
			className="block lg:hidden bg-white my-4 rounded-lg p-4"
			key={item?.id}
		>
			<div className="flex justify-between items-center">
				<div className="text-base-gray text-sm">{item?.createdAt}</div>
				<div className={`status-${item?.status}`}>{item?.status}</div>
				<div>
					<div
						onClick={() => {
							setShowAction((value) => !value);
						}}
					>
						<Image src={MobileIcon} />
					</div>
					<div className="z-10">
						{showAction && (
							<ActionComponent item={item} showAction={showAction} />
						)}
					</div>
				</div>
			</div>
			<div className="divider"></div>

			<div className="mt-8">
				<div className="flex w-full">
					<div className="w-1/2">
						<h4 className="text-black-100 text-sm font-semibold">Product</h4>
						<p className=" text-base-gray text-sm pt-2">{item?.Product}</p>
					</div>
					<div className="w-1/2">
						<h4 className="text-black-100 text-sm font-semibold">
							Product Link
						</h4>
						<p className="text-base-gray text-sm pt-2">
							<a
								href={item?.ProductLink}
								target="_blank"
								rel="noopener noreferrer"
								className={`${
									item?.status === "revoked" &&
									"text-base-gray cursor-default pointer-events-none"
								} ${
									item?.status === "flagged" &&
									"text-base-gray cursor-default pointer-events-none"
								}`}
								onClick={() => {
									if (item?.status == "flagged" || "revoked") {
										return false;
									}
								}}
							>
								{item?.ProductLink}
							</a>
						</p>
					</div>
				</div>

				<div className="flex w-full">
					<div className="w-1/2">
						<h4 className="text-black-100 text-sm font-semibold pt-4">
							Product Type
						</h4>
						<p className="text-base-gray text-sm pt-2">Membership</p>
					</div>
					<div className="w-1/2">
						<h4 className="text-black-100 text-sm font-semibold pt-4">Price</h4>
						<p className="text-base-gray text-sm pt-2">NGN {item?.Price}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

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

const ActionComponent = ({ item, showAction }) => {
	const [menu, setMenu] = useState(false);
	// console.log("mobile item -->", item);

	return (
		<div className="relative" key={item.id}>
			<div
				className="hidden lg:block cursor-pointer pl-4"
				onClick={() =>
					menu || typeof menu === "undefined" ? setMenu(false) : setMenu(true)
				}
			>
				...
			</div>

			<div
				className={` ${styles.action} ${
					menu || showAction ? "visible" : "hidden"
				}`}
			>
				<ul>
					<li onClick={() => console.log("item id -->", item.id)}>
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
		component: ActionComponent,
	},
];
