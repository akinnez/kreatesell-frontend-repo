import Head from "next/head";

export const Meta = ({ title, keywords, description }) => {
	return (
		<Head>
			<meta data-charset="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta name="keywords" content={keywords} />
			<meta name="description" content={description} />
			<link rel="icon" href="/favicon.ico" />
			<title>{title}</title>
		</Head>
	);
};

Meta.defaultProps = {
	title: "KreateSell",
	keywords: "e-commerce",
	description: "More than an e-commerce",
};
