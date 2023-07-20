const {
	PHASE_DEVELOPMENT_SERVER,
	PHASE_PRODUCTION_BUILD,
} = require('next/constants');

// This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration

module.exports = {
  // ...
  
  // ...
};
module.exports = (phase) => {
	// when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environment variable;
	//...
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
		isStaging: isStaging,
		BASE_URL:
			!isDev && !isProd
				? 'https://kreatesell-pilot.azurewebsites.net/api/'
				: 'https://kreatesell.io/api/',
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
			'pk_test_1507a32eacc6e969e3c63d30052f77e12f29f78f',
		NEXT_PUBLIC_PAYSTACK_GHANA_PUBLIC_KEY:
			'pk_test_25cc61cc04df35fe9e3e09f4a7b830b8050b7d89',
		NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY:
			'FLWPUBK_TEST-3f92e2c7e96647a15cfd7206f88dcd60-X',
		NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
			'pk_test_51KHkOkEiRwUsDs0AJ15ufHXXYL7Zbs26ZpKiqiSuWjnjeDtYkMaMPAdL4eEBVwQtzrZs12abo0UxtNdNzXFiywsQ005dNpADpb',
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

// stripe keys
// pk_live_51KHkOkEiRwUsDs0AlNvA7bynwKfMvaj7rdfGpejucsZalNh7KwlWe3RcUizNoYk16yvJ9MSgcALp5SzUFAyFAA3g00OnWxz6eA
// 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
