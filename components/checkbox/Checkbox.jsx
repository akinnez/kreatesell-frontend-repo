import styles from "./Checkbox.module.scss";

export const Checkbox = ({ onChange, name, ...rest }) => {
	return (
		<div className={styles.checkbox}>
			<input
				{...rest}
				name={name}
				onChange={onChange}
				type="checkbox"
				className={`${styles.input} ${rest.className}`}
			/>
		</div>
	);
};
