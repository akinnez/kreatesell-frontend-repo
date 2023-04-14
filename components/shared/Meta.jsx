import React from 'react';
import Head from 'next/head';
import {metaData} from '../../utils/static';
// import config from '../../utils/config';

export function Metas(props) {
	const {children, data} = props;

	const canonicalHref = data?.href;

	return (
		<Head>
			<title>{data?.title || metaData.title}</title>

			<link
				rel="apple-touch-icon"
				sizes="180x180"
				href="/seo/apple-touch-icon.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="32x32"
				href="/seo/favicon-32x32.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="16x16"
				href="/seo/favicon-16x16.png"
			/>
			<link rel="manifest" href="/seo/site.webmanifest" />

			<link rel="canonical" href={canonicalHref} />

			<meta name="title" content={data?.title || metaData.title} />
			<meta
				name="description"
				content={data?.description || metaData.description}
				key="description"
			/>

			<meta
				name="keywords"
				content={data?.keywords || metaData.keywords}
			/>

			<meta name="robots" content="index, follow" />
			<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
			<meta name="language" content="English" />

			{/* Google / Search Engine Tags */}
			<meta itemProp="name" content="" />
			<meta itemProp="description" content={data?.description} />
			<meta itemProp="image" content={data?.image} />
			{/* Google / Search Engine Tags Ends */}

			{/* Facebook Meta Tags */}
			{/* Check this link for clearer explanation: https://neilpatel.com/blog/open-graph-meta-tags/ */}
			<meta
				property="og:url"
				content={
					websiteURL ||
					data?.facebook?.url ||
					canonicalHref ||
					metaData.url
				}
				key="facebook url"
			/>
			<meta property="og:type" content="website" key="facebook type" />
			<meta
				property="og:description"
				content={
					data?.facebook?.description ||
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

			{children}
		</Head>
	);
}
