import styles from './FormSuccess.module.scss';

export const FormSuccess = ({message}) => {
	return (
		<div className={styles.success}>
			<p>{message}</p>
		</div>
	);
};
