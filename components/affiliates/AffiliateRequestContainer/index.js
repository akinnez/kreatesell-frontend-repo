import {useEffect, useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';

import {useSelector} from 'react-redux';
import {Card, Tabs} from 'antd';
import {MdOutlineRemoveRedEye} from 'react-icons/md';

import BackButton from 'components/BackButton';
import styles from './index.module.scss';

const AffiliateRequestContainer = ({children, productTypeId, productName}) => {
	const router = useRouter();
	const {productTypes} = useSelector((state) => state.product);
	const productType = productTypes.find((type) => type.id === +productTypeId);
	const [path, setPath] = useState(null);
	const [activeTab, setActiveTab] = useState('request');
	// const path = `/account/affiliate/market-place/${queryId}`

	// useEffect(() => {
	// 	if (router.query?.pId) {
	// 		setPath(`/account/affiliate/market-place/${router.query?.pId}`);
	// 	}
	// }, [router.query?.pId]);
	const handleTabChange = (tab) => {
		router.push({pathname: path, query: {activeTab: tab}}, undefined, {});
	};

	// useEffect(() => {
	// 	if (router.query?.activeTab) {
	// 		setActiveTab(router.query.activeTab);
	// 	}
	// }, [router.query]);

	return (
		<>
			<header className={styles.header}>
				<span>
					<BackButton />
				</span>
				<h1>
					{productName} -{' '}
					<span>{productType?.product_type_name}</span>
				</h1>
				<Link
					href={`/account/affiliate/preview/product/${router.query.pId}`}
				>
					<a>
						<MdOutlineRemoveRedEye /> View Product Page
					</a>
				</Link>
			</header>
			<div className={styles.card__container}>
				<Tabs
					// activeKey={activeTab}
					className={styles.tabs}
					defaultActiveKey="1"
					centered
					// onChange={handleTabChange}
				>
					{children}
				</Tabs>
			</div>
		</>
	);
};

export default AffiliateRequestContainer;
