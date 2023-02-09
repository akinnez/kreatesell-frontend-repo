import React from 'react';
import Image from 'next/image';
import styles from './Index.module.scss';

import Drawer from 'react-bottom-drawer';

import {Button} from 'components';

export const VerifiedDrawer = ({showDrawer, onClose, children}) => {
	return (
		<Drawer
			isVisible={showDrawer}
			onClose={onClose}
			// mountOnEnter={true}
			// unmountOnExit={true}
			// duration={250}
			// hideScrollbar={false}
			className={styles.drawerContainer}
		>
			{children}
		</Drawer>
	);
};
