import {
	// DateHeader,
	Button,
	AllProductsTableHeader,
	CouponHeader,
	emptyComponent
} from "components";

import { DownloadIcon } from "utils";
import AuthLayout from "../../../../components/authlayout";
import styles from "../../../../public/css/AllProducts.module.scss";
import Image from "next/image";
// import { ProductsTableData } from "components/tableHeader/dummyTableData";
import { Table } from "antd";
import { MobileProductCard } from "components/tableHeader";
import { useRouter } from "next/router";
import { GetProducts, GetProductStatus } from "redux/actions";
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";

const AllProducts = () => {
	const router = useRouter();
	const getProducts = GetProducts();
	const getProductStatus = GetProductStatus();
	const { products, loading, productPagination, productStatus } = useSelector(
		(state) => state.product
	);

	const { page, total_records } = productPagination;

	const [productData, setProductData] = useState([]);
	const [productName, setProductName] = useState("");
	const [startDate, setStartDate] = useState("");
	const [productStatusId, setProductStatusId] = useState("");
	const [endDate, setEndDate] = useState("");

	const productStatusOptions = productStatus?.map((item) => ({
		value: item.id,
		label: item.status_name,
	}));

	const memoisedProductData = useMemo(
		() =>
			productData
				?.sort((a, b) =>
					a.product_details?.date_created < b.product_details?.date_created
						? 1
						: -1
				)
				?.map((item, i) => ({
					...item,
					product_name: item?.product_details?.product_name,
					product_type: item?.product_details?.product_type?.product_type_name,
					date_created: item?.product_details?.date_created,
					status: item?.product_details?.status,
					price: {
						currency: item?.default_currency,
						productPrice: item?.default_price,
					},
					actions: item,
				})),
		[productData]
	);

	useEffect(() => {
		getProducts();
		getProductStatus();
	}, []);

	useEffect(() => {
		setProductData(products);
	}, [products]);

	const handleSearchSubmit = () =>
		getProducts(1, productName, startDate, endDate, productStatusId);
	const handlePaginationChange = (page) => getProducts(page);

	const tableLocale = {
		emptyText: (
			emptyComponent("No record yet")
		)
	}
	return (
		<AuthLayout>
			{/* <div className={styles.allProduct}>
				<div className="flex justify-between mb-4">
					<h3 className="font-semibold text-2xl">Products</h3>
					<div>
						<Button
							text="+ Add Product"
							bgColor="blue"
							className={styles.addProductBtn}
							onClick={() => router.push("/account/kreator/products/create")}
						/>
					</div>
				</div>

				<ProductHeader
					handleSearchInput={(e) => setProductName(e.target.value)}
					handleSearchSubmit={() => handleSearchSubmit()}
					handleStartDate={(e) => setStartDate(e.target.value)}
					handleEndDate={(e) => setEndDate(e.target.value)}
					productStatusOptions={productStatusOptions}
					handleProductStatus={(e) => setProductStatusId(e)}
				/>

				<div className="flex justify-end pt-3">
					<div className="text-primary-blue  font-semibold text-xs pr-2">
						Export Data in CSV
					</div>
					<Image src={DownloadIcon} />
				</div>

				<div className="hidden lg:block mb-16 mt-8">
					<Table
						columns={AllProductsTableHeader}
						dataSource={memoisedProductData}
						loading={loading}
						pagination={{
							position: ["bottomLeft"],
							total: total_records,
							defaultCurrent: 1,
							onChange: handlePaginationChange,
							current: page,
							defaultPageSize: 10,
						}}
						size="large"
					/>
				</div>

				{memoisedProductData?.map((item, i) => (
					<MobileProductCard item={item} key={item?.id || i} />
				))}
			</div> */}


			<div className={styles.allProduct + " pb-10"}>
				<div className="flex justify-between mb-4">
					<h3 className=" font-semibold text-2xl">All Products</h3>
                    <Button
                        text="+ Add a Product"
                        bgColor="blue"
                        className={styles.addCouponBtn1 + " pr-2 pl-2"}
                        onClick={() => router.push("/account/kreator/products/create")}
                    />
				</div>
				<CouponHeader
					// handleSearchInput={(e) => setProductName(e.target.value)}
					// handleSearchSubmit={() => handleSearchSubmit()}
					// handleStartDate={(e) => setStartDate(e.target.value)}
					// handleEndDate={(e) => setEndDate(e.target.value)}
					// productStatusOptions={productStatusOptions}
					// handleProductStatus={(e) => setProductStatusId(e)}
				/>

				<div className="flex justify-end items-center pt-3 mr-10">
                    <div className="flex justify-end items-center cursor-pointer">
                        <div className="text-primary-blue  font-semibold text-xs pr-2">
                            Export Data in CSV
                        </div>
                        <Image alt="" src={DownloadIcon} />
                    </div>
				</div>

				<div className="hidden lg:block mb-16 mt-8">
					<Table
						columns={AllProductsTableHeader}
                        locale={tableLocale}
						// dataSource={memoisedProductData}
						// loading={loading}
						pagination={{
							position: ["none","bottomLeft"],
						}}
						size="large"
					/>
				</div>
                <div className="flex flex-col items-center">
                    <h2 className={styles.lightGrey +" font-semibold text-center text-base"}>Almost there, now click the button to add your product.</h2>
                    <Button
                        leftIcon="+"
                        text="Add a Product"
                        bgColor="blue"
                        className={styles.addCouponBtn + " mt-2"}
                        onClick={() => router.push("/account/kreator/products/create")}
                    />
				</div>
			</div>
		</AuthLayout>
	);
};

export default AllProducts;
