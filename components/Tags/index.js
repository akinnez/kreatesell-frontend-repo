import styles from './index.module.scss';

const mapper = {
	green: styles.green,
	red: styles.red,
	orange: styles.orange,
};

const Tags = ({color, children}) => {
	return (
		<span
			className={`${styles.tag} ${
				color && mapper[color] ? mapper[color] : styles.default
			}`}
		>
			{children}
		</span>
	);
};

export default Tags;
