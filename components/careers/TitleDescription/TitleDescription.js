import React from 'react';
import PropTypes from 'prop-types';

import styles from './TitleDescription.module.scss';

const TitleDescription = ({description, title}) => {
	return (
		<div className={styles.container}>
			<h3 className={styles.title}>{title}</h3>
			<p
				className={styles.description}
				dangerouslySetInnerHTML={{
					__html: description,
				}}
			/>
		</div>
	);
};

TitleDescription.defaultProps = {};

TitleDescription.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
};

export default TitleDescription;
