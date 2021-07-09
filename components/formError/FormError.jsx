import styles from "./FormError.module.scss";

export const FormError = ({ errors }) => {
	const error = Object.values(errors)?.map((data) => data);
	return (
		<div className={styles.error}>
			<p>{error?.[0]}</p>
		</div>
	);
};
