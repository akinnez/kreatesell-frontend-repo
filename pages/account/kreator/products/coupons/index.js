import {
	Button,
	AllCouponTableHeader,
	CouponHeader,
	emptyComponent,
} from 'components';
import {DownloadIcon} from 'utils';
import AuthLayout from '../../../../../components/authlayout';
import styles from '../../../../../public/css/AllProducts.module.scss';
import Image from 'next/image';
import {Table} from 'antd';
import {useRouter} from 'next/router';
import {GetCoupons} from 'redux/actions';
import {useEffect, useState, useMemo} from 'react';
import {useSelector} from 'react-redux';

const Coupon = () => {
	const router = useRouter();
	const getCoupon = GetCoupons();
	const [couponData, setCouponData] = useState([]);
	const {loading, coupons} = useSelector((state) => state.coupon);
	useEffect(() => {
		getCoupon();
	}, []);

	useEffect(() => {
		setCouponData(coupons);
	}, [coupons]);

	const memoisedCouponData = useMemo(
		() =>
			couponData
				?.sort((a, b) =>
					a.coupons?.date_created < b.coupons?.date_created ? 1 : -1
				)
				?.map((item, i) => ({
					...item,
					key: i + 1,
					numbers: i + 1,
					product_name: item.coupons.is_for_all_product
						? 'All Products'
						: 'Item',
					code: item?.coupons?.coupon_code,
					start_date: item?.coupons?.date_created,
					end_date: item?.coupons?.end_date,
					status: item?.coupons?.status,
					usages: item?.usage,
					discount: item.coupons.is_percentage
						? `${item.coupons.percentage_value}%`
						: `NGN ${item.coupons.fixed_amount_value}`,
					max_usages:
						item.coupons.number_of_usages === -1
							? 'N/A'
							: item.coupons.number_of_usages,
					quantity: 1,
					more: {
						id: item.coupons.id,
					},
					// price: {
					// 	currency: item.default_currency ? item.default_currency : item.product_currencies[0].currency_short_name,
					// 	productPrice: item?.default_price,
					// },
					// actions: {
					// 	product_details: {
					// 		id:item?.product_details?.id,
					// 		kreasell_product_id: item?.product_details?.kreasell_product_id,
					// 		product_name: item?.product_details?.product_name,
					// 		product_link: `${domainLink}/${item?.product_details?.kreasell_product_id}`
					// 	}
					// },
				})),
		[couponData]
	);

	// const data = [
	// 	{
	// 	  key: '1',
	// 	  name: 'John Brown',
	// 	  age: 32,
	// 	  address: 'New York No. 1 Lake Park',
	// 	  tags: ['nice', 'developer'],
	// 	},
	// 	{
	// 	  key: '2',
	// 	  name: 'Jim Green',
	// 	  age: 42,
	// 	  address: 'London No. 1 Lake Park',
	// 	  tags: ['loser'],
	// 	},
	// 	{
	// 	  key: '3',
	// 	  name: 'Joe Black',
	// 	  age: 32,
	// 	  address: 'Sidney No. 1 Lake Park',
	// 	  tags: ['cool', 'teacher'],
	// 	},
	//   ];
	const tableLocale = {
		emptyText: emptyComponent('No record yet'),
	};
	return (
		<AuthLayout>
			<div className={styles.allProduct + ' pb-10'}>
				<div className="flex justify-between mb-4">
					<h3 className=" font-semibold text-2xl">Coupon</h3>
					<Button
						text="+ Add a Coupon"
						bgColor="blue"
						className={styles.addCouponBtn1 + 'my-3 pr-2 pl-2'}
						onClick={() =>
							router.push(
								'/account/kreator/products/coupons/create'
							)
						}
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
					<h2
						className={
							styles.lightGrey +
							' mb-0 text-lg font-semibold pl-2'
						}
					>
						Coupons
					</h2>
					<div className="flex justify-end items-center cursor-pointer">
						<div className="text-primary-blue  font-semibold text-xs pr-2">
							Export Data in CSV
						</div>
						<Image alt="" src={DownloadIcon} />
					</div>
				</div>

				<div className="lg:block mb-16 mt-8">
					<Table
						columns={AllCouponTableHeader}
						locale={tableLocale}
						dataSource={memoisedCouponData}
						loading={loading}
						pagination={{
							position: ['none', 'bottomLeft'],
						}}
						size="large"
						scroll={{
							x: 1000,
						}}
					/>
				</div>
				<div className="flex flex-col items-center">
					<h2
						className={
							styles.lightGrey +
							' font-semibold text-center text-base'
						}
					>
						Provide your potential customers with a coupon to pique
						their interest in buying your product(s).
					</h2>
					<Button
						leftIcon="+"
						text="Add a Coupon"
						bgColor="blue"
						className={styles.addCouponBtn + ' mt-2'}
						onClick={() =>
							router.push(
								'/account/kreator/products/coupons/create'
							)
						}
					/>
				</div>
			</div>
		</AuthLayout>
	);
};

export default Coupon;
