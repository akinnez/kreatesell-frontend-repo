import { Provider } from "react-redux";
import { useStore } from "../redux/store";
import "../public/css/global.scss";
import "react-dates/initialize";
import "antd/dist/antd.css";

function MyApp({ Component, pageProps }) {
	const store = useStore(pageProps.initialReduxState);

	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
