import React from 'react';
import PropTypes from 'prop-types';
import {useRouter} from 'next/router';

import styles from './PositionsCard.module.scss';
import {Button} from '../../';

const PositionsCard = ({title, description, roles, path}) => {
	const router = useRouter();
	return (
		<div className={styles.container}>
			<h3 className={styles.positionName}>{title}</h3>
			<p
				className={styles.positionDescription}
				dangerouslySetInnerHTML={{
					__html: description,
				}}
			/>
			<div className={styles.jobRolesContainer}>
				<ul className={styles.jobDetails}>
					{roles.map((role, idx) => (
						<li key={idx} className={styles.job}>
							{role}
						</li>
					))}
				</ul>
				<div className={styles.callToActionButton}>
					<Button
						onClick={() => router.push(path)}
						text="Apply Now"
						bgColor="blue"
						className={styles.actionBtn}
					/>
					<p className={styles.status}>Status: Open</p>
				</div>
			</div>
		</div>
	);
};

PositionsCard.defaultProps = {
	path: '/',
};

PositionsCard.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	roles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PositionsCard;
