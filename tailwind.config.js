module.exports = {
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				"primary-blue": "#0072ef",
				"secondary-blue-100": "#e6f7ff",
				"secondary-blue-200": "#bae7ff",
				"base-blue-700": "#69c0ff",
				"black-100": "#262626",
				"black-200": "#252b42",
				"black-300": "#171717",
				"base-gray": "#595959",
				"base-gray-200": "#8c8c8c",
				"base-gray-600": "#b9b9b9",
				"base-white-100": "#fafafa",
				"base-white-200": "#f5f5f5",
				"base-white-300": "#f0f0f0",
				"base-green-100": "#2dc071",
				"base-green-200": "#00b140",
				"base-green-300": "#f1fcf8",
			},
			spacing: {
				30: "30%",
				70: "70%",
			},
			screens: {
				xs: "375px",
			},
			inset: {
				"2/5": "45%",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
