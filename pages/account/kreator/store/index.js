import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Row, Column, Divider} from '../../../../components/grid';
import styles from '../../../../public/css/Store.module.scss';
import AuthLayout from '../../../../components/authlayout';
import {Button} from '../../../../components/inputPack';
import {Card} from '../../../../components/card';
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import List from '../../../../components/list2';
import Router from 'next/router';
import {ProtectedStoreHeader} from '../../../../components/store/storeHeader';
import useSWR from 'swr';
import fetcher from '../../../../utils/fetcher';
import {GetStoreDetails, GetProducts} from 'redux/actions';
import TelegramFloatingDiv from 'components/FloatingDivs/TelegramFloatingDiv';

const cardStyles = {
	borderRadius: '8px',
	padding: '35px 30px',
};

const progressbarStyles = buildStyles({
	rotation: 0.3,
	strokeLinecap: 'round',
	textSize: '24px',
	fontWeight: 600,
	pathTransitionDuration: 0.5,
	pathColor: '#0072EF',
	textColor: '#595959',
	trailColor: '#E6F7FF',
});

const Index = () => {
	const [loading, setLoading] = useState(false);
	const {products} = useSelector((state) => state.product);
	const {
		store: {bank_details},
	} = useSelector((state) => state.store);
	const getStoreDetails = GetStoreDetails();
	const getProducts = GetProducts();

	const {data} = useSWR('v1/kreatesell/store/me', fetcher);
	// useEffect(()=>{
	//     setLoading(true)
	//     ApiService.request(
	//         'get',
	//         'v1/kreatesell/store/me',
	//     ({data})=>{
	//         setData(data)
	//         setLoading(false)
	//     })
	// },[])

	function calculatePercentageComplete() {
		let task_completed = {};
		task_completed.bankAccount = bank_details ?? bank_details;
		task_completed.AddedProducts = products.length > 0;
		return task_completed;
	}

	const hasAddedProduct = calculatePercentageComplete().AddedProducts;
	// console.log('hasAddedProduct = ', hasAddedProduct)

	// console.log('hasAddedProduct = ', hasAddedProduct)

	useEffect(() => {
		getStoreDetails();
		getProducts();
	}, []);
	return (
		<>
			<AuthLayout loading={loading}>
				<TelegramFloatingDiv left="15%" top="50%"/>
				<ProtectedStoreHeader
					brandName={data?.store_details?.brand_name}
					storeName={data?.store_details?.store_name}
					coverImage={data?.store_details?.cover_page}
					displayPicture={data?.store_details?.display_picture}
					social={{
						facebook: data?.store_details?.facebook,
						twitter: data?.store_details?.twitter,
						instagram: data?.store_details?.instagram,
						linkedIn: data?.store_details?.linked_ln,
					}}
				/>
				<Row style={{marginTop: '100px'}}>
					<Column m="7" s="12">
						<Card style={cardStyles}>
							<div className={styles.bio_info}>
								<h5>Bio</h5>
								<p>{data?.store_details?.bio_data}</p>
							</div>
						</Card>
					</Column>
					<Column m="5">
						<Card style={{...cardStyles}}>
							<div className={styles.progress_wrapper}>
								<div className={styles.progress}>
									<CircularProgressbar
										text={data?.percentage_completed + '%'}
										value={data?.percentage_completed}
										strokeWidth={15}
										styles={progressbarStyles}
									/>
								</div>
								<div id={styles.progress_text}>
									<p>
										You&#39;ve completed{' '}
										<strong>
											{data?.percentage_completed}%
										</strong>{' '}
										of your store setup
									</p>
								</div>
							</div>
							<Divider />

							<List
								step={
									data?.percentage_completed <= 40
										? 0
										: data?.percentage_completed > 40 &&
										  data?.percentage_completed < 100
										? 1
										: 3
								}
								list={[
									{
										text: 'Complete your store profile details',
										route: '/account/kreator/store/edit',
										completed: true,
									},
									{
										text: 'Add your bank account details to receive your payments',
										route: '/account/sales/payouts',
										completed:
											calculatePercentageComplete()
												.bankAccount,
									},
									{
										text: 'Add your first product to increase your store completion',
										route: '/account/kreator/products/create',
										completed:
											calculatePercentageComplete()
												.AddedProducts,
									},
								]}
							/>
						</Card>
					</Column>
				</Row>

				<Row>
					<Column
						m="12"
						s="12"
						align="center"
						style={{marginTop: '20px'}}
					>
						{!hasAddedProduct && (
							<p>
								Almost there, now click the button to add your
								product
							</p>
						)}
						<Button
							label="+ Add Product"
							style={{marginTop: '20px'}}
							onClick={() =>
								Router.push('/account/kreator/products/create')
							}
						/>
					</Column>
				</Row>
			</AuthLayout>
		</>
	);
};

export default Index;
