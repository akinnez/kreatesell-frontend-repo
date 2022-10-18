import {Button, Typography} from 'antd';
import styles from './index.module.scss';

const FilteredPersonification = ({
	data,
	personifications,
	setPersonifications,
}) => {
	const handleClick = (name) => {
		if (!personifications.includes(name)) {
			setPersonifications((s) => [...s, name]);
		} else {
			setPersonifications((s) => s.filter((item) => item !== name));
		}
	};

	return (
		<>
			{data.map(({id, tag, name}) => (
				<div className={styles.email__tag} key={id}>
					<Button
						type={
							personifications.includes(name)
								? 'primary'
								: 'default'
						}
						shape="round"
						onClick={() => handleClick(name)}
					>
						{name}
					</Button>
					<Typography.Text>{`{${tag}}`}</Typography.Text>
				</div>
			))}
		</>
	);
};

export default FilteredPersonification;
