import styles from "./Checkbox.module.scss";

export const Checkbox = ({ onChange, ...rest }) => {
	return (
		<div className={styles.checkbox}>
			<input
				{...rest}
				onChange={onChange}
				type="checkbox"
				required
				className={`${styles.input} ${rest.className}`}
			/>
		</div>
	);
};
