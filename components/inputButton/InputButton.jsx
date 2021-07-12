import styles from "./InputButton.module.scss";

export const InputButton = ({
	name,
	placeholder,
	onChange,
	buttonText,
	buttonIcon,
	disableBtn,
}) => {
	return (
		<div className={styles.container}>
			<input
				type="text"
				name={name}
				placeholder={placeholder}
				onChange={onChange}
			/>
			<button disabled={disableBtn}>
				<p className={styles.btnText}>{buttonText}</p>
				<div className={styles.btnIcon}>{buttonIcon}</div>
			</button>
		</div>
	);
};
