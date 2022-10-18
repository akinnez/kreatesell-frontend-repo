import React from 'react';
import PropTypes from 'prop-types';

import {Card as AntdCard} from 'antd';

import style from './Card.module.scss';

const Card = ({Icon, title, description}) => {
	return (
		<AntdCard className={style.container}>
			<div className={style.top}>
				<div className={style.icon}>{Icon}</div>
				<div
					className={style.title}
					dangerouslySetInnerHTML={{
						__html: title,
					}}
				/>
			</div>
			<div className={style.description}>{description}</div>
		</AntdCard>
	);
};

Card.defaultProps = {};

Card.propTypes = {
	// Icon: PropTypes.any,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
};

export default Card;
