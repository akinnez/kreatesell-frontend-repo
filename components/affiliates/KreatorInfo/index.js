import Link from 'next/link';
import {HiOutlineExternalLink} from 'react-icons/hi';
import styles from './index.module.scss';

const KreatorInfo = ({children, href}) => (
	<>
		{children}
		<Link href={`/account/affiliate/preview/kreator/${href}`}>
			<a className={styles.store__link}>
				Visit Store&nbsp;&nbsp; <HiOutlineExternalLink />
			</a>
		</Link>
	</>
);

export default KreatorInfo;
