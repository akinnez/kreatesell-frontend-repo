import {Button} from 'antd';
import {MdOutlineCancel} from 'react-icons/md';
import styles from './index.module.scss';

const ResetFilters = ({resetFilters}) => (
	<div className={styles['reset-filters']}>
		<Button shape="round" icon={<MdOutlineCancel />} onClick={resetFilters}>
			Clear Filters
		</Button>
	</div>
);

export default ResetFilters;
