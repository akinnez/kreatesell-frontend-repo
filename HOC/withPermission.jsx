import React from 'react';
import {useRouter} from 'next/router';

import {useSelector} from 'react-redux';

import {showToast} from 'utils';

/**
 *
 * @param {*} Component
 * @param {*} callback - function that returns true or false based on if the user has permissions
 * @returns
 */
const withPermission = (Component) => {
	const ComponentParent = (props) => {
		const {back} = useRouter();
		// const {user}
		const permissions = {};
		const hasPermission = false;
		if (!hasPermission) {
			// showToast(
			// 	'Redirecting!! You need to have filled your payout details to be able to edit setting!.',
			// 	'info',
			// 	{hideAfter: 5}
			// );
			setTimeout(() => {
				back();
			}, 3000);

			return null;
		}
		return <Component />;
	};

	return ComponentParent;
};

export default withPermission;
