import {
	MailClipboard,
	_copyToClipboard,
	DeactvateProduct,
	DuplicateProduct,
	EditProduct,
	ManageProduct,
	ViewSales,
	MobileIcon,
	EmptyDataTable,
	DeleteIcon,
} from 'utils';
import styles from '../../public/css/AllProducts.module.scss';
import Image from 'next/image';
import {useState} from 'react';
import {Modal, Tag, Tooltip, Popover, Popconfirm} from 'antd';
import {Button} from 'components';
import {useRouter} from 'next/router';
import {format, parseISO} from 'date-fns';
import {
	DuplicateProductAction,
	GetProducts,
	CreateProduct,
	SetProductID,
	SetProductTab,
} from 'redux/actions';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';

export const MobileProductCard = ({item}) => {
	const [showAction, setShowAction] = useState(false);

	const time = parseISO(item?.date_created);
	const formatTime = format(time, 'PPpp');

	const statusList = {
		1: 'Draft',
		2: 'Live',
		3: 'Deativate',
		4: 'Flagged',
		5: 'Revoked',
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
						<Image alt="" src={MobileIcon} />
					</div>
					<div className="z-10">
						{showAction && (
							<ActionComponent
								item={item}
								showAction={showAction}
							/>
						)}
					</div>
				</div>
			</div>
			<div className="divider"></div>

			<div className="mt-8">
				<div className="flex w-full">
					<div className="w-1/2">
						<h4 className="text-black-100 text-sm font-semibold">
							Product
						</h4>
						<p className=" text-base-gray text-sm pt-2">
							{item?.product_name}
						</p>
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
									status === 'revoked' &&
									'text-base-gray cursor-default pointer-events-none'
								} ${
									status === 'flagged' &&
									'text-base-gray cursor-default pointer-events-none'
								}`}
								onClick={() => {
									if (status == 'flagged' || 'revoked') {
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
						<p className="text-base-gray text-sm pt-2">
							Membership
						</p>
					</div>
					<div className="w-1/2">
						<h4 className="text-black-100 text-sm font-semibold pt-4">
							Price
						</h4>
						<p className="text-base-gray text-sm pt-2">
							{item.price.currency} {item?.price?.productPrice}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

const ModalPrompt = ({handleCancel, onOk, modalText, productName}) => {
	const {loading} = useSelector((state) => state.product);

	return (
		<div className={`py-4 ${styles.modalPrompt}`}>
			<div className="text-base-gray text-sm">
				Are you sure you want to {modalText} <br />{' '}
				<span className="font-normal text-base text-black">
					{productName}?
				</span>
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

export const StatusComponent = (item) => {
	const statusTextList = {
		1: {
			type: 'draft',
			styles: {background: 'rgba(255, 214, 102, 0.2)', color: '#FBB500'},
			contents:
				'You need to complete the editing of this product before it is published.',
		},
		2: {
			type: 'live',
			styles: {background: '#F1FCF8', color: '#2DC071'},
			contents:
				'Your product will go live and visible to audience for purchase once you complete creating the sales page.',
		},
		3: {
			type: 'deactivated',
			styles: {background: 'rgba(255, 77, 79, 0.1)', color: '#F90005'},
			contents:
				' No one can see this product. You may reactivate it anytime you like.',
		},
		4: {
			type: 'flagged',
			styles: {background: '#F5F5F5', color: '#595959'},
			contents:
				"Product draws our attention and it's temporarily deactivated; Might be restored if it passes our assessment.",
		},
		5: {
			type: 'revoked',
			styles: {background: '#F5F5F5', color: '#595959'},
			contents:
				' Product violated copyright terms and has been removed permanently.',
		},
	};
	let tagStyles = statusTextList[item].styles;
	let content = statusTextList[item].contents;
	const mainType = statusTextList[item].type;
	return (
		<Tooltip
			overlayInnerStyle={{fontSize: '10px', textAlign: 'center'}}
			overlayStyle={{
				width: '150px',
				borderRadius: '10px',
				padding: '20px 8px',
			}}
			className="text-xs"
			placement="top"
			title={content}
		>
			<div className={styles.tags} style={tagStyles}>
				{mainType.charAt(0).toUpperCase() + mainType.slice(1)}
			</div>
		</Tooltip>
	);
};
const CouponStatusComponent = (item) => {
	const statusTextList = {
		Pending: {
			type: 'Pending',
			styles: {background: 'rgba(255, 214, 102, 0.2)', color: '#FBB500'},
		},
		Active: {
			type: 'Active',
			styles: {background: '#F1FCF8', color: '#2DC071'},
		},
		Finished: {
			type: 'Finished',
			styles: {background: 'rgba(255, 77, 79, 0.1)', color: '#F90005'},
		},
		Expired: {
			type: 'Expired',
			styles: {background: 'rgba(255, 77, 79, 0.1)', color: '#F90005'},
		},
	};

	let tagStyles = statusTextList[item].styles;
	const mainType = statusTextList[item].type;
	return (
		<div className={styles.tags} style={tagStyles}>
			{mainType.charAt(0).toUpperCase() + mainType.slice(1)}
		</div>
	);
};

const ActionComponent = ({item}, all) => {
	const router = useRouter();
	// const [domainLink, setDomainLink] = useState('');
	// const {store} = useSelector((state) => state.store);
	const duplicateProduct = DuplicateProductAction();
	const getProducts = GetProducts();
	const createEditDeleteProduct = CreateProduct();
	const setProductID = SetProductID();
	const setProductTab = SetProductTab();
	const id = item?.product_details?.id;
	const kreasell_product_id = item?.product_details?.kreasell_product_id;
	// const productLink = item?.product_details?.product_link
	// const productLink = "scam";

	// console.log('all is', all)

	// useEffect(() => {
	// 	if (Object.keys(store).length > 0) {
	// 		const {domain_details} = store.domain_details;
	// 		setDomainLink(domain_details[0].domain_url);
	// 	}
	// }, [store]);

	/**Used to delete and deactivate product */
	const handleModalOk = (action) => {
		return new Promise((resolve) => {
			const formdata = new FormData();
			formdata.append('product_id', id);
			formdata.append('action', action);
			createEditDeleteProduct(formdata, () => {
				getProducts();
				resolve();
			});
		});
	};

	let content = (
		<ul>
			<li
				className="flex items-center cursor-pointer"
				onClick={() => {
					setProductID(kreasell_product_id);
					// router.push("/account/kreator/products/create");
					router.push(
						{
							pathname: `/account/kreator/products/create`,
							query: {
								productId: kreasell_product_id,
							},
						}
						// '/account/kreator/products/create',
					);
					setProductTab(0);
				}}
			>
				<span>
					<Image alt="" src={EditProduct} />
				</span>
				<p className="mb-0 ml-3">Edit Product</p>
			</li>

			{/* <li
				className="flex items-center cursor-pointer"
				onClick={() =>
					_copyToClipboard(
						`${domainLink}/product/${kreasell_product_id}`,
						'Product Link Copied'
					)
				}
			>
				<span>
					<Image alt="" src={ManageProduct} />
				</span>
				<p className="mb-0 ml-3">Copy Link</p>
			</li> */}

			<li
				onClick={() =>
					router.push(
						`/account/kreator/products/preview/${kreasell_product_id}`
					)
				}
				className="flex items-center cursor-pointer"
			>
				<span>
					<Image alt="" src={ViewSales} />
				</span>
				<p className="mb-0 ml-3"> Preview</p>
			</li>

			<li
				className="flex items-center cursor-pointer"
				onClick={() => duplicateProduct(id, () => getProducts())}
			>
				<span>
					<Image alt="" src={DuplicateProduct} />
				</span>
				<p className="mb-0 ml-3">Duplicate</p>
			</li>

			{[2].includes(all?.status) && (
				<li
					className={
						styles.deletePop + ` flex items-center cursor-pointer`
					}
					style={{
						color: all?.status === 1 && '#a1a1a1',
						cursor: all?.status === 1 && 'auto',
					}}
				>
					<Popconfirm
						title={
							<pre className="mb-0 text-sm ">
								Are you sure to{' '}
								<h2 className="text-base text-base-gray-400 mb-0 font-semibold">
									Deactivate
								</h2>{' '}
								this product?
							</pre>
						}
						onConfirm={() =>
							all?.status === 1 ? {} : handleModalOk('d')
						}
						// onCancel={cancel}
						okText="Deactivate"
						cancelText="Cancel"
						icon={<></>}
						placement="bottom"
						overlayClassName={styles.popConfirm}
					>
						<span>
							<Image alt="" src={DeactvateProduct} />
						</span>
						<p className="mb-0 ml-3">
							Deactivate
							<br /> (Unpublish)
						</p>
					</Popconfirm>
				</li>
			)}
			{[3].includes(all?.status) && (
				<li
					className={
						styles.deletePop + ` flex items-center cursor-pointer`
					}
					style={{
						color: all?.status === 1 && '#a1a1a1',
						cursor: all?.status === 1 && 'auto',
					}}
				>
					<Popconfirm
						title={
							<pre className="mb-0 text-sm ">
								Are you sure to{' '}
								<h2 className="text-base text-base-gray-400 mb-0 font-semibold">
									Activate
								</h2>{' '}
								this product?
							</pre>
						}
						onConfirm={() => handleModalOk('a')}
						// onCancel={cancel}
						okText="Activate"
						cancelText="Cancel"
						icon={<></>}
						placement="bottom"
						overlayClassName={styles.popConfirm}
					>
						<span>
							<Image alt="" src={DeactvateProduct} />
						</span>
						<p className="mb-0 ml-3">
							Activate
							<br /> (Publish)
						</p>
					</Popconfirm>
				</li>
			)}
			<li
				className={
					styles.deletePop + ' flex items-center cursor-pointer'
				}
			>
				<Popconfirm
					title={
						<pre className="mb-0 text-sm ">
							Are you sure to{' '}
							<h2 className="text-base text-base-red-400 mb-0 font-semibold">
								Delete
							</h2>{' '}
							this product?
						</pre>
					}
					onConfirm={() => handleModalOk('r')}
					// onCancel={cancel}
					okText="Delete"
					cancelText="Cancel"
					icon={<></>}
					placement="left"
					overlayClassName={styles.popConfirm}
				>
					<span>
						<Image alt="" src={DeleteIcon} />
					</span>
					<p className="mb-0 ml-3">
						Delete
						<br />
					</p>
				</Popconfirm>
			</li>
		</ul>
	);
	return (
		<Popover
			overlayStyle={{width: '150px', padding: '0'}}
			placement="bottomLeft"
			overlayClassName={styles.action}
			content={content}
			title=""
			trigger="click"
		>
			<h2 className="font-semibold cursor-pointer text-lg">...</h2>
		</Popover>
	);
};
const CouponActionComponent = ({item}) => {
	const router = useRouter();
	const id = item?.id;
	let content = (
		<ul>
			<li
				className={
					styles.deletePop + ' flex items-center cursor-pointer'
				}
			>
				<Popconfirm
					title={
						<pre className="mb-0 text-sm ">
							Are you sure to{' '}
							<h2 className="text-base text-base-gray-400 mb-0 font-semibold">
								Deactivate
							</h2>{' '}
							this coupon?
						</pre>
					}
					// onConfirm={handleModalOk}
					// onCancel={cancel}
					okText="Deactivate"
					cancelText="Cancel"
					icon={<></>}
					placement="bottom"
					overlayClassName={styles.popConfirm}
				>
					<span>
						<Image alt="" src={DeactvateProduct} />
					</span>
					<p className="mb-0 ml-3">Deactivate</p>
				</Popconfirm>
			</li>
			<li
				className={
					styles.deletePop + ' flex items-center cursor-pointer'
				}
			>
				<Popconfirm
					title={
						<pre className="mb-0 text-sm ">
							Are you sure to{' '}
							<h2 className="text-base text-base-gray-400 mb-0 font-semibold">
								Delete
							</h2>{' '}
							this coupon?
						</pre>
					}
					// onConfirm={handleModalOk}
					// onCancel={cancel}
					okText="Delete"
					cancelText="Cancel"
					icon={<></>}
					placement="bottom"
					overlayClassName={styles.popConfirm}
				>
					<span>
						<Image alt="" src={DeleteIcon} />
					</span>
					<p className="mb-0 ml-3">Delete</p>
				</Popconfirm>
			</li>
			<li
				className="flex items-center cursor-pointer"
				onClick={() => {
					localStorage.setItem('couponId', id);
					router.push('/account/kreator/products/coupons/edit', '', {
						id,
					});
				}}
			>
				<span>
					<Image alt="" src={EditProduct} />
				</span>
				<p className="mb-0 ml-3">Edit</p>
			</li>
		</ul>
	);
	return (
		<Popover
			overlayStyle={{width: '150px', padding: '0'}}
			placement="bottomLeft"
			overlayClassName={styles.action}
			content={content}
			title=""
			trigger="click"
		>
			<h2
				className={
					styles.spanCont +
					' text-sm mb-0 font-semibold inline-flex flex-col cursor-pointer text-lg'
				}
			>
				<span>.</span>
				<span>.</span>
				<span>.</span>
			</h2>
		</Popover>
	);
};

export const AllProductsTableHeader = [
	{
		title: '',
		dataIndex: 'product_image',
		width: 120,
		fixed: 'left',
		render: (item) => {
			return (
				<div className={styles.productTableImage}>
					{item !== undefined && item.length > 0 && (
						<Image
							src={item[0]}
							width="100"
							height={100}
							objectFit="cover"
							alt="Product"
						/>
					)}
				</div>
			);
		},
	},
	{
		title: 'Product',
		dataIndex: 'product_name',
		width: 180,
		fixed: 'left',
		render: (item, record) => (
			<div className={styles.productTableName + ' flex flex-col'}>
				{/* {console.log(record)} */}
				<h2 className="text-lg mb-1 font-semibold">{item}</h2>
				<p className="text-xs mb-2 w-3/4  py-1 text-center border-green-400 rounded-md px-2 border">
					{' '}
					Unlimited Copies
				</p>
				<p className="text-xs font-normal"> 0 copies sold</p>
			</div>
		),
	},
	{
		title: 'Product Type',
		dataIndex: 'product_type',
	},
	{
		title: 'Price',
		dataIndex: 'price',
		render: (item) => (
			<div>
				{item?.currency} {item?.productPrice || '0.00'}
			</div>
		),
	},
	{
		title: 'Date Added',
		dataIndex: 'date_created',
		render: (item) => {
			const time = parseISO(item);
			const formatTime = format(time, 'PPPp');
			return (
				<div className="flex flex-col items-center">
					<div>{`${formatTime.split('at')[0]},`}</div>
					<div>{formatTime.split('at')[1]}</div>
				</div>
			);
		},
	},
	{
		title: 'Status',
		dataIndex: 'status',
		render: (item) => StatusComponent(item),
	},
	{
		title: 'Actions',
		dataIndex: 'actions',
		render: (item, all) => ActionComponent({item}, all),
		width: 100,
		fixed: 'right',
	},
];
export const AllCouponTableHeader = [
	{
		title: 'S/N',
		dataIndex: 'numbers',
	},
	{
		title: 'Products',
		dataIndex: 'product_name',
	},
	{
		title: 'Code',
		dataIndex: 'code',
	},
	{
		title: 'Discount',
		dataIndex: 'discount',
	},
	{
		title: 'Quantity',
		dataIndex: 'quantity',
	},
	{
		title: 'Usages',
		dataIndex: 'usages',
		// render: (item) => StatusComponent({ item }),
	},
	{
		title: 'Max Usages',
		dataIndex: 'max_usages',
		// render: (item) => ActionComponent({ item }),
	},
	{
		title: 'Start Date',
		dataIndex: 'start_date',
		render: (item) => {
			const time = parseISO(item);
			const formatTime = format(time, 'PPPp');
			return (
				<div
					style={{whiteSpace: 'pre'}}
					className="flex flex-col items-center"
				>
					<div>{`${formatTime.split('at')[0]},`}</div>
					<div>{formatTime.split('at')[1]}</div>
				</div>
			);
		},
		// width: 150
	},
	{
		title: 'End Date',
		dataIndex: 'end_date',
		render: (item) => {
			const time = parseISO(item);
			const formatTime = format(time, 'PPPp');
			return (
				<div
					style={{whiteSpace: 'pre'}}
					className="flex flex-col items-center"
				>
					<div>{`${formatTime.split('at')[0]},`}</div>
					<div>{formatTime.split('at')[1]}</div>
				</div>
			);
		},
	},
	{
		title: 'Status',
		dataIndex: 'status',
		render: (item) => CouponStatusComponent(item),
	},
	{
		title: 'More',
		dataIndex: 'more',
		render: (item) => CouponActionComponent({item}),
		// fixed: "right",
		// width: 80
	},
];
export const emptyComponent = (text) => {
	return (
		<div className={styles.emptyTable + ' flex flex-col'}>
			<Image alt="" src={EmptyDataTable} />
			<h2 className={styles.lightGrey + ' mt-5 font-semibold text-lg'}>
				{text ? text : 'No content has been added'}
			</h2>
		</div>
	);
};
