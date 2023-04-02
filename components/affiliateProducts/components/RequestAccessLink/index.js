import Link from 'next/link';

import {AiOutlineArrowRight} from 'react-icons/ai';
import {Tooltip} from 'antd';

import styles from './index.module.scss';

const RequestAccessLink = ({productId, status}) => (
	<>
		{!status ? (
			<Link href={`/account/affiliate/market-place/${productId}`}>
				<a className={styles.request__link}>
					Request Access
					<AiOutlineArrowRight />
				</a>
			</Link>
		) : (
			<Tooltip
				overlayStyle={{
					width: '200px',
					borderRadius: '10px',
				}}
				title={'You have already requested access to this product'}
				placement="bottomRight"
			>
				<a className={styles.request__link} disabled>
					Request Access
					<AiOutlineArrowRight />
				</a>
			</Tooltip>
		)}
	</>
);

export default RequestAccessLink;
