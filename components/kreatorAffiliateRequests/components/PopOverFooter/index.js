import {Button} from 'antd';
import {AiOutlineStop} from 'react-icons/ai';
import styles from './index.module.scss';

const PopOverFooter = ({affiliateReported, affiliateId, showReport}) => {
	const reported = affiliateReported === 'true' ? true : false;

	return (
		<footer className={styles.footer}>
			{reported ? (
				<Button size="large" icon={<AiOutlineStop />} disabled>
					Reported
				</Button>
			) : (
				<Button
					size="large"
					danger
					onClick={() => showReport(affiliateId)}
					icon={<AiOutlineStop />}
				>
					Report Affiliate
				</Button>
			)}
		</footer>
	);
};

export default PopOverFooter;
