import styles from "./InputButton.module.scss";

export const InputButton = ({
	name,
	placeholder,
	onChange,
	buttonText,
	buttonIcon,
	disableBtn,
	onSubmit,
}) => {
	return (
		<div>
			<form className={styles.container} onSubmit={onSubmit}>
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
			</form>
		</div>
	);
};
