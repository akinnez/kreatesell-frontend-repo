import Document, {Html, Head, Main, NextScript} from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					{/* onload="this.media='all';this.onload=null;" */}
					<link
						href="http://db.onlinewebfonts.com/c/25a7a213c7215b479c86172604a49723?family=Beat+Word+demo"
						rel="stylesheet"
						onLoad="this.media='all';this.onload=null;"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
						rel="stylesheet"
						onLoad="this.media='all';this.onload=null;"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Zilla+Slab&display=swap"
						rel="stylesheet"
						onLoad="this.media='all';this.onload=null;"
					/>
					{/* Google Tag Manager script */}
					<script
						dangerouslySetInnerHTML={{
							__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NLRKTQG');`,
						}}
					/>
					{/* End Google Tag Manager */}
				</Head>
				<body>
					<noscript>
						<iframe
							src="https://www.googletagmanager.com/ns.html?id=GTM-NLRKTQG"
							height="0"
							width="0"
							style={{display: 'none', visibility: 'hidden'}}
						></iframe>
					</noscript>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
