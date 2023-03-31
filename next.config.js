const {
	PHASE_DEVELOPMENT_SERVER,
	PHASE_PRODUCTION_BUILD,
} = require('next/constants');

// This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
module.exports = (phase) => {
	// when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environment variable
	const isDev = phase === PHASE_DEVELOPMENT_SERVER;
	// when `next build` or `npm run build` is used
	const isProd =
		phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';
	// when `next build` or `npm run build` is used
	const isStaging =
		phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1';
	const env = {
		isDev: isDev,
		isProd: isProd,
		BASE_URL:'https://kreatesell-pilot.azurewebsites.net/api/',
		// BASE_URL: 'https://kreatesell-pilot.azurewebsites.net/api/',
		NEXT_PUBLIC_RECAPTCHA_SITE_KEY:
			'6Le7-jQcAAAAAOHkoLvhdgAjcmfi2gcHjLKkCzYB',
		DISQUS_SHORTNAME: 'kreatesell-com',
		FB_APP_ID: 429932695011083,
		GOOGLE_CLIENT_KEY:
			'1056121378929-mvsh5rqbqp4mq6jaktlull3jhs6rtevu.apps.googleusercontent.com',
		DISQUS_PUBLIC_KEY:
			'6lSQoKFGTpA9fercSGt0klM60BCv7vgF2PMnPb1NqNhpo6HTmwRpkRfAs4VVMLFp',
		NEXT_PUBLIC_RECAPTCHA_SITE_KEY:
			'6Le7-jQcAAAAAOHkoLvhdgAjcmfi2gcHjLKkCzYB',
		NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY:
			'pk_live_862dd40636ff51c765e98e2a5424c398cde511fd',
		NEXT_PUBLIC_PAYSTACK_GHANA_PUBLIC_KEY:
			'pk_live_dcdd1c4edd578e9183f1386cd41903f37f801811',
		NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY: 'FLWPUBK-248deb1e4c4da9c14870e2ad5300b513-X',
		NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: 'pk_live_51KHkOkEiRwUsDs0AlNvA7bynwKfMvaj7rdfGpejucsZalNh7KwlWe3RcUizNoYk16yvJ9MSgcALp5SzUFAyFAA3g00OnWxz6eA',
		NEXT_SECRET_STRIPE_PUBLISHABLE_KEY:
			'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',
		//  kreatesell paypal
		NEXT_PUBLIC_PAYPAL_PUBLISHABLE_KEY:
			'AW7u10uJYBenaA-igO_LE3kZFljEyvqIQtl_gI7NM8bsl8ItY6m4g8mHaYl41FJHgvjZiJ2RnoOQkKcf',
		// TODO: ensure that this
		// NEXT_PUBLIC_PAYPAL_PUBLISHABLE_KEY:
		// 	'AQWU0_H74bp7gktmP1olCxUqoXxweGxkGxGl8jE-Pw-_8p_OtQUumWjdyP2boRwcBtSHebPXY1LKv2vP',
		NEXT_COINBASE_API_KEY: 'f623b9a9-26ad-42b9-ad02-b9a05f252997',
		NEXT_COINBASE_SECRET_KEY: '5095cd73-2074-4c63-a772-dba4a8601886',
	};
	const images = {
		domains: [
			'res.cloudinary.com',
			'flagcdn.com',
			'upload.wikimedia.org',
			'www.bellanaija.com',
			'i.pinimg.com',
			'',
		],
	};
	// next.config.js object
	return {
		env,
		images,
	};
};
