export const isPathMatched = (routerPath, expectedPath) => {
	return expectedPath === routerPath;
};

let mobileHeadingText = '';

export const getHeadingFromPath = (path) => {
	const pathWithRoot = (path) => `/legal/${path}`;

	switch (path) {
		case pathWithRoot('affiliate-policy'):
			mobileHeadingText = 'affiliate policy';
			break;
		case pathWithRoot('cookie-policy'):
			mobileHeadingText = 'cookie policy';
			break;
		case pathWithRoot('privacy-policy'):
			mobileHeadingText = 'privacy policy';
			break;
		case pathWithRoot('terms-of-service'):
			mobileHeadingText = 'terms of service';
			break;
		default:
			mobileHeadingText = '...';
	}
	return mobileHeadingText;
};
