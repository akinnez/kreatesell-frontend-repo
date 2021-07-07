import styles from "./Input.module.scss";

export const Input = ({
	type,
	placeholder,
	label,
	name,
	errorMessage,
	...rest
}) => {
	return (
		<div className={`${rest.containerStyle} ${styles.inputContainer}`}>
			<label htmlFor={name} className={styles.label}>
				{label}
			</label>
			<input
				{...rest}
				type={type}
				placeholder={placeholder}
				name={name}
				className={`${rest.className} ${styles.input}`}
			/>
		</div>
	);
};
