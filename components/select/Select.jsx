import styles from "./Select.module.scss";

export const Select = ({ name, options, onChange, ...rest }) => {
	return (
		<div className={`${styles.select} ${rest.className}`}>
			{/* <div className={styles.select}> */}
			<select
				name={name}
				onChange={onChange}
				defaultValue={options?.[0]}
				{...rest}
			>
				{options?.map((item, i) => (
					<option value={item} key={i}>
						{item}
					</option>
				))}
			</select>
		</div>
	);
};
