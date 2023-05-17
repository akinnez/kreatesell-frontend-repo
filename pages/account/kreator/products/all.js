import {
	Button,
	AllProductsTableHeader,
	CouponHeader,
	emptyComponent,
} from 'components';
import {format, parseISO, subDays} from 'date-fns';

import {
	DownloadIcon,
	ActionBtn,
	DeactvateProduct,
	DeleteIcon,
	EditProduct,
	ManageProduct,
	ViewSales,
	DuplicateProduct,
	_copyToClipboard,
	PlusIcon,
	MinusIcon,
	RenderIf,
} from 'utils';
import AuthLayout from '../../../../components/authlayout';
import styles from '../../../../public/css/AllProducts.module.scss';
import Image from 'next/image';
import {Popover, Table, Popconfirm, Pagination} from 'antd';
import {useRouter} from 'next/router';
import {
	GetProducts,
	GetProductStatus,
	SetProductID,
	SetProductDefault,
	CreateProduct,
	SetProductTab,
	DuplicateProductAction,
} from 'redux/actions';
import {useEffect, useState, useMemo, useContext} from 'react';
import {useSelector} from 'react-redux';
import {StatusComponent} from 'components/tableHeader';
import SyncDataToCSV from 'components/DataToCSV/SyncDataToCSV';
import {SalesPageContext} from 'context/AddSalesPageContext';
import {SalesPageModal} from 'components/tableHeader';

const AllProducts = () => {
	const router = useRouter();
	const getProducts = GetProducts();
	const getProductStatus = GetProductStatus();
	const setProductId = SetProductID();
	const setProductDefault = SetProductDefault();
	const createEditDeleteProduct = CreateProduct();
	const setProductTab = SetProductTab();
	const duplicateProduct = DuplicateProductAction();
	const {
		products,
		loading,
		productPagination,
		productStatus,
		getAllProductsLoading,
	} = useSelector((state) => state.product);
	const {store} = useSelector((state) => state.store);

	const {page, total_records, limit} = productPagination;

	// console.log('pagination = ', productPagination);

	const [productData, setProductData] = useState([]);
	const [productName, setProductName] = useState('');
	const [startDate, setStartDate] = useState('');
	const [showSelect, setShowSelect] = useState('');
	const [currencyFilter, setCurrencyFilter] = useState('');
	const [productStatusId, setProductStatusId] = useState('');
	const [endDate, setEndDate] = useState('');
	const [domainLink, setDomainLink] = useState('');

	const productStatusOptions = productStatus?.map((item) => ({
		value: item.id,
		label: item.status_name,
	}));

	const mapMinimumPrice = (priceObj) => {
		const minPrice = priceObj?.check_out_details.find(
			(itemPrice) =>
				itemPrice.price_indicator === 'Minimum' &&
				itemPrice.currency_name ===
					(priceObj?.default_currency?.currency || 'NGN')
		);
		return minPrice?.price;
	};

	const memoisedProductData = useMemo(
		() =>
			productData
				?.sort((a, b) =>
					a.product_details?.date_created <
					b.product_details?.date_created
						? 1
						: -1
				)
				?.map((item, i) => ({
					...item,
					key: i + 1,
					product_image: item?.product_images
						?.filter((images) => images?.file_type !== 4)
						.map((item) => {
							const arr = item?.filename?.split(',');
							return !!arr ? [...arr] : [];
						})[0],
					product_name: item?.product_details?.product_name,
					product_type: item?.product_type_details,
					date_created: item?.product_details?.date_created,
					status: item?.product_details?.status,
					price: {
						currency:
							item?.check_out_details[0]?.currency_name ||
							item?.default_currency?.currency
								? item?.default_currency?.currency
								: item?.product_currencies[0]
										?.currency_short_name,
						productPrice:
							item?.product_price_type === 'Pay What You Want'
								? mapMinimumPrice(item)
								: item?.default_price ||
								  '0.00' ||
								  item?.check_out_details[0]?.price,
					},
					actions: {
						product_details: {
							id: item?.product_details?.id,
							kreasell_product_id:
								item?.product_details?.kreasell_product_id,
							product_name: item?.product_details?.product_name,
							product_link: `${domainLink}/product/${item?.product_details?.kreasell_product_id}`,
						},
					},
				})),
		[domainLink, productData]
	);

	useEffect(() => {
		getProducts();
		getProductStatus();
	}, []);

	useEffect(() => {
		setProductData(products);
	}, [products]);

	useEffect(() => {
		if (Object.keys(store).length > 0) {
			const domain_details = store.domain_details;
			setDomainLink(domain_details?.domain_details?.[0]?.domain_url);
		}
	}, [store]);
	const formatDate = (date, formatArg = 'yyyy-MM-dd') => {
		return format(date, formatArg);
	};
	useEffect(() => {
		if (showSelect) {
			handleShowFilter();
		}
	}, [showSelect]);

	const handleShowFilter = () => {
		const day = new Date();
		switch (showSelect) {
			case 'Today':
				setStartDate(() => formatDate(subDays(day, 0)));
				setEndDate(() => formatDate(day));
				break;
			case 'Yesterday':
				setStartDate(formatDate(subDays(day, 1)));
				setEndDate(formatDate(subDays(day, 1)));
				// return [formatDate(subDays(day, 1)), formatDate(day)];
				break;
			case 'Last 7 days':
				setStartDate(formatDate(subDays(day, 7)));
				setEndDate(formatDate(day));
				break;
			case 'Last 30 days':
				setStartDate(formatDate(subDays(day, 30)));
				setEndDate(formatDate(day));
				break;
			case 'This year':
				let year = new Date().getFullYear();
				setStartDate(`${year}-01-01`);
				setEndDate(formatDate(day));
				break;
			case 'All time':
				setStartDate('');
				setEndDate(formatDate(day));
				break;
			default:
				return;
		}
	};

	const handleSearchSubmit = () => {
		getProducts(1, productName, startDate, endDate, currencyFilter, () =>
			console.log('done')
		);
	};
	const handlePaginationChange = (page) => getProducts(page);

	const tableLocale = {
		emptyText: emptyComponent('No record yet'),
	};

	const formatTimeFn = (item) => {
		const time = parseISO(item);
		const formatTime = format(time, 'PPPp');
		return `${formatTime.split('at')[0]} ${formatTime.split('at')[1]}`;
	};
	/**Used to delete and deactivate product */
	const handleModalOk = (product) => {
		return new Promise((resolve) => {
			const formdata = new FormData();
			formdata.append('product_id', product.product_details?.id);
			formdata.append('action', 'd');
			createEditDeleteProduct(formdata, () => {
				getProducts();
				resolve();
			});
		});
	};
	let Content = (product) => {
		const {salesPageDispatch} = useContext(SalesPageContext);
		return (
			<ul>
				<li
					className="flex items-center cursor-pointer"
					onClick={() => {
						setProductId(
							product.product_details?.kreasell_product_id
						);
						router.push('/account/kreator/products/create');
						setProductTab(0);
					}}
				>
					<span>
						<Image alt="" src={EditProduct} />
					</span>
					<p className="mb-0 ml-3">Edit Product</p>
				</li>

				<li
					className="flex items-center cursor-pointer"
					onClick={() => {
						return _copyToClipboard(
							product?.actions.product_details?.product_link,
							// `/store/${storename}/product/${product?.product_details?.kreasell_product_id}`
							'Product Link Copied'
						);
					}}
				>
					<span>
						<Image alt="" src={ManageProduct} />
					</span>
					<p className="mb-0 ml-3">Copy Link</p>
				</li>

				<li
					onClick={() =>
						router.push(
							`/account/kreator/products/preview/${product.product_details?.kreasell_product_id}`
						)
					}
					className="flex items-center cursor-pointer"
				>
					<span>
						<Image alt="" src={ViewSales} />
					</span>
					<p className="mb-0 ml-3"> Preview</p>
				</li>
				{/* set show modal */}
				<RenderIf condition={product?.salespageurl === null}>
					<li
						onClick={() =>
							salesPageDispatch({
								payload: {
									modalType: 'connectSalesModal',
									productId:
										product.product_details
											?.kreasell_product_id,
								},
								type: 'OPEN_MODAL',
							})
						}
					>
						<span className="flex">
							<Image src={PlusIcon} alt="sales page" />
						</span>
						<p className="mb-0 ml-3">Connect Sales Page</p>
					</li>
				</RenderIf>
				<RenderIf condition={product?.salespageurl !== null}>
					<li
						onClick={() =>
							salesPageDispatch({
								payload: {
									modalType: 'disconnectSalesPage',
									productId:
										product.product_details
											?.kreasell_product_id,
								},
								type: 'OPEN_MODAL',
							})
						}
					>
						<span className="flex">
							<Image src={MinusIcon} alt="sales page" />
						</span>
						<p className="mb-0 ml-3">Disconnect Sales Page</p>
					</li>
				</RenderIf>

				<li
					className="flex items-center cursor-pointer"
					onClick={() =>
						duplicateProduct(product.product_details?.id, () =>
							getProducts()
						)
					}
				>
					<span>
						<Image alt="" src={DuplicateProduct} />
					</span>
					<p className="mb-0 ml-3">Duplicate</p>
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
									Deactivate
								</h2>{' '}
								this product?
							</pre>
						}
						onConfirm={() => handleModalOk(product)}
						// onCancel={cancel}
						okText="`Deactivate`"
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
						onConfirm={() => handleModalOk(product)}
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
	};
	const AvailabilityStatus = (status, total, noSold) => {
		const availablityList = {
			// 'Unlimited Copies': '#00B140',
			'In Stock': '#00B140',
			'Out of Stock': '#F90005',
			'100 Copies': '#0072EF',
		};
		return (
			<p>
				{' '}
				<span>Stock Info: </span>
				<div
					style={{
						background: availablityList[status],
						height: '8px',
						width: '8px',
						borderRadius: '50%',
					}}
					className={`inline-block mr-2 ${styles.availabilityDot}`}
				></div>
				{status}
			</p>
		);
	};

	const checkImageSrcIsNotNull = (src) => {
		return (
			src !== undefined &&
			src?.length > 0 &&
			src[0] !== null &&
			src[0] !== ''
		);
	};

	const resetFilters = () => {
		// setProductData();
		setStartDate();
		setEndDate();
		setCurrencyFilter();

		// get products
		getProducts();
	};

	const salesPage = useContext(SalesPageContext);
	return (
		<AuthLayout>
			<div className={styles.allProduct + ' pb-10'}>
				<div className="flex justify-between mb-4 items-center">
					<h3 className=" font-semibold text-2xl mb-0">
						All Products
					</h3>
					<Button
						text="+  Add Product"
						bgColor="blue"
						className={styles.addCouponBtn1 + ' px-2 py-4'}
						onClick={() => {
							setProductId('');
							setProductDefault();
							router.push('/account/kreator/products/create');
						}}
					/>
				</div>
				<CouponHeader
					handleSearchInput={(e) => setProductName(e.target.value)}
					handleSearchSubmit={(cb) => {
						handleSearchSubmit();
						cb();
					}}
					handleStartDate={(e, string) => {
						setStartDate(string);
					}}
					handleCurrencyChange={(e) => setCurrencyFilter(e)}
					handleEndDate={(e, string) => setEndDate(string)}
					handleShowSelect={(e) => {
						setShowSelect(e);
					}}
					{...{resetFilters}}
				/>

				<div className={styles.exportDiv}>
					{/* <SyncDataToCSV
              data={data}
              headers={headCells}
              filename="all_products"
            /> */}
				</div>
				<div className="hidden md:block mt-8">
					<Table
						columns={AllProductsTableHeader}
						locale={tableLocale}
						loading={getAllProductsLoading}
						dataSource={memoisedProductData}
						scroll={{
							x: 1000,
						}}
						pagination={{
							position: ['none', 'bottomLeft'],
							total: total_records,
							defaultCurrent: 1,
							onChange: handlePaginationChange,
							current: page,
							defaultPageSize: limit,
							// onShowSizeChange : (curr, size)=> console.log(curr, size , 'page size')
						}}
						size="large"
					/>
				</div>
				{/* mobile screen table */}
				<div
					className={`block md:hidden flex flex-col gap-4 mt-8 ${styles.productMobile}`}
				>
					{memoisedProductData.map((product) => (
						<div key={product.key} className={`${styles.product}`}>
							<div
								className={`w-100 flex justify-between mb-4 ${styles.liveElipsis}`}
							>
								<span>{StatusComponent(product.status)}</span>
								<Popover
									overlayStyle={{
										width: '150px',
										padding: '0',
									}}
									placement="bottomLeft"
									content={() => Content(product)}
									trigger="click"
									overlayClassName={styles.action}
								>
									<Image
										alt=""
										src={ActionBtn}
										width={'30px'}
										height={'30px'}
									/>
								</Popover>
							</div>
							<div
								className={`flex justify-between ${styles.dateCategory}`}
							>
								<p className={`${styles.date}`}>
									{formatTimeFn(product.date_created)}
								</p>
								<span>|</span>
								<p className={`${styles.category}`}>
									{product.product_type}
								</p>
							</div>
							<div className={`flex ${styles.content}`}>
								<div className={`${styles.image}`}>
									{checkImageSrcIsNotNull(
										product.product_image
									) && (
										<Image
											src={product.product_image[0]}
											width={100}
											height={100}
											objectFit="cover"
											alt="Product"
										/>
									)}
								</div>
								<div className={`${styles.mainContent}`}>
									<h2>{product.product_name}</h2>
									<h5>
										{product.default_currency.currency}{' '}
										{product.price.productPrice}
									</h5>
									{/* {AvailabilityStatus(
										product?.number_sold >=
											product?.product_details
												?.no_of_product
											? 'Out of Stock'
											: 'In Stock'
									)} */}
									{/* TODO: Make individual components */}
									{/* unlimited */}
									{!product?.product_details
										?.is_limited_sales ? (
										<p className="text-xs mb-4 w-3/4 text-green-600 py-1 text-center border-green-400 rounded-md border">
											{' '}
											Unlimited Copies
										</p>
									) : product?.product_details
											?.is_limited_sales &&
									  product?.number_sold >
											product?.product_details
												?.number_of_product ? (
										<p className="text-xs mb-4 w-3/4 text-red-600 py-1 text-center border-red-400 rounded-md border">
											{' '}
											Out of stock
										</p>
									) : product?.product_details
											?.is_limited_sales &&
									  product?.number_sold <
											product?.product_details
												?.number_of_product ? (
										<p className="text-xs mb-4 w-3/4 text-blue-600 py-1 text-center border-blue-400 rounded-md border">
											{' '}
											{product?.product_details
												?.number_of_product -
												product?.number_sold}{' '}
											Copies in stock
										</p>
									) : (
										<></>
									)}

									<p>
										<span>Sold: </span>
										{product?.number_sold} Copies
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
				{productData.length <= 0 && (
					<div className="flex flex-col mt-10 items-center">
						<h2
							className={
								styles.lightGrey +
								' font-semibold text-center text-base'
							}
						>
							Almost there, now click the button to add your
							product.
						</h2>
						<Button
							leftIcon="+"
							text="Add a Product"
							bgColor="blue"
							className={styles.addCouponBtn + ' mt-2'}
							onClick={() => {
								setProductId('');
								setProductDefault();
								router.push('/account/kreator/products/create');
							}}
						/>
					</div>
				)}

				<div className={styles.mobilePagination}>
					<Pagination
						position={['none', 'bottomLeft']}
						total={total_records}
						defaultCurrent={1}
						onChange={handlePaginationChange}
						current={page}
						defaultPageSize={limit}
					/>
				</div>
			</div>
			<SalesPageModal
				showModal={salesPage.salesPage.showModal}
				closeModal={() =>
					salesPage.salesPageDispatch({type: 'CLOSE_MODAL'})
				}
				type={salesPage.salesPage.modalType}
			/>
		</AuthLayout>
	);
};

export default AllProducts;
