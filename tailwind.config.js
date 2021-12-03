module.exports = {
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				"primary-blue": "#0072ef",
				"secondary-blue-100": "#e6f7ff",
				"secondary-blue-200": "#bae7ff",
				"black-100": "#262626",
				"black-200": "#252b42",
				"black-300": "#171717",
				"base-gray": "#595959",
				"base-gray-200": "#8c8c8c",
				"base-white-100": "#fafafa",
				"base-white-200": "#f5f5f5",
				"base-green-100": "#2dc071",
				"base-green-200": "#00b140",
			},
			spacing: {
				30: "30%",
				70: "70%",
			},
			screens: {
				xs: "375px",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
