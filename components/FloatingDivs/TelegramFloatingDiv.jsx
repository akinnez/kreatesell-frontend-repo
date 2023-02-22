import React from 'react';
import Image from 'next/image';
import {TelegramIcon} from 'utils';

const TelegramFloatingDiv = ({ left, top  }) => {
	return (
		<div
			style={{
				position: 'fixed',
				left:left,
				top:top,
				cursor: 'pointer',
				zIndex: '10000',
			}}
		>
			<a
				href="https://t.me/UseKreateSell"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Image
					src={TelegramIcon}
					alt="telegram__icon"
					width={70}
					height={70}
				/>
			</a>
		</div>
	);
};

export default TelegramFloatingDiv;
