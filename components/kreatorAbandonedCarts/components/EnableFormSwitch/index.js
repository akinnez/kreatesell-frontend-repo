import {Switch} from 'antd';
import styles from './index.module.scss';

const EnableFormSwitch = ({formik, customHandler}) => (
	<div className={styles.form__switch}>
		<div>
			<label htmlFor="switch">Enabled?</label>
		</div>
		<Switch
			id="switch"
			onChange={(checked) => customHandler('enable', checked)}
			onBlur={formik.handleBlur}
			checked={formik.values.enable}
			name="enable"
		/>
		<div>
			<span>{formik.values.enable ? 'Enabled' : 'Disabled'}</span>
		</div>
	</div>
);

export default EnableFormSwitch;
