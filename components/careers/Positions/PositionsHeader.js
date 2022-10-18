import React from 'react';
import PropTypes from 'prop-types';

import {Divider} from 'antd';

import {Button} from '../../';
import styles from './PositionsHeader.module.scss';

const PositionsHeader = ({title, roles}) => {
	return (
		<>
			<div className={styles.container}>
				<h3 className={styles.left}>{title}</h3>

				<Button text={`${roles}`} className={styles.right} />
			</div>
			<div className={styles.dividerContainer}>
				<Divider className={styles.divider} />
			</div>
		</>
	);
};

PositionsHeader.defaultProps = {};

PositionsHeader.propTypes = {
	title: PropTypes.string.isRequired,
	roles: PropTypes.string.isRequired,
};

export default PositionsHeader;
