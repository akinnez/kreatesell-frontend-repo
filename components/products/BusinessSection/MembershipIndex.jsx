import {Button} from 'antd';
import Image from 'next/image';
import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';

import {
	EmptyDataTable,
	Subscribers,
	MobileViewSubscribers,
	MobileSettingsIcon,
	RenderIf,
} from 'utils';
import productStyles from '../../../public/css/AllProducts.module.scss';
import AddSection from './AddSection';
import styles from './MembershipTab.module.scss';
import {CreateSection, AuthGetProductById} from 'redux/actions';

export default function MembershipIndex({
	setIsTabsActive,
	setMajorPage,
	toSection,
}) {
	const route = useRouter();
	const [fields, setFields] = useState('adding section');
	const createSection = CreateSection();
	const getProduct = AuthGetProductById();
	const [productData, setProductData] = useState(null);

	const {product, productID} = useSelector((state) => state.product);
	const toManageSection = () => {
		setIsTabsActive(false);
		setMajorPage('manage-section');
	};
	useEffect(() => {
		if (Object.keys(product).length > 0) {
			const {product_content} = product;
			// console.log(product_content)
			setProductData(product_content);
		}
	}, [product]);

	useEffect(() => {
		if (productData === null || productData.length <= 0) {
			setFields('empty');
		} else {
			setFields('adding section');
		}
		return () => {
			setFields('adding section');
		};
	}, [productData]);
	const addSection = () => {
		createSection(
			{
				product_id: product?.product_details?.id,
				kreatesell_id: product?.product_details?.kreasell_product_id,
				product_content_name: `Section ${
					product?.product_content.length + 1
				}`,
				action: 'c',
			},
			() => {
				getProduct(productID);
			}
		);
	};

	return (
		<div className="flex flex-col mt-7">
			<div
				className={`flex items-center justify-between mb-7 ${styles.sectionContainerTitle}`}
			>
				<h1 className={``} style={{color: '#0072ef'}}>
					{product?.product_details?.product_name}
				</h1>
				{fields === 'empty' && (
					<div className={styles.miniSaveButton}>
						<Button
							onClick={() => {
								addSection();
								setFields('adding section');
							}}
							type="primary"
						>
							+ Add Content
						</Button>
					</div>
				)}
				{fields === 'adding section' && (
					<div className={styles.miniSaveButtons + ' flex'}>
						<Button
							type="default"
							icon={<Image src={Subscribers} alt="empty" />}
							onClick={() => {
								product?.product_type_details === 'Membership'
									? route.push(
											`/account/kreator/products/view-subscribers?KreatorProductId=${product.product_details.id}`
									  )
									: route.push(
											`/account/kreator/products/view-onetime-subscribers?KreatorProductId=${product.product_details.id}`
									  );
							}}
						>
							{' '}
							View Subscribers
						</Button>
						<Button
							type="primary"
							onClick={() => toManageSection()}
							style={{color: '#0072ef'}}
						>
							Manage All Sections
						</Button>
						<RenderIf
							condition={
								product?.product_type_details === 'Membership'
							}
						>
							<Button
								type="primary"
								onClick={() =>
									route.push(
										`/account/kreator/products/preview-membership/${product.product_details.kreasell_product_id}`
									)
								}
							>
								Preview Membership
							</Button>
						</RenderIf>
						<RenderIf
							condition={
								product?.product_type_details ===
								'One-Time Subscription'
							}
						>
							<Button
								type="primary"
								onClick={() =>
									// TODO: change the page it routes to to a one time subscription page
									route.push(
										`/account/kreator/products/preview-subscription/${product.product_details.kreasell_product_id}`
									)
								}
							>
								Preview Subscription
							</Button>
						</RenderIf>
					</div>
				)}
				{/* mobile */}
				{fields === 'adding section' && (
					<div className={styles.miniSaveButtonsMobile + ' flex'}>
						<Button
							type="default"
							onClick={() =>
								route.push(
									`/account/kreator/products/view-subscribers`
								)
							}
						>
							<Image src={MobileViewSubscribers} alt="empty" />
						</Button>
						<Button
							type="primary"
							className="flex gap-x-2"
							onClick={() => toManageSection()}
							icon={<Image src={MobileSettingsIcon} />}
							style={{color: '#0072ef'}}
						>
							{' '}
							{'  '}Manage All
						</Button>
						<Button
							type="primary"
							onClick={() =>
								route.push(
									`/account/kreator/products/preview-subscription/${product.product_details.kreasell_product_id}`
								)
							}
						>
							Preview
						</Button>
					</div>
				)}
			</div>
			{fields === 'empty' && (
				<>
					{' '}
					<div
						className={
							productStyles.emptyTable + ' bg-white flex flex-col'
						}
					>
						<Image src={EmptyDataTable} alt="empty" />
						<h2
							className={
								productStyles.lightGrey +
								' mt-5 font-semibold text-lg'
							}
						>
							No Content has been added yet
						</h2>
					</div>
					<div className="flex flex-col mt-7 pb-8 items-center">
						<h2
							className={
								productStyles.lightGrey +
								' font-semibold text-center text-base'
							}
						>
							Almost there, now click the button to start your
							membership setup.
						</h2>
						<div className={styles.saveButton}>
							<Button
								onClick={() => {
									addSection();
									setFields('adding section');
								}}
								type="primary"
							>
								+ Add Content
							</Button>
						</div>
					</div>
				</>
			)}
			{fields === 'adding section' && (
				<AddSection toSection={toSection} />
			)}
		</div>
	);
}
