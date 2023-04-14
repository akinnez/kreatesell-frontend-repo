import Head from 'next/head';

import {metaData} from '../../utils/static';

export const Meta = (props) => {
	const {children, data, title, keywords, description} = props;
	const canonicalHref = data?.url;

	const name = 'KreateSell';
	const websiteURL = 'https://kreatesell.com';
	const twitterHandle = '@useKreatesell';
	const metaContent = '';

	return (
		<Head>
			<title>{title || data?.title || metaData.title}</title>

			<link rel="canonical" href={canonicalHref} />
			<meta name="title" content={data?.title || metaData.title} />
			<meta
				name="description"
				content={description || metaData.description}
				key="description"
			/>
			<meta
				name="keywords"
				content={keywords || data?.keywords || metaData.keywords}
			/>
			<meta name="robots" content="index, follow" />
			<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
			<meta name="language" content="English" />

			<meta data-charset="UTF-8" />
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1.0"
			/>

			<meta name="author" content={metaData.siteName} />
			<meta name="theme-color" content="#0072EF" />
			<meta name="pagename" content={metaContent} />
			<meta name="url" content={metaData.url} />

			{/* Google / Search Engine Tags */}
			<meta
				itemProp="name"
				content={data?.name || name || metaData.siteName}
			/>
			<meta
				itemProp="description"
				content={
					description || data?.description || metaData?.description
				}
			/>
			<meta itemProp="image" content={data?.image || metaData.image} />
			{/* Google / Search Engine Tags Ends */}

			{/* Facebook Meta Tags */}
			{/* Check this link for clearer explanation: https://neilpatel.com/blog/open-graph-meta-tags/ */}
			<meta
				property="og:url"
				content={
					canonicalHref ||
					data?.facebook?.url ||
					websiteURL ||
					metaData.url
				}
				key="facebook url"
			/>
			<meta property="og:type" content="website" key="facebook type" />
			<meta
				property="og:description"
				content={
					data?.facebook?.description ||
					description ||
					data?.description ||
					metaData.description
				}
				key="facebook description"
			/>
			<meta
				property="og:image"
				content={data?.facebook?.image || data?.image || metaData.image}
				key="facebook image"
			/>
			<meta
				property="og:title"
				content={data?.facebook?.title || data?.title || metaData.title}
				key="facebook title"
			/>
			<meta
				property="og:site_name"
				content={
					data?.facebook?.siteName ||
					data?.siteName ||
					metaData.siteName
				}
			/>
			{/* ///////////////////////// */}
			{/* <meta
				property="og:locale"
				content={''}
			/>
			<meta
				property="og:audio"
				content={''}
			/>
			<meta
				property="og:video"
				content={''}
			/>
			<meta
				property="fb:app_id"
				content={''}
			/> */}
			{/* Facebook Meta Tags Ends */}

			{/* Twitter Meta Tags */}
			<meta name="twitter:card" content="summary" key="twitter card" />
			<meta
				property="twitter:url"
				content={canonicalHref || metaData.url}
			/>
			<meta
				name="twitter:title"
				content={data?.facebook?.title || data?.title || metaData.title}
				key="twitter title"
			/>
			<meta
				name="twitter:description"
				content={
					data?.twitter?.description ||
					data?.description ||
					metaData.description
				}
				key="twitter description"
			/>
			<meta
				property="twitter:image:alt"
				content={`A picture of ${metaData.siteName}`}
			/>
			<meta
				name="twitter:image"
				content={data?.twitter?.image || data?.image || metaData.image}
				key="twitter image"
			/>

			<meta name="twitter:site" content="@useKreatesell" />
			<meta name="twitter:creator" content="@useKreatesell" />
			{/* Twitter Meta Tags Ends */}
			<meta name="geo.placename" content={metaData.geo.placeName} />
			<meta name="geo.position" content={metaData.geo.position} />
			<meta name="geo.region" content={metaData.geo.region} />
			<link rel="icon" href="/favicon.ico" />
			{children}
		</Head>
	);
};

Meta.defaultProps = {
	title: 'KreateSell',
	keywords: 'e-commerce',
	description: 'KreateSell , Sell more, Do less',
};
