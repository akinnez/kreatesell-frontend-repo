import styles from "./Button.module.scss";

export const Button = ({
	type = "submit",
	text = "Submit",
	loading,
	disabled,
	bgColor = "white",
	icon,
	...rest
}) => {
	return (
		<button
			{...rest}
			disabled={loading || rest.disabled}
			type={type}
			className={`
			${rest.className}
			${styles.button}
			${bgColor === "white" && styles.btnWhite} 
			${bgColor === "blue" && styles.btnBlue}
			${bgColor === "primaryBlue" && styles.primaryBlue}
			`}
		>
			<div className={styles.buttonValue}>
				{text}
				{icon && <div className={styles.buttonIcon}>{icon}</div>}
			</div>
		</button>
	);
};
