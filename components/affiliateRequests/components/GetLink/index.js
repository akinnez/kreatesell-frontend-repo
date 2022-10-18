import Link from 'next/link';
import {MdOutlineLink} from 'react-icons/md';
import styles from './index.module.scss';

const GetLink = ({productId, status}) => (
	<>
		{status === 'Approved' ? (
			<Link href={`/account/affiliate/requests/${productId}`}>
				<a className={styles.link}>
					Get Link <MdOutlineLink />
				</a>
			</Link>
		) : (
			<a className={styles.link} disabled>
				Get Link <MdOutlineLink />
			</a>
		)}
	</>
);

export default GetLink;
