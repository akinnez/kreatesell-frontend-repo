import {
	// DateHeader,
	Button,
	AllProductsTableHeader,
	CouponHeader,
	emptyComponent
} from "components";

import { DownloadIcon, placeholder2 } from "utils";
import AuthLayout from "../../../../components/authlayout";
import styles from "../../../../public/css/AllProducts.module.scss";
import Image from "next/image";
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

	const { page, total_records, limit } = productPagination;

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

	// const handleSearchSubmit = () =>
	// 	getProducts(1, productName, startDate, endDate, productStatusId);
	const handlePaginationChange = (page) => getProducts(page);

	const tableLocale = {
		emptyText: (
			emptyComponent("No record yet")
		)
	
	}

	useEffect(()=>{
		console.log(memoisedProductData)
	}, [memoisedProductData])
	 const mockDatas = [
		{
		  key: '1',
		  product_image: placeholder2,
		  product_name: 'John Brown',
		  product_type: "Membership",
		  price: {
			  currency: 'EUR',
			  productPrice: 235
		  } ,
		  date_created: "13-26-9282",
		  status: 'live',
		  actions: {
			  product_data: {
				  id: 3456
			  },
			  product_details:{
				product_name: 'ytdfghj',
				kreasell_product_id: 435678
			  }
		  }
		},
		{
		  key: '2',
		  product_image: placeholder2,
		  product_name: 'Jim Green',
		  product_type:" Digital Download",
		  price: {
			  currency: 'NGN',
			  productPrice: 235
		  },
		  date_created:"13-26-9282",
		  status: 'draft',
		  actions: {
			  product_data: {
				  id: 3456
			  },
			  product_details:{
				product_name: 'ytdfghj',
				kreasell_product_id: 435678
			  }
		  }
		},
		{
		  key: '3',
		  product_image: placeholder2,
		  product_name: 'Joe Black',
		  product_type: "One-Time Subscription",
		  price: {
			  currency: 'USD',
			  productPrice: 500
		  },
		  date_created:"13-26-9282",
		  status: 'flagged',
		  actions: {
			  product_data: {
				  id: 3456
			  },
			  product_details:{
				product_name: 'ytdfghj',
				kreasell_product_id: 435678
			  }
		  }
		},
		{
		  key: '4',
		  product_image: placeholder2,
		  product_name: 'The Land of Hope and Opportunities',
		  product_type: "One-Time Subscription",
		  price: {
			  currency: 'USD',
			  productPrice: 500
		  },
		  date_created:"13-26-9282",
		  status: 'deactivated',
		  actions: {
			  product_data: {
				  id: 3456
			  },
			  product_details:{
				product_name: 'ytdfghj',
				kreasell_product_id: 435678
			  }
		  }
		},
	  ];
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
						dataSource={mockDatas}
						pagination={{
							position: ["none","bottomLeft"],
							total: total_records,
							defaultCurrent: 1,
							onChange: handlePaginationChange,
							current: page,
							defaultPageSize: limit
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
