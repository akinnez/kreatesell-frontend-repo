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
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
