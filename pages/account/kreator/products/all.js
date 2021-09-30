import { DateHeader, Button, Table, AllProductsTableHeader } from "components";
import { DownloadIcon } from "utils";
import AuthLayout from "../../../../components/authlayout";
import styles from "../../../../public/css/AllProducts.module.scss";
import Image from "next/image";
import { ProductsTableData } from "components/tableHeader/dummyTableData";
// import { allP } from "components/tableHeader";
// ProductsTableData

AllProductsTableHeader;
const AllProducts = () => {
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
						/>
					</div>
				</div>

				<DateHeader showSelect={false} />

				<div className="flex justify-end pt-3">
					<div className="text-primary-blue  font-semibold text-xs pr-2">
						Export Data in CSV
					</div>
					<Image src={DownloadIcon} />
				</div>

				<div>
					<Table header={AllProductsTableHeader} data={ProductsTableData} />
				</div>
			</div>
		</AuthLayout>
	);
};

export default AllProducts;
