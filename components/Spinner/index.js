import {Spin} from 'antd';
import styles from './index.module.scss';

const Spinner = ({size = 'default'}) => (
	<div className={styles.spinnerWrapper}>
		<Spin size={size} />
	</div>
);

export default Spinner;
