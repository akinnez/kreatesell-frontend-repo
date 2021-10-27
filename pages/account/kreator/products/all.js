import {
	// DateHeader,
	Button,
	Table,
	AllProductsTableHeader,
	ProductHeader,
} from "components";
import { DownloadIcon } from "utils";
import AuthLayout from "../../../../components/authlayout";
import styles from "../../../../public/css/AllProducts.module.scss";
import Image from "next/image";
// import { ProductsTableData } from "components/tableHeader/dummyTableData";
import { Pagination } from "antd";
import { MobileProductCard } from "components/tableHeader";
import { useRouter } from "next/router";
import { GetProducts } from "redux/actions";
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";

const AllProducts = () => {
	const router = useRouter();
	const getProducts = GetProducts();
	const { products, loading, productPagination } = useSelector(
		(state) => state.product
	);

	const { page, total_records } = productPagination;

	const [productData, setProductData] = useState([]);

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
	}, []);

	useEffect(() => {
		setProductData(products);
	}, [products]);

	const handlePaginationChange = (page) => getProducts(page);

	return (
		<AuthLayout>
			<div className={styles.allProduct}>
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

				{/* <DateHeader showSelect={false} /> */}
				<ProductHeader />

				<div className="flex justify-end pt-3">
					<div className="text-primary-blue  font-semibold text-xs pr-2">
						Export Data in CSV
					</div>
					<Image src={DownloadIcon} />
				</div>

				<div className="hidden lg:block mb-16 mt-8">
					<Table
						header={AllProductsTableHeader}
						data={memoisedProductData}
						loading={loading}
					/>
				</div>

				{memoisedProductData?.map((item, i) => (
					<MobileProductCard item={item} key={item?.id || i} />
				))}

				{productData?.length && (
					<div className="py-8 lg:pt-0">
						<Pagination
							defaultCurrent={1}
							onChange={handlePaginationChange}
							current={page}
							total={total_records}
							defaultPageSize={10}
						/>
					</div>
				)}
			</div>
		</AuthLayout>
	);
};

export default AllProducts;
