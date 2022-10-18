import {Typography} from 'antd';
import styles from './index.module.scss';

const {Text} = Typography;

const SuccessMessage = () => (
	<section className={styles.content}>
		<p>
			<Text>Report Successfully Sent</Text>
		</p>
		<p>
			<Text>
				We would review it and if the affiliate is found guilty, they
				would no longer have access to your products.
			</Text>
		</p>
	</section>
);

export default SuccessMessage;
