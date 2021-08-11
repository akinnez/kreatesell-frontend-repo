import "../public/css/global.scss";
import "react-dates/lib/css/_datepicker.css";
import { Provider } from "react-redux";
import { store } from '../redux/store'
import "react-dates/initialize";

function MyApp({ Component, pageProps }) {
	return <Provider store={store}><Component {...pageProps} /></Provider>
}

export default MyApp;
