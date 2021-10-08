const withImages = require("next-images");
// module.exports = withImages();

module.exports = {
	env: {
		BASE_URL: "https://kreatesell.io/api/",
		NEXT_PUBLIC_RECAPTCHA_SITE_KEY: "6Le7-jQcAAAAAOHkoLvhdgAjcmfi2gcHjLKkCzYB",
	},
	// withImages()
	withImages: require("next-images"),
};
