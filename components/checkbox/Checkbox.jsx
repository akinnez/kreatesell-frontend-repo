import styles from './Checkbox.module.scss';

export const Checkbox = ({
	onChange,
	name,
	children = null,
	labelStyle = '',
	...rest
}) => {
	return (
		<label className={`${styles.checkbox} ${labelStyle}`}>
			<input
				{...rest}
				name={name}
				onChange={onChange}
				type="checkbox"
				className={`${styles.input} ${rest.className}`}
			/>
			{children}
		</label>
	);
};
