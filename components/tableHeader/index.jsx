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
import { Modal } from "antd";
import { Button } from "components";
import { useRouter } from "next/router";
import { format, parseISO } from "date-fns";
import {
	DuplicateProductAction,
	GetProducts,
	CreateProduct,
	SetProductID,
	SetProductTab,
} from "redux/actions";
import { useSelector } from "react-redux";

export const MobileProductCard = ({ item }) => {
	const [showAction, setShowAction] = useState(false);

	const time = parseISO(item?.date_created);
	const formatTime = format(time, "PPpp");

	const statusList = {
		1: "Draft",
		2: "Live",
		3: "Deativate",
		4: "Flagged",
		5: "Revoked",
	};

	const status = statusList[item?.status]?.toLowerCase();

	return (
		<div
			className="block lg:hidden bg-white my-4 rounded-lg p-4"
			key={item?.product_details?.id}
		>
			<div className="flex justify-between items-center">
				<div className="text-base-gray text-sm">{formatTime}</div>
				<div className={`status-${status}`}>{status}</div>
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
						<p className=" text-base-gray text-sm pt-2">{item?.product_name}</p>
					</div>
					<div className="w-1/2">
						<h4 className="text-black-100 text-sm font-semibold">
							Product Link
						</h4>
						<p className="text-base-gray text-sm pt-2 overflow-hidden overflow-ellipsis">
							<a
								href={item?.product_link}
								target="_blank"
								rel="noopener noreferrer"
								className={`${
									status === "revoked" &&
									"text-base-gray cursor-default pointer-events-none"
								} ${
									status === "flagged" &&
									"text-base-gray cursor-default pointer-events-none"
								}`}
								onClick={() => {
									if (status == "flagged" || "revoked") {
										return false;
									}
								}}
							>
								{item?.product_link}
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
						<p className="text-base-gray text-sm pt-2">
							{item.price.currency} {item?.price?.productPrice}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

const ModalPrompt = ({ handleCancel, onOk, modalText, productName }) => {
	const { loading } = useSelector((state) => state.product);

	return (
		<div className={`py-4 ${styles.modalPrompt}`}>
			<div className="text-base-gray text-sm">
				Are you sure you want to {modalText} <br />{" "}
				<span className="font-normal text-base text-black">{productName}?</span>
			</div>
			<p className="text-base-gray-200 text-sm py-4">
				You can not undo this action
			</p>

			<div className="">
				<Button
					text="Cancel"
					className={styles.cancelBtn}
					onClick={handleCancel}
				/>

				<Button
					text={modalText}
					className={styles.deleteBtn}
					onClick={onOk}
					loading={loading}
				/>
			</div>
		</div>
	);
};

const StatusComponent = ({ item }) => {
	const statusList = {
		1: "Draft",
		2: "Live",
		3: "Deactivated",
		4: "Flagged",
		5: "Revoked",
	};

	const statusTextList = {
		1: "You need to complete the editing of this product before it is published.",
		2: "Your product will go live and visible to audience for purchase once you complete creating the sales page.",
		3: " No one can see this product. You may reactivate it anytime you like.",
		4: "Product draws our attention and it's temporarily deactivated; Might be restored if it passes our assessment.",
		5: " Product violated copyright terms and has been removed permanently.",
	};

	const status = statusList[item]?.toLowerCase();
	const statusText = statusTextList[item];

	return (
		<div>
			<div className={`status-${status} ${styles.tooltip}`}>
				{status}
				<span className={styles.tooltiptext}>{statusText}</span>
			</div>
		</div>
	);
};

const ActionComponent = ({ item, showAction }) => {
	const router = useRouter();
	const duplicateProduct = DuplicateProductAction();
	const getProducts = GetProducts();
	const createEditDeleteProduct = CreateProduct();
	const setProductID = SetProductID();
	const setProductTab = SetProductTab();

	const id = item?.product_details?.id;
	const kreasell_product_id = item?.product_details?.kreasell_product_id;
	const productName = item?.product_details?.product_name;

	const [menu, setMenu] = useState(false);

	const [modalVisible, setVisible] = useState(false);
	const [modalText, setModalText] = useState("");

	const showModal = (text) => {
		setVisible(true);
		setModalText(text);
	};

	const handleCancel = () => {
		setVisible(false);
	};

	/**Used to delete and deactivate product */
	const handleModalOk = () => {
		createEditDeleteProduct({ product_id: id, action: "d" }, () => {
			setVisible(false);
			getProducts();
		});
	};

	return (
		<div className="relative" key={id}>
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
					<li
						onClick={() => {
							setProductID(kreasell_product_id);
							router.push("/account/kreator/products/create");
							setProductTab(0);
						}}
					>
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

					<li onClick={() => duplicateProduct(id, () => getProducts())}>
						<span>
							<Image src={DuplicateProduct} />
						</span>
						<p>Duplicate</p>
					</li>

					<li onClick={() => showModal("deactivate")}>
						<span>
							<Image src={DeactvateProduct} />
						</span>
						<p>Deactivate (Unpublish)</p>
					</li>

					<li onClick={() => showModal("delete")}>
						<span>
							<Image src={DeleteProduct} />
						</span>
						<p>Delete</p>
					</li>
				</ul>
			</div>

			<Modal
				title=""
				visible={modalVisible}
				onOk={handleModalOk}
				onCancel={handleCancel}
				footer=""
				closable={false}
				className={styles.modalContainer}
				width="312"
			>
				<ModalPrompt
					handleCancel={handleCancel}
					onOk={handleModalOk}
					modalText={modalText}
					productName={productName}
				/>
			</Modal>
		</div>
	);
};

export const AllProductsTableHeader = [
	{
		title: "Product",
		dataIndex: "product_name",
	},
	{
		title: "Product Link",
		dataIndex: "product_link",
		render: (item) => (
			<div className="">
				<a
					href={item}
					target="_blank"
					rel="noopener noreferrer"
					className="productTooltip"
				>
					{item?.slice(0, 30)}...
					<div className="tooltipText flex justify-between items-center">
						<span className="text-black-100">Go to link: </span>
						<span
							href={item}
							target="_blank"
							className="pl-2 pr-4"
							rel="noopener noreferrer"
						>
							{item}
						</span>
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
		dataIndex: "product_type",
	},
	{
		title: "Price",
		dataIndex: "price",
		render: (item) => (
			<div>
				{item?.currency} {item?.productPrice || "0.00"}
			</div>
		),
	},
	{
		title: "Date Added",
		dataIndex: "date_created",
		render: (item) => {
			const time = parseISO(item);
			const formatTime = format(time, "PPpp");
			return <div>{formatTime}</div>;
		},
	},
	{
		title: "Status",
		dataIndex: "status",
		render: (item) => StatusComponent({ item }),
	},
	{
		title: "Actions",
		dataIndex: "actions",
		render: (item) => ActionComponent({ item }),
	},
];
