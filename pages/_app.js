import "../public/css/global.scss";
import "react-dates/lib/css/_datepicker.css";

import "react-dates/initialize";

function MyApp({ Component, pageProps }) {
	return <Component {...pageProps} />;
}

export default MyApp;
