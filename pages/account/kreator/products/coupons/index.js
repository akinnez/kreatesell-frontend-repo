import {
	Button,
	AllCouponTableHeader,
	CouponHeader,
	emptyComponent
} from "components";
import { DownloadIcon } from "utils";
import AuthLayout from "../../../../../components/authlayout";
import styles from "../../../../../public/css/AllProducts.module.scss";
import Image from "next/image";
import { Table } from "antd";
import { useRouter } from "next/router";
import { GetProducts, GetProductStatus } from "redux/actions";
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";

const Coupon = () => {
	const router = useRouter();
	
	const data = [
		{
		  key: '1',
		  name: 'John Brown',
		  age: 32,
		  address: 'New York No. 1 Lake Park',
		  tags: ['nice', 'developer'],
		},
		{
		  key: '2',
		  name: 'Jim Green',
		  age: 42,
		  address: 'London No. 1 Lake Park',
		  tags: ['loser'],
		},
		{
		  key: '3',
		  name: 'Joe Black',
		  age: 32,
		  address: 'Sidney No. 1 Lake Park',
		  tags: ['cool', 'teacher'],
		},
	  ];
	  const tableLocale = {
		emptyText: (
			emptyComponent("No record yet")
		)
	}
	return (
		<AuthLayout>
			<div className={styles.allProduct + " pb-10"}>
				<div className="flex justify-between mb-4">
					<h3 className=" font-semibold text-2xl">Coupon</h3>
                    <Button
                        text="+ Add a Coupon"
                        bgColor="blue"
                        className={styles.addCouponBtn1 + " pr-2 pl-2"}
                        onClick={() => router.push("/account/kreator/products/coupons/create")}
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

				<div className="flex justify-between items-center pt-3 mt-5 mr-10">
                    <h2 className={styles.lightGrey + " mb-0 text-lg font-semibold pl-2"}>Coupons</h2>
                    <div className="flex justify-end items-center cursor-pointer">
                        <div className="text-primary-blue  font-semibold text-xs pr-2">
                            Export Data in CSV
                        </div>
                        <Image alt="" src={DownloadIcon} />
                    </div>
				</div>

				<div className="hidden lg:block mb-16 mt-8">
					<Table
						columns={AllCouponTableHeader}
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
                    <h2 className={styles.lightGrey +" font-semibold text-center text-base"}>Provide your potential customers with a coupon to pique their interest in buying your product(s).</h2>
                    <Button
                        leftIcon="+"
                        text="Add a Coupon"
                        bgColor="blue"
                        className={styles.addCouponBtn + " mt-2"}
                        onClick={() => router.push("/account/kreator/products/coupons/create")}
                    />
				</div>
			</div>
		</AuthLayout>
	);
};

export default Coupon;
