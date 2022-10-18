import Image from 'next/image';
import Clipboard from 'public/images/clipboards.png';
import styles from './index.module.scss';

const NoNotifications = ({width = 70, height = 70}) => (
	<div className={styles.no__notifications}>
		<Image src={Clipboard} alt="Clipboard" width={width} height={height} />
		<p>No notifications yet</p>
	</div>
);

export default NoNotifications;
